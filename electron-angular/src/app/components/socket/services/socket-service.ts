import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import * as Rx from "rxjs/Rx";

import { AppConfig } from '../../../../environments/environment';

@Injectable()
export class SocketService{
    
    protected socket = null;

    constructor() {
        
    }

    /// override this
    public actionConnect(data){
        throw new Error("not Implemented")
    }

    public actionSendCommand(data, callback){
        throw new Error("not Implemented")
    }

    public actionResolve(callback){
        throw new Error("not Implemented")
    };

    public actionGetConfig(callback){
        throw new Error("not Implemented")
    }

    public actionGetDccActions(_dccName, callback){
        throw new Error("not Implemented")
    }

    public actionGetDccActionByName(dccName, actionName, callback){
        throw new Error("not Implemented")
    }

    public actionRunDccAction(actionName, actionData, callback){
        throw new Error("not Implemented")
    }

    public actionLaunchDccAction(dccName){
        throw new Error("not Implemented")
    }
    // end override
    

    public sendCommand():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((data) =>{
            console.log();
            this.actionSendCommand(data[0],data[1])
        });

        return _subject;
    }

    public resolve():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((_callback:any) =>{
            this.actionResolve(_callback)
        });
        return _subject;
    }

    public getConfig():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((_callback:any) =>{
            this.actionGetConfig(_callback)
        });
        return _subject;
    }


    public getDccActions():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((_data) =>{
            this.actionGetDccActions(_data[0], _data[1])
        });
        return _subject;
    }

    public getDccActionByName():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((data) =>{
            this.actionGetDccActionByName(data[0], data[1], data[2]) // dccName, actionName, callback,
        });
        return _subject;
    }

    public runDccAction():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((data) =>{
            this.actionRunDccAction(data[0], data[1], data[2]) // actionName, actionData, callback,
        });
        return _subject;
    }


    public launchDccAction():Rx.Subject<any>{
        const _subject = new Rx.Subject();

        this.socket = io(AppConfig.interpreter_url, { autoConnect: false, transports: ['websocket'], upgrade: false });
        this.socket.open();

        _subject.subscribe((data) =>{
            this.actionLaunchDccAction(data) // actionName, actionData, callback,
        });
        return _subject;
    }
}
