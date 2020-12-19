const fs = require('fs');
// config
const config = require('../../config/config.json');

export class DccActionModule{
    
    public getAll():Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {

        var _toReturn:Array<string> = [];
        fs.readdir(config.pythonSettings.actionsPath, (err, files)=>{
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                //console.log(file); 
                _toReturn.push(file.toString());
                
               
            });
            resolve(_toReturn);
        })
    })}
}