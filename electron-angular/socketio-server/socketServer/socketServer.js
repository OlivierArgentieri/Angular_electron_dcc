"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var net = require('net');
var SocketServer = /** @class */ (function () {
    function SocketServer() {
        this.mainSocket = io;
        this.client = null;
    }
    SocketServer.prototype.startServer = function () {
        app.get('/', function (req, res) {
            res.send('<h1> Server Running </h1>');
        });
        // setup socket action
        this.setupAction(io);
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });
    };
    SocketServer.prototype.stopServer = function () {
        if (http == undefined)
            return;
        http.close();
    };
    SocketServer.prototype.setupAction = function (io) {
    };
    SocketServer.prototype.newRequest = function (port, host) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.client = net.Socket();
            _this.client.connect(port, host, function () { });
            res(_this.client);
            return _this.client;
        });
    };
    return SocketServer;
}());
exports.default = SocketServer;
//# sourceMappingURL=socketServer.js.map