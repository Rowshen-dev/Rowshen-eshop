import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const initialReviews = {
  1: [{ id: 1, name: 'Алексей', rating: 5, text: 'Отличный телефон, очень доволен покупкой!', date: '12.04.2025' }],
  2: [{ id: 1, name: 'Мария', rating: 4, text: 'Хороший аппарат, камера супер.', date: '01.05.2025' }],
};

const s = {
  wrap: { padding: 40, maxWidth: 1000, margin: '0 auto' },
  back: { color: '#888', textDecoration: 'none', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 },
  imgBox: { borderRadius: 12, overflow: 'hidden', border: '1px solid #2a2a2a', aspectRatio: '1' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  category: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Space Mono', monospace", marginBottom: 12 },
  name: { fontSize: 26, fontWeight: 800, color: '#f0f0f0', margin: '0 0 16px', letterSpacing: -0.5, lineHeight: 1.3 },
  stars: { fontSize: 14, color: '#888', marginBottom: 24 },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 },
  price: { fontSize: 36, fontWeight: 800, color: '#f0f0f0', fontFamily: "'Space Mono', monospace" },
  oldPrice: { fontSize: 18, color: '#555', textDecoration: 'line-through', fontFamily: "'Space Mono', monospace" },
  discount: { background: 'rgba(255,77,0,0.1)', color: '#ff4d00', padding: '3px 8px', borderRadius: 4, fontSize: 13, fontWeight: 700 },
  btnBuy: (added) => ({ width: '100%', padding: 16, border: 'none', cursor: 'pointer', borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif", background: added ? 'transparent' : '#ff4d00', color: added ? '#ff4d00' : '#fff', outline: added ? '1px solid #ff4d00' : 'none' }),
  btnCompare: { width: '100%', padding: 12, border: '1px solid #2a2a2a', cursor: 'pointer', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", background: 'transparent', color: '#888', marginTop: 10 },
  btnCompareActive: { width: '100%', padding: 12, border: '1px solid #00c2ff', cursor: 'pointer', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", background: 'rgba(0,194,255,0.08)', color: '#00c2ff', marginTop: 10 },
  divider: { borderTop: '1px solid #2a2a2a', margin: '28px 0' },
  featureRow: { display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0' },
  featureLabel: { color: '#888' },
  featureVal: { color: '#f0f0f0', fontWeight: 600 },
  reviewsSection: { marginTop: 60 },
  reviewsTitle: { fontSize: 22, fontWeight: 800, color: '#f0f0f0', margin: '0 0 24px', letterSpacing: -0.5 },
  reviewCard: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20, marginBottom: 14 },
  reviewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reviewName: { fontWeight: 700, color: '#f0f0f0', fontSize: 15 },
  reviewDate: { color: '#555', fontSize: 13 },
  reviewText: { color: '#ccc', fontSize: 14, lineHeight: 1.6 },
  reviewForm: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24, marginTop: 24 },
  formTitle: { fontSize: 16, fontWeight: 700, color: '#f0f0f0', marginBottom: 16 },
  input: { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 14px', color: '#f0f0f0', fontSize: 14, fontFamily: "'Syne', sans-serif", marginBottom: 12, boxSizing: 'border-box' },
  textarea: { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 8, padding: '10px 14px', color: '#f0f0f0', fontSize: 14, fontFamily: "'Syne', sans-serif", marginBottom: 12, boxSizing: 'border-box', minHeight: 90, resize: 'vertical' },
  submitBtn: { padding: '10px 24px', background: '#ff4d00', border: 'none', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer' },
  starsRow: { display: 'flex', gap: 6, marginBottom: 12 },
  starBtn: (active) => ({ fontSize: 24, cursor: 'pointer', background: 'none', border: 'none', color: active ? '#ffd166' : '#333', padding: 0 }),
  counter: { display: 'flex', alignItems: 'center', width: '100%', borderRadius: 8, outline: '1px solid #ff4d00', overflow: 'hidden' },
  counterBtn: { width: 52, height: 52, background: 'transparent', border: 'none', color: '#ff4d00', fontSize: 22, cursor: 'pointer', fontFamily: "'Syne', sans-serif", flexShrink: 0 },
  counterNum: { flex: 1, textAlign: 'center', color: '#f0f0f0', fontSize: 16, fontWeight: 700, fontFamily: "'Space Mono', monospace" },
};

export default function ProductPage({ addToCart, cart, onQty, compare, toggleCompare }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [reviews, setReviews] = useState(initialReviews[Number(id)] || []);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const cartItem = cart && cart.find(i => i.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  if (!product) return <div style={s.wrap}><p style={{ color: '#888' }}>Товар не найден</p></div>;

  const inCompare = compare && compare.includes(product.id);
  const disc = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : product.rating;

  const submitReview = () => {
    if (!name.trim() || !text.trim()) return;
    setReviews(prev => [...prev, { id: Date.now(), name, rating, text, date: new Date().toLocaleDateString('ru-RU') }]);
    setName(''); setText(''); setRating(5);
  };

  return (
    <div style={s.wrap}>
      <Link to="/catalog" style={s.back}>← Назад в каталог</Link>
      <div style={s.layout}>
        <div style={s.imgBox}>
          <img src={product.image} alt={product.name} style={s.img} />
        </div>
        <div>
          <div style={s.category}>{product.category}</div>
          <h1 style={s.name}>{product.name}</h1>
          <div style={s.stars}>⭐ {avgRating} · {reviews.length} отзывов</div>
          <div style={s.priceRow}>
            <div style={s.price}>{product.price.toLocaleString('ru-RU')} tmt</div>
            {product.oldPrice && <>
              <div style={s.oldPrice}>{product.oldPrice.toLocaleString('ru-RU')} tmt</div>
              <div style={s.discount}>−{disc}%</div>
            </>}
          </div>
          
        {qty === 0 ? (
          <button style={s.btnBuy(false)} onClick={() => addToCart(product)}>
            Добавить в корзину
          </button>
        ) : (
          <div style={s.counter}>
            <button style={s.counterBtn} onClick={() => onQty(product.id, qty - 1)}>−</button>
            <span style={s.counterNum}>{qty}</span>
            <button style={s.counterBtn} onClick={() => onQty(product.id, qty + 1)}>+</button>
          </div>
        )}


          <button
            style={inCompare ? s.btnCompareActive : s.btnCompare}
            onClick={() => toggleCompare && toggleCompare(product.id)}
          >
            {inCompare ? '✓ В сравнении' : '⇄ Добавить к сравнению'}
          </button>
          <div style={s.divider} />
          {[['Категория', product.category], ['Рейтинг', `⭐ ${avgRating}`], ['Отзывов', reviews.length], ['Наличие', '✓ Есть на складе'], ['Доставка', '1–3 рабочих дня']].map(([label, val]) => (
            <div key={label} style={s.featureRow}>
              <span style={s.featureLabel}>{label}</span>
              <span style={{ ...s.featureVal, color: label === 'Наличие' ? '#4caf50' : '#f0f0f0' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Отзывы */}
      <div style={s.reviewsSection}>
        <div style={s.reviewsTitle}>Отзывы ({reviews.length})</div>
        {reviews.length === 0 && <p style={{ color: '#888', marginBottom: 16 }}>Пока нет отзывов — будь первым!</p>}
        {reviews.map(r => (
          <div key={r.id} style={s.reviewCard}>
            <div style={s.reviewHeader}>
              <div>
                <span style={s.reviewName}>{r.name}</span>
                <span style={{ marginLeft: 10, color: '#ffd166' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <span style={s.reviewDate}>{r.date}</span>
            </div>
            <div style={s.reviewText}>{r.text}</div>
          </div>
        ))}

        <div style={s.reviewForm}>
          <div style={s.formTitle}>Оставить отзыв</div>
          <div style={s.starsRow}>
            {[1,2,3,4,5].map(star => (
              <button key={star} style={s.starBtn(star <= rating)} onClick={() => setRating(star)}>★</button>
            ))}
          </div>
          <input style={s.input} placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} />
          <textarea style={s.textarea} placeholder="Напишите отзыв..." value={text} onChange={e => setText(e.target.value)} />
          <button style={s.submitBtn} onClick={submitReview}>Отправить отзыв</button>
        </div>
      </div>
    </div>
  );
}