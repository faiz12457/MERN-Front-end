import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import { store } from './redux-store/store.js';

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Provider store={store} >
  <ToastContainer position="top-center" />
  <App />
  </Provider>
   
 // </StrictMode>,
)
