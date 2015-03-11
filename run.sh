#url_prefix="http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME=Red+Wine&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page="

#url_suffix="&action=result&sort=sortedName&order=1&resultsPerPage=10"

wine_types=(Champagne, Dessert Wine, Fortified Wines, Gift and Sampler Packs, Icewine, Red Wine, Ros%E9+Wine, Sparkling Wine, Specialty Wines, White Wine)

url_prefix_1="http://www.vintages.com/lcbo-ear/vintages/product/searchResults.do?STOCK_TYPE_NAME=Vintages&ITEM_NAME=&KEYWORDS=&ITEM_NUMBER=&productListingType=&LIQUOR_TYPE_SHORT_=Wine&CATEGORY_NAME="
url_prefix_2="&SUB_CATEGORY_NAME=*&PRODUCING_CNAME=*&PRODUCING_REGION_N=*&UNIT_VOLUME=*&SELLING_PRICE=*&LTO_SALES_CODE=&VQA_CODE=&KOSHER_CODE=&VINTAGES_CODE=&VALUE_ADD_SALES_CO=&AIR_MILES_SALES_CO=&SWEETNESS_DESCRIPTOR=&VARIETAL_NAME=&WINE_STYLE=&language=EN&style=Vintages&page="
url_suffix="&action=result&sort=sortedName&order=1&resultsPerPage=10"

#count=1
for((count=1; count<11; count++))
do
	url=${url_prefix}$count${url_suffix}
	echo $count
	~/Programming/phantomJS/phantomjs ~/Programming/phantomJS/vintages/getProductListPage.js $url
done
#url=${url_prefix}$count${url_suffix}
#echo $url
#~/Programming/phantomJS/phantomjs ~/Programming/phantomJS/vintages/getProductListPage.js $url

