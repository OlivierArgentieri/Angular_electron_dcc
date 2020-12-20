"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccActionModule = void 0;
var fs = require('fs');
// config
var config = require('../../config/config.json');
var Result = /** @class */ (function () {
    function Result() {
        this.files = [];
        this.error = "";
    }
    return Result;
}());
var DccActionModule = /** @class */ (function () {
    function DccActionModule() {
    }
    DccActionModule.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            var _result = new Result(); // return object
            fs.readdir(config.pythonSettings.actionsPath, function (_err, _files) {
                if (_err) {
                    console.log('Unable to scan directory: ' + _err);
                    _result.error = _err;
                    resolve(JSON.stringify(_result)); // error treated as resolve
                    return;
                }
                for (var _i = 0, _files_1 = _files; _i < _files_1.length; _i++) {
                    var _file = _files_1[_i];
                    if (_file.includes(".pyc"))
                        continue;
                    if (_file.includes("__init__"))
                        continue;
                    _result.files.push(_file.toString().replace(".py", ""));
                }
                resolve(JSON.stringify(_result)); // return jsonObject
            });
        });
    };
    return DccActionModule;
}());
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map