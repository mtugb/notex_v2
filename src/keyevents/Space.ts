import { executeCommandIfPossible } from "../lib/commandsHandler";
import type { ComplementController } from "../lib/complement";
import type { FocusController } from "../lib/focusController";

export function handleSpace(
    e: KeyboardEvent,
    complementController: ComplementController,
    focusController: FocusController
) {

    executeCommandIfPossible(complementController, focusController, 'spaceKey', { keyEvent: e });
}