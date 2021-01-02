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
exports.DccActionModule = void 0;
var fs = require('fs');
// config
var config = require('../../config/config.json');
var actionsResult_1 = require("./models/actionsResult/actionsResult");
var actionResult_1 = require("./models/actionResult/actionResult");
var baseModule_1 = require("../base/baseModule");
/////////////////////////////////////////
// Class to manage all Dcc action 
/////////////////////////////////////////
var DccActionModule = /** @class */ (function (_super) {
    __extends(DccActionModule, _super);
    function DccActionModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // return corresponding action path/dccs
    DccActionModule.prototype.getActionPathPerDcc = function (_dccName) {
        switch (_dccName) {
            case "maya": return config.pipelineSettings.mayaActionsPath;
            case "houdini": return config.pipelineSettings.houdiniActionsPath;
            default:
                return config.pipelineSettings.commonActionsPath;
        }
    };
    // get all common action 
    DccActionModule.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _result = new actionsResult_1.ActionsResult(); // return object
            fs.readdir(_this.getActionPathPerDcc("common"), function (_err, _files) {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = _err;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (var _a = 0, _files_1 = _files; _a < _files_1.length; _a++) {
                    var _file = _files_1[_a];
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    if (!_file.includes(".py"))
                        continue;
                    _result.actions.push(_file.toString().replace(".py", ""));
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    };
    // return json files of dcc and action
    DccActionModule.prototype.getByName = function (_actionName, _dccName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _result = new actionResult_1.ActionResult(); // return object
            var _baseUri = _this.getActionPathPerDcc(_dccName) + ("/" + _actionName);
            fs.readdir(_baseUri, function (_err, _files) {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = _err;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (var _a = 0, _files_2 = _files; _a < _files_2.length; _a++) {
                    var _file = _files_2[_a];
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    if (!_file.includes(".json"))
                        continue;
                    var _json = JSON.parse(fs.readFileSync(_baseUri + ("/" + _file)));
                    _result = _json;
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    };
    // create command with ActionReulstObject
    // return formatted command
    DccActionModule.prototype.runAction = function (_actionData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(_actionData);
            if (!_actionData)
                reject("null parameters");
            var _cmd = _actionData.default_script;
            _cmd += "(";
            for (var _i = 0; _i < _actionData.params.length; _i++) {
                switch (_actionData.params[_i].type) {
                    case "string":
                        _cmd += " '" + _actionData.params[_i].default + "'";
                        break;
                    case "int":
                        _cmd += "" + _actionData.params[_i].default;
                        break;
                    default:
                        _cmd += " '" + _actionData.params[_i].default + "'";
                        break;
                }
                if (_i + 1 < _actionData.params.length)
                    _cmd += ', ';
            }
            _cmd += ")";
            _this.newRequest(12346, "192.168.1.15").then(function (client) {
                console.log(_cmd);
                client.write(_cmd);
                client.on('data', function (data) {
                    client.destroy();
                });
            });
            resolve(_cmd); // return command
        });
    };
    return DccActionModule;
}(baseModule_1.BaseModule));
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map