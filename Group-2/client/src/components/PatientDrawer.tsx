import React, { useEffect, useState } from 'react';
import { Drawer, Space, Avatar, Typography, Tag, Descriptions, Button, Form, Input, Select, DatePicker, Row, Col, message } from 'antd';
import { useEffect as useReactEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchPhysicians } from '../redux/physician/physicianSlice';
import dayjs from 'dayjs';
import { createPatient, updatePatient, type Patient } from '../redux/patient/patientSlice';
import { vnProvinces, type Province } from '../constants/vnProvinces';

const { Title } = Typography;

interface PatientDrawerProps {
  open: boolean;
  patient?: Patient;
  onClose: () => void;
  mode?: 'view' | 'edit' | 'create';
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({ open, patient, onClose, mode: externalMode }) => {
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>(externalMode || 'view');
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [districts, setDistricts] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const physicians = useAppSelector(state => state.physician.list);
  const physiciansLoading = useAppSelector(state => state.physician.loading);

  useEffect(() => {
    if (externalMode) setMode(externalMode);
    if (patient) {
      form.setFieldsValue({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        dob: dayjs(patient.dob, 'YYYY-MM-DD'),
        physician: patient.physician?.id || undefined,
        country: patient.country || 'VietNam',
        addressInfo: {
          address: patient.addressInfo?.address || '',
          city: patient.addressInfo?.city || '',
          state: patient.addressInfo?.state || '',
        }
      });

      // Load districts if patient has province
      if (patient.addressInfo?.state) {
        const province = vnProvinces.find((p: Province) => p.name === patient.addressInfo?.state);
        if (province) {
          setDistricts(province.districts);
        }
      }
    } else {
      form.resetFields();
      setDistricts([]);
    }
  }, [patient, open, externalMode]);

  // Handle province change
  const handleProvinceChange = (provinceName: string) => {
    const province = vnProvinces.find((p: Province) => p.name === provinceName);
    if (province) {
      setDistricts(province.districts);
      // Clear district when province changes
      form.setFieldsValue({ 'addressInfo.city': undefined });
    }
  };

  // load physicians on mount
  useReactEffect(() => {
    dispatch(fetchPhysicians());
  }, [dispatch]);

  // When physicians loaded, if current form physician is a name string, map to corresponding id
  useReactEffect(() => {
    const current = form.getFieldValue('physician');
    if (current && typeof current === 'string') {
      const match = physicians.find(p => p.name === current);
      if (match) {
        form.setFieldsValue({ physician: match.id });
      }
    }
  }, [physicians, form]);

  const initials = patient ? patient.name.split(' ').map(n => n[0]).join('') : '';

  const handleSave = async () => {
    try {

      const values = await form.validateFields();
      const payload = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : undefined,
        addressInfo: {
          ...values.addressInfo,
        }
      }
      // Call appropriate API or dispatch action based on mode
      if (mode === 'edit' && patient) {
        await dispatch(updatePatient({ id: patient.id, input: payload })).unwrap();
        messageApi.success("Patient updated");
        onClose();
      } else if (mode === 'create') {
        // create logic here
        await dispatch(createPatient(payload)).unwrap();
        messageApi.success("Patient created");
        onClose();
      }
    } catch (error: any) {
      const rawMessage: string =
        typeof error === 'string'
          ? error
          : error?.message || error?.graphQLErrors?.[0]?.message || 'Error saving patient';

      const lower = rawMessage.toLowerCase();
      let fieldName: (string | number)[] | string | undefined;
      if (lower.includes('email')) fieldName = 'email';
      else if (lower.includes('phone')) fieldName = 'phone';
      else if (lower.includes('physician')) fieldName = 'physician';
      else if (lower.includes('dob') || lower.includes('date of birth')) fieldName = 'dob';
      else if (lower.includes('name')) fieldName = 'name';

      // Duplicate email key from Mongo
      if (lower.includes('e11000') || lower.includes('duplicate key')) {
        fieldName = 'email';
      }

      // Clean verbose validation prefixes
      let displayMessage = rawMessage;
      const validationIdx = lower.indexOf('validation failed');
      if (validationIdx !== -1) {
        const m = rawMessage.match(/(?:email|phone|physician|dob|date of birth|name)\s*:\s*(.+)$/i);
        if (m && m[1]) {
          displayMessage = m[1].trim();
        } else {
          const lastColon = rawMessage.lastIndexOf(':');
          if (lastColon !== -1 && lastColon < rawMessage.length - 1) {
            displayMessage = rawMessage.slice(lastColon + 1).trim();
          }
        }
      }

      if (fieldName) {
        form.setFields([{ name: fieldName as any, errors: [displayMessage] }]);
        form.scrollToField(fieldName as any);
      }
      messageApi.error(displayMessage);
    }
  };

  return (
    <>
      {contextHolder}
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
              <Descriptions.Item label="Doctor">
                {(() => {
                  const value = form.getFieldValue('physician');
                  if (value && typeof value === 'string' && value.length === 24) {
                    const found = physicians.find(p => p.id === value);
                    return found ? found.name : patient.physician.name;
                  }
                  return patient.physician?.name;
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="Country">{patient.country || 'VietNam'}</Descriptions.Item>
              <Descriptions.Item label="Permanent Address">{`${patient.addressInfo?.address || ''}, ${patient.addressInfo?.city}, ${patient.addressInfo?.state}`}</Descriptions.Item>
            </Descriptions>
          </Space>
        ) : (
          <Form layout="vertical" form={form}>
            <Form.Item name="name" label="Patient Name" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Please enter patient name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" style={{ marginBottom: 12 }} rules={[{ required: true, type: 'email', message: 'Invalid email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Please enter phone number' }]}>
              <Input />
            </Form.Item>
            <Row gutter={12}>
              <Col xs={24} md={12}>
                <Form.Item name="gender" label="Gender" style={{ marginBottom: 12 }} rules={[{ required: true, message: 'Select gender' }]}>
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
                    { required: true, message: 'Select date of birth' },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        return value.isBefore(dayjs(), 'day')
                          ? Promise.resolve()
                          : Promise.reject(new Error('Date of Birth must be before today'));
                      },
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current.isAfter(dayjs(), 'day')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="physician" label="Doctor" rules={[{ required: true, message: 'Please select a physician' }]}>
              <Select showSearch optionFilterProp="children" loading={physiciansLoading} placeholder="Select a physician">
                {physicians.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.title ? `${p.title} ` : ''}{p.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="country" label="Country" style={{ marginBottom: 12 }} initialValue="VietNam">
              <Input placeholder="VietNam" disabled />
            </Form.Item>

            <Form.Item name={['addressInfo', 'state']} label="Province/City" style={{ marginBottom: 12 }}>
              <Select
                placeholder="Select province/city"
                showSearch
                optionFilterProp="children"
                onChange={handleProvinceChange}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {vnProvinces.map((province: Province) => (
                  <Select.Option key={province.name} value={province.name}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={['addressInfo', 'city']} label="District" style={{ marginBottom: 12 }}>
              <Select
                placeholder="Select district"
                showSearch
                optionFilterProp="children"
                disabled={districts.length === 0}
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {districts.map(district => (
                  <Select.Option key={district} value={district}>
                    {district}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={['addressInfo', 'address']} label="Permanent Address" style={{ marginBottom: 12 }} >
              <Input />
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default PatientDrawer;


