import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { MaterialService } from './materials.service';
import { ContentEnum, ContentEnumDecorator, ActionEnum, ActionEnumDecorator } from './enums';

import { DataRendererModalComponent } from './dataRendererModal/data-renderer.component';

@Component({
    selector: 'my-materials',
    templateUrl: './materials.component.html'
})

@ActionEnumDecorator
@ContentEnumDecorator
export class MaterialsComponent implements OnInit, OnDestroy {

    modalTitle = "Add New Data";
    buttonName = "+";
    columns;
    data;

    @ViewChild('modal') public modal: DataRendererModalComponent;

    contentEnum: any = ContentEnum;
    actionEnum: any = ActionEnum;

    constructor(
        private _materialService: MaterialService
    ) { }

    ngOnInit() {
        this._materialService.data.subscribe(res => this.data = res);
        this._materialService.columns.subscribe(res => this.columns = res);
    }

    ngOnDestroy() {
        this._materialService.data.unsubscribe();
        this._materialService.columns.unsubscribe();
    }

    showDataRendererModal(){
        this.modal.showDataRendererModal();
    }
}