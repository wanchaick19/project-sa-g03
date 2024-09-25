import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import './Zone.css'; // Import the CSS file

const { Title, Paragraph } = Typography;

const ShopZone: React.FC = () => {
  return (
    <div className="zone-container">
      {/* Zone for Shopping */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://static.wixstatic.com/media/2667f4_5d3fc4ad721549f19ddefc4dcd99afb0~mv2_d_3992_2242_s_2.jpg/v1/fill/w_741,h_536,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2667f4_5d3fc4ad721549f19ddefc4dcd99afb0~mv2_d_3992_2242_s_2.jpg" // Replace with actual URL
            alt="Shopping Zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนช็อปปิ้ง</Title>
            <Paragraph>
              สำหรับขาช็อปที่ชอบเดินหาของพร้อมเดินเที่ยวไปในตัว บรรยากาศแบบ Outdoor หรือยังไม่ได้คิดว่าจะซื้ออะไรดี ไม่มีร้านค้าประจำ เดินเจออะไรถูกใจก็ซื้ออันนั้นกลับบ้าน การช็อปกึ่งเดินเที่ยวแบบนี้ จึงเหมาะกับลูกค้าที่อยากมาเดินดูของเรื่อยๆ จนกว่าจะเจอของที่ถูกใจ เพราะมีสินค้าให้เลือกหลากหลาย ร้านค้ามากมาย ไม่ต้องเร่งรีบ ไม่มีเป้าหมายการมาซื้อที่ชัดเจน ถูกใจอะไรตอนนั้นก็ค่อยซื้อ ฟินๆไปจ้า~
            </Paragraph>
            
          </div>
        </Col>
      </Row>

      {/* Zone for Retro */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/oYQ2rLAwJRKnAfMQJA8QXBTAAfhEfAGxGHOaf2~tplv-tej9nj120t-origin.webp" // Replace with actual URL
            alt="Open Market Zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนเปิดท้าย</Title>
            <Paragraph>
              สำหรับลูกค้าที่ต้องการความหลากหลาย หมุนเวียนทุกวัน อยากเดินเล่น หาดูของกินไปด้วยเพลินๆ ชิลๆ แล้วล่ะก็โซนนี้จะตอบโจทย์มาก เพราะมีอาหารหลากหลายประเภท จุดเด่นของโซนนี้คือ <strong>มีร้านค้าหมุนเวียนทุกวัน</strong>
            </Paragraph>
            
          </div>
        </Col>
      </Row>

      {/* Zone for Open Market */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://www.bkkmenu.com/files/2019/11/YorkBarDumbo-141.jpg" // Replace with actual URL
            alt="Open Market Zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนเรโทร</Title>
            <Paragraph>
            สำหรับผู้ที่ชื่นชอบการนั่งดื่มด่ำบรรยากาศแบบจิบเครื่องดื่มเบาๆ ไปพร้อมกับอาหารหลากหลายประเภท บาร์บีคิว สเต๊ก และกับแกล้มที่มีให้เลือกตามร้านต่างๆ เหมาะกับลูกค้าที่ต้องการนั่งพักผ่อน ชมบรรยากาศผู้คนเดินไปมา
            </Paragraph>
           
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShopZone;
