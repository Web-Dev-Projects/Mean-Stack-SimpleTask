import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { UsersService } from 'src/app/user/users.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

    constructor(private usersService: UsersService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.usersService.isSigendIn) {
            return true;
        }

        this.router.navigate(["/signin"], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
