import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#008848', marginBottom: '30px' }}>
        TẤT CẢ SẢN PHẨM
      </h2>
      
      {/* Lưới hiển thị sản phẩm (Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;