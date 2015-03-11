// *Disclaimer - Structured Pseudocode
var tastingList = false,
    scrapeID =  {
                    "winealign":  {
                                      "location": "ON", // Province
                                      "flight":   function(startURL){
                                                  var startURL = startURL || "http://www.winealign.com/wines?per_page=25";
                                                  var pageHTML = wget(startURL),
                                                      resumePage = startURL.indexOf("?page=");
                                                  if (resumePage) {
                                                    resumePage = startURL.slice((resumePage+6), startURL.indexOf("&per_"));
                                                  }
                                                  var pageCount = pageHTML.find(".pagination_box.pagination_container .pagination .next_page").prevSibling().html().trim();
                                                  var pageParamIndice = (startURL.indexOf("?")+1);
                                                  startURL = startURL.slice(0, pageParamIndice)+"page={#}&"+startURL.slice(pageParamIndice);
                                                /* Don't think it's necessary anymore
                                                  var endIndice = productURL.indexOf(".com\/"),
                                                      domainID = false;
                                                  domainID =  productURL.slice((productURL.slice(0, endIndice).indexOf(".")+1), endIndice); */
                                                  for (var x = ((resumePage)?resumePage:0); x <= pageCount; x++) {
                                                    var productListURL = startURL.replace(/\{\#\}/, x);
                                                    if (!productURL) {
                                                      alert("Need an actual URL to do some work, exiting now");
                                                      return false;
                                                    }
                                                    var productListHTML = wget( productListURL );
                                                    productListHTML.find( "#wines tr[id] td.wine_desc a" ).each(function(wineURL) {
                                                      var wineHTML = wget(wineURL);
                                                      var newWine = scrapeID[domainID]["taste"](wineDS.attr(""));
                                                      if ( (("cspc" in newWine)&&newWine["cspc"]!="")&& (("vintage" in newWine)&&newWine["vintage"]!="")) {
                                                        if (!tastingList) {
                                                          tastingList = {};
                                                        }
                                                        var tasteKey = [ newWine["cspc"], newWine["vintage"], domainID ].join("-");   // cspc-2015-winealign
                                                        if (tasteKey in tastingList) {
                                                          // merge information?
                                                         } else {
                                                          tastingList[tasteKey] = Object.clone(newWine);
                                                        }
                                                       } else {
                                                        alert("didn't have anything good to show for "+wineURL);
                                                        console.log(newWine);
                                                      }
                                                    });
                                                  }
                                                },
                                      "taste":  function(wineDS, url) {
                                                  var newWine = {
                                                                    "url":          url.toString(),   // http://www.winealign.com/wines/70675-Dom-Perignon-Brut-Vintage-Champagne-2004
                                                                    "cspc":         wineDS.find("div.hidden").html().split("ON-").pop().trim(),    // 280461 - vintage id (specific id for product option) *primary key
                                                                    "vintage":      ,   // 2004 *primary key
                                                                    "friendly":     wineDS.find("h2[itemprop=\"itemreviewed\"]").html().trim() // <h2 itemprop="itemreviewed">Möet &amp; Chandon Dom Pérignon Vintage Brut Champagne 2000</h2>
                                                                    "image":        wineDS.find(".zoom a[href]").attr("href").html().trim(),   // https://winealign-production.s3.amazonaws.com/wine_labels/0013/0925/Dom-Perignon--_28V_29-2000-Label.jpg
                                                                    "type":         false,   // Champagne
                                                                    "currency":     wineDS.find("meta[itemprop=\"currency\"]").attr("content").trim(),   // CAD
                                                                    "price":        wineDS.("span[itemprop=\"price\"]").html().trim(),       // $219.95
                                                                    "region":       false,   // "AOC" Applacian au Controlleir(control area) - Champagne, France
                                                                    "score":        wineDS.find(".wine-score").html().trim(),   // 94
                                                                    "release":      wineDS.find("").html(),   // August 30, 2014
                                                                    "agent":        wineDS.find("").html()    // Charton Hobbs
                                                                }
                                                      descDS = wineDS.find(".wine_view_box"),
                                                      regionDS = false,
                                                      vgDS = false;

                                                  vgDS = descDS.find("h4");
                                                    newWine["type"] = vgDS.find("a:first-of-type").html().trim();
                                                    var startIndice = vgDS.html().indexOf("<br>");
                                                    newWine["region"] = vgDS.html().slice(startIndice, -5).trim();

                                                  var vgLink = vgDS.find("a:first-of-type").attr("href").trim();
                                                  if ( varietalGlossary.indexOf(vgLink) < 0) {
                                                    varietalGlossary.push( vgLink );
                                                  }

                                                  var bcLink = wineDS.find(".wd46 a").attr("href").trim();
                                                  if ( bottleCount.indexOf(bcLink) < 0 ) {
                                                    bottleCount.push( bcLink );
                                                  }
                                                  return newWine;
                                                }
                                }
                },
    wineList = {},
    varietalGlossary = [],
    bottleCount = [],
    sample = {
                "datasource":  {
                                  "location": "ON", // Province
                                  "flight":   function(startURL) {},
                                  "taste":    function(startURL) {}
                              }
             };

function winewise(startID) {
  var wineKeys = Object.Keys(srapeID);
  if (scrapeID) {
    if (startID && (startID in scrapeID)) {
      scrapeID[startID].flight();
    } else {
      wineKeys.map(function(wineSource) {
        scrapeID[startID].flight();
      });
    }
  }
}
winewise();



/*wine =  {
            "url":          "",   // http://www.winealign.com/wines/70675-Dom-Perignon-Brut-Vintage-Champagne-2004
            "cspc":         ""    // 280461 - vintage id (specific id for product option) *primary key Canadian Standard Product Code
            "vintage":      "",   // 2004 *primary key
            "friendly":     "",   // Dom Pérignon Brut Vintage Champagne 2004, Ac
            "image":        "",   // https://winealign-production.s3.amazonaws.com/wine_labels/0013/0925/Dom-Perignon--_28V_29-2000-Label.jpg
            "type":         "",   // Champagne
            "price":        "",   // $219.95
            "region":       "",   // "AOC" Applacian au Controlleir(control area) - Champagne, France
            "release":      "",   // August 30, 2014
            "agent":        ""    // Charton Hobbs
        }
drink("http://www.winealign.com/wines/70675-Dom-Perignon-Brut-Vintage-Champagne-2004");
*/
/* Related Vintages Markup
<div class="other-details">
<div><label>Release:</label><span>November 21, 2009</span></div><div><label>Agent:</label><span><a href="http://www.winealign.com/wine_agents/960">Charton Hobbs</a></span></div>
<div class="related-vintages">
<label>Related Vintages</label>
<div>
<div title="Previous Vintage" class="vintage">
<div class="year">
<a href="http://www.winealign.com/wines/22022-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2002">2002</a>
</div>
<div score="4.9" class="wines-score">
<img width="46" height="46" title="94" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="94">94
</div>
</div>
<div title="Previous Vintage" class="vintage">
<div class="year">
<a href="http://www.winealign.com/wines/25732-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2003">2003</a>
</div>
<div score="4.9" class="wines-score">
<img width="46" height="46" title="94" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="94">94
</div>
</div>
<div title="Current Vintage" class="vintage">
<div class="year">
<a href="http://www.winealign.com/wines/70675-Dom-Perignon-Brut-Vintage-Champagne-2004">2004</a>
</div>
<div score="5.2" class="wines-score">
<img width="46" height="46" title="97" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="97">97
</div>
</div>

</li>
</ul>
</div>



<h3 id="reviews">Critic Reviews (1)</h3>
<div class="person-review last">

<div style="margin-top:10px" class="clear_line"></div>
</div>
<div id="" class="person-review">
<div class="img">
<a href="http://www.winealign.com/profile/3333-John-Szabo%2C-MS"><img title="John Szabo, MS" src="https://winealign-production.s3.amazonaws.com/photos/0019/3580/John_thumbnail.png" alt="John Szabo, MS"></a>
</div>
<div class="copy">
<div class="p">
<a href="http://www.winealign.com/profile/3333-John-Szabo%2C-MS">John Szabo, MS</a>
<p>Still tasting beautifully, and even better than last year, the 2000 DP is showing intensely toasty, biscuity complex aromas that is everything great champagne should be. The palate comes across as fully dry yet rich, round and creamy textured, driving powerfully through to an outstandingly long finish. This is just hitting 5th gear, though there's no rush to drink up, there is lots of road ahead.</p>
</div>
</div>
<div class="meta">
<div class="rating">
<img width="46" height="46" title="95" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="95">95
</div>
<ul>
<li class="thumb_up">
<a title="I agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Up']);" data-remote="true" alt="I agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/33875/dig">Thumbs Up</a>
<span id="dig_count_33875">
(0)
</span>
<div class="clear"></div>
</li>
<li class="thumb_down">
<a title="I do not agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Down']);" data-remote="true" alt="I do not agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/33875/bury">Thumbs Down</a>
<span id="bury_count_33875">
(0)
</span>
<div class="clear"></div>
</li>
</ul>
</div>
<div class="clear"></div>
<time datetime="2009-07-07 11:22:43 -0400">
<div class="review_language">
Voir en
<a data-remote="true" href="/reviews/33875?lang=fr">Français</a>
</div>
<div class="autotranslated">
<a href="/account/language_preference/edit">Language Preferences</a>
</div>
<div class="time">Jul 07, 2009</div>
</time>
<div class="clear_line"></div>
</div>

<h3>Community Reviews (4)</h3>
<div id="" class="person-review">
<div class="img">
<a href="http://www.winealign.com/profile/1042-andrewhunter"><img title="Andrew Hunter" src="https://winealign-production.s3.amazonaws.com/photos/0023/9043/Screen_Shot_2014-01-09_at_7.10.13_PM_thumbnail.png" alt="Andrew Hunter"></a>
</div>
<div class="copy">
<div class="p">
<a href="http://www.winealign.com/profile/1042-andrewhunter">Andrew Hunter</a>
<p>This review is actually for the 1999 vintage. </p>

<p>When is comes Dom Perignon, you can't go wrong. Even "lesser" vintages are fantastic (provided you enjoy the general style to begin with). </p>

<p>The 1999 was probably one of the best Champagnes I've tasted. I wish I had bought more bottles. It was quite earthy (fresh mushrooms?) and biscuity with tangy, almost grapefruity notes. A slight metallic minerality and a fantastic warming, long finish.    </p>

<p>(who's the heathen who thumb-downed this review? grrr.)</p>
</div>
</div>
<div class="meta">
<div class="rating">
<img width="46" height="46" title="95" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="95">95
</div>
<ul>
<li class="thumb_up">
<a title="I agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Up']);" data-remote="true" alt="I agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/24741/dig">Thumbs Up</a>
<span id="dig_count_24741">
(1)
</span>
<div class="clear"></div>
</li>
<li class="thumb_down">
<a title="I do not agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Down']);" data-remote="true" alt="I do not agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/24741/bury">Thumbs Down</a>
<span id="bury_count_24741">
(2)
</span>
<div class="clear"></div>
</li>
</ul>
</div>
<div class="clear"></div>
<br>Visit my website <a target="_blank" href="http://torontowineguy.blogspot.com/">torontowineguy.blogspot.com/</a><br>
<time datetime="2009-01-19 08:07:42 -0500">
<div class="review_language">
Voir en
<a data-remote="true" href="/reviews/24741?lang=fr">Français</a>
</div>
<div class="autotranslated">
<a href="/account/language_preference/edit">Language Preferences</a>
</div>
<div class="time">Jan 19, 2009</div>
</time>
<div class="clear_line"></div>
</div>
<div id="" class="person-review">
<div class="img">
<a href="http://www.winealign.com/profile/15539-mistwalker"><img title="mistwalker" src="/assets/default_m_thumbnail-160e78bfd8d447f568c667c781a0fbfe.jpg" alt="mistwalker"></a>
</div>
<div class="copy">
<div class="p">
<a href="http://www.winealign.com/profile/15539-mistwalker">mistwalker</a>
<p>I have a 1996 bottle still and got to taste another 1996. I must say it is an excellent Champagne.</p>
</div>
</div>
<div class="meta">
<div class="rating">
<img width="46" height="46" title="95" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="95">95
</div>
<ul>
<li class="thumb_up">
<a title="I agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Up']);" data-remote="true" alt="I agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/56302/dig">Thumbs Up</a>
<span id="dig_count_56302">
(0)
</span>
<div class="clear"></div>
</li>
<li class="thumb_down">
<a title="I do not agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Down']);" data-remote="true" alt="I do not agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/56302/bury">Thumbs Down</a>
<span id="bury_count_56302">
(0)
</span>
<div class="clear"></div>
</li>
</ul>
</div>
<div class="clear"></div>
<time datetime="2010-12-27 03:29:38 -0500">
<div class="review_language">
Voir en
<a data-remote="true" href="/reviews/56302?lang=fr">Français</a>
</div>
<div class="autotranslated">
<a href="/account/language_preference/edit">Language Preferences</a>
</div>
<div class="time">Dec 27, 2010</div>
</time>
<div class="clear_line"></div>
</div>
<div id="" class="person-review">
<div class="img">
<a href="http://www.winealign.com/profile/2226-martal"><img title="Marc Talbot" src="/assets/default_m_thumbnail-160e78bfd8d447f568c667c781a0fbfe.jpg" alt="Marc Talbot"></a>
</div>
<div class="copy">
<div class="p">
<a href="http://www.winealign.com/profile/2226-martal">Marc Talbot</a>
<p></p>
</div>
</div>
<div class="meta">
<div class="rating">
<img width="46" height="46" title="95" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="95">95
</div>
<ul>
<li class="thumb_up">
<a title="I agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Up']);" data-remote="true" alt="I agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/62881/dig">Thumbs Up</a>
<span id="dig_count_62881">
(0)
</span>
<div class="clear"></div>
</li>
<li class="thumb_down">
<a title="I do not agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Down']);" data-remote="true" alt="I do not agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/62881/bury">Thumbs Down</a>
<span id="bury_count_62881">
(0)
</span>
<div class="clear"></div>
</li>
</ul>
</div>
<div class="clear"></div>
<time datetime="2011-04-27 19:33:34 -0400">
<div class="review_language">
</div>
<div class="autotranslated">
</div>
<div class="time">Apr 27, 2011</div>
</time>
<div class="clear_line"></div>
</div>
<div id="" class="person-review">
<div class="img">
<a href="http://www.winealign.com/profile/6583-uysman"><img title="Paul Uys" src="/assets/default_m_thumbnail-160e78bfd8d447f568c667c781a0fbfe.jpg" alt="Paul Uys"></a>
</div>
<div class="copy">
<div class="p">
<a href="http://www.winealign.com/profile/6583-uysman">Paul Uys</a>
<p>RP 2009 -2019</p>
</div>
</div>
<div class="meta">
<div class="rating">
<img width="46" height="46" title="94" src="/assets/weighting/4.8-a6e181a649ad0390d504b0b333b894b7.png" alt="94">94
</div>
<ul>
<li class="thumb_up">
<a title="I agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Up']);" data-remote="true" alt="I agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/63314/dig">Thumbs Up</a>
<span id="dig_count_63314">
(0)
</span>
<div class="clear"></div>
</li>
<li class="thumb_down">
<a title="I do not agree with this review" onclick="_gaq.push(['_trackEvent', 'Detail Page', 'Thumb A Review', 'Down']);" data-remote="true" alt="I do not agree with this review" href="/wines/2654-Moet-%26-Chandon-Dom-Perignon-Vintage-Brut-Champagne-2000/reviews/63314/bury">Thumbs Down</a>
<span id="bury_count_63314">
(0)
</span>
<div class="clear"></div>
</li>
</ul>
</div>
<div class="clear"></div>
<time datetime="2011-05-07 15:51:14 -0400">
<div class="review_language">
Voir en
<a data-remote="true" href="/reviews/63314?lang=fr">Français</a>
</div>
<div class="autotranslated">
<a href="/account/language_preference/edit">Language Preferences</a>
</div>
<div class="time">May 07, 2011</div>
</time>
<div class="clear_line"></div>
</div>

</div>*/