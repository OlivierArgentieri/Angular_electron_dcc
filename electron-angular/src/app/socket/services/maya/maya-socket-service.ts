import { SocketService } from "../socket-service";
import { Injectable } from '@angular/core';


@Injectable()
export class MayaSocketService extends SocketService{

    constructor() {
        super();
    }

    public actionSendCommand(data){
        this.socket.emit('mayaCommand', data, (out)=>{ console.log(out)})
    }

    public actionResolve(callback){
        this.socket.emit('mayaResolve',(out)=>{ 
            console.log(out)
            callback(out);
        });
    };

}