const fs = require('fs');
// config
const { spawn } = require('child_process');
import { ActionsResult } from "./models/actionsResult/actionsResult";
import { ActionResult } from "./models/actionResult/actionResult";
import { BaseModule } from "../base/baseModule";



/////////////////////////////////////////
// Class to manage all Dcc action 
/////////////////////////////////////////
export class DccActionModule extends BaseModule{
    
    // return corresponding action path/dccs
    private getActionPathPerDcc(_dccName):string{
        switch(_dccName){
            case "maya": return this.mainConfig.pipelineSettings.mayaActionsPath;
            case "houdini": return this.mainConfig.pipelineSettings.houdiniActionsPath;
            case "hython": return this.mainConfig.pipelineSettings.hythonActionsPath;

            default: 
                return "NotFound";
            
        }
    }

    // get all common action 
    public getAll(_dccName):Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:ActionsResult = new ActionsResult(); // return object
            
        fs.readdir(this.getActionPathPerDcc(_dccName), (_err, _files)=>{
            if (_err) {
                console.log('Unable to scan directory: ' + _err);
                _result.error = _err;
                resolve(JSON.stringify(_result)) // error treated as resolve
                return;
            }

            for (const _file of _files) {
                if(_file.includes("__init__")) continue;
                if(_file.includes(".pyc")) continue;
                //if(!_file.includes(".py")) continue
                _result.actions.push(_file.toString()); 
            }
            resolve(JSON.stringify(_result)); // return jsonObject
        })
    })}

    
    // return json files of dcc and action
    public getByName(_actionName, _dccName ):Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:ActionResult = new ActionResult(); // return object
        var _baseUri = this.getActionPathPerDcc(_dccName);

        if(_baseUri == "NotFound") // not found -> dcc name invalid
        {
            _result.error = `Dcc Not Found / name invalid as '${_dccName}'`
            resolve(JSON.stringify(_result));
            return;
        }

        _baseUri += `/${_actionName}`;
        fs.readdir(_baseUri, (_err, _files)=>{
            if (_err) {
                console.log('Unable to scan directory: ' + _err);
                _result.error = `actionName not found on : ${_err.path}`;
                resolve(JSON.stringify(_result)) // error treated as resolve
                return;
            }

            for (const _file of _files) {
                if(_file.includes("__init__")) continue;
                if(_file.includes(".pyc")) continue;
                if(!_file.includes(".json")) continue;
               
                let _json = JSON.parse(fs.readFileSync(_baseUri + `/${_file}`))
                _result =_json as ActionResult; 
            }
            resolve(JSON.stringify(_result)); // return jsonObject
        })
    })}


     // create command with ActionReulstObject
     // return formatted command
     public runActionThroughtSocket(_actionName:string, _actionData:ActionResult): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            
            if(!_actionData) reject("null parameters");
            
            var _cmd = `from ${_actionName}.${_actionName} import ${_actionData.entry_point};`; // add corresponding import
            _cmd += _actionData.entry_point;
            _cmd += "(" 

            for (let _i = 0; _i < _actionData.params.length; _i++) {

                switch(_actionData.params[_i].type)
                {
                    case "string" : _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
                    case "int" : _cmd += `${_actionData.params[_i].name} = ${_actionData.params[_i].default}`;  break;
                    default : _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`;  break;
                }
        
                if(_i +1< _actionData.params.length) _cmd +=',';

            }
            _cmd += ")" // close method call
            
            this.newRequest(_actionData.port, this.mainConfig.socketInterpreterSettings.host).then((client) => {
                
                client.write(_cmd);
                client.on('data', (data) => {
                client.destroy()
                })
            })
            resolve(_cmd); // return command
        })
    }

    public runActionThroughtPython(_actionName:string, _actionData:ActionResult): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            
            if(!_actionData) reject("null parameters");
            
            var _cmd = `from ${_actionName}.${_actionName} import ${_actionData.entry_point};`; // add corresponding import
            _cmd += _actionData.entry_point;
            _cmd += "(" 

            for (let _i = 0; _i < _actionData.params.length; _i++) {

                switch(_actionData.params[_i].type)
                {
                    case "string" : _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`; break;
                    case "int" : _cmd += `${_actionData.params[_i].name} = ${_actionData.params[_i].default}`;  break;
                    default : _cmd += `${_actionData.params[_i].name} = '${_actionData.params[_i].default}'`;  break;
                }
        
                if(_i +1< _actionData.params.length) _cmd +=',';

            }
            _cmd += ")" // close method call
            
            // Write cmd to temporary python file and send this file to cmd
            // same thing for maya ?
            // make method to switch pass python file for each dcc type ?? 
            const _fileName = `${this.mainConfig.tempFolder}`+'/temp_cmd_python.py';
            fs.writeFile(_fileName, _cmd, function (err) {
            if (err){
                reject(`{'error': 'cant write to file ${this.mainConfig.tempFolder}'}`)
                return;
            }

                console.log('File successfully writed');
            });
            var _success = this.SendCommandToDccBatch(_actionData.dcc, _fileName); // todo Promise

            if(_success)
                resolve("ok start with .py"); // return command
            else
                reject("error")
        })
    }


    /*
    *   Send command on dcc throught terminal (for mayabatchs, hython ...)
    *   return: success
    */
    private SendCommandToDccBatch(_dccName, _pythonFilePath) : boolean{
        var _dccBatchPath = "";
        switch(_dccName){
            case "mayabatch": _dccBatchPath = this.mainConfig.dccsBatch.maya;break;
            case "hython": _dccBatchPath = this.mainConfig.dccsBatch.houdini;break;

            default:
                console.log("dcc Batch NotFound ! ") 
                return false;
        
        }

        console.log(`batch path : ${_dccBatchPath}`)
        console.log(`py file path : ${_pythonFilePath}`)
        const _batchDcc = spawn(_dccBatchPath, [_pythonFilePath], {'shell': true, detached:true})

        _batchDcc.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });
          
          _batchDcc.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
          });
          
          _batchDcc.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
          });

          return true;
    }
}