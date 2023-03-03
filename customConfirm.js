//Copy/pasted from customdialog.js for the CRUD assignment.

/**
 * Opens an alert with the given text and option to confirm or cancel
 * @param {String} text the message to display
 * @returns a Promise that will be invoked if the dialog is closed, passing true if confirmed and false otherwise
 */
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

/**
 * Closes the given dialog and invokes the given function with the given parameter
 * @param {HTMLDialogElement} dialog the Dialog to close
 * @param {Function} promiseFunction the function to invoke
 * @param {*} argument the parameter for the function
 */
function closeDialog(dialog, promiseFunction, argument = null) {
    dialog.remove();
    setTimeout(() => {promiseFunction(argument);}, 0);
}

/**
 * Creates a dialog tag with the given contents
 * @param {String} html the HTML contents of the dialog
 * @returns a dialog with the given HTML contents
 */
function createDialog(html) {
    let dialog = document.createElement('dialog');
    dialog.innerHTML = html;
    document.body.appendChild(dialog);
    return dialog;
}