import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apolloClient } from '../../apolloClient';
import { gql } from '@apollo/client';

// GraphQL queries
const GET_PATIENTS = gql`
  query GetPatients($page: Int, $limit: Int, $filter: String) {
    patients(page: $page, limit: $limit, filter: $filter) {
      data {
        id
        name
        email
        phone
        gender
        dob
        physician {
          id
          name
          email
        }
        addressInfo {
          address
          city
          state
          country
        }
        country
      }
      total
    }
  }
`;


const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      name
      email
      phone
      gender
      dob
      physician {
        id
        name
        email
      }
      addressInfo {
        address
        city
        state
        country
      }
    }
  }
`;

const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: PatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      name
      email
      phone
      gender
      dob
      physician {
        id
        name
        email
      }
      addressInfo {
        address
        city
        state
        country
      }
    }
  }
`;

const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;

// Types
export interface AddressInfo {
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface Physician {
  id: string;
  name: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dob?: string;
  physician: Physician;
  addressInfo?: AddressInfo;
  country?: string;
}

export interface PatientInput {
  email: string;
  name: string;
  phone?: string;
  gender?: string;
  dob?: string;
  physician: string;
  addressInfo?: AddressInfo;
  country?: string;
}

export interface PatientFilters {
  search: string;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface PatientState {
  patients: Patient[];
  currentPatient: Patient | null;
  loading: boolean;
  error: string | null;
  filters: PatientFilters;
  pagination: Pagination;
}

const initialState: PatientState = {
  patients: [],
  currentPatient: null,
  loading: false,
  error: null,
  filters: {
    search: ''
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
};

// Async thunks asynchronous logic để fetch patients
// fetchPatients là một async thunk để fetch patients từ backend
export const fetchPatients = createAsyncThunk(
  'patient/fetchPatients',
  async (params: { page?: number; limit?: number; filter?: string } = {}, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_PATIENTS,
        variables: {
          page: params.page || 1,
          limit: params.limit || 10,
          filter: params.filter || ''
        }
      });
      //  Trả về data cho Redux là data từ backend
      return (data as any).patients;
    } catch (error: any) {
      //  Xử lý lỗi nếu có
      return rejectWithValue(error.message);
    }
  }
);


export const createPatient = createAsyncThunk(
  'patient/createPatient',
  async (input: PatientInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PATIENT,
        variables: { input }
      });
      return (data as any).createPatient;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async ({ id, input }: { id: string; input: PatientInput }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_PATIENT,
        variables: { id, input }
      });
      return (data as any).updatePatient;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// deletePatient là một async thunk để delete patient từ backend
export const deletePatient = createAsyncThunk(
  'patient/deletePatient',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_PATIENT,
        variables: { id }
      });
      return { id, success: (data as any).deletePatient }; //  Trả về id và success từ backend
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Patient slice
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setCurrentPatient: (state, action: PayloadAction<Patient | null>) => {
      state.currentPatient = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<PatientFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<Pagination>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  
  extraReducers: (builder) => {
    // Fetch patients
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload.data;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.patients.findIndex(patient => patient.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
        if (state.currentPatient && state.currentPatient.id === action.payload.id) {
          state.currentPatient = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete patient
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter(patient => patient.id !== action.payload.id);
        state.pagination.total -= 1;
        if (state.currentPatient && state.currentPatient.id === action.payload.id) {
          state.currentPatient = null;
        }
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Export actions
export const {
  setCurrentPatient,
  setFilters,
  setPagination
} = patientSlice.actions;

// Export reducer
export default patientSlice.reducer;
