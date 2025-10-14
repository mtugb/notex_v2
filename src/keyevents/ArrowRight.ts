import { ZWSP } from "../constants/specialCharacters";
import { getStartContainer } from "../lib/rangeUtils";

export function handleArrowRight(e: KeyboardEvent) {
    return;
    const sel = document.getSelection();
    const range = sel?.getRangeAt(0);
    if (!sel || !range) return;
    const startContainer = range.startContainer;
    if (
        range.startOffset === startContainer.textContent?.length
    ) {
        e.preventDefault();
        const parentElement = startContainer.parentElement;
        if (
            parentElement instanceof HTMLElement
            && parentElement.id !== 'editor'
            && !parentElement.classList.contains('row')
        ) {
            range.setStartAfter(parentElement)
            const textNode = document.createTextNode(ZWSP);
            range.insertNode(textNode);
            range.setStartAfter(textNode);
            range.collapse();
        }
    }

}