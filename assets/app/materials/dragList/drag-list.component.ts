import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ModalDirective } from 'ng2-bootstrap';

import { MaterialService } from '../materials.service'

@Component({
    selector: 'my-drag-list-modal',
    template: `
        <div bsModal #modal="bs-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left col-sm-11">{{ title }}</h4>
                        <button type="button" class="close pull-right col-sm-1" aria-label="Close" (click)="hideConfirmationModal()">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" [dragula]='"list-bag"' [dragulaModel]='dataView'>
                        <ul class="list-group" *ngFor="let item of dataView">
                            {{items | json}}
                            <li 
                                class="list-group-item" 
                                [ngStyle]="{backgroundColor: item.value ? 'white' : 'gray'}" 
                                [innerHtml]="item.key|uppercase"
                                (click)="onclick(item)"></li>
                        </ul>
                        <br>
                        <button type="button" class="btn btn-primary" (click)="confirm()">{{ buttonName }}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [DragulaService]
})
export class DragListComponent implements OnInit, OnDestroy {

    title = "Data Filter";
    buttonName = "Confirm";
    dataView = [];

    @ViewChild('modal') public confirmationModal:ModalDirective;

    constructor( 
        private _materialService: MaterialService,
        private _dragulaService: DragulaService
    ) {
    }

    ngOnInit() {
        this._materialService.dataView.subscribe(res => {
            this.dataView = res;
            for(var i=0; i<this.dataView.length; i++) {
                if(this.dataView[i].key == "id"){
                    this.dataView.splice(i,1);
                }
            }
        });
    }

    ngOnDestroy() {
        this._materialService.dataView.unsubscribe();
    }
 
    public showConfirmationModal():void {
        this.confirmationModal.show();
    }
    
    public hideConfirmationModal():void {
        this.confirmationModal.hide();
    }

    public onclick(item): void {
        var index = this.dataView.indexOf(item);
        this.dataView[index].value = !this.dataView[index].value;
    }

    confirm() {
        this._materialService.dataView.next(this.dataView);
        this.hideConfirmationModal();
    }
}