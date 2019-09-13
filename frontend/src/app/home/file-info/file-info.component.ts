import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-file-info',
    templateUrl: './file-info.component.html',
    styleUrls: ['./file-info.component.css'],
})
export class FileInfoComponent {


    constructor(
        public dialogRef: MatDialogRef<FileInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


}
