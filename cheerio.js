/**
 * Created by richthofen80 on 3/11/15.
 */

var handlePage = require("./pageHandler.js")

//var loopTimes = 0



handlePage.calcListPageAmountForTheType("Sparkling Wine")

setInterval(function() {
    var det = handlePage.pageCount
    if (det == 0) {
        console.log("meibian")
        console.log(det)
    }
    else{
        console.log("bianle")
        console.log(det)
        clearInterval(this)
    }
}, 100)

//handlePage.getProductLinkListForTheType(16, "Sparkling Wine")