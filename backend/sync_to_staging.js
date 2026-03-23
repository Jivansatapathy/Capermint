import fs from 'fs';
import axios from 'axios';

/**
 * Syncs local backend/content.json to the staging server.
 * Usage: node sync_to_staging.js <ADMIN_TOKEN>
 */

const STAGING_API_URL = 'https://runner-web.staging-server.in/api/content';
const token = process.argv[2];

if (!token) {
    console.error('❌ ERROR: Admin Token is required!');
    console.log('Usage: node sync_to_staging.js YOUR_TOKEN_HERE');
    process.exit(1);
}

const syncData = async () => {
    try {
        console.log('📖 Reading local content.json...');
        const contentPath = './content.json';
        if (!fs.existsSync(contentPath)) {
            throw new Error('content.json not found in the current directory!');
        }
        const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

        console.log(`🚀 Sending ${Object.keys(content).length} keys to ${STAGING_API_URL}...`);
        
        const response = await axios.post(STAGING_API_URL, content, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ SUCCESS!', response.data);
        console.log('\nVerify your site here: https://runner-web.staging-server.in/');
        
    } catch (err) {
        console.error('❌ SYNC FAILED:', err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
            console.log('💡 TIP: Your token might be expired or invalid. Please get a fresh one from the Admin Panel.');
        }
    }
};

syncData();
