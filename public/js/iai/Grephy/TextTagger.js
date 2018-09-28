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
    // console.log('TextTagger.tag', elem, phrase);
    let text = phrase.text;
    let start = text.indexOf(text);
    let end = text.lastIndexOf(text);
    console.log(text, start, end);
    TextTagger.highlightRange(elem, start, end)
};

TextTagger.init = function() {
    let selector = `[data-texttagger-power="on"]`;
    let elem = document.querySelector('[data-texttagger-power="on"]');
    // TextTagger.selectTextByRange(elem, 3, 10);
    
    let phrases = data.phrases;
    
    for (let phrase of phrases) {
        let text = phrase.text;
        let chunks = phrase.chunks;
        // console.log(text, chunks);
        TextTagger.tag(elem, phrase);
    }
}

TextTagger.init();