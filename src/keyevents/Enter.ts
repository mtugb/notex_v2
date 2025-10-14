import type { ComplementController } from "../lib/complement";
import { focus, getRange, getStartContainer } from "../lib/rangeUtils";

export function handleEnter(e: KeyboardEvent, controller: ComplementController) {
    e.preventDefault();
    if (controller.isOpen) {
        controller.apply();
        controller.close();
        controller.render();
    }
    else
        customizedEnter();
}

function customizedEnter() {
    const startContainer = getStartContainer();
    if (!startContainer) {
        console.error('no startcontainer')
        return;
    }

    // get Parent Row
    let parentRow;
    if (startContainer instanceof HTMLElement) {
        parentRow = startContainer.closest('.row');
    }
    if (startContainer instanceof Text) {
        parentRow = startContainer?.parentElement?.closest('.row');
    }

    // check Parent Row
    if (parentRow) {
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.appendChild(document.createElement('br'));
        parentRow.insertAdjacentElement('afterend', newRow);
        focus(newRow);
    } else {
        console.error('no parent row')
    }
}