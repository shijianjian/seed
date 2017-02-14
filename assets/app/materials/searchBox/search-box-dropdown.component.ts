import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-search-box-dropdown',
    templateUrl: './search-box-dropdown.component.html'
})

export class SearchBoxDropdownComponent {
    @Input() data;
    @Input() target;
}