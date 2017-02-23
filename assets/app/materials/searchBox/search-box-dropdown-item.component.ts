import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { ContentEnum, ContentEnumDecorator } from '../enums';
import { DataRendererModalComponent } from '../dataRendererModal/data-renderer.component'
import { JsonObjectPipe } from '../../common/json-object.pipe';

@Component({
    selector: 'my-search-box-dropdown-item',
    template: `
        <a class="col-sm-12 input-group" *ngFor="let one of item" (click)="onClick(item)">
            <div class="col-sm-2 input-group-addon" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'">{{one.key}}</div>
            <div class="col-sm-10 form-control" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'"> {{one.value}}</div>
        </a>
        <my-data-renderer-modal
            #modal
            [container]="ContentEnum.TABLE"
            [data]="data" 
            [title]="modalTitle">
        </my-data-renderer-modal>
        `
})

@ContentEnumDecorator
export class SearchBoxDropdownItemComponent {
    @Input() item;
    // reminder: target is the text typed in the searchBox
    @Input() target;

    @ViewChild('modal') modal: DataRendererModalComponent;

    modalTitle = "Add it to Library";
    data = [];

    constructor( ){}

    onClick(data) {
        this.data = data;
        this.modal.showDataRendererModal();
    }

}