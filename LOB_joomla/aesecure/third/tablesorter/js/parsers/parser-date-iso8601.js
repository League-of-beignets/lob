// @file : /third/tablesorter/js/parsers/parser-date-iso8601.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var iso8601date=/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$/;
$.tablesorter.addParser({
id:'iso8601date',
is:function(s){
return s?s.match(iso8601date):false;},
format:function(s){
var result=s?s.match(iso8601date):s;
if(result){
var date=new Date(result[1], 0, 1);
if(result[3]){ date.setMonth(result[3] - 1);}
if(result[5]){ date.setDate(result[5]);}
if(result[7]){ date.setHours(result[7]);}
if(result[8]){ date.setMinutes(result[8]);}
if(result[10]){ date.setSeconds(result[10]);}
if(result[12]){ date.setMilliseconds(Number('0.' + result[12]) * 1000);}
return date.getTime();}
return s;},
type:'numeric'
});})(jQuery);