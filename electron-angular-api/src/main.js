"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketServer_1 = require("./socketServer/socketServer");
const net = require('net');
// modules
const dccResolverModule_1 = require("./modules/dccResolverModule/dccResolverModule");
const dccActionModule_1 = require("./modules/dccActionModule/dccActionModule");
const dccCommandModule_1 = require("./modules/dccCommandModule/dccCommandModule");
const launchDccModule_1 = require("./modules/launchDccModule/launchDccModule");
class SocketInterpreter extends socketServer_1.default {
    constructor() {
        super();
        // modules
        this.dccResolver = new dccResolverModule_1.DccResolverModule();
        this.dccAction = new dccActionModule_1.DccActionModule();
        this.dccCommand = new dccCommandModule_1.DccCommandModule();
        this.runDcc = new launchDccModule_1.LaunchDccModule();
        this.client = null;
    }
    // API Part 
    // overriding : for create specific action per DCCs
    setupAction(io) {
        io.on('connection', (socket) => {
            this.mainSocket = socket;
            console.log('user connected');
            // send maya command in plain python
            socket.on("mayaCommand", (command, callback) => {
                console.log(`received ${command}`);
                var _commandObject = JSON.parse(command);
                this.dccCommand.sendCommand(_commandObject, callback);
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
                callback(this.mainConfig); // callbackFn is output of this method; called in service of component;
            });
            // get Dcc Actions
            socket.on("getDccActions", (_dccName, _callback) => {
                this.dccAction.getAll(_dccName).then((result) => {
                    console.log(result);
                    _callback(result);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // get Dcc Actions by name
            socket.on("getDccActionByName", (_dccName, _actionName, _callback) => {
                this.dccAction.getByName(_actionName, _dccName).then((result) => {
                    console.log(result);
                    _callback(result);
                });
                // callbackFn is output of this method; called in service of component;
            });
            // run action
            socket.on("runDccAction", (_actionName, _actionData, _callback) => {
                var _actionObject = JSON.parse(_actionData);
                this.dccAction.runAction(_actionName, _actionObject).then((_command) => {
                    console.log(_command);
                    _callback("ok"); // TODO get back info of exec action
                });
                // callbackFn is output of this method; called in service of component;
            });
            /**/
            // run action
            socket.on("launchDcc", (_dccName, _callback) => {
                /*
                this.runDcc.Launch(_actionObject).then((_command)=>{
                    console.log(_command)
                    _callback("ok");
                })*/
                // callbackFn is output of this method; called in service of component;
            });
        });
    }
    main() {
        // start express server
        this.startServer();
    }
}
exports.default = SocketInterpreter;
//# sourceMappingURL=main.js.map