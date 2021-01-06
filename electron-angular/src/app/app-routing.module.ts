import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './components/home/home-routing.module';
import { SocketMayaRoutingModule } from './components/socket/socket-maya/socket.socketmaya-routing.module';
import { SocketRoutingModule } from './components/socket/socket.socket-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'socket/socketmaya',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    SocketMayaRoutingModule,
    SocketRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
