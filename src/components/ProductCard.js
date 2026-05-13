import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

const badgeColor = { 'Хит': '#ff4d00', 'Новинка': '#00c2ff', 'Скидка': '#2a2a2a' };

const s = {
  card: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden', transition: 'all 0.25s', cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  imgWrap: { width: '100%', aspectRatio: '1', overflow: 'hidden', background: '#111', position: 'relative' },
  img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' },
  badge: (type) => ({ position: 'absolute', top: 12, left: 12, background: badgeColor[type] || '#2a2a2a', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 4, letterSpacing: 0.5, fontFamily: "'Space Mono', monospace" }),
  heartBtn: (active) => ({ position: 'absolute', top: 10, right: 10, background: active ? 'rgba(255,77,0,0.15)' : 'rgba(0,0,0,0.5)', border: active ? '1px solid #ff4d00' : '1px solid #333', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }),
  body: { padding: 16, flex: 1, display: 'flex', flexDirection: 'column' },
  category: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, fontFamily: "'Space Mono', monospace" },
  name: { fontSize: 15, fontWeight: 600, color: '#f0f0f0', lineHeight: 1.4, marginBottom: 10, flex: 1 },
  stars: { fontSize: 13, color: '#888', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 },
  starIcon: { color: '#ffd166' },
  prices: { display: 'flex', alignItems: 'baseline', gap: 8 },
  price: { fontSize: 20, fontWeight: 700, color: '#f0f0f0', fontFamily: "'Space Mono', monospace" },
  oldPrice: { fontSize: 14, color: '#555', textDecoration: 'line-through', fontFamily: "'Space Mono', monospace" },
  addBtn: { width: '100%', padding: '10px', margin: '14px 0 0', background: 'transparent', border: '1px solid #2a2a2a', color: '#f0f0f0', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
  addBtnActive: { width: '100%', padding: '10px', margin: '14px 0 0', background: '#ff4d00', border: '1px solid #ff4d00', color: '#fff', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 },
  qtyRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e1e1e', border: '1px solid #ff4d00', borderRadius: 8, overflow: 'hidden', marginTop: 14 },
  qtyBtn: { background: 'none', border: 'none', color: '#ff4d00', fontSize: 20, fontWeight: 700, cursor: 'pointer', padding: '8px 16px', fontFamily: "'Syne', sans-serif" },
  qtyNum: { color: '#f0f0f0', fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700 },
};

export default function ProductCard({ product, addToCart, cart, favorites = [], toggleFavorite }) {
  const inCart = cart && cart.some(i => i.id === product.id);
  const isFav = favorites.includes(product.id);

  return (
    <div style={s.card}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4d00'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,77,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div style={s.imgWrap}>
          <img src={product.image} alt={product.name} style={s.img} />
          {product.badge && <span style={s.badge(product.badge)}>{product.badge}</span>}
          <button style={s.heartBtn(isFav)} onClick={e => { e.preventDefault(); toggleFavorite && toggleFavorite(product.id); }}>
            {isFav ? <AiFillHeart size={16} color="#ff4d00" /> : <FiHeart size={16} color="#aaa" />}
          </button>
        </div>
        <div style={s.body}>
          <div style={s.category}>{product.category}</div>
          <div style={s.name}>{product.name}</div>
          <div style={s.stars}>
            <span style={s.starIcon}>★</span>
            {product.rating} · {product.reviews} отзывов
          </div>
          <div style={s.prices}>
            <div style={s.price}>{product.price.toLocaleString('ru-RU')} ₽</div>
            {product.oldPrice && <div style={s.oldPrice}>{product.oldPrice.toLocaleString('ru-RU')} ₽</div>}
          </div>
        </div>
      </Link>
      <div style={{ padding: '0 16px 16px' }}>
        {inCart ? (
          <div style={s.qtyRow}>
            <button style={s.qtyBtn} onClick={() => addToCart({ ...product, _action: 'decrease' })}>−</button>
            <span style={s.qtyNum}>{cart.find(i => i.id === product.id)?.qty || 1}</span>
            <button style={s.qtyBtn} onClick={() => addToCart({ ...product, _action: 'increase' })}>+</button>
          </div>
        ) : (
          <button style={s.addBtn}
            onMouseEnter={e => { e.currentTarget.style.background = '#ff4d00'; e.currentTarget.style.borderColor = '#ff4d00'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#2a2a2a'; }}
            onClick={() => addToCart(product)}>
            <FiShoppingCart size={15} /> В корзину
          </button>
        )}
      </div>
    </div>
  );
}