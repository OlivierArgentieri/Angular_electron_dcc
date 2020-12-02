import { Component, OnInit } from '@angular/core';

import { SocketConfig } from '../models/socket-config';



// SocketIoModule
//import { Socket } from 'ngx-socket-io';
//import { Injectable } from '@angular/core';

//import { io } from 'socket.io-client';
//const socket = io("ws://localhost:1234/");

@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {

  constructor() {
 
   }

  ngOnInit(): void {
    //var _app = express();
    //subject.subscribe(); 

    //var _app = express();
    //var _http = createServer(_app);
  }

  Test()
  {
    //this.socket.emit("message", 'import maya.cmds as cmds\ncmds.polyCube()');
   // socket.emit('import maya.cmds as cmds\ncmds.polyCube()');
    let _config: SocketConfig;
    _config = new SocketConfig();

    _config.address = "localhost"
    _config.port = 8000;
    _config.dccName = "Maya"
    
    var _ser = _config.serialize();
    
    let _config2: SocketConfig = JSON.parse(_ser);
    
    //_config2 = new SocketConfig();
    //_config2 = _ser as SocketConfig;

    //SocketConfig.fromJSON(_ser)
    console.log(_ser);
    console.log(_config2.address);

    
   // subject.next({message:'import maya.cmds as cmds\ncmds.polyCube()'})
  }
}
