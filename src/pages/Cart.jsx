import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 1. NẾU CHƯA ĐĂNG NHẬP: Hiển thị yêu cầu đăng nhập
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#d32f2f', marginBottom: '20px' }}>Bạn chưa đăng nhập!</h2>
        <p>Vui lòng đăng nhập để xem giỏ hàng và đặt hàng.</p>
        <Link to="/auth" style={{ textDecoration: 'none', color: 'white', backgroundColor: '#008848', padding: '10px 20px', borderRadius: '4px', display: 'inline-block', marginTop: '10px' }}>
          Đăng Nhập Ngay
        </Link>
      </div>
    );
  }

  // 2. NẾU ĐÃ ĐĂNG NHẬP NHƯNG GIỎ HÀNG TRỐNG
  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: '#008848' }}>Giỏ hàng của bạn đang trống</h2>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', backgroundColor: '#008848', padding: '10px 20px', borderRadius: '4px', display: 'inline-block', marginTop: '10px' }}>
          Quay lại mua sắm
        </Link>
      </div>
    );
  }

  // 3. NẾU ĐÃ ĐĂNG NHẬP VÀ CÓ HÀNG
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#008848', textAlign: 'center', marginBottom: '30px' }}>Giỏ Hàng Của Bạn</h2>
      
      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
          
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>{item.name}</h4>
            <p style={{ color: '#d32f2f', margin: 0, fontWeight: 'bold' }}>{item.price.toLocaleString()} ₫</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
            <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '5px 12px', cursor: 'pointer', border: '1px solid #ccc' }}>-</button>
            <span style={{ margin: '0 15px', fontWeight: 'bold' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '5px 12px', cursor: 'pointer', border: '1px solid #ccc' }}>+</button>
          </div>

          <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
            Xóa
          </button>
        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: '30px' }}>
        <h3>Tổng tiền: <span style={{ color: '#d32f2f', fontSize: '24px' }}>{totalPrice.toLocaleString()} ₫</span></h3>
        <button style={{ backgroundColor: '#008848', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '4px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          TIẾN HÀNH THANH TOÁN
        </button>
      </div>
    </div>
  );
}

export default Cart;