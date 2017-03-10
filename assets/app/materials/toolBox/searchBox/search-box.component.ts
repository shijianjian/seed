import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-search-box',
    template:`
        <input 
            #search
            id="search"
            class="form-control"
            type="text" 
            (focus)="onFocus()"
            (blur)="onBlur()"
            placeholder="Search...">

            <my-search-box-dropdown 
                    class="list-group"
                    [target]="targetSearch"
            ></my-search-box-dropdown>
    `
})

export class SearchBoxComponent implements OnInit, AfterViewInit {

    @ViewChild('search') search: ElementRef;
    @Output() useless = new EventEmitter();

    targetSearch = "";
    
    constructor(private _materialService: MaterialService){ }

    ngOnInit(){
        this._materialService.data
                        .subscribe(() => this._materialService.clearSearchData());
        
        // get data through keyup event.
        let keyups = Observable.fromEvent(this.search.nativeElement, "keyup")
                                .map(e => {
                                    let eventObj: MSInputMethodContext = <MSInputMethodContext> e
                                    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
                                    this.targetSearch = target.value;
                                    return this.targetSearch;
                                });
        keyups.debounceTime(300)
                .distinctUntilChanged()
                .subscribe(searchTerm => {
                    this._materialService.getDataByName(searchTerm);
                });
    }

    ngAfterViewInit() {
        this.search.nativeElement.focus();
    }

    onFocus() : void {
        this._materialService.getDataByName(this.targetSearch);
    }

    onBlur() : void {
        if(this.targetSearch == "") {
            this.useless.emit({clicked: true});
        }
    }

}