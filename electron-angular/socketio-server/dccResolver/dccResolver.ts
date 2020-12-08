import { Worker} from 'worker_threads';

export default class  DccResolver{

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
   }

   async main(){
        await this.isUp("./socketio-server/dccResolver/worker/worker.js", 10);
        await this.isUp("./socketio-server/dccResolver/worker/worker.js", 1111);
   }
}