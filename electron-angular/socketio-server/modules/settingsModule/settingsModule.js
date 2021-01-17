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
exports.SettingsModule = void 0;
var baseModule_1 = require("../base/baseModule");
var fs = require('fs');
var SettingsModule = /** @class */ (function (_super) {
    __extends(SettingsModule, _super);
    function SettingsModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsModule.prototype.getSettings = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.mainConfig);
        });
    };
    SettingsModule.prototype.updateSettings = function (_newSettings) {
        return new Promise(function (resolve, reject) {
            console.log(_newSettings);
            // try cast config 
            if (!_newSettings) {
                reject("invalid data");
                return;
            }
            // write file
            fs.writeFileSync('D:/Projet/PullGithub/Angular_electron_dcc/electron-angular/socketio-server/config/config.json', JSON.stringify(_newSettings));
            resolve("ok");
        });
    };
    return SettingsModule;
}(baseModule_1.BaseModule));
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settingsModule.js.map