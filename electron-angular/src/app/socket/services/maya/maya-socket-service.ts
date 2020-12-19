import { SocketService } from "../socket-service";
import { Injectable } from '@angular/core';


@Injectable()
export class MayaSocketService extends SocketService{

    constructor() {
        super();
    }

    test(out){
        console.log(out);
    }
    public actionSendCommand(_data, _callback){
        this.socket.emit('mayaCommand', _data, (out)=>{_callback(out);}
     )};   


    public actionResolve(callback){
        this.socket.emit('mayaResolve',(out)=>{ 
            console.log(out)
            callback(out);
        });
    };


    public actionGetConfig(callback){
        this.socket.emit('getConfig',(out)=>{ 
            console.log(out)
            callback(out);
        });
    };

    public actionGetDccActions(callback){
        this.socket.emit('getDccActions',(out)=>{ 
            console.log(out)
            callback(out);
        });
    };

}