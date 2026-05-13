import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const s = {
  wrap: { padding: 40, maxWidth: 1100, margin: '0 auto' },
  h1: { fontSize: 28, fontWeight: 800, color: '#f0f0f0', margin: '0 0 32px', letterSpacing: -0.5 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: 56, display: 'block', marginBottom: 20 },
  emptyTitle: { color: '#f0f0f0', margin: '0 0 8px' },
  emptyText: { color: '#888', margin: '0 0 24px' },
  goShop: { display: 'inline-block', padding: '12px 28px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700 },
};

export default function Favorites({ favorites, toggleFavorite, addToCart, cart }) {
  const favProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Избранное · {favProducts.length}</h1>
      {favProducts.length === 0 ? (
        <div style={s.empty}>
          <span style={s.emptyIcon}>🤍</span>
          <h2 style={s.emptyTitle}>Список пуст</h2>
          <p style={s.emptyText}>Добавляйте товары через сердечко на карточке</p>
          <Link to="/catalog" style={s.goShop}>Перейти в каталог</Link>
        </div>
      ) : (
        <div style={s.grid}>
          {favProducts.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} cart={cart}
              favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}