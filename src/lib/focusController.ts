import { getRange } from "./rangeUtils";

class FocusList {
    public selection = 0;
    constructor(public list: HTMLElement[]) { }
}

export class FocusController {
    private focusList: FocusList | null = null;
    constructor() { }
    prev() {
        if (!this.focusList) return;
        this.focusList.selection = Math.max(0, this.focusList.selection - 1);
        focusNode(this.focusList.list[this.focusList.selection]);
    }
    next() {
        if (!this.focusList) return;
        this.focusList.selection = Math.min(this.focusList.list.length - 1, this.focusList.selection + 1);
        focusNode(this.focusList.list[this.focusList.selection]);
    }
    focus(elms: HTMLElement[]) {
        this.focusList = new FocusList(elms);
        console.log({focusList:this.focusList})
        focusNode(elms[0]);
    }
    blur() {
        if (!this.focusList) return;
        this.focusList = null;
    }
}


function focusNode(node:Node) {
    const range = getRange();
    if (!range) return;
    if (node.childNodes[0] instanceof Text) node = node.childNodes[0];
    range.setStart(node, 0);
}