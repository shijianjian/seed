import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// util imports
import { KeyValuePipe } from './key-value.pipe';
import { JsonObjectPipe } from './json-object.pipe';
import { ModalModule } from 'ng2-bootstrap';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [
        KeyValuePipe,
        JsonObjectPipe,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        ModalModule.forRoot()
    ],
    exports: [
        KeyValuePipe,
        JsonObjectPipe,
        ModalComponent
    ]
})
export class CommonModule {

}