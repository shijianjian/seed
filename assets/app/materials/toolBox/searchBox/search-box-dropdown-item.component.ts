import { Component, Input } from '@angular/core';

import { MaterialsEventService } from '../../materials.event.service';

@Component({
    selector: 'my-search-box-dropdown-item',
    template: `
        <a class="col-sm-12 input-group my-search-list" *ngFor="let one of item" (click)="onClick(item)">
            <div class="col-sm-5 input-group-addon my-search-list-item" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'">{{one.key}}</div>
            <div class="col-sm-7 form-control my-search-list-item" *ngIf="one.value && one.value.toUpperCase().indexOf(target.toUpperCase())>-1 && target!='' && one.key.toUpperCase()!='ID'"> {{one.value}}</div>
        </a>
        `
})

export class SearchBoxDropdownItemComponent {
    @Input() item;
    // reminder: target is the text typed in the searchBox
    @Input() target;

    data = [];

    constructor(
        private _materialEventService: MaterialsEventService
    ){}

    onClick(data) : void {
        this._materialEventService.updateData(data);
    }

}