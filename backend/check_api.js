import axios from 'axios';

async function check() {
    try {
        const res = await axios.get('http://localhost:3000/api/content');
        console.log('Powerups from server:', JSON.stringify(res.data.powerups, null, 2));
    } catch (e) {
        console.error('Error fetching from server:', e.message);
    }
}

check();
