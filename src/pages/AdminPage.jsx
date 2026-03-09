import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:3000/api/content';
const UPLOAD_API = 'http://localhost:3000/api/upload';

// ─── ICONS ─────────────────────────────────────────────
const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const ArticleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
);
const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0113 0" /></svg>
);
const ZapIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const CompassIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
);
const MenuIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
const SaveIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
);
const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const TrashIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
);

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .adm { display: flex; height: 100vh; overflow: hidden; font-family: 'Inter', -apple-system, sans-serif; font-size: 14px; background: #0d1117; color: #e6edf3; }
  .adm-sidebar { width: 220px; flex-shrink: 0; background: #161b22; border-right: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; }
  .adm-logo { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .adm-logo img { width: 90px; }
  .adm-label { padding: 18px 16px 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #8b949e; }
  .adm-nav-item { display: flex; align-items: center; gap: 9px; padding: 9px 14px; margin: 2px 6px; border-radius: 6px; cursor: pointer; color: #8b949e; font-weight: 500; transition: all 0.15s; user-select: none; }
  .adm-nav-item:hover { background: rgba(255,255,255,0.05); color: #e6edf3; }
  .adm-nav-item.active { background: rgba(0,229,255,0.12); color: #00E5FF; }
  .adm-sidebar-foot { margin-top: auto; padding: 16px; border-top: 1px solid rgba(255,255,255,0.07); font-size: 11px; color: #8b949e; }
  .adm-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .adm-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 28px; border-bottom: 1px solid rgba(255,255,255,0.07); background: #161b22; }
  .adm-topbar h1 { font-size: 16px; font-weight: 700; }
  .adm-topbar-right { display: flex; align-items: center; gap: 12px; }
  .adm-topbar-right span { font-size: 11px; color: #8b949e; }
  .adm-content { flex: 1; overflow-y: auto; padding: 28px; }
  .adm-card { background: #1c2230; border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 22px; margin-bottom: 20px; }
  .adm-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .adm-card-title { font-size: 14px; font-weight: 700; }
  .adm-card-sub { font-size: 11px; color: #8b949e; margin-top: 3px; }
  .adm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .adm-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .adm-fg { margin-bottom: 14px; }
  .adm-label-inp { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #8b949e; margin-bottom: 6px; }
  .adm-inp, .adm-ta { width: 100%; background: #111827; border: 1px solid #30363d; border-radius: 8px; padding: 9px 12px; color: #e6edf3; font-size: 13px; font-family: inherit; transition: border-color 0.15s; }
  .adm-inp:focus, .adm-ta:focus { outline: none; border-color: #00E5FF; }
  .adm-ta { resize: vertical; min-height: 80px; }
  .adm-inp[type="file"] { padding: 7px; cursor: pointer; }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; font-family: inherit; transition: all 0.15s; }
  .btn-primary { background: #00E5FF; color: #000; }
  .btn-primary:hover { background: #00bcd4; }
  .btn-danger { background: rgba(255,71,87,0.12); color: #ff4757; border: 1px solid rgba(255,71,87,0.25); }
  .btn-danger:hover { background: #ff4757; color: #fff; }
  .btn-ghost { background: rgba(255,255,255,0.06); color: #e6edf3; border: 1px solid rgba(255,255,255,0.08); }
  .btn-ghost:hover { background: rgba(255,255,255,0.12); }
  .btn-sm { padding: 5px 10px; font-size: 11px; }
  .article-row { display: flex; gap: 14px; align-items: flex-start; background: #111827; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 14px; margin-bottom: 10px; }
  .article-thumb { width: 88px; height: 58px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .article-info { flex: 1; }
  .article-info h4 { font-size: 12px; font-weight: 700; margin-bottom: 4px; line-height: 1.4; }
  .article-info p { font-size: 11px; color: #8b949e; }
  .list-row { display: flex; gap: 12px; align-items: center; background: #111827; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; }
  .list-row-info { flex-shrink: 0; min-width: 80px; }
  .list-row-info span { font-size: 12px; font-weight: 700; }
  .list-row-info p { font-size: 10px; color: #8b949e; }
  .list-row-fields { flex: 1; display: flex; gap: 8px; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; background: rgba(0,229,255,0.1); color: #00E5FF; }
  .img-preview { width: 110px; height: 70px; border-radius: 8px; object-fit: cover; margin-top: 8px; border: 1px solid rgba(255,255,255,0.08); }
  .divider { border: 0; border-top: 1px solid rgba(255,255,255,0.07); margin: 18px 0; }
  .toast-container { position: fixed; bottom: 24px; right: 24px; display: flex; flex-direction: column; gap: 8px; z-index: 9999; }
  .toast { padding: 12px 18px; border-radius: 10px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px; animation: slideIn 0.25s ease; }
  .toast-success { background: #0d3824; border: 1px solid #2ed573; color: #2ed573; }
  .toast-error { background: #3d1216; border: 1px solid #ff4757; color: #ff4757; }
  @keyframes slideIn { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
`;

// ─── TOAST COMPONENT ─────────────────────────────────────
function Toast({ toasts }) {
    return (
        <div className="toast-container">
            {toasts.map(t => (
                <div key={t.id} className={`toast toast-${t.type}`}>
                    {t.msg}
                </div>
            ))}
        </div>
    );
}

// ─── HERO PANEL ──────────────────────────────────────────
function HeroPanel({ data, update }) {
    return (
        <>
            <div className="adm-card">
                <div className="adm-card-header">
                    <div>
                        <div className="adm-card-title">Hero Section</div>
                        <div className="adm-card-sub">Main headline shown at top of the page</div>
                    </div>
                    <span className="badge">Live</span>
                </div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-label-inp">Title</label>
                        <input className="adm-inp" value={data.hero?.title || ''} onChange={e => update('hero', { ...data.hero, title: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-label-inp">Subtitle</label>
                        <input className="adm-inp" value={data.hero?.subtitle || ''} onChange={e => update('hero', { ...data.hero, subtitle: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-header">
                    <div className="adm-card-title">Explore Section Text</div>
                </div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Title</label>
                    <input className="adm-inp" value={data.explore?.title || ''} onChange={e => update('explore', { ...data.explore, title: e.target.value })} />
                </div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-label-inp">Subtitle</label>
                        <input className="adm-inp" value={data.explore?.subtitle || ''} onChange={e => update('explore', { ...data.explore, subtitle: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-label-inp">Button Text</label>
                        <input className="adm-inp" value={data.explore?.buttonText || ''} onChange={e => update('explore', { ...data.explore, buttonText: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-header">
                    <div className="adm-card-title">Score / Stats</div>
                </div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Score Value</label>
                    <input className="adm-inp" type="number" value={data.score || ''} onChange={e => update('score', e.target.value)} />
                </div>
            </div>
        </>
    );
}

// ─── ARTICLES PANEL ──────────────────────────────────────
function ArticlesPanel({ data, update, toast }) {
    const [imgPreview, setImgPreview] = useState(null);
    const [form, setForm] = useState({ title: '', date: '', desc: '', file: null });
    const [uploading, setUploading] = useState(false);

    const articles = data.articles || { title: '', subtitle: '', items: [] };

    const deleteArticle = (id) => {
        update('articles', { ...articles, items: articles.items.filter(a => a.id !== id) });
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setForm(f => ({ ...f, file }));
        if (file) setImgPreview(URL.createObjectURL(file));
    };

    const addArticle = async () => {
        if (!form.title || !form.date || !form.desc || !form.file) {
            toast('Please fill all fields and select an image.', 'error'); return;
        }
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('image', form.file);
            const res = await fetch(UPLOAD_API, { method: 'POST', body: fd });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = await res.json();
            const newItem = { id: Date.now().toString(), title: form.title, date: form.date, desc: form.desc, image: url, link: '#' };
            update('articles', { ...articles, items: [...articles.items, newItem] });
            setForm({ title: '', date: '', desc: '', file: null });
            setImgPreview(null);
            toast('Article added!');
        } catch (e) {
            toast(e.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Section Header</div></div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-label-inp">Title</label>
                        <input className="adm-inp" value={articles.title} onChange={e => update('articles', { ...articles, title: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-label-inp">Subtitle</label>
                        <input className="adm-inp" value={articles.subtitle} onChange={e => update('articles', { ...articles, subtitle: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-header">
                    <div>
                        <div className="adm-card-title">Articles ({articles.items.length})</div>
                    </div>
                </div>
                {articles.items.length === 0 && <p style={{ color: '#8b949e', fontSize: 13 }}>No articles yet.</p>}
                {articles.items.map(a => (
                    <div className="article-row" key={a.id}>
                        <img className="article-thumb" src={a.image} alt={a.title} onError={e => e.target.style.display = 'none'} />
                        <div className="article-info">
                            <h4>{a.title}</h4>
                            <p>{a.date} · {a.desc.substring(0, 80)}…</p>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteArticle(a.id)}><TrashIcon /> Delete</button>
                    </div>
                ))}
            </div>

            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Add New Article</div></div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-label-inp">Title</label>
                        <input className="adm-inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Ice City Update" />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-label-inp">Date</label>
                        <input className="adm-inp" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. MAR 1, 2026" />
                    </div>
                </div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Description</label>
                    <textarea className="adm-ta" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
                </div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Image</label>
                    <input className="adm-inp" type="file" accept="image/*" onChange={handleFile} />
                    {imgPreview && <img className="img-preview" src={imgPreview} alt="preview" />}
                </div>
                <button className="btn btn-primary" onClick={addArticle} disabled={uploading}>
                    <PlusIcon /> {uploading ? 'Uploading…' : 'Add Article'}
                </button>
            </div>
        </>
    );
}

// ─── RUNNERS PANEL ────────────────────────────────────────
function RunnersPanel({ data, update }) {
    const runners = data.runners || { title: '', subtitle: '', items: [] };

    const updateRunner = (i, key, val) => {
        const items = [...runners.items];
        items[i] = { ...items[i], [key]: val };
        update('runners', { ...runners, items });
    };

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Section Header</div></div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Title</label>
                    <input className="adm-inp" value={runners.title} onChange={e => update('runners', { ...runners, title: e.target.value })} />
                </div>
                <div className="adm-fg">
                    <label className="adm-label-inp">Subtitle</label>
                    <textarea className="adm-ta" value={runners.subtitle} onChange={e => update('runners', { ...runners, subtitle: e.target.value })} />
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Runner Characters</div></div>
                {runners.items.map((r, i) => (
                    <div className="list-row" key={i}>
                        <div className="list-row-info">
                            <img src={r.modelImage} alt={r.name} style={{ width: 40, height: 60, objectFit: 'contain' }} />
                        </div>
                        <div className="list-row-fields">
                            <input className="adm-inp" style={{ maxWidth: 120 }} value={r.name} onChange={e => updateRunner(i, 'name', e.target.value)} placeholder="Name" />
                            <input className="adm-inp" value={r.desc} onChange={e => updateRunner(i, 'desc', e.target.value)} placeholder="Description" />
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

    const updateItem = (i, key, val) => {
        const items = [...powerups.items];
        items[i] = { ...items[i], [key]: val };
        update('powerups', { ...powerups, items });
    };

    return (
        <>
            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Section Header</div></div>
                <div className="adm-row">
                    <div className="adm-fg">
                        <label className="adm-label-inp">Title</label>
                        <input className="adm-inp" value={powerups.title} onChange={e => update('powerups', { ...powerups, title: e.target.value })} />
                    </div>
                    <div className="adm-fg">
                        <label className="adm-label-inp">Subtitle</label>
                        <input className="adm-inp" value={powerups.subtitle} onChange={e => update('powerups', { ...powerups, subtitle: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="adm-card">
                <div className="adm-card-header"><div className="adm-card-title">Powerup Items</div></div>
                {powerups.items.map((p, i) => (
                    <div className="list-row" key={i}>
                        <img src={p.image} alt={p.name} style={{ width: 44, height: 44, objectFit: 'contain', flexShrink: 0 }} />
                        <div className="list-row-fields">
                            <input className="adm-inp" style={{ maxWidth: 120 }} value={p.name} onChange={e => updateItem(i, 'name', e.target.value)} />
                            <input className="adm-inp" value={p.desc} onChange={e => updateItem(i, 'desc', e.target.value)} />
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
    const updateItem = (i, val) => {
        const n = [...nav];
        n[i] = val;
        update('nav', n);
    };

    return (
        <div className="adm-card">
            <div className="adm-card-header">
                <div>
                    <div className="adm-card-title">Navigation Links</div>
                    <div className="adm-card-sub">Labels in the top nav bar</div>
                </div>
            </div>
            {nav.map((n, i) => (
                <div className="list-row" key={i}>
                    <div className="list-row-info"><span>Link {i + 1}</span></div>
                    <input className="adm-inp" value={n} onChange={e => updateItem(i, e.target.value)} />
                </div>
            ))}
        </div>
    );
}

// ─── MAIN ADMIN PAGE ─────────────────────────────────────
const PANELS = [
    { id: 'hero', label: 'Hero Section', icon: <HomeIcon /> },
    { id: 'articles', label: 'Articles', icon: <ArticleIcon /> },
    { id: 'runners', label: 'Runners', icon: <UserIcon /> },
    { id: 'powerups', label: 'Powerups', icon: <ZapIcon /> },
    { id: 'nav', label: 'Navigation', icon: <MenuIcon /> },
];

export default function AdminPage() {
    const [data, setData] = useState({});
    const [activePanel, setActivePanel] = useState('hero');
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
        fetch(API).then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => {
            toast('Could not connect to backend. Is server.js running?', 'error');
            setLoading(false);
        });
    }, []);

    const update = useCallback((key, value) => {
        setData(d => ({ ...d, [key]: value }));
    }, []);

    const saveAll = async () => {
        setSaving(true);
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Server error');
            const now = new Date();
            setLastSaved(`Saved ${now.toLocaleTimeString()}`);
            toast('Changes saved successfully!');
        } catch (e) {
            toast('Failed to save: ' + e.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const panelLabel = PANELS.find(p => p.id === activePanel)?.label || '';

    const renderPanel = () => {
        if (loading) return <p style={{ color: '#8b949e' }}>Loading content…</p>;
        switch (activePanel) {
            case 'hero': return <HeroPanel data={data} update={update} />;
            case 'articles': return <ArticlesPanel data={data} update={update} toast={toast} />;
            case 'runners': return <RunnersPanel data={data} update={update} />;
            case 'powerups': return <PowerupsPanel data={data} update={update} />;
            case 'nav': return <NavPanel data={data} update={update} />;
            default: return null;
        }
    };

    return (
        <>
            <style>{CSS}</style>
            <div className="adm">
                {/* Sidebar */}
                <nav className="adm-sidebar">
                    <div className="adm-logo">
                        <img src="/assets/Runnerlogo.png" alt="Runner Runner" />
                    </div>
                    <span className="adm-label">Content</span>
                    {PANELS.map(p => (
                        <div
                            key={p.id}
                            className={`adm-nav-item${activePanel === p.id ? ' active' : ''}`}
                            onClick={() => setActivePanel(p.id)}
                        >
                            {p.icon}
                            {p.label}
                        </div>
                    ))}
                    <div className="adm-sidebar-foot">
                        Runner Runner Admin v2.0
                    </div>
                </nav>

                {/* Main */}
                <div className="adm-main">
                    <div className="adm-topbar">
                        <h1>{panelLabel}</h1>
                        <div className="adm-topbar-right">
                            {lastSaved && <span>{lastSaved}</span>}
                            <button className="btn btn-primary" onClick={saveAll} disabled={saving}>
                                <SaveIcon />
                                {saving ? 'Saving…' : 'Save Changes'}
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
