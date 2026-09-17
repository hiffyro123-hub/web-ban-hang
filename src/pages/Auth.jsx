import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

function Auth() {
  // Trạng thái để chuyển đổi giữa Đăng nhập và Đăng ký
  const [isLogin, setIsLogin] = useState(true); 
  
  const navigate = useNavigate();
  const { login } = useContext(CartContext);

  // Xử lý Đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    login(); // Gọi hàm login mượt từ Context
    toast.success('Đăng nhập thành công!');
    navigate('/');
  };

  // Xử lý Đăng ký
  const handleRegister = (e) => {
    e.preventDefault();
    // Giả lập lưu tài khoản thành công
    toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
    setIsLogin(true); // Đăng ký xong tự động chuyển về form Đăng nhập
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: 'white' }}>
      <h2 style={{ color: '#008848', marginBottom: '25px' }}>
        {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
      </h2>
      
      {isLogin ? (
        // FORM ĐĂNG NHẬP
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Email" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Mật khẩu" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ backgroundColor: '#008848', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            ĐĂNG NHẬP
          </button>
        </form>
      ) : (
        // FORM ĐĂNG KÝ
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Họ và tên" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="email" placeholder="Email" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Mật khẩu" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ backgroundColor: '#008848', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            ĐĂNG KÝ TÀI KHOẢN
          </button>
        </form>
      )}
      
      {/* Nút chuyển đổi qua lại giữa 2 Form */}
      <p style={{ marginTop: '20px' }}>
        {isLogin ? (
          <span 
            onClick={() => setIsLogin(false)} 
            style={{ color: '#0056b3', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Chưa có tài khoản? Đăng ký ngay
          </span>
        ) : (
          <span 
            onClick={() => setIsLogin(true)} 
            style={{ color: '#0056b3', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Đã có tài khoản? Đăng nhập
          </span>
        )}
      </p>
    </div>
  );
}

export default Auth;