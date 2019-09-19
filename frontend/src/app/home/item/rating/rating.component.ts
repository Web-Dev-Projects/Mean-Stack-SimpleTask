import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ItemsService } from '../../items.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { UsersService } from 'src/app/user/users.service';
import { NotFoundError } from 'src/app/common/errors/notfound';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {

    @Input('starsNum') starsNum = 5;
    @Input('totalRating') totalRating: { num: number, ratingsSum: number };

    private itemId: string;
    private lastOffset = 0;
    private userRating: number;
    private uploadRatingTimer = undefined;

    fixRating = false;
    loading = false;
    stars = [];


    constructor(private itemService: ItemsService, private userService: UsersService, private router: Router, route: ActivatedRoute) {
        this.starsNum = Math.max(1, this.starsNum);
        this.stars = new Array(this.starsNum);
        this.itemId = route.snapshot.paramMap.get('itemId');
        this.fixRating = this.itemId ? false : true;


        if (this.fixRating === false) {
            this.loading = true;
        }
    }


    ngOnChanges() {
        if (this.fixRating)
            this.updateRate();
    }

    ngOnInit() {
        if (this.fixRating === false && this.userService.isSignedIn) {
            this.itemService.getMyRating(this.itemId)
                .subscribe((rating: any) => {
                    this.userRating = rating;
                    this.loading = false;
                    this.updateRate();
                }, this.errorHandler)
        }
    }

    rate(offset) {
        if (this.fixRating === false && this.loading === false) {

            if (offset == this.lastOffset) {
                this.lastOffset = 0;
                this.userRating = 0;
            } else {
                this.userRating = offset / this.starsNum;
                this.lastOffset = offset;
            }

            if (this.uploadRatingTimer) {
                clearTimeout(this.uploadRatingTimer);
            }

            this.updateRate();
            this.uploadRatingTimer = setTimeout(() => {
                this.itemService.rate(this.itemId, { username: this.userService.userName, value: this.userRating })
                    .subscribe(() => {
                        console.log("rating changed")
                    }, this.errorHandler);
            }, 2000);
        }

    }


    private updateRate() {
        let ratingAvg = 0;

        if (this.fixRating) {
            ratingAvg = (this.totalRating && (this.totalRating.num)) ? this.totalRating.ratingsSum / this.totalRating.num : 0;
        } else {
            ratingAvg = this.userRating;
        }

        let starsSum = Math.floor(this.starsNum * ratingAvg);
        this.lastOffset = starsSum;

        for (let i = 0; i < this.starsNum; i++) {
            this.stars[i] = Math.min(1, starsSum);
            starsSum = Math.max(0, starsSum - 1);
        }
    }

    private errorHandler = (error) => {
        if (error instanceof NotFoundError) {
            this.router.navigate(['404']);
        }
        this.updateRate();
    }

}
