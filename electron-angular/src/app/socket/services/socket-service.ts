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


    connect(): Rx.Subject<any> {

        const subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();
        

        subject.subscribe((data:Object) =>{
                this.socket.emit('mayaCommand', data)
            });

        return subject;

        /*
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
        
        return Rx.Subject.create(_observer, _observable); // todo*/
    }


    receiveMessage():Rx.Subject<any>{
        const subject = new Rx.Subject();


        subject.subscribe(observer => {

            // routes ?
            this.socket.on('message', (data)=>{
                console.log("Received message from socket server")
                subject.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });
        

        return subject;
    }

    sendCommand():Rx.Subject<any>{
        const subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        subject.subscribe((data:Object) =>{
            this.socket.emit('mayaCommand', data, (aa)=>{ console.log(aa)})
        });


        return subject;
    }
}
