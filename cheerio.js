/**
 * Created by richthofen80 on 3/12/15.
 */
var cheerio  = require('cheerio')
var http = require("http")
var handlePage = require("./pageHandler.js")
var url_probe = "http://www.vintages.com/lcbo-ear/jsp/vin_productSearch.jsp?paramType=Wine&store=Vintages&keywords=&name=&lcbo=&lto=false&am=false&kosher=false&vintages=false&va=false&vqa=false&style=Vintages&language=EN"

handlePage.openPage(url_probe, function (content) {
    if (content) {
        console.log('probe success')
        $ = cheerio.load(content)
        //var types_raw = $("select[name='CATEGORY_NAME']").text().replace(/\s/g, "")
        //types_raw = types_raw.replace(/ALL/, "")
        //types_raw = types_raw.replace(/-/g, "")

        /*.map(function() {
         return $.text([this]);
         }).get().join(" ")
         */


        var types_raw = $("select[name='CATEGORY_NAME']").text()
        var reg_typeSplit = /\s\r\s{4}.+/
        types_raw = types_raw.match(reg_typeSplit).toString().substring(7, types_raw.length)

        console.log(types_raw)
    }
    else {
        console.log("probe error")
        return 0
    }
})
