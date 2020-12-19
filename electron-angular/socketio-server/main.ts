import SocketServer from "./socketServer/socketServer";

// config
const config = require('./config/config.json');

// modules
import { DccResolverModule } from "./modules/dccResolverModule/dccResolverModule";
import { DccActionModule } from "./modules/dccActionModule/dccActionModule";




export default class SocketInterpreter extends SocketServer {

    // modules
    dccResolver: DccResolverModule = new DccResolverModule();
    dccAction: DccActionModule = new DccActionModule();

    client = null;
    constructor() {
        super();
    }

    // API Part 

    // overriding : for create specific action per DCCs
    setupAction(io) {
        io.on('connection', (socket) => {
            this.mainSocket = socket;

            console.log('user connected');


            // send maya command in plain python
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
                //command = 'import maya.cmds as cmds cmds.polyCube()' 
            });


            // get all maya open server through socket
            // rename to dcc resolve
            socket.on("mayaResolve", (callbackFn) => {
                this.dccResolver.main()
                    .then((result) => {
                        console.log(`then result  ${JSON.stringify(result)}`);
                        callbackFn(JSON.stringify(result)); // callbackFn is output of this method; called in service of component;
                    });
            });

            // get main config
            socket.on("getConfig", callback => {
                callback(config); // callbackFn is output of this method; called in service of component;
            });

            // get Dcc Actions
            socket.on("getDccActions", callback => {
                callback(this.dccAction.getAll()); // callbackFn is output of this method; called in service of component;
            });
        });
    }

    main() {
        // start express server
        this.startServer();
    }
}