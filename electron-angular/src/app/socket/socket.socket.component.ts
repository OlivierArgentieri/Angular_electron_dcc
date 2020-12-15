import { Component, OnInit } from '@angular/core';
import { MayaSocketService } from './services/maya/maya-service';

import { io } from 'socket.io-client';
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
export class SocketComponent implements OnInit {
  
  constructor(private service: MayaSocketService){  }

  ngOnInit(): void {
    /*
    this.service.service.subscribe(_msg =>{
      console.log(_msg);
    })*/

    //this.setupSocketConnection();
    //this.setupAction();
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
    //this.service.sendMessage("test");
  }
}
