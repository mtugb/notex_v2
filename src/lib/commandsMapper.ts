import { ZWSP } from "../constants/specialCharacters";
import type { HtmlStructure } from "./htmlComposer"

type command = htmlCommand | textCommand;

type htmlCommand = {
    type: 'html',
    name: string[],
    compose: (match?: RegExpMatchArray) => HtmlStructure
}

type textCommand = {
    type: 'text',
    name: string[],
    compose: (param: object) => String
}

export const commands: command[] = [
    {
        name: ['mat', 'matrix'],
        type: 'html',
        compose(match?: RegExpMatchArray) {
            let columns = Number(match?.[2]);
            let rows = Number(match?.[3]);
            if (!columns || !rows) {
                columns = 2;
                rows = 2;
            };
            console.log({ columns, rows })
            let children: HtmlStructure[] = [];
            let tds: HtmlStructure[] = [];

            for (let t = 0; t < columns; t++) {
                tds.push({ tag: "td", text: '□' });
            }
            for (let r = 0; r < rows; r++) {
                children.push({
                    tag: "tr",
                    children: tds
                })
            }
            return ({
                tag: 'table',
                class: "pt-bracket pt-bracket--round",
                children,
            } satisfies HtmlStructure);
        }
    },
    {
        name: ['integral', 'int'],
        type: 'html',
        compose(match) {
            return {
                class: "pt-integral",
                children: [
                    { class: "pt-integral__upper-limit", text: match?.[3]??ZWSP, focus:true },
                    { class: "pt-integral__lower-limit", text: match?.[2]??ZWSP, focus:true },
                    { class: "pt-integral__symbol" },
                ],
            };
        },
    },
    {
        name: ['^'],
        type: 'html',
        compose(match) {
            console.log(match)
            return {
                class: "pt-sup",
                text: match?.[2] ?? '□'
            };
        },
    },
    {
        name: ['_'],
        type: 'html',
        compose(match) {
            console.log(match)
            return {
                class: "pt-sub",
                text: match?.[2] ?? '□'
            };
        },
    }
]



export function getCommandList() {
    return commands.flatMap(c => c.name);
}