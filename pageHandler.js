/**
 * Created by richthofen80 on 3/11/15.
 */
var http = require("http")
var fs = require('fs')
reg_productLink = /\/lcbo-ear\/vintages\/product\/details\.do\?language=EN&itemNumber=\d+/g
url_prefix_1="http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME="
url_prefix_2="&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page="
url_suffix="&action=result&sort=sortedName&order=1&resultsPerPage=10"

var pageCount = 0
exports.pageCount = pageCount

function openPage(url, callback) {
    http.get(url, function(res) {
        var data = ""
        res.on('data', function (chunk) { data += chunk })
        res.on("end", function() { callback(data) })
    }).on("error", function() { callback(null) })
}

type_global = "Sparkling Wine"

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
            exports.pageCount = totalPages
            console.log('now pageCount is ' + pageCount)
        }
        else {
            console.log("probe error")
            return 0
        }
    })
}

exports.getProductLinkListForTheType = function(pageAmount, type){
    var wineType = type.replace(" ", "+")
    for(var i = 1; i <= pageAmount; i++){
        var url = url_prefix_1 + wineType + url_prefix_2 + i + url_suffix
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
                    fs.appendFile('Programming/phantomJS/vintages_crawler/product_links.txt', buff[i]+ '\n', function(err){
                        if (err) { throw err; console.log("Write to file error") }})
                }
            }
            else console.log("get pageList error")
        })
    }
}

exports.parseProductPage = function(url, type){
    var wine_type = type
    openPage(url, function(content){
        if(content){
            //if (err) { throw err; console.log("Write to file error") }})
            //var reg_data_cspc = /<br>\s{5}VINTAGES/
            var reg_data_cspc = /name="itemNumber" value="\d+/g
            var reg_data_name = /name="itemName" value.+type/
            var reg_data_price = /price"\svalue="\d+\.\d+/gm
            var reg_data_region = /Made\sin:.+</
            //var reg_data_release = /<[Bb][Rr]>\s{5}Release Date:\s{5}.+\n/
            var reg_data_release = /\s{5}Release Date:\s+.+\s/
            var reg_data_alcohol_pre = wine_type + ",*\\s*\\S*<br>\\s{12}.+\\."
            var reg_data_alcohol = new RegExp(reg_data_alcohol_pre)

            var temp_cspc = content.match(reg_data_cspc).toString()
            var temp_name = content.match(reg_data_name).toString()
            var temp_price = content.match(reg_data_price).toString()
            var temp_region = content.match(reg_data_region).toString()
            var temp_release = content.match(reg_data_release).toString()
            var temp_alcohol = content.match(reg_data_alcohol).toString()

            temp_cspc = temp_cspc.substring(25, temp_cspc.length)
            temp_name = temp_name.substring(25, temp_name.length-6)
            temp_name = temp_name.replace(/=""/g, "")
            temp_price = temp_price.substring(14, temp_price.length)
            temp_region = temp_region.substring(9, temp_region.length-1)
            temp_release = temp_release.substring(24, temp_release.length-1)
            temp_alcohol = temp_alcohol.substring(temp_alcohol.length-18, temp_alcohol.length)

            if(temp_release == 'N/A'){temp_release = false}

            var tuple = {}
            tuple["url"] = url
            tuple["cspc"] = temp_cspc
            tuple["friendly"] = temp_name
            tuple["type"] = type
            tuple["alcohol"] = temp_alcohol
            tuple["price"] = temp_price
            tuple["region"] = temp_region
            tuple["release"] = temp_release

            console.log(JSON.stringify(tuple))

            fs.appendFile('Programming/phantomJS/vintages_crawler/product_description_list.txt', JSON.stringify(tuple)+', \n', function(err){
                if (err) { throw err; console.log("Write to file error") }})

        }
        else console.log("get product page error")
    })
}
