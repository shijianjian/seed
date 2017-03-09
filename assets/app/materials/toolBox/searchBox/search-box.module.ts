/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../../../common/common.module';
import { ListModule } from '../../lists/list.module';

import { SearchBoxComponent } from './search-box.component';
import { SearchBoxDropdownComponent } from './search-box-dropdown.component';
import { SearchBoxDropdownItemComponent } from './search-box-dropdown-item.component';

@NgModule({
    declarations: [
        SearchBoxComponent,
        SearchBoxDropdownComponent,
        SearchBoxDropdownItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ListModule
    ],
    exports: [
        SearchBoxComponent
    ]
})
export class SearchBoxModule {

}
