// Fetch HTML template
fetch("web-components/hero-section/hero-section.html")
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
        // Check if span tag is used in desc
        if ((content != undefined) && (content.includes('<p>'))) {
            // Update HTML
            selector.innerHTML = content;
        } else {
            // Update the text
            selector.textContent = content;
        }
    }

     /**
     * Sets the link of an element based on a CSS selector
     * @param {string} cssSelector - The CSS selector of the element to set the link for
     * @param {string} url - The link url
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element
     * @param {string} name - The name of the element containing the link
     * @returns {void}
     */
    function setLink(cssSelector, url, shadow, name) {
        name = name || "";
        const link = shadow.querySelector(cssSelector);
        link.href = url;
        // Open new tab for external links
        if (url.includes('https://')) {
            link.setAttribute('target', '_blank');
        }
        // Set aria-label if needed
        if (name != "") {
            link.setAttribute('aria-label', `See details on ${name}`);
        }
    }

    /**
     * Sets the image of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} src - The image to set for the element.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setImage(cssSelector, src, shadow) {
        const image = shadow.querySelector(cssSelector);
        image.src = src;
        image.setAttribute('alt', '');
    }

    // Web component class
    class HeroSection extends HTMLElement {

        // Creates element with default values
        constructor() {
            super();
            this.highlightsub = 'Coming soon';
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['name', 'image', 'section', 'desc', 'linktext', 'link', 'linktext2', 'link2', 'highlight', 'highlightsub', 'highlightlink'];
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
    
        // Invoked when element is added to document
        connectedCallback() {
            // Create shadow root for element
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = html;

            const heroSection = shadow.querySelector('.hero-section');
            const hero = shadow.querySelector('.hero');
            const subheader = shadow.querySelector('.section');

            // Set content
            setImage('.image', this.image, shadow);
            setContent('.section', this.section, shadow);
            setContent('.name', this.name, shadow);
            setContent('.desc', this.desc, shadow);

            // Enlarge icon for specified pages
            if (this.name == 'IMS videos' || this.name == 'IMS on GitHub') {
                const img = shadow.querySelector('.image');
                img.classList.add('large-icon');
            }

            // Display highlight card if content is provided
            if (this.highlight != undefined) {
                setContent('.highlight-sub', this.highlightsub, shadow);
                setContent('.highlight', this.highlight, shadow);
                setLink('.highlight-link', this.highlightlink, shadow, this.highlight);
                hero.classList.add('hero-highlight');
            } else {
                const highlightCard = shadow.querySelector('.highlight-card');
                highlightCard.style.display = 'none';
            }

            // Check if primary button is used
            if (this.link != undefined) {
                setLink('.button-primary', this.link, shadow);
                setContent('.button-primary-text', this.linktext, shadow);
            } else {
                // Hide the secondary button if no link is provided
                const buttonPrimary = shadow.querySelector('.button-primary');
                buttonPrimary.style.display = 'none';
                hero.classList.add('hero-no-buttons');
            }

            // Check if secondary button is used
            if (this.link2 != undefined) {
                setLink('.button-secondary', this.link2, shadow);
                setContent('.button-secondary-text', this.linktext2, shadow);
            } else {
                // Hide the secondary button if no link is provided
                const buttonSecondary = shadow.querySelector('.button-secondary');
                buttonSecondary.style.display = 'none';
            }

            // Change background and icon based on provided section
            switch(this.section) {
                case 'Engage':
                    if ((this.name).includes('Internship')) {
                        heroSection.classList.add('internship-bg');
                        hero.classList.add('blur-bg');
                    } else {
                        heroSection.classList.add('engage-bg');
                    }
                    break;
                case 'Learn':
                    heroSection.classList.add('learn-bg');
                    break;
                case 'Innovate':
                    heroSection.classList.add('innovate-bg');
                    break;
                case 'Support':
                    heroSection.classList.add('learn-bg');
                    break;
                case '404':
                    heroSection.classList.add('black-bg');
                    subheader.classList.add('hidden');
            }
        }
    }

    customElements.define('hero-section', HeroSection);
}