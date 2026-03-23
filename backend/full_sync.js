import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import { Content } from './models/Content.js';

async function fullSync() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        // 1. Load JSON
        const content = JSON.parse(fs.readFileSync('content.json', 'utf8'));
        const jsonKeys = Object.keys(content);
        console.log(`Source JSON has ${jsonKeys.length} keys total.`);

        // 2. Clear collection
        await Content.deleteMany({});
        console.log('Cleared existing Content collection.');

        // 3. Re-insert everything
        for (const [key, value] of Object.entries(content)) {
            await Content.create({ key, value });
        }
        console.log(`Successfully migrated all ${jsonKeys.length} keys into MongoDB!`);

        // 4. Verification Check
        const dbItems = await Content.find();
        let totalLen = 0;
        dbItems.forEach(i => totalLen += JSON.stringify(i.value).length);
        console.log(`Final Database Content Size: ${totalLen} characters.`);
        
        const jsonLen = JSON.stringify(content).length;
        console.log(`Original JSON Content Size: ${jsonLen} characters.`);

    } catch (err) {
        console.error('Sync failed:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

fullSync();
