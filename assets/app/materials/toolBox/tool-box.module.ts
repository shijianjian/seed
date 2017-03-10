/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { CommonModule } from '../../common/common.module';

import { ToolBoxComponent } from './tool-box.component';
import { SearchBoxModule } from './searchBox/search-box.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [
        ToolBoxComponent,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        SearchBoxModule,
        CommonModule,
        TooltipModule.forRoot()
    ],
    exports: [
        ToolBoxComponent
    ]
})
export class ToolBoxModule {

}
