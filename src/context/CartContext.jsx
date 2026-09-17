import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify'; // Thêm dòng này

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

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
    
    // Thay alert() cũ bằng dòng này (thông báo màu xanh thành công)
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // ... (giữ nguyên các hàm removeFromCart và updateQuantity ở dưới)
  // ...