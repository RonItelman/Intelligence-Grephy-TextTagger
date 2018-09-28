let TextTagger = {};
window.TextTagger = TextTagger;

TextTagger.test = function() {
    console.log("TextTagger active");
};

TextTagger.highlighterColors = [
    "#fdff88",
    "#a5ff8a",
    "#8cf0ff",
    "#8f9eff",
    "#ff91e9",
    "#ff9f94"
]

TextTagger.highlighterIndex = 0;

TextTagger.highlightRange = function(el, start, end) {
    var text = el.textContent.trim()
    el.innerHTML = text.substring(0, start) + 
      `<span style="background:${TextTagger.highlighterColors[TextTagger.highlighterIndex++]}">` +
      text.substring(start, end) + 
      "</span>" + text.substring(end);
}

TextTagger.tag = function(elem, phrase) {
    console.log('TextTagger.tag', elem, phrase);
    let text = phrase.text;
    let start = text.indexOf(text);
    let end = text.lastIndexOf(text);
    console.log(text, start, end);
    TextTagger.highlightRange(elem, start, end)
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
            let text = phrase.text;        
            TextTagger.tag(elem, text);
        }
    })
    .catch(function(error){
        console.error(error);
    });
}

TextTagger.init();