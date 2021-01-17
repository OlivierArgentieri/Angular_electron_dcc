import DccCommandData from "./models/commandData"
import { BaseModule } from "../base/baseModule";

/////////////////////////////////////////
// Class to manage Command action
/////////////////////////////////////////
export class DccCommandModule extends BaseModule {
    
    sendCommand(_commandData:DccCommandData, callback = undefined) {
        if(!_commandData) return
        this.newRequest(_commandData.port, _commandData.host)
        .then((client) => {
            client.write(_commandData.command);
            client.on('data', (data) => {
               if (callback)
                    callback(data.toString());
                client.destroy()
            })
        })
    }
}