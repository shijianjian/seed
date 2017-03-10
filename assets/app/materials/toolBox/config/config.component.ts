/**
 * Created by shijian on 10/03/2017.
 */
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'my-config',
    template: `
        <h5>Sort & Select</h5>
        <div #draglist style="color: black;">
            <my-drag-list 
                class="modal-body"
                [button]="'Confirm'"
                (onConfirm)="onConfirm($event)"></my-drag-list>
        </div>
    `
})

export class ConfigComponent {
    @Output() useless = new EventEmitter();

    onConfirm(e) {
        this.useless.emit({clicked: e.clicked});
    }
}
