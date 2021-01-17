import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketDccRoutingModule } from './socketdcc-routing.module';

import { SocketDccComponent } from '../../components/socket-dcc/socket-dcc.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';
import { SocketHomeModule } from '../socket-home/socket-home.module'

@NgModule({
  declarations: [
    SocketDccComponent,
    
  ],
  imports:[
    CommonModule,
    SharedModule,
    SocketDccRoutingModule,
    MaterialModule,
    SocketHomeModule
    ]
})
export class SocketDccModule {}
