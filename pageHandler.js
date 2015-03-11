/**
 * Created by richthofen80 on 3/11/15.
 */
var http = require("http");
var fs = require('fs')
reg_productLink = /\/lcbo-ear\/vintages\/product\/details\.do\?language=EN&itemNumber=\d+/g
url_prefix_1="http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME="
url_prefix_2="&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page="
url_suffix="&action=result&sort=sortedName&order=1&resultsPerPage=10"

function openPage(url, callback) {
    http.get(url, function(res) {
        var data = ""
        res.on('data', function (chunk) { data += chunk })
        res.on("end", function() { callback(data) })
    }).on("error", function() { callback(null) })
}


exports.calcListPageAmountForTheType = function(type) {
    var totalPages = 0
    var wineType = type.replace(" ", "+")
    var url_probe = url_prefix_1 + wineType + url_prefix_2 + 1 + url_suffix
    //open the 1st page of a certain type of wine's search page to find total results to calculate loop times
    openPage(url_probe, function (content) {
        if (content) {
            console.log('probe success')
            var reg_totalResults = /1\s-\s10\sof\s\d+/
            var totalResults = content.match(reg_totalResults).toString()
            totalPages = Math.ceil(totalResults.substring(10, totalResults.length) / 10)
            console.log('total pages ' + totalPages)
            return totalPages
        }
        else {
            console.log("probe error")
            return 0
        }
    })
}

//exports.getProductLinkListForTheType = function(pageAmount, wineType){
exports.getProductLinkListForTheType = function(pageAmount){
        for(var i = 1; i <= pageAmount; i++){
            //var url = url_prefix_1 + wineType + url_prefix_2 + i + url_suffix
            var url = url_prefix_1 + "Sparkling Wine" + url_prefix_2 + i + url_suffix
            openPage(url, function(content){
                if(content){
                    var temp = content.match(reg_productLink)
                    for (var i = 0; i < temp.length; i++) {
                        temp[i] = temp[i].replace("\"", "")
                        temp[i] = temp[i].replace("amp;", "")
                    }
                    var buff = new Array()
                    buff.push('http://www.vintages.com' + temp[0])
                    for (var i = 1; i < temp.length; i++) {
                        if (temp[i] != temp[i - 1]) {
                            buff.push('http://www.vintages.com' + temp[i])
                        }
                    }
                    for(var i = 0; i < buff.length; i++){
                        fs.appendFile('Programming/phantomJS/vintages_crawler/crawlog.txt', buff[i]+ '\n', function(err){
                            if (err) {
                                throw err
                                console.log("Write to file error")
                            }})
                    }
                }
                else console.log("get pageList error")
            })
        }
}