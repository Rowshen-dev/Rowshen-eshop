import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import { products, categories } from '../data/products';

const brands = ['Все', 'Apple', 'Samsung', 'Sony', 'ASUS', 'Xiaomi'];

export default function Catalog({ addToCart, cart, favorites, toggleFavorite, dark = true }) {
  const [params] = useSearchParams();
  const [cat, setCat] = useState(params.get('cat') || 'Все');
  const [brand, setBrand] = useState('Все');
  const [sort, setSort] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const q = params.get('q') || '';

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, [cat, brand, sort, minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let list = products;
    if (cat !== 'Все') list = list.filter(p => p.category === cat);
    if (brand !== 'Все') list = list.filter(p => p.name.includes(brand));
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, brand, sort, q, minPrice, maxPrice]);

  const reset = () => { setCat('Все'); setBrand('Все'); setMinPrice(''); setMaxPrice(''); setSort('default'); };

  const s = {
    wrap: { padding: '32px 40px', background: dark ? '#0d0d0d' : '#f2f2f2', minHeight: '100vh' },
    top: { marginBottom: 24 },
    h1: { fontSize: 28, fontWeight: 800, margin: '0 0 6px', color: dark ? '#f0f0f0' : '#111', letterSpacing: -0.5 },
    sub: { color: dark ? '#888' : '#666', margin: 0, fontSize: 14 },
    layout: { display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 },
    sidebar: { display: 'flex', flexDirection: 'column', gap: 24 },
    filterBox: { background: dark ? '#161616' : '#fff', border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`, borderRadius: 12, padding: 20 },
    filterTitle: { fontSize: 14, fontWeight: 700, color: dark ? '#f0f0f0' : '#111', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1, fontFamily: "'Space Mono', monospace" },
    priceRow: { display: 'flex', gap: 8, alignItems: 'center' },
    priceInput: { flex: 1, background: dark ? '#0d0d0d' : '#f5f5f5', border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`, borderRadius: 8, padding: '8px 10px', color: dark ? '#f0f0f0' : '#111', fontSize: 14, fontFamily: "'Space Mono', monospace", width: '100%' },
    priceSep: { color: dark ? '#555' : '#999', fontSize: 14 },
    tagBtn: (active) => ({ padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 13, fontFamily: "'Syne', sans-serif", border: 'none', marginRight: 6, marginBottom: 6, display: 'inline-block', background: active ? '#ff4d00' : dark ? '#0d0d0d' : '#f0f0f0', color: active ? '#fff' : dark ? '#888' : '#555', outline: active ? 'none' : `1px solid ${dark ? '#2a2a2a' : '#ddd'}` }),
    resetBtn: { width: '100%', padding: '10px', background: 'none', border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`, color: dark ? '#888' : '#666', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", cursor: 'pointer', marginTop: 8 },
    controls: { display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' },
    catBtn: (active) => ({ padding: '8px 18px', borderRadius: 20, cursor: 'pointer', fontSize: 14, fontFamily: "'Syne', sans-serif", border: 'none', background: active ? '#ff4d00' : dark ? '#161616' : '#fff', color: active ? '#fff' : dark ? '#f0f0f0' : '#111', outline: active ? 'none' : `1px solid ${dark ? '#2a2a2a' : '#ddd'}` }),
    sort: { marginLeft: 'auto', padding: '8px 16px', background: dark ? '#161616' : '#fff', border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`, color: dark ? '#f0f0f0' : '#111', borderRadius: 8, fontSize: 14, fontFamily: "'Syne', sans-serif", cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 20 },
    empty: { textAlign: 'center', padding: '80px 0' },
    emptyIcon: { fontSize: 48, display: 'block', marginBottom: 16 },
    emptyText: { color: dark ? '#888' : '#666' },
  };

  return (
    <div style={s.wrap}>
      <div style={s.top}>
        <h1 style={s.h1}>Каталог</h1>
        <p style={s.sub}>{filtered.length} товаров{q ? ` по запросу «${q}»` : ''}</p>
      </div>
      <div style={s.layout}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.filterBox}>
            <div style={s.filterTitle}>Цена ₽</div>
            <div style={s.priceRow}>
              <input style={s.priceInput} placeholder="от" value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" />
              <span style={s.priceSep}>—</span>
              <input style={s.priceInput} placeholder="до" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" />
            </div>
          </div>
          <div style={s.filterBox}>
            <div style={s.filterTitle}>Бренд</div>
            <div>
              {brands.map(b => (
                <span key={b} style={s.tagBtn(brand === b)} onClick={() => setBrand(b)}>{b}</span>
              ))}
            </div>
          </div>
          <button style={s.resetBtn} onClick={reset}>✕ Сбросить фильтры</button>
        </div>

        {/* Main */}
        <div>
          <div style={s.controls}>
            {categories.map(c => (
              <button key={c} style={s.catBtn(cat === c)} onClick={() => setCat(c)}>{c}</button>
            ))}
            <select style={s.sort} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">По умолчанию</option>
              <option value="price_asc">Цена: по возрастанию</option>
              <option value="price_desc">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {loading ? (
            <div style={s.grid}>
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} dark={dark} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={s.empty}>
              <span style={s.emptyIcon}>🔍</span>
              <p style={s.emptyText}>Ничего не найдено</p>
            </div>
          ) : (
            <div style={s.grid}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} cart={cart}
                  favorites={favorites} toggleFavorite={toggleFavorite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}