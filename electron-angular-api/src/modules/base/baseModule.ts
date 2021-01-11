const net = require('net');
const config = require('../../config/config.json');

export class BaseModule {
    client = null;
    mainConfig = config;
    
    newRequest(_port:number, _host:string): Promise<any> {
        return new Promise<any>((res, rej) => {
            this.client = net.Socket();
            this.client.connect(_port, _host, function () { });
            res(this.client)
            return this.client;
        });
    }
}