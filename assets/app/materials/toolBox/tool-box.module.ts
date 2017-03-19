/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CommonModule } from '../../common/common.module';
import { ListModule } from '../lists/list.module';

import { ToolBoxComponent } from './tool-box.component';
import { SearchBoxModule } from './searchBox/search-box.module';
import { UploadComponent } from './upload/upload.component';
import { AddNewComponent } from './addNew/add-new.component';
import { ConfigComponent } from './config/config.component';

@NgModule({
    declarations: [
        ToolBoxComponent,
        UploadComponent,
        AddNewComponent,
        ConfigComponent
    ],
    imports: [
        BrowserModule,
        SearchBoxModule,
        RouterModule,
        CommonModule,
        ListModule
    ],
    exports: [
        ToolBoxComponent
    ]
})
export class ToolBoxModule {

}
