import { Component, OnDestroy, OnInit } from '@angular/core';
import { DccService } from './services/dcc/dcc-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { DccCommandData } from './socket-dcc/models/socket.socketdcc.dcccommand';

interface ResolverSocketRow {
  port:Number;
  reachable:Boolean;
  fileName:String;
}

 class ResolverSocketData {
 mayaDatas:Array<ResolverSocketRow>
 houdiniDatas:Array<ResolverSocketRow>
 nukeDatas:Array<ResolverSocketRow>
} 

@Component({
  selector: 'app-sockethome',
  templateUrl: './socket.socket.component.html',
  styleUrls: ['./socket.socket.component.scss']
})
export class SocketComponent implements OnInit, OnDestroy {
  faTerminal = faTerminal;
  faSignInAlt = faSignInAlt;
  displayedColumns: string[] = ['fileName', 'port', 'reachable', 'actions'];
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
    _dccCommand.host = "192.168.1.15";
    _dccCommand.port = _port;
    _dccCommand.command = '#Restart#';


    this.service.sendCommand(JSON.stringify(_dccCommand), ()=>{});

    this.resolve()
  }

}
