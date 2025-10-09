// Fetch HTML template
fetch("web-components/card-tile/card-tile.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

/**
 * Creates a web component using a given HTML template.
 * @param {string} html - The HTML template.
 * @returns {void}
 */
function createComponent(html) {

    /**
     * Sets the content of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} content - The content to set for the element.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setContent(cssSelector, content, shadow) {
        const selector = shadow.querySelector(cssSelector);
        selector.textContent = content;
    }

    /**
     * Sets the link of an element based on a CSS selector.
     * @param {string} url - The link url.
     * @param {string} linkText - The link text.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} name - The name of the element containing the link.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setLink(url, linkText, cssSelector, name, cardType, shadow) {
        if (url != undefined) {
            const linkObj = shadow.querySelector(cssSelector);
            linkObj.href = url;

            // Set link text and aria-label for link based on card type
            let ariaText;
            let newLinkText;
            if (cardType == 'video') {
                ariaText = (linkText != 'now') ? `Watch ${name}, ${linkText}` : `Watch ${name}`; // Change link text if defined
                newLinkText = `Watch ${linkText} →`;
            } else {
                ariaText = `Explore ${name}`;
                newLinkText = 'Explore →';
            }
            linkObj.setAttribute('aria-label', ariaText);
            linkObj.textContent = newLinkText;
        }
    }

    // Web component class representing a card card.
    class CardTile extends HTMLElement {

        // Creates an instance of cardCard
        constructor() {
            super();
            this.cardtype= 'video';
            this.linktext = 'now';
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['cardtype', 'name', 'desc', 'level', 'time', 'link', 'linktext', 'link2', 'linktext2', 'link3', 'linktext3', 'new'];
        }

        /**
         * Called when an attribute is defined or changed.
         * @param {string} property - The name of the attribute.
         * @param {string} oldValue - The old value of the attribute.
         * @param {string} newValue - The new value of the attribute.
        */
        attributeChangedCallback(property, oldValue, newValue) {
            if (oldValue === newValue) return;
            this[property] = newValue;
        }
    
        /**
         * Invoked when the element is added to the document.
        */
        connectedCallback() {
            // Create shadow root for element
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = html;

            // Set card type
            const cardSelector = shadow.querySelector('.card');
            switch (this.cardtype) {
                case 'video':
                    cardSelector.classList.add('video-card');
                    break;
                case 'support':
                    cardSelector.classList.add('support-card');
                    break;
            } 

            // Display new tag
            if (this.new === "true") {setContent('.card-new', "New!", shadow)}; 
            // Set card name
            setContent('.card-name', this.name, shadow);
            // Set card desc
            setContent('.card-desc', this.desc, shadow);
            // Set card level
            setContent('.card-level', this.level, shadow);
            // Set card time
            setContent('.card-time', this.time, shadow);

            // Set card links
            setLink(this.link, this.linktext, '.card-link', this.name, this.cardtype, shadow);
            setLink(this.link2, this.linktext2, '.card-link-2', this.name, this.cardtype, shadow);
            setLink(this.link3, this.linktext3, '.card-link-3', this.name, this.cardtype, shadow);
        }
    }

    // Define new card tile element
    customElements.define('card-tile', CardTile);
}