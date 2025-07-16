import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReactTogether } from 'react-together';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReactTogether
      sessionParams={{
        apiKey: process.env.VITE_MULTISYNQ_APP_ID,
        name: 'monchat-global-room',
        password: 'monchatglobal'
      }}
    >
      <App />
    </ReactTogether>
  </React.StrictMode>
);
