const fs = require('fs');
// config
const config = require('../../config/config.json');

class Result {
    files:Array<string>;
    error:string;
    constructor(){
        this.files = [];
        this.error= "";
    }
}

export class DccActionModule{
    
    public getAll():Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:Result = new Result(); // return object

        fs.readdir(config.pythonSettings.actionsPath, (_err, _files)=>{
            if (_err) {
                console.log('Unable to scan directory: ' + _err);
                _result.error = _err;
                resolve(JSON.stringify(_result)) // error treated as resolve
                return;
            } 
            for (const _file of _files) {
                if(_file.includes(".pyc")) continue;
                if(_file.includes("__init__")) continue;
                _result.files.push(_file.toString().replace(".py", ""));
            }
            resolve(JSON.stringify(_result)); // return jsonObject
        })
    })}
}