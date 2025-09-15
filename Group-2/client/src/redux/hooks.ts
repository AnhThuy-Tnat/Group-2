import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector<RootState, T>(selector);

// Patient selectors
export const usePatientSelectors = () => {
  const patients = useAppSelector(state => state.patient.patients);
  const currentPatient = useAppSelector(state => state.patient.currentPatient);
  const loading = useAppSelector(state => state.patient.loading);
  const error = useAppSelector(state => state.patient.error);
  const filters = useAppSelector(state => state.patient.filters);
  const pagination = useAppSelector(state => state.patient.pagination);

  return {
    patients,
    currentPatient,
    loading,
    error,
    filters,
    pagination,
  };
};



export const usePatientStats = () => {
  const { patients } = usePatientSelectors();
  
  return {
    total: patients.length,
  };
};
