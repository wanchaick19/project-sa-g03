import "./shop.css";
import { Card, Row, Col, message, Rate } from 'antd';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { GetShops, GetCategories, GetReviewsByShopId } from '../../services/https/index'; 
import { ShopsInterface } from '../../interfaces/IShop'; 
import { CategoriesInterface } from '../../interfaces/ICategories'; 
import { ReviewInterface } from '../../interfaces/IReview';

const Shop: React.FC = () => {
  const [shops, setShops] = useState<ShopsInterface[]>([]);
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({}); // Store ratings by shop ID
 
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
      console.error('Error fetching data:', error); 
      messageApi.error('Error fetching shop data');
    }
  };

  const calculateAverageRating = async (shopId: number) => {  // Change shopId type to number
    try {
      const reviewResponse = await GetReviewsByShopId(shopId.toString()); // Convert number to string
      const reviews: ReviewInterface[] = reviewResponse.data;
  
      if (reviews.length === 0) return 0;
  
      const totalScore = reviews.reduce((acc, review) => acc + (review.Score ?? 0), 0);
      return totalScore / reviews.length;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return 0;
    }
  };
  

  const fetchRatingsForShops = async () => {
    const ratingsData: { [key: number]: number } = {};
  
    // Loop shop to calculate its average rating
    for (const shop of shops) {
      if (shop.ID !== undefined) {  // Ensure shop.ID is defined
        const averageRating = await calculateAverageRating(shop.ID);
        ratingsData[shop.ID] = averageRating; // เก็บ rating by shop ID
      }
    }
    setRatings(ratingsData); // Update
  };
  

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (shops.length > 0) {
      fetchRatingsForShops();
    }
  }, [shops]);

  // Group shops by category
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
            <Card className="review1" bordered={true}>
              <p>{category.CategoryName}</p>
            </Card>
            <Row gutter={[16, 16]}>
              {category.shops.map((shop) => (
                <Col xs={24} sm={12} md={8} lg={6} key={shop.ID}>
                  <Link to={`/review/${shop.ID}`}>
                    <Card className="shop1-card"
                      hoverable
                      cover={<img className="shop1-card-cover" src={shop.ShopImg} />}
                    >
                      <Card.Meta className="shop1-card-meta"
                        title={shop.ShopName}
                        description={
                          <>
                            {/* Use the fetched rating for the shop */}
                            <Rate disabled value={shop.ID !== undefined ? ratings[shop.ID] : 0} allowHalf />
                            <p>({shop.ID !== undefined && ratings[shop.ID] !== undefined ? (Math.round(ratings[shop.ID] * 10) / 10).toFixed(1) : 0} star)</p>
                          </>
                        }
                      />
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