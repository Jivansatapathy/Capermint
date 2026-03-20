import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Content } from './models/Content.js';
import { User } from './models/User.js';
import { Response } from './models/Response.js';
import { Testimonial } from './models/Testimonial.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/capermint';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Ensure upload directories exist
const ARTICLES_DIR = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'articles');
const UPLOADS_DIR  = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'uploads');
[ARTICLES_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer configurations remain the same
const articleStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ARTICLES_DIR),
    filename:    (req, file, cb) => {
        const u = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, u + '-' + file.originalname);
    },
});
const uploadArticle = multer({ storage: articleStorage });

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
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

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
app.get('/api/content', async (req, res) => {
    try {
        const contentItems = await Content.find();
        const contentMap = {};
        contentItems.forEach(item => {
            contentMap[item.key] = item.value;
        });
        res.json(contentMap);
    } catch (e) {
        console.error('Error fetching content:', e);
        res.status(500).send('Error reading content');
    }
});

// ── AUTH ENDPOINTS ──────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send('Email and password are required');

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ email, password: hashedPassword, verified: false });
        await newUser.save();
        
        res.status(201).send('User registered');
    } catch (e) {
        console.error('Register error:', e);
        res.status(500).send('Error registering user');
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send('Email and password are required');

        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token, user: { email: user.email } });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).send('Error logging in');
    }
});

// ── GET responses ───────────────────────────────────────────
app.get('/api/responses', authenticateToken, async (req, res) => {
    try {
        const list = await Response.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (e) {
        res.status(500).send('Error reading responses');
    }
});

// ── DELETE response ─────────────────────────────────────────
app.delete('/api/responses/:id', authenticateToken, async (req, res) => {
    try {
        await Response.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (e) {
        res.status(500).send('Error');
    }
});

// ── POST contact submission ────────────────────────────────
app.post('/api/contact', async (req, res) => {
    try {
        const submission = new Response({ ...req.body });
        await submission.save();
        res.send('Submission saved');
    } catch (e) {
        res.status(500).send('Error saving submission');
    }
});

// ── POST content (merged update) ────────────────────────────
app.post('/api/content', authenticateToken, async (req, res) => {
    try {
        const updateData = req.body;
        for (const [key, value] of Object.entries(updateData)) {
            // Update each top-level key
            await Content.findOneAndUpdate(
                { key },
                { key, value },
                { upsert: true, new: true }
            );
        }
        res.send('Content updated successfully');
    } catch (e) {
        console.error('Content update error:', e);
        res.status(500).send('Error saving content');
    }
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
app.get('/api/get-testimonials', authenticateToken, async (req, res) => {
    try {
        const list = await Testimonial.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (e) {
        res.status(500).send('Error reading testimonials');
    }
});

// ── DELETE testimonial ────────────────────────────────────
app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (e) {
        res.status(500).send('Error');
    }
});

// ── POST testimonial submission ───────────────────────────
app.post('/api/testimonials', async (req, res) => {
    try {
        const submission = new Testimonial({ ...req.body });
        await submission.save();
        res.status(201).send('Testimonial saved');
    } catch (e) {
        res.status(500).send('Error saving testimonial');
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
