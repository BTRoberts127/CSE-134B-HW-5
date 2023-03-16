/**
 * Class defining a button-count element, which displays the number of times it has been clicked.
 */
class ButtonCount extends HTMLElement {
    /**
     * Constructor for ButtonCount, initializes entire element and functionality
     */
    constructor() {
        super();
        this.count = 0;
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<button>Times Clicked: <span>0</span></button>`;//core button
        this.shadowRoot.firstChild.addEventListener("click", () => {//increment count and update display
            this.count++;
            this.shadowRoot.firstChild.innerText = "Times Clicked: " + this.count;
        });
    }
}

customElements.define("button-count", ButtonCount);