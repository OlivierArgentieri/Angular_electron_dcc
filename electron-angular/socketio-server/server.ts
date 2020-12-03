const net = require('net'); // to communicate with maya

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


export default class SocketServer{
    
    client = null;
    constructor() {
       this.client = net.Socket();

         
    }

    test(){
       /**/ this.client.connect(1111, '127.0.0.1', function() {
            console.log('Connected');
            //client.write('Hello, server! Love, Client.');
            //client.write('import maya.cmds as mc\n mc.polyCube()');
        });
        var command = 'import maya.cmds as cmds\ncmds.polyCube()' 
        this.client.write(command);
    }

    sendMayaCommand(command){
        /*this.client.connect(1111, '127.0.0.1', function() {
             console.log('Connected');
             //client.write('Hello, server! Love, Client.');
             //client.write('import maya.cmds as mc\n mc.polyCube()');
         });*/ 
         this.client.write(command);
     }

    startServer(){
        app.get('/', (req, res) => {
            res.send('<h1>Hello world</h1>');
        });

        io.on('connection', (socket) => {
            console.log('user connected');
            socket.on("mayaCommand", (command)=>{
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                this.client.write(command);
                console.log(command);
            });
        });

        http.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }
}