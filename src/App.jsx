import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import { CartProvider } from './context/CartContext';
import './App.css';

// --- BẮT ĐẦU PHẦN NEW ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// --- KẾT THÚC PHẦN NEW ---

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        
        {/* NEW: Khung hiển thị thông báo, đặt ở góc phải trên, tự tắt sau 2 giây */}
        <ToastContainer position="top-center" autoClose={2000} />
        
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;