import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocketComponent } from './socket.socket.component';
import { SocketMayaComponent } from './socket-maya/socket.socketmaya.component';

const routes: Routes = [
  {
    path: 'socket',
    component: SocketComponent
  },
  {
    path: 'socket/maya/:port',
    component: SocketMayaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketRoutingModule {}
