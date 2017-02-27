import { Component, Output, Input, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from "../common/confirmationModal.component";
import { NavService } from './nav.service';

@Component({
    selector: "my-nav",
    templateUrl: "./nav.component.html",
    providers: [NavService]
})

export class NavComponent {

    @ViewChild('modal') modal: ConfirmationModalComponent;
    @ViewChild('myInput') fileInput;
    @Input() appName= "";
    @Output() fileChange;

    file: File;
    briefing;
    data;
    title="Upload file";
    buttonName = "Yes"

    constructor(private _navService: NavService) {}

    onFileChange(event: EventTarget) {
            let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
            let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
            let files: FileList = target.files;
            this.file = files[0];
            this.data = files[0];
            this.briefing = "Upload file " + this.data.name;
            this.modal.showConfirmationModal();
        }

    onConfirm(e) {
        this._navService.uploadFile(e.data);
        this.fileInput.nativeElement.value = "";
    }
}