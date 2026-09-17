import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import { CartProvider } from './context/CartContext';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component con chuyên làm nhiệm vụ bắt sự kiện F5 để đá về trang chủ
function RedirectOnRefresh() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Kiểm tra xem trình duyệt có vừa tải lại trang hay không
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // Nếu là F5 và KHÔNG ĐANG ở trang chủ ("/") thì lập tức đưa về "/"
    if (isReload && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [navigate, location]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <RedirectOnRefresh />
        
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;