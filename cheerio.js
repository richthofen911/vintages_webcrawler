/**
 * Created by richthofen80 on 3/11/15.
 */

var handlePage = require("./pageHandler.js")
var step = require("step")
var loopTimes
step(
    handlePage.calcListPageAmountForTheType("Sparkling Wine"),
    handlePage.getProductLinkListForTheType(err, pageAmount)
)




//loopTimes = handlePage.calcListPageAmountForTheType("Sparkling Wine")

//handlePage.getProductLinkListForTheType(16, "Sparkling Wine")