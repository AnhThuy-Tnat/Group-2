import { Layout, Flex, Avatar, Typography, Space, Menu } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
export default function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy key từ URL (vd: /statistics -> "statistics")
    const getKeyFromPath = (path: string) => {
        const key = path.replace('/', '');
        return key || 'dashboard';
    };

    const [activeKey, setActiveKey] = useState<string>(getKeyFromPath(location.pathname));

    // Cập nhật activeKey khi URL thay đổi (F5 hoặc điều hướng tay)
    useEffect(() => {
        setActiveKey(getKeyFromPath(location.pathname));
    }, [location.pathname]);

    return <Layout className="app-layout">
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
                    onClick={(e) => navigate(`/${e.key}`)}
                    items={[
                        { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
                        { key: 'patients', icon: <TeamOutlined />, label: 'Quản lý bệnh nhân' },
                        { key: 'statistics', icon: <BarChartOutlined />, label: 'Thống kê' },
                    ]}
                />
            </Sider>

            {/* === CONTENT === */}
            <Content className="main-content" style={{ padding: 24 }}>
                <Outlet />
            </Content>
        </Layout>
    </Layout>;
}