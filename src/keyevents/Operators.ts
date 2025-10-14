export function handlePlus(e:KeyboardEvent) {
    e.preventDefault();
    document.execCommand('insertText', false, ' + ')
}

export function handleMinus(e:KeyboardEvent) {
    e.preventDefault();
    document.execCommand('insertText', false, ' − ')
}

export function handleEqual(e:KeyboardEvent) {
    e.preventDefault();
    document.execCommand('insertText', false, ' = ')
}

export function handleTimes(e:KeyboardEvent) {
    e.preventDefault();
    document.execCommand('insertText', false, ' × ')
}