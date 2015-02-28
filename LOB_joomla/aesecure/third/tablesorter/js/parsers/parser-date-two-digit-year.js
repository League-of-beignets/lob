// @file : /third/tablesorter/js/parsers/parser-date-two-digit-year.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var range=50,
ts=$.tablesorter,
now=new Date().getFullYear();
ts.dates=$.extend({}, ts.dates, {
regxxxxyy: /(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{2})/,
regyyxxxx: /(\d{2})[\/\s](\d{1,2})[\/\s](\d{1,2})/
});
ts.formatDate=function(s, regex, format, table){
if(s){
var y, rng,
n=s
.replace(/\s+/g," ").replace(/[-.,]/g, "/")
.replace(regex, format),
d=new Date(n);
if( d instanceof Date && isFinite(d) ){
y=d.getFullYear();
rng=table && table.config.dateRange || range;
while (now - y > rng){
y +=100;}
return d.setFullYear(y);}}
return s;};
$.tablesorter.addParser({
id: "ddmmyy",
is: function(){
return false;},
format: function(s, table){
return ts.formatDate(s, ts.dates.regxxxxyy, "$2/$1/19$3", table);},
type: "numeric"
});
$.tablesorter.addParser({
id: "mmddyy",
is: function(){
return false;},
format: function(s, table){
return ts.formatDate(s, ts.dates.regxxxxyy, "$1/$2/19$3", table);},
type: "numeric"
});
$.tablesorter.addParser({
id: "yymmdd",
is: function(){
return false;},
format: function(s, table){
return ts.formatDate(s, ts.dates.regyyxxxx, "$2/$3/19$1", table);},
type: "numeric"
});})(jQuery);