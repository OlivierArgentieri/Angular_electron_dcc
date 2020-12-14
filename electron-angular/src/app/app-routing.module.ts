import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { SocketMayaRoutingModule } from './socket/socket-maya/socket.socketmaya-routing.module';
import { SocketRoutingModule } from './socket/socket.socket-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'socket/socketmaya',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule,
    SocketMayaRoutingModule,
    SocketRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
