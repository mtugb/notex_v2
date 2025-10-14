import type { KeyEventFunction } from "../lib/keyeventsMapper";

export const handleTab: KeyEventFunction = (e: KeyboardEvent, cc, fc) => {
    if (fc.isActive) {
        e.preventDefault();
        if (e.shiftKey)
            fc.prev();
        else
            fc.next();
    }
};