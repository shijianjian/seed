import { Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormItemControlService } from './form-item-control.service';
import { MaterialService } from '../../materials.service';

@Component({
    selector: 'my-form-list',
    templateUrl: 'form-list.component.html',
    providers: [ FormItemControlService ]
})

export class FormListComponent implements OnChanges {

    @Input() data;
    @Input() button;
    @Input() action;

    @Output() submit = new EventEmitter();

    materialsForm: FormGroup;

    constructor(
        private _materialService: MaterialService,
        private _formItemControlService: FormItemControlService
    ) { }
    
    ngOnChanges(dataChanges){
        this.materialsForm = this._formItemControlService.toFormGroup(this.data); 
    }

    onSubmit() {
        let payLoad = this.materialsForm.value;
        this.submit.emit({data: payLoad});
        // clear the form
        this.materialsForm.reset();
    }
   
}