import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// util imports
import { KeyValuePipe } from './key-value.pipe';
import { JsonObjectPipe } from './json-object.pipe';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalComponent } from './modal.component';
import { ArrayJsonPipe } from './array-json.pipe';

@NgModule({
    declarations: [
        KeyValuePipe,
        JsonObjectPipe,
        ModalComponent,
        ArrayJsonPipe
    ],
    imports: [
        BrowserModule,
        ModalModule
    ],
    exports: [
        KeyValuePipe,
        JsonObjectPipe,
        ModalComponent,
        ArrayJsonPipe
    ]
})
export class CommonModule {

}