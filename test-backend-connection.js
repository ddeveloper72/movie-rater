// Simple script to test backend connectivity
const http = require('http');

function testEndpoint(url, expectedStatus = 200) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            console.log(`${url} - Status: ${res.statusCode}`);
            resolve({
                url,
                status: res.statusCode,
                success: res.statusCode === expectedStatus
            });
        });

        req.on('error', (err) => {
            console.log(`${url} - Error: ${err.message}`);
            resolve({
                url,
                status: null,
                success: false,
                error: err.message
            });
        });

        req.setTimeout(5000, () => {
            req.abort();
            resolve({
                url,
                status: null,
                success: false,
                error: 'Timeout'
            });
        });
    });
}

async function testBackendConnectivity() {
    console.log('Testing backend connectivity...\n');

    const baseUrl = 'http://127.0.0.1:8000';
    const endpoints = [
        `${baseUrl}/`,
        `${baseUrl}/api/movies/`,
        `${baseUrl}/api/users/`,
        `${baseUrl}/auth/`,
        `${baseUrl}/admin/`
    ];

    for (const endpoint of endpoints) {
        await testEndpoint(endpoint);
    }

    console.log('\nTest completed. Make sure your Django backend is running on port 8000.');
}

testBackendConnectivity().catch(console.error);