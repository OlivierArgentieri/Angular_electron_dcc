const net = require('net');



//const client = net.Socket();
export default class  DccResolver {
/*
  isUp(_filePath : string, _port : number)
   {
       
        return new Promise((resolve, reject) => {
            const _worker = new Worker(_filePath, {
                workerData:{
                    port: _port
                }
            });
            _worker.on('online', ()=> {console.log(`Worker dccSolver launched`)});
            _worker.on('message', messageFromWorker => {
                console.log(messageFromWorker)
                return resolve;
            });

           
            _worker.on('error',reject)
            _worker.on('exit', code =>{
                if(code !== 0){
                    reject(new Error(`Worker stop with code ${code}`))
                }
            });
        });

   }*/

   async resolve(_port:number, _address:string)
   {
      return new Promise<Boolean>((resolve, reject) => {
        var client = net.Socket();
        var tcpConnection = client.connect(_port, '127.0.0.1', function() {
            console.log(`Found on : ${_port}`);
            client.destroy();
            resolve(true);
            return true;
           });

        tcpConnection.on('error', (error)=>{
            console.log(`not found on : ${_port}`)
            client.destroy();
            reject(false);
            return false;
        });
        
      });
   }

   async main(){
       const promises = [
        //this.resolve(1234,"localhost"),
        //this.resolve(1111,"localhost"),
       ]
       for(var _i = 1111; _i< 1114; _i++)
       {
            promises.push(this.resolve(_i,"localhost")
                              .catch((e)=>{}))
       }
       //promises.push(this.resolve(1234,"localhost"))
        //await this.isUp("./socketio-server/dccResolver/worker/worker.js", 10);
        //await this.isUp("./socketio-server/dccResolver/worker/worker.js", 1111);
       //let [result_1234, result_1111] = await Promise.all([this.resolve(1234,"localhost"), this.resolve(1111,"localhost")]);

        //console.log(`${result_1234} and ${result_1111}`);
        await Promise.all(promises)
        .then((results) =>{
            for(var _i = 0; _i< 1114 - 1111; _i++)
            { console.log(`${_i} : ${results[_i] === undefined ? false : true}`)}
            //console.log(`1234 : ${results[0]}`, `1111 : ${results[1]}`)
        });
       //promises[0].then
   }
}