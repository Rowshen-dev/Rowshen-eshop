import React from 'react';
import { Link } from 'react-router-dom';

const s = {
  wrap: { padding: 40, maxWidth: 900, margin: '0 auto' },
  h1: { fontSize: 28, fontWeight: 800, color: '#f0f0f0', margin: '0 0 32px', letterSpacing: -0.5 },
  order: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 12, padding: 24, marginBottom: 16 },
  orderHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  orderId: { fontFamily: "'Space Mono', monospace", color: '#888', fontSize: 13 },
  orderDate: { color: '#555', fontSize: 13 },
  status: (s) => ({ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: s === 'Доставлен' ? 'rgba(76,175,80,0.1)' : s === 'В пути' ? 'rgba(0,194,255,0.1)' : 'rgba(255,77,0,0.1)', color: s === 'Доставлен' ? '#4caf50' : s === 'В пути' ? '#00c2ff' : '#ff4d00' }),
  items: { display: 'flex', flexDirection: 'column', gap: 10 },
  item: { display: 'flex', gap: 12, alignItems: 'center' },
  itemImg: { width: 52, height: 52, objectFit: 'cover', borderRadius: 8, border: '1px solid #2a2a2a' },
  itemName: { flex: 1, fontSize: 14, color: '#f0f0f0' },
  itemPrice: { fontFamily: "'Space Mono', monospace", color: '#f0f0f0', fontSize: 14 },
  divider: { borderTop: '1px solid #2a2a2a', margin: '16px 0' },
  total: { display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#f0f0f0' },
  totalPrice: { fontFamily: "'Space Mono', monospace", color: '#ff4d00', fontSize: 18 },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyIcon: { fontSize: 56, display: 'block', marginBottom: 20 },
  emptyTitle: { color: '#f0f0f0', margin: '0 0 8px' },
  emptyText: { color: '#888', margin: '0 0 24px' },
  goShop: { display: 'inline-block', padding: '12px 28px', background: '#ff4d00', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700 },
};

const mockOrders = [
  {
    id: 'ORD-2025-001', date: '03.05.2025', status: 'Доставлен',
    items: [
      { id: 1, name: 'Apple iPhone 15 Pro 256GB', price: 89990, qty: 1, image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg' },
      { id: 6, name: 'AirPods Pro 2-го поколения', price: 19990, qty: 1, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=90' },
    ]
  },
  {
    id: 'ORD-2025-002', date: '07.05.2025', status: 'В пути',
    items: [
      { id: 3, name: 'Sony WH-1000XM5', price: 29990, qty: 1, image: 'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=400' },
    ]
  },
];

export default function Orders({ orders = mockOrders }) {
  if (orders.length === 0) return (
    <div style={s.wrap}>
      <h1 style={s.h1}>История заказов</h1>
      <div style={s.empty}>
        <span style={s.emptyIcon}>📦</span>
        <h2 style={s.emptyTitle}>Заказов пока нет</h2>
        <p style={s.emptyText}>Сделайте первый заказ!</p>
        <Link to="/catalog" style={s.goShop}>Перейти в каталог</Link>
      </div>
    </div>
  );

  return (
    <div style={s.wrap}>
      <h1 style={s.h1}>История заказов</h1>
      {orders.map(order => {
        const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
        return (
          <div key={order.id} style={s.order}>
            <div style={s.orderHead}>
              <div>
                <div style={s.orderId}>Заказ {order.id}</div>
                <div style={s.orderDate}>{order.date}</div>
              </div>
              <span style={s.status(order.status)}>{order.status}</span>
            </div>
            <div style={s.items}>
              {order.items.map(item => (
                <div key={item.id} style={s.item}>
                  <img src={item.image} alt={item.name} style={s.itemImg} />
                  <span style={s.itemName}>{item.name} × {item.qty}</span>
                  <span style={s.itemPrice}>{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                </div>
              ))}
            </div>
            <div style={s.divider} />
            <div style={s.total}>
              <span>Итого</span>
              <span style={s.totalPrice}>{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}