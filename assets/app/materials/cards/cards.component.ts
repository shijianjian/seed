import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.component.html'
})

export class CardsComponent {
    @Input() data;
    @Input() action;
}