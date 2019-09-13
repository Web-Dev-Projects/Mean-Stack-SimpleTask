import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';
import { map } from "rxjs/operators"
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends DataService {
    constructor(http: HttpClient) { super(http, "http://localhost:5000/api/users/"); }

    singup(username: string, password: string) {
        return this.create({ username: username, password: password }, 'signup/');
    }

    signin(username: string, password: string) {
        return this.create({ username: username, password: password }, 'signin/')
            .pipe(map((res: any) => {
                if (res.accessToken) {
                    localStorage.setItem('accessToken', res.accessToken);
                }
            }));
    }

    signout() {
        localStorage.removeItem('accessToken');
    }

    get userName() {
        return (this.isSigendIn) ?
            new JwtHelperService().decodeToken(localStorage.getItem('accessToken')).username : "Anonymous";
    }

    get isSigendIn(): boolean {
        return localStorage.getItem('accessToken') ? true : false;
    }
}
