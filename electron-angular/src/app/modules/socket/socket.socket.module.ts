import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketRoutingModule } from './socket.socket-routing.module';

import { SocketComponent } from './socket.socket.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { TopNavComponent } from '../../components/side-nav/top-nav.component'
@NgModule({
  declarations: [
    SocketComponent,
    TopNavComponent
  ],
  imports: 
  [
    CommonModule,
    SharedModule,
    SocketRoutingModule,
    MaterialModule,
    FontAwesomeModule
  ],
  exports:[
    TopNavComponent
  ]
})
export class SocketModule {
  constructor(){
    library.add(fas, faTerminal, faSignInAlt)
    }
}