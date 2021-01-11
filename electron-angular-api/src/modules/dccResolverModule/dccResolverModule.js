"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccResolverModule = void 0;
const net = require('net');
const baseModule_1 = require("../base/baseModule");
const resolverSocketData_1 = require("./models/resolverSocketData");
/////////////////////////////////////////
// Class to discover opened dccs throught network 
/////////////////////////////////////////
class DccResolverModule extends baseModule_1.BaseModule {
    resolve(_host, _port) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // create new connection
                var client = net.Socket();
                var tcpConnection = client.connect(_port, _host, function () {
                });
                tcpConnection.on('error', (error) => {
                    console.log(`not found on : ${_port}`);
                    client.destroy();
                    var out = new resolverSocketData_1.ResolverSocketRow();
                    out.filename = "undefined";
                    out.reachable = false;
                    resolve(out);
                    return out;
                });
                // result doesn't contains name of file
                // so we make another request to fill this filename
                tcpConnection.write("#Identify#");
                tcpConnection.on('data', (data) => {
                    var out = new resolverSocketData_1.ResolverSocketRow();
                    out.filename = data.toString();
                    out.reachable = true;
                    resolve(out);
                    return out;
                });
            });
        });
    }
    resolveOnRange(_host, _startPort, _endPort) {
        return __awaiter(this, void 0, void 0, function* () {
            const _toReturn = new Array();
            const _promises = [];
            for (var _i = _startPort; _i <= _endPort; _i++) {
                _promises.push(this.resolve(_host, _i)
                    .catch((e) => { }));
            }
            yield Promise.all(_promises)
                .then((results) => {
                for (var _i = 0; _i <= _endPort - _startPort; _i++) {
                    _toReturn.push(new resolverSocketData_1.ResolverSocketRow(_startPort + _i, results[_i].reachable, results[_i].filename));
                }
            });
            return _toReturn;
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            const _promises = [];
            // format data for dccs
            const _host = this.mainConfig.socketInterpreterSettings.host;
            const _resolverSocketData = new resolverSocketData_1.ResolverSocketData();
            // maya
            var _portStart = this.mainConfig.dccPortSettings.mayaPortRangeStart;
            var _portEnd = this.mainConfig.dccPortSettings.mayaPortRangeEnd;
            _promises.push(this.resolveOnRange(_host, _portStart, _portEnd));
            // houdini
            _portStart = this.mainConfig.dccPortSettings.houdiniPortRangeStart;
            _portEnd = this.mainConfig.dccPortSettings.houdiniPortRangeEnd;
            _promises.push(this.resolveOnRange(_host, _portStart, _portEnd));
            yield Promise.all(_promises).then((_results) => {
                _resolverSocketData.mayaDatas = _results[0];
                _resolverSocketData.houdiniDatas = _results[1];
            });
            return new Promise((resolve, reject) => {
                resolve(_resolverSocketData);
            });
        });
    }
}
exports.DccResolverModule = DccResolverModule;
//# sourceMappingURL=dccResolverModule.js.map