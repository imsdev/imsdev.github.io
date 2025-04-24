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

            // Variables
            // --------------------------------------------------------------------------------------------------
                // Dropdown navigation menu
                const menuButton = shadow.querySelector('.hamburger-menu'); 
                const menuToggle = shadow.getElementById('menu-toggle'); 
                // Search
                const searchForm = shadow.getElementById('search-form'); 
                const searchInput = shadow.getElementById('search-input'); 
                const searchBar = shadow.querySelector('.search-bar'); 
                const clearIcon = shadow.getElementById('clear-icon'); 
                const searchResults = shadow.getElementById('search-results'); 

            // Event listeners for dropdown navigation menu
            // --------------------------------------------------------------------------------------------------
                // Toggle dropdown menu
                menuButton.addEventListener('click', () => {this.toggleMenu()});
                menuButton.addEventListener('keydown', (event) => {if (event.key === 'Enter') {this.toggleMenu()}});

                // Hide search results if hamburger menu is focused
                menuButton.addEventListener('focus', () => {searchResults.style.display = 'none';})

                // Hide dropdown menu for keyboard navigation when first link in document is focused
                const firstLink = document.querySelector('a');
                firstLink.addEventListener('focus', () => {if (menuToggle.checked) {this.toggleMenu()}});

            // Event listeners for all menus
            // --------------------------------------------------------------------------------------------------
                // Hide dropdowns when user clicks outside of search results or nav menu
                const contentBody = document.querySelector('#content');
                contentBody.addEventListener('click', () => {
                    if (menuToggle.checked) {this.toggleMenu()};
                    searchResults.style.display = 'none';
                })

            // Event listeners for search
            // --------------------------------------------------------------------------------------------------
                // On focus of search
                searchInput.addEventListener('focus', () => {
                    // Highlight search input field
                    searchBar.classList.add('search-bar-focused');
                    // Hide dropdown nav menu if open
                    if (menuToggle.checked) {this.toggleMenu()};
                    // Display search results
                    searchResults.style.display = 'block';
                })
                // On blur of search
                searchInput.addEventListener('blur', () => {searchBar.classList.remove('search-bar-focused')});
            
                // Clear search
                clearIcon.addEventListener('click', () => {this.clearSearch()});
                clearIcon.addEventListener('keydown', (event) => {if (event.key === 'Enter') {this.clearSearch()}});
            
                // Submission of search input
                searchForm.addEventListener('submit', (event) => {
                    // Prevent page from reloading
                    event.preventDefault();
                    // Get user search input
                    const input = searchInput.value;
                    // Make search call
                    $(searchInput).tipuesearch(input, searchInput, searchResults, 'web-component');
                    // Get search results
                    const results = shadow.querySelectorAll('.tipue_search_content_title');
                    // Clear search after result is clicked
                    results.forEach(result => {
                        result.addEventListener('click', this.clearSearch.bind(this));
                    })
                    // Get dropdowns from search results
                    const accordions = shadow.querySelectorAll('.cordion');
                    accordions.forEach(accordion => {
                        accordion.addEventListener('click', this.handleResultDropdown.bind(this));
                    })
                });
        }

        // Toggle dropdown navigation menu
        toggleMenu() {
            const component = document.querySelector('nav-header');
            const shadow = component.shadowRoot;
            const menuToggle = shadow.getElementById('menu-toggle'); 
            const dropdownMenu = shadow.querySelector('.dropdown-menu'); 
            const menuItems = dropdownMenu.querySelectorAll('a'); 

            // Update checked state of menuToggle
            var checkedState = menuToggle.checked ? false : true;
            menuToggle.checked = checkedState;
            // Update display of dropdown menu based on checked state
            if (checkedState) {
                dropdownMenu.classList.add('show-menu');
                // Make menu items focusable
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].tabIndex = '0';
                }
            } else {
                dropdownMenu.classList.remove('show-menu');
                // Make menu items non-focusable
                for (let i = 0; i < menuItems.length; i++) {
                    menuItems[i].tabIndex = '-1';
                }
            }
        }

        /**
         * Handle search result dropdown interaction
         * @param {event} event - User event
        */
        handleResultDropdown(event) {
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
        clearSearch() {
            const component = document.querySelector('nav-header');
            const shadow = component.shadowRoot;
            const searchResults = shadow.getElementById('search-results');
            const searchInput = shadow.getElementById('search-input');

            // Remove input value
            searchInput.value = "";
            const input = searchInput.value;
            // Make search call
            $(searchInput).tipuesearch(input, searchInput, searchResults, 'web-component');
            // Hide search results
            searchResults.style.display = 'none';
        }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}