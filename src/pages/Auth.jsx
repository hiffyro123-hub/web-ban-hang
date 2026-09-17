import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Auth() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // QUAN TRỌNG: Chặn trình duyệt tự động F5 khi bấm nút
    
    // Lưu trạng thái đã đăng nhập vào bộ nhớ
    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Đăng nhập thành công!');
    
    // Dùng window.location.href để chuyển thẳng về trang chủ và cập nhật lại thanh Header
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', backgroundColor: 'white' }}>
      <h2 style={{ color: '#008848', marginBottom: '25px' }}>Đăng Nhập</h2>
      
      {/* Phải có onSubmit ở thẻ form này */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          required
          style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          required
          style={{ padding: '12px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <button 
          type="submit" 
          style={{ backgroundColor: '#008848', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
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