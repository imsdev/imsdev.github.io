// Fetch HTML template
fetch("web-components/jump-links/jump-links.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

/**
 * Creates a web component using a given HTML template.
 * @param {string} html - The HTML template.
 * @returns {void}
 */
function createComponent(html) {

     /**
     * Create list item with jump link and add to list
     * @param {string} link - The jump link
     * @param {boolean} shadow - A boolean indicating whether to use the shadow DOM for the element
     * @returns {void}
    */
    function createLink(link, shadow) {
        const newListItem = document.createElement('li');

        // Add jump link icon
        const newImage = document.createElement('img');
        newImage.src = "wp-content/icons/icon_jump-link.svg";
        newImage.alt = "jump link";
        newListItem.appendChild(newImage);

        // Add jump link
        const newLink = document.createElement('a');
        newLink.textContent = link;
        const linkSrc = "#" + (link.toLowerCase().replaceAll(' ', '-'));
        newLink.href = linkSrc;
        newListItem.appendChild(newLink);

        // Add new list item to list
        const list = shadow.querySelector('.list');
        list.appendChild(newListItem);
    }

    // Web component class
    class JumpLinks extends HTMLElement {

        /**
         * Returns an array of properties to observe.
         * @returns {Array} An array of property names.
        */
        static get observedAttributes() {
            return ['links'];
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

            // Create array from link list
            const linksArr = (this.links).split(', ');
            // Add link to jump link list
            linksArr.forEach(link => {
                createLink(link, shadow);
            });
        }
    }

    // Define new JumpLink element
    customElements.define('jump-links', JumpLinks);
}