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
            const shadow = this.attachShadow({mode: 'open'});
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

            // Focus on search
            const searchInput = shadow.getElementById('search-input');
            const searchBar = shadow.querySelector('.search-bar');
            searchInput.addEventListener('focus', () => {
                searchBar.classList.add('search-bar-focused');
            })
            searchInput.addEventListener('blur', () => {
                searchBar.classList.remove('search-bar-focused');
            })

            // Search
            const searchForm = shadow.getElementById('search-form');
            const searchResults = shadow.getElementById('search-results');
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const input = searchInput.value;
                $(searchInput).tipuesearch(input, searchInput, searchResults, 'web-component');
                // const result = search(input, searchInput, searchResults);
                // console.log('Search Input: ', result);

                const accordions = shadow.querySelectorAll('.cordion');
                accordions.forEach(accordion => {
                    accordion.addEventListener('click', this.handleDropdown.bind(this));
                })

                // const pagination = shadow.querySelectorAll('.tipue_search_foot_box');
                // pagination.forEach(page => {
                //     page.addEventListener('click', this.handlePagination.bind(this));
                // })
            });
        }

        handleDropdown(event) {
            // const component = document.querySelector('nav-header');
            // const shadow = component.shadowRoot;
            // const resultDesc = shadow.querySelector('.tipue_search_content_text');
            // const arrow = shadow.querySelector('.fa-angle-right');
            // resultDesc.classList.toggle('search_content_drop');
            // arrow.classList.toggle('rotArrow');

            const button = event.target;
            const parent = button.parentElement;
            const grandparent = parent.parentElement;
            var arrow;
            var description;
            if (button.classList.contains('cordion')) {
                arrow = button.firstChild;
                description = parent.nextElementSibling;
            } else {
                arrow = button;
                description = grandparent.nextElementSibling;
            }
            arrow.classList.toggle('rotArrow');
            description.classList.toggle('search_content_drop');
        }

        // handlePagination(event) {
        //     const component = document.querySelector('nav-header');
        //     const shadow = component.shadowRoot;
        //     const searchResults = shadow.getElementById('search-results');
        //     const searchInput = shadow.getElementById('search-input');

        //     const page = event.target;
        //     const pageId = page.id;
        //     const pageIdArr = pageId.split('_');
        //     // getTipueSearch(parseInt(pageIdArr[0]), pageIdArr[1], set, searchResults, searchInput);
        //     // console.log(pageId);
        // }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}