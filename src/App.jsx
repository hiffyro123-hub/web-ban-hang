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

// Vệ sĩ kiểm tra F5: CỨ F5 LÀ VỀ TRANG CHỦ
function RedirectOnRefresh() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // ĐÃ SỬA LẠI: Bỏ ngoại lệ /auth đi. Giờ chỉ cần đường dẫn khác '/' là sẽ bị đẩy về '/'
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