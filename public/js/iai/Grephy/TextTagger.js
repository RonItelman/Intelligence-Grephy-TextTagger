let TextTagger = {}; //contains all TextTagger functions.
window.TextTagger = TextTagger; //assign to global window
TextTagger.colors = [ //set your highlighter color menu here
    "#FFFB90",  
    "#B3FF90",
    "#90FFF2",
    "#DB90FF",
    "#FF90BE",
    "#FFB190"
];

TextTagger.classNames = ''; //you can add any classNames that get automatically added to a tag, ie 'class1 class2 classN'

TextTagger.style = `margin-right:3px; margin-left:3px; padding-left:10px; padding-right:10px; padding-top:5px; padding-bottom:5px; border-radius:4px; box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.20);`;

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
TextTagger.highlightRange = function(args = {elem, start, length, phrase, input, startSpan}) {
    // console.log('TextTagger.highlightRange');
    let elem = args.elem;
    let start = args.start;
    let length = args.length;
    let phrase = args.phrase;
    let input = args.input;
    let startSpan = args.startSpan;
    let endSpan = `</span>`;
    let insert = TextTagger.insert;
    let prepend = insert({string:input, index:start, insertValue:startSpan});
    let spanLen = startSpan.length;
    let append = insert({string:prepend, index:length+spanLen+start, insertValue:endSpan});
    return append;    
}

TextTagger.getIndexes = function(args = {elem, input, phrase, startSpan}) {    
    console.log('TextTagger.getIndexes');
    let phrase = args.phrase;
    let elem = args.elem;
    let input = args.input;
    let start = input.indexOf(args.phrase);
    console.log(start, phrase);
    let length = phrase.length;
    return {elem, start, length, phrase, input, startSpan:args.startSpan};
};

TextTagger.getJson = function(args = {url}) {    
    let res = fetch(args.url) 
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
 * returns the span with the css for a tag
 */
TextTagger.getStartSpan = function(phraseId) {
    let color = TextTagger.getNextHighlighterColor();    
    return `<span style="background-color:${color}; ${TextTagger.style}" id="TextTagger-phraseId-${phraseId}" class="${TextTagger.classNames}">`;
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
    console.log(args.phrase);
    let startSpan = TextTagger.getStartSpan(args.phraseId);
    let indexes = TextTagger.getIndexes({elem:args.elem, input:args.input, phrase:args.phrase, startSpan});
    input = TextTagger.highlightRange(indexes);                        
    return TextTagger.setText({input, elem:args.elem}); 
};

/**
 * iterates through the phrases and calls the tag method on each of them.
 * updates the input to the new innerHTML of the selected HTML Element
 * @param {Object} args - data, and HTML elem
 */
TextTagger.highlight = function(args) {
    console.log(args);
    let input = args.data.input;
    args.data.phrases.map(function(phrase, phraseId) {
        console.log("phrase", phrase);
        input = TextTagger.tag({elem: args.elem, input, phrase:phrase.text, phraseId});
    });    
};

/**
 * 
 * @param {String} selector - the selector for the html elem to have text tagged.
 * @param {String} url - the api to call to get the JSON
 */
TextTagger.init = function(args = {selector, url}) {
    let elem = document.querySelector(args.selector);
    // elem.setAttribute('style')
    elem.style.lineHeight='40px';
    TextTagger.getJson({url:args.url})
    .then(function(data){
        console.log(data.phrases);
        TextTagger.highlight({data, elem});
    })
    .catch(function(error){
        console.error(error);
    });
}