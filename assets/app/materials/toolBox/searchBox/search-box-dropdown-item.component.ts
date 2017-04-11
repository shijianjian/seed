import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { MaterialsEventService } from '../../materials.event.service';
import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-search-box-dropdown-item',
    template: `
        <a class="my-search-group" *ngFor="let one of item" (click)="onClick(item)">
            <div class="input-group my-search-list">
                <div 
                    class="input-group-addon my-search-list-item" 
                    style="flex:5"
                    [class.majorData]="one.key == majorData.key"
                    *ngIf="
                        one.key.trim().toLowerCase() == majorData.key.trim().toLowerCase()"> {{one.key}}</div>
                <div 
                    class="form-control my-search-list-item" 
                    style="flex:7"
                    [class.majorData]="one.key == majorData.key"
                    *ngIf="
                        one.key.trim().toLowerCase() == majorData.key.trim().toLowerCase()"> {{one.value}}</div>
            </div>
            <div *ngFor="let t of targetList" >
                <div class="input-group my-search-list"
                        *ngIf="(displayOtherDropdownItems | async) && showupData(one, t, majorData)">
                    <div 
                        class="input-group-addon my-search-list-item" 
                        style="flex:5"> {{one.key}}</div>
                    <div 
                        class="form-control my-search-list-item" 
                        style="flex:7"> {{one.value}}</div>
                </div>
            </div>
        </a>
        `,
        styles: [`
            .majorData {
                font-weight: 900
            }
        `]
})

export class SearchBoxDropdownItemComponent implements OnChanges, OnInit {
    @Input() item;
    // reminder: target is the text typed in the searchBox
    @Input() target : string;

    data = [];
    majorData: any;
    targetList = [];
    displayOtherDropdownItems;

    constructor(
        private _materialEventService: MaterialsEventService,
        private _materialService : MaterialService
    ){}

    ngOnInit() {
        this.displayOtherDropdownItems = this._materialEventService.displayOtherDropdownItems;
    }

    ngOnChanges() {
        this.targetList = this.reduceDuplication(this.target.trim().split(" "))
        this.getMajorData();
    }

    reduceDuplication(list: string[]) : string[] {
        return list = list.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) == index;
        });
    }

    onClick(data) : void {
        this._materialEventService.updateData(data);
    }

    getMajorData() : void {
        let dataview = this._materialService.dataView.getValue();
        for(let i=0; i<dataview.length; i++) {
            if((<any>dataview[i]).key != 'id' && (<any>dataview[i]).value == true) {
                this.majorData = dataview[i];
                break;
            }
        } 
    }

    showupData(one, t, majorData) : boolean {
        return (
            one.value
            && one.value.toUpperCase().indexOf(t.toUpperCase())>-1 
            && majorData
            && majorData.key
            && one.key.trim().toLowerCase() != majorData.key.trim().toLowerCase()
            && one.key 
            && one.key != majorData.key
            && t!='' 
            && one.key.toUpperCase()!='ID'
            
        )
    }
}