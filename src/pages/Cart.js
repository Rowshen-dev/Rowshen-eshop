import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PROMO_CODES = {
  'ROWSHEN10': 10,
  'SALE20': 20,
  'BIGTECH15': 15,
};

export default function Cart({ cart, onRemove, onQty, onOrder, dark = true }) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const discount = appliedPromo ? Math.round(total * PROMO_CODES[appliedPromo] / 100) : 0;
  const finalTotal = total - discount;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoSuccess(`Промокод применён! Скидка ${PROMO_CODES[code]}%`);
      setPromoError('');
    } else {
      setPromoError('Неверный промокод');
      setPromoSuccess('');
      setAppliedPromo(null);
    }
  };

  const removePromo = () => { setAppliedPromo(null); setPromoInput(''); setPromoSuccess(''); setPromoError(''); };

  const s = {
    wrap: { padding: 40, maxWidth: 900, margin: '0 auto' },
    h1: { fontSize: 28, fontWeight: 800, color: dark ? '#f0f0f0' : '#111', margin: '0 0 32px', letterSpacing: -0.5 },
    layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 },
    items: { display: 'flex', flexDirection: 'column', gap: 12 },
    item: { background: dark ? '#161616' : '#fff', border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`, borderRadius: 12, padding: 16, display: 'flex', gap: 16, alignItems: 'center' },
    itemImg: { width: 72, height: 72, objectFit: 'cover', borderRadius: 8 },
    itemName: { fontSize: 15, color: dark ? '#f0f0f0' : '#111', margin: '0 0 4px' },
    itemCat: { fontSize: 13, color: '#888', margin: 0 },
    itemPrice: { fontSize: 18, fontWeight: 700, color: dark ? '#f0f0f0' : '#111', fontFamily: "'Space Mono', monospace", minWidth: 120, textAlign: 'right' },
    qty: { display: 'flex', alignItems: 'center', gap: 8 },
    qtyBtn: { width: 28, height: 28, borderRadius: 6, border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`, background: 'none', color: dark ? '#f0f0f0' : '#111', cursor: 'pointer', fontSize: 16 },
    qtyNum: { fontFamily: "'Space Mono', monospace", color: dark ? '#f0f0f0' : '#111', minWidth: 20, textAlign: 'center' },
    removeBtn: { background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 18, padding: 4 },
    summary: { background: dark ? '#161616' : '#fff', border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`, borderRadius: 12, padding: 24, height: 'fit-content', position: 'sticky', top: 80 },
    sumRow: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#888', marginBottom: 12 },
    sumDiscount: { display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#4caf50', marginBottom: 12, fontWeight: 600 },
    sumTotal: { display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800, color: dark ? '#f0f0f0' : '#111', fontFamily: "'Space Mono', monospace", borderTop: `1px solid ${dark ? '#2a2a2a' : '#eee'}`, paddingTop: 16, marginTop: 4 },
    promoWrap: { marginBottom: 16 },
    promoLabel: { fontSize: 13, color: '#888', marginBottom: 8, display: 'block' },
    promoRow: { display: 'flex', gap: 8 },
    promoInput: { flex: 1, background: dark ? '#0d0d0d' : '#f5f5f5', border: `1px solid ${dark ? '#2a2a2a' : '#ddd'}`, borderRadius: 8, padding: '9px 12px', color: dark ? '#f0f0f0' : '#111', fontSize: 14, fontFamily: "'Space Mono', monospace" },
    promoBtn: { padding: '9px 16px', background: '#ff4d00', border: 'none', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' },
    promoError: { fontSize: 12, color: '#f44336', marginTop: 6 },
    promoSuccess: { fontSize: 12, color: '#4caf50', marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    removePromo: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 12, textDecoration: 'underline' },
    checkoutBtn: { width: '100%', padding: 14, background: '#ff4d00', border: 'none', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', marginTop: 16 },
    promoHint: { fontSize: 11, color: dark ? '#444' : '#bbb', marginTop: 8, fontFamily: "'Space Mono', monospace" },
    empty: { textAlign: 'center', padding: '80px 0' },
    emptyIcon: { fontSize: 56, display: 'block', marginBottom: 20 },
    emptyTitle: { color: dark ? '#f0f0f0' : '#111', margin: '0 0 8px' },
    emptyText: { color: '#888', margin: '0 0 24px' },
    goShop: { display: 'inline-block', padding: '12px 28px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700 },
  };

  if (cart.length === 0) return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Корзина</h1>
      <div style={s.empty}>
        <span style={s.emptyIcon}>🛒</span>
        <h2 style={s.emptyTitle}>Корзина пустая</h2>
        <p style={s.emptyText}>Добавьте товары из каталога</p>
        <Link to="/catalog" style={s.goShop}>Перейти в каталог</Link>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>Корзина · {count} {count === 1 ? 'товар' : count < 5 ? 'товара' : 'товаров'}</h1>
      <div style={s.layout}>
        <div style={s.items}>
          {cart.map(item => (
            <div key={item.id} style={s.item}>
              <img src={item.image} alt={item.name} style={s.itemImg} />
              <div style={{ flex: 1 }}>
                <p style={s.itemName}>{item.name}</p>
                <p style={s.itemCat}>{item.category}</p>
              </div>
              <div style={s.qty}>
                <button style={s.qtyBtn} onClick={() => onQty(item.id, item.qty - 1)}>−</button>
                <span style={s.qtyNum}>{item.qty}</span>
                <button style={s.qtyBtn} onClick={() => onQty(item.id, item.qty + 1)}>+</button>
              </div>
              <div style={s.itemPrice}>{(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
              <button style={s.removeBtn} onClick={() => onRemove(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div style={s.summary}>
          {/* Промокод */}
          <div style={s.promoWrap}>
            <span style={s.promoLabel}>Промокод</span>
            {!appliedPromo ? (
              <>
                <div style={s.promoRow}>
                  <input
                    style={s.promoInput}
                    placeholder="Введи код..."
                    value={promoInput}
                    onChange={e => { setPromoInput(e.target.value); setPromoError(''); }}
                    onKeyDown={e => e.key === 'Enter' && applyPromo()}
                  />
                  <button style={s.promoBtn} onClick={applyPromo}>Применить</button>
                </div>
                {promoError && <div style={s.promoError}>✕ {promoError}</div>}
                <div style={s.promoHint}>Попробуй: ROWSHEN10 / SALE20 / BIGTECH15</div>
              </>
            ) : (
              <div style={s.promoSuccess}>
                <span>✓ {promoSuccess}</span>
                <button style={s.removePromo} onClick={removePromo}>Убрать</button>
              </div>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${dark ? '#2a2a2a' : '#eee'}`, paddingTop: 16 }}>
            <div style={s.sumRow}><span>Товары ({count})</span><span>{total.toLocaleString('ru-RU')} ₽</span></div>
            {discount > 0 && <div style={s.sumDiscount}><span>Скидка по промокоду</span><span>−{discount.toLocaleString('ru-RU')} ₽</span></div>}
            <div style={s.sumRow}><span>Доставка</span><span style={{ color: '#4caf50' }}>Бесплатно</span></div>
            <div style={s.sumTotal}><span>Итого</span><span>{finalTotal.toLocaleString('ru-RU')} ₽</span></div>
          </div>

          <button style={s.checkoutBtn} onClick={onOrder}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}