import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MayaService } from '../services/maya/maya-service';
import * as litegraph from 'litegraph.js'

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

  constructor(private _route: ActivatedRoute,private _service: MayaService) {
    this.route = _route;
    this.service = _service;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.port = params['port'];
    });
  }

  sendCommand() {
    this.service.sendCommand(this.message);
  }

  
}
