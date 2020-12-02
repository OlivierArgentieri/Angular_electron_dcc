"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require('net');
var SocketServer = /** @class */ (function () {
    function SocketServer() {
    }
    SocketServer.prototype.test = function () {
        var client = net.Socket();
        client.connect(1111, '127.0.0.1', function () {
            console.log('Connected');
            //client.write('Hello, server! Love, Client.');
            //client.write('import maya.cmds as mc\n mc.polyCube()');
        });
        var command = 'import maya.cmds as cmds\ncmds.polyCube()';
        client.write(command);
    };
    return SocketServer;
}());
exports.default = SocketServer;
/*
app.createServer(function(req, res){
    res.end("Hello from electron app")
}).listen(9000)*/ 
//# sourceMappingURL=server.js.map