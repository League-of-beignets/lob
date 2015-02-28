// @file : /third/tablesorter/js/parsers/parser-duration.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";
$.tablesorter.addParser({
id: "duration",
is: function(){
return false;},
format: function(s, table){
var i, time,
c=table.config,
t='',
duration='',
len=c.durationLength || 4,
str=new Array(len + 1).join('0'),
labels=(c.durationLabels || '(?:years|year|y),(?:days|day|d),(?:hours|hour|h),(?:minutes|minute|min|m),(?:seconds|second|sec|s)').split(/\s*,\s*/),
llen=labels.length;
if(!c.durationRegex){
for (i=0; i < llen; i++){
t +='(?:(\\d+)\\s*' + labels[i] + '\\s*)?';}
c.durationRegex=new RegExp(t,'i');}
time=( c.usNumberFormat?s.replace(/,/g,''):s.replace( /(\d)(?:\.|\s*)(\d)/g,'$1$2') ).match(c.durationRegex);
for (i=1; i < llen + 1; i++){
duration +=( str + ( time[i] || 0 ) ).slice(-len);}
return duration;},
type: "text"
});})(jQuery);