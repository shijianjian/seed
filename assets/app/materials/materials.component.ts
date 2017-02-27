import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MaterialService } from './materials.service';
import { ContentEnum, ContentEnumDecorator, ActionEnum, ActionEnumDecorator } from './enums';

import { DataRendererModalComponent } from './dataRendererModal/data-renderer.component';
import { DragListComponent } from './dragList/drag-list.component'

@Component({
    selector: 'my-materials',
    templateUrl: './materials.component.html',
    providers: [
        MaterialService
    ]
})

@ActionEnumDecorator
// @ContentEnumDecorator
export class MaterialsComponent implements OnInit, OnDestroy {

    // modalTitle = "Add New Data";
    // buttonName = "+";
    data;

    @ViewChild('modal') public modal: DataRendererModalComponent;
    @ViewChild('draglist') public draglist: DragListComponent;

    // contentEnum: any = ContentEnum;
    actionEnum: any = ActionEnum;

    constructor(
        private _materialService: MaterialService
    ) { }

    ngOnInit() {
        this._materialService.data.subscribe(res => this.data = res);
    }

    ngOnDestroy() {
        this._materialService.data.unsubscribe();
    }

    showDataRendererModal(){
        this.draglist.showConfirmationModal();
    }
}