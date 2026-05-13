import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiRefreshCw, FiPackage, FiUser, FiLogOut, FiSun, FiMoon, FiX } from 'react-icons/fi';
import { products } from '../data/products';

export default function Navbar({ cartCount, favCount, compare, user, onLogout, dark, toggleTheme }) {
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setShowDrop(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleInput = (val) => {
    setQ(val);
    if (val.trim().length < 2) { setSuggestions([]); setShowDrop(false); return; }
    const found = products.filter(p => p.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
    setSuggestions(found);
    setShowDrop(true);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && q.trim()) {
      navigate(`/catalog?q=${q}`);
      setShowDrop(false);
      setQ('');
    }
  };

  const handleSuggest = (product) => {
    navigate(`/product/${product.id}`);
    setShowDrop(false);
    setQ('');
  };

  const s = {
    nav: {
      position: 'sticky', top: 0, zIndex: 100,
      background: dark ? 'rgba(13,13,13,0.97)' : 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
      padding: '0 40px', height: 72,
      display: 'grid',
      gridTemplateColumns: '240px 1fr 320px',
      alignItems: 'center',
      gap: 24,
    },
    logoWrap: {
      display: 'flex', alignItems: 'center',
    },
    logo: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 22, fontWeight: 700,
      color: dark ? '#f0f0f0' : '#111',
      textDecoration: 'none',
      letterSpacing: -1,
      whiteSpace: 'nowrap',
      lineHeight: 1,
    },
    logoAccent: { color: '#ff4d00' },
    searchWrap: {
      position: 'relative',
      width: '100%',
    },
    search: {
      display: 'flex', alignItems: 'center',
      background: dark ? '#161616' : '#f5f5f5',
      border: `1.5px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
      borderRadius: 10, padding: '10px 18px',
      gap: 10, width: '100%',
      transition: 'border-color 0.2s',
    },
    searchInput: {
      background: 'none', border: 'none', outline: 'none',
      color: dark ? '#f0f0f0' : '#111',
      fontSize: 15, fontFamily: "'Syne', sans-serif", flex: 1,
    },
    dropdown: {
      position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
      background: dark ? '#1a1a1a' : '#fff',
      border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
      borderRadius: 10, overflow: 'hidden', zIndex: 200,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    },
    dropItem: {
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', cursor: 'pointer',
      borderBottom: `1px solid ${dark ? '#222' : '#f0f0f0'}`,
      transition: 'background 0.15s',
    },
    dropImg: { width: 40, height: 40, objectFit: 'cover', borderRadius: 6, flexShrink: 0 },
    dropName: { fontSize: 13, color: dark ? '#f0f0f0' : '#111', flex: 1, lineHeight: 1.3 },
    dropPrice: { fontSize: 13, fontWeight: 700, color: '#ff4d00', fontFamily: "'Space Mono', monospace", whiteSpace: 'nowrap' },
    right: {
      display: 'flex', alignItems: 'center',
      justifyContent: 'flex-end', gap: 6,
    },
    navBtn: {
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'none',
      border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
      color: dark ? '#f0f0f0' : '#111',
      padding: '8px 14px', borderRadius: 8,
      cursor: 'pointer', fontSize: 14,
      fontFamily: "'Syne', sans-serif", textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
    iconBtn: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
      background: 'none',
      border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
      color: dark ? '#f0f0f0' : '#111',
      width: 38, height: 38, borderRadius: 8,
      cursor: 'pointer', textDecoration: 'none',
      position: 'relative', flexShrink: 0,
    },
    iconBadge: {
      position: 'absolute', top: -5, right: -5,
      background: '#ff4d00', color: '#fff',
      fontSize: 10, width: 16, height: 16,
      borderRadius: '50%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Mono', monospace", fontWeight: 700,
    },
    cartBtn: {
      display: 'flex', alignItems: 'center', gap: 8,
      background: '#ff4d00', border: '1px solid #ff4d00',
      color: '#fff', padding: '8px 16px',
      borderRadius: 8, cursor: 'pointer', fontSize: 14,
      fontFamily: "'Syne', sans-serif", textDecoration: 'none',
      fontWeight: 700, position: 'relative', whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    cartBadge: {
      position: 'absolute', top: -6, right: -6,
      background: '#00c2ff', color: '#fff',
      fontSize: 10, width: 18, height: 18,
      borderRadius: '50%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Space Mono', monospace", fontWeight: 700,
    },
    themeBtn: {
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: dark ? '#1e1e1e' : '#e8e8e8',
      border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`,
      color: dark ? '#f0f0f0' : '#111',
      width: 38, height: 38, borderRadius: 8,
      cursor: 'pointer', flexShrink: 0,
    },
  };

  return (
    <nav style={s.nav}>

      {/* Лого — слева */}
      <div style={s.logoWrap}>
        <Link to="/" style={s.logo}>
          <span style={s.logoAccent}>ROWSHEN</span> E‑SHOP
        </Link>
      </div>

      {/* Поиск — по центру, широкий */}
      <div style={s.searchWrap} ref={ref}>
        <div style={s.search}>
          <FiSearch size={17} color="#666" />
          <input
            style={s.searchInput}
            placeholder="Поиск товаров, брендов, категорий..."
            value={q}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
          />
          {q && (
            <FiX size={16} color="#666" style={{ cursor: 'pointer', flexShrink: 0 }}
              onClick={() => { setQ(''); setSuggestions([]); setShowDrop(false); }} />
          )}
        </div>

        {showDrop && suggestions.length > 0 && (
          <div style={s.dropdown}>
            {suggestions.map(p => (
              <div key={p.id} style={s.dropItem} onClick={() => handleSuggest(p)}
                onMouseEnter={e => e.currentTarget.style.background = dark ? '#222' : '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <img src={p.image} alt={p.name} style={s.dropImg} />
                <span style={s.dropName}>{p.name}</span>
                <span style={s.dropPrice}>{p.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
            <div style={{ padding: '10px 14px', textAlign: 'center', fontSize: 13, color: '#ff4d00', cursor: 'pointer' }}
              onClick={() => { navigate(`/catalog?q=${q}`); setShowDrop(false); setQ(''); }}>
              Смотреть все результаты →
            </div>
          </div>
        )}
      </div>

      {/* Кнопки — справа */}
      <div style={s.right}>

        <Link to="/favorites" style={s.iconBtn} title="Избранное">
          <FiHeart size={17} />
          {favCount > 0 && <span style={s.iconBadge}>{favCount}</span>}
        </Link>

        <Link to="/compare" style={s.iconBtn} title="Сравнение">
          <FiRefreshCw size={17} />
          {compare > 0 && <span style={{ ...s.iconBadge, background: '#00c2ff' }}>{compare}</span>}
        </Link>

        <Link to="/orders" style={s.iconBtn} title="Заказы">
          <FiPackage size={17} />
        </Link>

        <Link to="/cart" style={s.cartBtn}>
          <FiShoppingCart size={17} /> Корзина
          {cartCount > 0 && <span style={s.cartBadge}>{cartCount}</span>}
        </Link>

        <button style={s.themeBtn} onClick={toggleTheme} title="Сменить тему">
          {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
        </button>

        {user ? (
          <>
            <span style={{ ...s.iconBtn, cursor: 'default' }} title={user.name}>
              <FiUser size={17} />
            </span>
            <button style={{ ...s.iconBtn, cursor: 'pointer' }} onClick={onLogout} title="Выйти">
              <FiLogOut size={17} />
            </button>
          </>
        ) : (
          <Link to="/login" style={s.iconBtn} title="Войти">
            <FiUser size={17} />
          </Link>
        )}

      </div>
    </nav>
  );
}