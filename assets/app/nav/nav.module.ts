import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';

import { NavComponent } from './nav.component'; 

@NgModule({
    declarations: [
        NavComponent
        
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
  exports: [
    NavComponent
  ]
})
export class NavModule {

}
