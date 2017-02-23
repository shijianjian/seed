import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialsModule } from './materials/materials.module';
import { NavModule } from './nav/nav.module';

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NavModule,
        MaterialsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}