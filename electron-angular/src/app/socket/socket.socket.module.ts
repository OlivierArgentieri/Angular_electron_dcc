import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketRoutingModule } from './socket.socket-routing.module';

import { SocketComponent } from './socket.socket.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
@NgModule({
  declarations: [SocketComponent],
  imports: 
  [
    CommonModule,
    SharedModule,
    SocketRoutingModule,
    MaterialModule
    ]
})
export class SocketModule {}
