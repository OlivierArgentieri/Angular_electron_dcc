import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketHomeRoutingModule } from './socket-home-routing.module';

import { SocketHomeComponent } from '../../components/socket-home/socket-home.component';
import { DialogConfirmStopDccServer } from '../../components/socket-home/socket-home-confirm-stop-dcc-server.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTerminal, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { TopNavModule  } from '../top-nav/top-nav.module'
@NgModule({
  declarations: [
    SocketHomeComponent,
    DialogConfirmStopDccServer
  ],
  imports: 
  [
    TopNavModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    SocketHomeRoutingModule
  ],
  exports:[MaterialModule
  ]
})
export class SocketHomeModule {
  constructor(){
    library.add(fas, faTerminal, faSignInAlt)
    }
}