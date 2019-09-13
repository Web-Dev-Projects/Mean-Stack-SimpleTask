import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    form: FormGroup;

    constructor(private router: Router, private usersService: UsersService, private activeRoute: ActivatedRoute) {
        this.form = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
        });
    }

    get username(): FormControl { return this.form.get('username') as FormControl; }
    get password(): FormControl { return this.form.get('password') as FormControl; }

    signin() {
        this.usersService.signin(this.username.value, this.password.value)
            .subscribe(() => {
                let returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || '/';
                this.router.navigate([returnUrl]);
            }, (err) => {
                this.form.setErrors({ 'unauthenticated': true });
            });
    }

    getErrorsMsgs(field, fieldName: string) {
        let areAllTouched = (field) => {
            let allTouched = true;
            if (field instanceof FormGroup) {
                let controls = (field as FormGroup).controls;
                Object.keys(controls).forEach((ctrlName) => {
                    allTouched = allTouched && controls[ctrlName].touched;
                })
                return allTouched;
            } else {
                return field.touched;
            }
        }


        if (!(field.errors) || !areAllTouched(field))
            return [];

        let errors = field.errors;
        let errorsMsgs = [];

        Object.keys(errors)
            .forEach((errName) => {
                switch (errName) {
                    case "minlength":
                        errorsMsgs.push(fieldName + "'s minimum length is " + errors[errName].requiredLength)
                        break;
                    case "required":
                        errorsMsgs.push(fieldName + " is required.")
                        break;
                    case "unauthenticated":
                        errorsMsgs.push(" username or/and password is wrong.")
                        break;
                    default:
                        break;
                }
            })

        return errorsMsgs;

    }
}
