import React from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div style={{ padding: 40, maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 12 }}>Заказ оформлен!</h1>
      <p style={{ color: '#888', marginBottom: 32 }}>Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
      <Link to="/" style={{ padding: '12px 28px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700 }}>
        На главную
      </Link>
    </div>
  );
}