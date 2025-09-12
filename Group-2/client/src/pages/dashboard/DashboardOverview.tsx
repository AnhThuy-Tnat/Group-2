import React, { useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, Space, Spin, Alert } from 'antd';
import { TeamOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useAppDispatch, usePatientSelectors, usePatientStats } from '../../redux/hooks';
import { fetchPatients } from '../../redux/patient/patientSlice';

const { Title } = Typography;

const DashboardOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = usePatientSelectors();
  const stats = usePatientStats();

  // Fetch patients on component mount
  useEffect(() => {
    dispatch(fetchPatients({ page: 1, limit: 1000 })); // Fetch all patients for stats
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px' }}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Title level={2}>Tổng quan</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Tổng bệnh nhân" value={stats.total} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Có bác sĩ" value={stats.connected} prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Chưa có bác sĩ" value={stats.disconnected} prefix={<CloseCircleTwoTone twoToneColor="#ff4d4f" />} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardOverview;







