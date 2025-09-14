import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Typography,
  Tag,
  Avatar,
  Tooltip,
  Popconfirm,
  Flex,
  Pagination,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '../../redux/hooks';
import {
  fetchPatients,
  deletePatient,
  setFilters,
  setPagination,
  setCurrentPatient,
} from '../../redux/patient/patientSlice';
import { usePatientSelectors, useFilteredPatients } from '../../redux/hooks';
import type { Patient } from '../../redux/patient/patientSlice';
import PatientDrawer from '../../components/PatientDrawer';

const { Title } = Typography;
const { Search } = Input;

const PatientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, filters, pagination, currentPatient } = usePatientSelectors();
  const filteredPatients = useFilteredPatients();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'view' | 'edit'>('create');

  // antd message
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        fetchPatients({
          page: pagination.current,
          limit: pagination.pageSize,
          filter: filters.search,
        }),
      );
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [dispatch, pagination.current, pagination.pageSize, filters.search]);

  // show error bằng message popup
  useEffect(() => {
    if (error) {
      messageApi.error(`Lỗi tải dữ liệu: ${error}`);
    }
  }, [error, messageApi]);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setFilters({ search: value }));
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
      messageApi.success('Xóa bệnh nhân thành công');
    } catch (error) {
      messageApi.error('Lỗi khi xóa bệnh nhân');
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    dispatch(setCurrentPatient(null));
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'Male' ? 'blue' : 'pink'}>
          {gender === 'Male' ? 'Male' : 'Female'}
        </Tag>
      ),
    },
    {
      title: 'Physician',
      dataIndex: ['physician', 'name'],
      key: 'physician',
      render: (_: any, record: Patient) => (
        <Tag color="green">{record.physician?.name || 'Not yet'}</Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: Patient) => (
        <Space size="middle">
          <Tooltip title="See details">
            <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Update">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete patient?"
              description="This action cannot be undone"
              okText="Delete"
              okType="danger"
              cancelText="Cancel"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];


  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      {/* cần render contextHolder để message hiển thị */}
      {contextHolder}

      <Title level={2}>Patient Management</Title>

      <Flex justify="space-between" align="center">
        <Space wrap>
          <Search
            placeholder="Patient Search..."
            allowClear
            onSearch={handleSearch}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add patient
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={filteredPatients}
        rowKey="id"
        loading={loading}
        pagination={false}
        scroll={{
          x: 'max-content',
          y: 55 * 10,
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50]}
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân`}
          onChange={(page, pageSize) => {
            dispatch(setPagination({ current: page, pageSize }));
          }}
        />
      </div>

      <PatientDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        patient={currentPatient ? {
          key: currentPatient.id,
          id: currentPatient.id,
          name: currentPatient.name,
          email: currentPatient.email,
          phone: currentPatient.phone || '',
          gender: (currentPatient.gender as 'Male' | 'Female') || 'Male',
          dob: currentPatient.dob || '',
          physician: currentPatient.physician.name,
          addressInfo: {
            address: currentPatient.addressInfo?.address || '',
            city: currentPatient.addressInfo?.city || '',
            state: currentPatient.addressInfo?.state || '',
            country: currentPatient.addressInfo?.country || '',
          },
          facility: 'ITR Hospital',
          status: 'Tái kết nối' as const
        } : undefined}
        onUpdate={() => messageApi.success('Patient update successful')}
        onCreate={() => messageApi.success('Creating successful patient')}
        mode={drawerMode}
      />
    </Space>
  );
};

export default PatientList;
