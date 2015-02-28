// @file : /third/tablesorter/js/jquery.tablesorter.widgets-filter-formatter-select2.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter || {};
ts.filterFormatter=ts.filterFormatter || {};
ts.filterFormatter.select2=function($cell, indx, select2Def){
var o=$.extend({
cellText:'',
match:true,
value:'',
multiple:true,
width:'100%'
}, select2Def ),
arry, data,
c=$cell.closest('table')[0].config,
wo=c.widgetOptions,
$input=$('<input class="filter" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
var val=this.value;
val=val.replace(/[/()$^]/g,'').split('|');
$cell.find('.select2').select2('val', val);
updateSelect2();}),
$header=c.$headers.filter('[data-column="' + indx + '"]:last'),
onlyAvail=$header.hasClass(wo.filter_onlyAvail),
$shcell=[],
matchPrefix=o.match?'':'^',
matchSuffix=o.match?'':'$',
updateSelect2=function(){
var v=$cell.find('.select2').select2('val') || o.value || '';
$input
.val( $.isArray(v) && v.length && v.join('') !==''?'/(' + matchPrefix + (v || []).join(matchSuffix + '|' + matchPrefix) + matchSuffix + ')/':'' )
.trigger('search').end()
.find('.select2').select2('val', v);
if($shcell.length){
$shcell
.find('.select2').select2('val', v);}},
updateOptions=function(){
data=[];
arry=ts.filter.getOptionSource(c.$table[0], indx, onlyAvail) || [];
$.each(arry, function(i,v){
data.push({id: v, text: v});});
o.data=data;};
$header.toggleClass('filter-match', o.match);
if(o.cellText){
$cell.prepend('<label>' + o.cellText + '</label>');}
if(!(o.ajax && !$.isEmptyObject(o.ajax)) && !o.data){
updateOptions();
if(onlyAvail){
c.$table.bind('filterEnd', function(){
updateOptions();
$cell.add($shcell).find('.select2').select2(o);});}}
$('<input class="select2 select2-' + indx + '" type="hidden" />')
.val(o.value)
.appendTo($cell)
.select2(o)
.bind('change', function(){
updateSelect2();});
c.$table.bind('filterFomatterUpdate', function(){
var val=c.$table.data('lastSearch')[indx] || '';
val=val.replace(/[/()$^]/g,'').split('|');
$cell.find('.select2').select2('val', val);
updateSelect2();
ts.filter.formatterUpdated($cell, indx);});
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$('<input class="select2 select2-' + indx + '" type="hidden">')
.val(o.value)
.appendTo($shcell)
.select2(o)
.bind('change', function(){
$cell.find('.select2').select2('val', $shcell.find('.select2').select2('val') );
updateSelect2();});
if(o.cellText){
$shcell.prepend('<label>' + o.cellText + '</label>');}});
c.$table.bind('filterReset', function(){
$cell.find('.select2').select2('val', o.value || '');
setTimeout(function(){
updateSelect2();}, 0);});
updateSelect2();
return $input;};})(jQuery);