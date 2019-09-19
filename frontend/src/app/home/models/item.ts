import { IComment } from './comment';

export interface IItem {
    _id: any;
    name: string,
    vendorName: string,
    desciption: string,
    imgFileSrc: string,
    exeFileSrc: string,
    exeFileSize: number,
    downloadsNum: number,
    comments: IComment[],
    rating: {
        num: number,
        ratingsSum: number
    }
}

export function makeItem() {
    return Object.assign({}, {
        _id: '',
        name: '',
        vendorName: '',
        desciption: '',
        imgFileSrc: '',
        exeFileSrc: '',
        exeFileSize: 0,
        downloadsNum: 0,
        comments: [],
        rating: {
            num: 0,
            ratingsSum: 0
        }
    });
}