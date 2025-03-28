// Fetch HTML template
fetch("web-components/hero-section/hero-section.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

// Create web component
function createComponent(html) {

    // Set text content
    function setContent(cssSelector, content, shadow) {
        const selector = shadow.querySelector(cssSelector);
        // Check if span tag is used in desc
        if (content.includes('<span>')) {
            // Update HTML
            selector.innerHTML = content;
        } else {
            // Update the text
            selector.textContent = content;
        }
    }

    // Set link
    function setLink(cssSelector, url, shadow) {
        const link = shadow.querySelector(cssSelector);
        link.href = url;
        // Open new tab for external links
        if (url.includes('https://')) {
            link.setAttribute('target', '_blank');
        }
    }

    // Set image
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
            this.link2 = "";
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'image', 'section', 'desc', 'desc2', 'linktext', 'link', 'linktext2', 'link2'];
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

            // Set content
            setImage('.image', this.image, shadow);
            setContent('.section', this.section, shadow);
            setContent('.name', this.name, shadow);
            setContent('.desc', this.desc, shadow);
            setLink('.button-primary', this.link, shadow);
            setContent('.button-primary-text', this.linktext, shadow);

            // Check if secondary button is used
            if (this.link2 != "") {
                setLink('.button-secondary', this.link2, shadow);
                setContent('.button-secondary-text', this.linktext2, shadow);
            } else {
                // Hide the secondary button if no link is provided
                const buttonSecondary = shadow.querySelector('.button-secondary');
                buttonSecondary.style.display = 'none';
            }

            // Change background and icon based on provided section
            const heroSection = shadow.querySelector('.hero');
            switch(this.section) {
                case 'Engage':
                    heroSection.classList.add('engage-bg');
                    break;
                case 'Learn':
                    heroSection.classList.add('learn-bg');
                    break;
            }
        }
    }

    customElements.define('hero-section', HeroSection);
}