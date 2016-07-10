const port = 3000;
const numOfCPUs = require('os').cpus().length;
const WebSocketServer = require('websocket').server;
const requestHttp = require('request');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    var numReqs = 0;
    setInterval(() => {
        console.log('numReqs =', numReqs);
    }, 1000);

    function messageHandler(msg) {
        if (msg.cmd && msg.cmd == 'notifyRequest') {
            numReqs += 1;
        }
    }

    const numCPUs = require('os').cpus().length;
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach((id) => {
        cluster.workers[id].on('message', messageHandler);
    });

} else {
    http.Server((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
        process.send({ cmd: 'notifyRequest' });
    }).listen(8000);
}


// var server = http.createServer(function (request, response) {
//     console.log((new Date()) + ' received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// });

// server.listen(port, function () {
//     console.log((new Date()) + ' server is listening on port ' + port);
// });

// var serverSocket = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnection: false
// });

// serverSocket.on('request', function (request) {
//     if (!originIsAllowed(request.origin)) {
//         request.reject();
//         console.log((new Date()) + ' connection from origin ' + request.origin + ' rejected');
//         return;
//     }

//     let connection = request.accept('get-data', request.origin);
//     console.log((new Date()) + ' connection accepted');

//     if (cluster.isMaster) {
//         // Fork workers.
//             cluster.fork();

//         cluster.on('exit', (worker, code, signal) => {
//             console.log(`worker ${worker.process.pid} died`);
//         });
//     } else {
//         // connection.sendUTF('aaa');
//             // requestHttp('http://ybjson01.youbike.com.tw:1002/gwjs.json', function (error, response, body) {
//             //     console.log((new Date()) + ' request send');
//             //     connection.sendUTF(body);
//             // });
//     }
// });

// function originIsAllowed() {
//     return true;
// }