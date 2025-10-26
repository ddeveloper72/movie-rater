// Test script to check authentication endpoints
const https = require('https');
const http = require('http');

function makeRequest(url, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const isHttps = url.startsWith('https://');
        const urlObj = new URL(url);
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (isHttps ? 443 : 80),
            path: urlObj.pathname + urlObj.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        if (data) {
            const jsonData = JSON.stringify(data);
            options.headers['Content-Length'] = Buffer.byteLength(jsonData);
        }

        const lib = isHttps ? https : http;
        const req = lib.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                console.log(`${method} ${url}`);
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${body}`);
                console.log('---\n');
                
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });

        req.on('error', (err) => {
            console.error(`Error: ${err.message}`);
            resolve({
                error: err.message
            });
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

async function testAuthenticationFlow() {
    console.log('Testing Movie Rater Authentication Flow...\n');
    
    const baseUrl = 'https://ddeveloper72-movie-rater-api.herokuapp.com';
    
    // Test 1: Check if endpoints are accessible
    console.log('1. Testing endpoint accessibility...');
    await makeRequest(`${baseUrl}/api/movies/`);
    await makeRequest(`${baseUrl}/api/users/`);
    await makeRequest(`${baseUrl}/auth/`);
    
    // Test 2: Try to register a test user
    console.log('2. Testing user registration...');
    const testUser = {
        username: 'testuser_' + Date.now(),
        password: 'testpassword123'
    };
    
    const registerResult = await makeRequest(`${baseUrl}/api/users/`, 'POST', testUser);
    
    if (registerResult.status === 201) {
        console.log('✅ Registration successful!');
        
        // Test 3: Try to login with the same credentials
        console.log('3. Testing login with registered credentials...');
        const loginResult = await makeRequest(`${baseUrl}/auth/`, 'POST', testUser);
        
        if (loginResult.status === 200) {
            console.log('✅ Login successful!');
            
            try {
                const loginData = JSON.parse(loginResult.body);
                if (loginData.token) {
                    console.log('✅ Token received in login response');
                } else {
                    console.log('❌ No token in login response');
                    console.log('Login response structure:', loginData);
                }
            } catch (e) {
                console.log('❌ Could not parse login response as JSON');
            }
        } else {
            console.log('❌ Login failed after registration');
            console.log('Status:', loginResult.status);
            console.log('Response:', loginResult.body);
        }
    } else {
        console.log('❌ Registration failed');
        console.log('Status:', registerResult.status);
        console.log('Response:', registerResult.body);
    }
}

testAuthenticationFlow().catch(console.error);