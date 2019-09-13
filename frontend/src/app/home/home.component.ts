import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ItemsService } from './items.service';
import { IItem } from './models/item';
import { Router } from '@angular/router';
import { NotFoundError } from '../common/errors/notfound';

@Component({

    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    items: IItem[];

    constructor(private itemsService: ItemsService, private router: Router) { }

    ngOnInit() {
        this.itemsService.getItems().subscribe((items: IItem[]) => {
            this.items = items;
        }, this.errorHandler);
    }

    private errorHandler = (error) => {
        if (error instanceof NotFoundError) {
            this.router.navigate(['404']);
        }
    }


}



// this.exeFiles = files.filter(file => !(path.basename(file).startsWith('img_')))
//         .map(this.extractFileName);

//         this.imgFiles = files.filter(file => (path.basename(file).startsWith('img_')))
//         .map(file => baseUrl + extractFileName(file));


//         let splitIntoLists = function (list, windowSize) {
//             let tmp2DList = [];
//             let tmpList = [];

//             list.forEach((_, indx) => {
//                 tmpList.push(list[indx]);
//                 if (tmpList.length == windowSize) {
//                     tmp2DList.push(tmpList);
//                     tmpList = [];
//                 }
//             })
//             if (tmpList.length)
//                 tmp2DList.push(tmpList)
//             return tmp2DList;
//         }
//         this.imgFiles = splitIntoLists(this.imgFiles, 3);
//         this.exeFiles = splitIntoLists(this.exeFiles, 3);
//         console.log(this.imgFiles)
