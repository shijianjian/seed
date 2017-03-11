import { Component, Input, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { ModalComponent } from '../../common/modal.component';
import { JsonObjectPipe } from '../../common/json-object.pipe';
import { MaterialsEventService } from '../materials.event.service';
import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html',
    providers: [DragulaService]
})

export class CardsComponent {
    @Input() data;

    @ViewChild('modal') modal : ModalComponent;

    newData : Array<Object> = [];

    constructor(
        private _dragulaService: DragulaService,
        private _materialService: MaterialService,
        private _materialsEventService: MaterialsEventService
    ) {
        _dragulaService.dropModel.subscribe(value => { });
        _materialsEventService.data.subscribe(data => this.newData = data);
    }

    addClick() {
        this._materialService.addData(new JsonObjectPipe().transform(this.newData));
        this._materialsEventService.updateSidebarIndex("");
        this.newData = [];
    }
}
