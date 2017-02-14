import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'objs'})
export class JsonObjectPipe implements PipeTransform {
  transform(value) : any {
    var map = new Object()
    for(var i=0; i<value.length; i++) {
      for (let key in value[i]) {
        map[value[i].key]=value[i].value;
      }
    }
    return map;
  }
}