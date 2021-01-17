import SocketServer from "./socketServer/socketServer";
const net = require('net');

// modules
import { DccResolverModule } from "./modules/dccResolverModule/dccResolverModule";
import { DccActionModule } from "./modules/dccActionModule/dccActionModule";
import { DccCommandModule } from "./modules/dccCommandModule/dccCommandModule";
import DccCommandData from "./modules/dccCommandModule/models/commandData";
import { ActionResult } from "./modules/dccActionModule/models/actionResult/actionResult";
import { LaunchDccModule } from "./modules/launchDccModule/launchDccModule";
import { SettingsModule } from "./modules/settingsModule/settingsModule";



export default class SocketInterpreter extends SocketServer {

    // modules
    dccResolver: DccResolverModule = new DccResolverModule();
    dccAction: DccActionModule = new DccActionModule();
    dccCommand: DccCommandModule = new DccCommandModule();
    runDcc: LaunchDccModule = new LaunchDccModule();
    settingsModule: SettingsModule = new SettingsModule();

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

                console.log(`received ${command}`)
                var _commandObject:DccCommandData = JSON.parse(command)
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
                this.settingsModule.getSettings().then((_settings)=>{
                    callback(_settings);
                })
                 // callbackFn is output of this method; called in service of component;
            });

            // update config
            socket.on("updateConfig", (_newConfig, callback) => {
                console.log("ooookk")
                this.settingsModule.updateSettings(_newConfig).then((_result)=>{
                    callback(_result);
                })
                .catch((_result)=>{
                    callback(_result);
                })
                 // callbackFn is output of this method; called in service of component;
            });

            // get Dcc Actions
            socket.on("getDccActions", (_dccName, _callback) => {
                this.dccAction.getAll(_dccName).then((result)=>{
                    console.log(result)
                    _callback(result);
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

            // run action
            socket.on("runDccAction", (_actionData, _callback)  => {
                var _actionObject:ActionResult = JSON.parse(_actionData)

                if(_actionObject.port > -1)
                {
                    this.dccAction.runActionThroughtSocket(_actionObject).then((_command)=>{
                        console.log(_command)
                        _callback("success"); // TODO get back info of exec action
                    })
                    .catch((_error)=>{
                        _callback(_error)
                    })
                    return;
                }
                
                this.dccAction.runActionThroughtPython(_actionObject).then((_result)=>{
                    console.log(_result)

                    _callback("success"); // TODO get back info of exec action
                })
                .catch((_error)=>{
                    _callback(_error)
                })
                // callbackFn is output of this method; called in service of component;
            });

            /**/
            // run action
            socket.on("launchDcc", (_dccName, _callback)  => {
                this.runDcc.launchDcc(_dccName);
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