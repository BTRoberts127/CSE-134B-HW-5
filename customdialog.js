export function customAlert(text) {
    let html = `<h2>${text}</h2><button>Ok</button>`;
    let dialog = createDialog(html);
    return new Promise((resolve, reject) => {
        dialog.lastChild.addEventListener("click", function confirmDialog() {closeDialog(dialog, resolve);});
        dialog.open = "open";
    });
}

export function customConfirm(text) {
    let html = `<h2>${text}</h2><button>Cancel</button><button>Ok</button>`;
    let dialog = createDialog(html);
    let ok = dialog.lastChild;
    return new Promise((resolve, reject) => {
        ok.addEventListener("click", function confirmDialog() {closeDialog(dialog, resolve, true);});
        ok.previousSibling.addEventListener("click", function rejectDialog() {closeDialog(dialog, resolve, false);});
        dialog.open = "open";
    });
}

export function customPrompt(text) {
    let html = `<h2>${text}</h2><input type="text"><button>Cancel</button><button>Ok</button>`;
    let dialog = createDialog(html);
    let ok = dialog.lastChild;
    let cancel = ok.previousSibling;
    let result = cancel.previousSibling;
    return new Promise((resolve, reject) => {
        ok.addEventListener("click", function confirmDialog() {closeDialog(dialog, resolve, result.value);});
        cancel.addEventListener("click", function rejectDialog() {closeDialog(dialog, resolve, null);});
        dialog.open = "open";
    });
}

function closeDialog(dialog, promiseFunction, argument = null) {
    dialog.remove();
    setTimeout(() => {promiseFunction(argument);}, 0);
}

function createDialog(html) {
    let dialog = document.createElement('dialog');
    dialog.innerHTML = html;
    document.body.appendChild(dialog);
    return dialog;
}