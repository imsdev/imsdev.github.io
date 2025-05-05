// Fetch HTML template
fetch("web-components/footer/footer.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

/**
 * Creates a web component using a given HTML template.
 * @param {string} html - The HTML template.
 * @returns {void}
 */
function createComponent(html) {
    // Web component class
    class Footer extends HTMLElement {

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
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = html;

            const backToTopBtn = shadow.getElementById('back-to-top');
            // Display button on scroll
            window.onscroll = () => {
                if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.animation = 'fadeInAnimation 1s';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.animation = '';
                }
            }

            // Go back to top on click
            backToTopBtn.addEventListener('click', () => {this.scrollToTop()});
            backToTopBtn.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {this.scrollToTop()};
            });
        }

        // Auto-scrolls to top of page
        scrollToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }

    // Define new CourseCard element
    customElements.define('imscentral-footer', Footer);
}