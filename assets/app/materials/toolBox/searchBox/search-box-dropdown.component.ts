import { Component, Input, OnInit } from '@angular/core';
import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-search-box-dropdown',
    template: `
        <my-search-box-dropdown-item 
                    style="width: 100%;"
                    *ngFor="let item of data" 
                    [item]="item | keys" 
                    [target]="target">
        </my-search-box-dropdown-item>
    `

})

export class SearchBoxDropdownComponent implements OnInit {
    data;
    @Input() target;

    constructor(private _materialService: MaterialService){ }

    ngOnInit(){
        this._materialService.search.subscribe(res => {this.data = res; console.log(res)});
    }

}