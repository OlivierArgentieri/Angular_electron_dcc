import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayaService } from '../services/maya/maya-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { Config } from '../models/config';
import {MatChipInputEvent} from '@angular/material/chips';
// keycodes for separator in chips list
import { SPACE } from '@angular/cdk/keycodes';

// models
import { DccActions } from './models/socket.socketmaya.dccActions';
import { DccAction } from './models/socket.socketmaya.dccAction';


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

  // action dcc
  private dccActions:string[] = null;
  private actionSelected:string = "";
  private actionData:DccAction = null;

  readonly separatorKeysCodes: number[] = [SPACE];

  constructor(private _route: ActivatedRoute, private _service: MayaService, private _snackBar: MatSnackBar) {
    this.route = _route;
    this.service = _service;
    this.snackBar = _snackBar;
  }

  ///////////////////////////////
  // init methods
  ///////////////////////////////
  initDccActionSelect(){
    this.service.getDccActions((out) => {
      let _obj:DccActions = JSON.parse(out);
      this.dccActions = _obj.actions;
    });    
  }

  getPortParameter():number{
    this.route.queryParams.subscribe(params => {
      return params['port'];
    });
    return 0
  }
  handleOrientation(event){
    this.actionSelected = `${event.beta}`;
    console.log(event)
  }
  ngOnInit(): void {
    this.initDccActionSelect();
    this.port = this.getPortParameter();

  
  }

 

  ///////////////////////////////
  // action methods
  ///////////////////////////////
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
    this.service.getDccActionByName("maya",this.actionSelected, (out) => {
      //_settings = JSON.parse(out);

      //let _obj:DccActions =JSON.parse(out);
      //this.dccActions = _obj.actions;
      console.log(out);
       //var a = require(_obj.PythonSettings.actionsPath.toString())
      this.snackBar.open(out, "close", {
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

  onChangeDccActions(value){
    // load maya modules
    this.actionSelected = value;

    this.service.getDccActionByName("maya",this.actionSelected, (out) => {
    this.actionData = JSON.parse(out); // out is an DccAction object
    });
  }

  onAddChipList(event:MatChipInputEvent, list:any){
    console.log("test");
    //const input = event.input;
    //const value = event.value;

    /*
    // Add our fruit
    if ((value || '').trim()) {
      list.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }*/
  }
}
