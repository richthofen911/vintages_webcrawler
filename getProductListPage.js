var system = require('system')
var page = require('webpage').create()
var args = system.args
var buff = new Array()
var fs = require('fs')

handle_page(args[1])

function handle_page(url){
    page.open(url, function() {

        var content = page.content;
//        fs.write('Programming/phantomJS/vintages/test.txt', page.content, 'a')
        var reg = /\/lcbo-ear\/vintages\/product\/details\.do\?language=EN&.{21}/g
//        var reg_fix = /item=\d+/
        var temp = content.match(reg)
//        var temp_fix = content.match(reg_fix)

        for (var i = 0; i < temp.length; i++) {
            temp[i] = temp[i].replace("\"", "")
            temp[i] = temp[i].replace("amp;", "")
        }
//        for(var i = 0; i < temp_fix.length; i++){
//            temp_fix[i] = temp_fix[i].replace("\"", "")
//            temp_fix[i] = temp_fix[i].replace("amp;", "")
//        }

        buff.push('http://www.vintages.com' + temp[0])
        for (var i = 1; i < temp.length; i++) {
            if (temp[i] != temp[i - 1]) {
                buff.push('http://www.vintages.com' + temp[i])
            }
        }
//        for(var i = 1; i < temp_fix.length; i++){
//            if(temp_fix[i] != temp_fix[i - 1]){
//                buff.push('https://www.vintagesshoponline.com/vintages/ProductSearchResult.aspx?lang=en&' + temp_fix[i])
//            }
//        }

        for(var i = 0; i < buff.length; i++){
            fs.write('Programming/phantomJS/vintages/crawlog.txt', buff[i]+'\n', 'a')
        }

        phantom.exit(0)
    });
}
