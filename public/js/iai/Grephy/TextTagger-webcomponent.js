let TextTagger = {}; //contains all TextTagger functions.
window.TextTagger = TextTagger; //assign to global window
TextTagger.colors = [ //set your highlighter color menu here
    "#FFFA87",  
    "#6AFF79",
    "#87F1FF",
    "#E8A7FF"
];

// TextTagger.classNames = ''; //you can add any classNames that get automatically added to a tag, ie 'class1 class2 classN'

// TextTagger.style = ``; //you

/**
 * call if you want to verify functionality of TextTagger
 */
TextTagger.ping = function() {
    console.log("TextTagger response");
};

TextTagger.getColorByIndex = function(index) {
    return TextTagger.colors[index];
}

TextTagger.highlighterIndex = 0;

TextTagger.nextHighlighterIndex = function() {
    return ++TextTagger.highlighterIndex;
}

/**
 * returns the next color in the colors array and loops back to the first if you call for more colors than exists in the array.
 */
TextTagger.getNextHighlighterColor = function() {
    let color;
    if (TextTagger.highlighterIndex < TextTagger.colors.length) {
        color =  TextTagger.getColorByIndex(TextTagger.highlighterIndex);        
    }
    else {
        TextTagger.highlighterIndex = 0;
        color = TextTagger.getColorByIndex(TextTagger.highlighterIndex);
    }
    TextTagger.nextHighlighterIndex();
    return color;
}

TextTagger.insert = function (args) {
    let string = args.string;
    let index = args.index;
    let insertValue = args.insertValue;
    return string.substr(0, index) + insertValue + string.substr(index);
}

/**
 * alters the input string to add a span tag surrounding the phrase within the input text
 * @param {} args 
 */
TextTagger.highlightRange = function(args = {elem, start, length, phrase, input, tag}) {
    console.log('TextTagger.highlightRange');
    let elem = args.elem;
    let start = args.start;
    let length = args.length;
    let phrase = args.phrase;
    let input = args.input;
    let tag = args.tag;
    let tagEnd = `</grephy-texttagger>`;
    let insert = TextTagger.insert;
    let prepend = insert({string:input, index:start, insertValue:tag});
    let spanLen = tag.length;

    let append = insert({string:prepend, index:length+spanLen+start, insertValue:tagEnd});
    console.log(append);
    return append;    
}

TextTagger.getIndexes = function(args = {elem, input, phrase, tag}) {    
    console.log('TextTagger.getIndexes');
    let phrase = args.phrase;
    let elem = args.elem;
    let input = args.input;
    // console.log('phrase: ', phrase, 'input:', input);
    let start = input.indexOf(phrase);
    let length = phrase.length;
    // console.log(`phrase: ${phrase}, elem: ${elem}, input: ${input}, start: ${start}, length: ${length}, tag:${args.tag}`);
    return {elem, start, length, phrase, input, tag:args.tag};
};

TextTagger.getJson = function(args = {_slide_id:1}) {    
    let res = fetch(`http://localhost:3000/api/grephy/1`) 
    .then((response) => {        
         return response.json();
    })    
    .then(function(data){

        return data;
    })
    .catch(function(e) {      
        console.log(e);
    });    
    return res;
};

TextTagger.setText = function(args) {
    let input = args.input;
    let elem = args.elem;
    elem.innerHTML = `${input}`;
    return input;
}

/**
 * creates a <grephy-texttagger></grephy-texttagger>
 */
TextTagger.getTagOpen = function(phraseId) {
    let color = TextTagger.getNextHighlighterColor();    
    return `<grephy-texttagger style="background-color:${color};" id="TextTagger-phraseId-${phraseId}">`;
    // return `<grephy-texttagger style="background-color:${color}; ${TextTagger.style}" id="TextTagger-phraseId-${phraseId}" class="${TextTagger.classNames}">`;
};

/**

 * @param {Object} args 
 * @param {HTMLElement} args.elem - the element containing the text
 * @param {String} args.input - the innerHTML to add span tags to
 * @param {String} args.phrase - the text to tag
 * @param {int} args.phraseId - the index showing the phrase number which can be used as an ID to select spans
 * @return the input text that has been updated with the span
 */
TextTagger.tag = function(args) {
    console.log('TextTagger.tag');
    let tag = TextTagger.getTagOpen(args.phraseId);
    let indexes = TextTagger.getIndexes({elem:args.elem, input:args.input, phrase:args.phrase, tag});
    console.log(indexes);
    let input = TextTagger.highlightRange(indexes);                        
    return TextTagger.setText({input, elem:args.elem}); 
};

/**
 * iterates through the phrases and calls the tag method on each of them.
 * updates the input to the new innerHTML of the selected HTML Element
 * @param {Object} args - data, and HTML elem
 */
TextTagger.highlight = function(args) {
    let input = args.data.input;
    data.phrases.map(function(phrase, phraseId) {
        console.log(input);
        // TextTagger.tag({elem: args.elem, input, phrase:phrase.text, phraseId});
        input = TextTagger.tag({elem: args.elem, input, phrase:phrase.text, phraseId});
        console.log('\n\n\n\n', input);
    });    
};

/**
 * 
 * @param {String} s - the selector for the html elem to have text tagged.
 */
TextTagger.init = function(s) {
    let elem = document.querySelector(s);
    TextTagger.getJson()
    .then(function(data){
        TextTagger.highlight({data, elem});
    })
    .catch(function(error){
        console.error(error);
    });
}

class GrephyTextTagger extends HTMLElement {    

    constructor() {
        super();
        console.log('constructor');
        let template = document.createElement('template');        
        template.innerHTML = 
`
<style>
    span {
        margin-right:3px; 
        margin-left:3px; 
        padding-left:10px; 
        padding-right:10px; 
        padding-top:5px; 
        padding-bottom:5px; 
        border-radius:4px; 
        box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.20);
        font-size:30px;
    }
</style>

<slot></slot>
`        
;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        // let text = this.textContent;
        // let span = document.createElement('span');
        // span.appendChild(document.createTextNode(text));
        // this.innerHtml = '';
        // this.appendChild(span);
        this.addEventListener('click', function(event) {
            console.log('click', event.target.getAttribute('id'));
        });

    }
}

window.customElements.define('grephy-texttagger', GrephyTextTagger);