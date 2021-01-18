import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketDccRoutingModule } from './socketdcc-routing.module';

import { SocketDccComponent } from '../../components/socket-dcc/socket-dcc.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material.module';
import { TopNavModule } from '../top-nav/top-nav.module'

@NgModule({
  declarations: [
    SocketDccComponent,
    
  ],
  imports:[
    CommonModule,
    SharedModule,
    SocketDccRoutingModule,
    MaterialModule,
    TopNavModule
    ]
})
export class SocketDccModule {}
