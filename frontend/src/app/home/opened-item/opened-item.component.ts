import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { IItem, makeItem } from '../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from '../models/comment';
import { NotFoundError } from 'src/app/common/errors/notfound';

@Component({
    selector: 'app-opened-item',
    templateUrl: './opened-item.component.html',
    styleUrls: ['./opened-item.component.css']
})
export class OpenedItemComponent implements OnInit {
    item: IItem = makeItem();
    comments: IComment[] = [];

    constructor(private itemsService: ItemsService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let itemId = this.route.snapshot.paramMap.get('itemId');
        this.itemsService.getItem(itemId)
            .subscribe((item: IItem) => {
                this.item = item;
                this.comments = this.item.comments;
            }, this.errorHandler)
    }

    private errorHandler = (error) => {
        if (error instanceof NotFoundError) {
            this.router.navigate(['404']);
        }
    }

}
