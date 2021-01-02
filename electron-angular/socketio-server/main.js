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
var net = require('net');
// modules
var dccResolverModule_1 = require("./modules/dccResolverModule/dccResolverModule");
var dccActionModule_1 = require("./modules/dccActionModule/dccActionModule");
var dccCommandModule_1 = require("./modules/dccCommandModule/dccCommandModule");
var SocketInterpreter = /** @class */ (function (_super) {
    __extends(SocketInterpreter, _super);
    function SocketInterpreter() {
        var _this = _super.call(this) || this;
        // modules
        _this.dccResolver = new dccResolverModule_1.DccResolverModule();
        _this.dccAction = new dccActionModule_1.DccActionModule();
        _this.dccCommand = new dccCommandModule_1.DccCommandModule();
        _this.client = null;
        return _this;
    }
    // API Part 
    // overriding : for create specific action per DCCs
    SocketInterpreter.prototype.setupAction = function (io) {
        var _this = this;
        io.on('connection', function (socket) {
            _this.mainSocket = socket;
            console.log('user connected');
            // send maya command in plain python
            socket.on("mayaCommand", function (command, callback) {
                console.log("received " + command);
                var _commandObject = JSON.parse(command);
                _this.dccCommand.sendCommand(_commandObject, callback);
            });
            // get all maya open server through socket
            // rename to dcc resolve
            socket.on("mayaResolve", function (callbackFn) {
                _this.dccResolver.main()
                    .then(function (result) {
                    console.log("then result  " + JSON.stringify(result));
                    callbackFn(JSON.stringify(result)); // callbackFn is output of this method; called in service of component;
                });
            });
            // get main config
            socket.on("getConfig", function (callback) {
                callback(_this.mainConfig); // callbackFn is output of this method; called in service of component;
            });
            // get Dcc Actions
            socket.on("getDccActions", function (callback) {
                _this.dccAction.getAll().then(function (result) {
                    console.log(result);
                    callback(result);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // get Dcc Actions by name
            socket.on("getDccActionByName", function (_dccName, _actionName, _callback) {
                _this.dccAction.getByName(_actionName, _dccName).then(function (result) {
                    console.log(result);
                    _callback(result);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // run action
            socket.on("runDccAction", function (_actionData, _callback) {
                var _actionObject = JSON.parse(_actionData);
                _this.dccAction.runAction(_actionObject).then(function (_command) {
                    console.log(_command);
                    _callback("ok");
                });
                // callbackFn is output of this method; called in service of component;
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