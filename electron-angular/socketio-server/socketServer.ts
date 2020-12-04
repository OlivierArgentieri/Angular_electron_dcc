var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



export default class SocketServer{
    
    mainSocket = io;
    
    constructor() {
    }

    startServer():void {
        app.get('/', (req, res) => {
            res.send('<h1> Server Running </h1>');
        });

        this.setupAction(io);

        

        http.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }

    closeServer():void {
        if(http == undefined) return;
        http.close();
    }

    setupAction(io):void {

    }
}