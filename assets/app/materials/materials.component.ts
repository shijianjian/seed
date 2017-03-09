import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MaterialService } from './materials.service';
import { ModalComponent } from '../common/modal.component'

@Component({
    selector: 'my-materials',
    templateUrl: './materials.component.html',
    providers: [
        MaterialService
    ]
})

export class MaterialsComponent implements OnInit, OnDestroy {

    data;

    @ViewChild('draglist') public draglist: ModalComponent;

    constructor(
        private _materialService: MaterialService
    ) { }

    ngOnInit() {
        this._materialService.data.subscribe(res => this.data = res);
    }

    ngOnDestroy() {
        this._materialService.data.unsubscribe();
    }

    showDataRendererModal() : void {
        this.draglist.showConfirmationModal();
    }

    onConfirm(e) : void {
        if(e.clicked == true)
            this.draglist.hideConfirmationModal();
    }
}