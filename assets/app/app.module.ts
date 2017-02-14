import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { ModalModule } from 'ng2-bootstrap';

import { MaterialsModule } from './materials/materials.module';

import { AppComponent } from "./app.component";


import '../../node_modules/font-awesome/css/font-awesome.min.css';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        // ModalModule.forRoot(),
        MaterialsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}