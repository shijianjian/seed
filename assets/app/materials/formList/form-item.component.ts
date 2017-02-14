import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
  selector: 'my-form-item',
  templateUrl: './form-item.component.html'
})

export class FormItemComponent {
  @Input('data') item;
  @Input() form: FormGroup;
  
  get isValid() { return this.form.controls[this.item.key].valid; }
}