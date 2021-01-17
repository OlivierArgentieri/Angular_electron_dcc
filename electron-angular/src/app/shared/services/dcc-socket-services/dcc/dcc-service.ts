import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DccSocketService } from './dcc-socket-service';
import { map } from 'rxjs/operators';
@Injectable()
export class DccService{
    
    service:Subject<any>;

    constructor(private socketService:DccSocketService){
     
    }

    // sending message to socket io server
    public sendCommand(_cmdData, _callback){
       this.service = <Subject<any>>this.socketService
        .sendCommand().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next([_cmdData, (_out) =>
            _callback(_out)
        ]);
    }

    // resolve dccs on port
    public resolve(_callback){
        this.service = <Subject<any>>this.socketService
        .resolve().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next(_callback);
    }

    // get main config data
    public getConfig(_callback){
        this.service = <Subject<any>>this.socketService
        .getConfig().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next(_callback);
    }

     // get main config data
     public updateConfig(_newConfig, _callback){
        this.service = <Subject<any>>this.socketService
        .updateConfig().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next([_newConfig, _callback]);
    }

    // get all dcc actions 
    public getDccActions(_dccName, _callback){
        this.service = <Subject<any>>this.socketService
        .getDccActions().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next([_dccName, _callback]);
    }

     // get dcc action by name 
     public getDccActionByName(_dccName, _actionName, _callback){
        this.service = <Subject<any>>this.socketService
        .getDccActionByName().pipe(
        map((_service: any):any =>{
            return _service;
        }));

        this.service.next([_dccName, _actionName, (out)=>{
            _callback(out);               
        }]);
    }

    // run Dcc action 
    public runDccAction(_actionData, _callback){
        this.service = <Subject<any>>this.socketService
        .runDccAction().pipe(
        map((_service: any):any =>{
            return _service;
        }));
        
        this.service.next([_actionData, (_out)=>{
            _callback(_out)
        }]);
    }

    // instance Dcc action 
    public launchDccAction(_dccName){
        this.service = <Subject<any>>this.socketService
        .launchDccAction().pipe(
        map((_service: any):any =>{
            return _service;
        }));
        
        this.service.next(_dccName);
    }
}
