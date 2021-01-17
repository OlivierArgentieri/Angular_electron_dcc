import { BaseModule } from "../base/baseModule";
import { Config } from "./models/settings";
const fs = require('fs');


const __dirname = process.cwd();
export class SettingsModule extends BaseModule {

    getSettings() : Promise<string>{
        return new Promise<string>((resolve, reject) => {
            resolve(this.mainConfig)
        });
    }

    updateSettings(_newSettings:Config):Promise<string>{
        return new Promise<string>((resolve, reject) => {

            console.log(__dirname)
            // try cast config 
            if(!_newSettings) {
                reject("invalid data")
                return;
            }
            var test = __dirname;
            
        
            // write file
            fs.writeFileSync(`${__dirname}/socketio-server/config/config.json`, JSON.stringify(_newSettings));
            resolve("ok")
        });
    }

}
