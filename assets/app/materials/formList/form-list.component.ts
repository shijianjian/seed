import { Component, Input, Output, OnInit, OnChanges, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormItemControlService } from './form-item-control.service';
import { MaterialService } from '../materials.service';

@Component({
    selector: 'my-form-list',
    templateUrl: './form-list.component.html',
    providers: [ FormItemControlService ]
})

export class FormListComponent implements OnChanges {

    @Input() data;
    @Input() title;
    @Input() action;

    @Output() submitted = new EventEmitter();

    materialsForm: FormGroup;
    payLoad = '';
    err;

    constructor(
        private _materialService: MaterialService,
        private _formItemControlService: FormItemControlService
    ) { }

    ngOnChanges(dataChanges){
        this.materialsForm = this._formItemControlService.toFormGroup(this.data); 
    }

    ngOnInit() {
          
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.materialsForm.value);
        if(this.action == 0){
            this._materialService.createMaterial(this.payLoad);
            this.submitted.emit({ submitted: true});
        }

        if(this.action == 1) {
            this._materialService.updateMaterial(this.payLoad);
            this.submitted.emit({ submitted: true});
        }
    }
   
}