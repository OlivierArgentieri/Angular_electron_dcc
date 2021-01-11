"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccActionModule = void 0;
const fs = require('fs');
// config
const config = require('../../config/config.json');
const actionsResult_1 = require("./models/actionsResult/actionsResult");
const actionResult_1 = require("./models/actionResult/actionResult");
const baseModule_1 = require("../base/baseModule");
/////////////////////////////////////////
// Class to manage all Dcc action 
/////////////////////////////////////////
class DccActionModule extends baseModule_1.BaseModule {
    // return corresponding action path/dccs
    getActionPathPerDcc(_dccName) {
        switch (_dccName) {
            case "maya": return config.pipelineSettings.mayaActionsPath;
            case "houdini": return config.pipelineSettings.houdiniActionsPath;
            default:
                return "NotFound";
        }
    }
    // get all common action 
    getAll(_dccName) {
        return new Promise((resolve, reject) => {
            var _result = new actionsResult_1.ActionsResult(); // return object
            fs.readdir(this.getActionPathPerDcc(_dccName), (_err, _files) => {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = _err;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (const _file of _files) {
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    //if(!_file.includes(".py")) continue
                    _result.actions.push(_file.toString());
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    }
    // return json files of dcc and action
    getByName(_actionName, _dccName) {
        return new Promise((resolve, reject) => {
            var _result = new actionResult_1.ActionResult(); // return object
            var _baseUri = this.getActionPathPerDcc(_dccName);
            if (_baseUri == "NotFound") // not found -> dcc name invalid
             {
                _result.error = `Dcc Not Found / name invalid as '${_dccName}'`;
                resolve(JSON.stringify(_result));
                return;
            }
            _baseUri += `/${_actionName}`;
            fs.readdir(_baseUri, (_err, _files) => {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = `actionName not found on : ${_err.path}`;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (const _file of _files) {
                    if (_file.includes("__init__"))
                        continue;
                    if (_file.includes(".pyc"))
                        continue;
                    if (!_file.includes(".json"))
                        continue;
                    let _json = JSON.parse(fs.readFileSync(_baseUri + `/${_file}`));
                    _result = _json;
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    }
    // create command with ActionReulstObject
    // return formatted command
    runAction(_actionName, _actionData) {
        return new Promise((resolve, reject) => {
            if (!_actionData)
                reject("null parameters");
            var _cmd = `from ${_actionName}.${_actionName} import ${_actionData.entry_point};`; // add corresponding import
            _cmd += _actionData.entry_point;
            _cmd += "(";
            for (let _i = 0; _i < _actionData.params.length; _i++) {
                switch (_actionData.params[_i].type) {
                    case "string":
                        _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`;
                        break;
                    case "int":
                        _cmd += `${_actionData.params[_i].name} = ${_actionData.params[_i].default}`;
                        break;
                    default:
                        _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`;
                        break;
                }
                if (_i + 1 < _actionData.params.length)
                    _cmd += ',';
            }
            _cmd += ")"; // close method call
            this.newRequest(_actionData.port, this.mainConfig.socketInterpreterSettings.host).then((client) => {
                client.write(_cmd);
                client.on('data', (data) => {
                    client.destroy();
                });
            });
            resolve(_cmd); // return command
        });
    }
}
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map