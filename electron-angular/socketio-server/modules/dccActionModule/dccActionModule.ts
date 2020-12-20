const fs = require('fs');
// config
const config = require('../../config/config.json');


//////////////////////////////////////////
// class to serialize return data in json
/////////////////////////////////////////
class Result {
    actions:Array<string>;
    error:string;
    constructor(){
        this.actions = [];
        this.error= "";
    }
}

/////////////////////////////////////////
// Main class
/////////////////////////////////////////
export class DccActionModule{
    
    public getAll():Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:Result = new Result(); // return object

        fs.readdir(config.pipelineSettings.commonActionsPath, (_err, _files)=>{
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
}