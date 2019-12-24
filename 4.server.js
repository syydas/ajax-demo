const http = require('http');
const url = require('url');

// 第一步：接受客户端请求
const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  // 代理服务器，直接和浏览器直接交互，需要设置CORS 的首部字段
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain;charset=utf-8'
  });

  // 第二步：将请求转发给服务器
  if (parsedUrl.pathname === '/') {
    http.get('http://apis.juhe.cn/mobile/get?' + parsedUrl.query, res => {
      var body = '';

      res.on('data', data => {
        body += data;
      })

      res.on('end', () => {
        // console.log('end：' + body);
        response.end(body);
      })
    }).on('error', error => {
      console.log('代理失败:' + e.message)
    });
  }
});

// 监听服务器
server.listen(3000, () => {
  console.log('The proxyServer is running at http://localhost:3000')
});