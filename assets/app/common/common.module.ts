import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// util imports
import { KeyValuePipe } from './key-value.pipe';
import { JsonObjectPipe } from './json-object.pipe';
import { ConfirmationModalComponent } from './confirmationModal.component';
import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    declarations: [
        KeyValuePipe,
        JsonObjectPipe,
        ConfirmationModalComponent
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot()
    ],
    exports: [
        KeyValuePipe,
        JsonObjectPipe,
        ConfirmationModalComponent
    ]
})
export class CommonModule {

}