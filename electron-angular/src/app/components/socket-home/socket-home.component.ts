import { Component, OnDestroy, OnInit } from '@angular/core';
import { DccService } from '../../shared/services/dcc-socket-services/dcc/dcc-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { DccCommandData } from '../../shared/models/dcc/dcc-command';
import { Config } from '../../shared/models/config'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogConfirmStopDccServer } from './socket-home-confirm-stop-dcc-server.component'
interface ResolverIdentify{
  filename:string
  exec_name:string
}

interface ResolverSocketRow {
  port:Number;
  reachable:Boolean;
  identify:ResolverIdentify;
}

 class ResolverSocketData {
 mayaDatas:Array<ResolverSocketRow>
 houdiniDatas:Array<ResolverSocketRow>
 nukeDatas:Array<ResolverSocketRow>
} 

@Component({
  selector: 'app-sockethome',
  templateUrl: './socket-home.component.html',
  styleUrls: ['./socket-home.component.scss']
})
export class SocketHomeComponent implements OnInit, OnDestroy {
  faTerminal = faTerminal;
  faSignInAlt = faSignInAlt;
  loading:boolean = false;
  displayedColumns: string[] = ['fileName', 'type', 'port', 'reachable', 'actions'];
  constructor(private service: DccService, public dialog: MatDialog){  }

  objects:ResolverSocketData = null;
  ngOnInit(): void {
    this.resolve();
  }

  ngOnDestroy(): void {

  }

  resolve(){
    //this.objects = null;
    this.loading = true;
    this.service.resolve((_outdata) => {
      this.objects = JSON.parse(_outdata);
      console.log(_outdata)
      if(!this.objects)return;

      if(this.objects.mayaDatas)
        this.objects.mayaDatas = this.objects.mayaDatas.filter(obj => obj.reachable);

      if(this.objects.houdiniDatas)
        this.objects.houdiniDatas = this.objects.houdiniDatas.filter(obj => obj.reachable);

      if(this.objects.nukeDatas)
        this.objects.nukeDatas = this.objects.nukeDatas.filter(obj => obj.reachable);

        this.loading = false;
      });
  }

  restartDccServer(_port){
    var _dccCommand: DccCommandData = new DccCommandData()

    
    this.service.getConfig((_config) => {
      var _configObject:Config = _config;

      _dccCommand.host = _configObject.socketInterpreterSettings.host.toString();
      _dccCommand.port = _port;
      _dccCommand.command = '#Restart#';

      this.service.sendCommand(JSON.stringify(_dccCommand), ()=>{});
    })
    this.resolve()
  }

  openDialog(_socketRow: ResolverSocketRow): void {
    const dialogRef = this.dialog.open(DialogConfirmStopDccServer, {
      width: '500px',
      data: _socketRow
    }).afterClosed().subscribe(response => {

      if(response.data)
        this.resolve()
    });
  }

  launchNewDcc(_dccName){
    console.log(_dccName);
    this.service.launchDccAction(_dccName);

    this.resolve()
  }
}
