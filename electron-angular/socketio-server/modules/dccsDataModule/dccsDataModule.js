"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DccsDataModule = void 0;
var RowCnxDccs = /** @class */ (function () {
    function RowCnxDccs(port, cnx) {
        this.port = port;
        this.cnx = cnx;
    }
    return RowCnxDccs;
}());
var DccsDataModule = /** @class */ (function () {
    function DccsDataModule() {
    }
    DccsDataModule.addNewDatas = function (_port, _cnxObject) {
        DccsDataModule.CNX_DCCS.push(new RowCnxDccs(_port, _cnxObject));
    };
    DccsDataModule.clearDatas = function () {
        DccsDataModule.CNX_DCCS = [];
    };
    DccsDataModule.getDatas = function () {
        return DccsDataModule.CNX_DCCS;
    };
    DccsDataModule.getDccByPort = function (_port) {
        DccsDataModule.CNX_DCCS.forEach(function (o) { return console.log(o.port + " cnx : " + o.cnx); });
        return DccsDataModule.CNX_DCCS.find(function (o) { return o.port == _port; });
    };
    // for data (port, cnxobject) of each dccs
    DccsDataModule.CNX_DCCS = [];
    return DccsDataModule;
}());
exports.DccsDataModule = DccsDataModule;
//# sourceMappingURL=dccsDataModule.js.map