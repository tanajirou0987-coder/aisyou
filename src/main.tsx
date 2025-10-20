import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// モバイルブラウザのアドレスバー対応
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// 初期化とリサイズ対応
setVh();
(window as Window).addEventListener('resize', setVh);
(window as Window).addEventListener('orientationchange', setVh);

// iOS safariのバウンススクロール防止
document.addEventListener('touchmove', (e) => {
  if ((e.target as Element).closest('.scrollable-area')) {
    return;
  }
  e.preventDefault();
}, { passive: false });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)














