import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-table-list',
    template: `
            <table class="table table-hover">
                <tr class="card-text" *ngFor="let line of item">
                    <td *ngIf="line.key != 'id'">{{line.key | uppercase}}:</td> 
                    <td *ngIf="line.key != 'id'">{{line.value}}</td>
                </tr>
            </table>
    `
})

export class TableListComponent{
    @Input() item;
}