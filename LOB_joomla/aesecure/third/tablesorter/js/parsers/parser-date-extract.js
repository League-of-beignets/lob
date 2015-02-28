// @file : /third/tablesorter/js/parsers/parser-date-extract.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var regex={
usLong    :/[A-Z]{3,10}\.?\s+\d{1,2},?\s+(?:\d{4})(?:\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s+[AP]M)?)?/i,
mdy       :/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,
dmy       :/(\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,
dmyreplace:/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,
ymd       :/(\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2}(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?)/i,
ymdreplace:/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/
};
$.tablesorter.addParser({
id: "extractUSLongDate",
is: function (){
return false;},
format: function (s){
var date,
str=s?s.match(regex.usLong):s;
if(str){
date=new Date( str[0] );
return date instanceof Date && isFinite(date)?date.getTime():s;}
return s;},
type: "numeric"
});
$.tablesorter.addParser({
id: "extractMMDDYYYY",
is: function (){
return false;},
format: function (s){
var date,
str=s?s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.mdy):s;
if(str){
date=new Date( str[0] );
return date instanceof Date && isFinite(date)?date.getTime():s;}
return s;},
type: "numeric"
});
$.tablesorter.addParser({
id: "extractDDMMYYYY",
is: function (){
return false;},
format: function (s){
var date,
str=s?s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.dmy):s;
if(str){
date=new Date( str[0].replace(regex.dmyreplace, "$2/$1/$3") );
return date instanceof Date && isFinite(date)?date.getTime():s;}
return s;},
type: "numeric"
});
$.tablesorter.addParser({
id: "extractYYYYMMDD",
is: function (){
return false;},
format: function (s){
var date,
str=s?s.replace(/\s+/g," ").replace(/[\-.,]/g, "/").match(regex.ymd):s;
if(str){
date=new Date( str[0].replace(regex.ymdreplace, "$2/$3/$1") );
return date instanceof Date && isFinite(date)?date.getTime():s;}
return s;},
type: "numeric"
});})(jQuery);