import SocketServer  from "./socketServer/socketServer";
import DccResolver from "./dccResolver/dccResolver";

const net = require('net'); // to communicate with maya

// config
var config = require('./config/config.json');



export default class SocketInterpreter extends SocketServer {

    dccResolver = new DccResolver();
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


            socket.on("mayaResolve", () => {
                this.dccResolver.main()
                .then((result)=>{
                    //console.log(`then result  ${result.get(1111)}`);
                    console.log(`then result  ${JSON.stringify(result)}`);
                });
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
                //this.client.write(command);
                // this.sendMayaCommand(command);
                //console.log(command);
            });
        });
     }

    main(){
         // start express server
         this.startServer();

         this.client.connect(1111, '127.0.0.1', function() {
             console.log('Connected');
             //client.write('Hello, server! Love, Client.');
             //client.write('import maya.cmds as mc\n mc.polyCube()');
         });
         //var command = 'import maya.cmds as cmds\ncmds.polyCube()' 
         //this.client.write(command);

         // test dcc resolver
         //this.dccResolver.main();
     }


     sendMayaCommand(command) {
        this.client.write(command);
   }
}