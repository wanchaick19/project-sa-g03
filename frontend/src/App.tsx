import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Topbar from './components/navbar/Topbar';
import Home from './pages/homepage/Home';
import Reserve from './pages/reserve/Reserve';
import SignInPage  from './pages/authentication/Login/Login';
import SignUpPage from './pages/Register/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingComponent from './components/loading/LoadingComponent';
import UserEdit from './pages/users/edit';
import ReserveDashboard from './pages/reserve/reserveDashboard';
import Registershop from './pages/shop/RegisterShop';
import Map from './pages/map/Map';
import PaymentDashboard from './pages/payment/PaymentDashboard';
import PaymentC from './pages/payment/PaymentC';
import Payments from './pages/payment/Payment';

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
          <Route path="/edit-profile" element={<UserEdit />} />
          <Route path="/reserve_dashboard" element={<ReserveDashboard />} />
          <Route path="/register" element={<Registershop />} />
          <Route path="/map" element={<Map />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/PaymentC" element={<PaymentC />} />
          <Route path="/payment_dashboard" element={<PaymentDashboard />} />
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
 