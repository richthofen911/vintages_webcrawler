/**
 * Created by richthofen80 on 3/11/15.
 */
var Step = require("step")
var input = "bbb"

function parseArgument(value){
    return value
}

Step(function readSelf(content) {
        var a = parseArgument(input)
        return a
    },
    function capitalize(err, text) {
        if (err) throw err;
        return text.toUpperCase();
    },
    function showIt(err, newText) {
        if (err) throw err;
        console.log(newText);
    }
);