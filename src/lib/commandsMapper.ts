import { signalCommands } from "../commandMaps/signals";
import { ZWSP } from "../constants/specialCharacters";
import type { HtmlStructure } from "./htmlComposer"

export type command = htmlCommand | textCommand;

type htmlCommand = {
    type: 'html',
    name: string[],
    compose: (match?: RegExpMatchArray) => HtmlStructure
}

type textCommand = {
    type: 'text',
    name: string[],
    compose: (param?: object) => string
}

export const commands: command[] = [
    {
        name: ['mat', 'matrix'],
        type: 'html',
        compose(match?: RegExpMatchArray) {
            let columns = Number(match?.[3]);
            let rows = Number(match?.[2]);
            if (!columns || !rows) {
                columns = 2;
                rows = 2;
            };
            console.log({ columns, rows })
            let children: HtmlStructure[] = [];
            let tds: HtmlStructure[] = [];

            for (let t = 0; t < columns; t++) {
                tds.push({ tag: "td", text: '□', focus: true });
            }
            for (let r = 0; r < rows; r++) {
                children.push({
                    tag: "tr",
                    children: tds
                })
            }
            return ({
                tag: 'div',
                class: "pt-bracket pt-bracket--round",
                children: [
                    {
                        tag: 'table',
                        class: "pt-matrix",
                        children
                    }
                ],
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
                    {
                        class: "pt-integral__lower-limit", children: [
                            {
                                text: match?.[2] ?? '□', focus: true
                            }
                        ]
                    },
                    {
                        class: "pt-integral__upper-limit", children: [
                            {
                                text: match?.[3] ?? '□', focus: true
                            }
                        ]
                    },
                    { class: "pt-integral__symbol" },
                ],
            };
        },
    },
    {
        name: ['sigma', 'sum'],
        type: 'html',
        compose(match) {
            return {
                class: "pt-sigma",
                children: [
                    { class: "pt-sigma__lower-limit", text: "i = 1", focus: true },
                    { class: "pt-sigma__upper-limit", text: "n", focus: true },
                    { class: "pt-sigma__symbol" },
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
    },
    {
        name: ['hat'],
        type: 'html',
        compose(match) {
            return {
                class: "pt-accent pt-accent--hat",
                text: match?.[2] ?? '□',
                focus: true
            }
        }
    },
    ...signalCommands
]



export function getCommandList() {
    return commands.flatMap(c => c.name);
}