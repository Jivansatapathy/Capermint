import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const CONTENT_PATH = path.join(__dirname, 'content.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve assets
app.use(express.static('dist')); // Serve built frontend

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Get content
app.get('/api/content', (req, res) => {
    fs.readFile(CONTENT_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading content');
        }
        res.json(JSON.parse(data));
    });
});

// Update content
app.post('/api/content', (req, res) => {
    const newContent = req.body;
    fs.writeFile(CONTENT_PATH, JSON.stringify(newContent, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving content');
        }
        res.send('Content updated successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
