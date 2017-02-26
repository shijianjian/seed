import { Component, Input, Output, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { MaterialService } from '../materials.service';
import { ContentEnum, ContentEnumDecorator, ActionEnum, ActionEnumDecorator } from '../enums';
import { DragulaService } from 'ng2-dragula';

import { DataRendererModalComponent } from '../dataRendererModal/data-renderer.component';


@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html',
    providers: [DragulaService]
})

@ActionEnumDecorator
@ContentEnumDecorator
export class CardsComponent implements OnInit {
    @Input() data;
    @Input() action;

    @ViewChild('modal') modal : DataRendererModalComponent;

    contentEnum: any = ContentEnum;
    actionEnum: any = ActionEnum;

    constructor(
        private _materialService: MaterialService,
        private _dragulaService: DragulaService
    ) { 
        _dragulaService.dropModel.subscribe(value => {
            console.log(value)
        });
    }

    ngOnInit() {
        this._materialService.columns.subscribe(res => this.columns = res);
    }

    modalTitle = "Add New Data";
    buttonName = "+";
    columns;

    showDataRendererModal(){
        this.modal.showDataRendererModal();
    }

}