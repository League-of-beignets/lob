// @file : /third/tablesorter/js/parsers/parser-roman.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var validator=/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i,
matcher=/\b([MCDLXVI]+\b)/gi,
lookup={ I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
$.tablesorter.addParser({
id: 'roman',
is: function(){
return false;},
format: function(s){
var val,
roman=s.toUpperCase().split(''),
num=0;
if( !(s && validator.test(s)) ){
return s;}
while (roman.length){
val=lookup[roman.shift()];
num +=val * (val < lookup[roman[0]]?-1:1);}
return num;},
type: "numeric"
});
$.tablesorter.addParser({
id: 'roman-ignore',
is: function(){
return false;},
format: function(s, table, cell, column){
var val, orig,
c=table.config,
ignore=$.isArray(c.roman_ignore)?c.roman_ignore[column]:0,
roman=( isNaN(ignore) ?
$.trim( s.replace(ignore,'') ) :
$.trim( s.substring(0, s.length - ignore) )
).match(matcher),
v=validator.test(roman),
num=0;
if( !(v) ){
return s;}
orig=roman[0];
roman=orig.toUpperCase().split('');
while (roman.length){
val=lookup[roman.shift()];
if(val){
num +=val * (val < lookup[roman[0]]?-1:1);}}
return num?s.replace(orig, num):s;},
type: "text"
});
$.tablesorter.addParser({
id: 'roman-extract',
is: function(){
return false;},
format: function(s){
var val,
roman=$.grep(s.split(/\b/), function(v, i){
return validator.test(v)?v:'';}).join('').match(matcher),
v=roman?validator.test(roman):0,
num=0;
if( !(v) ){
return s;}
roman=roman[0].toUpperCase().split('');
while (roman.length){
val=lookup[roman.shift()];
if(val){
num +=val * (val < lookup[roman[0]]?-1:1);}}
return num?num:s;},
type: "numeric"
});})(jQuery);