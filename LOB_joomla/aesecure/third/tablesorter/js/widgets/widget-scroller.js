// @file : /third/tablesorter/js/widgets/widget-scroller.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";
$.fn.hasScrollBar=function(){
return this.get(0).scrollHeight > this.height();};var ts=$.tablesorter;
ts.window_resize=function(){
if(this.resize_timer){
clearTimeout(this.resize_timer);}
this.resize_timer=setTimeout(function(){
$(this).trigger('resizeEnd');}, 250);};
$(function(){
var s='<style>' +
'.tablesorter-scroller-reset { width: auto !important;} ' +
'.tablesorter-scroller { text-align: left; overflow: hidden;  }' +
'.tablesorter-scroller-header { overflow: hidden;}' +
'.tablesorter-scroller-header table.tablesorter { margin-bottom: 0;}' +
'.tablesorter-scroller-table { overflow-y: scroll;}' +
'.tablesorter-scroller-table table.tablesorter { margin-top: 0; overflow: scroll;} ' +
'.tablesorter-scroller-table .tablesorter-filter-row, .tablesorter-scroller-table tfoot { display: none;}' +
'.tablesorter-scroller-table table.tablesorter thead tr.tablesorter-headerRow * {' +
'line-height:0;height:0;border:none;background-image:none;padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;overflow:hidden;' +
'}</style>';
$(s).appendTo('body');});
ts.addWidget({
id: 'scroller',
priority: 60,
options: {
scroller_height:300,
scroller_barWidth:18,
scroller_jumpToHeader: true,
scroller_upAfterSort: true
},
init: function(table, thisWidget, c, wo){
var $win=$(window),
namespace=c.namespace + 'tsscroller';
$win
.bind('resize' + namespace, ts.window_resize)
.bind('resizeEnd' + namespace, function(){
if(typeof table.config.widgetOptions.scroller_resizeWidth==='function'){
$win.unbind('resize' + namespace, ts.window_resize);
table.config.widgetOptions.scroller_resizeWidth();
$win.bind('resize' + namespace, ts.window_resize);}});},
format: function(table, c, wo){
var h, $hdr, t, resize, $cells,
id=c.namespace.slice(1) + 'tsscroller',
$win=$(window),
$tbl=c.$table;
if(!c.isScrolling){
h=wo.scroller_height || 300;
t=$tbl.find('tbody').height();
if(t !==0 && h > t){ h=t + 10;}
$hdr=$('<table class="' + $tbl.attr('class') + '" cellpadding=0 cellspacing=0><thead>' + $tbl.find('thead:first').html() + '</thead></table>');
$tbl
.wrap('<div id="' + id + '" class="tablesorter-scroller" />')
.before($hdr)
.find('.tablesorter-filter-row').addClass('hideme');
$cells=$hdr
.wrap('<div class="tablesorter-scroller-header" style="width:' + $tbl.width() + ';" />')
.find('.' + ts.css.header);
$tbl.wrap('<div class="tablesorter-scroller-table" style="height:' + h + 'px;width:' + $tbl.width() + ';" />');
ts.bindEvents(table, $cells);
if($tbl.hasClass('hasFilters')){
ts.filter.bindSearch( $tbl, $hdr.find('.' + ts.css.filter) );}
resize=function(){
var d, b, $h, $th, w,
$div=$('div.scroller[id !="' + id + '"]').hide();
$tbl.find('thead').show();
$tbl
.addClass('tablesorter-scroller-reset')
.find('thead').find('.tablesorter-header-inner').addClass('tablesorter-scroller-reset');
d=$tbl.parent();
d.addClass('tablesorter-scroller-reset');
d.parent().trigger('resize');
d.width( d.parent().innerWidth() - ( d.parent().hasScrollBar()?wo.scroller_barWidth:0 ) );
w=d.innerWidth() - ( d.hasScrollBar()?wo.scroller_barWidth:0 );
$tbl.width( w );
$hdr.width( w );
$hdr.parent().width( w );
$tbl.closest('.tablesorter-scroller').find('.tablesorter-scroller-reset').removeClass('tablesorter-scroller-reset');
b=parseInt( $tbl.css('border-left-width'), 10 ) + parseInt( $tbl.css('border-right-width'), 10 );
$h=$hdr.find('thead').children().children();
$tbl.find('thead').children().children().each(function(i, c){
$th=$(c).find('.tablesorter-header-inner');
if($th.length){
w=parseInt( $th.css('min-width').replace('auto','0').replace(/(px|em)/,''), 10 );
if( $th.width() < w ){
$th.width(w);}else{
w=$th.width();}
$h.eq(i)
.find('.tablesorter-header-inner').width(w - b)
.parent()
.width( $th.parent().width() - b );}});
$div.show();};
wo.scroller_resizeWidth=resize;
resize();
$tbl.find('thead').css('visibility','hidden');
c.isScrolling=true;
t=$tbl.parent().parent().height();
$tbl.parent().bind('scroll', function(){
if(wo.scroller_jumpToHeader){
var pos=$win.scrollTop() - $hdr.offset().top;
if($(this).scrollTop() !==0 && pos < t && pos > 0){
$win.scrollTop( $hdr.offset().top );}}
$hdr.parent().scrollLeft( $(this).scrollLeft() );});}
if(wo.scroller_upAfterSort){
$tbl.parent().animate({ scrollTop: 0 },'fast');}},
remove:function(table, c){
var $table=c.$table,
namespace=c.namespace + 'tsscroller';
$table.closest('.tablesorter-scroller').find('.tablesorter-scroller-header').remove();
$table
.unwrap()
.find('.tablesorter-filter-row').removeClass('hideme').end()
.find('thead').show().css('visibility','visible');
$(window).unbind('resize' + namespace + ' resizeEnd' + namespace);
c.isScrolling=false;}});})(jQuery);