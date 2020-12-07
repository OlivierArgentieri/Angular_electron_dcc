import SocketServer  from "./socketServer/socketServer";
const net = require('net'); // to communicate with maya

// config
var config = require('./config/config.json');




export default class SocketInterpreter extends SocketServer {

    client = null;
    constructor() {
        super();
        this.client = net.Socket();
     }


     // overriding : for create specific action per DCCs
     setupAction(io){
        io.on('connection', (socket) => {
            this.mainSocket = socket;

            console.log('user connected');
            socket.on("mayaCommand", (command)=> {

                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                //this.client.write(command);
                this.sendMayaCommand(command);
                console.log(command);
            });
        });
     }

     test(){
         // start express server
         this.startServer();


        /**/ this.client.connect(1111, '127.0.0.1', function() {
             console.log('Connected');
             //client.write('Hello, server! Love, Client.');
             //client.write('import maya.cmds as mc\n mc.polyCube()');
         });
         //var command = 'import maya.cmds as cmds\ncmds.polyCube()' 
         //this.client.write(command);
     }


     sendMayaCommand(command) {
        this.client.write(command);
   }
}