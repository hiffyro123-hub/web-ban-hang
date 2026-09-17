import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Kiểm tra xem người dùng ĐÃ ĐĂNG NHẬP CHƯA
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 2. Lấy giỏ hàng thật từ bộ nhớ ra
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // CHÌA KHÓA Ở ĐÂY: Nếu đăng nhập thì hiện đồ, nếu đăng xuất thì trả về rỗng []
  const displayCartItems = isLoggedIn ? cartItems : [];

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems: displayCartItems, // Trả ra giỏ hàng ảo này thay vì giỏ thật
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}