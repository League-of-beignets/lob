// @file : /third/tablesorter/js/widgets/widget-repeatheaders.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
﻿
;(function($){
"use strict";
$.tablesorter.addWidget({
id: "repeatHeaders",
priority: 10,
options: {
rowsToSkip:4
},
format: function(table, c, wo){
var h='', i, $tr, l, skip;
if(!wo.repeatHeaders){
h='<tr class="repeated-header remove-me">';
$.each(c.headerContent, function(i,t){
h +='<th>' + t + '</th>';});
wo.repeatHeaders=h + '</tr>';}
skip=wo && wo.rowsToSkip || 4;
c.$table.find("tr.repeated-header").remove();
$tr=c.$tbodies.find('tr');
l=$tr.length;
for (i=skip; i < l; i +=skip){
$tr.eq(i).before(wo.repeatHeaders);}},
remove: function(table, c){
c.$table.find("tr.repeated-header").remove();}});})(jQuery);