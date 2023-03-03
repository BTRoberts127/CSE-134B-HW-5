import {customConfirm} from './customConfirm.js';
window.crudAssignment_openMenu = openMenu;
window.customConfirm_customConfirm = customConfirm;
window.crudAssignment_saveState = saveState;

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

export function updateEntry() {
    let form = document.forms.addForm;
    let entry;
    if(form.editIndex.value == -1) {
       entry = document.createElement("li");
       entry.innerHTML = sanitizeEntry`<p>Title: <span>${form.title.value}</span> Date: <span>${form.date.value}</span></p><img class="button" src="images/editIcon.svg" onclick="crudAssignment_openMenu(null, this.parentElement);" alt="Pencil-shaped edit button" height="50" width="50"><img class="button" src="images/deleteIcon.svg" onclick="customConfirm_customConfirm('Delete Post?').then((remove) => {if(remove) {this.parentElement.remove();crudAssignment_saveState();}});" alt="Trash-can-shaped delete button" height="50" width="50"><p>${form.summary.value}</p>`;
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

function sanitizeEntry(strings, title, date, summary) {
    return strings[0] + DOMPurify.sanitize(title) + strings[1] + DOMPurify.sanitize(date) + strings[2] + DOMPurify.sanitize(summary) + strings[3];
}

function saveState() {
    let data = document.getElementById("blogPostList").innerHTML;
    localStorage.setItem("styledCrudAssignment_blogData", JSON.stringify(data));
}

export function loadState() {
    let data = localStorage.getItem("styledCrudAssignment_blogData");
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