import { Component, OnInit } from '@angular/core';
import { SocketConfig } from '../models/socket-config';

import { io } from 'socket.io-client';


// SocketIoModule
//import { Socket } from 'ngx-socket-io';
//import { Injectable } from '@angular/core';

//
//const socket = io("ws://localhost:1234/");

@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {

  port: number = 0;
  host: string = "";
  message: string = "";


  socket = null;
  setupSocketConnection() {
    this.socket = io('http://localhost:3000', { autoConnect: false, transports: ['websocket'], upgrade: false });
    this.socket.open();
  }

  setupAction() {
    if(this.socket == null) return;

    this.socket.on("callback", (message)=>{
      console.log(message)
    });
  }

  constructor() {
    // this.setupSocketConnection();
  }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.setupAction();
  }

  Test() {
    // if(this.socket != null) return;
    //this.setupSocketConnection();
    this.socket.emit("mayaCommand", this.message);

    // 

    //this.socket.emit("message", 'import maya.cmds as cmds\ncmds.polyCube()');

    // subject.next({message:'import maya.cmds as cmds\ncmds.polyCube()'})
  }
}
