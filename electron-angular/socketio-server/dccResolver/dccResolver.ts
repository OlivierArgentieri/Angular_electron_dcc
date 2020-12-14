const net = require('net');
import  ResolverRowData from "./models/resolverRowData"; 



//const client = net.Socket();
export default class DccResolver {

    async resolve(_port: number, _address: string) {
        return new Promise<Boolean>((resolve, reject) => {
            var client = net.Socket();
            var tcpConnection = client.connect(_port, '127.0.0.1', function () {
                //
                console.log(`Found on : ${_port}`);
                client.destroy();
                resolve(true);
                return true;
            });

            tcpConnection.on('error', (error) => {
                console.log(`not found on : ${_port}`)
                client.destroy();
                reject(false);
                return false;
            });

        });
    }

    async main(): Promise<Array<ResolverRowData>> {

        const _startPort = 1111; // config
        const _endPort = 1114; 

        const _promises = []
        //const _toReturn = new Map<Number, Boolean>();
        const _toReturn = new Array<ResolverRowData>();

        for (var _i = _startPort; _i < _endPort; _i++) {
            _promises.push(this.resolve(_i, "localhost")
                .catch((e) => { }))
        }

        await Promise.all(_promises)
            .then((results) => {
                for (var _i = 0; _i < _endPort - _startPort; _i++) {
                    //_toReturn.set(_startPort+_i, results[_i] === undefined ? false : true)
                    _toReturn.push(new ResolverRowData(_startPort+_i, results[_i] === undefined ? false : true))
                    //console.log(`${_i} : ${results[_i] === undefined ? false : true}`)
                }
            });

        //console.log().stringify(_toReturn));
        return _toReturn;
        
    }
}