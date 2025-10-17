type OpenedFile = {
    id: string,
    name: string,
    fileSystemFileHandle: FileSystemFileHandle,
    isChanged: boolean
}

class FileTabController {
    private openedFiles: OpenedFile[] = [];
    constructor() { }
    get isAllFileSaved() {
        return this.openedFiles.every(file=>!file.isChanged)
    }
    openFile(fileHandle: FileSystemFileHandle) {

    }
    closeFile(fileId: string) {

    }
    switchTab(fileId:string) {

    }
    updateActiveContent(newContent: string) {

    }
}