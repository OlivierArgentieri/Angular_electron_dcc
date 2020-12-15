import ISocketServer from "./ISocketServer";

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



export default class SocketServer implements ISocketServer{
    
    mainSocket = io;
    
    constructor() {
    }

    startServer():void {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });

        // setup socket action
        this.setupAction(io);

        app.post('/fromdcc', (req, res)=>{
            res.send('OK')
    
            console.log(req.body);
        });

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
}