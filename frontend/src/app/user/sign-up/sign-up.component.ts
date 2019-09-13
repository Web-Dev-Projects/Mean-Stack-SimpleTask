import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    form: FormGroup;

    constructor(private usersService: UsersService, private router: Router) {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.minLength(3)]),
            passwordGroup: new FormGroup({
                password: new FormControl(''),
                confPassword: new FormControl('')
            }, [this.passwordGroupValidator])
        });
    }

    get username(): FormControl { return this.form.get('username') as FormControl; }
    get password(): FormControl { return this.form.get('passwordGroup').get('password') as FormControl; }
    get confPassword(): FormControl { return this.form.get('passwordGroup').get('confPassword') as FormControl; }
    get passwordGroup(): FormGroup { return this.form.get('passwordGroup') as FormGroup; }

    signup() {
        this.usersService.singup(this.username.value, this.password.value)
            .subscribe(() => {
                this.usersService.signin(this.username.value, this.password.value)
                    .subscribe(() => {
                        this.router.navigate(['/']);
                    })
            });
    }


    private passwordGroupValidator(control: AbstractControl) {
        let pws1 = control.get('password').value;
        let pws2 = control.get('confPassword').value;
        let err: any = {};

        if (pws1.length < 4) {
            err.minlength = { requiredLength: 4 };
        } else {
            if (pws1 !== pws2) {
                err.passwordMismatch = true;
            }
        }

        return (err === {}) ? null : err;
    }



    getErrorsMsgs(field, fieldName: string) {
        let areAllTouched = (field) => {
            let allTouched = true;
            if (field instanceof FormGroup) {
                let controls = (field as FormGroup).controls;
                Object.keys(controls).forEach((ctrlName) => {
                    allTouched = allTouched && controls[ctrlName].touched;
                })
                return allTouched
            } else {
                return field.touched;
            }
        }

        if (field.valid || !areAllTouched(field))
            return [];

        let errors = field.errors;
        console.log(errors)

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
                    case "passwordMismatch":
                        errorsMsgs.push("passwords don't match")
                        break;
                    default:
                        break;
                }
            })

        return errorsMsgs;

    }


}