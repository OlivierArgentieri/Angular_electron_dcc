"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const net = require('net'); // to communicate with maya
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});
io.on('connection', function (socket) {
    console.log('a user connected');
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
var SocketServer = /** @class */ (function () {
    function SocketServer() {
    }
    SocketServer.prototype.test = function () {
        /*    const client = net.Socket();
            client.connect(1111, '127.0.0.1', function() {
                console.log('Connected');
                //client.write('Hello, server! Love, Client.');
                //client.write('import maya.cmds as mc\n mc.polyCube()');
            });
            var command = 'import maya.cmds as cmds\ncmds.polyCube()'
                client.write(command);*/
    };
    return SocketServer;
}());
exports.default = SocketServer;
//# sourceMappingURL=server.js.map