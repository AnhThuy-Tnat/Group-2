import React from 'react';
import { Modal, Avatar, Tag, Descriptions, Button, Space, Typography } from 'antd';
import type { Patient } from '../mockData';

const { Title } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  patient?: Patient;
}

const PatientInfoModal: React.FC<Props> = ({ open, onClose, patient }) => {
  if (!patient) return null;
  const initials = patient.name.split(' ').map(n => n[0]).join('');

  return (
    <Modal
      title="Thông tin bệnh nhân"
      open={open}
      onCancel={onClose}
      footer={[<Button key="close" onClick={onClose}>Đóng</Button>]}
      width={600}
    >
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Space align="center" size="middle">
          <Avatar size={64} style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>{initials}</Avatar>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {patient.name} <Tag color="blue"># {patient.id}</Tag>
            </Title>
          </div>
        </Space>

        <Descriptions bordered size="small" column={1}>
          <Descriptions.Item label="Giới tính">{patient.gender}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{patient.dob}</Descriptions.Item>
          <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
          <Descriptions.Item label="Điện thoại">{patient.phone}</Descriptions.Item>
          <Descriptions.Item label="Bác sĩ">{patient.physician}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{`${patient.addressInfo.address}, ${patient.addressInfo.city}, ${patient.addressInfo.state}, ${patient.addressInfo.country}`}</Descriptions.Item>
          <Descriptions.Item label="Cơ sở">{patient.facility}</Descriptions.Item>
        </Descriptions>
      </Space>
    </Modal>
  );
};

export default PatientInfoModal; // Quan trọng: Phải có "export default"