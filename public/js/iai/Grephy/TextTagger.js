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

TextTagger.query = function({phrase, input}) {
    // let i = input.search(phrase);
    // console.log(phrase, input, i);
    phrase.map(function(index) {
        console.log(index, phrase[index]);
    })
    // let matches = input.split(phrase);
    // for(let match of matches) {
    //     console.log(match);
    // }
};

TextTagger.highlightRange = function(el, start, end) {
    var text = el.textContent.trim()
    el.innerHTML = text.substring(0, start) + 
      '<span style="background:yellow">' +
      text.substring(start, end) + 
      "</span>" + text.substring(end);
}

TextTagger.selectTextByRange = function (obj, start, stop) {
    var endNode, startNode = endNode = obj.firstChild
  
    startNode.nodeValue = startNode.nodeValue.trim();
    
    var range = document.createRange();
    range.setStart(startNode, start);
    range.setEnd(endNode, stop + 1);
    
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
 };

TextTagger.init = function() {
    let selector = `[data-texttagger-power="on"]`;
    let elem = document.querySelector('[data-texttagger-power="on"]');
    // TextTagger.selectTextByRange(elem, 3, 10);
    TextTagger.highlightRange(elem, 3, 10)
    // let phrases = data.phrases;
    // for (let phrase of phrases) {
    //     let text = phrase.text;
    //     TextTagger.query({phrase:text, input:data.input});
    //     let type = phrase.type;
    //     let desc = phrase.description;        
    // }
}

TextTagger.init();