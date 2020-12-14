import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs/Rx";

import { AppConfig } from '../../../environments/environment';

@Injectable()
export class SocketService{
    
    private socket = null;

    constructor() {
        
    }

    connect(): Rx.Subject<MessageEvent>{
        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        let _observable = new Observable(observer => {

            // routes ?
            this.socket.on('message', (data)=>{
                console.log("Received message from socket server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });

        let _observer = {
            next: (data:Object) =>{
                this.socket.emit('mayaCommand', data);
            }
        }

        return Rx.Subject.create(_observer, _observable); // todo
    }
}
