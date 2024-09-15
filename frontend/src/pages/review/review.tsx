import "./review.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Card, Rate, Descriptions } from 'antd';
import { GetShopById, CreateReview } from "../../services/https"; // Import the function to fetch shop details and create a review
import { ShopsInterface } from '../../interfaces/IShop'; // Ensure this interface includes necessary fields

const { TextArea } = Input;

const Review: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>(); // Retrieve shop ID from the route
  const [shop, setShop] = useState<ShopsInterface | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // Dummy userId - replace with actual logic to fetch the logged-in user ID
  const userId = "123"; // Replace with actual user ID fetching logic (e.g., from auth context)

  // Fetch shop details by shop ID
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        if (shopId) {
          const response = await GetShopById(shopId);
          if (response?.status === 200) {
            setShop(response.data);
          } else {
            messageApi.error('Error fetching shop details');
          }
        }
      } catch (error) {
        console.error('Error fetching shop details:', error);
        messageApi.error('Error fetching shop details. Please try again.');
      }
    };

    fetchShopDetails();
  }, [shopId, messageApi]);

  const onFinish = async (values: { review: string; rating: number }) => {
    try {
      const reviewData = {
        Score: values.rating,
        Description: values.review,
        DATEIME: new Date().toISOString(), // Current timestamp
        ShopID: 1, // Shop ID from URL parameters
        UserID:  1, // User ID from the logged-in user context
      };

      const response = await CreateReview(reviewData); // Call the API to create a review

      if (response?.status === 201) {
        messageApi.success('Review submitted successfully!');
        form.resetFields();
      } else {
        messageApi.error('Failed to submit the review. Please try again.');
      }

    } catch (error) {
      console.error('Error submitting review:', error);
      messageApi.error('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="review-container">
      {contextHolder}
      {shop ? (
        <div>
          <Card
            className="shop-info-card"
            cover={<img src={shop.ShopImg} alt={shop.ShopName} className="shop-image" />}
          >
            <Card.Meta
              title={<h2>{shop.ShopName}</h2>}
              description={shop.Description}
            />
          </Card>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please select your rating' }]}
            >
              <Rate allowHalf defaultValue={0} />
            </Form.Item>
            <Form.Item
              label="เขียนรีวิว"
              name="review"
              rules={[{ required: true, message: 'Please enter your review' }]}
            >
              <TextArea rows={4} placeholder="Write your review here..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ส่งรีวิว
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
};

export default Review;
