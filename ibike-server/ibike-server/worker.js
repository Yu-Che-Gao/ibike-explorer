const http = require('http');

http.createServer(function (req, res) {
    console.log('worker go');
    res.writeHead(200);
    res.end("hello world\n");
}).listen(3000);