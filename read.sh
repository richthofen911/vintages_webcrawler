count=1
for LINE in `cat ~/Programming/phantomJS/vintages/crawlog.txt`
do
	~/Programming/phantomJS/phantomjs ~/Programming/phantomJS/vintages/parseProductPage.js $LINE
	echo "parse page "$count
	((count++))
done
