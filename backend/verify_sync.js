import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import { Content } from './models/Content.js';

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const json = JSON.parse(fs.readFileSync('content.json', 'utf8'));
        const dbItems = await Content.find();
        
        const dbMap = {};
        dbItems.forEach(i => dbMap[i.key] = i.value);

        console.log('--- COMPARING JSON vs DB ---');
        let mismatchCount = 0;
        
        Object.keys(json).forEach(k => {
            if (!(k in dbMap)) {
                console.error(`❌ Key missing from DB: ${k}`);
                mismatchCount++;
            } else if (JSON.stringify(json[k]) !== JSON.stringify(dbMap[k])) {
                console.error(`❌ Value mismatch for key: ${k}`);
                mismatchCount++;
            } else {
                console.log(`✅ Key matches: ${k}`);
            }
        });

        if (mismatchCount === 0) {
            console.log('--- ALL DATA PERFECTLY SYNCED! ---');
        } else {
            console.error(`--- FOUND ${mismatchCount} DISCREPANCIES ---`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
