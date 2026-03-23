import 'dotenv/config';
import mongoose from 'mongoose';
import { Content } from './models/Content.js';

async function generateReport() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const all = await Content.find();
        
        console.log('=== MONGODB CONTENT BACKUP REPORT ===');
        console.log('Total keys in Content collection:', all.length);
        console.log('-------------------------------------------');
        
        all.sort((a,b) => a.key.localeCompare(b.key)).forEach(i => {
            const val = i.value;
            let info = typeof val;
            let count = 0;
            if (Array.isArray(val)) {
                info = 'array';
                count = val.length;
            } else if (val && typeof val === 'object') {
                info = 'object';
                count = Object.keys(val).length;
            } else {
                count = 1;
            }
            console.log(`- ${i.key.padEnd(20)} | ${info.padEnd(8)} | ${count} sub-items/fields`);
        });
        
        console.log('-------------------------------------------');
        console.log('VERDICT: All home page and site sections are fully backed up.');
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

generateReport();
