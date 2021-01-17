import { BaseModule } from "../base/baseModule";
import { Config } from "./models/settings";
const fs = require('fs');
const config = require('../../config/config.json');

const __dirname = process.cwd();
export class SettingsModule extends BaseModule {

    public static parsedConfig:Config;
    static getSettings(): Promise<Config> {
        return new Promise<Config>((resolve, reject) => {
            if (!fs.existsSync(`${__dirname}/config/config.json`)) {
                SettingsModule.parsedConfig = config;
                resolve(config)
                return
            }

            var _toReturn: Config = JSON.parse(fs.readFileSync(`${__dirname}/config/config.json`, 'utf8'));
            SettingsModule.parsedConfig = _toReturn;
            resolve(_toReturn)
        })
    }

    updateSettings(_newSettings: Config): Promise<string> {
        return new Promise<string>((resolve, reject) => {

            console.log(__dirname)
            // try cast config 
            if (!_newSettings) {
                reject("invalid data")
                return;
            }

            // write file
            fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(_newSettings));
            resolve("ok")
        });
    }

    static initSettings(): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            // check if we have a settings folder
            if (!fs.existsSync(`${__dirname}/config`)) {
                fs.mkdirSync(`${__dirname}/config`, 0o766, function (err) {
                    if (err) {
                        console.log(err);
                        reject()
                    }
                });
            }

            // create a copy of default settings if settings doesnt exist
            if (!fs.existsSync(`${__dirname}/config/config.json`)) {
                // write file
                fs.writeFileSync(`${__dirname}/config/config.json`, JSON.stringify(config)); // set default config
            }

            resolve()
        })
    }

}
