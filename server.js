import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const CONTENT_PATH = path.join(__dirname, 'content.json');

// Ensure upload directories exist
const ARTICLES_DIR = path.join(__dirname, 'public', 'assets', 'articles');
const UPLOADS_DIR  = path.join(__dirname, 'public', 'assets', 'uploads');
[ARTICLES_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer for article images
const articleStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ARTICLES_DIR),
    filename:    (req, file, cb) => {
        const u = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, u + '-' + file.originalname);
    },
});
const uploadArticle = multer({ storage: articleStorage });

// Multer for generic uploads (contact images, powerplay images, etc.)
const genericStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename:    (req, file, cb) => {
        const u = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, u + '-' + file.originalname);
    },
});
const uploadGeneric = multer({ storage: genericStorage });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('dist'));

// ── GET content ─────────────────────────────────────────────
app.get('/api/content', (req, res) => {
    fs.readFile(CONTENT_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading content');
        res.json(JSON.parse(data));
    });
});

// ── POST content (merged update) ────────────────────────────
app.post('/api/content', (req, res) => {
    fs.readFile(CONTENT_PATH, 'utf8', (err, data) => {
        let existing = {};
        if (!err) {
            try { existing = JSON.parse(data); } catch(e) {}
        }
        const updated = { ...existing, ...req.body };
        fs.writeFile(CONTENT_PATH, JSON.stringify(updated, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving content');
            res.send('Content updated successfully');
        });
    });
});

// ── Upload article image ─────────────────────────────────────
app.post('/api/upload', uploadArticle.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    res.json({ url: `/assets/articles/${req.file.filename}` });
});

// ── Upload any image (contact, powerplay, etc.) ──────────────
app.post('/api/upload-any', uploadGeneric.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    res.json({ url: `/assets/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
    console.log(`✅  Server running at http://localhost:${PORT}`);
});
