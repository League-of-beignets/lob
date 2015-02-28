// @file : /third/tablesorter/js/parsers/parser-date-weekday.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
ts.dates=$.extend({}, ts.dates, {
weekdayCased:[ 'Sun','Mon','Tue','Wed','Thu','Fri','Sat' ]
});
ts.dates.weekdayLower=ts.dates.weekdayCased.join(',').toLocaleLowerCase().split(',');
ts.addParser({
id: "weekday",
is: function(){
return false;},
format: function(s, table){
if(s){
var j=-1, c=table.config;
s=c.ignoreCase?s.toLocaleLowerCase():s;
$.each(ts.dates[ 'weekday' + (c.ignoreCase?'Lower':'Cased') ], function(i,v){
if(j < 0 && s.match(v)){
j=i;
return false;}});
return j < 0?s:j;}
return s;},
type: "numeric"
});})(jQuery);