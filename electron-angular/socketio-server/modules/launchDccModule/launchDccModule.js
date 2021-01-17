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
exports.LaunchDccModule = void 0;
var baseModule_1 = require("../base/baseModule");
var settingsModule_1 = require("../settingsModule/settingsModule");
var spawn = require('child_process').spawn;
var LaunchDccModule = /** @class */ (function (_super) {
    __extends(LaunchDccModule, _super);
    function LaunchDccModule() {
        return _super.call(this) || this;
    }
    LaunchDccModule.prototype.launchDcc = function (_dccName) {
        var _dcc = "";
        var _cmd = "";
        switch (_dccName) {
            case "maya":
                _dcc = settingsModule_1.SettingsModule.parsedConfig.dccsPath.maya;
                break;
            case "houdini":
                _dcc = settingsModule_1.SettingsModule.parsedConfig.dccsPath.houdini;
                break;
            case "hython":
                _dcc = settingsModule_1.SettingsModule.parsedConfig.dccsPath.hython;
                break;
            case "mayapy":
                _dcc = settingsModule_1.SettingsModule.parsedConfig.dccsPath.mayapy;
                _cmd = settingsModule_1.SettingsModule.parsedConfig.pipelineSettings.mayapyHandlerPath;
                break;
            default:
                console.log("dcc NotFound ! ");
                return false;
        }
        var _dccOBject = spawn(_dcc, [_cmd], { 'shell': true, detached: true });
        _dccOBject.stdout.on('data', function (data) {
            console.log("stdout: " + data);
        });
        _dccOBject.on('close', function (code) {
            console.log("child process close all stdio with code " + code);
        });
        _dccOBject.on('exit', function (code) {
            console.log("child process exited with code " + code);
        });
    };
    return LaunchDccModule;
}(baseModule_1.BaseModule));
exports.LaunchDccModule = LaunchDccModule;
//# sourceMappingURL=launchDccModule.js.map