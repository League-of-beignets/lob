// @file : /third/tablesorter/js/widgets/widget-staticRow.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
events='staticRowsRefresh updateComplete '.split(' ').join('.tsstaticrows '),
addIndexes=function(table){
var $tr, wo, v, indx, rows,
c=table.config;
if(c){
wo=c.widgetOptions;
c.$tbodies.each(function(){
$tr=$(this).children();
rows=$tr.length;
$tr.filter(wo.staticRow_class).each(function(){
$tr=$(this);
indx=$tr.data(wo.staticRow_index);
if(typeof indx !=="undefined"){
v=parseFloat(indx);
indx=(/%/.test(indx))?Math.round(v/100 * rows):v;}else{
indx=$tr.index();}
$tr.data( wo.staticRow_data, indx );});});}};
ts.addWidget({
id: 'staticRow',
options: {
staticRow_class:'.static',
staticRow_data :'static-index',
staticRow_index:'row-index'
},
init: function(table, thisWidget, c, wo){
addIndexes(table);
c.$table
.unbind(events)
.bind(events, function(){
addIndexes(table);
c.$table.trigger('applyWidgets');});},
format: function(table, c, wo){
var targetIndex, $thisRow, indx, numRows, $tbody, hasShuffled, $rows, max;
c.$tbodies.each(function(){
$tbody=$.tablesorter.processTbody(table, $(this), true);
hasShuffled=true;
indx=0;
$rows=$tbody.children(wo.staticRow_class);
numRows=$tbody.children('tr').length - 1;
max=$rows.length;
while (hasShuffled && indx < max){
hasShuffled=false;
$rows.each(function(){
targetIndex=$(this).data(wo.staticRow_data);
targetIndex=targetIndex >=numRows?numRows:targetIndex < 0?0:targetIndex;
if(targetIndex !==$(this).index()){
hasShuffled=true;
$thisRow=$(this).detach();
if(targetIndex >=numRows){
$thisRow.appendTo( $tbody );} else if(targetIndex===0){
$thisRow.prependTo( $tbody );}else{
$thisRow.insertBefore( $tbody.find('tr:eq(' + targetIndex + ')') );}}});
indx++;}
$.tablesorter.processTbody(table, $tbody, false);});
c.$table.trigger('staticRowsComplete', table);},
remove:function(table, c, wo){
c.$table.unbind(events);}});})(jQuery);