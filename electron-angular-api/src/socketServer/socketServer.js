"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('../config/config.json');
const net = require('net');
class SocketServer {
    constructor() {
        this.mainSocket = io;
        this.client = null;
        this.mainConfig = config;
    }
    startServer() {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });
        // setup socket action
        this.setupAction(io);
        http.listen(config.socketInterpreterSettings.port, () => {
            console.log(`listening on *: ${config.socketInterpreterSettings.port}`);
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