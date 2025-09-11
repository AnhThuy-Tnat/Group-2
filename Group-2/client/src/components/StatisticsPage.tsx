import React from 'react';
import { Card, Space, Typography, Row, Col, Progress } from 'antd';

const { Title, Text } = Typography;

const StatisticsPage: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Title level={2}>Thống kê</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Tỉ lệ tái kết nối">
            <Progress type="dashboard" percent={34} />
            <Text type="secondary">Tạm thời là số liệu mẫu</Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Tỉ lệ tắt kết nối">
            <Progress type="dashboard" percent={66} status="exception" />
            <Text type="secondary">Tạm thời là số liệu mẫu</Text>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default StatisticsPage;






