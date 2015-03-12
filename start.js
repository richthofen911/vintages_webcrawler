/**
 * Created by richthofen80 on 3/11/15.
 */

var handlePage = require("./pageHandler.js")
/*
handlePage.calcListPageAmountForTheType("Sparkling Wine")

setInterval(function() {
    var loopTime = handlePage.pageCount
    if (loopTime == 0) {
        console.log("loopTime not ready yet")
    }
    else{
        console.log("ready")
        clearInterval(this)
        handlePage.getProductLinkListForTheType(loopTime, "Sparkling Wine")
    }
}, 100)
*/
handlePage.parseProductPage("http://www.vintages.com/lcbo-ear/vintages/product/details.do?language=EN&itemNumber=270504", "Red Wine")