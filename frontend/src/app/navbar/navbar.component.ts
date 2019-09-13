import { Component } from '@angular/core';
import { UsersService } from '../user/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    toCollapse = true;
    constructor(public usersService: UsersService, private router: Router) {
    }

    signout() {
        this.usersService.signout();
        this.router.navigate(['/'])
    }

}
