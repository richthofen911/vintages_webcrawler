var page = require('webpage').create()
var fs = require('fs')
var system = require('system')
var args = system.args

parseInfo(args[1], args[2])
//parseInfo(args[1])

//function parseInfo(url){
function parseInfo(url, type){
    page.open(url, function(status) {
        if(status === 'success'){
            console.log('success')
            var wine_type = type

            //console.log(args[2], args[3])

            var reg_data_cspc = /<br>\s{5}VINTAGES\s\d+/gm
            var reg_data_name = /name="itemName" value.+type/
            var reg_data_price = /price"\svalue="\d+\.\d+/gm
            var reg_data_region = /Made\sin:.+</
            var reg_data_release = /<br>\s{5}Release Date:\s{5}.+\n/
            var reg_data_alcohol_pre = wine_type + ",*\\s*\\S*<br>\\s{12}.+\\."
            var reg_data_alcohol = new RegExp(reg_data_alcohol_pre)
            //var reg_data_alcohol = /Champagne,*\s*\S*<br>\s{12}.+\./


            var temp_cspc = page.content.match(reg_data_cspc).toString()
            var temp_name = page.content.match(reg_data_name).toString()
            var temp_price = page.content.match(reg_data_price).toString()
            var temp_region = page.content.match(reg_data_region).toString()
            var temp_release = page.content.match(reg_data_release).toString()
            var temp_alcohol = page.content.match(reg_data_alcohol).toString()

            temp_cspc = temp_cspc.substring(18, temp_cspc.length)
            temp_name = temp_name.substring(25, temp_name.length-6)
            temp_name = temp_name.replace(/=""/g, "")
            temp_price = temp_price.substring(14, temp_price.length)
            temp_region = temp_region.substring(9, temp_region.length-1)
            temp_release = temp_release.substring(27, temp_release.length-1)
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

            fs.write('Programming/phantomJS/vintages/product_description_list.txt', JSON.stringify(tuple)+', \n', 'a')
						
            //fs.write('Programming/phantomJS/vintages/temp.txt', page.content, 'a')
        }
        phantom.exit();

    });
}
