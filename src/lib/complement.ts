import { getCommandList } from "./commandsMapper";
import { getRange } from "./rangeUtils";

// const complementArea = document.getElementById('complement');
// const editor = document.getElementById('editor') as HTMLDivElement;

// let selectedIndex = 0;
// let currentList: string[] = [];
// let lastPartial = '';

const commands = getCommandList();

// function getListHTML(partial: string) {
//     if (!complementArea) return "";
//     const list = commands
//         .filter(c => c.startsWith(partial))
//     currentList = list;
//     lastPartial = partial;
//     changeComplementAreaVisible(list.length > 0);
//     const listHTML = list
//         .map((c, i) => `<li ${i === selectedIndex ? 'class="selected"' : ''}><span>${c.slice(0, partial.length)}</span>${c.slice(partial.length)}</li>`)
//         .join('');
//     return listHTML;
// }

// function showPartial(partial: string) {
//     if (!complementArea) return;
//     if (!partial) return;
//     const listHTML = getListHTML(partial);
//     complementArea.innerHTML = listHTML;
// }

// export function showComplement(partial: string) {
//     if (!complementArea || !editor) return;
//     const range = getRange();
//     if (!range) return;
//     const { left, top } = range.getBoundingClientRect();
//     const { left: editorLeft, top: editorTop } = editor.getBoundingClientRect();
//     complementArea.style.left = `calc(${left - editorLeft}px + 1.5em)`;
//     complementArea.style.top = `calc(${top - editorTop}px + 1.5em)`;
//     showPartial(partial);
// }

// export function changeComplementSelection(direction: 'up' | 'down') {
//     switch (direction) {
//         case 'up': {
//             selectedIndex = Math.max(0, selectedIndex - 1);
//             break;
//         }
//         case 'down': {
//             selectedIndex = Math.min(currentList.length - 1, selectedIndex + 1);
//             break;
//         }
//     }
//     if (complementArea && lastPartial) {
//         complementArea.innerHTML = getListHTML(lastPartial);
//     }
// }

// export function triggerComplement() {
//     const range = getRange();
//     if (!range) return;
//     range.insertNode(document.createTextNode(currentList[selectedIndex].slice(lastPartial.length)))
// }


// export function changeComplementAreaVisible(willBeVisible: boolean) {
//     if (!complementArea) return;
//     complementArea.style.display = willBeVisible ? 'block' : 'none';
// }

// export function seeIfComplementNowAvailable(): boolean {
//     return currentList.length > 0;
// }


// create per editor
export class ComplementController {
    private complements: Complements | null = null;
    constructor(
        private editor: HTMLDivElement,
        private area: HTMLUListElement
    ) {
        area.style.display = 'none';
    }
    get isOpen(): boolean {
        return !!this.complements;
    }
    // source represent UnfinishedCommand
    setupList(source: string) {
        const newList = commands.filter(c => c.startsWith(source))
        this.complements = newList.length > 0 ? new Complements(newList, source) : null;
    }
    changeSelection(direction: 'up' | 'down') {
        this.complements?.changeSelection(direction);
    }
    render() {
        this.area.style.display = this.isOpen ? 'block' : 'none';
        const complements = this.complements;
        if (!complements) {
            // 初期状態＆close()後
            return;
        }
        const range = getRange();
        if (!range) return;
        const { left, top } = range.getBoundingClientRect();
        const { left: editorLeft, top: editorTop } = this.editor.getBoundingClientRect();
        this.area.style.left = `calc(${left - editorLeft}px + 1.5em)`;
        this.area.style.top = `calc(${top - editorTop}px + 1.5em)`;
        this.area.innerHTML =
            complements.list
                .map((c, i) => `<li ${i === complements.selection ? 'class="selected"' : ''}><span>${c.slice(0, complements.source.length)}</span>${c.slice(complements.source.length)}</li>`)
                .join('');
    }
    close() {
        this.complements = null;
    }
    apply() {
        if (!this.complements) return;
        const range = getRange();
        if (!range) return;
        const complementText = this.complements.list[this.complements.selection].slice(this.complements.source.length);
        const defaultContainer = range.startContainer;
        if (!(defaultContainer instanceof Text)) return;
        defaultContainer.textContent += complementText;      
        range.setStart(defaultContainer, defaultContainer.textContent.length);
        range.collapse();
    }

}

class Complements {
    public selection = 0;

    constructor(
        public list: string[],
        public source: string
    ) { }
    changeSelection(direction: 'up' | 'down') {
        switch (direction) {
            case 'up': {
                this.selection = Math.max(0, this.selection - 1);
                break;
            }
            case 'down': {
                this.selection = Math.min(this.list.length - 1, this.selection + 1);
                break;
            }
        }
    }

}