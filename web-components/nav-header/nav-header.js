// Fetch HTML template
fetch("web-components/nav-header/nav-header.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

/**
 * Creates a web component using a given HTML template.
 * @param {string} html - The HTML template.
 * @returns {void}
 */
function createComponent(html) {
    // Web component class representing a course card.
    class NavHeader extends HTMLElement {

        // Creates an instance of CourseCard
        constructor() {
            super();
        }

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['name'];
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

            // Menu toggle
            const menuButton = shadow.querySelector('.hamburger-menu');
            const menuToggle = shadow.getElementById('menu-toggle');
            const dropdownMenu = shadow.querySelector('.dropdown-menu');
            menuButton.addEventListener('click', () => {
                var checkedState = menuToggle.checked ? false : true;
                menuToggle.checked = checkedState;
                
                if (checkedState) {
                    dropdownMenu.style.height = '33em';
                } else {
                    dropdownMenu.style.height = '0em';
                    
                }
            })

            const searchInput = shadow.getElementById('search-input');
            const searchBar = shadow.querySelector('.search-bar');
            searchInput.addEventListener('focus', () => {
                searchBar.classList.add('search-bar-focused');
            })
            searchInput.addEventListener('blur', () => {
                searchBar.classList.remove('search-bar-focused');
            })
        }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}