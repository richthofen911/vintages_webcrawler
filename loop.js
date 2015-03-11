var page = require('webpage').create()
var count = 0
var buff = new Array()
var urlSet = ["http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME=Red+Wine&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page=1&action=result&sort=sortedName&order=1&resultsPerPage=10", "http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME=Red+Wine&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page=2&action=result&sort=sortedName&order=1&resultsPerPage=10", "http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME=Red+Wine&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page=3&action=result&sort=sortedName&order=1&resultsPerPage=10"]
//var reg = /\/lcbo-ear\/vintages\/product\/details\.do\?language=EN&.{21}/g
url_prefix = "http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME=Red+Wine&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page="
url_suffix = "&action=result&sort=sortedName&order=1&resultsPerPage=10"
url = ""
var urlSetTest = ["http://www.google.com", "http://www.baidu.com", "http://facebook.com"]
function handle_page(url){
    //console.log(url)
    page.open(url, function(){
        page.render("local"+new Date().getTime()+".png")
        console.log("render a page is done")

        //var content = page.content;
        //var reg = /\/lcbo-ear\/vintages\/product\/details\.do\?language=EN&.{21}/g
        //var temp = content.match(reg)
        //buff.push('http://www.vintages.com' + temp[0].replace("amp;", ""))
        //for(var i = 1; i < temp.length; i++){
        //    if(temp[i] != temp[i - 1]){
        //        buff.push('http://www.vintages.com' + temp[i].replace("amp;", ""))
        //    }
        //}

        //console.log(count)
        count++
        //setTimeout(setTimeout(next_page(),10000), 1);
        //new Date().getTime()
        //console.log(new Date().getTime())
        sleep(10000)
        //console.log(new Date().getTime())
        next_page()
    });
}
function next_page(){
    if(count > 2){phantom.exit(0)}
    //url = url_prefix + count + url_suffix
    url = urlSetTest[count];
    handle_page(url);
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for(var i = new Date().getTime(); i - start < milliseconds; i = new Date().getTime()){
        if((i - start)%1000 == 0){
            console.log(i)
        }
    }
}
next_page();
