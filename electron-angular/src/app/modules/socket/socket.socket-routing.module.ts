import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocketComponent } from './socket.socket.component';
import { SocketDccComponent } from './socket-dcc/socket.socketdcc.component';
const routes: Routes = [
  {
    path: 'socket',
    component: SocketComponent
  },
  {
    path: 'socket/dcc/:port/:dcc',
    component: SocketDccComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketRoutingModule {}
