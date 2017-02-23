import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../common/common.module';
// Does not work with system.js
import { ModalModule } from 'ng2-bootstrap';

import { SearchBoxComponent } from "./searchBox/search-box.component";
import { SearchBoxDropdownComponent } from "./searchBox/search-box-dropdown.component";
import { SearchBoxDropdownItemComponent } from "./searchBox/search-box-dropdown-item.component";
import { CardsComponent } from "./cards/cards.component";
import { CardComponent } from "./cards/card.component";
import { DataRendererModalComponent } from './dataRendererModal/data-renderer.component';
import { FormListComponent } from './formList/form-list.component';
import { FormItemComponent } from './formList/form-item.component';
import { TableListComponent } from './tableList/table-list.component';
import { MaterialsComponent } from './materials.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    DataRendererModalComponent,
    FormListComponent,
    FormItemComponent,
    TableListComponent,
    CardsComponent,
    CardComponent,
    SearchBoxDropdownComponent,
    SearchBoxDropdownItemComponent,
    MaterialsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpModule, 
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    MaterialsComponent
  ]
})
export class MaterialsModule { }
