class GrephyHeader extends HTMLElement {    

    constructor() {
        super();
        console.log('GrephyHeader');
        let template = document.createElement('template');        
        template.innerHTML = 
`
<style>
    .back {
        height:40px;
        background-color:white;
        display:flex;
        align-items: center;
        padding:10px;
        box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.20);
        font-size:14px;
        
    }
    .logo {
        width:30px;
    }
    .back a {
        text-decoration:none;
        color:#353535;
    }
    .back img {
        margin-top:15px;
    }
    .back a {
        margin-top:15px;
        margin-left:5px;
    }
</style>

<slot></slot>
<div class="root">
    <div class="back">
        <img height="30"/> 
        <a href="grephy.io">grephy.io</a>
    </div>
</div>
`        
;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content, true);
        let root = shadowRoot.querySelector('.root');                
        let img = root.querySelector('img');
        let src = this.getAttribute('imgSrc');
        img.setAttribute('src', src);

    }
}

window.customElements.define('grephy-header', GrephyHeader);
