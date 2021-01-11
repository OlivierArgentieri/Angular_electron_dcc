"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccCommandModule = void 0;
const baseModule_1 = require("../base/baseModule");
/////////////////////////////////////////
// Class to manage Command action
/////////////////////////////////////////
class DccCommandModule extends baseModule_1.BaseModule {
    sendCommand(_commandData, callback = undefined) {
        if (!_commandData)
            return;
        this.newRequest(_commandData.port, _commandData.host)
            .then((client) => {
            client.write(_commandData.command);
            client.on('data', (data) => {
                if (callback)
                    callback(data.toString());
                client.destroy();
            });
        });
    }
}
exports.DccCommandModule = DccCommandModule;
//# sourceMappingURL=dccCommandModule.js.map