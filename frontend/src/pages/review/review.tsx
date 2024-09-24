import "./review.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Card, Rate, Modal, Col, Row } from 'antd';
import { GetShopById, CreateReview, GetReviewsByShopId, GetUsersById } from "../../services/https"; 
import { ShopsInterface } from '../../interfaces/IShop';
import { ReviewInterface } from '../../interfaces/IReview';
import { useNavigate } from 'react-router-dom';


const { TextArea } = Input;

const Review: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>(); // Retrieve shop ID from the route
  const [shop, setShop] = useState<ShopsInterface | null>(null);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const shopIdNumber = Number(shopId);
  const userId = Number(localStorage.getItem("id"));

  // Fetch shop details and reviews by shop ID
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        if (shopId) {
          const shopResponse = await GetShopById(shopId);
          const reviewsResponse = await GetReviewsByShopId(shopId);

          if (shopResponse?.status === 200) {
            setShop(shopResponse.data);
          } else {
            messageApi.error('Error fetching shop details');
          }

          if (reviewsResponse) {
            const updatedReviews = await Promise.all(
              reviewsResponse.data.map(async (review: ReviewInterface) => {
                if (review.UserID) {
                  const userResponse = await GetUsersById(review.UserID.toString()); // Fetch user details
                  review.User = userResponse?.data; // Add user data to the review
                }
                return review;
              })
            );
            setReviews(updatedReviews);
          } else {
            messageApi.error('Error fetching reviews');
          }
        }
      } catch (error) {
        console.error('Error fetching shop details or reviews:', error);
        messageApi.error('Error fetching shop details or reviews. Please try again.');
      }
    };

    fetchShopDetails();
  }, [shopId, messageApi]);


  const onFinish = async (values: { description: string; score: number }) => {
    try {
      const localDateTime = new Date(); 
      const utcDateTime = new Date(localDateTime.toUTCString());
      const reviewData = {
        Score: values.score,
        Description: values.description,
        DATETIME: utcDateTime.toISOString(), 
        ShopID: shopIdNumber,
        UserID: userId,
      };

      const response = await CreateReview(reviewData);

      if (response?.status === 201) {
        messageApi.success('Review submitted!');
        form.resetFields();
        setTimeout(() =>{
          window.location.reload();
        },100);

        // Refresh reviews after a successful submission
        const updatedReviewsResponse = await GetReviewsByShopId(shopId);
        setReviews(updatedReviewsResponse.data);
      } else {
        messageApi.error('Failed to submit the review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      messageApi.error('Error submitting review. Please try again.');
    }
  };

  const showModal = () => {
    if (userId) {
      setIsModalOpen(true);
    } else {
      messageApi.error("Please log in to submit a review.");
      navigate('/login');  // Redirect to the login page
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      {shop ? (
        <div>
          <Row gutter={16} className="card-container">
            <Col span={12}>
              <Card className="shop-card1">
                <img src={shop.ShopImg} className="image1" alt="Shop" />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="shop-card">
                <Card.Meta
                  title={<h2>{shop.ShopName}</h2>}
                  description={shop.Description}
                />
                <Button
                  type="primary"
                  onClick={showModal}
                  style={{ backgroundColor: 'red', borderColor: 'red', marginTop: '16px', width: '80px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                >
                  เขียนรีวิว
                </Button>
              </Card>
            </Col>
          </Row>

          {/* Reviews */}
          <div className="reviewtext">
            Reviews
          </div>
          <Row gutter={[16, 16]}>
            {reviews.map((review) => (
              <Col span={8} key={review.ID}> {/* 3-column */}
              <Card className="review2" style={{ width: '300px', height: '150px' }}>
                <div className="profile-name-container">
                  <img src={review.User?.Profile} className="user-profile" />
                  <p className="user-name">{review.User?.FirstName}</p>
                </div>
                <Rate disabled value={review.Score} allowHalf />
                <p>{review.Description}</p>
              </Card>
              </Col>
            ))}
          </Row>

          <Modal
            title="เขียนรีวิว"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                label="ให้คะแนนร้านค้า"
                name="score"
                rules={[{ required: true, message: 'Please select your rating' }]}
              >
                <Rate allowHalf />
              </Form.Item>
              <Form.Item
                label="เขียนรีวิว"
                name="description"
                rules={[{ required: true, message: 'Please enter your review' }]}
              >
                <TextArea rows={4} placeholder="เขียนรีวิวที่นี่....." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  ส่งรีวิว
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ) : (
        <p>Loading shop details...</p>
      )}
    </div>
  );
};

export default Review;