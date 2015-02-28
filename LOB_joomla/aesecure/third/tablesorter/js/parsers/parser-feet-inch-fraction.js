// @file : /third/tablesorter/js/parsers/parser-feet-inch-fraction.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
ts.symbolRegex=/[\u215b\u215c\u215d\u215e\u00bc\u00bd\u00be]/g;
ts.processFractions=function(n, table){
if(n){
var t, p=0;
n=$.trim(n.replace(/\"/,''));
if(/\s/.test(n)){
p=ts.formatFloat(n.split(' ')[0], table);
n=$.trim(n.substring(n.indexOf(' '), n.length));}
if(/\//g.test(n)){
t=n.split('/');
n=p + parseInt(t[0], 10) / parseInt(t[1] || 1, 10);} else if(ts.symbolRegex.test(n)){
n=p + n.replace(ts.symbolRegex, function(m){
return {
'\u215b':'.125','\u215c':'.375','\u215d':'.625','\u215e':'.875','\u00bc':'.25','\u00bd':'.5','\u00be':'.75'
}[m];});}}
return n || 0;};
$.tablesorter.addParser({
id: 'distance',
is: function(){
return false;},
format: function(s, table){
if(s===''){ return '';}
var d=(/^\s*\S*(\s+\S+)?\s*\'/.test(s))?s.split("'"):[0,s],
f=ts.processFractions(d[0], table),
i=ts.processFractions(d[1], table);
return (/[\'\"]/).test(s)?parseFloat(f) + (parseFloat(i)/12 || 0):parseFloat(f) + parseFloat(i);},
type: 'numeric'
});})(jQuery);