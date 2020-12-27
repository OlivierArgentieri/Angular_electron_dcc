"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const net = require('net');
class SocketServer {
    constructor() {
        this.mainSocket = io;
        this.client = null;
    }
    startServer() {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });
        // setup socket action
        this.setupAction(io);
        http.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }
    stopServer() {
        if (http == undefined)
            return;
        http.close();
    }
    setupAction(io) {
    }
    newRequest(port, host) {
        return new Promise((res, rej) => {
            this.client = net.Socket();
            this.client.connect(port, host, function () { });
            res(this.client);
            return this.client;
        });
    }
}
exports.default = SocketServer;
//# sourceMappingURL=socketServer.js.map