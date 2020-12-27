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
                console.log("received")
                // new promise request
                this.newRequest(12346, '192.168.1.15')
                    .then((client) => {
                        client.write(command);
                        client.on('data', (data) => {
                            console.log(data.toString());
                            
                            if(callback)
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
                this.dccAction.getAll().then((result)=>{
                    console.log(result)
                    callback(result);
                })
                // callbackFn is output of this method; called in service of component;
            });

            // get Dcc Actions by name
            socket.on("getDccActionByName", (_dccName, _actionName, _callback)  => {
                this.dccAction.getByName(_actionName, _dccName).then((result)=>{
                    console.log(result)
                    _callback(result);
                })
                // callbackFn is output of this method; called in service of component;
            });
        });
    }

    main() {
        // start express server
        this.startServer();
    }
}

var _interpreter = new SocketInterpreter();
_interpreter.main();