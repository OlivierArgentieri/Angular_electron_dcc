import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

// routing
import { HomeRoutingModule } from './home/home-routing.module';
import { SocketDccRoutingModule } from './modules/socket-dcc/socketdcc-routing.module';
import { SocketHomeRoutingModule } from './modules/socket-home/socket-home-routing.module';
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
    SocketHomeRoutingModule,
    SettingsEditorRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
