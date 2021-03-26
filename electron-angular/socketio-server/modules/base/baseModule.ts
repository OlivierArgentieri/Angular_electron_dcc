import { SettingsModule } from "../settingsModule/settingsModule";

const net = require('net');


export class BaseModule {
    client = null;
    
    newRequest(_port:number, _host:string): Promise<any> {
        return new Promise<any>((res, rej) => {
            this.client = net.Socket();
            this.client.connect(_port, _host, function () { });
            res(this.client)
            return this.client;
        });
    }

}