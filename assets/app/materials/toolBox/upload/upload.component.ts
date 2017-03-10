/**
 * Created by shijian on 10/03/2017.
 */
import { Component, ViewChild } from '@angular/core';

import { MaterialService } from '../../materials.service';

import { ModalComponent } from "../../../common/modal.component";

@Component({
    selector: 'my-upload',
    templateUrl: './upload.component.html',
    styles: [`
        .custom-file:hover {
            opacity: 0.5;
        }
    `]
})
export class UploadComponent{

    @ViewChild('myInput') fileInput;

    title = "";
    data;
    errorMessage = "For god's sake! Upload a CSV file please!!!!";
    fileIsValid = false;
    uploaded = false;

    constructor(
        private _materialService: MaterialService
    ) {}

    onFileChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
        this.data = files[0];
        this.title = this.data.name;
        this.fileIsValid = this.fileValidation();
    }

    onConfirm() : void {
        this._materialService.uploadFile(this.data);
        this.fileInput.nativeElement.value = "";
        this.title = "";
        this.uploaded = true;
    }

    fileValidation() : boolean {
        if(!this.title.endsWith(".csv")) {
            return false;
        }
        return true;
    }
}