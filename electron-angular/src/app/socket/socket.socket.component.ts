import { Component, OnDestroy, OnInit } from '@angular/core';
import { MayaService } from './services/maya/maya-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// SocketIoModule
//import { Socket } from 'ngx-socket-io';
//import { Injectable } from '@angular/core';

//
//const socket = io("ws://localhost:1234/");
interface ResolverSocketRow {
  port:Number;
  reachable:Boolean;
  fileName:String;
  
} 
@Component({
  selector: 'app-sockethome',
  templateUrl: './socket.socket.component.html',
  styleUrls: ['./socket.socket.component.scss']
})
export class SocketComponent implements OnInit, OnDestroy {
  faTerminal = faTerminal;
  faSignInAlt = faSignInAlt;
  constructor(private service: MayaService){  }

  outjson:String;

  objects:ResolverSocketRow[];
  ngOnInit(): void {
  
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
    this.service.resolve((test) => {
      console.log(this.outjson);

      this.objects = JSON.parse(test);
      // this.objects = taaa
      this.outjson = test}
      );


    //this.service.emit("mayaResolve", );
  }

  getData() {
    
    if(this.objects.length > 0)
      return this.objects[0].port;
    return "NULL"
  }
}
