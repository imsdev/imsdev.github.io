// Fetch HTML template
fetch("web-components/course-card/course-card.html")
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

    // Web component class
    class CourseCard extends HTMLElement {

        // Creates element with default values
        constructor() {
            super();
            this.selfpaced = 'true';
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'desc', 'imgsrc', 'selfpaced', 'level', 'cost', 'badge', 'time', 'link'];
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
            
            // Set course img
            const courseImg = shadow.querySelector('.course-img');
            courseImg.src = this.imgsrc;
            courseImg.setAttribute('alt', `${this.name} badge`);

            // Set course name
            setContent('.course-name', this.name, shadow);
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
            // Set course time
            setContent('.course-time', this.time, shadow);
            // Set course link
            setLink('.course-link', this.link, this.name, shadow);

            // Hide live course if not available
            // if (this.livelevel == undefined) {
            //     const liveCourse = shadow.querySelector('.live-course');
            //     const liveCourseLink = shadow.querySelector('.live-link');
            //     liveCourse.style.display = liveCourseLink.style.display = "none";
            // } else {
            //     // Set course level
            //     setContent('.live-level', this.livelevel, shadow);
            //     // Set course cost
            //     setContent('.live-cost', this.livecost, shadow);
            //     // Set course badge
            //     setContent('.live-badge', this.livebadge, shadow);
            //     // Set course time
            //     setContent('.live-time', this.livetime, shadow);
            //     // Set course link
            //     setLink('.live-link', this.livelink, this.name, shadow);
            // }
        }
    }

    customElements.define('course-card', CourseCard);
}