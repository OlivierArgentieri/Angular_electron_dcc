import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketDccRoutingModule } from './socket.socketdcc-routing.module';

import { SocketDccComponent } from './socket.socketdcc.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material.module';
@NgModule({
  declarations: [SocketDccComponent],
  imports: 
  [
    CommonModule,
    SharedModule,
    SocketDccRoutingModule,
    MaterialModule
    ]
})
export class SocketDccModule {}
