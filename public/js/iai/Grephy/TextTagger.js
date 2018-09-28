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

TextTagger.highlightRange = function(el, start, end, phrase) {
    console.log(phrase, start, end);
    // el.innerHTML = '';
    for (let i=0; i<phrase.length;++i) {
            let char = phrase.charAt(i);
            console.log(char);
    }
        // if (i >= start) {
        //     let startSpan = `<span style="background:${TextTagger.highlighterColors(1)}">`;
        //     let endSpan = `</span>`
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

TextTagger.tag = function(elem, input, phrase) {
    console.log('TextTagger.tag', phrase);
    let start = input.indexOf(phrase);
    let len = phrase.length;
    TextTagger.highlightRange(elem, start, len, phrase)
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

TextTagger.init = function() {
    let selector = `[data-texttagger-power="on"]`;
    let elem = document.querySelector('[data-texttagger-power="on"]');
    // TextTagger.selectTextByRange(elem, 3, 10);
    let json = TextTagger.getJson()    
    .then(function(data) {
        let phrases = data.phrases;
        for (let phrase of phrases) {
            TextTagger.tag(elem, data.input, phrase.text);
        }
    })
    .catch(function(error){
        console.error(error);
    });
}

TextTagger.init();