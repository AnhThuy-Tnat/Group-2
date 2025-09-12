import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import './App.css';
import AppRoutes from './routes/index.tsx';


const App: React.FC = () => {

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#007bff',
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
};

export default App;

