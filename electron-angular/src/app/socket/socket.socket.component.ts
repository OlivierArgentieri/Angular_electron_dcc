import { Component, OnDestroy, OnInit } from '@angular/core';
import { MayaSocketService } from './services/maya/maya-service';

import { io } from 'socket.io-client';
import { Server } from 'http';
// SocketIoModule
//import { Socket } from 'ngx-socket-io';
//import { Injectable } from '@angular/core';

//
//const socket = io("ws://localhost:1234/");

@Component({
  selector: 'app-sockethome',
  templateUrl: './socket.socket.component.html',
  styleUrls: ['./socket.socket.component.scss']
})
export class SocketComponent implements OnInit, OnDestroy {
  
  constructor(private service: MayaSocketService){  }

  ngOnInit(): void {
    /*
    this.service.service.subscribe(_msg =>{
      console.log(_msg);
    })*/

    //this.setupSocketConnection();
    //this.setupAction();
  }

  ngOnDestroy(): void {

  }

  sendMessage() {
    this.service.sendCommand("import maya.cmds as cmds\ncmds.polyCube()");
    console.log("SendCommand")
  }

  Emit() {
    // if(this.socket != null) return;
    //this.setupSocketConnection(); 
  }

  Resolve(){
    this.service.resolve((test) => console.log(test))

    
    //this.service.emit("mayaResolve", );
  }
}
