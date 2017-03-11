import { Component, OnInit, OnDestroy } from '@angular/core';

import { MaterialService } from './materials.service';
import { MaterialsEventService } from './materials.event.service';

@Component({
    selector: 'my-materials',
    templateUrl: './materials.component.html',
    providers: [
        MaterialService,
        MaterialsEventService
    ]
})

export class MaterialsComponent implements OnInit, OnDestroy {

    data;

    constructor(
        private _materialService: MaterialService
    ) { }

    ngOnInit() {
        this._materialService.data.subscribe(res => this.data = res);
    }

    ngOnDestroy() {
        this._materialService.data.unsubscribe();
    }
}