"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const net = require('net');
const config = require('../../config/config.json');
class BaseModule {
    constructor() {
        this.client = null;
        this.mainConfig = config;
    }
    newRequest(_port, _host) {
        return new Promise((res, rej) => {
            this.client = net.Socket();
            this.client.connect(_port, _host, function () { });
            res(this.client);
            return this.client;
        });
    }
}
exports.BaseModule = BaseModule;
//# sourceMappingURL=baseModule.js.map