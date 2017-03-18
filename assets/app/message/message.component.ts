/**
 * Created by shijian on 18/03/2017.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'my-message',
    template: `
        <div 
            class="alert"
            [class.alert-success]="alertType == 'success'"
            [class.alert-info]="alertType == 'info'"
            [class.alert-warning]="alertType == 'warning'"
            [class.alert-danger]="alertType == 'danger'"
            >
            <strong>Success!</strong> Indicates a successful or positive action.
        </div>
    `
})

export class MessageComponent {
    alertType;


}