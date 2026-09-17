import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cartItems, isLoggedIn, logout } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Đăng xuất mượt
    navigate('/'); // Lướt về trang chủ mượt
  };

  return (
    <header style={{ backgroundColor: '#008848', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
        🛒 BÁCH HÓA ONLINE
      </Link>

      <div>
        <Link to="/cart" style={{ backgroundColor: '#ffc107', color: 'black', padding: '10px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px' }}>
          Giỏ hàng ({cartItems.length})
        </Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid white', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Đăng xuất
          </button>
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