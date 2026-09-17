import React, { useState } from 'react';

function Auth() {
  // Biến state để chuyển đổi qua lại giữa form Đăng nhập và Đăng ký
  const [isLogin, setIsLogin] = useState(true);
  
  // Các biến lưu thông tin người dùng nhập vào
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trang web bị tải lại khi bấm Submit

    if (isLogin) {
      // LOGIC ĐĂNG NHẬP
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đã đăng nhập
        window.location.href = '/'; // Chuyển hướng về trang chủ
      } else {
        alert('Sai email hoặc mật khẩu! Vui lòng thử lại.');
      }
    } else {
      // LOGIC ĐĂNG KÝ
      const newUser = { name, email, password };
      localStorage.setItem('user', JSON.stringify(newUser)); // Lưu tài khoản vào bộ nhớ
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setIsLogin(true); // Tự động chuyển qua form đăng nhập
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#008848' }}>
        {isLogin ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản'}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {/* Nếu đang ở form Đăng ký thì mới hiện ô nhập Tên */}
        {!isLogin && (
          <input 
            type="text" placeholder="Họ và tên của bạn" required
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        )}
        
        <input 
          type="email" placeholder="Email" required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input 
          type="password" placeholder="Mật khẩu" required
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <button type="submit" style={{ backgroundColor: '#008848', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          {isLogin ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
        </span>
      </div>
    </div>
  );
}

export default Auth;