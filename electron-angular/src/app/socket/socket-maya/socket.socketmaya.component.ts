import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayaService } from '../services/maya/maya-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {
  port: number = 0;

  message: string = "";

  private route: ActivatedRoute = null;
  private service: MayaService = null;
  private snackBar: MatSnackBar = null;

  // attr
  private sceneObjects:string[] = null;
  removable = true;
  constructor(private _route: ActivatedRoute, private _service: MayaService, private _snackBar: MatSnackBar) {
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
    this.service.sendCommand(this.message, (out) => {
      this.snackBar.open(out, "close", {
        duration: 5000
      });
    });
  }

  getSceneObjects() {
    const _cmd = "print(str(cmds.ls(type='mesh'))).replace('[', '').replace(']', '').replace(\"'\", '').replace(' ', '')";
    this.service.sendCommand(_cmd, (_out) => {
      
      this.sceneObjects = _out.split(',');
      
      for (let _i = 0; _i < this.sceneObjects.length; _i++) {
        this.sceneObjects[_i] = this.sceneObjects[_i].slice(1);
        }
        
    })
    
  }

  test(){
    var t = "";
    this.sceneObjects.forEach(o => t += o + " ")

    this.snackBar.open(t, "close", {
      duration: 5000
    })
  }

  remove(sceneObject: string): void {
    if(this.sceneObjects.length == 0) return;

    const index = this.sceneObjects.indexOf(sceneObject);

    if (index >= 0) {
      this.sceneObjects.splice(index, 1);
    }
  }

}
