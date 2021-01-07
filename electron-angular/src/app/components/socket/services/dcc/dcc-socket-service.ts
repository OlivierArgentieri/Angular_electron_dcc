import { SocketService } from "../socket-service";
import { Injectable } from '@angular/core';


@Injectable()
export class DccSocketService extends SocketService{

    constructor() {
        super();
    }

    test(out){
        console.log(out);
    }


    public actionSendCommand(_data, _callback){
        this.socket.emit('mayaCommand', _data, (out)=>{_callback(out);})
    };

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

    public actionGetDccActionByName(_dccName, _actionName, _callback){
        this.socket.emit('getDccActionByName', _dccName, _actionName, (out)=>{ 
            console.log(out)
            _callback(out);
        });
    };

    public actionRunDccAction(_actionData, _callback){
        this.socket.emit('runDccAction', _actionData, (out)=>{ 
            console.log(out)
            _callback(out);
        });
    };

}