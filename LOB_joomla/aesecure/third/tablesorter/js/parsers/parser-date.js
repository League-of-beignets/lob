// @file : /third/tablesorter/js/parsers/parser-date.js
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
id: "sugar",
is: function(){
return false;},
format: function(s){
var date=Date.create?Date.create(s):s?new Date(s):s;
return date instanceof Date && isFinite(date)?date.getTime():s;},
type: "numeric"
});
$.tablesorter.addParser({
id: "datejs",
is: function(){
return false;},
format: function(s){
var date=Date.parse?Date.parse(s):s?new Date(s):s;
return date instanceof Date && isFinite(date)?date.getTime():s;},
type: "numeric"
});})(jQuery);