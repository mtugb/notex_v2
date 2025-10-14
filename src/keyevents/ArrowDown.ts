import type { ComplementController } from "../lib/complement";

export function handleArrowDown(e:KeyboardEvent, controller:ComplementController) {
    e.preventDefault();
    if(controller.isOpen){
        controller.changeSelection("down");
        controller.render();
    }
}