// Fetch HTML template
// fetch("web-components/video-card/video-card.html")
//     .then(stream => stream.text())
//     .then(text => createComponent(text))

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
            return ['name', 'img', 'section', 'desc', 'desc2', 'link'];
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
        }
    }

    customElements.define('hero-section', HeroSection);
}