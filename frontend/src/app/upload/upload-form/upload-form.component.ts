import { Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { ItemsService } from 'src/app/home/items.service';
import { IUploadForm } from '../models/upload-form';
import { Router } from '@angular/router';
import { IItem } from 'src/app/home/models/item';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {
    form: FormGroup;
    exeFiles = [];
    imgFiles = [];

    constructor(private itemsService: ItemsService, private router: Router) {
        this.form = new FormGroup({
            name: new FormControl(''),
            vendorName: new FormControl(''),
            exeFileName: new FormControl('', [this.makeFileValidator('exe')]),
            imgFileName: new FormControl('', [this.makeFileValidator('png')]),
        });
    }

    get name() { return this.form.get('name'); };
    get vendorName() { return this.form.get('vendorName'); };
    get exeFileName() { return this.form.get('exeFileName'); };
    get imgFileName() { return this.form.get('imgFileName'); };

    submit() {
        if (!(this.form.errors)) {
            let data: IUploadForm = {
                name: this.name.value,
                vendorName: this.vendorName.value,
                description: "This is very very very very very long desciription",
                exeFile: { fileData: this.exeFiles[0], fileName: this.exeFiles[0].name },
                imgFile: { fileData: this.imgFiles[0], fileName: this.imgFiles[0].name }
            }

            this.itemsService.uploadFiles(data)
                .subscribe((item: IItem) => {
                    this.itemsService.addItem(item);
                    this.router.navigate(['/']);
                });
        }
    }


    getErrorsMsgs(field, fieldName: string) {
        if (!(field.errors) || !(field.touched))
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
                    case "wrongExetention":
                        errorsMsgs.push(`${fieldName} should have ${errors[errName].requiredExetention} exetetion`)
                        break;
                    case "wrongFilesNum":
                        errorsMsgs.push(`only ${errors[errName].requiredFilesNum} file(s) can be chosen`)
                        break;
                }
            })

        return errorsMsgs;
    }

    private makeFileValidator(exetention) {
        return function (control: AbstractControl) {
            if (!(control.value)) return { required: { required: true } };
            else if (control.value instanceof Array && control.value.length > 1) return { wrongFilesNum: { requiredFilesNum: 1 } }

            let fielExt = control.value.split(".").reverse()[0];

            if (fielExt != exetention) {
                return { wrongExetention: { requiredExetention: exetention } };
            } else {
                return null;
            }
        }
    }
}
