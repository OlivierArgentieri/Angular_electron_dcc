import DccCommandData from "./models/commandData"
const net = require('net');

export class DccCommandModule {

    client = null;

    newRequest(_port:number, _host:string): Promise<any> {
        return new Promise<any>((res, rej) => {
            this.client = net.Socket();
            this.client.connect(_port, _host, function () { });
            res(this.client)
            return this.client;
        });
    }

    sendCommand(_commandData:DccCommandData, callback = undefined) {
        if(!_commandData) return
        this.newRequest(_commandData.port, _commandData.host)
        .then((client) => {
            client.write(_commandData.command);
            client.on('data', (data) => {
               if (callback)
                    callback(data.toString());
                client.destroy()
            })
        })
    }
}