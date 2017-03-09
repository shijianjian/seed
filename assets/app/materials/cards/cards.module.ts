/**
 * Created by shijian on 09/03/2017.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';

import { CommonModule } from '../../common/common.module';
import { ListModule } from '../lists/list.module';

import { CardComponent } from './card.component';
import { CardsComponent } from './cards.component';

@NgModule({
    declarations: [
        CardsComponent,
        CardComponent
    ],
    imports: [
        BrowserModule,
        DragulaModule,
        CommonModule,
        ListModule
    ],
    exports: [
        CardsComponent
    ]
})
export class CardsModule {

}
