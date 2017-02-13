import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Does not work with system.js
import { ModalModule } from 'ng2-bootstrap';

// util imports
import { KeyValuePipe } from './common/key-value.pipe';
import { JsonObjectPipe } from './common/json-object.pipe';
import { ConfirmationModalComponent } from './common/confirmationModal.component'

import { AppComponent } from "./app.component";
import { SearchBoxComponent } from "./searchBox/search-box.component";
import { SearchBoxDropdownComponent } from "./searchBox/search-box-dropdown.component";
import { SearchBoxDropdownItemComponent } from "./searchBox/search-box-dropdown-item.component";
import { CardsComponent } from "./cards/cards.component";
import { CardComponent } from "./cards/card.component";
import { DataRendererModalComponent } from './dataRendererModal/data-renderer.component';
import { FormListComponent } from './formList/form-list.component';
import { FormItemComponent } from './formList/form-item.component';
import { TableListComponent } from './tableList/table-list.component';

import '../../node_modules/font-awesome/css/font-awesome.min.css';


@NgModule({
    declarations: [
        AppComponent,
        SearchBoxComponent,
        DataRendererModalComponent,
        FormListComponent,
        FormItemComponent,
        TableListComponent,
        CardsComponent,
        CardComponent,
        SearchBoxDropdownComponent,
        SearchBoxDropdownItemComponent,
        KeyValuePipe,
        JsonObjectPipe,
        ConfirmationModalComponent
    ],
    imports: [
        BrowserModule, 
        ReactiveFormsModule,
        FormsModule, 
        HttpModule, 
        ModalModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}