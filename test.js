const data = JSON.stringify({
  messages: [{ role: 'user', content: 'hello' }]
});

fetch('http://localhost:3000/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: data
}).then(res => res.text()).then(text => console.log('Response:', text)).catch(err => console.error(err));
