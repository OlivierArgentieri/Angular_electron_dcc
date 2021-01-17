import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocketHomeComponent } from '../../components/socket-home/socket-home.component';
import { SocketDccComponent } from '../../components/socket-dcc/socket-dcc.component';
const routes: Routes = [
  {
    path: 'socket',
    component: SocketHomeComponent
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
export class SocketHomeRoutingModule {}
