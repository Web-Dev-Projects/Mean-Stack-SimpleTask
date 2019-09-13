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
