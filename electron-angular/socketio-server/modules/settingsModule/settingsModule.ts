import { BaseModule } from "../base/baseModule";
import { Config } from "./models/settings";
const fs = require('fs');
export class SettingsModule extends BaseModule {

    getSettings() : Promise<string>{
        return new Promise<string>((resolve, reject) => {
            resolve(this.mainConfig)
        });
    }

    updateSettings(_newSettings:Config):Promise<string>{
        return new Promise<string>((resolve, reject) => {

            console.log(_newSettings)
            // try cast config 
            if(!_newSettings) {
                reject("invalid data")
                return;
            }

            // write file
            fs.writeFileSync('D:/Projet/PullGithub/Angular_electron_dcc/electron-angular/socketio-server/config/config.json', JSON.stringify(_newSettings));
            resolve("ok")
        });
    }

}
