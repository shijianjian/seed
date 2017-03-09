import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-search-box',
    template:`
        <div class="row">
            <input 
                #search
                id="search"
                class="form-control"
                type="text" 
                (focus)="onFocus()"
                placeholder="Search..." 
                [(ngModel)]="searchBox"
                name="searchBox">

                <my-search-box-dropdown 
                        class="list-group"
                        [target]="targetSearch"
                ></my-search-box-dropdown>
                
            </div>
    `
})

export class SearchBoxComponent implements OnInit, OnDestroy {

    @ViewChild('search') search: ElementRef;

    keyups;
    targetSearch = "";
    
    constructor(private _materialService: MaterialService){ }

    ngOnInit(){
        this._materialService.data
                        .subscribe(() => this._materialService.clearSearchData());
        
        // get data through keyup event.
        var keyups = Observable.fromEvent(this.search.nativeElement, "keyup")
                                .map(e => {
                                    this.targetSearch = e.target.value;
                                    return this.targetSearch;
                                });
        keyups.debounceTime(300)
                .distinctUntilChanged()
                .subscribe(searchTerm => {
                    this._materialService.getDataByName(searchTerm);
                });
    }

    ngOnDestroy() {
        this.keyups.unsubscribe();
    }

    onFocus() {
        this._materialService.getDataByName(this.targetSearch);
    }

}