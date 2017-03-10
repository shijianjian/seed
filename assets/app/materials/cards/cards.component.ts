import { Component, Input, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { ModalComponent } from '../../common/modal.component';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html',
    providers: [DragulaService]
})

export class CardsComponent {
    @Input() data;

    @ViewChild('modal') modal : ModalComponent;

    constructor(
        private _dragulaService: DragulaService
    ) {
        _dragulaService.dropModel.subscribe(value => {
            // console.log(value)
        });
    }
}
