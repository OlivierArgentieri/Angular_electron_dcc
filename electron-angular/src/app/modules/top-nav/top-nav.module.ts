import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';
import { TopNavComponent } from '../../components/top-nav/top-nav.component'
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
      TopNavComponent
    ],
    imports: 
    [
      CommonModule,
      MaterialModule,
      SharedModule,
      RouterModule
    ],
    exports:[
      TopNavComponent
    ]
  })
  export class TopNavModule {
  }