"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
var net = require('net');
var BaseModule = /** @class */ (function () {
    function BaseModule() {
        this.client = null;
    }
    BaseModule.prototype.newRequest = function (_port, _host) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.client = net.Socket();
            _this.client.connect(_port, _host, function () { });
            res(_this.client);
            return _this.client;
        });
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
//# sourceMappingURL=baseModule.js.map