import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import 'antd/dist/reset.css';
import { ApolloProvider } from '@apollo/client/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { apolloClient } from './apolloClient';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
