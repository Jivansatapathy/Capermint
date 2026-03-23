import 'dotenv/config';
import mongoose from 'mongoose';
import { Content } from './models/Content.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/capermint';

async function check() {
    await mongoose.connect(MONGODB_URI);
    const powerups = await Content.findOne({ key: 'powerups' });
    console.log('Powerups in DB:', JSON.stringify(powerups, null, 2));
    await mongoose.disconnect();
}

check();
