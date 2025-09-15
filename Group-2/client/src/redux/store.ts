import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import patientReducer from './patient/patientSlice';
import physicianReducer from './physician/physicianSlice';

// Root reducer - Kết hợp tất cả reducers
const rootReducer = combineReducers({
  patient: patientReducer,  // Quản lý state bệnh nhân
  physician: physicianReducer, // Quản lý state bác sĩ
});

// Lưu state vào localStorage
const persistConfig = {
  key: 'root-v2',
  storage,
  whitelist: ['patient','physician'], // Chỉ persist 2 slice này
};

const persistedReducer = persistReducer(persistConfig, rootReducer); 

// Tạo store với middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
