import React, { useEffect, useState } from 'react';
import { Drawer, Space, Avatar, Typography, Tag, Descriptions, Button, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import type { Patient } from '../mockData';
import dayjs from 'dayjs';
// Province options will be loaded from API to ensure exact name matching

const { Title } = Typography;

interface PatientDrawerProps {
  open: boolean;
  patient?: Patient;
  onClose: () => void;
  onUpdate?: (updated: Patient) => void;
  onCreate?: (values: Omit<Patient, 'key' | 'id'>) => void;
  mode?: 'view' | 'edit' | 'create';
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({ open, patient, onClose, onUpdate, onCreate, mode: externalMode }) => {
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(externalMode || 'view');
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState<string[]>([]);
  const [provinceMap, setProvinceMap] = useState<Record<string, string[]>>({});
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);

  useEffect(() => {
    if (externalMode) setMode(externalMode);
    if (patient) {
      form.setFieldsValue({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        dob: dayjs(patient.dob, 'YYYY-MM-DD'),
        physician: patient.physician,
        address: patient.addressInfo.address,
        city: patient.addressInfo.city,
        state: patient.addressInfo.state,
        country: patient.addressInfo.country,
        registrationDate: dayjs(patient.registrationDate, 'DD/MM/YYYY'),
        facility: patient.facility,
      });
      if (!externalMode) setMode('view');
      if (patient.addressInfo?.state && Object.keys(provinceMap).length > 0) {
        setDistricts(provinceMap[patient.addressInfo.state] || []);
      }
    } else {
      form.resetFields();
    }
  }, [patient, open, externalMode, provinceMap]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('https://provinces.open-api.vn/api/?depth=2');
        const data = await res.json();
        const map: Record<string, string[]> = {};
        const names: string[] = [];
        (data || []).forEach((p: any) => {
          const name = p?.name;
          if (name) {
            names.push(name);
            map[name] = (p.districts || []).map((d: any) => d.name);
          }
        });
        setProvinceMap(map);
        setProvinceOptions(names);
      } catch (e) {
        setProvinceMap({});
        setProvinceOptions([]);
      }
    };
    fetchAll();
  }, []);

  const loadDistricts = (provinceName: string) => {
    setDistricts(provinceMap[provinceName] || []);
    form.setFieldsValue({ city: undefined });
  };

  const initials = patient ? patient.name.split(' ').map(n => n[0]).join('') : '';

  const handleSave = () => {
    form.validateFields().then(values => {
      if (mode === 'edit' && patient && onUpdate) {
        const updated: Patient = {
          ...patient,
          ...values,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          dob: values.dob.format('YYYY-MM-DD'),
          physician: values.physician,
          addressInfo: {
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
          },
          registrationDate: values.registrationDate.format('DD/MM/YYYY')
        };
        onUpdate(updated);
        setMode('view');
      } else if (mode === 'create' && onCreate) {
        onCreate({
          name: values.name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          dob: values.dob.format('YYYY-MM-DD'),
          physician: values.physician,
          addressInfo: {
            address: values.address,
            city: values.city,
            state: values.state,
            country: 'Việt Nam',
          },
          registrationDate: values.registrationDate.format('DD/MM/YYYY'),
          facility: values.facility,
          status: 'Tái kết nối',
        });
        onClose();
      }
    });
  };

  return (
    <Drawer
      title={mode === 'view' ? 'Patient Information' : mode === 'edit' ? 'Edit patient' : 'Add Patient'}
      open={open}
      onClose={onClose}
      width={520}
      extra={
        <Space>
          {mode === 'view' ? (
            <Button onClick={() => setMode('edit')}>Update</Button>
          ) : mode === 'edit' ? (
            <>
              <Button onClick={() => setMode('view')}>Cancel</Button>
              <Button type="primary" onClick={handleSave}>Save</Button>
            </>
          ) : (
            <>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={handleSave}>Create</Button>
            </>
          )}
        </Space>
      }
    >
      {mode === 'view' && patient ? (
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
            <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{patient.dob}</Descriptions.Item>
            <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{patient.phone}</Descriptions.Item>
            <Descriptions.Item label="Doctor">{patient.physician}</Descriptions.Item>
            <Descriptions.Item label="Permanent Address">{`${patient.addressInfo.address}, ${patient.addressInfo.city}, ${patient.addressInfo.state}, ${patient.addressInfo.country}`}</Descriptions.Item>
            <Descriptions.Item label="Registration Date">{patient.registrationDate}</Descriptions.Item>
          </Descriptions>
        </Space>
      ) : (
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Patient Name" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" style={{ marginBottom: 12 }} rules={[{ required: true, type: 'email', message: 'Email hợp lệ!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
          </Form.Item>
          <Row gutter={12}>
            <Col xs={24} md={12}>
              <Form.Item name="gender" label="Gender" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                <Select>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                style={{ marginBottom: 12 }}
                rules={[
                  { required: true, message: 'Vui lòng chọn ngày sinh!' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      return value.isAfter(dayjs(), 'day')
                        ? Promise.resolve()
                        : Promise.reject(new Error('Date of Birth must be after today'));
                    },
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="physician" label="Doctor" rules={[{ required: true, message: 'Vui lòng nhập mã bác sĩ!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="state" label="Province/City" style={{ marginBottom: 12 }} rules={[{ required: true }]}> 
            <Select showSearch optionFilterProp="children" onChange={(val) => loadDistricts(val)} loading={!Object.keys(provinceMap).length}>
              {provinceOptions.map(p => (
                <Select.Option key={p} value={p}>{p}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city" label="District" style={{ marginBottom: 12 }} rules={[{ required: true }]}> 
            <Select showSearch optionFilterProp="children" disabled={districts.length === 0}>
              {districts.map(d => (
                <Select.Option key={d} value={d}>{d}</Select.Option>
              ))}
            </Select>
            </Form.Item>
          <Form.Item name="address" label="Permanent Address" style={{ marginBottom: 12 }} rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
          <Form.Item
            name="registrationDate"
            label="Registration Date"
            style={{ marginBottom: 12 }}
            rules={[
              { required: true, message: 'Vui lòng chọn ngày đăng ký!' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  return value.isBefore(dayjs(), 'day')
                    ? Promise.resolve()
                    : Promise.reject(new Error('Registration Date must be before today'));
                },
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        
        </Form>
      )}
    </Drawer>
  );
};

export default PatientDrawer;


