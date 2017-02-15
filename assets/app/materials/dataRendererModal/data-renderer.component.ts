import { Component, ViewChild, Input, Output, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { MaterialService } from '../materials.service';
import { JsonObjectPipe } from '../../common/json-object.pipe';
 
@Component({
  selector: 'my-data-renderer-modal',
  templateUrl: './data-renderer.component.html'
})

export class DataRendererModalComponent {
    @Input() title;
    @Input() data;
    @Input() container;
    @Input() action;

    @ViewChild('dataRenderModal') public dataRenderModal: ModalDirective;

    constructor(private _materialService: MaterialService) {  }

    submitHandler(e){
        if(e.submitted == true){
            this.hideDataRendererModal();
        }
    }

    addClick() {
        this._materialService.addData(new JsonObjectPipe().transform(this.data));
        this.hideDataRendererModal();
    }

    public showDataRendererModal():void {
        this.dataRenderModal.show();
    }
    
    public hideDataRendererModal():void {
        this.dataRenderModal.hide();
    }
}