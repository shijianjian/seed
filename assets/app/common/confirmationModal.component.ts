import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
    selector: 'my-confirmation-modal',
    templateUrl: `
        <div bsModal #confirmationModal="bs-modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left col-sm-11">{{ title }}</h4>
                        <button type="button" class="close pull-right col-sm-1" aria-label="Close" (click)="hideConfirmationModal()">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ briefing }}</p>
                        <p *ngIf="checkbox">
                            <i
                                class="fa" 
                                [class.fa-check-square-o]="checked"
                                [class.fa-square-o]="!checked"
                                (click)="onClick()"
                                aria-hidden="true"
                                >
                            </i>
                            {{ checkbox }}
                        </p>
                        <button type="button" class="btn btn-primary" (click)="sendMessage()">{{ buttonName }}</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class ConfirmationModalComponent {

    @Input() title;
    @Input() briefing;
    @Input() buttonName;
    @Input() action;
    @Input() data;
    @Input() checkbox;
    @Input() checked = false;
    @Output() outwardMessage = new EventEmitter();

    @ViewChild('confirmationModal') public confirmationModal:ModalDirective;

    sendMessage() {
        this.outwardMessage.emit({action: this.action, checkbox: this.checked, data: this.data});
        this.confirmationModal.hide();
    }

    onClick() {
        this.checked = !this.checked;
    }
 
    public showConfirmationModal():void {
        this.confirmationModal.show();
    }
    
    public hideConfirmationModal():void {
        this.confirmationModal.hide();
    }

}