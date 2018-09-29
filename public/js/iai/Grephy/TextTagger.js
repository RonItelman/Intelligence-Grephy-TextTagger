let TextTagger = {};
window.TextTagger = TextTagger;

TextTagger.test = function() {
    console.log("TextTagger active");
};

TextTagger.highlighterColors = function(index) {
    let colors =    [
        "#fdff88",
        "#a5ff8a",
        "#8cf0ff",
        "#8f9eff",
        "#ff91e9",
        "#ff9f94"
    ];
    return colors[index];
}

TextTagger.highlighterIndex = 0;

TextTagger.getHighlighterColor = function() {
    // let index`````
}

function insert(str, index, value) {
    console.log("\n\n\n\n",str, index, value);
    return str.substr(0, index) + value + str.substr(index);
}

/**
 * alters the input string to add a span tag surrounding the phrase within the input text
 * @param {} args 
 */
TextTagger.highlightRange = function(args = {elem, start, length, phrase, input}) {
    console.log('TextTagger.highlightRange', args);
    let elem = args.elem;
    let start = args.start;
    let length = args.length;
    let phrase = args.phrase;
    let input = args.input;
    console.log('TextTagger.highlightRange', args);
    let startSpan = `<span style="background-color:${TextTagger.highlighterColors(1)}">`;
    let endSpan = `</span>`;
    console.log(length);
    let prepend = insert(input, start, startSpan);
    let spanLen = startSpan.length;
    let append = insert(prepend, length+spanLen, endSpan);
    console.log(append);
    return append;
    // let appended = [input.slice(0, start), startSpan, input.slice(start, length)+endSpan].join('');
    // console.log(appended);
    // let phrase = args.phrase;
    // let input = args.input;
    // let start = args.start;
    // let elem = args.elem;
    // let length = args.length;
    // return null;
    // input.substr(0, start) + startSpan + input.substr(start);
    // let out2 = [input.slice(length+1, start), startSpan, input.slice(start)+endSpan].join('');
    // let output = out1+out2;
    // console.log(output);
    // for(char of phrase) {

    // }
    // console.log('input: ',input);
    // elem.innerHTML = output;
    // return output;
    // for (let i=0; i<phrase.length;++i) {
    //         let char = phrase.charAt(i);
    //         if (i >= start) {
    //             console.log(char);
    //         }
    // }
        
        
        
        //     el.innerHTML += startSpan;            
        //     let chars = '';
        //     let n=0;
        //     for (n=0; n<end; ++n) {
        //         chars += phrase.charAt(i+n);
                
        //     }
        //     i = n;
        //     el.innerHTML += chars;
        //     console.log(chars);
        //     char += `${char}`;
            
        // }
        // else {
        //     console.log('else');
        // }
        // el.innerHTML += char;
    // }
    // el.innerHTML = phrase.substring(0, start) + 
    //   `<span style="background:${TextTagger.highlighterColors[TextTagger.highlighterIndex++]}">` +
    //   phrase.substring(start, end) + 
    //   "</span>" + phrase.substring(end);
}

TextTagger.getIndexes = function(args = {elem, input, phrase}) {    
    console.log(`phrase: ${args.phrase}, input: ${args.input}`);
    let phrase = args.phrase;
    let elem = args.elem;
    let input = args.input;
    console.log(args.input);
    let start = input.indexOf(args.phrase);
    console.log(`start: ${start}`);    
    let length = phrase.length;
    console.log(`length: ${length}`);
    return {elem, start, length, phrase, input};
};

TextTagger.getJson = function(args = {_slide_id:1}) {
    console.log('TextTagger.getJson()', args);
    // return fetch(`http://localhost:3000/grephy/${args._slide_id}`) 
    let res = fetch(`http://localhost:3000/api/grephy/1`) 
    .then((response) => {
        // console.log(response);
        // let response = resp.json();
        // resolve(response);
        // console.log("resp", response);
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
    
}

TextTagger.init = function() {
    let selector = `[data-texttagger-power="on"]`;
    let elem = document.querySelector('[data-texttagger-power="on"]');
    // TextTagger.selectTextByRange(elem, 3, 10);
    // console.log(`init input: ${input}`);
    TextTagger.getJson()
    .then(function(data){
        console.log(data);
        let phrases = data.phrases;
        let input = data.input;
        TextTagger.setText({input, elem});
        for (let i=0; i<1; ++i) {
        // for (let phrase of phrases) {
            let args = TextTagger.getIndexes({elem, input, phrase:phrases[i].text});
            let tagged = TextTagger.highlightRange(args);            
            TextTagger.setText({input:tagged, elem});
        }
    })
    .catch(function(error){
        console.error(error);
    });
}

TextTagger.init();