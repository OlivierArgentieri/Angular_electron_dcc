"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccActionModule = void 0;
var fs = require('fs');
// config
var config = require('../../config/config.json');
var actionsResult_1 = require("./models/actionsResult/actionsResult");
var actionResult_1 = require("./models/actionResult/actionResult");
/////////////////////////////////////////
// Main class
/////////////////////////////////////////
var DccActionModule = /** @class */ (function () {
    function DccActionModule() {
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
                for (var _i = 0, _files_1 = _files; _i < _files_1.length; _i++) {
                    var _file = _files_1[_i];
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
                for (var _i = 0, _files_2 = _files; _i < _files_2.length; _i++) {
                    var _file = _files_2[_i];
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    if (!_file.includes(".json"))
                        continue;
                    var _json = JSON.parse(fs.readFileSync(_baseUri + ("/" + _file)));
                    _result = _json;
                    console.log(_result.name);
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    };
    return DccActionModule;
}());
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map