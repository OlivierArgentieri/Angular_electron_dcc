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
var spawn = require('child_process').spawn;
var LaunchDccModule = /** @class */ (function (_super) {
    __extends(LaunchDccModule, _super);
    function LaunchDccModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LaunchDccModule.prototype.launchDcc = function (_dccName) {
        console.log("test");
        var cmd = spawn(this.mainConfig.dccsBatch.houdini, ["C:/Users/olivi/Desktop/test.py"], { 'shell': true, detached: true });
        cmd.stdout.on('data', function (data) {
            console.log("stdout: " + data);
        });
        cmd.on('close', function (code) {
            console.log("child process close all stdio with code " + code);
        });
        cmd.on('exit', function (code) {
            console.log("child process exited with code " + code);
        });
    };
    return LaunchDccModule;
}(baseModule_1.BaseModule));
exports.LaunchDccModule = LaunchDccModule;
//# sourceMappingURL=launchDccModule.js.map