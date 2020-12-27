import ISocketServer from "./ISocketServer";

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const net = require('net');


export default class SocketServer implements ISocketServer{
    
    mainSocket = io;
    client = null;
    constructor() {
    }

    startServer():void {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });

        // setup socket action
        this.setupAction(io);

        http.listen(3000, () => {
            console.log('listening on *:3000');
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