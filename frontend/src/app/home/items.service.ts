import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUploadForm } from 'src/app/upload/models/upload-form';
import { DataService } from '../common/data.service';
import { Router } from '@angular/router';
import { IItem } from './models/item';
import { Observable, pipe, throwError } from 'rxjs';
import { IComment } from './models/comment';
import { catchError, map } from 'rxjs/operators';
import { NotFoundError } from '../common/errors/notfound';
import { BadInputError } from '../common/errors/badinput';
import { AppError } from '../common/errors/apperror';


@Injectable({
    providedIn: 'root'
})
export class ItemsService extends DataService {
    items: IItem[];
    selectedItem: IItem;

    constructor(http: HttpClient, private router: Router) {
        super(http, "http://localhost:5000/api/items/");
        this.items = [];
        this.selectedItem = null;
    }

    uploadFiles(uploadForm: IUploadForm) {
        let newData: FormData = new FormData();

        newData.append(uploadForm.exeFile.fileName, uploadForm.exeFile.fileData);
        uploadForm.imgFile.fileData['img'] = true;
        newData.append(uploadForm.imgFile.fileName, uploadForm.imgFile.fileData);
        newData.append('name', uploadForm.name);
        newData.append('vendorName', uploadForm.vendorName);
        newData.append('description', uploadForm.description);
        newData.append('accessToken', localStorage.getItem('accessToken'));

        return this.create(newData);
    }

    rate(itemId, rating) {
        let reqBody = Object.assign({ accessToken: localStorage.getItem('accessToken') }, rating);
        return this.update(itemId, reqBody, 'ratings/')
            .pipe(catchError(this.errorHandler));
    }

    getMyRating(itemId) {
        let reqBody = { accessToken: localStorage.getItem('accessToken') };
        return this.getWithReqBody(itemId, "userRating/", reqBody)
            .pipe(catchError(this.errorHandler));
    }



    getItems() {
        if (this.items.length) {
            return new Observable(subscriber => subscriber.next(this.items));
        } else {
            return this.getAll()
                .pipe(catchError(this.errorHandler))
                .pipe(map(
                    (items: IItem[]) => {
                        this.items = items;
                        this.modifyItemsData(items);
                        return this.items;
                    }
                ));
        }
    }

    getItem(itemId) {
        if (!this.selectedItem && this.items) {
            let items = this.items.filter(item => item._id === itemId);
            this.selectedItem = items ? items[0] : null;
        }
        if (this.selectedItem && (this.selectedItem._id === itemId)) {
            return new Observable((subscriber) => {
                subscriber.next(this.selectedItem)
            })
        } else {
            return this.get(itemId)
                .pipe(catchError(this.errorHandler))
                .pipe(map((item: any) => {
                    this.modifyItemsData([item]);
                    this.selectedItem = item;
                    return this.selectedItem;
                }));
        }
    }

    addComment(itemId, comment: IComment) {
        return this.update(itemId, comment, 'comments/')
            .pipe(catchError(this.errorHandler));
    }


    downloadFile(id) {
        return this.get(id, 'download/', { responseType: 'blob' })
            .pipe(catchError(this.errorHandler));
    }

    addItem(item: IItem) {
        this.modifyItemsData([item]);
        this.items.push(item);
    }

    private modifyItemsData(items) {
        let baseUrl = "http://www.localhost:5000/";
        const extractFileName = (path) => {
            let dirs = (path as string).split('/');
            let fileName = dirs[dirs.length - 1];
            return fileName;
        }

        items.forEach((item) => {
            item.imgFileSrc = baseUrl + extractFileName(item.imgFileSrc);
            item.exeFileSrc = extractFileName(item.exeFileSrc);
        });

    }

    private errorHandler(error) {
        if (error.status === 404) return throwError(new NotFoundError(error));
        if (error.status === 400 || error.status === 401) return throwError(new BadInputError(error));
        return throwError(new AppError(error));
    }

}
