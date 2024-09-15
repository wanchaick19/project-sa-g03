import "./shop.css";
import { Card, Row, Col, message } from 'antd';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { GetShops, GetCategories } from '../../services/https/index';
import { ShopsInterface } from '../../interfaces/IShop'; 
import { CategoriesInterface } from '../../interfaces/ICategories'; 

const Shop: React.FC = () => {
  const [shops, setShops] = useState<ShopsInterface[]>([]);
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const getData = async () => {
    try {
      const categoryResponse = await GetCategories();
      const shopResponse = await GetShops();
      
      if (categoryResponse?.status === 200 && shopResponse?.status === 200) {
        setCategories(categoryResponse.data);
        setShops(shopResponse.data);
      } else {
        messageApi.error('Error fetching shop or category data');
      }
    } catch (error) {
      console.error('Error fetching data:', error); // Log error to console
      messageApi.error('Error fetching shop data');
    } 
  };

  useEffect(() => {
    getData();
  }, []);

  // Group shops by category, only if both categories and shops data are available
  const groupedShopsByCategory = categories.map((category) => ({
    ...category,
    shops: shops.filter((shop) => shop.CategoryID === category.ID),
  }));


  return (
    <div>
      {contextHolder}
      <p style={{ fontFamily: 'Itim, sans-serif', fontSize: '32px', textAlign: 'center' }}>รีวิวร้านค้า</p>
      <div>
        {groupedShopsByCategory.map((category) => (
          <div key={category.ID}>
            <Card className="info-card" bordered={true}>
              <p>{category.CategoryName}</p>
            </Card>
            <Row gutter={[16, 16]}>
              {category.shops.map((shop) => (
                <Col xs={24} sm={12} md={8} lg={6} key={shop.ID}>
                  <Link to={`/review/${shop.ID}`}> {/* Update the path to match the new route */}
  <Card
    hoverable
    cover={<img src={shop.ShopImg} alt={shop.ShopName} />}
  >
    <Card.Meta title={shop.ShopName} description={shop.Description} />
  </Card>
</Link>

                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
