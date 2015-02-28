// @file : /third/tablesorter/js/widgets/widget-alignChar.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
ts.alignChar={
init:function(table, c, wo){
c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
var $this=$(this),
vars={
column    :this.column,
align     :$this.attr(wo.alignChar_charAttrib),
alignIndex:parseInt( $this.attr(wo.alignChar_indexAttrib) || 0, 10),
adjust    :parseFloat($this.attr(wo.alignChar_adjustAttrib)) || 0,
};
vars.regex=new RegExp('\\' + vars.align,'g');
if(typeof vars.align !=='undefined'){
wo.alignChar_savedVars[this.column]=vars;
ts.alignChar.setup(table, c, wo, vars);}});},
setup: function(table, c, wo, v){
if($.isEmptyObject(c.cache)){ return;}
var tbodyIndex, rowIndex, start, end, last, index, rows, val, count,
len, wLeft, wRight, alignChar, $row,
left=[],
right=[];
for (tbodyIndex=0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
rows=c.cache[tbodyIndex];
len=rows.normalized.length;
for (rowIndex=0; rowIndex < len; rowIndex++){
$row=rows.row?rows.row[rowIndex]:rows.normalized[rowIndex][c.columns].$row;
val=$row.find('td').eq(v.column).text().replace(/[ ]/g, "\u00a0");
count=(val.match( v.regex ) || []).length;
if(count > 0 && v.alignIndex > 0){
end=Math.min(v.alignIndex, count);
start=0;
index=0;
last=0;
while (start++ < end){
last=val.indexOf(v.align, last + 1);
index=last < 0?index:last;}}else{
index=val.indexOf(v.align);}
if( index >=0 ){
left.push( val.substring(0, index) || '' );
right.push( val.substring(index, val.length) || '' );}else{
left.push((count >=1 && v.alignIndex >=count)?'':val || '' );
right.push((count >=1 && v.alignIndex >=count)?val || '':'' );}}}
wLeft=($.extend([], left)).sort(function(a,b){ return b.length - a.length;})[0];
wRight=($.extend([], right)).sort(function(a,b){ return b.length - a.length;})[0];
v.width=v.width || ( Math.floor(wLeft.length / (wLeft.length + wRight.length) * 100) + v.adjust );
wLeft='min-width:' + v.width + '%';
wRight='min-width:' + (100 - v.width)  + '%';
for (tbodyIndex=0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
rows=c.cache[tbodyIndex];
len=rows.normalized.length;
for (rowIndex=0; rowIndex < len; rowIndex++){
alignChar=$(wo.alignChar_wrap).length?$(wo.alignChar_wrap).html(v.align)[0].outerHTML:v.align;
$row=rows.row?rows.row[rowIndex]:rows.normalized[rowIndex][c.columns].$row;
$row.find('td').eq(v.column).html(
'<span class="ts-align-wrap"><span class="ts-align-left" style="' + wLeft + '">' + left[rowIndex] + '</span>' +
'<span class="ts-align-right" style="' + wRight + '">' + alignChar +
right[rowIndex].slice(v.align.length) + '</span></span>'
);}}
wo.alignChar_initialized=true;},
remove: function(table, c, column){
if($.isEmptyObject(c.cache)){ return;}
var tbodyIndex, rowIndex, len, rows, $row, $cell;
for (tbodyIndex=0; tbodyIndex < c.$tbodies.length; tbodyIndex++){
rows=c.cache[tbodyIndex];
len=rows.normalized.length;
for (rowIndex=0; rowIndex < len; rowIndex++){
$row=rows.row?rows.row[rowIndex]:rows.normalized[rowIndex][c.columns].$row;
$cell=$row.find('td').eq(column);
$cell.html( $cell.text().replace(/\s/g,' ') );}}}};
ts.addWidget({
id: 'alignChar',
priority: 100,
options: {
alignChar_wrap        :'',
alignChar_charAttrib  :'data-align-char',
alignChar_indexAttrib :'data-align-index',
alignChar_adjustAttrib:'data-align-adjust'
},
init: function(table, thisWidget, c, wo){
wo.alignChar_initialized=false;
wo.alignChar_savedVars=[];
ts.alignChar.init(table, c, wo);
c.$table.on('pagerEnd refreshAlign', function(){
c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
ts.alignChar.remove(table, c, this.column);});
ts.alignChar.init(table, c, wo);});},
format:function(table, c, wo){
if(!wo.alignChar_initialized){
c.$table.trigger('refreshAlign');}},
remove:function(table, c, wo){
c.$headers.filter('[' + wo.alignChar_charAttrib + ']').each(function(){
ts.alignChar.remove(table, c, this.column);});
wo.alignChar_initialized=false;}});})(jQuery);