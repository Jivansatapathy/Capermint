import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const CONTENT_PATH = path.join(__dirname, 'content.json');
const RESPONSES_PATH = path.join(__dirname, 'responses.json');
const TESTIMONIALS_PATH = path.join(__dirname, 'testimonials.json');
const USERS_PATH = path.join(__dirname, 'users.json');
const JWT_SECRET = 'your-very-secret-key'; // In production, use environment variables

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

// Ensure responses.json exists
if (!fs.existsSync(RESPONSES_PATH)) {
    fs.writeFileSync(RESPONSES_PATH, JSON.stringify([], null, 2));
}

// Ensure testimonials.json exists
if (!fs.existsSync(TESTIMONIALS_PATH)) {
    fs.writeFileSync(TESTIMONIALS_PATH, JSON.stringify([], null, 2));
}

// Ensure users.json exists
if (!fs.existsSync(USERS_PATH)) {
    fs.writeFileSync(USERS_PATH, JSON.stringify([], null, 2));
}

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// ── GET content ─────────────────────────────────────────────
app.get('/api/content', (req, res) => {
    fs.readFile(CONTENT_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading content');
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.status(500).send('Malformed content.json');
        }
    });
});

// ── AUTH ENDPOINTS ──────────────────────────────────────────
app.post('/api/auth/register', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send('Email and password are required');

        const users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
        
        if (users.find(u => u.email === email)) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { id: Date.now().toString(), email, password: hashedPassword, verified: false };
        users.push(newUser);
        
        fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
        res.status(201).send('User registered');
    } catch (e) {
        console.error('Register error:', e);
        res.status(500).send('Error registering user');
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send('Email and password are required');

        const users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
        const user = users.find(u => u.email === email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user: { email: user.email } });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).send('Error logging in');
    }
});

// ── GET responses ───────────────────────────────────────────
app.get('/api/responses', authenticateToken, (req, res) => {
    fs.readFile(RESPONSES_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading responses');
        res.json(JSON.parse(data));
    });
});

// ── DELETE response ─────────────────────────────────────────
app.delete('/api/responses/:id', authenticateToken, (req, res) => {
    fs.readFile(RESPONSES_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error');
        let list = JSON.parse(data);
        list = list.filter(r => r.id !== req.params.id);
        fs.writeFile(RESPONSES_PATH, JSON.stringify(list, null, 2), (err) => {
            if (err) return res.status(500).send('Error');
            res.send('Deleted');
        });
    });
});

// ── POST contact submission ────────────────────────────────
app.post('/api/contact', (req, res) => {
    const submission = { 
        id: Date.now().toString(), 
        date: new Date().toISOString(),
        ...req.body 
    };
    fs.readFile(RESPONSES_PATH, 'utf8', (err, data) => {
        let list = [];
        if (!err) {
            try { list = JSON.parse(data); } catch(e) {}
        }
        list.push(submission);
        fs.writeFile(RESPONSES_PATH, JSON.stringify(list, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving submission');
            res.send('Submission saved');
        });
    });
});

// ── POST content (merged update) ────────────────────────────
app.post('/api/content', authenticateToken, (req, res) => {
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

// ── GET testimonials ──────────────────────────────────────
app.get('/api/get-testimonials', authenticateToken, (req, res) => {
    fs.readFile(TESTIMONIALS_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading testimonials');
        res.json(JSON.parse(data));
    });
});

// ── DELETE testimonial ────────────────────────────────────
app.delete('/api/testimonials/:id', authenticateToken, (req, res) => {
    fs.readFile(TESTIMONIALS_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error');
        let list = JSON.parse(data);
        list = list.filter(r => r.id !== req.params.id);
        fs.writeFile(TESTIMONIALS_PATH, JSON.stringify(list, null, 2), (err) => {
            if (err) return res.status(500).send('Error');
            res.send('Deleted');
        });
    });
});

// ── POST testimonial submission ───────────────────────────
app.post('/api/testimonials', (req, res) => {
    const submission = { 
        id: Date.now().toString(), 
        date: new Date().toISOString(),
        ...req.body 
    };
    fs.readFile(TESTIMONIALS_PATH, 'utf8', (err, data) => {
        let list = [];
        if (!err) {
            try { list = JSON.parse(data); } catch(e) {}
        }
        list.push(submission);
        fs.writeFile(TESTIMONIALS_PATH, JSON.stringify(list, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving testimonial');
            res.status(201).send('Testimonial saved');
        });
    });
});

app.listen(PORT, () => {
    console.log(`✅  Server running at http://localhost:${PORT}`);
});
