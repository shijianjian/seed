import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { ContentEnum, ContentEnumDecorator } from '../enums';
import { DataRendererModalComponent } from '../dataRendererModal/data-renderer.component'
import { JsonObjectPipe } from '../../common/json-object.pipe';

@Component({
    selector: 'my-search-box-dropdown-item',
    template: `
        <a *ngFor="let one of item">
            <td class="col-sm-5" (click)="onClick(item)" *ngIf="one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!=''">{{one.key}}</td>
            <td class="col-sm-7" (click)="onClick(item)" *ngIf="one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!=''">: {{one.value}}</td>
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