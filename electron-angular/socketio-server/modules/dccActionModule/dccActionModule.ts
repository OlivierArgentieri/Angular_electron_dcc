const fs = require('fs');
// config
const { spawn } = require('child_process');
import { ActionsResult } from "./models/actionsResult/actionsResult";
import { ActionResult } from "./models/actionResult/actionResult";
import { BaseModule } from "../base/baseModule";
import { GenericReturn } from "./models/genericReturn/genericReturn";



/////////////////////////////////////////
// Class to manage all Dcc action 
/////////////////////////////////////////
export class DccActionModule extends BaseModule {

    // return corresponding action path/dccs
    private getActionPathPerDcc(_dccName): string {
        switch (_dccName) {
            case "maya": return this.mainConfig.pipelineSettings.mayaActionsPath;
            case "houdini": return this.mainConfig.pipelineSettings.houdiniActionsPath;
            case "hython": return this.mainConfig.pipelineSettings.hythonActionsPath;

            default:
                return "NotFound";

        }
    }

    // get all common action 
    public getAll(_dccName): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            var _result: ActionsResult = new ActionsResult(); // return object

            fs.readdir(this.getActionPathPerDcc(_dccName), (_err, _files) => {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = _err;
                    resolve(JSON.stringify(_result)) // error treated as resolve
                    return;
                }

                for (const _file of _files) {
                    if (_file.includes("__init__")) continue;
                    if (_file.includes(".pyc")) continue;
                    _result.actions.push(_file.toString());
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            })
        })
    }


    // return json files of dcc and action
    public getByName(_actionName, _dccName): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            var _result: ActionResult = new ActionResult(); // return object
            var _baseUri = this.getActionPathPerDcc(_dccName);

            if (_baseUri == "NotFound") // not found -> dcc name invalid
            {
                _result.error = `Dcc Not Found / name invalid as '${_dccName}'`
                resolve(JSON.stringify(_result));
                return;
            }

            _baseUri += `/${_actionName}`;
            fs.readdir(_baseUri, (_err, _files) => {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = `actionName not found on : ${_err.path}`;
                    resolve(JSON.stringify(_result)) // error treated as resolve
                    return;
                }

                for (const _file of _files) {
                    if (!_file.includes(".json")) continue;

                    let _json = JSON.parse(fs.readFileSync(_baseUri + `/${_file}`))
                    _result = _json as ActionResult;
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            })
        })
    }


    // create command with ActionReulstObject
    // return formatted command
    public runActionThroughtSocket(_actionData: ActionResult): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            if (!_actionData) reject("null parameters");

            // get name of action with directory name, to avoid user to put an error in file name
            var _actionPath: string = this.getActionPathPerDcc(_actionData.dcc);
            this.getActionNameByFolderActionName(_actionPath, _actionData.name).then((_realActionName) => {
                console.log(_realActionName);

                var _formatedCommand: GenericReturn = this.formatCommand(_actionData, _realActionName);
                if (_formatedCommand.error) {
                    reject(_formatedCommand.error);
                    return;
                }

                this.newRequest(_actionData.port, this.mainConfig.socketInterpreterSettings.host).then((client) => {

                    client.write(_formatedCommand.value);
                    client.on('data', (data) => {
                        client.destroy()
                    })
                })
                resolve("success"); // return success
            })
        })
    }

    public runActionThroughtPython(_actionData: ActionResult): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            if (!_actionData) reject("null parameters");

            var _cmd = `from ${_actionData.name}.${_actionData.name} import ${_actionData.entry_point};`; // add corresponding import
            _cmd += _actionData.entry_point;
            _cmd += "("

            for (let _i = 0; _i < _actionData.params.length; _i++) {

                switch (_actionData.params[_i].type) {
                    case "string": _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
                    case "int": _cmd += `${_actionData.params[_i].name} = ${_actionData.params[_i].default}`; break;
                    default: _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
                }

                if (_i + 1 < _actionData.params.length) _cmd += ',';

            }
            _cmd += ")" // close method call

            // Write cmd to temporary python file and send this file to cmd
            // make method to switch pass python file for each dcc type ?? 
            const _fileName = `${this.mainConfig.tempFolder}` + '/temp_cmd_python.py';
            fs.writeFile(_fileName, _cmd, function (err) {
                if (err) {
                    reject(`{'error': 'cant write to file ${this.mainConfig.tempFolder}'}`)
                    return;
                }

                console.log('File successfully writed');
            });
            var _result: GenericReturn = this.sendCommandToDccBatch(_actionData.dcc, _fileName); // todo Promise

            if (_result.error == "")
                resolve("ok start with .py"); // return sucess
            else
                reject(_result.error)
        })
    }


    /*
    *   FormatCommand : Action Data input to fomated command
    */
    private formatCommand(_actionData: ActionResult, _realActionName: string): GenericReturn {
        var _toReturn: GenericReturn = new GenericReturn();

        if (!_actionData || !_realActionName) {
            _toReturn.error = "Invalid Parameters";
            return _toReturn;
        }

        var _cmd = `from ${_actionData.name}.${_realActionName} import ${_actionData.entry_point};`; // add corresponding import
        _cmd += _actionData.entry_point;
        _cmd += "("

        for (let _i = 0; _i < _actionData.params.length; _i++) {

            switch (_actionData.params[_i].type) {
                case "string": _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
                case "int": _cmd += `${_actionData.params[_i].name} = ${_actionData.params[_i].default}`; break;
                default: _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
            }

            if (_i + 1 < _actionData.params.length) _cmd += ',';

        }
        _cmd += ")" // close method call
        _toReturn.value = _cmd;

        return _toReturn;
    }

    /*
    *   GetActionNameByFolderActionName : to avoid folderActionName == ActionName, if user put different name
    */
    private getActionNameByFolderActionName(_baseActionPath: string, _folderActionName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {


            fs.readdir(`${_baseActionPath}/${_folderActionName}`, (_err, _files) => {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    reject("Unable to scan directory");

                }

                for (const _file of _files) {
                    if (_file.includes("__init__")) continue;
                    if (_file.includes(".pyc")) continue;

                    // get the first .py file
                    resolve(_file.toString().split('.')[0])
                }
            })
        })
    }

    /*
    *   Send command on dcc throught terminal (for mayabatchs, hython ...)
    *   return: success
    */
    private sendCommandToDccBatch(_dccName, _pythonFilePath): GenericReturn {
        var _toReturn: GenericReturn = new GenericReturn()
        var _dccBatchPath = "";
        switch (_dccName) {
            case "mayabatch": _dccBatchPath = this.mainConfig.dccsPath.maya; break;
            case "hython": _dccBatchPath = this.mainConfig.dccsPath.hython; break;

            default:
                console.log("dcc Batch NotFound ! ")
                _toReturn.error = "Dcc batch Not Found !";
                return _toReturn;
        }

        const _batchDcc = spawn(_dccBatchPath, [_pythonFilePath], { 'shell': true, detached: true })

        _batchDcc.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        _batchDcc.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });

        _batchDcc.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        _toReturn.value = "sucess!";
        return _toReturn;
    }
}