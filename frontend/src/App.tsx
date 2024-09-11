import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Topbar from './components/navbar/Topbar';
import Home from './pages/homepage/Home';
import Reserve from './pages/reserve/Reserve';
import SignInPage  from './pages/authentication/Login/index';
import SignUpPage from './pages/Register/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingComponent from './components/loading/LoadingComponent'; // Import the loading component
import UserInfo  from './components/profile/Profile';
import UserEdit from './pages/users/edit';
import ReserveDashboard from './pages/reserve/reserveDashboard';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();



  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // ปรับดีเลย์ตรงนี้ๆ

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Topbar />
      {loading ? (
        <LoadingComponent />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserInfo />} />
          <Route path="/edit-profile" element={<UserEdit />} />
          <Route path="/reserve_dashboard" element={<ReserveDashboard />} />

        </Routes>
      )}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
 