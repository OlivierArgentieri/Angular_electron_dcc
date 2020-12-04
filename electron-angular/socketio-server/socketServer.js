"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SocketServer = /** @class */ (function () {
    function SocketServer() {
        this.mainSocket = io;
    }
    SocketServer.prototype.startServer = function () {
        app.get('/', function (req, res) {
            res.send('<h1> Server Running </h1>');
        });
        this.setupAction(io);
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });
    };
    SocketServer.prototype.closeServer = function () {
        if (http == undefined)
            return;
        http.close();
    };
    SocketServer.prototype.setupAction = function (io) {
    };
    return SocketServer;
}());
exports.default = SocketServer;
//# sourceMappingURL=socketServer.js.map