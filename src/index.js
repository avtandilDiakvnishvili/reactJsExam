import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { getProductsLoader } from './routes/root';
import ViewProduct, { viewProductAction } from './routes/product';
import EditProduct, { updateProductAction, getProductLoader } from './routes/edit';
import AddProduct, { addProductFunction } from './routes/addproduct';

import ErrorPage from './error-page';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: getProductsLoader,
    // action: createProductAction,
    children: [
      {
        path: 'product/products',
        element: <ViewProduct />,
        loader: getProductsLoader,
        action: viewProductAction,
      },
      {
        path: '/product/:productId/edit',
        element: <EditProduct />,
        loader: getProductLoader,
        action: updateProductAction,
      },
      {
        path: '/product/add',
        element: <AddProduct />,
        action: addProductFunction
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
