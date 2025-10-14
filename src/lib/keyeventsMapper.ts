import { handleArrowDown } from "../keyevents/ArrowDown";
import { handleArrowRight } from "../keyevents/ArrowRight";
import { handleArrowUp } from "../keyevents/ArrowUp";
import { handleEnter } from "../keyevents/Enter";
import { handleEqual, handleMinus, handlePlus, handleTimes } from "../keyevents/Operators";
import { handleSpace } from "../keyevents/Space";
import type { ComplementController } from "./complement";
import type { FocusController } from "./focusController";

export type KeyEventFunction = (e:KeyboardEvent, complementController:ComplementController, focusController:FocusController)=>void;
type KeyEventMap = Record<string, KeyEventFunction>;

export const keyEventMap:KeyEventMap = {
    'Enter': handleEnter,
    'ArrowRight': handleArrowRight,
    'ArrowUp': handleArrowUp,
    'ArrowDown': handleArrowDown,
    ' ': handleSpace,
    '+': handlePlus,
    '-': handleMinus,
    '=': handleEqual,
    '*': handleTimes,
} as const;