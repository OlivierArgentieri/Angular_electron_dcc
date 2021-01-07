import { Component, OnDestroy, OnInit } from '@angular/core';
import { MayaService } from './services/maya/maya-service';
import { faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
  constructor(private service: MayaService){  }

  objects:ResolverSocketData = null;
  ngOnInit(): void {
    this.resolve();
  }

  ngOnDestroy(): void {

  }

  sendMessage() {
    this.service.sendCommand("import maya.cmds as cmds\ncmds.polyCube()", (out)=>{console.log(out)});
  }

  ewmit() {
    // if(this.socket != null) return;
    //this.setupSocketConnection(); 
  }

  resolve(){
    this.service.resolve((_outdata) => {
      this.objects = JSON.parse(_outdata);

      this.objects.mayaDatas = this.objects.mayaDatas.filter(obj => obj.reachable);
      this.objects.houdiniDatas = this.objects.houdiniDatas.filter(obj => obj.reachable);
      this.objects.nukeDatas = this.objects.nukeDatas.filter(obj => obj.reachable);
      });

  }

  getData() {
  }
}
