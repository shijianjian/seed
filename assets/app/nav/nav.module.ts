import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';

import { NavComponent } from './nav.component'; 
import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        NavComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
  exports: [
    NavComponent,
    SidebarComponent
  ]
})
export class NavModule {

}
