import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  // Routes,
  // Route,
} from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavigationBar from './components/NavigationBar';
// import Login from './pages/Login';
// import Register from './pages/Register';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationBar></NavigationBar>
        <App />
        {/* <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes> */}
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
