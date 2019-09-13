export interface IUploadForm {
    name: string,
    vendorName: string,
    description: string,
    exeFile: {
        fileData: File,
        fileName: string
    },
    imgFile: {
        fileData: File,
        fileName: string
    }
}
