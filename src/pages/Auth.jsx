import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Dữ liệu nhập vào
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Trạng thái báo lỗi hiển thị ngay dưới ô nhập
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useContext(CartContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Reset lỗi mỗi lần bấm nút
    setEmailError('');
    setPasswordError('');

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    const userName = localStorage.getItem('userName') || 'bạn';

    if (isLoginMode) {
      // ================= 1. KHI BẤM ĐĂNG NHẬP =================
      if (email !== savedEmail) {
        // TÀI KHOẢN CHƯA TỒN TẠI: Tự động chuyển sang form Đăng ký
        toast.warn('Tài khoản chưa tồn tại! Mời bạn đăng ký nhé.');
        setIsLoginMode(false); // Lật sang Đăng ký
        setPassword('');       // Xóa trắng mật khẩu cũ
        setEmailError('');     // Xóa thông báo lỗi
        // Ô email sẽ tự động được giữ lại nhờ state `email`
      } 
      else if (password !== savedPassword) {
        // SAI MẬT KHẨU: Hiện lỗi đỏ và bắt nhập lại mật khẩu
        setPasswordError('Mật khẩu không chính xác! Vui lòng nhập lại.');
        setPassword(''); 
      } 
      else {
        // ĐÚNG HOÀN TOÀN: Cho phép đăng nhập
        login(); 
        toast.success(`Đăng nhập thành công! Chào ${userName} nhé.`);
        navigate('/'); 
      }
    } else {
      // ================= 2. KHI BẤM ĐĂNG KÝ =================
      if (email === savedEmail) {
        // Chặn người dùng nếu cố tình đăng ký đè lên email đã có
        setEmailError('Email này đã được sử dụng! Vui lòng Đăng nhập.');
        toast.error('Đăng ký thất bại!');
      } else {
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        
        toast.success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        
        setIsLoginMode(true); 
        setPassword(''); 
      }
    }
  };

  // Hàm chuyển đổi form qua lại (bằng tay)
  const toggleMode = (mode) => {
    setIsLoginMode(mode);
    setPassword(''); 
    setShowPassword(false);
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div style={{ 
      maxWidth: '420px', margin: '60px auto', padding: '35px', 
      backgroundColor: 'white', borderRadius: '12px', 
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#008848', marginBottom: '25px', fontSize: '26px', textAlign: 'center' }}>
        {isLoginMode ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN'}
      </h2>
      
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Ô HỌ TÊN (Chỉ hiện khi Đăng ký) */}
        {!isLoginMode && (
          <input 
            type="text" placeholder="Họ và tên của bạn" required 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)}
            style={{ padding: '14px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px', outline: 'none' }} 
          />
        )}
        
        {/* Ô EMAIL */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="email" placeholder="Email đăng nhập" required 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            style={{ 
              padding: '14px', borderRadius: '6px', fontSize: '15px', outline: 'none',
              border: emailError ? '2px solid #d32f2f' : '1px solid #ccc' 
            }} 
          />
          {emailError && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '5px', fontWeight: '500' }}>{emailError}</span>}
        </div>
        
        {/* Ô MẬT KHẨU */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mật khẩu (tối thiểu 6 ký tự)" required minLength="6"
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              style={{ 
                width: '100%', padding: '14px', paddingRight: '45px', borderRadius: '6px', fontSize: '15px', outline: 'none', boxSizing: 'border-box',
                border: passwordError ? '2px solid #d32f2f' : '1px solid #ccc' 
              }} 
            />
            <button
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#666'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {passwordError && <span style={{ color: '#d32f2f', fontSize: '13px', marginTop: '5px', fontWeight: '500' }}>{passwordError}</span>}
        </div>
        
        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#008848', color: 'white', padding: '15px', border: 'none', 
            borderRadius: '6px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' 
          }}
        >
          {isLoginMode ? 'ĐĂNG NHẬP NGAY' : 'ĐĂNG KÝ NGAY'}
        </button>
      </form>

      <div style={{ marginTop: '25px', fontSize: '15px', color: '#555', textAlign: 'center' }}>
        {isLoginMode ? (
          <p>Chưa có tài khoản? <strong style={{ color: '#008848', cursor: 'pointer' }} onClick={() => toggleMode(false)}>Đăng ký tại đây</strong></p>
        ) : (
          <p>Đã có tài khoản? <strong style={{ color: '#008848', cursor: 'pointer' }} onClick={() => toggleMode(true)}>Đăng nhập ngay</strong></p>
        )}
      </div>
    </div>
  );
}

export default Auth;