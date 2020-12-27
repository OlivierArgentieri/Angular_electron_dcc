const net = require('net');

import ResolverRowData from "./models/resolverRowData";

const getNameFile_Python = "name = cmds.file(q=True, sn=True).split('/')[-1]\nname = name if len(name)>0 else 'empty'\nprint(name)";

//const client = net.Socket();
export class DccResolverModule {

    async resolve(_port: Number, _address: String) {
        return new Promise<ResolverRowData>((resolve, reject) => {
            
            // create new connection
            var client = net.Socket();
            var tcpConnection = client.connect(_port, '127.0.0.1', function () {
                
            });

            tcpConnection.on('error', (error) => {
                console.log(`not found on : ${_port}`)
                client.destroy();
                var out = new ResolverRowData();
                out.filename = "undefined";
                out.reachable = false;
                resolve(out);
                return out;
            });


            // result doesn't contains name of file
            // so we make another request to fill this filename
            tcpConnection.write(getNameFile_Python);
            tcpConnection.on('data', (data) => {
                var out = new ResolverRowData();
                out.filename = data.toString()=="empty"?"Unsaved" : data.toString();
                out.reachable = true;
                resolve(out);
                return out;
            })
        });
    }


    async main(): Promise<Array<ResolverRowData>> {

        const _startPort = 12345; // config
        const _endPort = 12350;

        const _promises = []
        const _toReturn = new Array<ResolverRowData>();

        for (var _i = _startPort; _i < _endPort; _i++) {
            _promises.push(this.resolve(_i, "localhost")
                .catch((e) => { }))
        }

        await Promise.all(_promises)
            .then((results) => {
                for (var _i = 0; _i < _endPort - _startPort; _i++) {
                    _toReturn.push(new ResolverRowData(_startPort + _i, results[_i].reachable, results[_i].filename))
                }
            });

        return _toReturn;
    }
}