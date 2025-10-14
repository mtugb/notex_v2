const debugOutputArea = document.getElementById('debug')
export const VisualDebugger = {
    show(info: Record<string, string | null | undefined>) {
        if (!debugOutputArea) return;
        const list = document.createElement('ul')
        Object.entries(info).forEach(([k, v]) => {
            const item = document.createElement('li')
            item.textContent = `${k}: ${v ?? '404'}`
            list.appendChild(item);
        })
        debugOutputArea.innerHTML = '';
        debugOutputArea.appendChild(list);
    }
}