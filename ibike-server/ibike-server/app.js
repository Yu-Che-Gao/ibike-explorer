const port = 3000;
const WebSocketServer = require('websocket').server;
const http = require('http');
const requestHttp = require('request');

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(port, function () {
    console.log((new Date()) + ' server is listening on port ' + port);
});

var serverSocket = new WebSocketServer({
    httpServer: server,
    autoAcceptConnection: false
});

function originIsAllowed(origin) {
    return true;
}

serverSocket.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' connection from origin ' + request.origin + ' rejected');
        return;
    }
    
    let connection = request.accept('get-data', request.origin);
    console.log((new Date()) + ' connection accepted');
    requestHttp('http://ybjson01.youbike.com.tw:1002/gwjs.json', function (error, response, body) {
        console.log((new Date()) + ' request send');
        connection.sendUTF(body);
    });
    
    
    
});