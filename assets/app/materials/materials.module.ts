import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ListModule } from './lists/list.module';
// Does not work with system.js
import { ModalModule } from 'ng2-bootstrap';
import { ToolBoxModule } from './toolBox/tool-box.module';
import { CardsModule } from "./cards/cards.module";
import { CommonModule } from '../common/common.module';
import { MaterialsComponent } from './materials.component';


@NgModule({
    declarations: [
        MaterialsComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ListModule,
        CardsModule,
        CommonModule,
        ModalModule.forRoot(),
        ToolBoxModule
    ],
    exports: [
        MaterialsComponent
    ]
})
export class MaterialsModule { }
