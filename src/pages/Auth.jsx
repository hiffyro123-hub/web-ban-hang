import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

function Auth() {
  const navigate = useNavigate();
  const { login } = useContext(CartContext); // Gọi hàm login mượt mà từ Context

  const handleLogin = (e) => {
    e.preventDefault();
    login(); // Chạy lệnh đăng nhập
    toast.success('Đăng nhập thành công!');
    navigate('/'); // CHÌA KHÓA MƯỢT MÀ: Lướt về trang chủ không chớp F5
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: 'white' }}>
      <h2 style={{ color: '#008848', marginBottom: '25px' }}>Đăng Nhập</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Mật khẩu" required style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ backgroundColor: '#008848', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          ĐĂNG NHẬP
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        <a href="#" style={{ color: '#0056b3', textDecoration: 'underline' }}>Chưa có tài khoản? Đăng ký ngay</a>
      </p>
    </div>
  );
}

export default Auth;