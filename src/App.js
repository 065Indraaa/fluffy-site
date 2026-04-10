import React, { useState, useEffect } from 'react';
import './App.css';

const PUMPFUN_URL = 'https://pump.fun/coin/BkUWKWTvgmxn6S45p2RGKTTvvfJeVwShqG4nYCvjpump;
const X_URL = 'https://x.com';
const CA_ADDRESS = 'BkUWKWTvgmxn6S45p2RGKTTvvfJeVwShqG4nYCvjpump';

function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    duration: 1.5 + Math.random() * 3,
  }));
  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span key={s.id} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
      ))}
    </div>
  );
}

function FloatingNotes() {
  const notes = ['🎵', '🎶', '🎤', '🎵', '🎶', '🎼'];
  return (
    <div className="floating-notes" aria-hidden="true">
      {notes.map((n, i) => (
        <span key={i} className="note" style={{ left: `${8 + i * 16}%`, animationDelay: `${i * 0.7}s`, animationDuration: `${3 + (i % 3)}s` }}>{n}</span>
      ))}
    </div>
  );
}

function XIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Navbar({ onBuyClick, onXClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <img src="/IMG_20260410_220124_216.png" alt="Fluffy" className="nav-cat-img" />
        <span>$FLUFFY</span>
      </div>
      <div className="nav-links">
        <a href="#about" className="nav-link">About</a>
        <a href="#tokenomics" className="nav-link">Tokenomics</a>
        <a href="#community" className="nav-link">Community</a>
      </div>
      <div className="nav-btns">
        <button className="btn-x-sm" onClick={onXClick}><XIcon size={13} /> Follow</button>
        <button className="btn-pump-sm" onClick={onBuyClick}>🚀 Buy Now</button>
      </div>
    </nav>
  );
}

function TickerBar() {
  const items = ['🐱 $FLUFFY TO THE MOON', '🎤 AI DANCING CAT ON SOLANA', '🚀 FAIR LAUNCH ON PUMP.FUN', '📈 2.9M TIKTOK VIEWS', '❤️ 231K FOLLOWERS', '💎 HOLD $FLUFFY', '🌙 MOONING SOON'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {repeated.map((item, i) => <span key={i} className="ticker-item">{item} &nbsp;&nbsp;&nbsp;</span>)}
      </div>
    </div>
  );
}

function CABox() {
  const [copied, setCopied] = useState(false);
  const isPlaceholder = CA_ADDRESS === 'PASTE_YOUR_CA_HERE';
  const handleCopy = () => {
    if (isPlaceholder) return;
    navigator.clipboard?.writeText(CA_ADDRESS).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className="ca-box">
      <div className="ca-label">📋 Contract Address (CA)</div>
      <div className={`ca-address ${isPlaceholder ? 'ca-placeholder' : ''}`}>
        {isPlaceholder ? '⏳ Coming soon... stay tuned! 👀' : CA_ADDRESS}
      </div>
      {!isPlaceholder && <button className="copy-btn" onClick={handleCopy}>{copied ? '✅ Copied!' : '📋 Copy CA'}</button>}
    </div>
  );
}

function HeroSection({ onBuyClick, onXClick }) {
  return (
    <section className="hero" id="hero">
      <FloatingNotes />
      <div className="solana-pill"><span className="sol-dot" />Built on Solana ⚡</div>
      <div className="hero-cat-wrap">
        <div className="cat-halo" />
        <div className="cat-ring" />
        <img src="/fluffy.png" alt="Fluffy the Dancing Cat" className="hero-cat" />
        <div className="viral-badge">🔥 VIRAL</div>
        <div className="mic-badge">🎤 SINGER</div>
      </div>
      <h1 className="hero-title"><span className="title-dollar">$</span>FLUFFY</h1>
      <p className="hero-subtitle">The Internet's Most Famous AI Dancing Cat<br />is taking over <span className="gradient-text">Solana</span> 🚀</p>
      <p className="hero-tagline">He sings. He dances. He moons. 🌙</p>
      <CABox />
      <div className="hero-btns">
        <button className="btn-primary" onClick={onBuyClick}>🚀 Buy $FLUFFY on Pump.fun</button>
        <button className="btn-secondary" onClick={onXClick}><XIcon /> Join X Community</button>
      </div>
      <div className="scroll-hint"><span className="scroll-arrow">↓</span></div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { num: '2.9M', label: '🎬 TikTok Views' },
    { num: '231K', label: '❤️ Followers' },
    { num: '100%', label: '🔓 Fair Launch' },
    { num: '0%', label: '🚫 Dev Wallet' },
    { num: 'SOL', label: '⚡ Blockchain' },
    { num: '∞', label: '🌙 Potential' },
  ];
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <div className="stat-num">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function AboutSection() {
  const cards = [
    { emoji: '🎤', title: 'Born Viral', text: 'Fluffy exploded on TikTok with AI-generated dance videos that racked up 2.9 million views and 231,000 followers in record time. The algorithm loved Fluffy. The internet loved Fluffy. Now crypto will love Fluffy.' },
    { emoji: '🤖', title: 'AI-Powered Cuteness', text: 'Every perfectly synchronized dance move was generated by cutting-edge AI. Fluffy is the face of where technology meets entertainment — and the result is pure viral gold.' },
    { emoji: '⚡', title: 'Solana Native', text: '$FLUFFY launches fair on Pump.fun — no dev allocations, no VC bags, no funny business. Just a dancing cat, a meme, and the Solana degen community.' },
    { emoji: '🌙', title: 'Community First', text: "Holders aren't just investors — they're joining a movement. The Fluffy Army is built on viral energy, meme culture, and the shared dream of watching a cat moon on the blockchain." },
  ];
  return (
    <section className="section about-section" id="about">
      <div className="section-inner">
        <div className="section-tag">🐱 Origin Story</div>
        <h2 className="section-title">Who is <span className="highlight">Fluffy?</span></h2>
        <div className="about-grid">
          {cards.map((c, i) => (
            <div key={i} className="about-card">
              <div className="about-emoji">{c.emoji}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TokenomicsSection() {
  const items = [
    { icon: '🎯', val: '1,000,000,000', label: 'Total Supply', sub: 'One Billion $FLUFFY' },
    { icon: '🔥', val: '0%', label: 'Dev Allocation', sub: 'No team tokens' },
    { icon: '🔓', val: '100%', label: 'Fair Launch', sub: 'Everyone starts equal' },
    { icon: '💧', val: 'LOCKED', label: 'Liquidity', sub: 'Burned & locked forever' },
    { icon: '🐱', val: '$FLUFFY', label: 'Ticker Symbol', sub: 'On Solana' },
    { icon: '🚀', val: 'PUMP.FUN', label: 'Launch Platform', sub: 'Fair meme launch' },
  ];
  return (
    <section className="section tokenomics-section" id="tokenomics">
      <div className="section-inner">
        <div className="section-tag">💰 Token Details</div>
        <h2 className="section-title">Tokenomics <span className="highlight">Made Simple</span></h2>
        <div className="token-grid">
          {items.map((item, i) => (
            <div key={i} className="token-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="token-icon">{item.icon}</div>
              <div className="token-val">{item.val}</div>
              <div className="token-label">{item.label}</div>
              <div className="token-sub">{item.sub}</div>
            </div>
          ))}
        </div>
        <div className="token-note">🎤 No presale. No VC. No insider. Just Fluffy and the community.</div>
      </div>
    </section>
  );
}

function HowToBuySection({ onBuyClick }) {
  const steps = [
    { num: '01', icon: '👛', title: 'Get a Solana Wallet', desc: 'Download Phantom or Solflare wallet. Create your wallet and keep your seed phrase safe and offline.' },
    { num: '02', icon: '💰', title: 'Buy SOL', desc: 'Get SOL from any major exchange like Binance or Coinbase. Transfer SOL to your Phantom/Solflare wallet.' },
    { num: '03', icon: '🚀', title: 'Go to Pump.fun', desc: 'Visit pump.fun, search for $FLUFFY or paste the CA. Connect your wallet to the platform.' },
    { num: '04', icon: '🐱', title: 'Buy $FLUFFY!', desc: 'Enter the amount of SOL you want to swap for $FLUFFY and confirm. Welcome to the Fluffy Army! 🎉' },
  ];
  return (
    <section className="section htb-section" id="how-to-buy">
      <div className="section-inner">
        <div className="section-tag">🛒 Tutorial</div>
        <h2 className="section-title">How to Buy <span className="highlight">$FLUFFY</span></h2>
        <div className="steps-list">
          {steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-content"><h3>{step.title}</h3><p>{step.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="btn-center-wrap">
          <button className="btn-primary" onClick={onBuyClick}>🚀 Buy $FLUFFY Now on Pump.fun</button>
        </div>
      </div>
    </section>
  );
}

function CommunitySection({ onBuyClick, onXClick }) {
  return (
    <section className="section community-section" id="community">
      <div className="community-bg-glow" />
      <div className="section-inner">
        <div className="section-tag">🐱 Join the Movement</div>
        <h2 className="section-title">The <span className="highlight">Fluffy Army</span> Awaits</h2>
        <p className="community-desc">
          231K followers already love Fluffy. Early supporters recognize the perfect storm: proven viral appeal, established audience, AI novelty, and the explosive potential of fair-launched meme coins. Don't miss the dance. 💃
        </p>
        <div className="community-cards">
          <div className="comm-card comm-card-x" onClick={onXClick} role="button" tabIndex={0}>
            <div className="comm-card-icon"><XIcon size={38} /></div>
            <div className="comm-card-body">
              <div className="comm-card-title">X (Twitter) Community</div>
              <div className="comm-card-sub">Follow for updates, memes &amp; alpha</div>
              <div className="comm-card-stat">🐱 231K+ Fluffy fans</div>
            </div>
            <div className="comm-card-arrow">→</div>
          </div>
          <div className="comm-card comm-card-pump" onClick={onBuyClick} role="button" tabIndex={0}>
            <div className="comm-card-icon comm-icon-pump">🚀</div>
            <div className="comm-card-body">
              <div className="comm-card-title">Buy on Pump.fun</div>
              <div className="comm-card-sub">Fair launch, no dev wallet, pure vibes</div>
              <div className="comm-card-stat">🔥 $FLUFFY live now</div>
            </div>
            <div className="comm-card-arrow">→</div>
          </div>
        </div>
        <div className="meme-strip">
          {['🐱', '🎤', '🚀', '🌙', '💎', '🙌', '🐱', '🎶', '🚀', '🌙'].map((e, i) => (
            <span key={i} className="meme-emoji" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onBuyClick, onXClick }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src="/fluffy.png" alt="Fluffy" className="footer-cat" />
          <span>$FLUFFY</span>
        </div>
        <div className="footer-links">
          <button className="footer-link" onClick={onXClick}><XIcon size={14} /> Twitter / X</button>
          <button className="footer-link" onClick={onBuyClick}>🚀 Pump.fun</button>
        </div>
        <p className="footer-copy">© 2026 $FLUFFY — The AI Dancing Cat on Solana</p>
        <p className="footer-disclaimer">⚠️ This is not financial advice. $FLUFFY is a meme coin for entertainment purposes only. Always do your own research. Crypto investments carry significant risk. Not affiliated with TikTok, Solana Foundation, or any third party.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const openPump = () => window.open(PUMPFUN_URL, '_blank', 'noopener');
  const openX = () => window.open(X_URL, '_blank', 'noopener');
  return (
    <div className="app">
      <StarField />
      <Navbar onBuyClick={openPump} onXClick={openX} />
      <TickerBar />
      <HeroSection onBuyClick={openPump} onXClick={openX} />
      <StatsBar />
      <AboutSection />
      <TokenomicsSection />
      <HowToBuySection onBuyClick={openPump} />
      <CommunitySection onBuyClick={openPump} onXClick={openX} />
      <Footer onBuyClick={openPump} onXClick={openX} />
    </div>
  );
}
