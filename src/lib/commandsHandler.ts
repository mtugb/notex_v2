import { ZWSP } from "../constants/specialCharacters";
import { commands } from "./commandsMapper";
import type { ComplementController } from "./complement";
import type { FocusController } from "./focusController";
import { composeHtml, type HtmlStructure } from "./htmlComposer";
import { getRange, getStartContainer } from "./rangeUtils";

export function handleCommand(match: RegExpMatchArray, focusController: FocusController, callback?: () => void) {
    const commandName = match[1];
    const command = commands.find(c => c.name.includes(commandName));
    if (!command) return;
    switch (command.type) {
        case 'html': {
            insertHTML('noArg', match, command.compose(), focusController);
            break;
        }
        case 'text': {
            insertText(match, command.compose());
            break;
        }
    }
    callback?.();
}

export function handleCommandWithArguments(match: RegExpMatchArray, callback?: () => void) {
    const commandName = match[1];
    const command = commands.find(c => c.name.includes(commandName));
    if (!command) return;
    switch (command.type) {
        case 'html': {
            insertHTML('withArg', match, command.compose(match));
            break;
        }
    }
    callback?.();
}

function insertText(match: RegExpMatchArray, text: string) {
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
    const textNode = document.createTextNode(text);
    newRange.insertNode(textNode);
    newRange.collapse();
    sel.removeAllRanges();
    sel.addRange(newRange);
}


function insertHTML(commandMode: 'withArg' | 'noArg', match: RegExpMatchArray, htmlStructure: HtmlStructure, focusController?: FocusController) {
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
    newRange.insertNode(document.createTextNode(ZWSP));//前にいれることで、前に戻ってA=とかかける
    const elementToFocus = composedHtml.elementsToFocus?.[commandMode];
    let customFocusApplied = false; // ★追加: カスタムフォーカス適用フラグ

    if (focusController && elementToFocus && elementToFocus?.length > 0) {
        focusController.focus([...elementToFocus, textNode]);
        customFocusApplied = true; // ★追加: フラグをtrueに設定
    } else {
        newRange.setStartAfter(textNode);
    }

    // ★修正: カスタムフォーカスが適用されなかった場合のみ、デフォルトのカーソル位置を設定
    if (!customFocusApplied) {
        sel.removeAllRanges();
        sel.addRange(newRange);
    }
}


export function executeCommandIfPossible(
    complementController: ComplementController,
    focusController: FocusController,
    triggerType: 'spaceKey' | 'operation',
    option: { keyEvent?: KeyboardEvent }
) {
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

    const commandMatch = beforeText.match(/\\([a-zA-Z]+)$/);
    if (commandMatch) {
        option?.keyEvent?.preventDefault();
        handleCommand(commandMatch, focusController);
        return;
    }
    const commandMatchWithArgument = beforeText.match(/\\([a-zA-Z]+)\{([0-9]{0,2})\}\{([0-9]{0,2})\}$/);
    if (commandMatchWithArgument) {
        option?.keyEvent?.preventDefault();
        handleCommandWithArguments(commandMatchWithArgument);
        return;
    }
    const supsubCommandMatch = beforeText.match(/([\^\_])([a-zA-Z0-9]+)$/);
    if (supsubCommandMatch) {
        option?.keyEvent?.preventDefault();
        handleCommandWithArguments(supsubCommandMatch);
        return;
    }
    const enclosedSupsubCommandMatch = beforeText.match(/([\^\_])(\(.+\))$/);
    if (enclosedSupsubCommandMatch) {
        option?.keyEvent?.preventDefault();
        handleCommandWithArguments(enclosedSupsubCommandMatch);
        return;
    }
    const fractionCommandMatch = beforeText.match(/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)$/);
    if (fractionCommandMatch) {
        console.info('matched');
        option?.keyEvent?.preventDefault();
        /*
        <div class="pt-fraction">
                            <div class="pt-fraction__upper">3</div>
                            <div class="pt-fraction__lower">2</div>
                        </div>
                         */
        const fractionStructure: HtmlStructure = {
            class: 'pt-fraction',
            children: [
                {
                    class: 'pt-fraction__upper',
                    text: fractionCommandMatch[1] ?? 'a'
                },
                {
                    class: 'pt-fraction__lower',
                    text: fractionCommandMatch[2] ?? 'b'
                }
            ]
        }
        const fractionComposed = composeHtml(fractionStructure);
        const range = getRange();
        const startContainer = getStartContainer();
        if (!range || !startContainer) return;
        range.setStart(startContainer, range.startOffset - fractionCommandMatch[0].length);
        range.deleteContents();
        const textNode = document.createTextNode(ZWSP);
        range.insertNode(textNode);
        range.insertNode(fractionComposed.html);
        range.setStart(textNode, 0);
        range.collapse();
        return;
    }
}