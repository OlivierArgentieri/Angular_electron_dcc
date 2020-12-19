const fs = require('fs');
// config
const config = require('../../config/config.json');

export class DccActionModule{
    
    public getAll():Array<string> {
        let _toReturn:string[] = [];
        fs.readdir(config.pythonSettings.actionsPath, (err, files)=>{
            _toReturn.push(files);
        })
        return _toReturn;
    }
}