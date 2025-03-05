// Web component
class VideoCard extends HTMLElement {

    static get observedAttributes() {
        return ['name', 'desc', 'level', 'time', 'link'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }
 
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'closed'});
        shadow.append(
            document.getElementById('video-card').content.cloneNode(true)
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

        // Set video link
        const videoLink = shadow.querySelector('.video-link');
        videoLink.href = this.link;  
        videoLink.setAttribute('alt', `Watch ${this.name} now`);      
    }
}

// Register component
customElements.define('video-card', VideoCard);