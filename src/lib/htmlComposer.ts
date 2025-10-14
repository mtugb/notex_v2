import { ZWSP } from "../constants/specialCharacters"

export type HtmlStructure = {
    tag?: string,
    class?: string,
    text?:string,
    focus?: boolean,
    children?: HtmlStructure[]
}

export function composeHtml(structure:HtmlStructure):{
    html: HTMLElement
    elementToFocus?: HTMLElement[]
} {
    const html = document.createElement(structure.tag??'div');
    const elementToFocus:HTMLElement[] = [];
    structure.class&&html.classList.add(...structure.class.split(' '));
    html.textContent = structure.text ?? '';
    structure.focus&&elementToFocus.push(html);
    structure.children?.forEach(child=>{
        const parsedChild = composeHtml(child)
        html.appendChild(parsedChild.html);
        elementToFocus.push(...parsedChild.elementToFocus??[])
    })

    return {
        html,
        elementToFocus
    }
}