import { Component, Input, OnChanges } from '@angular/core';

import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-table-list',
    template: `
            <table class="table table-hover col-sm-12 list-overflow-control" width="100%">
                <tr *ngFor="let line of dataView" width="100%">
                    <td *ngIf="line.key != 'id'" width="35%">{{line.key | uppercase}}:</td> 
                    <td *ngIf="line.key != 'id'" width="65%">{{line.value}}</td>
                </tr>
            </table>
    `
})

export class TableListComponent implements OnChanges {
    @Input() item;

    dataView = [];

    constructor(
        private _materialService : MaterialService
    ) {}

    ngOnChanges() {
        this._materialService.dataView.subscribe(res => {
            if(res) {
                this.dataView = [];
                var views = [];
                for(let d in res) {
                    views.push(res[d]);
                }
                for(var i=0; i<views.length; i++) {
                    // search the valid item
                    if(views[i].value == true) {
                        for(var j=0; j<this.item.length; j++){
                            if(this.item[j].key.toLowerCase() == views[i].key.toLowerCase())
                                this.dataView.push(this.item[j]);
                        }
                    }
                }
            }
        });
    }
}