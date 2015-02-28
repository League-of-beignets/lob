// @file : /third/tablesorter/js/widgets/widget-headerTitles.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
ts.addWidget({
id: 'headerTitles',
options: {
headerTitle_useAria :false,
headerTitle_tooltip :'',
headerTitle_cur_text    :[ ' sort: A - Z',' sort: Z - A','ly unsorted' ],
headerTitle_cur_numeric :[ ' sort: 0 - 9',' sort: 9 - 0','ly unsorted' ],
headerTitle_nxt_text    :[ ' sort: A - Z',' sort: Z - A','remove sort' ],
headerTitle_nxt_numeric :[ ' sort: 0 - 9',' sort: 9 - 0','remove sort' ],
headerTitle_output_sorted  :'current{current}; activate to {next}',
headerTitle_output_unsorted:'current{current}; activate to {next} ',
headerTitle_output_nosort  :'No sort available',
headerTitle_type    :[],
headerTitle_callback:null
},
init: function(table, thisWidget, c, wo){
c.$table.on('refreshHeaderTitle', function(){
thisWidget.format(table, c, wo);});
if($.isArray(wo.headerTitle_tooltip)){
c.$headers.each(function(){
$(this).addClass( wo.headerTitle_tooltip[this.column] || '' );});} else if(wo.headerTitle_tooltip !==''){
c.$headers.addClass( wo.headerTitle_tooltip );}},
format: function (table, c, wo){
var txt;
c.$headers.each(function(){
var t=this,
$this=$(this),
sortType=wo.headerTitle_type[t.column] || c.parsers[ t.column ].type || 'text',
sortDirection=$this.hasClass(ts.css.sortAsc)?0:$this.hasClass(ts.css.sortDesc)?1:2,
sortNext=t.order[(t.count + 1) % (c.sortReset?3:2)];
if(wo.headerTitle_useAria){
txt=$this.hasClass('sorter-false')?wo.headerTitle_output_nosort:$this.attr('aria-label') || '';}else{
txt=(wo.headerTitle_prefix || '') +
($this.hasClass('sorter-false')?wo.headerTitle_output_nosort :
ts.isValueInArray( t.column, c.sortList ) >=0?wo.headerTitle_output_sorted:wo.headerTitle_output_unsorted);
txt=txt.replace(/\{(current|next|name)\}/gi, function(m){
return {
'{name}'   :$this.text(),'{current}':wo[ 'headerTitle_cur_' + sortType ][ sortDirection ] || '','{next}'   :wo[ 'headerTitle_nxt_' + sortType ][ sortNext ] || ''
}[m.toLowerCase()];});}
$this.attr('title', $.isFunction(wo.headerTitle_callback)?wo.headerTitle_callback($this, txt):txt);});},
remove: function (table, c, wo){
c.$headers.attr('title','');
c.$table.off('refreshHeaderTitle');
if($.isArray(wo.headerTitle_tooltip)){
c.$headers.each(function(){
$(this).removeClass( wo.headerTitle_tooltip[this.column] || '' );});} else if(wo.headerTitle_tooltip !==''){
c.$headers.removeClass( wo.headerTitle_tooltip );}}});})(jQuery);