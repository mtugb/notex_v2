import type { command } from "../lib/commandsMapper";

export const signalCommands:command[] = [
    // 既存のギリシャ文字
    {
        name: ['alpha', 'a'],
        type: 'text',
        compose:()=>"α"
    },
    {
        name: ['beta', 'b'],
        type: 'text',
        compose:()=>"β"
    },
    {
        name: ['gamma', 'g'], // 'g' を追加
        type: 'text',
        compose:()=>"γ"
    },
    {
        name: ['delta', 'd'],
        type: 'text',
        compose:()=>"δ"
    },
    {
        name: ['epsilon', 'e'],
        type: 'text',
        compose:()=>"ε"
    },
    {
        name: ['pi', 'p'],
        type: 'text',
        compose:()=>"π"
    },
    {
        name: ['sigma', 's'],
        type: 'text',
        compose:()=>"σ"
    },
    {
        name: ['omega', 'w'],
        type: 'text',
        compose:()=>"ω"
    },

    // 集合論の記号
    {
        name: ['union', 'cup', 'u'], // 和集合
        type: 'text',
        compose:()=>"∪"
    },
    {
        name: ['intersection', 'cap'], // 共通部分 (積集合)
        type: 'text',
        compose:()=>"∩"
    },
    {
        name: ['in', 'element', 'belong'], // 属する
        type: 'text',
        compose:()=>"∈"
    },
    {
        name: ['notin', 'notin'], // 属さない
        type: 'text',
        compose:()=>"∉"
    },
    {
        name: ['subset', 'sub'], // 部分集合
        type: 'text',
        compose:()=>"⊂"
    },
    {
        name: ['subseteq', 'subseteq'], // 部分集合 (等号含む)
        type: 'text',
        compose:()=>"⊆"
    },
    {
        name: ['empty', 'emptyset'], // 空集合
        type: 'text',
        compose:()=>"∅"
    },
    {
        name: ['difference', 'setdiff'], // 差集合
        type: 'text',
        compose:()=>"∖"
    },
    
    // 論理学の記号
    {
        name: ['not', 'lnot'], // 否定
        type: 'text',
        compose:()=>"￢" // または "¬"
    },
    {
        name: ['and', 'land', 'wedge', 'katu'], // 論理積 (かつ)
        type: 'text',
        compose:()=>"∧"
    },
    {
        name: ['or', 'lor', 'vee', 'mataha'], // 論理和 (または)
        type: 'text',
        compose:()=>"∨"
    },
    {
        name: ['implies', 'then', 'arrow', 'naraba'], // 含意 (ならば)
        type: 'text',
        compose:()=>"⇒"
    },
    {
        name: ['iff', 'equiv', 'equivalent', 'douti'], // 同値 (〜であるとき、かつそのときに限り)
        type: 'text',
        compose:()=>"⇔"
    },
    {
        name: ['forall', 'any'], // 全称記号 (任意の)
        type: 'text',
        compose:()=>"∀"
    },
    {
        name: ['exists', 'exist'], // 存在記号 (存在する)
        type: 'text',
        compose:()=>"∃"
    },

    // 等号・不等号・その他
    {
        name: ['neq', 'notequal'], // 等しくない
        type: 'text',
        compose:()=>"≠"
    },
    {
        name: ['leq', 'le', 'lesseq'], // 以下 (小なりイコール)
        type: 'text',
        compose:()=>"≤"
    },
    {
        name: ['geq', 'ge', 'greatereq'], // 以上 (大なりイコール)
        type: 'text',
        compose:()=>"≥"
    },
    {
        name: ['approx', 'similar'], // ほぼ等しい (近似)
        type: 'text',
        compose:()=>"≈"
    },
    {
        name: ['infinity', 'inf'], // 無限大
        type: 'text',
        compose:()=>"∞"
    },
    {
        name: ['nabla', 'del'], // ナブラ (微分演算子)
        type: 'text',
        compose:()=>"∇"
    },
    {
        name: ['partial'], // 偏微分記号
        type: 'text',
        compose:()=>"∂"
    },
    {
        name: ['theta'], // 偏微分記号
        type: 'text',
        compose:()=>"θ"
    },
    {
        name: ['Theta'], // 偏微分記号
        type: 'text',
        compose:()=>"Θ"
    },
    {
        name: ['Delta'], // 偏微分記号
        type: 'text',
        compose:()=>"Δ"
    },
    {
        name: ['Pi'], // 偏微分記号
        type: 'text',
        compose:()=>"Π"
    },
]

