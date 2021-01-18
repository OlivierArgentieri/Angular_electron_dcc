import { Component, Inject } from '@angular/core';


import { DccService } from '../../shared/services/dcc-socket-services/dcc/dcc-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { DccCommandData } from '../../shared/models/dcc/dcc-command';
import { Config } from '../../shared/models/config'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


interface ResolverIdentify{
  filename:string
  exec_name:string
}

interface ResolverSocketRow {
  port:Number;
  reachable:Boolean;
  identify:ResolverIdentify;
}

@Component({
    selector: 'dialog-confirm-stop-dcc-server',
    templateUrl: './socket-home-confirm-stop-dcc-server.component.html',
    styleUrls: ['./socket-home.component.scss']
  })
  export class DialogConfirmStopDccServer {
  
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmStopDccServer>,
      @Inject(MAT_DIALOG_DATA) public data: ResolverSocketRow,
      private service:DccService) {}
  
    onNoClick(): void {
      this.dialogRef.close({data:false});
    }

    onYesClick(_port): void {
      this.stopDccServer(_port)
      this.dialogRef.close({data:true});
    }

    stopDccServer(_port){
      var _dccCommand: DccCommandData = new DccCommandData()
      this.service.getConfig((_config) => {
        var _configObject:Config = _config;
  
        _dccCommand.host = _configObject.socketInterpreterSettings.host.toString();
        _dccCommand.port = _port;
        _dccCommand.command = '#Shutdown#';
  
        this.service.sendCommand(JSON.stringify(_dccCommand), ()=>{});
      })
     
    }
  }