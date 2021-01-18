import { SettingsModule } from "../modules/settingsModule/settingsModule";
import ISocketServer from "./ISocketServer";

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const config = require('../config/config.json');

const net = require('net');


export default class SocketServer implements ISocketServer{
    
    mainSocket = io;
    client = null;
    mainConfig = config;
    constructor() {
    }

    startServer():void {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });

        // setup socket action
        this.setupAction(io);

        http.listen(SettingsModule.parsedConfig.socketInterpreterSettings.port, () => {
            console.log(`listening on *: ${SettingsModule.parsedConfig.socketInterpreterSettings.port}`);
        });
    }

    stopServer():void {
        if(http == undefined) return;
        http.close();
    }

    setupAction(io):void {
        
    }

    newRequest(port, host): Promise<any>{
       return new Promise<any>((res, rej) => {
            this.client = net.Socket();
            this.client.connect(port, host, function () { });
            res(this.client)
           return this.client;
        });
    }
}