import { Component, OnDestroy, OnInit } from '@angular/core';
import { DccService } from '../../shared/services/dcc-socket-services/dcc/dcc-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { DccCommandData } from '../../shared/models/dcc/dcc-command';
import { Config } from '../../shared/models/config'

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
  displayedColumns: string[] = ['fileName', 'type', 'port', 'reachable', 'actions'];
  constructor(private service: DccService){  }

  objects:ResolverSocketData = null;
  ngOnInit(): void {
    this.resolve();
  }

  ngOnDestroy(): void {

  }

  resolve(){
    this.objects = null;
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

  launchNewDcc(_dccName){
    console.log(_dccName);
    this.service.launchDccAction(_dccName);

    this.resolve()
  }
}
