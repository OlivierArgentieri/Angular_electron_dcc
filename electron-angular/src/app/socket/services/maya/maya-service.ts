import { Injectable } from '@angular/core';
import { SocketService }  from '../socket-service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class MayaSocketService{
    
    service:Subject<any>;

    constructor(private socketService:SocketService){
     
    }

    // sending message to socket io server
    sendCommand(_cmd){
       this.service = <Subject<any>>this.socketService
        .sendCommand()
        .map((_service: any):any =>{
            return _service;
        });

        this.service.next(_cmd);
    }
}
