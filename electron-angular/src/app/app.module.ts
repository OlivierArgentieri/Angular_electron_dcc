import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// modules
import { HomeModule } from './home/home.module';
import { SocketDccModule } from './modules/socket-dcc/socketdcc.module';
import { SocketHomeModule } from './modules/socket-home/socket-home.module';
import { SettingsEditorModule } from './modules/settings-editor/settings-editor.module';

// Providers
import { DccSocketService } from './shared/services/dcc-socket-services/dcc/dcc-socket-service';
import { DccService } from './shared/services/dcc-socket-services/dcc/dcc-service';
import { SocketService } from './shared/services/dcc-socket-services/socket-service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// material
import { MaterialModule } from './material.module';

// components
// SocketIo
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    SocketDccModule,
    SocketHomeModule,
    SettingsEditorModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  providers: [
    DccService,
    DccSocketService,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
