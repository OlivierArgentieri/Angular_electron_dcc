import { Injectable } from '@angular/core';
import { SocketService }  from '../socket-service';
import { Observable, Subject } from 'rxjs/Rx';
import { MayaSocketService } from './maya-socket-service';

@Injectable()
export class MayaService{
    
    service:Subject<any>;

    constructor(private socketService:MayaSocketService){
     
    }

    // sending message to socket io server
    public sendCommand(_cmdData, _callback){
       this.service = <Subject<any>>this.socketService
        .sendCommand()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next([_cmdData, (_out) =>
            _callback(_out)
        ]);
    }

    // resolve dccs on port
    public resolve(_callback){
        this.service = <Subject<any>>this.socketService
        .resolve()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next(_callback);
    }

    // get main config data
    public getConfig(_callback){
        this.service = <Subject<any>>this.socketService
        .getConfig()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next(_callback);
    }

    // get all dcc actions 
    public getDccActions(_callback){
        this.service = <Subject<any>>this.socketService
        .getDccActions()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next(_callback);
    }

     // get dcc action by name 
     public getDccActionByName(_dccName, _actionName, _callback){
        this.service = <Subject<any>>this.socketService
        .getDccActionByName()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next([_dccName, _actionName, (out)=>{
            _callback(out);               
        }]);
    }

    // run Dcc action 
    public runDccAction(_actionData, _callback){
        this.service = <Subject<any>>this.socketService
        .runDccAction()
        .map((_service: any):any =>{
            return _service;
        });
        
        this.service.next([_actionData, (_out)=>{
            _callback(_out)
        }]);
    }
}
