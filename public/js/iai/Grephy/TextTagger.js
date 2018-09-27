let TextTagger = {};
window.TextTagger = TextTagger;

TextTagger.test = function() {
    console.log("TextTagger active");
};

TextTagger.init = function() {
    let selector = `[data-texttagger-power="on"]`;
    let elems = document.querySelectorAll(selector);
    let (elem of elems) {
        console.log(elem);
    }
    console.log("I am going to scan the DOM for any elements with the attribute data-tt and output their value");
}

TextTagger.init();