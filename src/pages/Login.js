import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const s = {
  wrap: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 },
  box: { background: '#161616', border: '1px solid #2a2a2a', borderRadius: 16, padding: 40, width: '100%', maxWidth: 420 },
  logo: { fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: '#f0f0f0', textDecoration: 'none', display: 'block', marginBottom: 32, textAlign: 'center' },
  logoAccent: { color: '#ff4d00' },
  tabs: { display: 'flex', marginBottom: 28, background: '#0d0d0d', borderRadius: 8, padding: 4 },
  tab: (active) => ({ flex: 1, padding: '10px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontFamily: "'Syne', sans-serif", fontWeight: 600, background: active ? '#ff4d00' : 'transparent', color: active ? '#fff' : '#888', transition: 'all 0.2s' }),
  label: { display: 'block', fontSize: 13, color: '#888', marginBottom: 6 },
  input: { width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#f0f0f0', fontSize: 15, fontFamily: "'Syne', sans-serif", marginBottom: 16, boxSizing: 'border-box' },
  btn: { width: '100%', padding: 14, background: '#ff4d00', border: 'none', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: 'pointer', marginTop: 8 },
  divider: { textAlign: 'center', color: '#555', fontSize: 13, margin: '20px 0' },
  hint: { textAlign: 'center', color: '#888', fontSize: 13, marginTop: 20 },
  hintLink: { color: '#ff4d00', textDecoration: 'none' },
};

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) return;
    onLogin({ name: name || email.split('@')[0], email });
    navigate('/');
  };

  return (
    <div style={s.wrap}>
      <div style={s.box}>
        <Link to="/" style={s.logo}><span style={s.logoAccent}>ROWSHEN</span> E-SHOP</Link>
        <div style={s.tabs}>
          <button style={s.tab(tab === 'login')} onClick={() => setTab('login')}>Войти</button>
          <button style={s.tab(tab === 'register')} onClick={() => setTab('register')}>Регистрация</button>
        </div>
        {tab === 'register' && (
          <>
            <label style={s.label}>Имя</label>
            <input style={s.input} placeholder="Твоё имя" value={name} onChange={e => setName(e.target.value)} />
          </>
        )}
        <label style={s.label}>Email</label>
        <input style={s.input} placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        <label style={s.label}>Пароль</label>
        <input style={s.input} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button style={s.btn} onClick={handleSubmit}>
          {tab === 'login' ? 'Войти' : 'Создать аккаунт'}
        </button>
        <div style={s.hint}>
          {tab === 'login' ? <>Нет аккаунта? <span style={s.hintLink} onClick={() => setTab('register')}>Зарегистрироваться</span></> : <>Уже есть аккаунт? <span style={s.hintLink} onClick={() => setTab('login')}>Войти</span></>}
        </div>
      </div>
    </div>
  );
}