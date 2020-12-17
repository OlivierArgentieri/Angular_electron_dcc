import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayaService } from '../services/maya/maya-service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {
  port: number = 0;
  
  message: string = "";

  private route:ActivatedRoute = null;
  private service:MayaService = null;
  private snackBar:MatSnackBar = null;
  constructor(private _route: ActivatedRoute,private _service: MayaService, private _snackBar:MatSnackBar) {
    this.route = _route;
    this.service = _service;
    this.snackBar = _snackBar;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.port = params['port'];
    });
  }

  sendCommand() {
    this.service.sendCommand(this.message, (out)=>{
      this.snackBar.open(out, "close", {
        duration: 5000
      });
    });
  }

  getSceneObjects() {
    //print(str(cmds.ls(type='mesh')).replace('u', '').replace('[','').replace(']', ''))
    this.service.sendCommand("print('test')", (out)=>{
      this.snackBar.open(out, "close", {
        duration: 5000
      });
  })
}
  
}
