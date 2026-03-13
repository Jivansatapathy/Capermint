import http from 'http';

const testEndpoint = (path, method = 'GET', data = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body }));
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

async function runTests() {
    try {
        console.log('Testing GET /api/content...');
        console.log(await testEndpoint('/api/content'));

        console.log('\nTesting GET /api/responses...');
        console.log(await testEndpoint('/api/responses'));

        console.log('\nTesting POST /api/contact...');
        console.log(await testEndpoint('/api/contact', 'POST', { name: 'TEST', email: 'test@test.com', message: 'test' }));
    } catch (e) {
        console.error('Test failed:', e);
    }
}

runTests();
