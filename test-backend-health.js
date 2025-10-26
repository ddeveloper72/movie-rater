// Test script to compare local vs production backend
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
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: body,
                    success: res.statusCode >= 200 && res.statusCode < 300
                });
            });
        });

        req.on('error', (err) => {
            resolve({
                error: err.message,
                success: false
            });
        });

        req.setTimeout(5000, () => {
            req.abort();
            resolve({
                error: 'Timeout',
                success: false
            });
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

async function compareBackends() {
    console.log('🔍 Comparing Local vs Production Backend Health...\n');
    
    const backends = [
        {
            name: 'Local Development',
            baseUrl: 'http://127.0.0.1:8000'
        },
        {
            name: 'Heroku Production',
            baseUrl: 'https://ddeveloper72-movie-rater-api.herokuapp.com'
        }
    ];
    
    const testEndpoints = [
        { path: '/', name: 'Root', expectedMethods: ['GET'] },
        { path: '/api/users/', name: 'Users API', expectedMethods: ['GET', 'POST'] },
        { path: '/api/movies/', name: 'Movies API', expectedMethods: ['GET'] },
        { path: '/auth/', name: 'Authentication', expectedMethods: ['POST'] }
    ];
    
    for (const backend of backends) {
        console.log(`\n🏥 Testing ${backend.name} (${backend.baseUrl}):`);
        console.log('='.repeat(50));
        
        for (const endpoint of testEndpoints) {
            const url = backend.baseUrl + endpoint.path;
            
            // Test GET for basic connectivity
            const getResult = await makeRequest(url, 'GET');
            
            let status = '✅';
            let message = `Status: ${getResult.status}`;
            
            if (getResult.error) {
                status = '🔴';
                message = `Error: ${getResult.error}`;
            } else if (getResult.status === 500) {
                status = '🔴';
                message = `Server Error (500)`;
            } else if (getResult.status === 404) {
                status = '🟡';
                message = `Not Found (404)`;
            } else if (getResult.status === 405) {
                status = '🟡';
                message = `Method Not Allowed (405) - Expected for POST-only endpoints`;
            } else if (getResult.status === 401) {
                status = '🟡';
                message = `Unauthorized (401) - Expected for protected endpoints`;
            }
            
            console.log(`${status} ${endpoint.name}: ${message}`);
            
            // Test POST for auth endpoint specifically
            if (endpoint.path === '/auth/') {
                const testCredentials = {
                    username: 'testuser',
                    password: 'testpass'
                };
                
                const postResult = await makeRequest(url, 'POST', testCredentials);
                let authStatus = '✅';
                let authMessage = `POST Status: ${postResult.status}`;
                
                if (postResult.error) {
                    authStatus = '🔴';
                    authMessage = `POST Error: ${postResult.error}`;
                } else if (postResult.status === 500) {
                    authStatus = '🔴';
                    authMessage = `POST Server Error (500)`;
                } else if (postResult.status === 400 || postResult.status === 401) {
                    authStatus = '🟡';
                    authMessage = `POST ${postResult.status} - Expected for invalid credentials`;
                }
                
                console.log(`   ${authStatus} Auth POST: ${authMessage}`);
            }
        }
    }
    
    console.log('\n📋 Summary:');
    console.log('🔴 = Critical Issue (Server Error)');
    console.log('🟡 = Expected Behavior (Auth required, Method not allowed, etc.)');
    console.log('✅ = Working Correctly');
    
    console.log('\n💡 Next Steps:');
    console.log('1. If local backend has 🔴 errors: Check Django server is running');
    console.log('2. If Heroku has 🔴 errors: Check Heroku logs and database');
    console.log('3. If both work: Check CORS configuration');
}

compareBackends().catch(console.error);