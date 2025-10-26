import type { ComplementController } from "../lib/complement";

export function handleArrowUp(e:KeyboardEvent, controller:ComplementController) {
    if(controller.isOpen){
        e.preventDefault();
        controller.changeSelection("up");
        controller.render();
    }
}