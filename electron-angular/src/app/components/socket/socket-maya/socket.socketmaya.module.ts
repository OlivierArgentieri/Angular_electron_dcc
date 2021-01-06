import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketMayaRoutingModule } from './socket.socketmaya-routing.module';

import { SocketMayaComponent } from './socket.socketmaya.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material.module';
@NgModule({
  declarations: [SocketMayaComponent],
  imports: 
  [
    CommonModule,
    SharedModule,
    SocketMayaRoutingModule,
    MaterialModule
    ]
})
export class SocketMayaModule {}
