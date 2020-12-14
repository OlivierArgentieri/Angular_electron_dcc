import { Injectable } from '@angular/core';
import { SocketService }  from '../socket-service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class MayaSocketService{
    
    service:Subject<any>;

    constructor(private _socketService:SocketService){
        this.service = <Subject<any>>_socketService
        .connect()
        .map((_response: any):any =>{
            return _response;
        });
    }

    // sending message to socket io server
    sendCommand(_cmd){
        this.service.next(_cmd);
    }
}
