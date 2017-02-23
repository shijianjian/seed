import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-table-list',
    template: `
            <table class="table table-hover col-sm-12">
                <tr class="" *ngFor="let line of item">
                    <td *ngIf="line.key != 'id'">{{line.key | uppercase}}:</td> 
                    <td *ngIf="line.key != 'id'">{{line.value}}</td>
                </tr>
            </table>
    `
})

export class TableListComponent{
    @Input() item;
}