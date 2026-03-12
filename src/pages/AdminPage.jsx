import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:3000/api/content';
const UPLOAD_API = 'http://localhost:3000/api/upload';

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
        id: 'home',
        label: 'Home Page',
        sections: [
            { id: 'hero', label: 'Hero & Score', icon: 'layout' },
            { id: 'runners', label: 'Runners', icon: 'user' },
            { id: 'powerups', label: 'Powerups', icon: 'zap' },
            { id: 'explore', label: 'Explore Section', icon: 'image' },
            { id: 'articles', label: 'Articles', icon: 'article' },
            { id: 'nav', label: 'Navigation', icon: 'menu' },
        ],
    },
    {
        id: 'characters',
        label: 'Character Page',
        sections: [
            { id: 'charHero', label: 'Hero Section', icon: 'layout' },
            { id: 'charDetails', label: 'Character Details: Austin', icon: 'user' },
        ],
    },
    {
        id: 'contact',
        label: 'Contact Page',
        sections: [
            { id: 'contactHero', label: 'Hero Section', icon: 'layout' },
            { id: 'contactInfo', label: 'Info Box', icon: 'layout' },
            { id: 'contactSupport', label: 'Support Cards', icon: 'user' },
            { id: 'contactBg', label: 'Background Overlay', icon: 'image' },
        ],
    },
    {
        id: 'powerplay',
        label: 'Powerplay Page',
        sections: [
            { id: 'ppHero', label: 'Hero Section', icon: 'layout' },
            { id: 'ppShield', label: 'Shield Section', icon: 'zap' },
            { id: 'ppBlaster', label: 'Blaster Section', icon: 'zap' },
            { id: 'ppInvisibility', label: 'Invisibility Section', icon: 'zap' },
            { id: 'ppMagnet', label: 'Magnet Section', icon: 'zap' },
            { id: 'ppSurvive', label: 'Survive Banner', icon: 'image' },
            { id: 'ppRewards', label: 'Rewards Banner', icon: 'image' },
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
`;

// ─── TOAST ────────────────────────────────────────────────
function Toast({ toasts }) {
    return (
        <div className="toast-wrap">
            {toasts.map(t => <div key={t.id} className={`toast toast-${t.type}`}>{t.msg}</div>)}
        </div>
    );
}

// ─── HERO PANEL ───────────────────────────────────────────
function HeroPanel({ data, update }) {
    return (
        <>
            <div className="adm-card">
                <div className="adm-card-hd">
                    <div><div className="adm-card-title">Hero Text</div><div className="adm-card-sub">Headline and subtitle at the top of the page</div></div>
                    <span className="badge">Live</span>
                </div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-lbl">Title</label>
                        <input className="adm-inp" value={data.hero?.title || ''} onChange={e => update('hero', { ...data.hero, title: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-lbl">Subtitle</label>
                        <input className="adm-inp" value={data.hero?.subtitle || ''} onChange={e => update('hero', { ...data.hero, subtitle: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Stats / Score</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Score Value</label>
                    <input className="adm-inp" type="number" style={{ maxWidth: 160 }} value={data.score || ''} onChange={e => update('score', e.target.value)} />
                </div>
            </div>
        </>
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

// ─── CHARACTER HERO PANEL ──────────────────────────────────
function CharHeroPanel({ data, update }) {
    const hero = data.charactersPage?.hero || {};
    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Character Hero Section</div><div className="adm-card-sub">Main headline and background image for the Character page</div></div></div>
            <div className="adm-fg">
                <label className="adm-lbl">Title</label>
                <input className="adm-inp" value={hero.title || ''} onChange={e => update('charactersPage', { ...data.charactersPage, hero: { ...hero, title: e.target.value } })} />
            </div>
            <div className="adm-fg">
                <label className="adm-lbl">Subtitle</label>
                <input className="adm-inp" value={hero.subtitle || ''} onChange={e => update('charactersPage', { ...data.charactersPage, hero: { ...hero, subtitle: e.target.value } })} />
            </div>
            <div className="adm-fg">
                <label className="adm-lbl">Background Image URL</label>
                <input className="adm-inp" value={hero.bgImage || ''} onChange={e => update('charactersPage', { ...data.charactersPage, hero: { ...hero, bgImage: e.target.value } })} />
            </div>
        </div>
    );
}

// ─── CHARACTER DETAILS PANEL ──────────────────────────────
function CharDetailsPanel({ data, update }) {
    const details = data.charactersPage?.details || {};
    const setPersonality = (i, val) => {
        const p = [...(details.personality || [])];
        p[i] = val;
        update('charactersPage', { ...data.charactersPage, details: { ...details, personality: p } });
    };

    return (
        <div className="adm-card">
            <div className="adm-card-hd"><div><div className="adm-card-title">Austin Details</div><div className="adm-card-sub">Personality and profile for the character Austin</div></div></div>
            <div className="adm-row">
                <div className="adm-fg"><label className="adm-lbl">Name</label><input className="adm-inp" value={details.characterName || ''} onChange={e => update('charactersPage', { ...data.charactersPage, details: { ...details, characterName: e.target.value } })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Subtext/Roles</label><input className="adm-inp" value={details.characterTitle || ''} onChange={e => update('charactersPage', { ...data.charactersPage, details: { ...details, characterTitle: e.target.value } })} /></div>
            </div>
            <div className="adm-fg"><label className="adm-lbl">Main Quote</label><input className="adm-inp" value={details.mainQuote || ''} onChange={e => update('charactersPage', { ...data.charactersPage, details: { ...details, mainQuote: e.target.value } })} /></div>

            <div className="adm-fg">
                <label className="adm-lbl">Personality Points</label>
                {(details.personality || []).map((p, i) => (
                    <input key={i} className="adm-inp" style={{ marginBottom: 8 }} value={p} onChange={e => setPersonality(i, e.target.value)} />
                ))}
            </div>

            <div className="adm-row">
                <div className="adm-fg"><label className="adm-lbl">Character Image</label><input className="adm-inp" value={details.characterImage || ''} onChange={e => update('charactersPage', { ...data.charactersPage, details: { ...details, characterImage: e.target.value } })} /></div>
                <div className="adm-fg"><label className="adm-lbl">Section BG</label><input className="adm-inp" value={details.sectionBg || ''} onChange={e => update('charactersPage', { ...data.charactersPage, details: { ...details, sectionBg: e.target.value } })} /></div>
            </div>
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
            const res = await fetch('http://localhost:3000/api/upload-any', { method: 'POST', body: fd });
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
function ContactPanel({ data, update, section, toast }) {
    const cp = data.contactPage || {};
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
                <GenericUploadField label="Character Image" value={hero.characterImage} onUpload={url => updateCP('hero', { ...hero, characterImage: url })} toast={toast} />
            </div>
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
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">Support Cards</div></div>
                {support.cards.map((card, i) => (
                    <div key={i} className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <div className="adm-row">
                            <div className="adm-fg"><label className="adm-lbl">Title</label><input className="adm-inp" value={card.title} onChange={e => updateCard(i, 'title', e.target.value)} /></div>
                            <div className="adm-fg"><label className="adm-lbl">Type</label><input className="adm-inp" value={card.type} readOnly /></div>
                        </div>
                        <div className="adm-fg"><label className="adm-lbl">Description</label><textarea className="adm-ta" value={card.desc} onChange={e => updateCard(i, 'desc', e.target.value)} /></div>
                        <GenericUploadField label="Icon" value={card.icon} onUpload={url => updateCard(i, 'icon', url)} toast={toast} />
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '10px 0' }} />
                    </div>
                ))}
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

// ─── POWERPLAY PANEL ─────────────────────────────────────
function PowerplayPanel({ data, update, section, toast }) {
    const pp = data.powerplayPage || {};
    const updatePP = (key, val) => update('powerplayPage', { ...pp, [key]: val });

    const SimpleSection = ({ id, label }) => {
        const sec = pp[id] || {};
        return (
            <div className="adm-card">
                <div className="adm-card-hd"><div className="adm-card-title">{label}</div></div>
                <div className="adm-fg">
                    <label className="adm-lbl">Title</label>
                    <input className="adm-inp" value={sec.title || ''} onChange={e => updatePP(id, { ...sec, title: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-lbl">Subtitle</label>
                    <input className="adm-inp" value={sec.subtitle || ''} onChange={e => updatePP(id, { ...sec, subtitle: e.target.value })} />
                </div>
                {sec.hasOwnProperty('desc') && (
                    <div className="adm-fg">
                        <label className="adm-lbl">Description</label>
                        <textarea className="adm-ta" value={sec.desc || ''} onChange={e => updatePP(id, { ...sec, desc: e.target.value })} />
                    </div>
                )}
                {sec.hasOwnProperty('image') && (
                    <GenericUploadField label="Image" value={sec.image} onUpload={url => updatePP(id, { ...sec, image: url })} toast={toast} />
                )}
            </div>
        );
    };

    if (section === 'ppHero') return <SimpleSection id="hero" label="Hero Section" />;
    if (section === 'ppShield') return <SimpleSection id="shield" label="Shield Section" />;
    if (section === 'ppBlaster') return <SimpleSection id="blaster" label="Blaster Section" />;
    if (section === 'ppInvisibility') return <SimpleSection id="invisibility" label="Invisibility Section" />;
    if (section === 'ppMagnet') return <SimpleSection id="magnet" label="Magnet Section" />;
    if (section === 'ppSurvive') return <SimpleSection id="survive" label="Survive Banner" />;
    return null;
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
            const res = await fetch(UPLOAD_API, { method: 'POST', body: fd });
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
    const [expandedPages, setExpandedPages] = useState({ home: true, characters: true });
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
        fetch(API)
            .then(r => r.json())
            .then(d => { setData(d); setLoading(false); })
            .catch(() => { toast('Cannot connect to backend. Is server.js running?', 'error'); setLoading(false); });
    }, []);

    const update = useCallback((key, value) => setData(d => ({ ...d, [key]: value })), []);

    const togglePage = id => setExpandedPages(p => ({ ...p, [id]: !p[id] }));

    const saveAll = async () => {
        setSaving(true);
        try {
            const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
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
            case 'hero': return <HeroPanel data={data} update={update} />;
            case 'charHero': return <CharHeroPanel data={data} update={update} />;
            case 'charDetails': return <CharDetailsPanel data={data} update={update} />;
            case 'articles': return <ArticlesPanel data={data} update={update} toast={toast} />;
            case 'runners': return <RunnersPanel data={data} update={update} />;
            case 'powerups': return <PowerupsPanel data={data} update={update} />;
            case 'explore': return <ExplorePanel data={data} update={update} />;
            case 'nav': return <NavPanel data={data} update={update} />;
            case 'blogHero': return <BlogHeroPanel data={data} update={update} />;
            case 'blogBriefings': return <BriefingsPanel data={data} update={update} toast={toast} />;
            case 'contactHero':
            case 'contactInfo':
            case 'contactSupport':
            case 'contactBg':
                return <ContactPanel data={data} update={update} section={activeSection} toast={toast} />;
            case 'ppHero':
            case 'ppShield':
            case 'ppBlaster':
            case 'ppInvisibility':
            case 'ppMagnet':
            case 'ppSurvive':
            case 'ppRewards':
                return <PowerplayPanel data={data} update={update} section={activeSection} toast={toast} />;
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
