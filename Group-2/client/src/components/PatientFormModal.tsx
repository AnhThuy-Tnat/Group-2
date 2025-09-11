import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import type { Patient } from '../mockData'; // Import kiểu dữ liệu
import dayjs from 'dayjs';

interface PatientFormModalProps {
  open: boolean;
  onClose: () => void;
  onFinish: (values: Omit<Patient, 'key' | 'id'>) => void;
  initialValues?: Patient | null;
}

const PatientFormModal: React.FC<PatientFormModalProps> = ({ open, onClose, onFinish, initialValues }) => {
  const [form] = Form.useForm();

  // Dùng useEffect để set giá trị cho form khi ở chế độ "sửa"
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        registrationDate: dayjs(initialValues.registrationDate, 'DD/MM/YYYY')
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, open]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onFinish({
        ...values,
        registrationDate: values.registrationDate.format('DD/MM/YYYY')
      });
      onClose(); // Đóng modal sau khi submit
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title={initialValues ? "Cập nhật thông tin bệnh nhân" : "Add Patient"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {initialValues ? "Lưu thay đổi" : "Tạo mới"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="patient_form">
        <Form.Item name="name" label="Bệnh nhân" rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
          <Select>
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="registrationDate" label="Ngày đăng ký" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng ký!' }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
         <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
          <Select>
            <Select.Option value="Tái kết nối">Tái kết nối</Select.Option>
            <Select.Option value="Tất kết nối">Tất kết nối</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="facility" label="Cơ sở" rules={[{ required: true, message: 'Vui lòng nhập tên cơ sở!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PatientFormModal;
