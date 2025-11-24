import { nanoid } from 'nanoid';
import { composeHtml } from './htmlComposer';

type OpenedFile = {
    id: string,
    name: string,
    fileSystemFileHandle: FileSystemFileHandle,
    isChanged: boolean
}

export class FileTabController {
    private openedFiles: OpenedFile[] = [];
    private focusedFileId: string | null = null;
    constructor(private tabArea: HTMLDivElement) { }
    get isAllFileSaved() {
        return this.openedFiles.every(file => !file.isChanged)
    }
    openFile(fileHandle: FileSystemFileHandle) {
        this.openedFiles.push({
            id: nanoid(8),
            fileSystemFileHandle: fileHandle,
            name: fileHandle.name,
            isChanged: false
        });
    }
    closeFile(fileId: string) {
        this.openedFiles = this.openedFiles.filter(of => {
            return of.id !== fileId;
        })
    }
    switchTab(fileId: string) {
        this.focusedFileId = fileId;

    }
    // updateActiveContent(newContent: string) {

    // }
    /*
<div class="tab ntx" id="fileName">
            名称未設定
            <div class="unsaved"><i class="fa-solid fa-circle"></i></div>
          </div>
    */
    renderTabs() {
        this.tabArea.replaceChildren(...this.openedFiles.map(of => {
            return composeHtml({
                class: 'tab ntx',
                children: [
                    {
                        tag: 'span',
                        text: of.name
                    },
                    {
                        class: 'close',
                        children: [
                            {
                                tag: 'i',
                                class: 'fa-solid fa-xmark' + of.id === this.focusedFileId ? ' focused' : ''
                            }
                        ]
                    }
                ]
            }).html;
        }))
    }
}