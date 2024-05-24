import React from 'react';
import { ConfigProvider, theme } from "antd";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import { Paths } from './paths';
import { Login } from './pages/login';
import { Register } from './pages/register';
import './index.css';
import { Auth } from './features/auth/auth';
import { Publications } from './pages/publications';
import { AddPublication } from './pages/add-publication';
import { Status } from './pages/status';
import { Publication } from './pages/publication';
import { EditPublication } from './pages/edit-publication';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Publications />
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: Paths.publicationAdd,
    element: <AddPublication />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.publication}/:id`,
    element: <Publication />,
  },
  {
    path: `${Paths.publicationEdit}/:id`,
    element: <EditPublication />,
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
          algorithm: theme.darkAlgorithm,
        }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();