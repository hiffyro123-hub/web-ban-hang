import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Kiểm tra xem đã đăng nhập chưa từ bộ nhớ trình duyệt
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
    window.location.href = '/'; // Tải lại trang về trang chủ
  };

  return (
    <header style={{ 
      backgroundColor: '#008848', padding: '15px 30px', display: 'flex', 
      justifyContent: 'space-between', alignItems: 'center', color: 'white' 
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
        🛒 BÁCH HÓA ONLINE
      </Link>
      
      <input 
        type="text" placeholder="Giao nhanh 2H & đúng khung giờ..." 
        style={{ padding: '10px', width: '40%', borderRadius: '4px', border: 'none', outline: 'none' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Nút Giỏ Hàng */}
        <Link to="/cart" style={{ backgroundColor: '#ffb700', color: '#333', textDecoration: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold' }}>
          Giỏ hàng ({totalItems})
        </Link>

        {/* Khu vực Đăng nhập / Đăng xuất */}
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Chào, <strong>{user?.name}</strong></span>
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/auth" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', border: '1px solid white', padding: '8px 15px', borderRadius: '4px' }}>
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;