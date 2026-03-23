import React, { useState, useEffect, useCallback } from 'react';

const API = `${import.meta.env.VITE_API_URL}/api/content`;
const UPLOAD_API = `${import.meta.env.VITE_API_URL}/api/upload`;

// ─── SVG ICONS ────────────────────────────────────────────
const I = {
    home: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    article: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    user: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0113 0" /></svg>,
    zap: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    menu: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    layout: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
    image: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    save: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
    plus: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    trash: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>,
    chevronDown: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>,
    chevronRight: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>,
    pages: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>,
};

// ─── PAGES STRUCTURE ──────────────────────────────────────
const PAGES = [
    {
        id: 'global',
        label: 'Site Configuration',
        sections: [
            { id: 'nav', label: 'Navigation Menu', icon: 'menu' },
        ],
    },
    {
        id: 'home',
        label: 'Home Page',
        sections: [
            { id: 'hero', label: 'Hero & Score', icon: 'layout' },
            { id: 'stats', label: 'Stats Section', icon: 'layout' },
            { id: 'features3d', label: '3D Features', icon: 'zap' },
            { id: 'community', label: 'Community Tile', icon: 'image' },
            { id: 'characterSection', label: 'Character Intro', icon: 'user' },
            { id: 'runners', label: 'Runners Grid', icon: 'user' },
            { id: 'powerups', label: 'Powerups Grid', icon: 'zap' },
            { id: 'gameModes', label: 'Game Modes', icon: 'layout' },
            { id: 'specialEvents', label: 'Special Events', icon: 'zap' },
            { id: 'finalSection', label: 'Final Section', icon: 'layout' },
            { id: 'testimonials', label: 'Testimonials', icon: 'user' },
            { id: 'cta', label: 'CTA & Socials', icon: 'image' },
            { id: 'explore', label: 'Explore Banner', icon: 'image' },
            { id: 'articles', label: 'Featured Articles', icon: 'article' },
            { id: 'navbar', label: 'Branding & Store', icon: 'image' },
            { id: 'about', label: 'About Story', icon: 'layout' },
        ],
    },
    {
        id: 'characters',
        label: 'Character Page',
        sections: [
            { id: 'charHero', label: 'Hero Section', icon: 'layout' },
            { id: 'charList', label: 'Character Roster', icon: 'user' },
            { id: 'charGroup', label: 'Group Photo Hook', icon: 'image' },
        ],
    },
    {
        id: 'contact',
        label: 'Contact Page',
        sections: [
            { id: 'contactHero', label: 'Hero Section', icon: 'layout' },
            { id: 'contactForm', label: 'Form Settings', icon: 'square' },
            { id: 'contactInfo', label: 'Info Box', icon: 'info' },
            { id: 'contactSupport', label: 'Support Cards', icon: 'user' },
            { id: 'contactFaq', label: 'FAQ Section', icon: 'help' },
            { id: 'contactSocials', label: 'Social Media', icon: 'share' },
            { id: 'contactAssets', label: 'Decorative Assets', icon: 'image' },
            { id: 'contactBg', label: 'Background Overlay', icon: 'image' },
            { id: 'contactResponses', label: 'Form Responses', icon: 'user' },
        ]
    },
    {
        id: 'maps',
        label: 'Maps Page',
        sections: [
            { id: 'mapHero', label: 'Hero Section', icon: 'layout' },
            { id: 'mapHorizontalScroll', label: 'Horizontal Scroll', icon: 'image' },
            { id: 'mapCTA', label: 'CTA Section', icon: 'square' },
        ]
    },
    {
        id: 'powerplay',
        label: 'Powerplay Page',
        sections: [
            { id: 'ppHero', label: 'Hero Section', icon: 'layout' },
            { id: 'ppSurvive', label: 'Survive Banner', icon: 'image' },
            { id: 'ppShield', label: 'Shield Section', icon: 'zap' },
            { id: 'ppBlaster', label: 'Blaster Section', icon: 'zap' },
            { id: 'ppInvisibility', label: 'Invisibility Section', icon: 'zap' },
            { id: 'ppRewards', label: 'Rewards Banner', icon: 'image' },
            { id: 'ppMagnet', label: 'Magnet Section', icon: 'zap' },
            { id: 'ppScore', label: 'Score Multipliers', icon: 'zap' },
            { id: 'ppMegaCoin', label: 'Mega Coin', icon: 'zap' },
            { id: 'ppBonusZone', label: 'Bonus Zone', icon: 'image' },
            { id: 'ppJumper', label: 'Jumper', icon: 'zap' },
            { id: 'ppBonusRoad', label: 'Bonus Road', icon: 'image' },
            { id: 'ppChoice', label: 'Choice Footer', icon: 'layout' },
        ],
    },
    {
        id: 'blog',
        label: 'Blog Page',
        sections: [
            { id: 'blogHero', label: 'Hero Slider', icon: 'layout' },
            { id: 'blogBriefings', label: 'Latest Briefings', icon: 'article' },
        ],
    },
    {
        id: 'testimonialsPage',
        label: 'Testimonials Page',
        sections: [
            { id: 'tp_hero', label: 'Hero Section', icon: 'layout' },
            { id: 'tp_responses', label: 'User Submissions', icon: 'user' },
        ],
    },
    {
        id: 'faq',
        label: 'FAQ Page',
        sections: [
            { id: 'faqHero', label: 'Hero Section', icon: 'layout' },
            { id: 'faqQuestions', label: 'Questions', icon: 'help' },
            { id: 'faqRatings', label: 'Ratings', icon: 'star' },
        ],
    },
];

// ─── CSS-IN-JS ────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .adm { display: flex; height: 100vh; overflow: hidden; font-family: 'Inter', -apple-system, sans-serif; font-size: 14px; background: #0d1117; color: #e6edf3; }

  /* Sidebar */
  .adm-sb { width: 240px; flex-shrink: 0; background: #161b22; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; overflow-y: auto; }
  .adm-sb-logo { padding: 20px 18px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .adm-sb-logo img { width: 86px; }
  .adm-sb-logo span { display: block; font-size: 10px; font-weight: 700; color: #8b949e; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .adm-cat-label { padding: 18px 14px 6px; font-size: 10px; font-weight: 700; color: #8b949e; text-transform: uppercase; letter-spacing: 1px; }

  /* Page group toggle */
  .adm-page-toggle { display: flex; align-items: center; gap: 8px; justify-content: space-between; padding: 9px 12px; margin: 2px 6px; border-radius: 7px; cursor: pointer; color: #c9d1d9; font-weight: 600; font-size: 13px; user-select: none; transition: background 0.15s; }
  .adm-page-toggle:hover { background: rgba(255,255,255,0.05); }
  .adm-page-toggle.open { background: rgba(255,255,255,0.04); }
  .adm-page-toggle-left { display: flex; align-items: center; gap: 8px; }

  /* Section sub-items */
  .adm-section-list { overflow: hidden; transition: max-height 0.25s ease; }
  .adm-section-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px 8px 30px; margin: 1px 6px; border-radius: 6px; cursor: pointer; color: #8b949e; font-size: 12.5px; font-weight: 500; user-select: none; transition: all 0.12s; }
  .adm-section-item:hover { background: rgba(255,255,255,0.04); color: #c9d1d9; }
  .adm-section-item.active { background: rgba(0,229,255,0.12); color: #00E5FF; font-weight: 600; }
  .adm-sb-foot { margin-top: auto; padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #8b949e; }

  /* Main */
  .adm-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .adm-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); background: #161b22; gap: 12px; }
  .adm-topbar-left { display: flex; flex-direction: column; }
  .adm-topbar-left h1 { font-size: 15px; font-weight: 700; }
  .adm-topbar-left span { font-size: 11px; color: #8b949e; margin-top: 2px; }
  .adm-topbar-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
  .adm-topbar-right .saved-txt { font-size: 11px; color: #8b949e; }
  .adm-content { flex: 1; overflow-y: auto; padding: 26px 28px; }

  /* Cards */
  .adm-card { background: #1c2230; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 22px; margin-bottom: 18px; }
  .adm-card-hd { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
  .adm-card-title { font-size: 14px; font-weight: 700; }
  .adm-card-sub { font-size: 11px; color: #8b949e; margin-top: 3px; }

  /* Form */
  .adm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .adm-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .adm-fg { margin-bottom: 14px; }
  .adm-lbl { display: block; font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #8b949e; margin-bottom: 6px; }
  .adm-inp, .adm-ta { width: 100%; background: #111827; border: 1px solid #30363d; border-radius: 8px; padding: 9px 12px; color: #e6edf3; font-size: 13px; font-family: inherit; transition: border-color 0.15s; }
  .adm-inp:focus, .adm-ta:focus { outline: none; border-color: #00E5FF; box-shadow: 0 0 0 2px rgba(0,229,255,0.08); }
  .adm-ta { resize: vertical; min-height: 80px; }
  .adm-inp[type="file"] { padding: 7px; cursor: pointer; }
  .adm-inp[type="number"] { -moz-appearance: textfield; }

  /* Buttons */
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; font-family: inherit; transition: all 0.15s; white-space: nowrap; }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-primary { background: #00E5FF; color: #000; }
  .btn-primary:hover:not(:disabled) { background: #00bcd4; }
  .btn-danger { background: rgba(255,71,87,0.1); color: #ff4757; border: 1px solid rgba(255,71,87,0.2); }
  .btn-danger:hover { background: #ff4757; color: #fff; }
  .btn-sm { padding: 5px 10px; font-size: 11px; }

  /* Article rows */
  .art-row { display: flex; gap: 14px; align-items: flex-start; background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 13px; margin-bottom: 10px; }
  .art-thumb { width: 90px; height: 60px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .art-info { flex: 1; min-width: 0; }
  .art-info h4 { font-size: 12px; font-weight: 700; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .art-info p { font-size: 11px; color: #8b949e; }

  /* List rows */
  .list-row { display: flex; gap: 12px; align-items: center; background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; }
  .list-row-lbl { flex-shrink: 0; }
  .list-row-lbl span { font-size: 12px; font-weight: 700; display: block; }
  .list-row-lbl p { font-size: 10px; color: #8b949e; }
  .list-row-fields { flex: 1; display: flex; gap: 8px; min-width: 0; }

  /* Misc */
  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; background: rgba(0,229,255,0.1); color: #00E5FF; }
  .img-preview { width: 112px; height: 72px; border-radius: 8px; object-fit: cover; margin-top: 8px; border: 1px solid rgba(255,255,255,0.08); }

  /* Toast */
  .toast-wrap { position: fixed; bottom: 22px; right: 22px; display: flex; flex-direction: column; gap: 8px; z-index: 9999; }
  .toast { padding: 11px 16px; border-radius: 9px; font-size: 12px; font-weight: 600; animation: fadeUp 0.22s ease; }
  .toast-success { background: #0b2e1a; border: 1px solid #2ed573; color: #2ed573; }
  .toast-error { background: #2e0b0f; border: 1px solid #ff4757; color: #ff4757; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }

  /* Editor Blocks */
  .editor-blocks { margin-top: 20px; display: flex; flex-direction: column; gap: 14px; }
  .block-item { background: #111827; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px; position: relative; }
  .block-controls { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 8px; }
  .block-controls button { background: none; border: none; color: #8b949e; cursor: pointer; padding: 4px; border-radius: 4px; display: flex; align-items: center; }
  .block-controls button:hover:not(:disabled) { background: rgba(255,255,255,0.05); color: #c9d1d9; }
  .block-controls button:disabled { opacity: 0.3; cursor: not-allowed; }
  .block-badge { font-size: 9px; font-weight: 800; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; color: #8b949e; margin-left: auto; letter-spacing: 0.5px; }
  .block-img-grid { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: flex-start; }
  .block-preview { width: 100px; height: 60px; border-radius: 6px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); }
  .editor-actions { margin-top: 20px; display: flex; gap: 8px; justify-content: center; padding: 15px; border: 2px dashed rgba(255,255,255,0.05); border-radius: 10px; }
  .btn-outline { background: transparent; border: 1px solid #30363d; color: #8b949e; }
  .btn-outline:hover { border-color: #00E5FF; color: #00E5FF; background: rgba(0,229,255,0.05); }
  .txt-danger { color: #ff4757 !important; }
  .adm-sb-logout { margin-bottom: 10px; padding: 0 10px; }
`;

const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ─── TOAST ────────────────────────────────────────────────
function Toast({ toasts }) {
    return (
        <div className="toast-wrap">
            {toasts.map(t => <div key={t.id} className={`toast toast-${t.type}`}>{t.msg}</div>)}
        </div>
    );
}

// ─── HERO PANEL ───────────────────────────────────────────
function HeroPanel({ data, update, toast }) {
    const hero = data.hero || {};
    const assets = hero.assets || {};

    const updateHero = (key, val) => update('hero', { ...hero, [key]: val });
    const updateAsset = (key, val) => update('hero', { ...hero, assets: { ...assets, [key]: val } });

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd">
                    <div><div className="adm-card-title">Hero Section</div><div className="adm-card-sub">Main headline, subtitle and background</div></div>
                    <span className="badge">Live</span>
                </div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-lbl">Title</label>
                        <textarea className="adm-ta" value={hero.title || ''} onChange={e => updateHero('title', e.target.value)} style={{ minHeight: 60 }} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Subtitle</label>
                        <textarea className="adm-ta" value={hero.subtitle || ''} onChange={e => updateHero('subtitle', e.target.value)} style={{ minHeight: 60 }} />
                    </div>
                </div>
                <GenericUploadField label="Background Image" value={hero.bg} onUpload={url => updateHero('bg', url)} toast={toast} />
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Floating Assets</div><div className="adm-card-sub">3D icons floating in the hero section</div></div>
                <div className="adm-row">
                    <GenericUploadField label="Character" value={assets.character} onUpload={url => updateAsset('character', url)} toast={toast} />
                    <GenericUploadField label="Coin" value={assets.coin} onUpload={url => updateAsset('coin', url)} toast={toast} />
                </div>
                <div className="adm-row">
                    <GenericUploadField label="Shield" value={assets.shield} onUpload={url => updateAsset('shield', url)} toast={toast} />
                    <GenericUploadField label="Magnet" value={assets.magnet} onUpload={url => updateAsset('magnet', url)} toast={toast} />
                </div>
                <div className="adm-row">
                    <GenericUploadField label="Blaster" value={assets.blaster} onUpload={url => updateAsset('blaster', url)} toast={toast} />
                    <GenericUploadField label="Chest" value={assets.chest} onUpload={url => updateAsset('chest', url)} toast={toast} />
                </div>
                <div className="adm-row">
                    <GenericUploadField label="2X Powerup" value={assets.twoX} onUpload={url => updateAsset('twoX', url)} toast={toast} />
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Global Score</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Live Score Value</label>
                    <input className="adm-inp" type="number" style={{ maxWidth: 160 }} value={data.score || ''} onChange={e => update('score', e.target.value)} />
                </div>
            </div>
        </>
    );
}

// ─── STATS PANEL ──────────────────────────────────────────
function StatsPanel({ data, update }) {
    const stats = data.stats || { items: [] };
    const setItem = (i, key, val) => {
        const items = [...stats.items];
        items[i] = { ...items[i], [key]: val };
        update('stats', { ...stats, items });
    };
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Statistics Items</div><div className="adm-card-sub">The 4 counters on the home page</div></div></div>
            {stats.items.map((s, i) => (
                <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#00E5FF' }}>Stat {i + 1}</div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Target Number</label><input className="adm-inp" type="number" value={s.target} onChange={e => setItem(i, 'target', parseInt(e.target.value))} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Suffix (e.g. M+)</label><input className="adm-inp" value={s.suffix} onChange={e => setItem(i, 'suffix', e.target.value)} /></div>
                    </div>
                    <div className="adm-fg"><label className="adm-lbl">Label</label><input className="adm-inp" value={s.title} onChange={e => setItem(i, 'title', e.target.value)} /></div>
                    <div className="adm-fg"><label className="adm-lbl">Subtitle</label><textarea className="adm-ta" value={s.subtitle} onChange={e => setItem(i, 'subtitle', e.target.value)} style={{ minHeight: 60 }} /></div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                </div>
            ))}
        </div>
    );
}

// ─── FEATURES 3D PANEL ────────────────────────────────────
function Features3DPanel({ data, update, toast }) {
    const feat = data.features3d || {};
    const up = (key, val) => update('features3d', { ...feat, [key]: val });
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">3D Features Section</div></div>
            <div className="adm-fg">
                <label className="adm-lbl">Heading</label>
                <textarea className="adm-ta" value={feat.heading || ''} onChange={e => up('heading', e.target.value)} />
            </div>
            <div className="adm-fg">
                <label className="adm-lbl">Description</label>
                <textarea className="adm-ta" value={feat.description || ''} onChange={e => up('description', e.target.value)} />
            </div>
            <div className="adm-row">
                <div className="adm-fg">
                    <label className="adm-lbl">Button Text</label>
                    <input className="adm-inp" value={feat.buttonText || ''} onChange={e => up('buttonText', e.target.value)} />
                </div>
                <GenericUploadField label="Main Image" value={feat.image} onUpload={url => up('image', url)} toast={toast} />
            </div>
        </div>
    );
}

// ─── COMMUNITY PANEL ──────────────────────────────────────
function CommunityPanel({ data, update, toast }) {
    const community = data.community || [];
    const setItem = (i, key, val) => {
        const next = [...community];
        next[i] = { ...next[i], [key]: val };
        update('community', next);
    };
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Community Tiles</div><div className="adm-card-sub">The alternating image/text sections</div></div></div>
            {community.map((c, i) => (
                <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#00E5FF' }}>Section {c.number}</div>
                    <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={c.title} onChange={e => setItem(i, 'title', e.target.value)} /></div>
                    <div className="adm-fg"><label className="adm-lbl">Description</label><textarea className="adm-ta" value={c.desc} onChange={e => setItem(i, 'desc', e.target.value)} style={{ minHeight: 60 }} /></div>
                    <GenericUploadField label="Section Image" value={c.image} onUpload={url => setItem(i, 'image', url)} toast={toast} />
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                </div>
            ))}
        </div>
    );
}

// ─── FINAL SECTION PANEL ──────────────────────────────────
function FinalSectionPanel({ data, update, toast }) {
    const fs = data.finalSection || { slides: [] };
    const setSlide = (i, key, val) => {
        const slides = [...fs.slides];
        slides[i] = { ...slides[i], [key]: val };
        update('finalSection', { ...fs, slides });
    };
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Final Slides</div><div className="adm-card-sub">The bottom scroll section slides</div></div></div>
            {fs.slides.map((s, i) => (
                <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#00E5FF' }}>Slide {i + 1} ({s.id})</div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={s.title} onChange={e => setSlide(i, 'title', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Title Color</label><input className="adm-inp" value={s.titleColor} onChange={e => setSlide(i, 'titleColor', e.target.value)} placeholder="#HEX" /></div>
                    </div>
                    <div className="adm-fg"><label className="adm-lbl">Subtitle</label><textarea className="adm-ta" value={s.subtitle} onChange={e => setSlide(i, 'subtitle', e.target.value)} style={{ minHeight: 60 }} /></div>
                    <GenericUploadField label="Background" value={s.bg} onUpload={url => setSlide(i, 'bg', url)} toast={toast} />
                    
                    {s.type === 'characters' && (
                        <div style={{ marginTop: '10px', padding: '10px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <div className="adm-lbl">Character Visuals</div>
                            <div className="adm-row">
                                <GenericUploadField label="Left Character" value={s.leftChar} onUpload={url => setSlide(i, 'leftChar', url)} toast={toast} />
                                <GenericUploadField label="Right Character" value={s.rightChar} onUpload={url => setSlide(i, 'rightChar', url)} toast={toast} />
                            </div>
                            <GenericUploadField label="Section Logo" value={s.logo} onUpload={url => setSlide(i, 'logo', url)} toast={toast} />
                        </div>
                    )}
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                </div>
            ))}
        </div>
    );
}

// ─── TESTIMONIALS PANEL ───────────────────────────────────
function TestimonialsPanel({ data, update, toast }) {
    const list = data.testimonials || [];
    const setItem = (i, key, val) => {
        const next = [...list];
        next[i] = { ...next[i], [key]: val };
        update('testimonials', next);
    };
    const addTestimonial = () => update('testimonials', [...list, { rating: 5, name: 'New Reviewer', role: 'Player', text: 'Amazing game!', icon: '🎮' }]);
    const removeTestimonial = i => update('testimonials', list.filter((_, idx) => idx !== i));

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd"><div><div className="adm-card-title">Reviews List</div><div className="adm-card-sub">Manage player feedback</div></div></div>
                {list.map((t, i) => (
                    <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#00E5FF' }}>Review {i + 1}</div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeTestimonial(i)}>{I.trash}</button>
                        </div>
                        <div className="adm-row">
                            <div className="adm-fg"><label className="adm-lbl">Name</label><input className="adm-inp" value={t.name} onChange={e => setItem(i, 'name', e.target.value)} /></div>
                            <div className="adm-fg"><label className="adm-lbl">Role</label><input className="adm-inp" value={t.role} onChange={e => setItem(i, 'role', e.target.value)} /></div>
                        </div>
                        <div className="adm-row">
                            <div className="adm-fg"><label className="adm-lbl">Rating (1-5)</label><input className="adm-inp" type="number" min="1" max="5" value={t.rating} onChange={e => setItem(i, 'rating', parseInt(e.target.value))} /></div>
                            <div className="adm-fg"><label className="adm-lbl">Icon/Emoji</label><input className="adm-inp" value={t.icon} onChange={e => setItem(i, 'icon', e.target.value)} /></div>
                        </div>
                        <div className="adm-fg"><label className="adm-lbl">Review Text</label><textarea className="adm-ta" value={t.text} onChange={e => setItem(i, 'text', e.target.value)} /></div>
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                    </div>
                ))}
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={addTestimonial}>{I.plus} Add Testimonial</button>
            </div>
        </>
    );
}

// ─── CTA PANEL ────────────────────────────────────────────
function CTAPanel({ data, update, toast }) {
    const cta = data.cta || {};
    const up = (key, val) => update('cta', { ...cta, [key]: val });
    const setSocial = (i, key, val) => {
        const links = [...(cta.socialLinks || [])];
        links[i] = { ...links[i], [key]: val };
        up('socialLinks', links);
    };
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Call to Action & Socials</div></div>
            <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={cta.subtitle || ''} onChange={e => up('subtitle', e.target.value)} /></div>
            <div className="adm-fg"><label className="adm-lbl">Main Title</label><input className="adm-inp" value={cta.title || ''} onChange={e => up('title', e.target.value)} /></div>
            <div className="adm-fg"><label className="adm-lbl">Description</label><textarea className="adm-ta" value={cta.description || ''} onChange={e => up('description', e.target.value)} /></div>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '20px 0' }} />
            <div className="adm-lbl" style={{ color: '#00E5FF', fontWeight: 800 }}>Social Media Links</div>
            {(cta.socialLinks || []).map((s, i) => (
                <div key={i} className="list-row" style={{ alignItems: 'flex-start', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ flex: 1 }}>
                        <div className="adm-lbl">{s.label}</div>
                        <input className="adm-inp" value={s.url} onChange={e => setSocial(i, 'url', e.target.value)} placeholder="URL" />
                    </div>
                    <img src={s.icon} style={{ width: 40, height: 40, borderRadius: '6px', marginLeft: '10px' }} alt={s.label} />
                </div>
            ))}
        </div>
    );
}

// ─── BRANDING PANEL ───────────────────────────────────────
function BrandingPanel({ data, update, toast }) {
    const nav = data.navbar || {};
    const up = (key, val) => update('navbar', { ...nav, [key]: val });
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Branding & Store Buttons</div></div>
            <GenericUploadField label="Site Logo" value={nav.logo} onUpload={url => up('logo', url)} toast={toast} />
            <div className="adm-row">
                <GenericUploadField label="Google Play Button" value={nav.googlePlay} onUpload={url => up('googlePlay', url)} toast={toast} />
                <GenericUploadField label="App Store Button" value={nav.appStore} onUpload={url => up('appStore', url)} toast={toast} />
            </div>
        </div>
    );
}

// ─── ABOUT PANEL ──────────────────────────────────────────
function AboutPanel({ data, update }) {
    const ab = data.about || {};
    const up = (key, val) => update('about', { ...ab, [key]: val });
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">About Story Section</div></div>
            <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={ab.title || ''} onChange={e => up('title', e.target.value)} /></div>
            <div className="adm-fg"><label className="adm-lbl">Story Text</label><textarea className="adm-ta" value={ab.text || ''} onChange={e => up('text', e.target.value)} /></div>
        </div>
    );
}

// ─── CHAR HERO PANEL ─────────────────────────────────────
function CharHeroPanel({ data, update, toast }) {
    const hero = data.charactersPage?.hero || {};
    const up = (key, val) => update('charactersPage', { 
        ...data.charactersPage, 
        hero: { ...hero, [key]: val } 
    });

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Characters Hero Section</div></div>
            <div className="adm-row">
                <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={hero.title || ''} onChange={e => up('title', e.target.value)} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={hero.subtitle || ''} onChange={e => up('subtitle', e.target.value)} /></div>
            </div>
            <GenericUploadField label="Background Image" value={hero.bgImage} onUpload={url => up('bgImage', url)} toast={toast} />
        </div>
    );
}

// ─── CHAR LIST PANEL ──────────────────────────────────────
function CharListPanel({ data, update, toast }) {
    const list = data.charactersPage?.sections || [];
    const setItem = (i, key, val) => {
        const next = [...list];
        next[i] = { ...next[i], [key]: val };
        update('charactersPage', { ...data.charactersPage, sections: next });
    };
    const addChar = () => update('charactersPage', { 
        ...data.charactersPage, 
        sections: [...list, { id: 'new-' + Date.now(), characterName: 'New Runner', personality: [], reversed: false }] 
    });
    const removeChar = i => update('charactersPage', { 
        ...data.charactersPage, 
        sections: list.filter((_, idx) => idx !== i) 
    });

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Characters Roster</div><div className="adm-card-sub">The main list of characters</div></div></div>
            {list.map((c, i) => (
                <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#00E5FF' }}>Character: {c.characterName}</div>
                        <button className="btn btn-danger btn-sm" onClick={() => removeChar(i)}>{I.trash}</button>
                    </div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Name</label><input className="adm-inp" value={c.characterName} onChange={e => setItem(i, 'characterName', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={c.characterTitle} onChange={e => setItem(i, 'characterTitle', e.target.value)} /></div>
                    </div>
                    <div className="adm-fg"><label className="adm-lbl">Main Quote</label><input className="adm-inp" value={c.mainQuote} onChange={e => setItem(i, 'mainQuote', e.target.value)} /></div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Personality (One per line)</label>
                        <textarea className="adm-ta" value={(c.personality || []).join('\n')} onChange={e => setItem(i, 'personality', e.target.value.split('\n'))} />
                    </div>
                    <div className="adm-row">
                        <GenericUploadField label="Character Image" value={c.characterImage} onUpload={url => setItem(i, 'characterImage', url)} toast={toast} />
                        <GenericUploadField label="Section BG" value={c.sectionBg} onUpload={url => setItem(i, 'sectionBg', url)} toast={toast} />
                        <GenericUploadField label="Card BG" value={c.cardBg} onUpload={url => setItem(i, 'cardBg', url)} toast={toast} />
                    </div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Variant (blue/teal/purple/orange/red/etc)</label><input className="adm-inp" value={c.variant} onChange={e => setItem(i, 'variant', e.target.value)} /></div>
                        <div className="adm-fg" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                            <input type="checkbox" checked={c.reversed} onChange={e => setItem(i, 'reversed', e.target.checked)} />
                            <label className="adm-lbl">Reversed Layout</label>
                        </div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                </div>
            ))}
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={addChar}>{I.plus} Add Character</button>
        </div>
    );
}

// ─── CHAR GROUP PANEL ─────────────────────────────────────
function CharGroupPanel({ data, update, toast }) {
    const group = data.charactersPage?.groupSection || {};
    const up = (key, val) => update('charactersPage', { 
        ...data.charactersPage, 
        groupSection: { ...group, [key]: val } 
    });

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Group Photo Hook Section</div></div>
            <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={group.title || ''} onChange={e => up('title', e.target.value)} /></div>
            <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={group.subtitle || ''} onChange={e => up('subtitle', e.target.value)} /></div>
            <div className="adm-fg"><label className="adm-lbl">Description Text</label><textarea className="adm-ta" value={group.text || ''} onChange={e => up('text', e.target.value)} /></div>
            <div className="adm-row">
                <GenericUploadField label="Group Photo" value={group.image} onUpload={url => up('image', url)} toast={toast} />
                <GenericUploadField label="Section Background" value={group.bg} onUpload={url => up('bg', url)} toast={toast} />
            </div>
        </div>
    );
}

// ─── EXPLORE PANEL ────────────────────────────────────────
function ExplorePanel({ data, update }) {
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Explore Section</div></div>
            <div className="adm-fg">
                <label className="adm-lbl">Title</label>
                <input className="adm-inp" value={data.explore?.title || ''} onChange={e => update('explore', { ...data.explore, title: e.target.value })} />
            </div>
            <div className="adm-row">
                <div className="adm-fg">
                    <label className="adm-lbl">Subtitle</label>
                    <input className="adm-inp" value={data.explore?.subtitle || ''} onChange={e => update('explore', { ...data.explore, subtitle: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Button Text</label>
                    <input className="adm-inp" value={data.explore?.buttonText || ''} onChange={e => update('explore', { ...data.explore, buttonText: e.target.value })} />
                </div>
            </div>
        </div>
    );
}

// ─── ARTICLES PANEL ───────────────────────────────────────
function ArticlesPanel({ data, update, toast }) {
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({ title: '', date: '', desc: '', file: null });
    const [uploading, setUploading] = useState(false);

    const articles = data.articles || { title: '', subtitle: '', items: [] };

    const deleteArticle = id => update('articles', { ...articles, items: articles.items.filter(a => a.id !== id) });

    const handleFile = e => {
        const file = e.target.files[0];
        setForm(f => ({ ...f, file }));
        if (file) setPreview(URL.createObjectURL(file));
    };

    const addArticle = async () => {
        if (!form.title || !form.date || !form.desc || !form.file) { toast('Fill all fields and select an image.', 'error'); return; }
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', form.file);
            const res = await fetch(UPLOAD_API, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = await res.json();
            update('articles', { ...articles, items: [...articles.items, { id: Date.now().toString(), ...form, image: url, link: '#', file: undefined }] });
            setForm({ title: '', date: '', desc: '', file: null });
            setPreview(null);
            toast('Article added!');
        } catch (e) { toast(e.message, 'error'); }
        finally { setUploading(false); }
    };

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Section Heading</div></div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-lbl">Title</label>
                        <input className="adm-inp" value={articles.title} onChange={e => update('articles', { ...articles, title: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Subtitle</label>
                        <input className="adm-inp" value={articles.subtitle} onChange={e => update('articles', { ...articles, subtitle: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div><div className="adm-card-title">Article List</div><div className="adm-card-sub">{articles.items.length} articles</div></div></div>
                {articles.items.length === 0 && <p style={{ color: '#8b949e', fontSize: 13 }}>No articles yet.</p>}
                {articles.items.map(a => (
                    <div className="art-row" key={a.id}>
                        <img className="art-thumb" src={a.image} alt={a.title} onError={e => e.target.style.display = 'none'} />
                        <div className="art-info">
                            <h4>{a.title}</h4>
                            <p>{a.date} · {(a.desc || '').substring(0, 80)}…</p>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteArticle(a.id)}>{I.trash} Delete</button>
                    </div>
                ))}
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Add New Article</div></div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-lbl">Title</label>
                        <input className="adm-inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Article title" />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Date</label>
                        <input className="adm-inp" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. MAR 1, 2026" />
                    </div>
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Description</label>
                    <textarea className="adm-ta" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Image</label>
                    <input className="adm-inp" type="file" accept="image/*" onChange={handleFile} />
                    {preview && <img className="img-preview" src={preview} alt="preview" />}
                </div>
                <button className="btn btn-primary" onClick={addArticle} disabled={uploading}>{I.plus} {uploading ? 'Uploading…' : 'Add Article'}</button>
            </div>
        </>
    );
}

// ─── RUNNERS PANEL ────────────────────────────────────────
function RunnersPanel({ data, update }) {
    const runners = data.runners || { title: '', subtitle: '', items: [] };
    const setItem = (i, key, val) => {
        const items = [...runners.items];
        items[i] = { ...items[i], [key]: val };
        update('runners', { ...runners, items });
    };
    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Section Heading</div></div>
                <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={runners.title} onChange={e => update('runners', { ...runners, title: e.target.value })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtitle</label><textarea className="adm-ta" value={runners.subtitle} onChange={e => update('runners', { ...runners, subtitle: e.target.value })} /></div>
            </div>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Characters</div></div>
                {runners.items.map((r, i) => (
                    <div className="list-row" key={i}>
                        <img src={r.modelImage} alt={r.name} style={{ width: 36, height: 54, objectFit: 'contain', flexShrink: 0 }} />
                        <div className="list-row-fields">
                            <input className="adm-inp" style={{ maxWidth: 110 }} value={r.name} onChange={e => setItem(i, 'name', e.target.value)} placeholder="Name" />
                            <input className="adm-inp" value={r.desc} onChange={e => setItem(i, 'desc', e.target.value)} placeholder="Description" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

// ─── POWERUPS PANEL ───────────────────────────────────────
function PowerupsPanel({ data, update }) {
    const powerups = data.powerups || { title: '', subtitle: '', items: [] };
    const setItem = (i, key, val) => {
        const items = [...powerups.items];
        items[i] = { ...items[i], [key]: val };
        update('powerups', { ...powerups, items });
    };
    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Section Heading</div></div>
                <div className="adm-row">
                    <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={powerups.title} onChange={e => update('powerups', { ...powerups, title: e.target.value })} /></div>
                    <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={powerups.subtitle} onChange={e => update('powerups', { ...powerups, subtitle: e.target.value })} /></div>
                </div>
            </div>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Powerup Items</div></div>
                {powerups.items.map((p, i) => (
                    <div className="list-row" key={i}>
                        <img src={p.image} alt={p.name} style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }} />
                        <div className="list-row-fields">
                            <input className="adm-inp" style={{ maxWidth: 120 }} value={p.name} onChange={e => setItem(i, 'name', e.target.value)} />
                            <input className="adm-inp" value={p.desc} onChange={e => setItem(i, 'desc', e.target.value)} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

// ─── NAV PANEL ────────────────────────────────────────────
function NavPanel({ data, update }) {
    const nav = data.nav || [];
    const setItem = (i, val) => { const n = [...nav]; n[i] = val; update('nav', n); };
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Navigation Links</div><div className="adm-card-sub">Labels shown in the top nav bar</div></div></div>
            {nav.map((n, i) => (
                <div className="list-row" key={i}>
                    <div className="list-row-lbl"><span>Link {i + 1}</span></div>
                    <input className="adm-inp" value={n} onChange={e => setItem(i, e.target.value)} />
                </div>
            ))}
        </div>
    );
}

// ─── GENERIC UPLOAD HELPER ─────────────────────────────
const GenericUploadField = ({ label, value, onUpload, toast }) => {
    const [uploading, setUploading] = useState(false);
    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-any`, { 
                method: 'POST', 
                headers: { ...getAuthHeader() },
                body: fd 
            });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = await res.json();
            onUpload(url);
            toast('Image uploaded!');
        } catch (e) { toast(e.message, 'error'); }
        finally { setUploading(false); }
    };
    return (
        <div className="adm-fg">
            <label className="adm-lbl">{label}</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input className="adm-inp" value={value || ''} readOnly />
                <input type="file" id={`file-${label}`} style={{ display: 'none' }} onChange={handleFile} />
                <button className="btn btn-primary btn-sm" onClick={() => document.getElementById(`file-${label}`).click()} disabled={uploading}>
                    {uploading ? '...' : 'Upload'}
                </button>
            </div>
            {value && <img className="img-preview" src={value} alt="Preview" />}
        </div>
    );
};

// ─── CONTACT PANEL ───────────────────────────────────────
// ─── TESTIMONIAL RESPONSES PANEL ───────────────────────
function TestimonialResponsesPanel({ toast }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/get-testimonials`, { headers: getAuthHeader() })
            .then(r => r.json())
            .then(d => { setList(d); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const del = async (id) => {
        if(!confirm('Delete this testimonial submission?')) return;
        await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/${id}`, { 
            method: 'DELETE',
            headers: getAuthHeader()
        });
        toast('Deleted');
        load();
    };

    if (loading) return <p>Loading testimonials...</p>;

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">User Submitted Testimonials ({list.length})</div><button className="btn btn-secondary btn-sm" onClick={load}>Refresh</button></div>
            {list.length === 0 && <p style={{padding:20, color:'#8b949e'}}>No submissions yet.</p>}
            <div className="responses-list">
                {list.map(r => (
                    <div key={r.id} className="art-row" style={{flexDirection:'column', alignItems:'flex-start', gap:10}}>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                            <div style={{display:'flex', alignItems:'center', gap:10}}>
                                <span style={{color:'#00E5FF', fontWeight:700}}>{r.name}</span>
                                <span style={{color:'#FFB800'}}>★ {r.rating}</span>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => del(r.id)}>{I.trash}</button>
                        </div>
                        <div style={{fontSize:'12px', color:'#8b949e'}}>{r.email} · {new Date(r.date).toLocaleString()}</div>
                        <div style={{background:'rgba(0,0,0,0.2)', padding:10, borderRadius:5, width:'100%', fontSize:'13px', marginTop:5}}>
                            {r.review}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestimonialsPagePanel({ data, update, section, toast }) {
    const tp = data.testimonialsPage || {};
    const hero = tp.hero || { title: '', subtitle: '' };

    if (section === 'tp_responses') return <TestimonialResponsesPanel toast={toast} />;

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Testimonials Page Hero</div></div>
            <div className="adm-fg">
                <label className="adm-lbl">Title (HTML allowed)</label>
                <textarea className="adm-ta" value={hero.title} onChange={e => update('testimonialsPage', { ...tp, hero: { ...hero, title: e.target.value } })} />
            </div>
            <div className="adm-fg">
                <label className="adm-lbl">Subtitle</label>
                <input className="adm-inp" value={hero.subtitle} onChange={e => update('testimonialsPage', { ...tp, hero: { ...hero, subtitle: e.target.value } })} />
            </div>
        </div>
    );
}

// ─── RESPONSES PANEL ─────────────────────────────
function ResponsesPanel({ toast }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/responses`, { headers: getAuthHeader() })
            .then(r => r.json())
            .then(d => { setList(d); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const del = async (id) => {
        if(!confirm('Delete this submission?')) return;
        await fetch(`${import.meta.env.VITE_API_URL}/api/responses/${id}`, { 
            method: 'DELETE',
            headers: getAuthHeader()
        });
        toast('Deleted');
        load();
    };

    if (loading) return <p>Loading responses...</p>;

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">Contact Form Submissions ({list.length})</div><button className="btn btn-secondary btn-sm" onClick={load}>Refresh</button></div>
            {list.length === 0 && <p style={{padding:20, color:'#8b949e'}}>No submissions yet.</p>}
            <div className="responses-list">
                {list.map(r => (
                    <div key={r.id} className="art-row" style={{flexDirection:'column', alignItems:'flex-start', gap:10}}>
                        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                            <span style={{color:'#00E5FF', fontWeight:700}}>{new Date(r.date).toLocaleString()}</span>
                            <button className="btn btn-danger btn-sm" onClick={() => del(r.id)}>{I.trash}</button>
                        </div>
                        <div style={{display:'grid', gridTemplateColumns:'100px 1fr', gap:10, fontSize:'13px'}}>
                            <div style={{color:'#8b949e'}}>Name:</div><div>{r.name}</div>
                            <div style={{color:'#8b949e'}}>Email:</div><div>{r.email}</div>
                            <div style={{color:'#8b949e'}}>Subject:</div><div>{r.subject}</div>
                        </div>
                        <div style={{background:'rgba(0,0,0,0.2)', padding:10, borderRadius:5, width:'100%', fontSize:'13px', marginTop:5}}>
                            {r.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── MAP PANEL ───────────────────────────────────────────
function MapPanel({ data, update, section, toast }) {
    const mp = data.mapPage || {};
    const hero = mp.hero || {};
    const trans = mp.transition || {};
    const cta = mp.cta || {};

    const updateMP = (key, val) => update('mapPage', { ...mp, [key]: val });

    if (section === 'mapHero') {
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Map Hero</div></div>
                <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={hero.title || ''} onChange={e => updateMP('hero', { ...hero, title: e.target.value })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={hero.subtitle || ''} onChange={e => updateMP('hero', { ...hero, subtitle: e.target.value })} /></div>
            </div>
        );
    }

    if (section === 'mapHorizontalScroll') {
        const slides = mp.horizontalScroll || [];
        const updateSlide = (i, key, val) => {
            const next = [...slides];
            next[i] = { ...next[i], [key]: val };
            updateMP('horizontalScroll', next);
        };

        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Horizontal Scroll Slides</div></div>
                {slides.map((s, i) => (
                    <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                        <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#00E5FF' }}>Slide {i + 1}</div>
                        <GenericUploadField label="Background Image" value={s.bg} onUpload={url => updateSlide(i, 'bg', url)} toast={toast} />
                        {s.hasOwnProperty('leftOverlay') && (
                            <GenericUploadField label="Left Overlay" value={s.leftOverlay} onUpload={url => updateSlide(i, 'leftOverlay', url)} toast={toast} />
                        )}
                        {s.hasOwnProperty('rightOverlay') && (
                            <GenericUploadField label="Right Overlay (Bridge)" value={s.rightOverlay} onUpload={url => updateSlide(i, 'rightOverlay', url)} toast={toast} />
                        )}
                        {s.hasOwnProperty('topOverlay') && (
                            <GenericUploadField label="Top Overlay" value={s.topOverlay} onUpload={url => updateSlide(i, 'topOverlay', url)} toast={toast} />
                        )}
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                    </div>
                ))}
            </div>
        );
    }

    if (section === 'mapCTA') {
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">CTA Section</div></div>
                <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={cta.title || ''} onChange={e => updateMP('cta', { ...cta, title: e.target.value })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtitle 1</label><textarea className="adm-ta" value={cta.subtitle1 || ''} onChange={e => updateMP('cta', { ...cta, subtitle1: e.target.value })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtitle 2</label><textarea className="adm-ta" value={cta.subtitle2 || ''} onChange={e => updateMP('cta', { ...cta, subtitle2: e.target.value })} /></div>
                <GenericUploadField label="Mid Image" value={cta.midImage} onUpload={url => updateMP('cta', { ...cta, midImage: url })} toast={toast} />
            </div>
        );
    }

    return null;
}

function ContactPanel({ data, update, section, toast }) {
    const cp = data.contactPage || {};
    // ... existing logic ...
    if (section === 'contactResponses') return <ResponsesPanel toast={toast} />;

    const hero = cp.hero || {};
    const info = cp.infoBox || {};
    const support = cp.support || { cards: [] };
    const bg = cp.bgSection || {};

    const updateCP = (key, val) => update('contactPage', { ...cp, [key]: val });

    if (section === 'contactHero') {
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Contact Hero</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Title</label>
                    <textarea className="adm-ta" value={hero.title || ''} onChange={e => updateCP('hero', { ...hero, title: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Subtitle</label>
                    <textarea className="adm-ta" value={hero.subtitle || ''} onChange={e => updateCP('hero', { ...hero, subtitle: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Button Text</label>
                    <input className="adm-inp" value={hero.buttonText || ''} onChange={e => updateCP('hero', { ...hero, buttonText: e.target.value })} />
                </div>
                <GenericUploadField label="Character Image" value={hero.characterImage} onUpload={url => updateCP('hero', { ...hero, characterImage: url })} toast={toast} />
            </div>
        );
    }

    if (section === 'contactForm') {
        const form = cp.form || { labels: {}, placeholders: {}, subjectOptions: [] };
        const labels = form.labels || {};
        const ph = form.placeholders || {};
        const upForm = (key, val) => updateCP('form', { ...form, [key]: val });
        const upLabels = (key, val) => upForm('labels', { ...labels, [key]: val });
        const upPh = (key, val) => upForm('placeholders', { ...ph, [key]: val });

        return (
            <>
                <div className="adm-card">
                    <div className="adm-card-hd"><div className="adm-card-title">Form Labels & Button</div></div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Name Label</label><input className="adm-inp" value={labels.name || ''} onChange={e => upLabels('name', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Email Label</label><input className="adm-inp" value={labels.email || ''} onChange={e => upLabels('email', e.target.value)} /></div>
                    </div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Subject Label</label><input className="adm-inp" value={labels.subject || ''} onChange={e => upLabels('subject', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Message Label</label><input className="adm-inp" value={labels.message || ''} onChange={e => upLabels('message', e.target.value)} /></div>
                    </div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Required Text</label><input className="adm-inp" value={labels.requiredText || ''} onChange={e => upLabels('requiredText', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Subject Info</label><input className="adm-inp" value={labels.subjectInfo || ''} onChange={e => upLabels('subjectInfo', e.target.value)} /></div>
                    </div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Submit Button Text</label>
                        <input className="adm-inp" value={form.buttonText || ''} onChange={e => upForm('buttonText', e.target.value)} />
                    </div>
                </div>
                <div className="adm-card">
                    <div className="adm-card-hd"><div className="adm-card-title">Placeholders</div></div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Name Placeholder</label><input className="adm-inp" value={ph.name || ''} onChange={e => upPh('name', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Email Placeholder</label><input className="adm-inp" value={ph.email || ''} onChange={e => upPh('email', e.target.value)} /></div>
                    </div>
                    <div className="adm-fg"><label className="adm-lbl">Message Placeholder</label><input className="adm-inp" value={ph.message || ''} onChange={e => upPh('message', e.target.value)} /></div>
                </div>
                <div className="adm-card">
                    <div className="adm-card-hd"><div className="adm-card-title">Subject Options (One per line)</div></div>
                    <textarea className="adm-ta" value={(form.subjectOptions || []).join('\n')} onChange={e => upForm('subjectOptions', e.target.value.split('\n'))} />
                </div>
            </>
        );
    }

    if (section === 'contactInfo') {
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Information Box</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Title</label>
                    <input className="adm-inp" value={info.title || ''} onChange={e => updateCP('infoBox', { ...info, title: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Text Content</label>
                    <textarea className="adm-ta" value={info.text || ''} onChange={e => updateCP('infoBox', { ...info, text: e.target.value })} />
                </div>
            </div>
        );
    }

    if (section === 'contactSupport') {
        const updateCard = (i, key, val) => {
            const cards = [...support.cards];
            cards[i] = { ...cards[i], [key]: val };
            updateCP('support', { ...support, cards });
        };
        const addCard = () => updateCP('support', { ...support, cards: [...support.cards, { type: 'chat', icon: '', title: '', desc: '' }] });
        const removeCard = i => updateCP('support', { ...support, cards: support.cards.filter((_, idx) => idx !== i) });

        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div><div className="adm-card-title">Support Cards</div><div className="adm-card-sub">Manage methods to reach support</div></div></div>
                {support.cards.map((card, i) => (
                    <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#00E5FF' }}>Card {i + 1}</div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeCard(i)}>{I.trash}</button>
                        </div>
                        <div className="adm-row">
                            <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={card.title} onChange={e => updateCard(i, 'title', e.target.value)} /></div>
                            <div className="adm-fg"><label className="adm-lbl">Type (e.g. email, phone, chat)</label><input className="adm-inp" value={card.type} onChange={e => updateCard(i, 'type', e.target.value)} /></div>
                        </div>
                        <div className="adm-fg"><label className="adm-lbl">Description</label><textarea className="adm-ta" value={card.desc} onChange={e => updateCard(i, 'desc', e.target.value)} style={{ minHeight: 60 }} /></div>
                        <GenericUploadField label="Icon" value={card.icon} onUpload={url => updateCard(i, 'icon', url)} toast={toast} />
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                    </div>
                ))}
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={addCard}>{I.plus} Add Support Card</button>
            </div>
        );
    }

    if (section === 'contactFaq') {
        const faq = cp.faqSection || { title: '', subtitle: '', tabs: [], allFaqs: {} };
        const upFaq = (key, val) => updateCP('faqSection', { ...faq, [key]: val });
        const upTabFaqs = (tab, nextFaqs) => upFaq('allFaqs', { ...faq.allFaqs, [tab]: nextFaqs });

        return (
            <>
                <div className="adm-card">
                    <div className="adm-card-hd"><div className="adm-card-title">FAQ Header</div></div>
                    <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={faq.title || ''} onChange={e => upFaq('title', e.target.value)} /></div>
                    <div className="adm-fg"><label className="adm-lbl">Subtitle</label><input className="adm-inp" value={faq.subtitle || ''} onChange={e => upFaq('subtitle', e.target.value)} /></div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Category Tabs (One per line)</label>
                        <textarea className="adm-ta" value={(faq.tabs || []).join('\n')} onChange={e => upFaq('tabs', e.target.value.split('\n'))} />
                    </div>
                </div>
                {faq.tabs.map(tab => (
                    <div key={tab} className="adm-card">
                        <div className="adm-card-hd"><div className="adm-card-title">Questions for: {tab}</div></div>
                        {(faq.allFaqs[tab] || []).map((q, i) => (
                            <div key={i} style={{ marginBottom: 15, padding: 10, background: 'rgba(0,0,0,0.1)', borderRadius: 8 }}>
                                <div className="adm-fg"><label className="adm-lbl">Question</label><input className="adm-inp" value={q.q} onChange={e => {
                                    const next = [...(faq.allFaqs[tab] || [])];
                                    next[i] = { ...next[i], q: e.target.value };
                                    upTabFaqs(tab, next);
                                }} /></div>
                                <div className="adm-fg"><label className="adm-lbl">Answer</label><textarea className="adm-ta" value={q.a} onChange={e => {
                                    const next = [...(faq.allFaqs[tab] || [])];
                                    next[i] = { ...next[i], a: e.target.value };
                                    upTabFaqs(tab, next);
                                }} style={{ minHeight: 60 }} /></div>
                                <button className="btn btn-danger btn-sm" onClick={() => {
                                    const next = faq.allFaqs[tab].filter((_, idx) => idx !== i);
                                    upTabFaqs(tab, next);
                                }}>Remove Question</button>
                            </div>
                        ))}
                        <button className="btn btn-outline btn-sm" onClick={() => {
                            const next = [...(faq.allFaqs[tab] || []), { q: '', a: '' }];
                            upTabFaqs(tab, next);
                        }}>{I.plus} Add Question to {tab}</button>
                    </div>
                ))}
            </>
        );
    }

    if (section === 'contactSocials') {
        const social = cp.socialSection || { title: '', description: '', icons: [] };
        const upSocial = (key, val) => updateCP('socialSection', { ...social, [key]: val });
        const updateIcon = (i, key, val) => {
            const next = [...social.icons];
            next[i] = { ...next[i], [key]: val };
            upSocial('icons', next);
        };
        const addSocial = () => upSocial('icons', [...social.icons, { platform: '', image: '', url: '' }]);
        const removeSocial = i => upSocial('icons', social.icons.filter((_, idx) => idx !== i));

        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Social Media Section</div></div>
                <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={social.title || ''} onChange={e => upSocial('title', e.target.value)} /></div>
                <div className="adm-fg"><label className="adm-lbl">Description</label><textarea className="adm-ta" value={social.description || ''} onChange={e => upSocial('description', e.target.value)} /></div>
                <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />
                <div className="adm-lbl" style={{ color: '#00E5FF' }}>Platform Icons</div>
                {social.icons.map((s, i) => (
                    <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', background: 'rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ fontWeight: 700 }}>{s.platform || 'New Platform'}</span>
                            <button className="btn btn-danger btn-sm" onClick={() => removeSocial(i)}>{I.trash}</button>
                        </div>
                        <div className="adm-row">
                            <div className="adm-fg"><label className="adm-lbl">Platform Name</label><input className="adm-inp" value={s.platform} onChange={e => updateIcon(i, 'platform', e.target.value)} /></div>
                            <div className="adm-fg"><label className="adm-lbl">URL</label><input className="adm-inp" value={s.url} onChange={e => updateIcon(i, 'url', e.target.value)} /></div>
                        </div>
                        <GenericUploadField label="Platform Icon Image" value={s.image} onUpload={url => updateIcon(i, 'image', url)} toast={toast} />
                    </div>
                ))}
                <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={addSocial}>{I.plus} Add Social Platform</button>
            </div>
        );
    }

    if (section === 'contactAssets') {
        const icons = cp.icons || {};
        const upIcons = (key, val) => updateCP('icons', { ...icons, [key]: val });
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Decorative Assets</div><div className="adm-card-sub">Manage all secondary icons and background graphics</div></div>
                <div className="adm-row">
                    <GenericUploadField label="Mask Group (Large Bottom Graphics)" value={bg.maskGroup} onUpload={url => updateCP('bgSection', { ...bg, maskGroup: url })} toast={toast} />
                    <GenericUploadField label="Girl Character Image" value={bg.girlImage} onUpload={url => updateCP('bgSection', { ...bg, girlImage: url })} toast={toast} />
                </div>
                <div className="adm-row">
                    <GenericUploadField label="FAQ Question Icon (Left)" value={icons.questionLeft} onUpload={url => upIcons('questionLeft', url)} toast={toast} />
                    <GenericUploadField label="FAQ Question Icon (Right)" value={icons.questionRight} onUpload={url => upIcons('questionRight', url)} toast={toast} />
                </div>
            </div>
        );
    }

    if (section === 'contactBg') {
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Background Overlay</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Background Color</label>
                    <input className="adm-inp" value={bg.bgColor || ''} onChange={e => updateCP('bgSection', { ...bg, bgColor: e.target.value })} placeholder="#HEX or color name" />
                </div>
                <GenericUploadField label="Overlay Image" value={bg.overlayImage} onUpload={url => updateCP('bgSection', { ...bg, overlayImage: url })} toast={toast} />
            </div>
        );
    }

    return null;
}

// ─── FAQ PANEL ───────────────────────────────────────────
function FaqPanel({ data, update, section, toast }) {
    const faq = data.faqPage || {};

    switch (section) {
        case 'faqHero':
            const hero = faq.hero || {};
            return (
                <div className="adm-panel anim-fade">
                    <h2 className="adm-h2">Hero Section</h2>
                    <div className="adm-card">
                        <div className="adm-fg">
                            <label className="adm-lbl">Title</label>
                            <input className="adm-inp" value={hero.title || ''} onChange={e => update('faqPage', { ...faq, hero: { ...hero, title: e.target.value } })} />
                        </div>
                        <div className="adm-fg">
                            <label className="adm-lbl">Subtitle</label>
                            <input className="adm-inp" value={hero.subtitle || ''} onChange={e => update('faqPage', { ...faq, hero: { ...hero, subtitle: e.target.value } })} />
                        </div>
                        <div className="adm-fg">
                            <label className="adm-lbl">Button Text</label>
                            <input className="adm-inp" value={hero.buttonText || ''} onChange={e => update('faqPage', { ...faq, hero: { ...hero, buttonText: e.target.value } })} />
                        </div>
                    </div>
                </div>
            );

        case 'faqQuestions':
            const questions = faq.questions || [];
            return (
                <div className="adm-panel anim-fade">
                    <h2 className="adm-h2">FAQ Questions</h2>
                    {questions.map((q, idx) => (
                        <div key={idx} className="adm-card" style={{ marginBottom: '20px' }}>
                            <div className="adm-card-hd"><div className="adm-card-title">Question {idx + 1}</div></div>
                            <div className="adm-fg">
                                <label className="adm-lbl">Question</label>
                                <input className="adm-inp" value={q.question || ''} onChange={e => {
                                    const newQs = [...questions];
                                    newQs[idx] = { ...newQs[idx], question: e.target.value };
                                    update('faqPage', { ...faq, questions: newQs });
                                }} />
                            </div>
                            <div className="adm-fg">
                                <label className="adm-lbl">Answer</label>
                                <textarea className="adm-ta" style={{ minHeight: '80px' }} value={q.answer || ''} onChange={e => {
                                    const newQs = [...questions];
                                    newQs[idx] = { ...newQs[idx], answer: e.target.value };
                                    update('faqPage', { ...faq, questions: newQs });
                                }} />
                            </div>
                            <button className="adm-btn adm-btn-sc" style={{ marginTop: 10 }} onClick={() => {
                                const newQs = questions.filter((_, i) => i !== idx);
                                update('faqPage', { ...faq, questions: newQs });
                            }}>Remove Question</button>
                        </div>
                    ))}
                    <button className="adm-btn adm-btn-pr" onClick={() => {
                        update('faqPage', { ...faq, questions: [...questions, { question: '', answer: '' }] });
                    }}>Add Question</button>
                </div>
            );

        case 'faqRatings':
            const ratings = faq.ratings || { breakdown: [] };
            return (
                <div className="adm-panel anim-fade">
                    <h2 className="adm-h2">Ratings Summary</h2>
                    <div className="adm-card">
                        <div className="adm-card-hd"><div className="adm-card-title">Ratings Config</div></div>
                        <div className="adm-fg">
                            <label className="adm-lbl">Score (Inner Number)</label>
                            <input className="adm-inp" value={ratings.score || ''} onChange={e => update('faqPage', { ...faq, ratings: { ...ratings, score: e.target.value } })} />
                        </div>
                        <div className="adm-fg">
                            <label className="adm-lbl">Total Reviews Count</label>
                            <input className="adm-inp" value={ratings.totalReviews || ''} onChange={e => update('faqPage', { ...faq, ratings: { ...ratings, totalReviews: e.target.value } })} />
                        </div>
                    </div>
                    <h3 className="adm-h2" style={{ marginTop: '20px' }}>Breakdown Percentages</h3>
                    {ratings.breakdown?.map((r, idx) => (
                        <div key={idx} className="adm-card" style={{ marginBottom: '10px' }}>
                            <div className="adm-fg" style={{ margin: 0 }}>
                                <label className="adm-lbl">{r.stars} Stars (%)</label>
                                <input type="number" className="adm-inp" value={r.percentage || 0} onChange={e => {
                                    const newB = [...ratings.breakdown];
                                    newB[idx] = { ...newB[idx], percentage: parseInt(e.target.value) || 0 };
                                    update('faqPage', { ...faq, ratings: { ...ratings, breakdown: newB } });
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            );

        default: return null;
    }
}

// ─── POWERPLAY PANEL ─────────────────────────────────────
const SimpleSection = ({ id, label, isHero = false, pp, sections, updatePP, updateSec, toast }) => {
    const sec = isHero ? (pp.hero || {}) : (sections[id] || {});
    const up = (val) => isHero ? updatePP('hero', val) : updateSec(id, val);

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div className="adm-card-title">{label}</div></div>
            <div className="adm-fg">
                <label className="adm-lbl">Title</label>
                <input className="adm-inp" value={sec.title || ''} onChange={e => up({ ...sec, title: e.target.value })} />
            </div>
            <div className="adm-fg">
                <label className="adm-lbl">Subtitle</label>
                <textarea className="adm-ta" value={sec.subtitle || ''} onChange={e => up({ ...sec, subtitle: e.target.value })} style={{ minHeight: 60 }} />
            </div>
            {sec.hasOwnProperty('description') && (
                <div className="adm-fg">
                    <label className="adm-lbl">Description</label>
                    <textarea className="adm-ta" value={sec.description || ''} onChange={e => up({ ...sec, description: e.target.value })} />
                </div>
            )}
            {sec.hasOwnProperty('footer') && (
                <div className="adm-fg">
                    <label className="adm-lbl">Footer Text</label>
                    <input className="adm-inp" value={sec.footer || ''} onChange={e => up({ ...sec, footer: e.target.value })} />
                </div>
            )}
            {sec.hasOwnProperty('image') && (
                <GenericUploadField label="Image" value={sec.image} onUpload={url => up({ ...sec, image: url })} toast={toast} />
            )}
        </div>
    );
};

function PowerplayPanel({ data, update, section, toast }) {
    const pp = data.powerplayPage || {};
    const sections = pp.sections || {};

    const updatePP = (key, val) => update('powerplayPage', { ...pp, [key]: val });
    const updateSec = (id, val) => update('powerplayPage', { 
        ...pp, 
        sections: { ...sections, [id]: val } 
    });

    const commonProps = { pp, sections, updatePP, updateSec, toast };

    switch (section) {
        case 'ppHero': return <SimpleSection id="hero" label="Hero Section" isHero {...commonProps} />;
        case 'ppSurvive': return <SimpleSection id="survive" label="Survive Banner" {...commonProps} />;
        case 'ppShield': return <SimpleSection id="shield" label="Shield Section" {...commonProps} />;
        case 'ppBlaster': return <SimpleSection id="blaster" label="Blaster Section" {...commonProps} />;
        case 'ppInvisibility': return <SimpleSection id="invisibility" label="Invisibility Section" {...commonProps} />;
        case 'ppRewards': return <SimpleSection id="rewards" label="Rewards Banner" {...commonProps} />;
        case 'ppMagnet': return <SimpleSection id="magnet" label="Magnet Section" {...commonProps} />;
        case 'ppScore': return <SimpleSection id="score" label="Score Multipliers" {...commonProps} />;
        case 'ppMegaCoin': return <SimpleSection id="megaCoin" label="Mega Coin" {...commonProps} />;
        case 'ppBonusZone': return <SimpleSection id="bonusZone" label="Bonus Zone" {...commonProps} />;
        case 'ppJumper': return <SimpleSection id="jumper" label="Jumper" {...commonProps} />;
        case 'ppBonusRoad': return <SimpleSection id="bonusRoad" label="Bonus Road" {...commonProps} />;
        case 'ppChoice': return <SimpleSection id="choice" label="Choice Footer" {...commonProps} />;
        default: return null;
    }
}

// ─── BLOG HERO PANEL ──────────────────────────────────────
function BlogHeroPanel({ data, update }) {
    const slides = data.blogSlides || [];
    const setSlide = (i, key, val) => {
        const s = [...slides];
        s[i] = { ...s[i], [key]: val };
        update('blogSlides', s);
    };

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Hero Slider Slides</div><div className="adm-card-sub">Manage the 4 slides in the blog hero</div></div></div>
            {slides.map((s, i) => (
                <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '15px' }}>
                    <div style={{ fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#00E5FF' }}>Slide {i + 1}</div>
                    <div className="adm-row">
                        <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={s.title} onChange={e => setSlide(i, 'title', e.target.value)} /></div>
                        <div className="adm-fg"><label className="adm-lbl">Highlight (Yellow)</label><input className="adm-inp" value={s.highlight} onChange={e => setSlide(i, 'highlight', e.target.value)} /></div>
                    </div>
                    <div className="adm-fg"><label className="adm-lbl">Subtitle</label><textarea className="adm-ta" value={s.subtitle} onChange={e => setSlide(i, 'subtitle', e.target.value)} style={{ minHeight: 60 }} /></div>
                    <div className="adm-fg"><label className="adm-lbl">Background Image</label><input className="adm-inp" value={s.bg} onChange={e => setSlide(i, 'bg', e.target.value)} /></div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '15px 0' }} />
                </div>
            ))}
        </div>
    );
}

// ─── BLOG DETAIL EDITOR ───────────────────────────────────
function BlogDetailEditor({ item, onSave, onCancel, toast }) {
    const [blocks, setBlocks] = useState(item.content || []);
    const [uploading, setUploading] = useState(false);

    const addBlock = type => {
        if (type === 'paragraph') setBlocks([...blocks, { type, value: '' }]);
        if (type === 'image') setBlocks([...blocks, { type, value: '' }]);
        if (type === 'link') setBlocks([...blocks, { type, text: '', url: '' }]);
    };

    const updateBlock = (i, key, val) => {
        const next = [...blocks];
        next[i] = { ...next[i], [key]: val };
        setBlocks(next);
    };

    const removeBlock = i => setBlocks(blocks.filter((_, idx) => idx !== i));
    const moveBlock = (i, dir) => {
        if ((i === 0 && dir === -1) || (i === blocks.length - 1 && dir === 1)) return;
        const next = [...blocks];
        [next[i], next[i + dir]] = [next[i + dir], next[i]];
        setBlocks(next);
    };

    const handleImageUpload = async (i, file) => {
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const res = await fetch(UPLOAD_API, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = await res.json();
            updateBlock(i, 'value', url);
            toast('Image uploaded!');
        } catch (e) { toast(e.message, 'error'); }
        finally { setUploading(false); }
    };

    return (
        <div className="adm-card editor-overlay">
            <div className="adm-card-hd">
                <div className="adm-card-title">Editing: {item.title}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary btn-sm" onClick={() => onSave(blocks)} disabled={uploading}>Save Content</button>
                    <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            
            <div className="editor-blocks">
                {blocks.map((b, i) => (
                    <div key={i} className="block-item">
                        <div className="block-controls">
                            <button onClick={() => moveBlock(i, -1)} disabled={i === 0}>{I.up}</button>
                            <button onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1}>{I.down}</button>
                            <button className="txt-danger" onClick={() => removeBlock(i)}>{I.trash}</button>
                            <span className="block-badge">{b.type.toUpperCase()}</span>
                        </div>
                        
                        {b.type === 'paragraph' && (
                            <textarea className="adm-ta" placeholder="Enter paragraph text..." value={b.value} onChange={e => updateBlock(i, 'value', e.target.value)} />
                        )}
                        
                        {b.type === 'image' && (
                            <div className="block-img-grid">
                                <div className="adm-fg" style={{ marginBottom: 0 }}>
                                    <input className="adm-inp" value={b.value} onChange={e => updateBlock(i, 'value', e.target.value)} placeholder="Image URL or upload below..." />
                                </div>
                                <input type="file" accept="image/*" onChange={e => handleImageUpload(i, e.target.files[0])} />
                                {b.value && <img src={b.value} className="block-preview" alt="preview" />}
                            </div>
                        )}
                        
                        {b.type === 'link' && (
                            <div className="adm-row" style={{ gap: 10 }}>
                                <div className="adm-fg" style={{ flex: 1, marginBottom: 0 }}>
                                    <input className="adm-inp" value={b.text} onChange={e => updateBlock(i, 'text', e.target.value)} placeholder="Link Text" />
                                </div>
                                <div className="adm-fg" style={{ flex: 2, marginBottom: 0 }}>
                                    <input className="adm-inp" value={b.url} onChange={e => updateBlock(i, 'url', e.target.value)} placeholder="URL (https://...)" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="editor-actions">
                <button className="btn btn-outline btn-sm" onClick={() => addBlock('paragraph')}>{I.plus} Text</button>
                <button className="btn btn-outline btn-sm" onClick={() => addBlock('image')}>{I.plus} Image</button>
                <button className="btn btn-outline btn-sm" onClick={() => addBlock('link')}>{I.plus} Link</button>
            </div>
        </div>
    );
}

// ─── BRIEFINGS PANEL ──────────────────────────────────────
function BriefingsPanel({ data, update, toast }) {
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({ title: '', desc: '', videoLink: '', file: null });
    const [uploading, setUploading] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    const briefings = data.briefings || { title: 'LATEST BRIEFINGS', items: [] };

    const deleteBriefing = id => update('briefings', { ...briefings, items: (briefings.items || []).filter(b => b.id !== id) });

    const handleFile = e => {
        const file = e.target.files[0];
        setForm(f => ({ ...f, file }));
        if (file) setPreview(URL.createObjectURL(file));
    };

    const addBriefing = async () => {
        if (!form.title || !form.desc || !form.file) { toast('Fill all fields and select an image.', 'error'); return; }
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', form.file);
            const res = await fetch(UPLOAD_API, { 
                method: 'POST', 
                headers: { ...getAuthHeader() },
                body: fd 
            });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = await res.json();
            update('briefings', { ...briefings, items: [...(briefings.items || []), { id: Date.now().toString(), title: form.title, desc: form.desc, videoLink: form.videoLink, image: url, content: [] }] });
            setForm({ title: '', desc: '', videoLink: '', file: null });
            setPreview(null);
            toast('Briefing added!');
        } catch (e) { toast(e.message, 'error'); }
        finally { setUploading(false); }
    };

    const saveContent = (id, newContent) => {
        const next = (briefings.items || []).map(b => b.id === id ? { ...b, content: newContent } : b);
        update('briefings', { ...briefings, items: next });
        setEditingContent(null);
        toast('Blog content updated!');
    };

    if (editingContent) {
        return <BlogDetailEditor 
            item={editingContent} 
            onSave={(blocks) => saveContent(editingContent.id, blocks)} 
            onCancel={() => setEditingContent(null)}
            toast={toast}
        />;
    }

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Briefings List</div></div>
                {(briefings.items || []).length === 0 && <p style={{ color: '#8b949e', fontSize: 13 }}>No briefings yet.</p>}
                {(briefings.items || []).map(b => (
                    <div className="art-row" key={b.id}>
                        <img className="art-thumb" src={b.image} alt={b.title} onError={e => e.target.style.display = 'none'} />
                        <div className="art-info">
                            <h4>{b.title}</h4>
                            <p>{(b.desc || '').substring(0, 80)}…</p>
                        </div>
                        <div style={{ display: 'flex', gap: 5 }}>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingContent(b)}>{I.edit} Content</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteBriefing(b.id)}>{I.trash}</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Add New Briefing</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Title (Featured)</label>
                    <input className="adm-inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">List Preview Text</label>
                    <textarea className="adm-ta" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} style={{ minHeight: 60 }} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Video Link (Optional)</label>
                    <input className="adm-inp" value={form.videoLink} onChange={e => setForm(f => ({ ...f, videoLink: e.target.value }))} placeholder="https://youtube.com/..." />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Featured Image</label>
                    <input className="adm-inp" type="file" accept="image/*" onChange={handleFile} />
                    {preview && <img className="img-preview" src={preview} alt="preview" />}
                </div>
                <button className="btn btn-primary" onClick={addBriefing} disabled={uploading}>{I.plus} {uploading ? 'Uploading…' : 'Add Briefing'}</button>
            </div>
        </>
    );
}

// ─── MAIN ADMIN PAGE ──────────────────────────────────────
export default function AdminPage() {
    const [data, setData] = useState({});
    const [activeSection, setActiveSection] = useState('hero');
    const [expandedPages, setExpandedPages] = useState({ global: true, home: true, characters: true });
    const [toasts, setToasts] = useState([]);
    const [lastSaved, setLastSaved] = useState('');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const toast = useCallback((msg, type = 'success') => {
        const id = Date.now();
        setToasts(t => [...t, { id, msg, type }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
    }, []);

    useEffect(() => {
        fetch(API, { headers: getAuthHeader() })
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => { toast('Cannot connect to backend or unauthorized.', 'error'); setLoading(false); });
    }, []);

    const update = useCallback((key, value) => setData(d => ({ ...d, [key]: value })), []);

    const togglePage = id => setExpandedPages(p => ({ ...p, [id]: !p[id] }));

    const saveAll = async () => {
        setSaving(true);
        try {
            const res = await fetch(API, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                }, 
                body: JSON.stringify(data) 
            });
            if (!res.ok) throw new Error('Server error');
            setLastSaved(new Date().toLocaleTimeString());
            toast('✓ Changes saved!');
        } catch (e) {
            toast('Save failed: ' + e.message, 'error');
        } finally { setSaving(false); }
    };

    const renderPanel = () => {
        if (loading) return <p style={{ color: '#8b949e', padding: 20 }}>Loading content…</p>;
        switch (activeSection) {
            case 'hero': return <HeroPanel data={data} update={update} toast={toast} />;
            case 'stats': return <StatsPanel data={data} update={update} />;
            case 'features3d': return <Features3DPanel data={data} update={update} toast={toast} />;
            case 'community': return <CommunityPanel data={data} update={update} toast={toast} />;
            case 'characterSection': return <CharacterSectionPanel data={data} update={update} toast={toast} />;
            case 'charHero': return <CharHeroPanel data={data} update={update} toast={toast} />;
            case 'charList': return <CharListPanel data={data} update={update} toast={toast} />;
            case 'charGroup': return <CharGroupPanel data={data} update={update} toast={toast} />;
            case 'runners': return <RunnersPanel data={data} update={update} />;
            case 'powerups': return <PowerupsPanel data={data} update={update} />;
            case 'gameModes': return <GameModesPanel data={data} update={update} toast={toast} />;
            case 'specialEvents': return <SpecialEventsPanel data={data} update={update} toast={toast} />;
            case 'finalSection': return <FinalSectionPanel data={data} update={update} toast={toast} />;
            case 'testimonials': return <TestimonialsPanel data={data} update={update} toast={toast} />;
            case 'cta': return <CTAPanel data={data} update={update} toast={toast} />;
            case 'explore': return <ExplorePanel data={data} update={update} />;
            case 'navbar': return <BrandingPanel data={data} update={update} toast={toast} />;
            case 'about': return <AboutPanel data={data} update={update} />;
            case 'nav': return <NavPanel data={data} update={update} />;
            case 'blogHero': return <BlogHeroPanel data={data} update={update} />;
            case 'blogBriefings': return <BriefingsPanel data={data} update={update} toast={toast} />;
            case 'contactHero':
            case 'contactForm':
            case 'contactInfo':
            case 'contactSupport':
            case 'contactFaq':
            case 'contactSocials':
            case 'contactAssets':
            case 'contactBg':
            case 'contactResponses':
                return <ContactPanel data={data} update={update} section={activeSection} toast={toast} />;
            case 'mapHero':
            case 'mapHorizontalScroll':
            case 'mapCTA':
                return <MapPanel data={data} update={update} section={activeSection} toast={toast} />;
            case 'ppHero':
            case 'ppSurvive':
            case 'ppShield':
            case 'ppBlaster':
            case 'ppInvisibility':
            case 'ppRewards':
            case 'ppMagnet':
            case 'ppScore':
            case 'ppMegaCoin':
            case 'ppBonusZone':
            case 'ppJumper':
            case 'ppBonusRoad':
            case 'ppChoice':
                return <PowerplayPanel data={data} update={update} section={activeSection} toast={toast} />;
            case 'faqRatings':
                return <FaqPanel data={data} update={update} section={activeSection} toast={toast} />;
            case 'tp_hero':
            case 'tp_responses':
                return <TestimonialsPagePanel data={data} update={update} section={activeSection} toast={toast} />;
            default: return null;
        }
    };

    // Find the human-readable label for the top bar
    const activeSectionLabel = PAGES.flatMap(p => p.sections).find(s => s.id === activeSection)?.label || '';
    const activePageLabel = PAGES.find(p => p.sections.some(s => s.id === activeSection))?.label || '';

    return (
        <>
            <style>{CSS}</style>
            <div className="adm">
                {/* ── SIDEBAR ── */}
                <nav className="adm-sb">
                    <div className="adm-sb-logo">
                        <img src="/assets/Runnerlogo.png" alt="Runner Runner" />
                        <span>Admin Panel</span>
                    </div>

                    <span className="adm-cat-label">Pages</span>

                    {PAGES.map(page => (
                        <div key={page.id}>
                            {/* Page toggle */}
                            <div
                                className={`adm-page-toggle${expandedPages[page.id] ? ' open' : ''}`}
                                onClick={() => togglePage(page.id)}
                            >
                                <div className="adm-page-toggle-left">
                                    {I.pages}
                                    {page.label}
                                </div>
                                {expandedPages[page.id] ? I.chevronDown : I.chevronRight}
                            </div>

                            {/* Section sub-items */}
                            {expandedPages[page.id] && (
                                <div className="adm-section-list">
                                    {page.sections.map(sec => (
                                        <div
                                            key={sec.id}
                                            className={`adm-section-item${activeSection === sec.id ? ' active' : ''}`}
                                            onClick={() => setActiveSection(sec.id)}
                                        >
                                            {I[sec.icon]}
                                            {sec.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="adm-sb-foot">Runner Runner Admin v2.0</div>
                </nav>

                {/* ── MAIN ── */}
                <div className="adm-main">
                    <div className="adm-topbar">
                        <div className="adm-topbar-left">
                            <h1>{activeSectionLabel}</h1>
                            <span>{activePageLabel}</span>
                        </div>
                        <div className="adm-topbar-right">
                            {lastSaved && <span className="saved-txt">Saved {lastSaved}</span>}
                            <button className="btn btn-danger" onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); window.location.href = '/auth'; }}>
                                Logout
                            </button>
                            <button className="btn btn-primary" onClick={saveAll} disabled={saving}>
                                {I.save}&nbsp;{saving ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    <div className="adm-content">
                        {renderPanel()}
                    </div>
                </div>

                <Toast toasts={toasts} />
            </div>
        </>
    );
}
