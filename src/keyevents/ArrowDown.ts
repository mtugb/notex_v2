import type { ComplementController } from "../lib/complement";

export function handleArrowDown(e:KeyboardEvent, controller:ComplementController) {
    if(controller.isOpen){
        e.preventDefault();
        controller.changeSelection("down");
        controller.render();
    }
}