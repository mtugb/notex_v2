export function getRange():Range | null {
    const sel = document.getSelection();
    const range = sel?.getRangeAt(0);
    return range ?? null;
}

export function getStartContainer() {
    const range = getRange();
    const startContainer = range?.startContainer;
    return startContainer instanceof Node ? startContainer : null;
}

export function focus(element: HTMLElement, start=0, end=0) {
    const sel = document.getSelection();
    const range = document.createRange();
    sel?.removeAllRanges();
    range.setStart(element, start);
    range.setEnd(element, end);
    sel?.addRange(range);
}