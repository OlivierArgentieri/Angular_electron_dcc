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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccResolverModule = void 0;
var net = require('net');
var baseModule_1 = require("../base/baseModule");
var resolverRowData_1 = require("./models/resolverRowData");
var getNameFile_Python = "name = cmds.file(q=True, sn=True).split('/')[-1]\nname = name if len(name)>0 else 'empty'\nprint(name)";
/////////////////////////////////////////
// Class to discover opened dccs throught network 
/////////////////////////////////////////
var DccResolverModule = /** @class */ (function (_super) {
    __extends(DccResolverModule, _super);
    function DccResolverModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DccResolverModule.prototype.resolve = function (_port, _address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // create new connection
                        var client = net.Socket();
                        var tcpConnection = client.connect(_port, '192.168.1.15', function () {
                        });
                        tcpConnection.on('error', function (error) {
                            console.log("not found on : " + _port);
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
                        tcpConnection.on('data', function (data) {
                            var out = new resolverRowData_1.default();
                            out.filename = data.toString() == "empty" ? "Unsaved" : data.toString();
                            out.reachable = true;
                            resolve(out);
                            return out;
                        });
                    })];
            });
        });
    };
    DccResolverModule.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _startPort, _endPort, _promises, _toReturn, _i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _startPort = 12346;
                        _endPort = 12350;
                        _promises = [];
                        _toReturn = new Array();
                        for (_i = _startPort; _i < _endPort; _i++) {
                            _promises.push(this.resolve(_i, "localhost")
                                .catch(function (e) { }));
                        }
                        return [4 /*yield*/, Promise.all(_promises)
                                .then(function (results) {
                                for (var _i = 0; _i < _endPort - _startPort; _i++) {
                                    _toReturn.push(new resolverRowData_1.default(_startPort + _i, results[_i].reachable, results[_i].filename));
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _toReturn];
                }
            });
        });
    };
    return DccResolverModule;
}(baseModule_1.BaseModule));
exports.DccResolverModule = DccResolverModule;
//# sourceMappingURL=dccResolverModule.js.map