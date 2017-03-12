import {Component, Input, ViewChild, OnInit, state, trigger, style, transition, animate} from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { ModalComponent } from '../../common/modal.component';
import { JsonObjectPipe } from '../../common/json-object.pipe';
import { MaterialsEventService } from '../materials.event.service';
import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html',
    providers: [DragulaService],
    animations: [
        trigger('addData', [
            state('inactive', style({
                opacity: '0'
            })),
            state('active', style({
                opacity: '1'
            })),
            transition('inactive => active', animate(1200))
        ])
    ]
})

export class CardsComponent implements OnInit{
    @Input() data;

    @ViewChild('modal') modal : ModalComponent;

    newData : Array<Object> = [];
    state : string = 'inactive';

    constructor(
        private _dragulaService: DragulaService,
        private _materialService: MaterialService,
        private _materialsEventService: MaterialsEventService
    ) { }

    ngOnInit() {
        this._dragulaService.dropModel.subscribe(value => { });
        this._materialsEventService.data.subscribe(data => {
            this.newData = data;
            this.onNewDataArrive(this.newData);
        });
    }

    onNewDataArrive(data) : void {
        // TODO : animation for new card not working
        if(data.length > 0) {
            this.state = 'active';
        }
    }

    onCancel() : void {
        this.newData = [];
    }

    addClick() : void {
        this._materialService.addData(new JsonObjectPipe().transform(this.newData));
        this._materialsEventService.updateSidebarIndex("");
        this.newData = [];
    }
}
