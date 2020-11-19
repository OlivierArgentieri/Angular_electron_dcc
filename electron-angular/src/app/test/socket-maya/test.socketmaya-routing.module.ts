import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SocketMayaComponent } from './test.socketmaya.component';

const routes: Routes = [
  {
    path: 'test/socketmaya',
    component: SocketMayaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocketMayaRoutingModule {}
