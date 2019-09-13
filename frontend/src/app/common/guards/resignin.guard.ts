import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UsersService } from 'src/app/user/users.service';

@Injectable({
    providedIn: 'root'
})
export class ReSigninGuard implements CanActivate {
    constructor(private usersService: UsersService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.usersService.isSigendIn) {
            return this.router.parseUrl('/404')
        }
        return true;
    }
}
