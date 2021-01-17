import { Component, OnInit } from '@angular/core';
import { DccService } from '../../modules/socket/services/dcc/dcc-service';
import { Config } from './models/config';



@Component({
  selector: 'settings-editor-component',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.scss']
})

export class SettingsEditorComponent implements OnInit {

  constructor(private service: DccService) { }
  configObject: Config;

  ngOnInit(): void {
    this.service.getConfig((_config) => {
      this.configObject = _config
      console.log(this.configObject.socketInterpreterSettings.host)
    })
  }

  saveSettings(){
    this.service.updateConfig(this.configObject, (_out) =>{
      console.log(_out)
    })
  }
}