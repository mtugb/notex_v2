import { ComplementController } from "./lib/complement";
import { DirectoryController } from "./lib/directryController";
import { FocusController } from "./lib/focusController";
import { keyEventMap } from "./lib/keyeventsMapper";
import { focus, getRange, getStartContainer } from "./lib/rangeUtils";

const editor = document.getElementById('editor') as HTMLDivElement;
let fileName: string | null = null;
const complementArea = document.getElementById('complement') as HTMLUListElement;
const complementController = new ComplementController(editor, complementArea);
const directoryController = new DirectoryController();
const focusController = new FocusController();

editor.addEventListener('keydown', e => {
    if (editor.innerHTML.trim() === '<div class="row"><br></div>') {
        if (e.key === 'Backspace') e.preventDefault();
    }

    if (e.key in keyEventMap) {
        keyEventMap[e.key](e, complementController, focusController);
    }

    (async () => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            try {
                if (fileName) {
                    directoryController.saveFile(fileName, editor.innerHTML);
                } else {
                    fileName = await directoryController.saveFileAs(editor.innerHTML);
                    fileNameArea.textContent = fileName;
                }
            } catch (error) {
                console.error({ '保存エラー：': error })
            }
        }
    })();

})


editor.addEventListener('keyup', e => {
    (() => {
        if (!(/^[a-z]$|^Backspace$|^ArrowRight$|^ArrowLeft$/.test(e.key))) return;
        const sel = document.getSelection();
        if (!sel) return;
        const range = getRange();
        const node = getStartContainer();
        if (!range || !node) {
            console.log('no range or node')
            return;
        };
        if (!(node instanceof Text)) {
            console.log('nottext');
            return;
        }
        const beforeText = node.textContent.slice(0, range.startOffset);

        const match = beforeText.match(/\\(\S+)$/);
        if (!match) {
            complementController.close();
            return;
        }
        setTimeout(() => {
            complementController.setupList(match[1]);
            complementController.render();
        }, 100);

    })();
    (() => {
        if (e.key === ' ') {
            //スペース押したら予測変換解除
            complementController.close();
            complementController.render();
        }
    })();
})


const openDirButton = document.getElementById('openDir');
if (openDirButton && 'showDirectoryPicker' in window) {
    openDirButton.onclick = async () => {
        const dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
        for await (const [name, handle] of dirHandle.entries()) {
            console.log({ name })
        }
        directoryController.setDirHandle(dirHandle);
        directoryController.updateDirView();
        openDirButton.style.display = 'none';
    }
}

export function setEditorContent(content: string) {
    editor.innerHTML = content;
}

const saveFileBtn = document.getElementById('saveFileBtn') as HTMLElement;
const saveFileAsBtn = document.getElementById('saveFileAsBtn') as HTMLElement;
const fileNameArea = document.getElementById('fileName') as HTMLElement;


saveFileAsBtn.onclick = async () => {
    fileName = await directoryController.saveFileAs(editor.innerHTML);
    fileNameArea.textContent = fileName;
}

saveFileBtn.onclick = async () => {
    if (fileName) {
        directoryController.saveFile(fileName, editor.innerHTML);
    } else {
        fileName = await directoryController.saveFileAs(editor.innerHTML);
        fileNameArea.textContent = fileName;
    }
}

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        const selection = getSelection();
        console.log({ selection })
    }
})