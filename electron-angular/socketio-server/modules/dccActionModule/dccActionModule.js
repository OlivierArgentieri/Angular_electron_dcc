"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccActionModule = void 0;
var fs = require('fs');
// config
var config = require('../../config/config.json');
var DccActionModule = /** @class */ (function () {
    function DccActionModule() {
    }
    DccActionModule.prototype.getAll = function () {
        var _toReturn = [];
        fs.readdir(config.pythonSettings.actionsPath, function (err, files) {
            _toReturn.push(files);
        });
        return _toReturn;
    };
    return DccActionModule;
}());
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map