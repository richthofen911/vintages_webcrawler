/**
 * Created by richthofen80 on 3/11/15.
 */

var handlePage = require("./pageHandler.js")
var LineByLineReader = require("./node_modules/line-by-line/line-by-line.js")
var http = require("http")
var fs = require('fs')

var url_probe = "http://www.vintages.com/lcbo-ear/vintages/product/details.do?language=EN&itemNumber=385211"
/*
function openPage(url, callback) {
    http.get(url, function(res) {
        var data = ""
        res.on('data', function (chunk) { data += chunk })
        res.on("end", function() { callback(data) })
    }).on("error", function() { callback(null) })
}

openPage(url_probe, function (content) {
    if (content) {
        console.log('probe success')
        fs.appendFile('./temp.txt', content, function(err){
            if (err) { throw err; console.log("Write to file error") }})
    }
    else {
        console.log("probe error")
        return 0
    }
})
*/

var wineType = "Champagne"
/*
handlePage.calcListPageAmountForTheType(wineType)

setInterval(function() {
    var loopTime = handlePage.pageCount
    if (loopTime == 0) {
        console.log("loopTime not ready yet")
    }
    else{
        console.log("ready")
        clearInterval(this)
        handlePage.getProductLinkListForTheType(loopTime, wineType)
    }
}, 100)
*/
/*
lr = new LineByLineReader('~/product_link_list.txt')
lr.on('error', function(err){throw err})
lr.on('line', function(line){handlePage.parseProductPage(line, "Sparkling Wine")})
lr.on('end', function(){console.log("done")})
*/

handlePage.parseProductPage("http://www.vintages.com/lcbo-ear/vintages/product/details.do?language=EN&itemNumber=387829", wineType)