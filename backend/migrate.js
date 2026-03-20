import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Content } from './models/Content.js';
import { User } from './models/User.js';
import { Response } from './models/Response.js';
import { Testimonial } from './models/Testimonial.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/capermint';

async function migrate() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        // 1. Migrate Content
        const contentPath = path.join(__dirname, 'content.json');
        if (fs.existsSync(contentPath)) {
            const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
            for (const [key, value] of Object.entries(content)) {
                await Content.findOneAndUpdate(
                    { key },
                    { key, value },
                    { upsert: true, new: true }
                );
            }
            console.log('Content migrated!');
        }

        // 2. Migrate Users
        const usersPath = path.join(__dirname, 'users.json');
        if (fs.existsSync(usersPath)) {
            const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
            for (const u of users) {
                await User.findOneAndUpdate(
                    { email: u.email },
                    { email: u.email, password: u.password, verified: u.verified || false },
                    { upsert: true, new: true }
                );
            }
            console.log('Users migrated!');
        }

        // 3. Migrate Responses
        const responsesPath = path.join(__dirname, 'responses.json');
        if (fs.existsSync(responsesPath)) {
            const list = JSON.parse(fs.readFileSync(responsesPath, 'utf8'));
            for (const r of list) {
                await Response.create({ ...r, date: r.date ? new Date(r.date) : new Date() });
            }
            console.log('Responses migrated!');
        }

        // 4. Migrate Testimonials
        const testimonialsPath = path.join(__dirname, 'testimonials.json');
        if (fs.existsSync(testimonialsPath)) {
            const list = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
            for (const t of list) {
               await Testimonial.create({ ...t, date: t.date ? new Date(t.date) : new Date() });
            }
            console.log('Testimonials migrated!');
        }

        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

migrate();
