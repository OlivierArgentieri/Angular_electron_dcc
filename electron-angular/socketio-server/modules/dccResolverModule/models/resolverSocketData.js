"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverSocketData = exports.ResolverSocketRow = void 0;
var ResolverSocketRow = /** @class */ (function () {
    function ResolverSocketRow(_port, _reachable, _filename) {
        if (_port === void 0) { _port = 0; }
        if (_reachable === void 0) { _reachable = false; }
        if (_filename === void 0) { _filename = ""; }
        this.port = _port;
        this.reachable = _reachable;
        this.filename = _filename;
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