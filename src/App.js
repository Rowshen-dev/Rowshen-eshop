import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Compare from './pages/Compare';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [compare, setCompare] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [dark, setDark] = useState(true);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (product._action === 'decrease') {
        if (exist.qty === 1) return prev.filter(i => i.id !== product.id);
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty - 1 } : i);
      }
      if (exist) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const toggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const toggleCompare = (id) => setCompare(prev => prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 4 ? [...prev, id] : prev);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'В обработке',
      items: cart.map(i => ({ ...i })),
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const bg = dark ? '#0d0d0d' : '#f2f2f2';
  const color = dark ? '#f0f0f0' : '#111';

  return (
    <Router>
      <div style={{ background: bg, minHeight: '100vh', color, fontFamily: "'Syne', sans-serif" }}>
        <Navbar
          cartCount={cartCount}
          favCount={favorites.length}
          compare={compare.length}
          user={user}
          onLogout={() => setUser(null)}
          dark={dark}
          toggleTheme={() => setDark(d => !d)}
        />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} dark={dark} />} />
          <Route path="/catalog" element={<Catalog addToCart={addToCart} cart={cart} favorites={favorites} toggleFavorite={toggleFavorite} dark={dark} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} cart={cart} onQty={updateQty} compare={compare} toggleCompare={toggleCompare} dark={dark} />} />
          <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onQty={updateQty} onOrder={placeOrder} dark={dark} />} />
          <Route path="/checkout" element={<Checkout dark={dark} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} cart={cart} dark={dark} />} />
          <Route path="/login" element={<Login onLogin={setUser} dark={dark} />} />
          <Route path="/orders" element={<Orders orders={orders} dark={dark} />} />
          <Route path="/compare" element={<Compare compare={compare} toggleCompare={toggleCompare} addToCart={addToCart} cart={cart} dark={dark} />} />
        </Routes>
        <Footer dark={dark} />
      </div>
    </Router>
  );
}

export default App;