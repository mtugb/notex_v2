import { ZWSP } from "../constants/specialCharacters";
import { commands } from "./commandsMapper";
import type { FocusController } from "./focusController";
import { composeHtml, type HtmlStructure } from "./htmlComposer";
import { getRange, getStartContainer } from "./rangeUtils";

export function handleCommand(match: RegExpMatchArray, focusController:FocusController, callback?:()=>void) {
    const commandName = match[1];
    const command = commands.find(c => c.name.includes(commandName));
    if (!command) return;
    switch (command.type) {
        case 'html': {
            insertHTML(match, command.compose(), focusController);
            break;
        }
    }
    callback?.();
}

export function handleCommandWithArguments(match: RegExpMatchArray, callback?:()=>void) {
    const commandName = match[1];
    const command = commands.find(c => c.name.includes(commandName));
    if (!command) return;
    switch (command.type) {
        case 'html': {
            insertHTML(match, command.compose(match));
            break;
        }
    }
    callback?.();
}


function insertHTML(match: RegExpMatchArray, htmlStructure: HtmlStructure, focusController?:FocusController) {
    const composedHtml = composeHtml(htmlStructure);
    const sel = document.getSelection();
    const range = sel?.getRangeAt(0);
    const node = range?.startContainer;
    if (!sel || !range || !node) return;
    const wordStart = range.startOffset - match[0].length;
    const wordEnd = range.startOffset;

    // Rangeをその単語の範囲に設定
    const newRange = document.createRange();
    newRange.setStart(node, wordStart);
    newRange.setEnd(node, wordEnd);

    newRange.deleteContents();
    const textNode = document.createTextNode(ZWSP);
    newRange.insertNode(textNode);
    newRange.insertNode(composedHtml.html);
    const elementToFocus = composedHtml.elementToFocus;
    if (focusController && elementToFocus && elementToFocus?.length > 0) {
        focusController.focus(elementToFocus);
    } else {
        newRange.setStartAfter(textNode);
    }
    sel.removeAllRanges();
    sel.addRange(newRange);
}