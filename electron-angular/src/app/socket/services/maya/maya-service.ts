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
    public sendCommand(_cmd){
       this.service = <Subject<any>>this.socketService
        .sendCommand()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next(_cmd);
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
}
