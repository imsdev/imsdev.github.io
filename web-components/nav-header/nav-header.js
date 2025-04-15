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
                this.toggleMenu(menuToggle, dropdownMenu);
                // Hide search results
                if (menuToggle.checked) {
                    searchResults.classList.add('hide-results');
                }
            })

            // Hide nav dropdowns when user clicks outside of menu
            const contentBody = document.querySelector('#content');
            const searchResults = shadow.getElementById('search-results');
            contentBody.addEventListener('click', () => {
                // Hide menu
                if (menuToggle.checked) {
                    this.toggleMenu(menuToggle, dropdownMenu);
                }
                // Hide search results
                searchResults.classList.add('hide-results');
            })

            // Focus on search
            const searchInput = shadow.getElementById('search-input');
            const searchBar = shadow.querySelector('.search-bar');
            // If focus is on search
            searchInput.addEventListener('focus', () => {
                // Update search bar styling
                searchBar.classList.add('search-bar-focused');
                // Toggle menu if open
                if (menuToggle.checked) {
                    this.toggleMenu(menuToggle, dropdownMenu);
                }
                // Display search results
                searchResults.classList.remove('hide-results');
            })
            // If focus is off of search
            searchInput.addEventListener('blur', () => {
                // Update search bar styling
                searchBar.classList.remove('search-bar-focused');
            })
            
            // Clear search
            const searchClear = shadow.getElementById('clear-icon');
            searchClear.addEventListener('click', () => {
                searchInput.value = "";
            })
            
            // Search
            const searchForm = shadow.getElementById('search-form');
            // Await submission of search input
            searchForm.addEventListener('submit', (event) => {
                // Prevent page from reloading
                event.preventDefault();
                // Get user search input
                const input = searchInput.value;
                // Make search call
                $(searchInput).tipuesearch(input, searchInput, searchResults, 'web-component');
                
                // const result = search(input, searchInput, searchResults);
                // console.log('Search Input: ', result);
                
                // Get dropdown search results
                const accordions = shadow.querySelectorAll('.cordion');
                accordions.forEach(accordion => {
                    accordion.addEventListener('click', this.handleDropdown.bind(this));
                })

                // // Pagination
                // const pagination = shadow.querySelectorAll('.tipue_search_foot_box');
                // // Add event listener for each box
                // pagination.forEach(page => {
                //     page.addEventListener('click', () => {
                //         console.log('clicked');
                //         // Get dropdown search results
                //         // const accordions = shadow.querySelectorAll('.cordion');
                //         // accordions.forEach(accordion => {
                //         //     accordion.addEventListener('click', this.handleDropdown.bind(this));
                //         // })
                //     });
                // })
            });
        }

        toggleMenu(menuToggle, dropdownMenu) {
            // Update checked state of menuToggle
            var checkedState = menuToggle.checked ? false : true;
            menuToggle.checked = checkedState;
            
            // Update display of dropdown menu based on checked state
            if (checkedState) {
                dropdownMenu.style.height = '33em';
            } else {
                dropdownMenu.style.height = '0em';
            }
        }

        // Handle search result dropdown interaction
        handleDropdown(event) {
            const button = event.target;
            const parent = button.parentElement;
            const grandparent = parent.parentElement;
            var arrow;
            var description;
            // Check if user clicked on button - assign variables
            if (button.classList.contains('cordion')) {
                arrow = button.firstChild;
                description = parent.nextElementSibling;
            // If user clicked on icon, change variable assignment
            } else {
                arrow = button;
                description = grandparent.nextElementSibling;
            }
            // Rotate arrow and display/hide result description
            arrow.classList.toggle('rotArrow');
            description.classList.toggle('search_content_drop');
        }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}