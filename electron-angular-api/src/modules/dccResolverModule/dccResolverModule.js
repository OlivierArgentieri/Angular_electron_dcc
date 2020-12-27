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
const resolverRowData_1 = require("./models/resolverRowData");
const getNameFile_Python = "name = cmds.file(q=True, sn=True).split('/')[-1]\nname = name if len(name)>0 else 'empty'\nprint(name)";
//const client = net.Socket();
class DccResolverModule {
    resolve(_port, _address) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // create new connection
                var client = net.Socket();
                var tcpConnection = client.connect(_port, '127.0.0.1', function () {
                });
                tcpConnection.on('error', (error) => {
                    console.log(`not found on : ${_port}`);
                    client.destroy();
                    var out = new resolverRowData_1.default();
                    out.filename = "undefined";
                    out.reachable = false;
                    resolve(out);
                    return out;
                });
                // result doesn't contains name of file
                // so we make another request to fill this filename
                tcpConnection.write(getNameFile_Python);
                tcpConnection.on('data', (data) => {
                    var out = new resolverRowData_1.default();
                    out.filename = data.toString() == "empty" ? "Unsaved" : data.toString();
                    out.reachable = true;
                    resolve(out);
                    return out;
                });
            });
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            const _startPort = 12345; // config
            const _endPort = 12350;
            const _promises = [];
            const _toReturn = new Array();
            for (var _i = _startPort; _i < _endPort; _i++) {
                _promises.push(this.resolve(_i, "localhost")
                    .catch((e) => { }));
            }
            yield Promise.all(_promises)
                .then((results) => {
                for (var _i = 0; _i < _endPort - _startPort; _i++) {
                    _toReturn.push(new resolverRowData_1.default(_startPort + _i, results[_i].reachable, results[_i].filename));
                }
            });
            return _toReturn;
        });
    }
}
exports.DccResolverModule = DccResolverModule;
//# sourceMappingURL=dccResolverModule.js.map