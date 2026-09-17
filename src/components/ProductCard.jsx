import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Thêm dòng này

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      // Thay alert() cũ bằng dòng này (thông báo màu vàng cảnh báo)
      toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!'); 
      navigate('/auth');
    } else {
      addToCart(product);
    }
  };

  return (
    <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3 style={{ fontSize: '16px', margin: '15px 0 5px 0', color: '#333' }}>{product.name}</h3>
      <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' }}>
        {product.price.toLocaleString()} ₫
      </p>
      
      <button 
        onClick={handleAddToCart}
        style={{ 
          backgroundColor: '#008848', color: 'white', border: 'none', 
          padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold'
      }}>
        CHỌN MUA
      </button>
    </div>
  );
}

export default ProductCard;