import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ItemsService } from 'src/app/home/items.service';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { IItem } from '../models/item';
import { Router } from '@angular/router';
import { NotFoundError } from 'src/app/common/errors/notfound';


@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent {
    @Input('item') item: IItem;

    constructor(public itemsService: ItemsService, private router: Router, public dialog: MatDialog) { }


    saveFile() {
        ++this.item.downloadsNum;
        this.itemsService.downloadFile(this.item._id)
            .subscribe((fileBlob) => {
                saveAs(fileBlob, this.item.exeFileSrc.split('_').pop());
            }, this.errorHandler);

    }

    private errorHandler = (error) => {
        --this.item.downloadsNum;
        if (error instanceof NotFoundError) {
            this.router.navigate(['404']);
        }
    }

}


    // openDialog(): Observable<any> {

    //     const dialogRef = this.dialog.open(FileInfoComponent, {
    //         width: '30%',
    //         data: { defaultFileName: this.exeFileSrc.split('_').pop() }
    //     });
    //     return dialogRef.afterClosed();
    // }


    // dataURLtoFile(dataurl, filename, format) {
    //     const arr = dataurl.split(',');
    //     const mime = arr[0].match(/:(.*?);/)[1];
    //     const bstr = atob(arr[1]);
    //     let n = bstr.length;
    //     const u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     saveAs(new File([u8arr], filename, { type: format }));
    // }