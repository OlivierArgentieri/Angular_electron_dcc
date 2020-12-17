"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var socketServer_1 = require("./socketServer/socketServer");
var dccResolver_1 = require("./dccResolver/dccResolver");
//const net = require('net'); // to communicate with maya
// config
var config = require('./config/config.json');
var SocketInterpreter = /** @class */ (function (_super) {
    __extends(SocketInterpreter, _super);
    function SocketInterpreter() {
        var _this = _super.call(this) || this;
        _this.dccResolver = new dccResolver_1.default();
        _this.client = null;
        return _this;
    }
    // overriding : for create specific action per DCCs
    SocketInterpreter.prototype.setupAction = function (io) {
        var _this = this;
        io.on('connection', function (socket) {
            _this.mainSocket = socket;
            console.log('user connected');
            socket.on("mayaCommand", function (command, callback) {
                // todo json request
                // new promise request
                _this.newRequest(12346, '127.0.0.1')
                    .then(function (client) {
                    client.write(command);
                    client.on('data', function (data) {
                        console.log(data.toString());
                        callback(data.toString());
                        client.destroy();
                    });
                });
                //console.log(command);
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
            });
            socket.on("mayaResolve", function (callbackFn) {
                _this.dccResolver.main()
                    .then(function (result) {
                    console.log("then result  " + JSON.stringify(result));
                    callbackFn(JSON.stringify(result)); // callbackFn is output of this method; called in service of component;
                });
            });
        });
    };
    SocketInterpreter.prototype.main = function () {
        // start express server
        this.startServer();
    };
    return SocketInterpreter;
}(socketServer_1.default));
exports.default = SocketInterpreter;
//# sourceMappingURL=main.js.map