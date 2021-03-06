import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocketDccComponent } from '../../components/socket-dcc/socket-dcc.component';

const routes: Routes = [
  {
    path: 'socket/socketdcc',
    component: SocketDccComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketDccRoutingModule {}
