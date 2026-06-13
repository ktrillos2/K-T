const https = require('https');

const projectId = 'bc3zxc91';
const dataset = 'production';
const token = 'skt5tTSo7KnKzvLFxZ8OlMQgYgFzimkFk2oH5z9yvogmnlWQtHRYViQKZJ7IwKV0cEs0uWMaJaMJUg5dMSdQ7pozoCjxWM0Tzbm04nWVNv0sNXTlyOBAPaZgBL1sCRacI8U5SJ2MhvJ9FSIOTe4Kk0QXRJiWSxeOfCFDNRNxlp6DeanGILu0';

const data = JSON.stringify({
  mutations: [
    {
      create: {
        _type: 'testimonial',
        name: 'Test Name',
        project: 'Test Project',
        rating: 5,
        content: 'This is a test message',
        role: 'Test Role',
        status: 'pending'
      }
    }
  ]
});

const options = {
  hostname: `${projectId}.api.sanity.io`,
  path: `/v2021-06-07/data/mutate/${dataset}?returnIds=true`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

const req = https.request(options, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', chunks);
  });
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
