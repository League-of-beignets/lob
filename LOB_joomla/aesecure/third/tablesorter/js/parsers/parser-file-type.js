// @file : /third/tablesorter/js/parsers/parser-file-type.js
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
$.tablesorter.fileTypes={
separator:'|',
equivalents:{
"3D Image"    :"3dm|3ds|dwg|max|obj",
"Audio"       :"aif|aac|ape|flac|la|m4a|mid|midi|mp2|mp3|ogg|ra|raw|rm|wav|wma",
"Compressed"  :"7z|bin|cab|cbr|gz|gzip|iso|lha|lz|rar|tar|tgz|zip|zipx|zoo",
"Database"    :"csv|dat|db|dbf|json|ldb|mdb|myd|pdb|sql|tsv|wdb|wmdb|xlr|xls|xlsx|xml",
"Development" :"asm|c|class|cls|cpp|cc|cs|cxx|cbp|cs|dba|fla|h|java|lua|pl|py|pyc|pyo|sh|sln|r|rb|vb",
"Document"    :"doc|docx|odt|ott|pages|pdf|rtf|tex|wpd|wps|wrd|wri",
"Executable"  :"apk|app|com|exe|gadget|lnk|msi",
"Fonts"       :"eot|fnt|fon|otf|ttf|woff|woff2",
"Icons"       :"ani|cur|icns|ico",
"Images"      :"bmp|gif|jpg|jpeg|jpe|jp2|pic|png|psd|tga|tif|tiff|wmf|webp",
"Presentation":"pps|ppt",
"Published"   :"chp|epub|lit|pub|ppp|fm|mobi",
"Script"      :"as|bat|cgi|cmd|jar|js|lua|scpt|scptd|sh|vbs|vb|wsf",
"Styles"      :"css|less|sass",
"Text"        :"info|log|md|markdown|nfo|tex|text|txt",
"Vectors"     :"awg|ai|eps|cdr|ps|svg",
"Video"       :"asf|avi|flv|m4v|mkv|mov|mp4|mpe|mpeg|mpg|ogg|rm|rv|swf|vob|wmv",
"Web"         :"asp|aspx|cer|cfm|htm|html|php|url|xhtml"
}};
$.tablesorter.addParser({
id: 'filetype',
is: function(){
return false;},
format: function(s, table){
var t,
c=table.config,
wo=c.widgetOptions,
i=s.lastIndexOf('.'),
sep=$.tablesorter.fileTypes.separator,
m=$.tablesorter.fileTypes.matching,
types=$.tablesorter.fileTypes.equivalents;
if(!m){
var t=[];
$.each(types, function(i,v){
t.push(v);});
m=$.tablesorter.fileTypes.matching=sep + t.join(sep) + sep;}
if(i >=0){
t=sep + s.substring(i + 1, s.length) + sep;
if(m.indexOf(t) >=0){
for (i in types){
if((sep + types[i] + sep).indexOf(t) >=0){
return i + (wo.group_separator?wo.group_separator:'-') + s;}}}}
return s;},
type: 'text'
});})(jQuery);