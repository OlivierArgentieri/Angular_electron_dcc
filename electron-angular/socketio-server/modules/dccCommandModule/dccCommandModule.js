"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccCommandModule = void 0;
var baseModule_1 = require("../base/baseModule");
/////////////////////////////////////////
// Class to manage Command action
/////////////////////////////////////////
var DccCommandModule = /** @class */ (function (_super) {
    __extends(DccCommandModule, _super);
    function DccCommandModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DccCommandModule.prototype.sendCommand = function (_commandData, callback) {
        if (callback === void 0) { callback = undefined; }
        if (!_commandData)
            return;
        this.newRequest(_commandData.port, _commandData.host)
            .then(function (client) {
            client.write(_commandData.command);
            client.on('data', function (data) {
                if (callback)
                    callback(data.toString());
                client.destroy();
            });
        });
    };
    return DccCommandModule;
}(baseModule_1.BaseModule));
exports.DccCommandModule = DccCommandModule;
//# sourceMappingURL=dccCommandModule.js.map