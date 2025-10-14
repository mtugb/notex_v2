import type { ComplementController } from "../lib/complement";

export function handleArrowUp(e:KeyboardEvent, controller:ComplementController) {
    e.preventDefault();
    if(controller.isOpen){
        controller.changeSelection("up");
        controller.render();
    }
}