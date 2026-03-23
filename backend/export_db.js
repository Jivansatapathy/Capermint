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

async function exportDatabase() {
    try {
        console.log('Connecting to MongoDB for export...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        // 1. Export Content
        const contentItems = await Content.find().lean();
        const contentMap = {};
        contentItems.forEach(item => {
            contentMap[item.key] = item.value;
        });
        fs.writeFileSync(path.join(__dirname, 'content.json'), JSON.stringify(contentMap, null, 2));
        console.log('✅ Exported Content to content.json');

        // 2. Export Users
        const users = await User.find().lean();
        fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
        console.log(`✅ Exported ${users.length} Users to users.json`);

        // 3. Export Responses
        const responses = await Response.find().lean();
        fs.writeFileSync(path.join(__dirname, 'responses.json'), JSON.stringify(responses, null, 2));
        console.log(`✅ Exported ${responses.length} Responses to responses.json`);

        // 4. Export Testimonials
        const testimonials = await Testimonial.find().lean();
        fs.writeFileSync(path.join(__dirname, 'testimonials.json'), JSON.stringify(testimonials, null, 2));
        console.log(`✅ Exported ${testimonials.length} Testimonials to testimonials.json`);

        console.log('\nSUCCESS! Database dump completed into JSON files.');
    } catch (err) {
        console.error('Export failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

exportDatabase();
