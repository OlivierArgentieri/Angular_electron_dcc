const fs = require('fs');
// config
const config = require('../../config/config.json');

import { ActionsResult } from "./models/actionsResult/actionsResult";
import { ActionResult } from "./models/actionResult/actionResult";



/////////////////////////////////////////
// Main class
/////////////////////////////////////////
export class DccActionModule{
    
    // return corresponding action path/dccs
    private getActionPathPerDcc(_dccName):string{
        switch(_dccName){
            
            case "maya": return config.pipelineSettings.mayaActionsPath;
            case "houdini": return config.pipelineSettings.houdiniActionsPath;

            default: 
            
            return config.pipelineSettings.commonActionsPath;
        }
    }

    // get all common action 
    public getAll():Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:ActionsResult = new ActionsResult(); // return object

        fs.readdir(this.getActionPathPerDcc("common"), (_err, _files)=>{
            if (_err) {
                console.log('Unable to scan directory: ' + _err);
                _result.error = _err;
                resolve(JSON.stringify(_result)) // error treated as resolve
                return;
            }

            for (const _file of _files) {
                if(_file.includes("__init__")) continue;
                if(_file.includes(".pyc")) continue;
                if(!_file.includes(".py")) continue;
               
                _result.actions.push(_file.toString().replace(".py", "")); 
            }
            resolve(JSON.stringify(_result)); // return jsonObject
        })
    })}

    
    // return json files of dcc and action
    public getByName(_actionName, _dccName ):Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:ActionResult = new ActionResult(); // return object
        let _baseUri = this.getActionPathPerDcc(_dccName) +`/${_actionName}`
        fs.readdir(_baseUri, (_err, _files)=>{
            if (_err) {
                console.log('Unable to scan directory: ' + _err);
                _result.error = _err;
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
     public runAction(_actionData:ActionResult): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            
            if(!_actionData) reject("null parameters");
            console.log(_actionData);
            var _cmd = _actionData.default_script;
            _cmd += "(" 
            for (let _i = 0; _i < _actionData.params.length; _i++) {
                _cmd += `${_actionData.params[_i].default}`;
        
            if(_i +1< _actionData.params.length) _cmd +=', ';

            }
            _cmd += ")"
            
            resolve(_cmd); // return command
        })
    }
}