import React from 'react';

const shimmer = `
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

const skeletonBg = (dark) => ({
  background: dark
    ? 'linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)'
    : 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
  backgroundSize: '800px 100%',
  animation: 'shimmer 1.4s infinite linear',
});

export default function SkeletonCard({ dark = true }) {
  return (
    <>
      <style>{shimmer}</style>
      <div style={{
        background: dark ? '#161616' : '#f5f5f5',
        border: `1px solid ${dark ? '#2a2a2a' : '#e0e0e0'}`,
        borderRadius: 12, overflow: 'hidden',
      }}>
        {/* Картинка */}
        <div style={{ width: '100%', aspectRatio: '1', ...skeletonBg(dark) }} />

        <div style={{ padding: 16 }}>
          {/* Категория */}
          <div style={{ height: 10, width: '40%', borderRadius: 4, marginBottom: 10, ...skeletonBg(dark) }} />
          {/* Название строка 1 */}
          <div style={{ height: 14, width: '90%', borderRadius: 4, marginBottom: 6, ...skeletonBg(dark) }} />
          {/* Название строка 2 */}
          <div style={{ height: 14, width: '65%', borderRadius: 4, marginBottom: 14, ...skeletonBg(dark) }} />
          {/* Рейтинг */}
          <div style={{ height: 12, width: '50%', borderRadius: 4, marginBottom: 14, ...skeletonBg(dark) }} />
          {/* Цена */}
          <div style={{ height: 22, width: '55%', borderRadius: 4, marginBottom: 16, ...skeletonBg(dark) }} />
          {/* Кнопка */}
          <div style={{ height: 38, width: '100%', borderRadius: 8, ...skeletonBg(dark) }} />
        </div>
      </div>
    </>
  );
}