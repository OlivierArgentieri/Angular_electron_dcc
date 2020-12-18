import SocketServer from "./socketServer/socketServer";
import DccResolver from "./dccResolver/dccResolver";

//const net = require('net'); // to communicate with maya

// config
var config = require('./config/config.json');



export default class SocketInterpreter extends SocketServer {

    dccResolver = new DccResolver();
    client = null;
    constructor() {
        super();
    }


    // overriding : for create specific action per DCCs
    setupAction(io) {
        io.on('connection', (socket) => {
            this.mainSocket = socket;

            console.log('user connected');

            socket.on("mayaCommand", (command, callback) => {

                // todo json request

                // new promise request
                this.newRequest(12346, '127.0.0.1')
                    .then((client) => {
                            client.write(command);
                            client.on('data', (data) => {
                                console.log(data.toString());
                                callback(data.toString());
                                client.destroy()
                        })
                    })
                //console.log(command);
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
            });


            socket.on("mayaResolve", (callbackFn) => {
                this.dccResolver.main()
                    .then((result) => {
                        console.log(`then result  ${JSON.stringify(result)}`);
                        callbackFn(JSON.stringify(result)); // callbackFn is output of this method; called in service of component;
                    });
              
            });

            socket.on("getConfig", callback => {
                callback(config); // callbackFn is output of this method; called in service of component;
            });
        });
    }

    main() {
        // start express server
        this.startServer();
    }
}