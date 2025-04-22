// Fetch HTML template
fetch("web-components/course-card/course-card.html")
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
     * @param {string} cssSelector - The CSS selector of the element to set the link for.
     * @param {string} url - The link url.
     * @param {string} name - The name of the element containing the link.
     * @param {string} linkText - The link text.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setLink(cssSelector, url, name, linkText, shadow) {
        const link = shadow.querySelector(cssSelector);
        link.href = url;
        link.setAttribute('aria-label', `Learn more about ${name}`);
        link.textContent = linkText;
    }

    /**
     * Hides the content of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to hide.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function hideContent(cssSelector, shadow) {
        const selector = shadow.querySelector(cssSelector);
        selector.style.display = 'none';
    }

    // Web component class
    class CourseCard extends HTMLElement {

        // Creates an instance of CourseCard
        constructor() {
            super();
            this.selfpaced = 'true';
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['name', 'session', 'desc', 'imgsrc', 'selfpaced', 'level', 'cost', 'badge', 'time', 'start', 'end', 'link'];
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
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = html;
            
            // Set course img
            const courseImg = shadow.querySelector('.course-img');
            courseImg.src = this.imgsrc;
            courseImg.setAttribute('alt', `${this.name} badge`);
            if (this.selfpaced != 'true') {
                const courseCard = shadow.querySelector('.course-card');
                courseCard.style.alignItems = 'flex-start';
            }

            // Set course name
            setContent('.course-name', this.name, shadow);
            // Set session for live course
            setContent('.live-session', this.session, shadow);
            // Set course desc
            setContent('.course-desc', this.desc, shadow);
            // Set course level
            setContent('.course-level', this.level, shadow);
            // Set course type
            const courseType = this.selfpaced == 'true' ? 'Self-paced: ' : 'Instructor-led: ';
            setContent('.course-type', courseType, shadow);
            // Set course cost
            setContent('.course-cost', this.cost, shadow);
            // Set course badge
            setContent('.course-badge', this.badge, shadow);

            var linkText;
            // Change card content based on self-paced vs live course
            if (this.selfpaced == 'true') {
                // Set course time
                setContent('.course-time', this.time, shadow);
                // Hide course duration
                hideContent('.course-start-g', shadow);
                hideContent('.course-end-g', shadow);
                // Update link text
                linkText = 'Learn more →'
            } else {
                // Set course duration
                setContent('.course-start', this.start, shadow);
                setContent('.course-end', this.end, shadow);
                // Hide course time
                hideContent('.course-time-g', shadow);
                // Update link text
                linkText = 'Register →'
            }
            // Set course link
            setLink('.course-link', this.link, this.name, linkText, shadow);
        }
    }

    // Define new CourseCard element
    customElements.define('course-card', CourseCard);
}