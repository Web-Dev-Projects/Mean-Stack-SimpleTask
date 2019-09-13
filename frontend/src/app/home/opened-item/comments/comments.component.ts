import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../../items.service';
import { IComment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/user/users.service';


@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    @Input('comments') comments: IComment[] = [];
    private itemId: string;

    constructor(private itemsService: ItemsService, private usersService: UsersService, route: ActivatedRoute) {
        this.itemId = route.snapshot.paramMap.get('itemId');
    }

    save(textarea) {
        let comment = {
            username: this.usersService.userName,
            text: textarea.value
        };

        this.comments.unshift(comment);
        this.itemsService.addComment(this.itemId, comment)
            .subscribe(null, (err) => this.comments = this.comments.filter(com => com !== comment));

        textarea.value = '';
    }

}
