import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiStar } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import PhoneScene from '../components/PhoneScene';
import { products } from '../data/products';

const s = {
  hero: { padding: '60px 40px', background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(255,77,0,0.07) 0%, transparent 70%)', minHeight: 480, display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', alignItems: 'center', gap: 40 },
  heroLeft: { maxWidth: 560 },
  heroRight: { height: window.innerWidth <= 768 ? 320 : 480, width: '100%' },
  tag: { display: 'inline-block', background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.3)', color: '#ff4d00', fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, padding: '5px 12px', borderRadius: 4, marginBottom: 20, textTransform: 'uppercase' },
  h1: { fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, lineHeight: 1.05, color: '#f0f0f0', margin: '0 0 20px', letterSpacing: -2 },
  accent: { color: '#ff4d00' },
  sub: { fontSize: 16, color: '#888', margin: '0 0 32px', lineHeight: 1.7, maxWidth: 440 },
  btns: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15 },
  btnOutline: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', border: '1px solid #2a2a2a', color: '#f0f0f0', textDecoration: 'none', borderRadius: 8, fontSize: 15 },
  statsRow: { display: 'flex', gap: 0, borderBottom: '1px solid #2a2a2a', borderTop: '1px solid #2a2a2a' },
  statItem: { flex: 1, padding: '28px 40px', display: 'flex', alignItems: 'center', gap: 16, borderRight: '1px solid #2a2a2a' },
  statIcon: { width: 44, height: 44, background: 'rgba(255,77,0,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statNum: { display: 'block', fontSize: 22, fontWeight: 800, fontFamily: "'Space Mono', monospace", color: '#f0f0f0' },
  statLabel: { fontSize: 13, color: '#888' },
  section: { padding: '60px 40px' },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 },
  sectionTitle: { fontSize: 26, fontWeight: 800, color: '#f0f0f0', margin: 0, letterSpacing: -0.5 },
  seeAll: { fontSize: 14, color: '#ff4d00', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  catCard: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: '28px 24px', textDecoration: 'none', transition: 'all 0.2s', display: 'block' },
  catName: { fontSize: 16, color: '#f0f0f0', margin: '0 0 4px', fontWeight: 700 },
  catCount: { fontSize: 13, color: '#888', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 },
};

const cats = [
  { icon: '📱', name: 'Смартфоны', count: '2 400+ товаров', slug: 'Смартфоны' },
  { icon: '💻', name: 'Ноутбуки', count: '800+ товаров', slug: 'Ноутбуки' },
  { icon: '🎧', name: 'Аудио', count: '1 200+ товаров', slug: 'Аудио' },
  { icon: '📲', name: 'Планшеты', count: '600+ товаров', slug: 'Планшеты' },
];

const stats = [
  { icon: <FiStar size={20} color="#ff4d00" />, num: '50K+', label: 'Довольных покупателей' },
  { icon: <FiTruck size={20} color="#ff4d00" />, num: '1–3 дн', label: 'Скорость доставки' },
  { icon: <FiShield size={20} color="#ff4d00" />, num: '8 200', label: 'Товаров с гарантией' },
  { icon: <FiHeadphones size={20} color="#ff4d00" />, num: '24/7', label: 'Поддержка клиентов' },
];

export default function Home({ addToCart, cart, favorites, toggleFavorite, dark = true }) {
  const hits = products.filter(p => p.badge === 'Хит' || p.badge === 'Скидка').slice(0, 4);

  return (
    <>
      <div style={s.hero}>
        <div style={s.heroLeft}>
          <div style={s.tag}>Новинки 2025 уже в наличии</div>
          <h1 style={s.h1}>Техника без<br />переплат и<br /><span style={s.accent}>лишних слов</span></h1>
          <p style={s.sub}>Смартфоны, ноутбуки, аудио — всё с гарантией, быстрой доставкой и честными ценами.</p>
          <div style={s.btns}>
            <Link to="/catalog" style={s.btnPrimary}>Смотреть каталог <FiArrowRight size={16} /></Link>
            <Link to="/catalog" style={s.btnOutline}>Акции и скидки</Link>
          </div>
        </div>

        {/* 3D Смартфон */}
        <div style={s.heroRight}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: 14 }}>Загрузка...</div>}>
            <PhoneScene />
          </Suspense>
        </div>
      </div>

      <div style={s.statsRow}>
        {stats.map((st, i) => (
          <div key={i} style={{ ...s.statItem, borderRight: i < stats.length - 1 ? '1px solid #2a2a2a' : 'none' }}>
            <div style={s.statIcon}>{st.icon}</div>
            <div>
              <span style={s.statNum}>{st.num}</span>
              <span style={s.statLabel}>{st.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionHead}><h2 style={s.sectionTitle}>Категории</h2></div>
        <div style={s.catGrid}>
          {cats.map(c => (
            <Link key={c.slug} to={`/catalog?cat=${c.slug}`} style={s.catCard}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4d00'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.transform = 'none'; }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 10 }}>{c.icon}</span>
              <h3 style={s.catName}>{c.name}</h3>
              <p style={s.catCount}>{c.count}</p>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ ...s.section, paddingTop: 0 }}>
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>Хиты и скидки</h2>
          <Link to="/catalog" style={s.seeAll}>Все товары <FiArrowRight size={14} /></Link>
        </div>
        <div style={s.grid}>
          {hits.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} cart={cart}
              favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
    </>
  );
}