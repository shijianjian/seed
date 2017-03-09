import { Component, Input, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { MaterialService } from '../materials.service';
import { DragulaService } from 'ng2-dragula';

import { ModalComponent } from '../../common/modal.component';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html',
    providers: [DragulaService]
})

export class CardsComponent implements OnInit {
    @Input() data;

    @ViewChild('modal') modal : ModalComponent;

    constructor(
        private _materialService: MaterialService,
        private _dragulaService: DragulaService
    ) {
        _dragulaService.dropModel.subscribe(value => {
            // console.log(value)
        });
    }

    ngOnInit() {
        this._materialService.columns.subscribe(res => {
            this.columns = res;
            console.log(JSON.stringify(res));
        });
    }

    title = "Add New Data";
    columns;

    showDataRendererModal(){
        this.modal.showConfirmationModal();
    }

    onAdd(e) {
        this._materialService.createMaterial(e.data);
        this.modal.hideConfirmationModal();
    }

}
