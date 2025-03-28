// Fetch HTML template
fetch("web-components/hero-section/hero-section.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

// Create web component
function createComponent(html) {

    function setContent(cssSelector, content, shadow) {
        const selector = shadow.querySelector(cssSelector);
        selector.textContent = content;
    }

    function setLink(cssSelector, url, name, shadow) {
        const link = shadow.querySelector(cssSelector);
        link.href = url;
        link.setAttribute('aria-label', `Learn more about ${name}`);
    }

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
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'section', 'desc', 'desc2', 'linktext', 'link', 'linktext2', 'link2'];
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

            setContent('.section', this.section, shadow);
            setContent('.name', this.name, shadow);
            setContent('.desc', this.desc, shadow);
            setLink('.link-primary', this.link, this.name, shadow);
            setContent('.link-primary-text', this.linktext, shadow);
            setLink('.link-secondary', this.link2, this.name, shadow);
            setContent('.link-secondary-text', this.linktext2, shadow);

            // Check if links are external

            switch(this.section) {
                case 'Engage':
                    const selector = shadow.querySelector('.hero');
                    selector.classList.add('engage-bg');
                    setImage('.image', 'wp-content/icons/icon_engage.svg', shadow);
                    break;
            }
        }
    }

    customElements.define('hero-section', HeroSection);
}