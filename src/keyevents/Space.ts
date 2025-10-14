import { ZWSP } from "../constants/specialCharacters";
import { integral } from "../htmlTemplates/integral";
import { sigma } from "../htmlTemplates/sigma";
import { handleCommand, handleCommandWithArguments } from "../lib/commandsHandler";
import type { ComplementController } from "../lib/complement";
import type { FocusController } from "../lib/focusController";
import { composeHtml, type HtmlStructure } from "../lib/htmlComposer";
import { getRange, getStartContainer } from "../lib/rangeUtils";

export function handleSpace(
    e: KeyboardEvent, 
    complementController: ComplementController,
    focusController: FocusController
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

    //コマンドなくてもrenderは読み込む（表示非表示切り替える）
    //ただし、中身をアップデートしてから（順序逆にするためsettimeout）
    setTimeout(() => {
        complementController.render();
    }, 100);

    const commandMatch = beforeText.match(/\\([a-zA-Z]+)$/);
    if (commandMatch) {
        e.preventDefault();
        complementController.setupList(commandMatch[1]);
        handleCommand(commandMatch,focusController, () => {
            complementController.close();
            complementController.render();
        });
    }
    const commandMatchWithArgument = beforeText.match(/\\([a-zA-Z]+)\{([0-9]{0,2})\}\{([0-9]{0,2})\}$/);
    if (commandMatchWithArgument) {
        e.preventDefault();
        complementController.setupList(commandMatchWithArgument[1]);
        handleCommandWithArguments(commandMatchWithArgument, () => {
            complementController.close();
            complementController.render();
        });
    }
    const supsubCommandMatch = beforeText.match(/([\^\_])([a-zA-Z0-9]+)$/);
    if (supsubCommandMatch) {
        e.preventDefault();
        handleCommandWithArguments(supsubCommandMatch);
    }
    const enclosedSupsubCommandMatch = beforeText.match(/([\^\_])(\(.+\))$/);
    if (enclosedSupsubCommandMatch) {
        e.preventDefault();
        handleCommandWithArguments(enclosedSupsubCommandMatch);
    }
    const fractionCommandMatch = beforeText.match(/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)$/);
    if (fractionCommandMatch) {
        console.info('matched');
        e.preventDefault();
        /*
        <div class="pt-fraction">
                            <div class="pt-fraction__upper">3</div>
                            <div class="pt-fraction__lower">2</div>
                        </div>
                         */
        const fractionStructure:HtmlStructure = {
            class:'pt-fraction',
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
    }


    console.log({ beforeText, commandMatchWithArgument })
}