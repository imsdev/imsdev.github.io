// Fetch HTML template
fetch("web-components/video-card/video-card.html")
    .then(stream => stream.text())
    .then(text => createComponent(text))

// Create web component
function createComponent(html) {
    // Web component class
    class VideoCard extends HTMLElement {

        // Creates element with default values
        constructor() {
            super();
            this.level = 'Varies';
            this.time = 'Varies';
            this.linktext = 'now';
        }

        // Return array of properties to observe
        static get observedAttributes() {
            return ['name', 'desc', 'level', 'time', 'link', 'linktext', 'link2', 'linktext2', 'link3', 'linktext3'];
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
            // shadow.append(
            //     // document.getElementById('video-card').content.cloneNode(true) // Use this line to test template in ims-videos.html
            //     template.content.cloneNode(true)
            // );

            // Set video name
            const videoName = shadow.querySelector('.video-name');
            videoName.textContent = this.name;

            // Set video desc
            const videoDesc = shadow.querySelector('.video-desc');
            videoDesc.textContent = this.desc;

            // Set video level
            const videoLevel = shadow.querySelector('.video-level');
            videoLevel.textContent = this.level;

            // Set video time
            const videoTime = shadow.querySelector('.video-time');
            videoTime.textContent = this.time;

            // Set video links
            const videoLink = shadow.querySelector('.video-link');
            const videoLink2 = shadow.querySelector('.video-link-2');
            const videoLink3 = shadow.querySelector('.video-link-3');
            const links = [
                [this.link, this.linktext, videoLink],
                [this.link2, this.linktext2, videoLink2],
                [this.link3, this.linktext3, videoLink3]
            ]

            links.forEach(link => {
                const url = link[0];
                const linkText = link[1];
                const linkObj = link[2];

                // Check if urls have been defined
                if (url != undefined) {
                    linkObj.href = url;
                    const ariaText = (linkText != 'now') ? `Watch ${this.name}, ${linkText}` : `Watch ${this.name}`; // Change link text if defined
                    linkObj.setAttribute('aria-label', ariaText);
                    linkObj.textContent = `Watch ${linkText} →`;
                }
            })
        }
    }

    customElements.define('video-card', VideoCard);
}

// Register component
// customElements.define('video-card', VideoCard);