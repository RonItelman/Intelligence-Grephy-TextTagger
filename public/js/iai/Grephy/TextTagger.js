let TextTagger = {};
window.TextTagger = TextTagger;

TextTagger.test = function() {
    console.log("TextTagger active");
};

TextTagger.highlighterColors = function(index) {
    console.log(`index: ${index}`);
    let colors =    [
        "#FFFA87",  
        "#6AFF79",
        "#87F1FF"

    ];
    return colors[index];
}

TextTagger.highlighterIndex = 0;

TextTagger.nextHighlighterIndex = function() {
    // console.log('TextTagger.nextHighlighterIndex: ', TextTagger.highlighterIndex);
    return ++TextTagger.highlighterIndex;
}

TextTagger.getNextHighlighterColor = function() {
    // console.log('TextTagger.getNextHighlighterColor');
    let index = TextTagger.highlighterIndex;
    // console.log(`getNextHighlighterColor index: ${index}`);
    let color =  TextTagger.highlighterColors(TextTagger.highlighterIndex);
    console.log(color);
    TextTagger.nextHighlighterIndex();
    return color;
    // if (TextTagger.highlighterIndex < 3) {
    //     
    //     return color;
    // }    
    // else {
    //     //reset colors
    //     TextTagger.highlighterIndex = 0;
    //     return TextTagger.highlighterColors[TextTagger.highlighterIndex];
    // }
}

TextTagger.insert = function (args) {
    let string = args.string;
    let index = args.index;
    let insertValue = args.insertValue;
    // console.log(string, index, insertValue);
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
    // console.log('TextTagger.getIndexes');
    let phrase = args.phrase;
    let elem = args.elem;
    let input = args.input;
    let start = input.indexOf(args.phrase);
    let length = phrase.length;
    return {elem, start, length, phrase, input, startSpan:args.startSpan};
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

TextTagger.getStartSpan = function() {
    let color = TextTagger.getNextHighlighterColor();
    // console.log('TextTagger.getStartSpan', color);
    return `<span style="background-color:${color}">`;
};

TextTagger.tag = function(args) {
    console.log('TextTagger.tag');
    let startSpan = TextTagger.getStartSpan();
    // console.log(startSpan);
    let indexes = TextTagger.getIndexes({elem:args.elem, input:args.input, phrase:args.phrase, startSpan});
    input = TextTagger.highlightRange(indexes);                        
    console.log(input);
    return TextTagger.setText({input, elem:args.elem}); 
};

/**
 * iterates through the phrases and calls the tag method on each of them.
 * @param {Object} args - data, and HTML elem
 */
TextTagger.highlight = function(args) {
    let input = args.data.input;
    console.log(input);
    data.phrases.map(function(phrase) {
        input = TextTagger.tag({elem: args.elem, input, phrase:phrase.text});
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