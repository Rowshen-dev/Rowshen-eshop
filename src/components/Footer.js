import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer({ dark = true }) {
  const s = {
    footer: { background: dark ? '#161616' : '#f5f5f5', borderTop: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`, padding: '48px 40px 24px', marginTop: 80 },
    grid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 },
    brandTitle: { fontFamily: "'Space Mono', monospace", fontSize: 22, margin: '0 0 12px', color: dark ? '#f0f0f0' : '#111' },
    accent: { color: '#ff4d00' },
    brandText: { color: '#888', fontSize: 14, lineHeight: 1.6, maxWidth: 240, margin: '0 0 16px' },
    contactRow: { display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 13, marginBottom: 8 },
    colTitle: { color: dark ? '#f0f0f0' : '#111', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px', fontWeight: 700 },
    colLink: { display: 'block', color: '#888', fontSize: 14, textDecoration: 'none', marginBottom: 8 },
    bottom: { borderTop: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: 13 },
  };

  return (
    <footer style={s.footer}>
      <div style={s.grid}>
        <div>
          <h2 style={s.brandTitle}><span style={s.accent}>ROWSHEN</span> E-SHOP</h2>
          <p style={s.brandText}>Маркетплейс техники с гарантией и быстрой доставкой.</p>
          <div style={s.contactRow}><FiPhone size={14} /><span>+7 (999) 123-45-67</span></div>
          <div style={s.contactRow}><FiMail size={14} /><span>info@rowshen.ru</span></div>
          <div style={s.contactRow}><FiMapPin size={14} /><span>Москва, Россия</span></div>
        </div>
        <div>
          <h4 style={s.colTitle}>Покупателям</h4>
          <a href="/" style={s.colLink}>Как купить</a>
          <a href="/" style={s.colLink}>Доставка</a>
          <a href="/" style={s.colLink}>Возврат</a>
          <a href="/" style={s.colLink}>Гарантия</a>
        </div>
        <div>
          <h4 style={s.colTitle}>Категории</h4>
          <Link to="/catalog?cat=Смартфоны" style={s.colLink}>Смартфоны</Link>
          <Link to="/catalog?cat=Ноутбуки" style={s.colLink}>Ноутбуки</Link>
          <Link to="/catalog?cat=Аудио" style={s.colLink}>Аудио</Link>
          <Link to="/catalog?cat=Планшеты" style={s.colLink}>Планшеты</Link>
        </div>
        <div>
          <h4 style={s.colTitle}>Компания</h4>
          <a href="/" style={s.colLink}>О нас</a>
          <a href="/" style={s.colLink}>Вакансии</a>
          <a href="/" style={s.colLink}>Контакты</a>
          <a href="/" style={s.colLink}>Блог</a>
        </div>
      </div>
      <div style={s.bottom}>
        <span>© 2025 Yonekey Cozgut. Все права защищены.</span>
        <span>Политика конфиденциальности</span>
      </div>
    </footer>
  );
}