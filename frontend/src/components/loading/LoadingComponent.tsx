import React from 'react';
import { Alert, Spin, Row, Col } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 200,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 10,
};

const LoadingComponent: React.FC = () => (
  <div style={{ padding: '50px' }}>
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <Spin tip="กำลังโหลด อิอิ" size="large">
          <div style={contentStyle} />
        </Spin>
      </Col>
    </Row>
  </div>
);

export default LoadingComponent;
