import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs/Rx";

import { AppConfig } from '../../../environments/environment';
import { Action } from "rxjs/internal/scheduler/Action";
import { MethodCall } from "@angular/compiler";

@Injectable()
export class SocketService{
    
    private socket = null;

    constructor() {
        
    }


    connect(): Rx.Subject<any> {

        const subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();
        

        subject.subscribe((data:Object) =>{
                this.socket.emit('mayaCommand', data)
            });

        return subject;
    }

    sendCommand():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((data:Object) =>{
            this.socket.emit('mayaCommand', data, (aa)=>{ console.log(aa)})
        });

        return _subject;
    }

    resolve():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((_callback:any) =>{
            this.socket.emit('mayaResolve',(out)=>{ 
                console.log(out)
                _callback(out);
            })
        });
        return _subject;
    }
}
