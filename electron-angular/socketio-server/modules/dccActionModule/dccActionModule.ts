const fs = require('fs');
// config
const config = require('../../config/config.json');

class Result {
    files:Array<string>;

    constructor(){
        this.files = [];
    }
}

export class DccActionModule{
    
    public getAll():Promise<string> {
        return new Promise<string>((resolve, reject) => {

        var _result:Result = new Result(); // return object

        fs.readdir(config.pythonSettings.actionsPath, (err, files)=>{
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            files.forEach((file) => {
                _result.files.push(file.toString());
                
            });
            resolve(JSON.stringify(_result)); // return jsonObject
        })
    })}
}