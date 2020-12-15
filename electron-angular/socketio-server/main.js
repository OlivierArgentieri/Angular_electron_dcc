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
var net = require('net'); // to communicate with maya
// config
var config = require('./config/config.json');
var SocketInterpreter = /** @class */ (function (_super) {
    __extends(SocketInterpreter, _super);
    function SocketInterpreter() {
        var _this = _super.call(this) || this;
        _this.dccResolver = new dccResolver_1.default();
        _this.client = null;
        _this.client = net.Socket();
        return _this;
    }
    // overriding : for create specific action per DCCs
    SocketInterpreter.prototype.setupAction = function (io) {
        var _this = this;
        io.on('connection', function (socket) {
            _this.mainSocket = socket;
            console.log('user connected');
            socket.on("mayaCommand", function (command) {
                new Promise(function (res, rej) {
                    _this.client.connect(12346, '127.0.0.1', function () { });
                    res(true);
                }).then(function () {
                    _this.sendMayaCommand(command);
                    console.log(command);
                });
                //this.client.connect(12346, '127.0.0.1', function() {});
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                //this.client.write(command);
                // this.sendMayaCommand(command);
                //console.log(command);
            });
            socket.on("mayaResolve", function (callbackFn) {
                _this.dccResolver.main()
                    .then(function (result) {
                    //console.log(`then result  ${result.get(1111)}`);
                    console.log("then result  " + JSON.stringify(result));
                    callbackFn(result);
                });
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                //this.client.write(command);
                // this.sendMayaCommand(command);
                //console.log(command);
            });
        });
    };
    SocketInterpreter.prototype.main = function () {
        // start express server
        this.startServer();
        /*
        this.client.connect(12346, '127.0.0.1', function() {
            console.log('Connected');
            //client.write('Hello, server! Love, Client.');
            //client.write('import maya.cmds as mc\n mc.polyCube()');
        });*/
        //var command = 'import maya.cmds as cmds\ncmds.polyCube()' 
        //this.client.write(command);
        // test dcc resolver
        //this.dccResolver.main();
    };
    SocketInterpreter.prototype.sendMayaCommand = function (command) {
        this.client.write(command);
    };
    return SocketInterpreter;
}(socketServer_1.default));
exports.default = SocketInterpreter;
//# sourceMappingURL=main.js.map