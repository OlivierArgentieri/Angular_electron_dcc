import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

// routing
import { HomeRoutingModule } from './home/home-routing.module';
import { SocketDccRoutingModule } from './modules/socket/socket-dcc/socket.socketdcc-routing.module';
import { SocketRoutingModule } from './modules/socket/socket.socket-routing.module';
import { SettingsEditorRoutingModule } from './modules/settings-editor/settings-editor-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'socket',
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
    SocketDccRoutingModule,
    SocketRoutingModule,
    SettingsEditorRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
