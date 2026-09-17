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

// Vệ sĩ kiểm tra F5
function RedirectOnRefresh() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // ĐÃ SỬA Ở ĐÂY: Thêm "&& location.pathname !== '/auth'"
    // Nghĩa là: Nếu F5 ở trang khác "/" (Trang chủ) VÀ khác "/auth" (Đăng nhập) thì mới văng về Trang chủ
    if (isReload && location.pathname !== '/' && location.pathname !== '/auth') {
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