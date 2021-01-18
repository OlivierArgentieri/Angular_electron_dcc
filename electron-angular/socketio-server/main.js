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
var launchDccModule_1 = require("./modules/launchDccModule/launchDccModule");
var settingsModule_1 = require("./modules/settingsModule/settingsModule");
var SocketInterpreter = /** @class */ (function (_super) {
    __extends(SocketInterpreter, _super);
    function SocketInterpreter() {
        var _this = _super.call(this) || this;
        // modules
        _this.dccResolver = new dccResolverModule_1.DccResolverModule();
        _this.dccAction = new dccActionModule_1.DccActionModule();
        _this.dccCommand = new dccCommandModule_1.DccCommandModule();
        _this.runDcc = new launchDccModule_1.LaunchDccModule();
        _this.settingsModule = new settingsModule_1.SettingsModule();
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
                settingsModule_1.SettingsModule.getSettings().then(function (_config) {
                    callback(_config);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // update config
            socket.on("updateConfig", function (_newConfig, callback) {
                console.log("ooookk");
                _this.settingsModule.updateSettings(_newConfig).then(function (_result) {
                    callback(_result);
                })
                    .catch(function (_result) {
                    callback(_result);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // get Dcc Actions
            socket.on("getDccActions", function (_dccName, _callback) {
                _this.dccAction.getAll(_dccName).then(function (result) {
                    console.log(result);
                    _callback(result);
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
                if (_actionObject.port > -1) {
                    _this.dccAction.runActionThroughtSocket(_actionObject).then(function (_command) {
                        console.log(_command);
                        _callback("success"); // TODO get back info of exec action
                    })
                        .catch(function (_error) {
                        _callback(_error);
                    });
                    return;
                }
                _this.dccAction.runActionThroughtPython(_actionObject).then(function (_result) {
                    console.log(_result);
                    _callback("success"); // TODO get back info of exec action
                })
                    .catch(function (_error) {
                    _callback(_error);
                });
                // callbackFn is output of this method; called in service of component;
            });
            /**/
            // run action
            socket.on("launchDcc", function (_dccName, _callback) {
                _this.runDcc.launchDcc(_dccName);
                /*
                this.runDcc.Launch(_actionObject).then((_command)=>{
                    console.log(_command)
                    _callback("ok");
                })*/
                // callbackFn is output of this method; called in service of component;
            });
        });
    };
    SocketInterpreter.prototype.main = function () {
        var _this = this;
        // init config structure
        settingsModule_1.SettingsModule.initSettings().then(function (_) {
            console.log("ok init settings");
        });
        settingsModule_1.SettingsModule.getSettings().then(function (_) {
            _this.startServer();
        });
    };
    return SocketInterpreter;
}(socketServer_1.default));
exports.default = SocketInterpreter;
//# sourceMappingURL=main.js.map