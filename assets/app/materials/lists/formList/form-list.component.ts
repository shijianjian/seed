import { Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormItemControlService } from './form-item-control.service';

@Component({
    selector: 'my-form-list',
    templateUrl: 'form-list.component.html',
    providers: [ FormItemControlService ]
})

export class FormListComponent implements OnChanges {

    @Input() data;
    @Input() button;

    @Output() submit = new EventEmitter();

    materialsForm: FormGroup;

    constructor(
        private _formItemControlService: FormItemControlService
    ) { }
    
    ngOnChanges(dataChanges){
        this.materialsForm = this._formItemControlService.toFormGroup(this.data); 
    }

    onSubmit() : void {
        let payLoad = this.materialsForm.value;
        this.submit.emit({data: payLoad});
        // clear the form
        this.materialsForm.reset();
    }
   
}