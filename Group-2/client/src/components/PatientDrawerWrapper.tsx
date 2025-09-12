import React from 'react';
import PatientDrawer from './PatientDrawer';
import { useAppDispatch } from '../redux/hooks';
import { createPatient, updatePatient } from '../redux/patient/patientSlice';
import type { Patient, PatientInput } from '../redux/patient/patientSlice';

interface PatientDrawerWrapperProps {
  open: boolean;
  patient?: Patient;
  onClose: () => void;
  onUpdate?: (updated: Patient) => void;
  onCreate?: (values: Omit<Patient, 'id'>) => void;
  mode?: 'view' | 'edit' | 'create';
}

const PatientDrawerWrapper: React.FC<PatientDrawerWrapperProps> = ({
  open,
  patient,
  onClose,
  onUpdate,
  onCreate,
  mode = 'view'
}) => {
  const dispatch = useAppDispatch();

  const handleUpdate = async (updatedPatient: any) => {
    try {
      const patientInput: PatientInput = {
        email: updatedPatient.email,
        name: updatedPatient.name,
        phone: updatedPatient.phone,
        gender: updatedPatient.gender,
        dob: updatedPatient.dob,
        physician: updatedPatient.physician, // This is a string in mockData format
        addressInfo: updatedPatient.addressInfo
      };
      
      await dispatch(updatePatient({ 
        id: updatedPatient.id, 
        input: patientInput 
      })).unwrap();
      
      onUpdate?.(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleCreate = async (newPatientData: any) => {
    try {
      const patientInput: PatientInput = {
        email: newPatientData.email,
        name: newPatientData.name,
        phone: newPatientData.phone,
        gender: newPatientData.gender,
        dob: newPatientData.dob,
        physician: newPatientData.physician, // This is a string in mockData format
        addressInfo: newPatientData.addressInfo
      };
      
      await dispatch(createPatient(patientInput)).unwrap();
      
      onCreate?.(newPatientData);
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  // Convert Redux Patient to mockData Patient format for PatientDrawer
  const convertToMockDataPatient = (reduxPatient: Patient) => ({
    key: reduxPatient.id,
    id: reduxPatient.id,
    name: reduxPatient.name,
    email: reduxPatient.email,
    phone: reduxPatient.phone || '',
    gender: (reduxPatient.gender as 'Male' | 'Female') || 'Male',
    dob: reduxPatient.dob || '',
    physician: reduxPatient.physician.name,
    addressInfo: {
      address: reduxPatient.addressInfo?.address || '',
      city: reduxPatient.addressInfo?.city || '',
      state: reduxPatient.addressInfo?.state || '',
      country: reduxPatient.addressInfo?.country || '',
    },
    registrationDate: new Date().toLocaleDateString('vi-VN'),
    facility: 'ITR Hospital',
    status: 'Tái kết nối' as const
  });

  return (
    <PatientDrawer
      open={open}
      patient={patient ? convertToMockDataPatient(patient) : undefined}
      onClose={onClose}
      onUpdate={handleUpdate}
      onCreate={handleCreate}
      mode={mode}
    />
  );
};

export default PatientDrawerWrapper;
