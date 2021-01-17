import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingsEditorComponent } from '../../components/settings-editor/settings-editor.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsEditorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsEditorRoutingModule {}
