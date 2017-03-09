/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolBoxComponent } from './tool-box.component';
import { SearchBoxModule } from './searchBox/search-box.module';

@NgModule({
    declarations: [
        ToolBoxComponent
    ],
    imports: [
        BrowserModule,
        SearchBoxModule
    ],
    exports: [
        ToolBoxComponent
    ]
})
export class ToolBoxModule {

}
