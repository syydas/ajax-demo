const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  // 设置 CORS 的首部字段
  // response.writeHead(200, {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': '*',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  // });

  if (parsedUrl.pathname === '/') {
    fs.readFile('./js/students.json', 'utf8', function(err, content){
      if (err) {
        response.writeHead(400);
        response.end(err);
        return;
      }

      if (request.method === 'GET') {
        response.writeHead(200, {
          'Access-Control-Allow-Origin': '*'
        });
        response.end(content);
      }

      if (request.method === 'POST') {
        response.writeHead(200, {
          'Access-Control-Allow-Origin': '*'
        });
      
        response.end(content);
      }

      if (request.method === 'OPTIONS') {
        response.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        });

        response.end('true');
      }

      response.end('false');

    });
  }
});

// 监听服务器
server.listen(3000, () => {
  console.log('The Server is running at http://localhost:3000')
});