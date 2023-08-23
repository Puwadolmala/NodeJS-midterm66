const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk;
    });
    
    req.on('end', () => {
      try {
        const inputData = JSON.parse(body);
        if (inputData.hasOwnProperty('number')) {
          const inputNumber = inputData.number;
          const result = inputNumber % 2;
          const response = {
            result: result
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response));
        } else {
          res.statusCode = 400;
          res.end('Bad Request: "number" field is missing in the input.');
        }
      } catch (error) {
        res.statusCode = 400;
        res.end('Bad Request: Invalid JSON.');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 8081;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
