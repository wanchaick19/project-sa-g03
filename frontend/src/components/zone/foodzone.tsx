import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import './zone.css'; // Import the CSS file

const { Title, Paragraph } = Typography;

const foodzone: React.FC = () => {
  return (
    <div className="zone-container">
      {/* First Zone */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://images.deliveryhero.io/image/fd-th/LH/h66v-hero.jpg"
            alt="First zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนอาหารรายวัน</Title>
            <Paragraph>
              สำหรับลูกค้าที่ต้องการความหลากหลาย หมุนเวียนทุกวัน อยากเดินเล่น หาดูของกินไปด้วยเพลินๆ ชิลๆ แล้วล่ะก็โซนนี้จะตอบโจทย์มาก
              เพราะมีอาหารหลากหลายประเภท จุดเด่นของโซนนี้คือ <strong>มีร้านค้าหมุนเวียนทุกวัน</strong>
            </Paragraph>
            
          </div>
        </Col>
      </Row>

      {/* Second Zone */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://img.wongnai.com/p/1920x0/2023/07/30/030c837f802b4f669c4188f6170287a7.jpg"
            alt="Second zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนอาหารยามเย็น</Title>
            <Paragraph>
              สายชิลต้องไม่พลาดโซนนี้ เพราะบรรยากาศยามเย็นที่เต็มไปด้วยร้านอาหารริมถนน อาหารอร่อยราคาเบาๆ พร้อมเครื่องดื่มเย็นๆ
            </Paragraph>
            
          </div>
        </Col>
      </Row>

      {/* Third Zone */}
      <Row gutter={16} className="zone-item">
        <Col xs={24} md={12}>
          <img
            src="https://www.saphanmai.com/wp-content/uploads/2023/11/DSCF0752.jpg"
            alt="Third zone"
            className="zone-img"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="zone-text">
            <Title level={4}>โซนตลาดกลางคืน</Title>
            <Paragraph>
              สำหรับผู้ที่ชื่นชอบบรรยากาศตลาดกลางคืน เดินเพลินๆ ซื้อของไปกินไป แนะนำให้มาเที่ยวโซนนี้ จะพบกับร้านค้าหลากหลายและของกินอร่อยๆ
            </Paragraph>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default foodzone;
