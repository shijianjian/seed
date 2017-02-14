import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-search-box',
    templateUrl: './search-box.component.html'
})

export class SearchBoxComponent implements OnInit, OnDestroy {

    @ViewChild('search') search: ElementRef;

    materials;
    loading = true;
    targetSearch = "";
    
    constructor(private _materialService: MaterialService){ }

    ngOnInit(){
        this._materialService.search.subscribe(res => this.materials = res);
        this._materialService.data
                        .subscribe(() => this._materialService.clearSearchData());
    
        var keyups = Observable.fromEvent(this.search.nativeElement, "keyup")
                                .map(e => {
                                    this.targetSearch = e.target.value;
                                    return this.targetSearch;
                                })
                                .debounceTime(300)
                                .distinctUntilChanged()
                                .subscribe(searchTerm => {
                                    this._materialService.getDataByName(searchTerm);
                                });
    }

    ngOnDestroy() {
        this._materialService.search.unsubscribe();
    }

    onFocus() {
        this._materialService.getDataByName(this.targetSearch);
    }

}