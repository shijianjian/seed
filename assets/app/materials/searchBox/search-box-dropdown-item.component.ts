import { Component, Input, ViewChild } from '@angular/core';

import { MaterialService } from '../materials.service';
import { ModalComponent } from '../../common/modal.component';
import { JsonObjectPipe } from '../../common/json-object.pipe';

@Component({
    selector: 'my-search-box-dropdown-item',
    template: `
        <a class="col-sm-12 input-group my-search-list" *ngFor="let one of item" (click)="onClick(item)">
            <div class="col-sm-2 input-group-addon my-search-list-item" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'">{{one.key}}</div>
            <div class="col-sm-10 form-control my-search-list-item" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'"> {{one.value}}</div>
        </a>
        <my-modal [title]="title" #modal>
            <div class="modal-body">
                <my-table-list
                    [item]="data"
                ></my-table-list>
                <button class="btn btn-primary" type="button" (click)="addClick()">Add</button>
            </div>
        </my-modal>
        `
})

export class SearchBoxDropdownItemComponent {
    @Input() item;
    // reminder: target is the text typed in the searchBox
    @Input() target;

    @ViewChild('modal') modal: ModalComponent;

    title = "Add it to Library";
    data = [];

    constructor( 
        private _materialService: MaterialService
    ){}

    onClick(data) {
        this.data = data;
        this.modal.showConfirmationModal();
    }

    addClick() {
        this._materialService.addData(new JsonObjectPipe().transform(this.data));
        this.modal.hideConfirmationModal();
    }

}