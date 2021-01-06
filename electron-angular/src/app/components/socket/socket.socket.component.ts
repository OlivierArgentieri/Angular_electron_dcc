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

  objects:ResolverSocketRow[];
  ngOnInit(): void {
    this.resolve();
  }

  ngOnDestroy(): void {

  }

  sendMessage() {
    this.service.sendCommand("import maya.cmds as cmds\ncmds.polyCube()", (out)=>{console.log(out)});
  }

  ewmit() {
    // if(this.socket != null) return;
    //this.setupSocketConnection(); 
  }

  resolve(){
    this.service.resolve((_outdata) => {
      this.objects = JSON.parse(_outdata);
      });

  }

  getData() {
    
    if(this.objects.length > 0)
      return this.objects[0].port;
    return "NULL"
  }
}
