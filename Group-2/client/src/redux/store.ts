import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import patientReducer from './patient/patientSlice';
import physicianReducer from './physician/physicianSlice';

// Root reducer
const rootReducer = combineReducers({
  patient: patientReducer,
  physician: physicianReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['patient','physician'], // Persist patient and physician state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
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
