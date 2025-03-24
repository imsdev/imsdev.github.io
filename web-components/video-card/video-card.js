// Fetch HTML template
fetch("web-components/video-card/video-card.html")
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
    function setLink(url, linkText, cssSelector, name, shadow) {
        if (url != undefined) {
            const linkObj = shadow.querySelector(cssSelector);
            linkObj.href = url;
            const ariaText = (linkText != 'now') ? `Watch ${name}, ${linkText}` : `Watch ${name}`; // Change link text if defined
            linkObj.setAttribute('aria-label', ariaText);
            linkObj.textContent = `Watch ${linkText} →`;
        }
    }

    // Web component class
    class VideoCard extends HTMLElement {

        // Creates element with default values
        constructor() {
            super();
            this.level = 'Varies';
            this.time = 'Varies';
            this.linktext = 'now';
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'desc', 'level', 'time', 'link', 'linktext', 'link2', 'linktext2', 'link3', 'linktext3'];
        }

        // Called when an attribute is defined or changed
        attributeChangedCallback(property, oldValue, newValue) {
            if (oldValue === newValue) return;
            this[property] = newValue;
        }
    
        // Invoked when element is added to document
        connectedCallback() {
            // Create shadow root for element
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = html;
            // shadow.append(
            //     // document.getElementById('video-card').content.cloneNode(true) // Use this line to test template in ims-videos.html
            //     template.content.cloneNode(true)
            // );

            // Set video name
            setContent('.video-name', this.name, shadow);
            // Set video desc
            setContent('.video-desc', this.desc, shadow);
            // Set video level
            setContent('.video-level', this.level, shadow);
            // Set video time
            setContent('.video-time', this.time, shadow);
            // Set video links
            setLink(this.link, this.linktext, '.video-link', this.name, shadow);
            setLink(this.link2, this.linktext2, '.video-link-2', this.name, shadow);
            setLink(this.link3, this.linktext3, '.video-link-3', this.name, shadow);
        }
    }

    customElements.define('video-card', VideoCard);
}

// Register component
// customElements.define('video-card', VideoCard);