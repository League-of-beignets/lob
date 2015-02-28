// @file : /third/tablesorter/js/parsers/parser-ignore-articles.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
ts.ignoreArticles={
"en":"the, a, an",
"de":"der, die, das, des, dem, den, ein, eine, einer, eines, einem, einen",
"nl":"de, het, de, een",
"es":"el, la, lo, los, las, un, una, unos, unas",
"pt":"o, a, os, as, um, uma, uns, umas",
"fr":"le, la, l'_, les, un, une, des",
"it":"il, lo, la, l'_, i, gli, le, un', uno, una, un",
"hu":"a, az, egy"
};
ts.addParser({
id: 'ignoreArticles',
is: function(){
return false;},
format: function(s, table, cell, cellIndex){
var art, ignore, lang,
c=table.config,
str=s || '';
if( !(c.headers && c.headers[cellIndex] && c.headers[cellIndex].ignoreArticlesRegex) ){
if(!c.headers){ c.headers={};}
if(!c.headers[cellIndex]){ c.headers[cellIndex]={};}
lang=ts.getData( c.$headers.eq(cellIndex), ts.getColumnData( table, c.headers, cellIndex ),'ignoreArticles' );
art=(ts.ignoreArticles[lang] || "the, a, an" ) + "";
c.headers[cellIndex].ignoreArticlesRegex=new RegExp('^(' + $.trim( art.split(/\s*\,\s*/).join('\\s|') + "\\s" ).replace("_\\s","") + ')','i');
ignore=ts.getData( c.$headers.eq(cellIndex), ts.getColumnData( table, c.headers, cellIndex ),'ignoreArticlesExcept' );
c.headers[cellIndex].ignoreArticlesRegex2=ignore !==''?new RegExp('^(' + ignore.replace(/\s/g, "\\s") + ')','i'):'';}
art=c.headers[cellIndex].ignoreArticlesRegex;
if(art.test(str)){
ignore=c.headers[cellIndex].ignoreArticlesRegex2;
if( !(ignore && ignore.test(str)) ){
return str.replace(art,'');}}
return str;},
type: 'text'
});})(jQuery);