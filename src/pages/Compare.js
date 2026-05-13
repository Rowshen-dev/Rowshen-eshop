import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const s = {
  wrap: { padding: 40, maxWidth: 1100, margin: '0 auto' },
  h1: { fontSize: 28, fontWeight: 800, color: '#f0f0f0', margin: '0 0 32px', letterSpacing: -0.5 },
  table: { width: '100%', borderCollapse: 'collapse' },
  thFirst: { width: 180, padding: '14px 16px', background: '#161616', border: '1px solid #2a2a2a', color: '#888', fontSize: 13, textAlign: 'left', fontWeight: 600 },
  th: { padding: '14px 16px', background: '#161616', border: '1px solid #2a2a2a', textAlign: 'center', minWidth: 200 },
  productImg: { width: 100, height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 13, color: '#f0f0f0', fontWeight: 600, lineHeight: 1.4 },
  removeBtn: { marginTop: 8, background: 'none', border: '1px solid #2a2a2a', color: '#888', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontFamily: "'Syne', sans-serif" },
  tdLabel: { padding: '12px 16px', background: '#111', border: '1px solid #2a2a2a', color: '#888', fontSize: 13, fontWeight: 600 },
  td: { padding: '12px 16px', border: '1px solid #2a2a2a', color: '#f0f0f0', fontSize: 14, textAlign: 'center' },
  tdPrice: { padding: '12px 16px', border: '1px solid #2a2a2a', color: '#ff4d00', fontSize: 16, fontWeight: 800, fontFamily: "'Space Mono', monospace", textAlign: 'center' },
  addBtn: { padding: '8px 16px', background: '#ff4d00', border: 'none', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', marginTop: 4 },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: 56, display: 'block', marginBottom: 20 },
  emptyTitle: { color: '#f0f0f0', margin: '0 0 8px' },
  emptyText: { color: '#888', margin: '0 0 24px' },
  goShop: { display: 'inline-block', padding: '12px 28px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700 },
};

const fields = [
  { label: 'Цена', key: 'price', render: (v) => `${v.toLocaleString('ru-RU')} ₽`, isPrice: true },
  { label: 'Категория', key: 'category' },
  { label: 'Рейтинг', key: 'rating', render: (v) => `⭐ ${v}` },
  { label: 'Отзывов', key: 'reviews' },
  { label: 'Бейдж', key: 'badge', render: (v) => v || '—' },
];

export default function Compare({ compare, toggleCompare, addToCart, cart }) {
  const compareProducts = products.filter(p => compare.includes(p.id));

  if (compareProducts.length === 0) return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Сравнение товаров</h1>
      <div style={s.empty}>
        <span style={s.emptyIcon}>⇄</span>
        <h2 style={s.emptyTitle}>Нет товаров для сравнения</h2>
        <p style={s.emptyText}>Добавляйте товары через кнопку на странице товара</p>
        <Link to="/catalog" style={s.goShop}>Перейти в каталог</Link>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Сравнение товаров · {compareProducts.length}</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.thFirst}></th>
              {compareProducts.map(p => (
                <th key={p.id} style={s.th}>
                  <img src={p.image} alt={p.name} style={s.productImg} />
                  <div style={s.productName}>{p.name}</div>
                  <button style={s.removeBtn} onClick={() => toggleCompare(p.id)}>✕ Убрать</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key}>
                <td style={s.tdLabel}>{field.label}</td>
                {compareProducts.map(p => (
                  <td key={p.id} style={field.isPrice ? s.tdPrice : s.td}>
                    {field.render ? field.render(p[field.key]) : p[field.key]}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={s.tdLabel}>В корзину</td>
              {compareProducts.map(p => (
                <td key={p.id} style={s.td}>
                  <button style={s.addBtn} onClick={() => addToCart(p)}>
                    {cart.some(i => i.id === p.id) ? '✓ В корзине' : '+ В корзину'}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}