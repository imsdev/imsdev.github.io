// Fetch HTML template
fetch("web-components/course-card/course-card.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

// Create web component
function createComponent(html) {
    // Web component class
    class CourseCard extends HTMLElement {

        // Creates element with default values
        constructor() {
            super();
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'desc', 'level', 'cost', 'badge', 'time', 'link', 'imgsrc'];
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

            // Set course name
            const courseName = shadow.querySelector('.course-name');
            courseName.textContent = this.name;

            // Set course desc
            const courseDesc = shadow.querySelector('.course-desc');
            courseDesc.textContent = this.desc;

            // Set course level
            const courseLevel = shadow.querySelector('.course-level');
            courseLevel.textContent = this.level;

            // Set course cost
            const courseCost = shadow.querySelector('.course-cost');
            courseCost.textContent = this.cost;

            // Set course badge
            const courseBadge = shadow.querySelector('.course-badge');
            courseBadge.textContent = this.badge;

            // Set course time
            const courseTime = shadow.querySelector('.course-time');
            courseTime.textContent = this.time;

            // Set course link
            const courseLink = shadow.querySelector('.course-link');
            courseLink.href = this.link;
            courseLink.setAttribute('aria-label', `Learn more about ${this.name}`);

            // Set course img
            const courseImg = shadow.querySelector('.course-img');
            courseImg.src = this.imgsrc;
            courseImg.setAttribute('alt', `${this.name} badge`);
        }
    }

    customElements.define('course-card', CourseCard);
}