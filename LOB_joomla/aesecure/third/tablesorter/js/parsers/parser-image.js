// @file : /third/tablesorter/js/parsers/parser-image.js
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
id: "image",
is: function(){
return false;},
format: function(s, table, cell){
return $(cell).find('img').attr(table.config.imgAttr || 'alt') || s;},
parsed:true,
type: "text"
});})(jQuery);