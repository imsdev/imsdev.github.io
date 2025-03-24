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
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setLink(cssSelector, url, name, shadow) {
        const link = shadow.querySelector(cssSelector);
        link.href = url;
        link.setAttribute('aria-label', `Learn more about ${name}`);
    }

    /**
     * Sets the content of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} src - The image source to set for the element.
     * @param {string} name - The name of the element containing the image.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setImage(cssSelector, src, name, shadow) {
        const courseImg = shadow.querySelector(cssSelector);
        courseImg.src = src;
        courseImg.setAttribute('alt', `${name} badge`);
    }

    // Web component class representing a course card.
    class CourseCard extends HTMLElement {

        // Creates an instance of CourseCard
        constructor() {
            super();
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['name', 'desc', 'imgsrc', 'level', 'cost', 'badge', 'time', 'link', 'livelevel', 'livecost', 'livebadge', 'livetime', 'livelink'];
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
            setImage('.course-img', this.imgsrc, this.name, shadow);
            // Set course name
            setContent('.course-name', this.name, shadow);
            // Set course desc
            setContent('.course-desc', this.desc, shadow);
            // Set course level
            setContent('.course-level', this.level, shadow);
            // Set course cost
            setContent('.course-cost', this.cost, shadow);
            // Set course badge
            setContent('.course-badge', this.badge, shadow);
            // Set course time
            setContent('.course-time', this.time, shadow);
            // Set course link
            setLink('.course-link', this.link, this.name, shadow);

            // Hide live course if not available
            if (this.livelevel == undefined) {
                const liveCourse = shadow.querySelector('.live-course');
                const liveCourseLink = shadow.querySelector('.live-link');
                liveCourse.style.display = liveCourseLink.style.display = "none";
            } else {
                // Set course level
                setContent('.live-level', this.livelevel, shadow);
                // Set course cost
                setContent('.live-cost', this.livecost, shadow);
                // Set course badge
                setContent('.live-badge', this.livebadge, shadow);
                // Set course time
                setContent('.live-time', this.livetime, shadow);
                // Set course link
                setLink('.live-link', this.livelink, this.name, shadow);
            }
        }
    }

    // Define new CourseCard element
    customElements.define('course-card', CourseCard);
}