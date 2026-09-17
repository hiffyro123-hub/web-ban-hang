import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cartItems, isLoggedIn, logout } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  const userName = localStorage.getItem('userName') || 'bạn';

  // TÍNH TỔNG SỐ LƯỢNG SẢN PHẨM: Cộng dồn thuộc tính "quantity" của tất cả các món
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header style={{ backgroundColor: '#008848', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* 1. Logo bên trái */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        🛒 BÁCH HÓA ONLINE
      </Link>

      {/* 2. Thanh tìm kiếm ở giữa */}
      <div style={{ flex: 1, margin: '0 40px', maxWidth: '600px' }}>
        <input 
          type="text" 
          placeholder="Giao nhanh 2H & đúng khung giờ..." 
          style={{ 
            width: '100%', 
            padding: '10px 15px', 
            borderRadius: '4px', 
            border: 'none', 
            backgroundColor: '#444', 
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }} 
        />
      </div>

      {/* 3. Cụm nút bên phải */}
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        
        {/* ĐÃ SỬA: Hiển thị totalQuantity thay vì cartItems.length */}
        <Link to="/cart" style={{ backgroundColor: '#ffc107', color: 'black', padding: '10px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>
          Giỏ hàng ({totalQuantity})
        </Link>

        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white', fontSize: '16px' }}>
              Chào, <strong>{userName}</strong>
            </span>
            <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/auth" style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '10px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;