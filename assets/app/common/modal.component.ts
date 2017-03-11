import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'my-modal',
    templateUrl: `
        <div bsModal #modal="bs-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left col-sm-11">{{ title }}</h4>
                        <button type="button" class="close pull-right col-sm-1" aria-label="Close" (click)="hideConfirmationModal()">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div style="padding-left: 30px; padding-right: 30px;">
                        <ng-content class="modal-body"></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ModalComponent {

    @Input() title;

    @ViewChild('modal') public modal:ModalDirective;
 
    public showConfirmationModal():void {
        this.modal.show();
    }
    
    public hideConfirmationModal():void {
        this.modal.hide();
    }

}