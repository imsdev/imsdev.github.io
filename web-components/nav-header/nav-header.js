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

            const menuButton = shadow.querySelector('.hamburger-menu'); 
            const menuToggle = shadow.getElementById('menu-toggle');
            const dropdownMenu = shadow.querySelector('.dropdown-menu');
            const searchResults = shadow.getElementById('search-results');
            const menuItems = dropdownMenu.querySelectorAll('a');

            // Toggle dropdown menu on hamburger menu click
            menuButton.addEventListener('click', () => {this.toggleMenu(menuToggle, dropdownMenu, menuItems)});
            menuButton.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {this.toggleMenu(menuToggle, dropdownMenu, menuItems)};
            })
                // Hide search results
                menuButton.addEventListener('focus', () => {searchResults.style.display = 'none';})

            // Hide nav dropdowns when user clicks outside of menu
            const contentBody = document.querySelector('#content');
            contentBody.addEventListener('click', () => {
                // Hide menu if open
                if (menuToggle.checked) {
                    this.toggleMenu(menuToggle, dropdownMenu, menuItems);
                }
                // Hide search results
                searchResults.style.display = 'none';
            })

            // Focus on search
            const searchInput = shadow.getElementById('search-input');
            const searchBar = shadow.querySelector('.search-bar');
            // If focus is on search
            searchInput.addEventListener('focus', () => {
                // Update search bar styling
                searchBar.classList.add('search-bar-focused');
                // Hide menu if open
                if (menuToggle.checked) {
                    this.toggleMenu(menuToggle, dropdownMenu, menuItems);
                }
                // Display search results
                searchResults.style.display = 'block';
            })
            // If focus is off of search
            searchInput.addEventListener('blur', () => {
                // Update search bar styling
                searchBar.classList.remove('search-bar-focused');
            })
            
            // Clear search
            const clearIcon = shadow.getElementById('clear-icon');
            clearIcon.addEventListener('click', () => {this.clearSearch(searchInput, searchResults)});
            clearIcon.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {this.clearSearch(searchInput, searchResults)};
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
                // Get dropdown search results
                const accordions = shadow.querySelectorAll('.cordion');
                accordions.forEach(accordion => {
                    accordion.addEventListener('click', this.handleResultsDropdown.bind(this));
                })
            });

            // Hide dropdown menu for keyboard navigation
            const firstLink = document.querySelector('a');
            firstLink.addEventListener('focus', () => {
                // Hide menu if open
                if (menuToggle.checked) {
                    this.toggleMenu(menuToggle, dropdownMenu, menuItems);
                }
            })
        }

        // Toggle dropdown menu
        toggleMenu(menuToggle, dropdownMenu, menuItems) {
            // Update checked state of menuToggle
            var checkedState = menuToggle.checked ? false : true;
            menuToggle.checked = checkedState;
            // Update display of dropdown menu based on checked state
            if (checkedState) {
                dropdownMenu.style.height = '35em';
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].tabIndex = '0';
                }
            } else {
                dropdownMenu.style.height = '0em';
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].tabIndex = '-1';
                }
            }
        }

        // Handle search result dropdown interaction
        handleResultsDropdown(event) {
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

        // Clear search
        clearSearch(searchInput, searchResults) {
            // Remove input value
            searchInput.value = "";
            const input = searchInput.value;
            // Make search call
            $(searchInput).tipuesearch(input, searchInput, searchResults, 'web-component');
            // Hide search results
            // searchResults.classList.add('hide-results');
            searchResults.style.display = 'none';
        }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}