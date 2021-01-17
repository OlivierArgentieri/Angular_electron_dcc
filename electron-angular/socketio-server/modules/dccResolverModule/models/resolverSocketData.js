"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverSocketData = exports.ResolverSocketRow = exports.ResolverIdentify = void 0;
var ResolverIdentify = /** @class */ (function () {
    function ResolverIdentify() {
    }
    return ResolverIdentify;
}());
exports.ResolverIdentify = ResolverIdentify;
var ResolverSocketRow = /** @class */ (function () {
    function ResolverSocketRow(_port, _reachable, _identify) {
        this.port = _port;
        this.reachable = _reachable;
        this.identify = _identify;
    }
    return ResolverSocketRow;
}());
exports.ResolverSocketRow = ResolverSocketRow;
var ResolverSocketData = /** @class */ (function () {
    function ResolverSocketData() {
    }
    return ResolverSocketData;
}());
exports.ResolverSocketData = ResolverSocketData;
//# sourceMappingURL=resolverSocketData.js.map