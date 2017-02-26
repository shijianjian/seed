import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-table-list',
    template: `
            <table class="table table-hover col-sm-12">
                <tr class="" *ngFor="let line of dataView">
                    <td *ngIf="line.key != 'id'">{{line.key | uppercase}}:</td> 
                    <td *ngIf="line.key != 'id'">{{line.value}}</td>
                </tr>
            </table>
    `
})

export class TableListComponent implements OnInit, OnChanges {
    @Input() item;

    dataView = [];

    constructor(
        private _materialService : MaterialService
    ) {}

    ngOnInit() {
        // this._materialService.dataView.subscribe(res => this.dataView = res);
    }

    ngOnChanges() {
        this._materialService.dataView.subscribe(res => {
            if(res) {
                this.dataView = [];
                var views = [];
                for(let d in res) {
                    views.push(res[d]);
                }
                console.log(views);
                // console.log(this.item);
                for(var i=0; i<views.length; i++) {
                    // search the valid item
                    if(views[i].value == true) {
                        for(var j=0; j<this.item.length; j++){
                            if(this.item[j].key == views[i].key)
                                this.dataView.push(this.item[j]);
                        }
                    }
                }
                // console.log(this.dataView);
            }
        });
    }
}