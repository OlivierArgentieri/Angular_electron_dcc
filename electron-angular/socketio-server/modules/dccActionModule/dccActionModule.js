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
        return new Promise(function (resolve, reject) {
            var _toReturn = [];
            fs.readdir(config.pythonSettings.actionsPath, function (err, files) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    //console.log(file); 
                    _toReturn.push(file.toString());
                });
                resolve(_toReturn);
            });
        });
    };
    return DccActionModule;
}());
exports.DccActionModule = DccActionModule;
//# sourceMappingURL=dccActionModule.js.map