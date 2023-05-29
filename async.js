const http = require('http');
const url = require('url');
const request = require('request');
const async = require('async');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/I/want/title') {
    const addresses = parsedUrl.query.address;

    if (!addresses || !Array.isArray(addresses)) {
      res.statusCode = 400;
      res.end('Invalid address parameter');
      return;
    }

    async.map(addresses, getTitleForAddress, (err, results) => {
      if (err) {
        res.statusCode = 500;
        res.end('An error occurred');
        return;
      }

      const htmlResponse = generateHtmlResponse(results);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(htmlResponse);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

function getTitleForAddress(address, callback) {
  let addr = address;
  if (!address.startsWith('http://') && !address.startsWith('https://')) address = `http://${address}`;
  request.get(address, (err, response, body) => {
    if (err) callback(null, `<li>${addr} - NO RESPONSE</li>`);
    else {
      const title = extractTitleFromHtml(body);
      callback(null, `<li>${addr} - "${title}"</li>`);
    }
  });
}

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
