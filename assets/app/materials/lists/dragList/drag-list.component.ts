import { Component, Input, Output,EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { DragulaService } from 'ng2-dragula';

import { MaterialService } from '../../materials.service'

@Component({
    selector: 'my-drag-list',
    template: `
            <div [dragula]='"list-bag"' [dragulaModel]='dataView'>
                <ul class="list-group" *ngFor="let item of dataView">
                    <li 
                        class="list-group-item" 
                        [ngStyle]="{backgroundColor: item.value ? 'white' : 'gray'}" 
                        [innerHtml]="item.key|uppercase"
                        (click)="onclick(item)"></li>
                </ul>
                <br>
                <button type="button" class="btn btn-primary" (click)="confirm()">{{ button }}</button>
            </div>       
    `,
    providers: [DragulaService]
})
export class DragListComponent implements OnInit, OnDestroy {

    @Output() onConfirm = new EventEmitter();
    @Input() button = "Click me";

    dataView = [];

    constructor( 
        private _materialService: MaterialService,
        private _dragulaService: DragulaService
    ) { }

    ngOnInit() {
        this._materialService.dataView.subscribe(res => {
            this.dataView = res;
            for(let i=0; i<this.dataView.length; i++) {
                if(this.dataView[i].key == "id"){
                    this.dataView.splice(i,1);
                }
            }
        });
    }

    ngOnDestroy() {
        this._materialService.dataView.unsubscribe();
    }

    public onclick(item): void {
        let index = this.dataView.indexOf(item);
        this.dataView[index].value = !this.dataView[index].value;
    }

    confirm() : void {
        this._materialService.dataView.next(this.dataView);
        this.onConfirm.emit({clicked: true});
    }
}