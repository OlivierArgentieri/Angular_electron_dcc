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
var config = require('../../config/config.json');
var __dirname = process.cwd();
var SettingsModule = /** @class */ (function (_super) {
    __extends(SettingsModule, _super);
    function SettingsModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsModule.getSettings = function () {
        return new Promise(function (resolve, reject) {
            if (!fs.existsSync(__dirname + "/config/config.json")) {
                SettingsModule.parsedConfig = config;
                resolve(config);
                return;
            }
            var _toReturn = JSON.parse(fs.readFileSync(__dirname + "/config/config.json", 'utf8'));
            SettingsModule.parsedConfig = _toReturn;
            resolve(_toReturn);
        });
    };
    SettingsModule.prototype.updateSettings = function (_newSettings) {
        return new Promise(function (resolve, reject) {
            console.log(__dirname);
            // try cast config 
            if (!_newSettings) {
                reject("invalid data");
                return;
            }
            // write file
            fs.writeFileSync(__dirname + "/config/config.json", JSON.stringify(_newSettings));
            resolve("ok");
        });
    };
    SettingsModule.initSettings = function () {
        return new Promise(function (resolve, reject) {
            // check if we have a settings folder
            if (!fs.existsSync(__dirname + "/config")) {
                fs.mkdirSync(__dirname + "/config", 502, function (err) {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                });
            }
            // create a copy of default settings if settings doesnt exist
            if (!fs.existsSync(__dirname + "/config/config.json")) {
                // write file
                fs.writeFileSync(__dirname + "/config/config.json", JSON.stringify(config)); // set default config
            }
            resolve();
        });
    };
    return SettingsModule;
}(baseModule_1.BaseModule));
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settingsModule.js.map