import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketHomeRoutingModule } from './socket-home-routing.module';

import { SocketHomeComponent } from '../../components/socket-home/socket-home.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { TopNavComponent } from '../../components/side-nav/top-nav.component'
@NgModule({
  declarations: [
    SocketHomeComponent,
    TopNavComponent
  ],
  imports: 
  [
    CommonModule,
    SharedModule,
    SocketHomeRoutingModule,
    MaterialModule,
    FontAwesomeModule
  ],
  exports:[
    TopNavComponent
  ]
})
export class SocketHomeModule {
  constructor(){
    library.add(fas, faTerminal, faSignInAlt)
    }
}