//Copy/pasted from customdialog.js for the CRUD assignment.

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