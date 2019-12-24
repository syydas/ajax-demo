const http = require('http');
const url = require('url');
const fs = require('fs');

// 第一步：接受客户端请求
const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  // 设置 CORS 的首部字段
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain;charset=utf-8'
  });

  if (parsedUrl.pathname === '/') {
    fs.readFile('./js/students.json', 'utf8', function(err, content){
      if (err) {
        response.writeHead(400);
        response.end(err);
        return;
      }
      response.end(content);
    });
  }
  
});

// 监听服务器
server.listen(3000, () => {
  console.log('The Server is running at http://localhost:3000')
});