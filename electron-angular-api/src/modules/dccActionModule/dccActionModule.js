"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccActionModule = void 0;
const fs = require('fs');
// config
const config = require('../../config/config.json');
const actionsResult_1 = require("./models/actionsResult/actionsResult");
const actionResult_1 = require("./models/actionResult/actionResult");
/////////////////////////////////////////
// Main class
/////////////////////////////////////////
class DccActionModule {
    // return corresponding action path/dccs
    getActionPathPerDcc(_dccName) {
        switch (_dccName) {
            case "maya": return config.pipelineSettings.mayaActionsPath;
            case "houdini": return config.pipelineSettings.houdiniActionsPath;
            default:
                return config.pipelineSettings.commonActionsPath;
        }
    }
    // get all common action 
    getAll() {
        return new Promise((resolve, reject) => {
            var _result = new actionsResult_1.ActionsResult(); // return object
            fs.readdir(this.getActionPathPerDcc("common"), (_err, _files) => {
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
                    if (!_file.includes(".py"))
                        continue;
                    _result.actions.push(_file.toString().replace(".py", ""));
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    }
    // return json files of dcc and action
    getByName(_actionName, _dccName) {
        return new Promise((resolve, reject) => {
            var _result = new actionResult_1.ActionResult(); // return object
            let _baseUri = this.getActionPathPerDcc(_dccName) + `/${_actionName}`;
            fs.readdir(_baseUri, (_err, _files) => {
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
                    if (!_file.includes(".json"))
                        continue;
                    let _json = JSON.parse(fs.readFileSync(_baseUri + `/${_file}`));
                    _result = _json;
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    }
}
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map