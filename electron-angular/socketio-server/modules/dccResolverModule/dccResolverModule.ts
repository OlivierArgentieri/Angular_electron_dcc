const net = require('net');

import { BaseModule } from "../base/baseModule";
import { SettingsModule } from "../settingsModule/settingsModule";
import { ResolverSocketData, ResolverSocketRow, ResolverIdentify } from "./models/resolverSocketData";
import { DccsDataModule } from '../dccsDataModule/dccsDataModule';

/////////////////////////////////////////////////////////
// Class to discover opened dccs throught network 
/////////////////////////////////////////////////////////

export class DccResolverModule extends BaseModule {
    
    async resolve(_host:string, _port: number) {
        return new Promise<ResolverSocketRow>((resolve, reject) => {
            DccsDataModule.clearDatas()

            // create new connection
            var client = net.Socket();
            var tcpConnection = client.connect(_port, _host, function () {
            });

            tcpConnection.on('error', (error) => {
                console.log(`not found on : ${_port}`)
                client.destroy();
                var out = new ResolverSocketRow(_port, false, null);
                resolve(out);
                DccsDataModule.addNewDatas(out.port, null)
                return out;
            });


            // result doesn't contains name of file
            // so we make another request to fill this filename
            tcpConnection.write("#Identify#");
            tcpConnection.on('data', (data) => {
                console.log(data.toString())
                var out = new ResolverSocketRow(_port, true, JSON.parse(data.toString()));
                DccsDataModule.addNewDatas(out.port, tcpConnection)
                resolve(out);
                return out;
            })
        });
    }

    async resolveOnRange(_host:string, _startPort:number, _endPort:number): Promise<Array<ResolverSocketRow>> {
        const _toReturn = new Array<ResolverSocketRow>();
        const _promises = []
        for (var _i = _startPort; _i <= _endPort; _i++) {
            _promises.push(this.resolve(_host, _i)
                .catch((e) => { }))
        }

        await Promise.all(_promises)
            .then((results) => {
                for (var _i = 0; _i <= _endPort - _startPort; _i++) {;
                    _toReturn.push(new ResolverSocketRow(_startPort + _i, results[_i].reachable, results[_i].identify))
                }
            });

        return _toReturn;
    }

    async main() : Promise<ResolverSocketData>{
        
        const _promises = []
        // format data for dccs
        const _host =  SettingsModule.parsedConfig.socketInterpreterSettings.host;

        const _resolverSocketData:ResolverSocketData = new ResolverSocketData();
        
        // maya
        var _portStart = SettingsModule.parsedConfig.dccPortSettings.mayaPortRangeStart;
        var _portEnd = SettingsModule.parsedConfig.dccPortSettings.mayaPortRangeEnd;
        
        _promises.push(this.resolveOnRange(_host, _portStart, _portEnd));

        
        // houdini
        _portStart = SettingsModule.parsedConfig.dccPortSettings.houdiniPortRangeStart;
        _portEnd = SettingsModule.parsedConfig.dccPortSettings.houdiniPortRangeEnd;
        
        _promises.push(this.resolveOnRange(_host, _portStart, _portEnd))

        await Promise.all(_promises).then((_results)=>{
            _resolverSocketData.mayaDatas = _results[0]
            _resolverSocketData.houdiniDatas = _results[1]
            
        })
        
        return new Promise<ResolverSocketData>((resolve, reject) => {
            DccsDataModule.getDatas().forEach(o => console.log(o.port + " cnx : " + o.cnx))
            resolve(_resolverSocketData)
        });
    }
}