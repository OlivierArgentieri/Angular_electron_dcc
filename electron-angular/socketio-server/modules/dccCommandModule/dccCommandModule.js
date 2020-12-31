"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccCommandModule = void 0;
var net = require('net');
var DccCommandModule = /** @class */ (function () {
    function DccCommandModule() {
        this.client = null;
    }
    DccCommandModule.prototype.newRequest = function (_port, _host) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.client = net.Socket();
            _this.client.connect(_port, _host, function () { });
            res(_this.client);
            return _this.client;
        });
    };
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
}());
exports.DccCommandModule = DccCommandModule;
//# sourceMappingURL=dccCommandModule.js.map