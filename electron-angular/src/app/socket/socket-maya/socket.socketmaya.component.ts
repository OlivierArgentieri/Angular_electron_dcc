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

  socket;
  setupSocketConnection() {
    //this.socket = io('http://localhost:6060');
    this.socket = io('http://localhost:3000',  {autoConnect: false, transports: ['websocket'], upgrade: false});
  }

  constructor() {
   // this.setupSocketConnection();
   }

  ngOnInit(): void {
   // this.setupSocketConnection();
   // this.setupSocketConnection();
    //var _app = express();
    //subject.subscribe(); 

    //var _app = express();
    //var _http = createServer(_app);
    //this.setupSocketConnection();
  }

  Test()
  {
   console.log("aaa");
    //if(this.socket != null) return;
   
   
    this.setupSocketConnection();
    this.socket.open();
    //this.socket.emit("message", 'import maya.cmds as cmds\ncmds.polyCube()');
  
   // subject.next({message:'import maya.cmds as cmds\ncmds.polyCube()'})
  }
}
