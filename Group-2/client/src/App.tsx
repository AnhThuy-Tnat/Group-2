import React, { useState } from 'react';
import { Layout, ConfigProvider, Flex, Avatar, Typography, Space, Menu } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';
import viVN from 'antd/locale/vi_VN';
import DashboardOverview from './components/DashboardOverview.tsx';
import StatisticsPage from './components/StatisticsPage.tsx';
import PatientList from './components/PatientList';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('dashboard');

  return (
    // ConfigProvider để set ngôn ngữ và theme màu cho toàn bộ ứng dụng
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#007bff', // Set màu xanh dương làm màu chủ đạo
        },
      }}
    >
      <Layout className="app-layout">
        {/* === HEADER === */}
        <Header className="app-header">
          <Flex justify="space-between" align="center" style={{ height: '100%' }}>
            <Title level={3} className="header-logo">ITR HOSPITAL</Title>
            <Space size="middle">
              <Avatar style={{ backgroundColor: '#fff', color: '#007bff' }} icon={<UserOutlined />} />
              <Text className="header-user-name">GROUP 2</Text>
            </Space>
          </Flex>
        </Header>

        <Layout>
          {/* === SIDEBAR === */}
          <Sider width={230} theme="dark" style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div style={{ height: 16 }} />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[activeKey]}
              onClick={(e) => setActiveKey(e.key)}
              items={[
                { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                { key: 'patient-list', icon: <TeamOutlined />, label: 'Quản lý bệnh nhân' },
                { key: 'statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
              ]}
            />
          </Sider>

          {/* === CONTENT === */}
          <Content className="main-content" style={{ padding: 24 }}>
            {activeKey === 'dashboard' && <DashboardOverview />}
            {activeKey === 'patient-list' && <PatientList />}
            {activeKey === 'statistics' && <StatisticsPage />}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

