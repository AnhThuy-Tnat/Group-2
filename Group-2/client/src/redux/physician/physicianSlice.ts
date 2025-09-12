import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../apolloClient';
import { gql } from '@apollo/client';

const GET_PHYSICIANS = gql`
  query GetPhysicians {
    physicians {
      id
      name
      email
      title
      phone
      gender
      dob
    }
  }
`;

export interface Physician {
  id: string;
  name: string;
  email: string;
  title: string;
  phone?: string;
  gender?: string;
  dob?: string;
}

interface PhysicianState {
  list: Physician[];
  loading: boolean;
  error: string | null;
}

const initialState: PhysicianState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPhysicians = createAsyncThunk(
  'physician/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({ query: GET_PHYSICIANS, fetchPolicy: 'no-cache' });
      return (data as any).physicians as Physician[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const physicianSlice = createSlice({
  name: 'physician',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhysicians.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhysicians.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPhysicians.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default physicianSlice.reducer;
export type { PhysicianState };

