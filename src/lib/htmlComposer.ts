import { ZWSP } from "../constants/specialCharacters"

export type HtmlStructure = {
    tag?: string,
    class?: string,
    text?: string,
    editable?: boolean,
    focus?: boolean | {
        withArg: boolean,
        noArg: boolean
    },
    children?: HtmlStructure[]
}

type ElementsToFocus = {
    withArg: HTMLElement[],
    noArg: HTMLElement[]
}

export function composeHtml(structure: HtmlStructure): {
    html: HTMLElement
    elementsToFocus?: ElementsToFocus
} {
    const html = document.createElement(structure.tag ?? 'div');
    const elementsToFocus: ElementsToFocus = {
        withArg: [],
        noArg: []
    };
    structure.class && html.classList.add(...structure.class.split(' '));
    html.contentEditable = structure.editable === false ? 'false' : 'true';
    html.textContent = structure.text ?? '';
    if (typeof structure.focus === 'boolean') {
        elementsToFocus.withArg.push(html);
        elementsToFocus.noArg.push(html);
    } else {
        structure.focus?.withArg && elementsToFocus.withArg.push(html);
        structure.focus?.noArg && elementsToFocus.noArg.push(html);
    }
    structure.children?.forEach(child => {
        const parsedChild = composeHtml(child)
        html.appendChild(parsedChild.html);
        elementsToFocus.withArg.push(...parsedChild.elementsToFocus?.withArg ?? [])
        elementsToFocus.noArg.push(...parsedChild.elementsToFocus?.noArg ?? [])
    })

    return {
        html,
        elementsToFocus
    }
}