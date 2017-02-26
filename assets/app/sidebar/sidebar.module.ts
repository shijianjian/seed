import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    SidebarComponent
  ]
})

export class SidebarModule {

}