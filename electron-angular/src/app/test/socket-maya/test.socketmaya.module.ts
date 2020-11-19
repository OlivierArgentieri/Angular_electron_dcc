import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketMayaRoutingModule } from './test.socketmaya-routing.module';

import { SocketMayaComponent } from './test.socketmaya.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SocketMayaComponent],
  imports: [CommonModule, SharedModule, SocketMayaRoutingModule]
})
export class SocketMayaModule {}
