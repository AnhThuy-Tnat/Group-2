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

// Filtered patients selector
export const useFilteredPatients = () => {
  const { patients, filters } = usePatientSelectors();
  
  let filtered = [...patients];
  
  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(patient => 
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      (patient.phone && patient.phone.includes(searchLower))
    );
  }
  
  // Filter by status (you can add more filters as needed)
  if (filters.status !== 'all') {
    // Add status filtering logic here if needed
  }
  
  // Filter by province
  if (filters.province !== 'all') {
    filtered = filtered.filter(patient => 
      patient.addressInfo?.state === filters.province
    );
  }
  
  return filtered;
};


export const usePatientStats = () => {
  const { patients } = usePatientSelectors();
  
  return {
    total: patients.length,
    connected: patients.filter(p => p.physician).length, // Assuming patients with physician are "connected"
    disconnected: patients.filter(p => !p.physician).length,
  };
};
