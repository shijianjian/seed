import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormItemControlService {
  constructor() { }

  toFormGroup(data) {
    let group: any = {};

    let keys = [];
    for (let key in data) {
      keys.push({key: key, value: data[key]});
    }

    keys.forEach(item => {
      group[item.key] = new FormControl(item.value || '');
    });
    
    return new FormGroup(group);
  }
}
