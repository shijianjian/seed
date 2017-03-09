/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';

import { CommonModule } from '../../common/common.module';

import { DragListComponent } from './dragList/drag-list.component';
import { FormListComponent } from  './formList/form-list.component';
import { FormItemComponent } from  './formList/form-item.component';
import { TableListComponent } from './tableList/table-list.component';

@NgModule({
    declarations: [
        DragListComponent,
        FormItemComponent,
        FormListComponent,
        TableListComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        DragulaModule,
        CommonModule
    ],
    exports: [
        DragListComponent,
        FormListComponent,
        TableListComponent
    ]
})
export class ListModule {

}
