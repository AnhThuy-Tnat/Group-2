import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Card, Typography, Tag, message, Avatar, Tooltip, Popconfirm, Flex } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../redux/hooks';
import { fetchPatients, deletePatient, setFilters, setPagination, setCurrentPatient } from '../redux/patient/patientSlice';
import { usePatientSelectors, useFilteredPatients } from '../redux/hooks';
import type { Patient } from '../redux/patient/patientSlice';
import PatientDrawerWrapper from './PatientDrawerWrapper';

const { Title } = Typography;
const { Search } = Input;

const PatientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, filters, pagination, currentPatient } = usePatientSelectors();
  const filteredPatients = useFilteredPatients();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'view' | 'edit'>('create');

  // Fetch patients on component mount
  useEffect(() => {
    dispatch(fetchPatients({ 
      page: pagination.current, 
      limit: pagination.pageSize,
      filter: filters.search 
    }));
  }, [dispatch, pagination.current, pagination.pageSize, filters.search]);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };


  const handleTableChange = (pagination: any) => {
    dispatch(setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize
    }));
  };

  // CRUD handlers
  const handleCreate = () => {
    dispatch(setCurrentPatient(null));
    setDrawerMode('create');
    setIsDrawerOpen(true);
  };

  const handleView = (patient: Patient) => {
    dispatch(setCurrentPatient(patient));
    setDrawerMode('view');
    setIsDrawerOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    dispatch(setCurrentPatient(patient));
    setDrawerMode('edit');
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deletePatient(id)).unwrap();
      message.success('Xóa bệnh nhân thành công');
    } catch (error) {
      message.error('Lỗi khi xóa bệnh nhân');
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    dispatch(setCurrentPatient(null));
  };

  const handleUpdateFromDrawer = (updatedPatient: any) => {
    // This will be handled by Redux automatically when we update the patient
    message.success('Cập nhật bệnh nhân thành công');
  };

  const handleCreateFromDrawer = (newPatient: any) => {
    // This will be handled by Redux automatically when we create the patient
    message.success('Tạo bệnh nhân thành công');
  };

  const columns = [
    {
      title: 'Bệnh nhân',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{text}</span>
        </Space>
      ),
      sorter: (a: Patient, b: Patient) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'Male' ? 'blue' : 'pink'}>
          {gender === 'Male' ? 'Nam' : 'Nữ'}
        </Tag>
      ),
    },
    {
      title: 'Bác sĩ',
      dataIndex: ['physician', 'name'],
      key: 'physician',
      render: (_: any, record: Patient) => (
        <Tag color="green">{record.physician?.name || 'Chưa có'}</Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: Patient) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa bệnh nhân?"
              description="Hành động này không thể hoàn tác"
              okText="Xóa"
              okType="danger"
              cancelText="Hủy"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  if (error) {
    return (
      <Card>
        <Typography.Text type="danger">
          Lỗi tải dữ liệu: {error}
        </Typography.Text>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Title level={2}>Quản lý Bệnh nhân</Title>

      {/* Thanh công cụ: Tìm kiếm và nút Thêm */}
      <Flex justify="space-between" align="center">
        <Space wrap>
          <Search
            placeholder="Tìm kiếm bệnh nhân..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
           
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Thêm bệnh nhân
        </Button>
      </Flex>
      
      {/* Bảng hiển thị dữ liệu */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredPatients}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} bệnh nhân`,
        }}
        onChange={handleTableChange}
      />

      {/* Drawer tạo mới / xem chi tiết / chỉnh sửa */}
      <PatientDrawerWrapper
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        patient={currentPatient || undefined}
        onUpdate={handleUpdateFromDrawer}
        onCreate={handleCreateFromDrawer}
        mode={drawerMode}
      />
    </Space>
  );
};

export default PatientList;
