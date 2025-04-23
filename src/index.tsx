import React from 'react';
import ReactDOM from 'react-dom/client';

import '@style/normalize.css';
import '@style/index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
      <RouterProvider router={router} />
  );
}
