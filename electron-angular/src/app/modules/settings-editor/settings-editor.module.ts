import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsEditorRoutingModule } from './settings-editor-routing.module';

import { SettingsEditorComponent } from '../../components/settings-editor/settings-editor.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { TopNavComponent } from '../../components/side-nav/top-nav.component'
import { SocketModule } from '../socket/socket.socket.module'
@NgModule({
  declarations: [
    SettingsEditorComponent,
  ],
  imports: 
  [
    CommonModule,
    SharedModule,
    SettingsEditorRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    SocketModule
  ],
  exports:[
    TopNavComponent
  ]
})

export class SettingsEditorModule {
  constructor(){
    library.add(fas, faTerminal, faSignInAlt)
    }
}