/**
 * Created by richthofen80 on 3/11/15.
 */
var http = require("http")
var Step = require("step")
var url_probe = "http://www.baidu.com/"
var input2 = "cc c"

function openPage(url, callback) {
    http.get(url, function(res) {
        var data = ""
        res.on('data', function (chunk) { data += chunk })
        res.on("end", function() { callback(data) })
    }).on("error", function() { callback(null) })
}

var cc = 1

openPage(url_probe, function (content) {
    console.log('probe success')
    cc = content.substring(1, 5)
    })

setInterval(function() {
    if (cc == 1) {
        console.log("meibian")
    }
    else{
        console.log(cc)
        clearInterval(this)
    }
}, 100)



