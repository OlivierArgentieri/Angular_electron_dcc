"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require('net'); // to communicate with maya
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var SocketServer = /** @class */ (function () {
    function SocketServer() {
        this.client = null;
        this.client = net.Socket();
    }
    SocketServer.prototype.test = function () {
        /**/ this.client.connect(1111, '127.0.0.1', function () {
            console.log('Connected');
            //client.write('Hello, server! Love, Client.');
            //client.write('import maya.cmds as mc\n mc.polyCube()');
        });
        var command = 'import maya.cmds as cmds\ncmds.polyCube()';
        this.client.write(command);
    };
    SocketServer.prototype.sendMayaCommand = function (command) {
        /*this.client.connect(1111, '127.0.0.1', function() {
             console.log('Connected');
             //client.write('Hello, server! Love, Client.');
             //client.write('import maya.cmds as mc\n mc.polyCube()');
         });*/
        this.client.write(command);
    };
    SocketServer.prototype.startServer = function () {
        var _this = this;
        app.get('/', function (req, res) {
            res.send('<h1>Hello world</h1>');
        });
        io.on('connection', function (socket) {
            console.log('user connected');
            socket.on("mayaCommand", function (command) {
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                _this.client.write(command);
                console.log(command);
            });
        });
        http.listen(3000, function () {
            console.log('listening on *:3000');
        });
    };
    return SocketServer;
}());
exports.default = SocketServer;
//# sourceMappingURL=server.js.map