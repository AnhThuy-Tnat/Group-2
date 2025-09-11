import React, { useState, useMemo } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Typography,
  Avatar,
  Tooltip,
  Flex, // Dùng Flex để dàn layout
  Popconfirm
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { Patient } from '../mockData';   // import type
import { initialPatients } from '../mockData';
// import PatientFormModal from './PatientFormModal';
import PatientDrawer from './PatientDrawer';

const { Title } = Typography;
const { Search } = Input;

const PatientManagementPage: React.FC = () => {
  // State quản lý danh sách bệnh nhân
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  // Drawer sẽ dùng viewingPatient cho cả xem/chỉnh sửa/tạo mới
  // State xem chi tiết
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  // State cho từ khóa tìm kiếm
  const [searchText, setSearchText] = useState('');

  // --- LOGIC CHO CÁC CHỨC NĂNG CRUD ---

  const handleCreate = () => {
    setViewingPatient(null);
    setIsInfoOpen(true);
  };

  const handleUpdateFromDrawer = (updated: Patient) => {
    setPatients(prev => prev.map(p => (p.key === updated.key ? updated : p)));
  };

  const handleUpdate = (record: Patient) => {
    setViewingPatient(record);
    setIsInfoOpen(true);
  };

  const handleDelete = (key: string) => {
    setPatients(prev => prev.filter(patient => patient.key !== key));
  };

  const openView = (patient: Patient) => {
    setViewingPatient(patient);
    setIsInfoOpen(true);
  };
  const closeView = () => {
    setIsInfoOpen(false);
    setViewingPatient(null);
  };
  
  // Loại bỏ modal cũ

  // Giữ chỗ cho API tạo mới nếu cần trong tương lai

  // Lọc dữ liệu dựa trên searchText
  const filteredData = useMemo(() =>
    patients.filter(patient =>
      patient.name.toLowerCase().includes(searchText.toLowerCase())
    ), [patients, searchText]
  );

  // --- ĐỊNH NGHĨA CÁC CỘT CHO BẢNG ---
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
    },
    { title: 'Patient code', dataIndex: 'id', key: 'id' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Registration date', dataIndex: 'registrationDate', key: 'registrationDate' },
    { title: 'Doctor', dataIndex: 'physician', key: 'physician' },
    {
      title: '',
      key: 'action',
      render: (_: any, record: Patient) => (
        <Space size="middle">
          <Tooltip title="See details">
            <Button type="text" icon={<EyeOutlined />} onClick={() => openView(record)} />
          </Tooltip>
          <Tooltip title="Update">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Patient?"
              description="This action cannot be undone"
              okText="Delete"
              okType="danger"
              cancelText="Cancel"
              onConfirm={() => handleDelete(record.key)}
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
      <Title level={2}>Danh sách Bệnh nhân</Title>

      {/* Thanh công cụ: Tìm kiếm và nút Thêm */}
      <Flex justify="space-between" align="center">
        <Search
          placeholder="SEARCH"
          onSearch={value => setSearchText(value)}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Add Patient
        </Button>
      </Flex>
      
      {/* Bảng hiển thị dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10, showSizeChanger: false }}
      />

      {/* Drawer tạo mới / xem chi tiết / chỉnh sửa */}
      <PatientDrawer
        open={isInfoOpen}
        onClose={closeView}
        patient={viewingPatient || undefined}
        onUpdate={handleUpdateFromDrawer}
        onCreate={(vals) => {
          const newPatient: Patient = {
            key: (patients.length + 1).toString(),
            id: `000${Math.floor(Math.random() * 900) + 100}`,
            ...vals,
          };
          setPatients(prev => [newPatient, ...prev]);
        }}
        mode={viewingPatient ? 'view' : 'create'}
      />
    </Space>
  );
};

export default PatientManagementPage;
