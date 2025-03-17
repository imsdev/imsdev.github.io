// HTML template
const template = document.createElement('template');
template.innerHTML = 
`
    <style>
        :root {
            /* Color */
            --blue: #0f62fe;
                /* Background Color */
                --bg-light-gray: #f4f4f4;

            /* Sizing */
            --plex-18: 1.125em;
            --plex-24: 1.5em; 
        }

        h2 {
            font-weight: 400;
            font-size: var(--plex-24);
            padding: 0em;
            margin: 0em;
        }

        p {
            font-size: var(--plex-18);
        }

        a {
            text-decoration: none;
            color: var(--blue);
        }

        /* Styling for a group of links */
        .link-g {
            margin-top: 1em;
            display: flex;
            flex-flow: column nowrap;
        }

        .link-g a {
            margin: 0.2em 0em;
        }

        /* Styling for video card */
        .video-card {
            background-color: var(--bg-light-gray);
            margin: 1em;
            padding: 2em;
            display: flex;
            flex-flow: column nowrap;
        }

        .video-card div:nth-child(0) {
            flex-grow: 1;
        }
        
        /* Places 'watch now' at the bottom of the video card */
        .video-card div:nth-child(1) {
            flex-grow: 4;
        }

        /* Styling for inline group (level, time) */
        .inline-g {
            display: flex;
            flex-flow: row wrap;
            gap: 1em;
        }

        .inline-g p {
            padding: 0em;
            margin: 0em;
        }

        /* 1024px and above screen sizes */
        @media screen and (min-width: 64em) {
            /* Set consistent height for video card */
            .video-card {
                height: 18.75em;
            }
        }
    </style>
    <div class="video-card">
        <div>
        <h2 class="video-name"></h2>
        <p class="video-desc"></p>
        <div class="inline-g">
            <p><b>Level: </b><span class="video-level"></span></p>
            <p><b>Time: </b><span class="video-time"></span></p>
        </div>
        </div>
        <div class="link-g">
        <a class="video-link" target="_blank" rel="noopener noreferrer"></a>
        <a class="video-link-2" target="_blank" rel="noopener noreferrer"></a>
        <a class="video-link-3" target="_blank" rel="noopener noreferrer"></a>
        </div>
    </div>
`;

// Web component
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
        shadow.append(
            // document.getElementById('video-card').content.cloneNode(true) // Use this line to test template in ims-videos.html
            template.content.cloneNode(true)
        );

        // Set video name
        const videoName = shadow.querySelector('.video-name');
        videoName.textContent = `${this.name}`;

        // Set video desc
        const videoDesc = shadow.querySelector('.video-desc');
        videoDesc.textContent = `${this.desc}`;

        // Set video level
        const videoLevel = shadow.querySelector('.video-level');
        videoLevel.textContent = `${this.level}`;

        // Set video time
        const videoTime = shadow.querySelector('.video-time');
        videoTime.textContent = `${this.time}`;

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
                const altText = (linkText != 'now') ? `Watch ${this.name}, ${linkText}` : `Watch ${this.name}`; // Change link text if defined
                linkObj.setAttribute('alt', altText);
                linkObj.textContent = `Watch ${linkText} →`;
            }
        })
    }
}

// Register component
customElements.define('video-card', VideoCard);