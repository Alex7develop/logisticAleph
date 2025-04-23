import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import '@style/normalize.css';
import '@style/index.css';
// import '@style/scroll-bar.css'; // Removed
// import '@style/pages.css'; // Removed

// Components
// import { Provider } from 'react-redux'; // Removed Redux
import { RouterProvider } from 'react-router-dom';
// import { store } from './store'; // Removed Redux store
import router from './routes';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    // <Provider store={store}> // Removed Redux Provider
      <RouterProvider router={router} />
    // </Provider> // Removed Redux Provider
  );
  // const element = React.createElement(App, {}, null);
  // root.render(
  //   <Provider store={store}>
  //     <RouterProvider router={router} />
  //   </Provider >
  // );
}
