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
    // Web component class representing the navigation header.
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
                const contentBody = document.querySelector('#content');
                // Dropdown navigation menu
                const menuButton = shadow.querySelector('.hamburger-menu'); 
                const menuToggle = shadow.getElementById('menu-toggle'); 
                const dropdownMenu = shadow.querySelector('.dropdown-menu'); 
                const menuItems = dropdownMenu.querySelectorAll('a'); 
                const documentationMenuItem = menuItems[menuItems.length - 2];
                const supportMenuItem = menuItems[menuItems.length - 1];
                // Search
                const searchForm = shadow.getElementById('search-form'); 
                const searchInput = shadow.getElementById('search-input'); 
                const searchBar = shadow.querySelector('.search-bar'); 
                const clearIcon = shadow.getElementById('clear-icon'); 
                const searchResults = shadow.getElementById('search-results'); 

            // Event listeners for dropdown navigation menu
            // --------------------------------------------------------------------------------------------------
                // Toggle dropdown menu
                menuButton.addEventListener('click', () => {toggleMenu()});
                menuButton.addEventListener('keydown', (event) => {if (event.key === 'Enter') {toggleMenu()}});
                // Hide search results if hamburger menu is focused
                menuButton.addEventListener('focus', () => {searchResults.style.display = 'none';})
                // Hide dropdown menu for keyboard navigation when first link in document is focused
                supportMenuItem.addEventListener('focusout', (event) => {
                    if (event.relatedTarget != documentationMenuItem) {toggleMenu()};
                })

            // Event listeners for all menus
            // --------------------------------------------------------------------------------------------------
                // Hide dropdowns when user clicks outside of search results or nav menu
                contentBody.addEventListener('click', () => {
                    if (menuToggle.checked) {toggleMenu()};
                    searchResults.style.display = 'none';
                })

            // Event listeners for search
            // --------------------------------------------------------------------------------------------------
                // On focus of search
                searchInput.addEventListener('focus', () => {
                    // Highlight search input field
                    searchBar.classList.add('search-bar-focused');
                    // Hide dropdown nav menu if open
                    if (menuToggle.checked) {toggleMenu()};
                    // Display search results
                    searchResults.style.display = 'block';
                })
                // On blur of search
                searchInput.addEventListener('blur', () => {searchBar.classList.remove('search-bar-focused')});
                // On input of search
                searchInput.addEventListener('input', () => {
                    // Display clear search button if input is added
                    let clearSearchState = (searchInput.value.length > 0) ? 'block' : 'none';
                    clearIcon.style.display = clearSearchState;
                })
            
                // Clear search
                clearIcon.addEventListener('click', () => {clearSearch()});
                clearIcon.addEventListener('keydown', (event) => {if (event.key === 'Enter') {clearSearch()}});
            
                // Submission of search input
                searchForm.addEventListener('submit', (event) => {
                    // Prevent page from reloading
                    event.preventDefault();
                    // Make search call
                    $(searchInput).tipuesearch(searchInput.value, searchInput, searchResults, 'web-component');
                    // Get search results
                    const results = shadow.querySelectorAll('.tipue_search_content_title');
                    // Clear search after result is clicked
                    results.forEach(result => {
                        result.addEventListener('click', clearSearch.bind(this));
                    })
                    // Get dropdowns from search results
                    const accordions = shadow.querySelectorAll('.cordion');
                    accordions.forEach(accordion => {
                        accordion.addEventListener('click', handleResultDropdown.bind(this));
                    })
                });

            // Helper functions
            // --------------------------------------------------------------------------------------------------
                // Toggle dropdown navigation menu
                function toggleMenu() {
                    dropdownMenu.classList.toggle('show-menu');
                    // Update checked state of menu toggle
                    menuToggle.checked = menuToggle.checked ? false : true;
                    if (menuToggle.checked) {
                        // Make menu items focusable
                        for (let item of menuItems) {item.tabIndex = '0'};
                    } else {
                        // Make menu items non-focusable
                        for (let item of menuItems) {item.tabIndex = '-1'};
                    }
                }

                // Clear search
                function clearSearch() {
                    searchInput.value = "";
                    searchResults.style.display = clearIcon.style.display = 'none';
                    // Make search call with empty input
                    $(searchInput).tipuesearch(searchInput.value, searchInput, searchResults, 'web-component');
                }

                /**
                 * Handle search result dropdown interaction
                 * @param {event} event - User event
                */
                function handleResultDropdown(event) {
                    const button = event.currentTarget;
                    const arrow = button.firstChild;
                    const desc = button.parentElement.nextElementSibling;
                    // Rotate arrow and display/hide result description
                    arrow.classList.toggle('rotArrow');
                    desc.classList.toggle('search_content_drop');
                }
        }
    }

    // Define new CourseCard element
    customElements.define('nav-header', NavHeader);
}