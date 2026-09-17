import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Quản lý trạng thái Đăng nhập mượt mà
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // 2. Quản lý Giỏ hàng
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
      isLoggedIn, login, logout, // Xuất công cụ đăng nhập ra
      cartItems: displayCartItems, 
      addToCart, removeFromCart, updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}