import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DccService } from '../services/dcc/dcc-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
// keycodes for separator in chips list
import { SPACE } from '@angular/cdk/keycodes';

// models
import { DccActions } from './models/socket.socketdcc.dccActions';
import { DccAction } from './models/socket.socketdcc.dccAction';
import { DccCommandData } from './models/socket.socketdcc.dcccommand';
import { Config } from '../models/config'

@Component({
  selector: 'app-socketdcc',
  templateUrl: './socket.socketdcc.component.html',
  styleUrls: ['./socket.socketdcc.component.scss']
})

export class SocketDccComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput: any;
  port: number = 0;
  dccName: string = "";

  message: string = "";

  private route: ActivatedRoute;
  private service: DccService = null;
  private snackBar: MatSnackBar = null;

  // action dcc
  private dccActions: string[] = null;
  private actionSelected: string = "";
  private actionData: DccAction = null;

  // command dcc
  private dccCommand: DccCommandData = new DccCommandData();


  readonly separatorKeysCodes: number[] = [SPACE];

  constructor(private _route: ActivatedRoute, private _service: DccService, private _snackBar: MatSnackBar) {
    this.route = _route;
    this.service = _service;
    this.snackBar = _snackBar;
  }

  ///////////////////////////////
  // init methods
  ///////////////////////////////
  initDccActionSelect() {
    this.service.getDccActions(this.dccName, (out) => {
      console.log(out)
      let _obj: DccActions = JSON.parse(out);
      this.dccActions = _obj.actions;
    });
  }

  getPortParameter(): number {
    let _port = 0;
    this.route.params.subscribe(params => {
      _port = params['port']
    });
    return _port
  }

  getDccParameter(): string {
    let _dcc: string = '';
    this.route.params.subscribe(params => {
      _dcc = params['dcc']
    });
    return _dcc
  }

  handleOrientation(event) {
    this.actionSelected = `${event.beta}`;
    console.log(event)
  }
  
  ngOnInit(): void {
    this.port = this.getPortParameter();
    this.dccName = this.getDccParameter();
    this.initDccActionSelect();
  }



  ///////////////////////////////
  // action methods
  ///////////////////////////////
  sendCommand() {
    this.service.getConfig((_config) => {

      var _configObject: Config = _config;

      this.dccCommand.host = _configObject.socketInterpreterSettings.host;
      this.dccCommand.port = this.port;
      this.dccCommand.command = this.message;

      this.service.sendCommand(JSON.stringify(this.dccCommand), (out) => {
        this.snackBar.open(out, "close", {
          duration: 5000
        });
      });
    })
  }

  run() {
    this.actionData.port = this.port != undefined ? this.port : 0; // in case of port parameters is null; 
    this.actionData.name = this.actionSelected;
    this.service.runDccAction(JSON.stringify(this.actionData), (out) => {

      this.snackBar.open(out, "close", {
        duration: 5000
      });
    })
  }

  onChangeDccActions(_value) {
    // load modules
    this.actionSelected = _value;

    if (this.dccName.length == 0) return;

    this.service.getDccActionByName(this.dccName, this.actionSelected, (_out) => {
      var _outJson = JSON.parse(_out);
      if (_outJson.error) {
        this.snackBar.open(_outJson.error, "close", { duration: 5000 });
        return;
      }

      this.actionData = JSON.parse(_out); // out is an DccAction object
    });
  }
}
