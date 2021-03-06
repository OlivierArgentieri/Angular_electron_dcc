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
var spawn = require('child_process').spawn;
var actionsResult_1 = require("./models/actionsResult/actionsResult");
var actionResult_1 = require("./models/actionResult/actionResult");
var baseModule_1 = require("../base/baseModule");
var genericReturn_1 = require("./models/genericReturn/genericReturn");
var settingsModule_1 = require("../settingsModule/settingsModule");
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
            case "maya": return settingsModule_1.SettingsModule.parsedConfig.pipelineSettings.mayaActionsPath;
            case "houdini": return settingsModule_1.SettingsModule.parsedConfig.pipelineSettings.houdiniActionsPath;
            case "hython": return settingsModule_1.SettingsModule.parsedConfig.pipelineSettings.hythonActionsPath;
            case "mayapy": return settingsModule_1.SettingsModule.parsedConfig.pipelineSettings.mayapyActionsPath;
            default:
                return "NotFound";
        }
    };
    // get all common action 
    DccActionModule.prototype.getAll = function (_dccName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _result = new actionsResult_1.ActionsResult(); // return object
            fs.readdir(_this.getActionPathPerDcc(_dccName), function (_err, _files) {
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
                    _result.actions.push(_file.toString());
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
            var _baseUri = _this.getActionPathPerDcc(_dccName);
            if (_baseUri == "NotFound") // not found -> dcc name invalid
             {
                _result.error = "Dcc Not Found / name invalid as '" + _dccName + "'";
                resolve(JSON.stringify(_result));
                return;
            }
            _baseUri += "/" + _actionName;
            fs.readdir(_baseUri, function (_err, _files) {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = "actionName not found on : " + _err.path;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (var _a = 0, _files_2 = _files; _a < _files_2.length; _a++) {
                    var _file = _files_2[_a];
                    if (!_file.includes(".json"))
                        continue;
                    var _json = JSON.parse(fs.readFileSync(_baseUri + ("/" + _file)));
                    _result = _json;
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    };
    // create command with ActionResultObject
    // return formatted command
    DccActionModule.prototype.runActionThroughtSocket = function (_actionData, _callback) {
        var _this = this;
        if (_callback === void 0) { _callback = undefined; }
        return new Promise(function (resolve, reject) {
            if (!_actionData)
                reject("null parameters");
            // get name of action with directory name, to avoid user to put an error in file name
            var _actionPath = _this.getActionPathPerDcc(_actionData.dcc);
            _this.getActionNameByFolderActionName(_actionPath, _actionData.name).then(function (_realActionName) {
                console.log(_realActionName);
                var _formatedCommand = _this.formatCommand(_actionData, _realActionName);
                if (_formatedCommand.error) {
                    reject(_formatedCommand.error);
                    return;
                }
                _this.newRequest(_actionData.port, settingsModule_1.SettingsModule.parsedConfig.socketInterpreterSettings.host).then(function (client) {
                    client.write(_formatedCommand.value);
                    client.on('data', function (data) {
                        _callback(data.toString());
                        client.destroy();
                    });
                });
                resolve("success"); // return success
            });
        });
    };
    DccActionModule.prototype.runActionThroughtPython = function (_actionData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_actionData)
                reject("null parameters");
            var _cmd = "from " + _actionData.name + "." + _actionData.name + " import " + _actionData.entry_point + ";"; // add corresponding import
            _cmd += _actionData.entry_point;
            _cmd += "(";
            for (var _i = 0; _i < _actionData.params.length; _i++) {
                switch (_actionData.params[_i].type) {
                    case "string":
                        _cmd += _actionData.params[_i].name + " = '" + _actionData.params[_i].default + "'";
                        break;
                    case "int":
                        _cmd += _actionData.params[_i].name + " = " + _actionData.params[_i].default;
                        break;
                    default:
                        _cmd += _actionData.params[_i].name + " = '" + _actionData.params[_i].default + "'";
                        break;
                }
                if (_i + 1 < _actionData.params.length)
                    _cmd += ',';
            }
            _cmd += ")"; // close method call
            // Write cmd to temporary python file and send this file to cmd
            // make method to switch pass python file for each dcc type ?? 
            var _fileName = "" + settingsModule_1.SettingsModule.parsedConfig.tempFolder + '/temp_cmd_python.py';
            fs.writeFile(_fileName, _cmd, function (err) {
                if (err) {
                    reject("{'error': 'cant write to file " + settingsModule_1.SettingsModule.parsedConfig.tempFolder + "'}");
                    return;
                }
                console.log('File successfully writed');
            });
            var _result = _this.sendCommandToDccBatch(_actionData.dcc, _fileName); // todo Promise
            if (_result.error == "")
                resolve("ok start with .py"); // return sucess
            else
                reject(_result.error);
        });
    };
    /*
    *   FormatCommand : Action Data input to formated command
    */
    DccActionModule.prototype.formatCommand = function (_actionData, _realActionName) {
        var _toReturn = new genericReturn_1.GenericReturn();
        if (!_actionData || !_realActionName) {
            _toReturn.error = "Invalid Parameters";
            return _toReturn;
        }
        var _cmd = "from " + _actionData.name + "." + _realActionName + " import " + _actionData.entry_point + ";"; // add corresponding import
        _cmd += "print(";
        _cmd += _actionData.entry_point;
        _cmd += "(";
        for (var _i = 0; _i < _actionData.params.length; _i++) {
            switch (_actionData.params[_i].type) {
                case "string":
                    _cmd += _actionData.params[_i].name + " = '" + _actionData.params[_i].default + "'";
                    break;
                case "int":
                    _cmd += _actionData.params[_i].name + " = " + _actionData.params[_i].default;
                    break;
                default:
                    _cmd += _actionData.params[_i].name + " = '" + _actionData.params[_i].default + "'";
                    break;
            }
            if (_i + 1 < _actionData.params.length)
                _cmd += ',';
        }
        _cmd += "))"; // close method call
        _toReturn.value = _cmd;
        return _toReturn;
    };
    /*
    *   GetActionNameByFolderActionName : to avoid folderActionName == ActionName, if user put different name
    */
    DccActionModule.prototype.getActionNameByFolderActionName = function (_baseActionPath, _folderActionName) {
        return new Promise(function (resolve, reject) {
            fs.readdir(_baseActionPath + "/" + _folderActionName, function (_err, _files) {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    reject("Unable to scan directory");
                }
                for (var _a = 0, _files_3 = _files; _a < _files_3.length; _a++) {
                    var _file = _files_3[_a];
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    // get the first .py file
                    resolve(_file.toString().split('.')[0]);
                }
            });
        });
    };
    /*
    *   Send command on dcc throught terminal (for mayabatchs, hython ...)
    *   return: success
    */
    DccActionModule.prototype.sendCommandToDccBatch = function (_dccName, _pythonFilePath) {
        var _toReturn = new genericReturn_1.GenericReturn();
        var _dccBatchPath = "";
        switch (_dccName) {
            case "mayabatch":
                _dccBatchPath = settingsModule_1.SettingsModule.parsedConfig.dccsPath.maya;
                break;
            case "hython":
                _dccBatchPath = settingsModule_1.SettingsModule.parsedConfig.dccsPath.hython;
                break;
            default:
                console.log("dcc Batch NotFound ! ");
                _toReturn.error = "Dcc batch Not Found !";
                return _toReturn;
        }
        var _batchDcc = spawn(_dccBatchPath, [_pythonFilePath], { 'shell': true, detached: true });
        _batchDcc.stdout.on('data', function (data) {
            console.log("stdout: " + data);
        });
        _batchDcc.on('close', function (code) {
            console.log("child process close all stdio with code " + code);
        });
        _batchDcc.on('exit', function (code) {
            console.log("child process exited with code " + code);
        });
        _toReturn.value = "sucess!";
        return _toReturn;
    };
    return DccActionModule;
}(baseModule_1.BaseModule));
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map