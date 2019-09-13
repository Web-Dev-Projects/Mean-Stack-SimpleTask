import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'ExtractFileName'
})
export class ExtractFileNamePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (!value) return null;

        let dirs = (value as string).split('/');
        let fileName = dirs[dirs.length - 1];
        return fileName;
    }

}