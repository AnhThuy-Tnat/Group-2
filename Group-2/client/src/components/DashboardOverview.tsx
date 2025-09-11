import React from 'react';
import { Card, Col, Row, Statistic, Typography, Space } from 'antd';
import { TeamOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Title } = Typography;

const DashboardOverview: React.FC = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Title level={2}>Tổng quan</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tổng bệnh nhân" value={1250} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tái kết nối" value={420} prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tắt kết nối" value={830} prefix={<CloseCircleTwoTone twoToneColor="#ff4d4f" />} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardOverview;






