import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Topbar from './components/navbar/Topbar';
import Home from './pages/Home';
import Reserve from './pages/Reserve';
import SignInPage  from './pages/authentication/Login/index';
import SignUpPage from './pages/Register/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingComponent from './components/LoadingComponent'; // Import the loading component
import UserInfo  from './components/profile/Profile';
import UserEdit from './pages/users/edit';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


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
 