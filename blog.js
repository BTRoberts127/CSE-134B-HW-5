import {customConfirm} from './customConfirm.js';
window.crudAssignment_openMenu = openMenu;
window.customConfirm_customConfirm = customConfirm;
window.crudAssignment_saveState = saveState;

/**
 * Opens the add/edit menu to add a new event or update an existing one, based on the value of entry
 * @param {MouseEvent} event the event that triggered the open
 * @param {HTMLLIElement} entry the entry initiating the event, if any
 */
export function openMenu(event, entry = null) {
    let menu = document.getElementById("addMenu");
    if(entry) {
        let siblings = entry.parentElement.children;
        let form = document.forms.addForm;
        form.title.value = entry.querySelector("span").innerText;
        form.date.value = entry.querySelector("span + span").innerText;
        form.summary.value = entry.querySelector("* + p").innerText;
        for(let x = 0; x < siblings.length; x++) {
            if(entry === siblings[x]) {
                form.editIndex.value = x;
                break;
            }
        }
    } else {
        document.forms.addForm.editIndex.value = -1;
    }
    menu.open = "open";
}

/**
 * Updates or adds the entry specified in the addForm fields
 */
export function updateEntry() {
    let form = document.forms.addForm;
    let entry;
    if(form.editIndex.value == -1) {
       entry = document.createElement("li");
       entry.innerHTML = sanitizeEntry`<p>Title: <span>${form.title.value}</span> Date: <span>${form.date.value}</span></p><button onclick="crudAssignment_openMenu(null, this.parentElement);">Edit</button><button onclick="customConfirm_customConfirm('Delete Post?').then((remove) => {if(remove) {this.parentElement.remove();crudAssignment_saveState();}});">Delete</button><p>${form.summary.value}</p>`;
       document.getElementById("blogPostList").appendChild(entry);
    } else {
        //careful here, using parseInt for the editIndex value in case user tries to insert something malicious
        entry = document.querySelector("#blogPostList > li:nth-child(" + (parseInt(form.editIndex.value) + 1) + ")");
        entry.firstChild.innerHTML = `Title: <span>${DOMPurify.sanitize(form.title.value)}</span> Date: <span>${DOMPurify.sanitize(form.date.value)}</span>`;
        entry.lastChild.innerHTML = DOMPurify.sanitize(form.summary.value);
    }
    form.title.value = "";
    form.date.value = "";
    form.summary.value = "";
    saveState();
}

/**
 * Constructs and returns a String representation of the HTML contents for a blog entry with sanitized user input
 * @param {Array} strings an Array of Strings representing the template strings
 * @param {String} title a String representing the entry title
 * @param {String} date a String representing the entry date
 * @param {String} summary a String representing the entry summary
 * @returns the HTML content for the entry, with sanitized user inputs
 */
function sanitizeEntry(strings, title, date, summary) {
    return strings[0] + DOMPurify.sanitize(title) + strings[1] + DOMPurify.sanitize(date) + strings[2] + DOMPurify.sanitize(summary) + strings[3];
}

/**
 * Writes the current blog contents to local storage
 */
function saveState() {
    let data = document.getElementById("blogPostList").innerHTML;
    localStorage.setItem("crudAssignment_blogData", JSON.stringify(data));
}

/**
 * Reads and updates the blog contents from local storage
 */
export function loadState() {
    let data = localStorage.getItem("crudAssignment_blogData");
    if(data) {//load data
        document.getElementById("blogPostList").innerHTML = JSON.parse(data);
    } else {//default data
        let form = document.forms.addForm
        //add sample post
        form.title.value = "Sample Title";
        form.date.value = "2023-01-01";
        form.summary.value = "Sample summary of blog post, which is 1 or 2 sentences usually. This is an example of a blog post summary.";
        updateEntry();
    }
}