import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  // BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './routes/Home';
import UploadMood from './routes/UploadMood';
import MoodDistribution from './routes/MoodDistrubtion';
import NearByHappyMood from './routes/NearByHappyMood';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const path = window.location.pathname;
    if (!user) {
      if (path === '/register') {
        navigate('/register')
      } else {
        navigate('/login')
      }
    } else {
      let redirect = path === '/' ? '/home' : path
      navigate(redirect);
    }
  }, [user, navigate])

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/upload-mood" element={<UploadMood />} />
      <Route path="/mood-distribution" element={<MoodDistribution />} />
      <Route path="/nearby-happy-mood" element={<NearByHappyMood />} />
      <Route path='/login' element={<Login />} /> 
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default Dashboard