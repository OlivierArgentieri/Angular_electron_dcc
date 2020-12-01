import { Component, OnInit } from '@angular/core';

import { SocketConfig } from '../models/socket-config';
@Component({
  selector: 'app-socketmaya',
  templateUrl: './socket.socketmaya.component.html',
  styleUrls: ['./socket.socketmaya.component.scss']
})
export class SocketMayaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  Test()
  {
    let _config: SocketConfig;
    _config = new SocketConfig();

    _config.address = "localhost"
    _config.port = 8000;
    _config.dccName = "Maya"
    
    var _ser = _config.serialize();
    
    let _config2: SocketConfig = JSON.parse(_ser);
    
    //_config2 = new SocketConfig();
    //_config2 = _ser as SocketConfig;

    //SocketConfig.fromJSON(_ser)
    console.log(_ser);
    console.log(_config2.address);
  }
}
