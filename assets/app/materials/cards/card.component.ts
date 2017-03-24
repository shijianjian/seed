import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { MaterialService } from '../materials.service';
import { AuthService } from '../../auth/auth.service';

import { JsonObjectPipe } from '../../common/json-object.pipe';
import { ModalComponent } from '../../common/modal.component';

@Component({
    selector: 'my-card',
    templateUrl: './card.component.html'
})

export class CardComponent{
    @Input('data') item;
    checked = false;
    scope = [];

    @ViewChild('cmodal') cmodal : ModalComponent;
    @ViewChild('dmodal') dmodal : ModalComponent;

    briefing = "You will delete this card from your library.";
    checkbox = "Delete from database. (Careful)";

    constructor(
        private _materialService: MaterialService,
        private _authService : AuthService
    ) { }

    ngOnInit() {
        this._authService.scope
            .subscribe(scope => {
                this.scope = scope;
            });
    }

    ngOnDestroy() {
        this._authService.scope.unsubscribe();
    }

    onEdit() {
        this.dmodal.showConfirmationModal();
    }

    onDelete() {
        let data = new JsonObjectPipe().transform(this.item)
        if(this.checked == true) {
            this._materialService.deleteMaterial(data.id);
        }
        this._materialService.deleteData(data);
        this.cmodal.hideConfirmationModal();
    }

    onSave(e){
        this._materialService.updateMaterial(e.data);
    }

    deleteConfirmation() {
        this.cmodal.showConfirmationModal();
    }

    onCheck(){
        this.checked = !this.checked;
    }
}