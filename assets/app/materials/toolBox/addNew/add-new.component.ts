import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-add-new',
    template: `
        <h5>{{ title }}</h5>
        <my-form-list
                [data]="columns | arrayToJson"
                [button]="'Add'"
                (submit)="onAdd($event)"
        ></my-form-list>
    `
})

export class AddNewComponent implements OnInit {

    columns;
    title = "Add New Data";

    @Output() useless = new EventEmitter();

    constructor(private _materialService: MaterialService) { }

    ngOnInit() {
        this._materialService.columns.subscribe(res => {
            this.columns = res;
            console.log(JSON.stringify(res));
        });
    }


    onAdd(e) {
        this._materialService.createMaterial(e.data);
        this.useless.emit({clicked: e.submitted});
    }
}