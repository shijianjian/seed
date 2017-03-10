import { Component, Input } from '@angular/core';

@Component({
    selector: "my-nav",
    templateUrl: "./nav.component.html"
})

export class NavComponent {
    @Input() appName= "";
}