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
        // Check if content has been specified
        if (content != "") {
            selector.textContent = content;
        } else {
            const hideSelector = cssSelector + "-g";
            hideContent(hideSelector, shadow);
        }
    }

    /**
     * Sets the image of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} image - The image to set for the element.
     * @param {string} name - The name of the element.
     * @param {string} selfpaced - A boolean indicating whether the element is a self-paced course.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setImage(cssSelector, image, name, selfpaced, shadow) {
        const selector = shadow.querySelector(cssSelector);
        // Set image
        selector.src = image;
        // Set alt text
        selector.setAttribute('alt', `${name} badge`);
        // Change styling for self-paced course card
        if (selfpaced != 'true') {
            const courseCard = shadow.querySelector('.course-card');
            courseCard.style.alignItems = 'flex-start';
        }
    }

    /**
     * Sets the content of an element based on a CSS selector.
     * @param {string} cssSelector - The CSS selector of the element to set the content for.
     * @param {string} content - The content to set for the element.
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element.
     * @returns {void}
     */
    function setDesc(cssSelector, content, shadow) {
        const selector = shadow.querySelector(cssSelector);
        // Check if span tag is used in desc
        if ((content != undefined) && (content.includes('<p>'))) {
            // Update HTML
            selector.innerHTML = content;
        } else {
            const paragraph = '<p>' + content + '</p>';
            // Update the text
            selector.innerHTML = paragraph;
        }
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
        if (url != "") {
            link.href = url;
            link.setAttribute('aria-label', `Learn more about ${name}`);
            link.textContent = linkText;
        } else {
            const hideSelector = cssSelector + "-g";
            hideContent(hideSelector, shadow);
        }
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
            this.selfpaced = "";
            this.level = "";
            this.cost = "";
            this.badge = "";
            this.time = "";
            this.start = "";
            this.end = "";
            this.hours = "";
            this.link = "";
            this.registerlink = "";
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['name', 'session', 'desc', 'imgsrc', 'selfpaced', 'level', 'cost', 'badge', 'time', 'start', 'end', 'hours', 'link', 'registerlink'];
        }
        // Course Card Options
            // - id
            // - name
            // - session (for live courses only)
            // - desc: can be written with <p> tags or as plaintext
            // - imgsrc
            // - selfpaced: true or false
            // - level: Beginner, Intermediate, or Advanced
            // - badge: Yes or No
            // - time: x hours
            // - start (for live courses only)
            // - end (for live courses only)
            // - hours (for live courses only)
            // - registerlink (for live courses only)
            // - link

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
            setImage('.course-img', this.imgsrc, this.name, this.selfpaced, shadow);
            // Set course name
            setContent('.course-name', this.name, shadow);
            // Set course desc
            setDesc('.course-desc', this.desc, shadow);
            // Set session for live course
            setContent('.live-session', this.session, shadow);
            // Set course level
            setContent('.course-level', this.level, shadow);
            // Set course type
            let courseType;
            switch (this.selfpaced) {
                case 'true':
                    courseType = 'Self-paced: ';
                    break;
                case 'false':
                    courseType = 'Instructor-led: ';
                    break;
                default:
                    courseType = '';
            }
            // const courseType = this.selfpaced == 'true' ? 'Self-paced: ' : 'Instructor-led: ';
            setContent('.course-type', courseType, shadow);
            // Set course cost
            setContent('.course-cost', this.cost, shadow);
            // Set course badge
            setContent('.course-badge', this.badge, shadow);
            // Set course time
            setContent('.course-time', this.time, shadow);
            // Set course duration
            setContent('.course-start', this.start, shadow);
            setContent('.course-end', this.end, shadow);
            // Set course hours
            setContent('.course-hours', this.hours, shadow);
            // Set course link
            setLink('.course-link', this.link, this.name, 'Learn more →', shadow);
            // Set register link
            setLink('.register-link', this.registerlink, this.name, 'Register →', shadow);
        }
    }

    // Define new CourseCard element
    customElements.define('course-card', CourseCard);
}
