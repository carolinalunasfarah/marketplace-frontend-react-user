import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './App.jsx';

import DataProvider from "./context/DataContext.jsx";
import CartProvider from './context/CartContext.jsx';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
          <CartProvider>
            <App />
            <ToastContainer />
          </CartProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);