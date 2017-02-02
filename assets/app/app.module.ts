import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { TableComponent } from "./table/table.component";

@NgModule({
    declarations: [
        AppComponent,
        TableComponent
    ],
    imports: [BrowserModule, FormsModule, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}