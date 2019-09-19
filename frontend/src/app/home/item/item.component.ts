import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ItemsService } from 'src/app/home/items.service';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { IItem, makeItem } from '../models/item';
import { Router } from '@angular/router';
import { NotFoundError } from 'src/app/common/errors/notfound';


@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent {
    @Input('item') item: IItem = makeItem();

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