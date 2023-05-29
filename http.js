const http = require('http');
const url = require('url');
const request = require('request');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.method === 'GET' && parsedUrl.pathname === '/I/want/title') {
    const addresses = parsedUrl.query.address;

    if (!addresses || !Array.isArray(addresses)) {
      res.statusCode = 400;
      res.end('Invalid address parameter');
      return;
    }

    const results = [];
    let completedRequests = 0;

    addresses.forEach(async (address) => {
      let addr = address;
      if (!address.startsWith('http://') && !address.startsWith('https://')) address = `http://${address}`;
      
      request.get(address, (err, response, body) => {
        if (err) results.push(`<li>${addr} - NO RESPONSE</li>`);
        else {
          const title = extractTitleFromHtml(body);
          results.push(`<li>${addr} - "${title}"</li>`);
        }

        completedRequests++;

        if (completedRequests === addresses.length) {
          const htmlResponse = generateHtmlResponse(results);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(htmlResponse);
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

function extractTitleFromHtml(html) {
  const match = html.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : 'NO RESPONSE';
}

function generateHtmlResponse(results) {
  const items = results.join('\n');
  return `<html>
    <head></head>
    <body>
      <h1>Following are the titles of given websites:</h1>
      <ul>${items}</ul>
    </body>
  </html>`;
}

const port = 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
