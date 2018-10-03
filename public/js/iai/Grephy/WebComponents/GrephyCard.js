class GrephyCard extends HTMLElement {    

    constructor() {
        super();
        console.log('Grephycard');
        let template = document.createElement('template');        
        template.innerHTML = 
`
<style>
    .cardWrapper {
        padding:10px;
        box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.20);
        width:96%;
        margin-top:20px;
        border:1px solid red;
    }
</style>
<div class="cardWrapper">test</div>
<slot name="main" class="cardWrapper">

</slot>
`        
;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        let root = shadowRoot.querySelector('.cardWrapper');    
        console.log(root)            ;
        console.log("WTF");
        

    }
}

window.customElements.define('grephy-card', GrephyCard);
