import { setEditorContent } from "../main";

export class DirectoryController {
    private dirHandle: FileSystemDirectoryHandle | null = null;
    constructor(
        private dirViewArea: HTMLElement | null = document.getElementById('dirView')
    ) { }

    /** ディレクトリハンドルをセット */
    setDirHandle(handle: FileSystemDirectoryHandle) {
        this.dirHandle = handle;
        this.updateDirView();
        this.saveFile('.ntconfig.json', '{}');
    }

    /** ディレクトリ内容を一覧表示 */
    async updateDirView() {
        if (!this.dirHandle || !this.dirViewArea) return;

        this.dirViewArea.innerHTML = '';

        const fileNodes = await buildDataTree(this.dirHandle);
        const elements = renderDataTree(fileNodes);
        this.dirViewArea.replaceChildren(...elements);
    }

    async saveFile(fileName: string, content: string) {
        if (!this.dirHandle) return;
        const fileHandle = await this.dirHandle.getFileHandle(fileName, { create: true });

        // 2️⃣ 書き込み用ストリームを開く
        const writable = await fileHandle.createWritable();

        // 3️⃣ データを書き込む
        await writable.write(content);

        // 4️⃣ 保存して閉じる
        await writable.close();
    }

    async saveFileAs(content:string):Promise<string> {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'newNote.ntx', // 初期ファイル名
            types: [
                {
                    description: 'Notex file',
                    accept: { 'application/x-notex': ['.ntx'] } // 拡張子フィルタ
                }
            ]
        });

        // ファイルへ書き込む
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        return fileHandle.name;
    }

}

// ツリー構造を定義する型
interface FileNode {
    name: string;
    kind: 'file' | 'directory';
    handle: FileSystemHandle;
    children?: FileNode[]; // ディレクトリの場合のみ
}

// DirHandleからFileNodeの配列を返す関数
async function buildDataTree(currentHandle: FileSystemDirectoryHandle): Promise<FileNode[]> {
    const nodes: FileNode[] = [];

    for await (const [name, handle] of currentHandle.entries()) {
        const node: FileNode = {
            name: name,
            kind: handle.kind,
            handle: handle,
        };

        if (handle.kind === 'directory') {
            // 再帰的に子ノードを構築
            node.children = await buildDataTree(handle as FileSystemDirectoryHandle);
        }

        nodes.push(node);
    }

    return nodes;
}

// FileNodeの配列を受け取り、DOM要素の配列を返す関数
function renderDataTree(nodes: FileNode[]): HTMLElement[] {
    const elements: HTMLElement[] = [];

    for (const node of nodes) {
        let item: HTMLElement;

        if (node.kind === 'directory') {
            item = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = `📁 ${node.name}`;
            item.appendChild(summary);

            const detailsContent = document.createElement('div');
            detailsContent.classList.add('subitem');

            // 子ノードをレンダリングして追加
            for (const subitem of renderDataTree(node.children!)) {
                detailsContent.appendChild(subitem);
            }
            item.appendChild(detailsContent);
        } else {
            if (!node.name.endsWith('.ntx')) continue;
            item = document.createElement('div');
            item.textContent = `📄 ${node.name}`;
            item.onclick = async () => {
                // ファイルハンドルの型はFileNodeにあるため、ここで利用可能
                const fileHandle = node.handle as FileSystemFileHandle;
                const file = await fileHandle.getFile();
                const text = await file.text();
                console.log('ファイル内容:', text);
                setEditorContent(text);
            };
        }

        elements.push(item);
    }
    return elements;
}


