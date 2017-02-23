import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { MaterialService } from '../materials.service';
import { ContentEnum, ContentEnumDecorator } from '../enums';
// TODO: delete the line
import { ConfirmationModalComponent } from '../../common/confirmationModal.component';
import { DataRendererModalComponent } from '../dataRendererModal/data-renderer.component';


@Component({
    selector: 'my-card',
    templateUrl: './card.component.html'
})

@ContentEnumDecorator
export class CardComponent{
    @Input('data') item;
    @Input() isActive = false;
    @Output() activeCondition = new EventEmitter();
    @Output() deleteMessage = new EventEmitter();
    @Input() action;

    @ViewChild('cmodal') cmodal : ConfirmationModalComponent;
    @ViewChild('dmodal') dmodal : DataRendererModalComponent;
    
    modalTitle = "Edit & Save";
    anchorName = "Edit";

    briefing = "You will delete this card from your library.";
    checkMessage = "Delete from database. (Admin only)";

    constructor(private _materialService: MaterialService) {}

    onEdit() {
        this.dmodal.showDataRendererModal();
    }

    onDelete(e) {
        if(e.action == "delete") {
            if(e.checkbox == true) {
                this._materialService.deleteMaterial(e.data.id);
            }
            this._materialService.deleteData(e.data);
        }
    }

    deleteConfirmation() {
        this.cmodal.showConfirmationModal();
    }

    onClick(){
        this.isActive = !this.isActive;
        this.activeCondition.emit({ active: this.isActive });
    }
}