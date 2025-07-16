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
        apiKey: '2eCAJvKN9ICrXVOFrcL3Bp6xXg13bS95mYdX0P6ZEx',
        name: 'monchat-global-room',
        password: 'monchatglobal'
      }}
    >
      <App />
    </ReactTogether>
  </React.StrictMode>
);
