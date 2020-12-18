import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayaService } from '../services/maya/maya-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { Config } from '../models/config';


@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput;
  port: number = 0;

  message: string = "";

  private route: ActivatedRoute = null;
  private service: MayaService = null;
  private snackBar: MatSnackBar = null;

  // attr
  private sceneObjects: string[] = null;
  private removable = true;
  private outABC: string = "";

  private abc_startFrame: number = 0;
  private abc_endFrame: number = 0;
  private abc_out: string = "";

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


  test() {
    var _settings:any;
    this.service.getConfig((out) => {
      //_settings = JSON.parse(out);

      let _obj:Config = <Config>out;
      console.log( _obj.DccPortSettings);
       var a = require(_obj.PythonSettings.actionsPath.toString())
      this.snackBar.open(a.dcc, "close", {
        duration: 5000
      });
    });
  }


  export() {
    var _results=[];
    var log:string = "";
    // tes export

    this.sceneObjects.forEach(_object => {
     
      const cmd_exportAbc = "-frameRange " + this.abc_startFrame + " " + this.abc_endFrame + " -uvWrite -dataFormat ogawa -root " + _object + " -file " + this.abc_out + "/" + _object + ".abc "
      
      this.service.sendCommand(`cmds.AbcExport(j  = '${cmd_exportAbc}')`, (_out) => { console.log(log);});
      
    })
    console.log(log)
    this.snackBar.open(log, "close", {
      duration: 5000
    })    
  }

  removeSceneObject(sceneObject: string): void {
    if (this.sceneObjects.length == 0) return;

    const index = this.sceneObjects.indexOf(sceneObject);

    if (index >= 0) {
      this.sceneObjects.splice(index, 1);
    }
  }
}
