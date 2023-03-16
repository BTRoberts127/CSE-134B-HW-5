/**
 * Sends an HTTP request of the type specified by the data-form-method attribute on the given button
 * and updates the response field in the document accordingly.
 * Allowed types are post, get, put, and delete
 * @param {HTMLButtonElement} button the button that was pressed
 */
export function handleButtonPress(button) {
    switch(button.getAttribute("data-form-method")) {
        case "post":
            return handlePost(button.form);
            break;
        case "get":
            return handleGet(button.form);
            break;
        case "put":
            return handlePut(button.form);
            break;
        case "delete":
            return handleDelete(button.form);
            break;
        default:
            alert("Error - Could not determine method for button.");
    }
}

/**
 * Sends a POST request to https://httpbin.org/post with the data in the given form
 * and updates the response output tag with the response
 * @param {HTMLFormElement} form the form containing the data to post
 */
function handlePost(form) {
    let formDataBody = new FormData(form);
    formDataBody.set("date", new Date());
    formDataBody.delete("implementation");
    if(form.implementation.value == "xmlImplementation") {
        handleXml("POST", "https://httpbin.org/post", formDataBody);
    } else {
        handleFetch("POST", "https://httpbin.org/post", formDataBody);
    }
}

/**
 * Sends a GET request to https://httpbin.org/get with the data in the given form
 * and updates the response output tag with the response
 * @param {HTMLFormElement} form the form containing the data to get
 */
function handleGet(form) {
    let formDataBody = new FormData(form);
    formDataBody.set("date", new Date());
    formDataBody.delete("implementation");
    formDataBody.delete("article_body");//keeping title and id to allow searching by both
    if(form.implementation.value == "xmlImplementation") {
        handleXml("GET", "https://httpbin.org/get?" + encode(formDataBody), );
    } else {
        handleFetch("GET", "https://httpbin.org/get?" + encode(formDataBody), );
    }
}

/**
 * Sends a PUT request to https://httpbin.org/put with the data in the given form
 * and updates the response output tag with the response
 * @param {HTMLFormElement} form the form containing the data to put
 */
function handlePut(form) {
    let formDataBody = new FormData(form);
    formDataBody.set("date", new Date());
    formDataBody.delete("implementation");
    if(form.implementation.value == "xmlImplementation") {
        handleXml("PUT", "https://httpbin.org/put", formDataBody);
    } else {
        handleFetch("PUT", "https://httpbin.org/put", formDataBody);
    }
}

/**
 * Sends a DELETE request to https://httpbin.org/delete with the data in the given form
 * and updates the response output tag with the response
 * @param {HTMLFormElement} form the form containing the data to delete
 */
function handleDelete(form) {
    let formDataBody = new FormData(form);
    formDataBody.set("date", new Date());
    formDataBody.delete("implementation");
    formDataBody.delete("article_body");//keeping title and id to allow deleting by both
    if(form.implementation.value == "xmlImplementation") {
        handleXml("DELETE", "https://httpbin.org/delete", formDataBody);
    } else {
        handleFetch("DELETE", "https://httpbin.org/delete", formDataBody);
    }
}

/**
 * Sends the specified HTTP request to the specified endpoint using XMLHttpRequest
 * and updates the response output tag with the response
 * @param {String} method the name of the HTTP method to use
 * @param {String} endpoint the address of the target endpoint
 * @param {FormData} data the data to send as the body of the request
 */
function handleXml(method, endpoint, data) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, endpoint);
    xhr.onloadend = (event, request=xhr) => {
        if(request.status === 200) {
            handleOutput(request.responseText);
        } else {
            alert("Error - could not get response.");
        }
    };
    if(data) {
        xhr.send(encode(data));
    } else {
        xhr.send();
    }
}

/**
 * Sends the specified HTTP request to the specified endpoint using fetch
 * and updates the response output tag with the response
 * @param {String} method the name of the HTTP method to use
 * @param {String} endpoint the address of the target endpoint
 * @param {FormData} data the data to send as the body of the request
 */
async function handleFetch(method, endpoint, data) {
    let result = await fetch(endpoint, data ? {
        method: method,
        body: encode(data)
    } : {
        method: method
    });
    handleOutput(await result.text());
}

/**
 * Encodes the given data in x/www-form-urlencoded format
 * @param {FormData} formData the data to encode
 * @returns the data in formData encoded in the x/www-form-urlencoded format
 */
function encode(formData) {
    let result = "";
    for(let data of formData.entries()) {
        result += encodeURIComponent(data[0]) + "=" + encodeURIComponent(data[1]) + "&";
    }
    return result.substring(0, result.length - 1);
}

/**
 * Updates the response output tag with the given response data
 * @param {String} response the response to output
 */
function handleOutput(response) {
    let output = document.getElementById("response");
    output.innerHTML = `<pre>${response}</pre>`;
}