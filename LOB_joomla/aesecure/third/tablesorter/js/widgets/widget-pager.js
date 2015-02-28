// @file : /third/tablesorter/js/widgets/widget-pager.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var tsp,
ts=$.tablesorter;
ts.addWidget({
id: "pager",
priority: 55,
options:{
pager_output: '{startRow} to {endRow} of {totalRows} rows',
pager_updateArrows: true,
pager_startPage: 0,
pager_pageReset: 0,
pager_size: 10,
pager_maxOptionSize: 20,
pager_savePages: true,
pager_storageKey: 'tablesorter-pager',
pager_fixedHeight: false,
pager_countChildRows: false,
pager_removeRows: false,
pager_ajaxUrl: null,
pager_customAjaxUrl: function(table, url){ return url;},
pager_ajaxObject: {
dataType: 'json'
},
pager_processAjaxOnInit: true,
pager_ajaxProcessing: function(ajax){ return [ 0, [], null ];},
pager_css: {
container  :'tablesorter-pager',
errorRow   :'tablesorter-errorRow',
disabled   :'disabled'
},
pager_selectors: {
container  :'.pager',
first      :'.first',
prev       :'.prev',
next       :'.next',
last       :'.last',
gotoPage   :'.gotoPage',
pageDisplay:'.pagedisplay',
pageSize   :'.pagesize'
}},
init: function(table){
tsp.init(table);},
format: function(table, c){
if(!(c.pager && c.pager.initialized)){
return tsp.initComplete(table, c);}
tsp.moveToPage(table, c.pager, false);},
remove: function(table, c){
tsp.destroyPager(table, c);}});
tsp=ts.pager={
init: function(table){
if(table.hasInitialized && table.config.pager.initialized){ return;}
var t,
c=table.config,
wo=c.widgetOptions,
s=wo.pager_selectors,
p=c.pager=$.extend({
totalPages: 0,
filteredRows: 0,
filteredPages: 0,
currentFilters: [],
page: wo.pager_startPage,
startRow: 0,
endRow: 0,
ajaxCounter: 0,
$size: null,
last: {}}, c.pager);
if(p.isInitializing){ return;}
p.isInitializing=true;
if(c.debug){
ts.log('Pager initializing');}
p.size=$.data(table,'pagerLastSize') || wo.pager_size;
p.$container=$(s.container).addClass(wo.pager_css.container).show();
p.$goto=p.$container.find(s.gotoPage);
p.$size=p.$container.find(s.pageSize);
p.totalRows=c.$tbodies.eq(0).children('tr').not( wo.pager_countChildRows?'':'.' + c.cssChildRow ).length;
p.oldAjaxSuccess=p.oldAjaxSuccess || wo.pager_ajaxObject.success;
c.appender=tsp.appender;
p.initializing=true;
if(wo.pager_savePages && ts.storage){
t=ts.storage(table, wo.pager_storageKey) || {};
p.page=isNaN(t.page)?p.page:t.page;
p.size=( isNaN(t.size)?p.size:t.size ) || 10;
$.data(table,'pagerLastSize', p.size);}
p.regexRows=new RegExp('(' + (wo.filter_filteredRow || 'filtered') + '|' + c.selectorRemove.slice(1) + '|' + c.cssChildRow + ')');
p.initialized=false;
c.$table.trigger('pagerBeforeInitialized', c);
tsp.enablePager(table, c, false);
p.ajaxObject=wo.pager_ajaxObject;
p.ajaxObject.url=wo.pager_ajaxUrl;
if( typeof(wo.pager_ajaxUrl)==='string' ){
p.ajax=true;
wo.filter_serversideFiltering=true;
c.serverSideSorting=true;
tsp.moveToPage(table, p);}else{
p.ajax=false;
c.$table.trigger("appendCache", [{}, true]);}},
initComplete: function(table, c){
var p=c.pager;
tsp.bindEvents(table, c);
tsp.setPageSize(table, 0, c);
if(!p.ajax){
tsp.hideRowsSetup(table, c);}
p.initialized=true;
p.initializing=false;
p.isInitializing=false;
c.$table.trigger('pagerInitialized', c);
if( !( c.widgetOptions.filter_initialized && ts.hasWidget(table,'filter') ) ){
tsp.updatePageDisplay(table, c, !p.ajax);}},
bindEvents: function(table, c){
var ctrls, fxn,
p=c.pager,
wo=c.widgetOptions,
s=wo.pager_selectors;
c.$table
.off('filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete pageSize pageSet '.split(' ').join('.pager '))
.on('filterInit.pager filterStart.pager', function(e){
p.currentFilters=c.$table.data('lastSearch');
if(e.type==='filterStart' && wo.pager_pageReset !==false && (c.lastCombinedFilter || '') !==(p.currentFilters || []).join('')){
p.page=wo.pager_pageReset;}})
.on('filterEnd.pager sortEnd.pager', function(){
p.currentFilters=c.$table.data('lastSearch');
if(p.initialized || p.initializing){
if(c.delayInit && c.rowsCopy && c.rowsCopy.length===0){
tsp.updateCache(table);}
c.$table.trigger('applyWidgets');
tsp.updatePageDisplay(table, c, false);}})
.on('disable.pager', function(e){
e.stopPropagation();
tsp.showAllRows(table, c);})
.on('enable.pager', function(e){
e.stopPropagation();
tsp.enablePager(table, c, true);})
.on('destroy.pager', function(e){
e.stopPropagation();
tsp.destroyPager(table, c);})
.on('updateComplete.pager', function(e, table, triggered){
e.stopPropagation();
if(!table || triggered){ return;}
var $rows=c.$tbodies.eq(0).children('tr').not(c.selectorRemove);
p.totalRows=$rows.length - ( wo.pager_countChildRows?0:$rows.filter('.' + c.cssChildRow).length );
p.totalPages=Math.ceil( p.totalRows / p.size );
if($rows.length && c.rowsCopy && c.rowsCopy.length===0){
tsp.updateCache(table);}
if( p.page >=p.totalPages ){
tsp.moveToLastPage(table, p);}
tsp.hideRows(table, c);
tsp.changeHeight(table, c);
tsp.updatePageDisplay(table, c);
c.$table.trigger('applyWidgets');})
.on('pageSize.pager', function(e,v){
e.stopPropagation();
tsp.setPageSize(table, parseInt(v, 10) || 10, c);
tsp.hideRows(table, c);
tsp.updatePageDisplay(table, c, false);
if(p.$size.length){ p.$size.val(p.size);}})
.on('pageSet.pager', function(e,v){
e.stopPropagation();
p.page=(parseInt(v, 10) || 1) - 1;
if(p.$goto.length){ p.$goto.val(c.size);}
tsp.moveToPage(table, p, true);
tsp.updatePageDisplay(table, c, false);});
ctrls=[ s.first, s.prev, s.next, s.last ];
fxn=[ 'moveToFirstPage','moveToPrevPage','moveToNextPage','moveToLastPage' ];
p.$container.find(ctrls.join(','))
.attr("tabindex", 0)
.off('click.pager')
.on('click.pager', function(e){
e.stopPropagation();var i,
$c=$(this),
l=ctrls.length;
if( !$c.hasClass(wo.pager_css.disabled) ){
for (i=0; i < l; i++){
if($c.is(ctrls[i])){
tsp[fxn[i]](table, p);
break;}}}});
if( p.$goto.length ){
p.$goto
.off('change')
.on('change', function(){
p.page=$(this).val() - 1;
tsp.moveToPage(table, p, true);
tsp.updatePageDisplay(table, c, false);});}
if( p.$size.length ){
p.$size.find('option').removeAttr('selected');
p.$size
.off('change.pager')
.on('change.pager', function(){
p.$size.val( $(this).val() );
if( !$(this).hasClass(wo.pager_css.disabled) ){
tsp.setPageSize(table, parseInt( $(this).val(), 10 ), c);
tsp.changeHeight(table, c);}
return false;});}},
pagerArrows: function(c, disable){
var p=c.pager,
dis=!!disable,
first=dis || p.page===0,
tp=Math.min( p.totalPages, p.filteredPages ),
last=dis || p.page===tp - 1 || tp===0,
wo=c.widgetOptions,
s=wo.pager_selectors;
if( wo.pager_updateArrows ){
p.$container.find(s.first + ',' + s.prev).toggleClass(wo.pager_css.disabled, first).attr('aria-disabled', first);
p.$container.find(s.next + ',' + s.last).toggleClass(wo.pager_css.disabled, last).attr('aria-disabled', last);}},
calcFilters: function(table, c){
var wo=c.widgetOptions,
p=c.pager,
hasFilters=c.$table.hasClass('hasFilters');
if(hasFilters && !wo.pager_ajaxUrl){
if($.isEmptyObject(c.cache)){
p.filteredRows=p.totalRows=c.$tbodies.eq(0).children('tr').not( wo.pager_countChildRows?'':'.' + c.cssChildRow ).length;}else{
p.filteredRows=0;
$.each(c.cache[0].normalized, function(i, el){
p.filteredRows +=p.regexRows.test(el[c.columns].$row[0].className)?0:1;});}} else if(!hasFilters){
p.filteredRows=p.totalRows;}},
updatePageDisplay: function(table, c, completed){
if( c.pager.initializing ){ return;}
var s, t, $out,
wo=c.widgetOptions,
p=c.pager,
sz=p.size || 10;
if(wo.pager_countChildRows){ t.push(c.cssChildRow);}
p.$size.add(p.$goto).removeClass(wo.pager_css.disabled).removeAttr('disabled').attr('aria-disabled','false');
p.totalPages=Math.ceil( p.totalRows / sz );
c.totalRows=p.totalRows;
tsp.calcFilters(table, c);
c.filteredRows=p.filteredRows;
p.filteredPages=Math.ceil( p.filteredRows / sz ) || 0;
if( Math.min( p.totalPages, p.filteredPages ) >=0 ){
t=(p.size * p.page > p.filteredRows) && completed;
p.startRow=(t)?1:(p.filteredRows===0?0:p.size * p.page + 1);
p.page=(t)?0:p.page;
p.endRow=Math.min( p.filteredRows, p.totalRows, p.size * ( p.page + 1 ) );
$out=p.$container.find(wo.pager_selectors.pageDisplay);
s=( p.ajaxData && p.ajaxData.output?p.ajaxData.output || wo.pager_output:wo.pager_output )
.replace(/\{page([\-+]\d+)?\}/gi, function(m,n){
return p.totalPages?p.page + (n?parseInt(n, 10):1):0;})
.replace(/\{\w+(\s*:\s*\w+)?\}/gi, function(m){
var len, indx,
str=m.replace(/[{}\s]/g,''),
extra=str.split(':'),
data=p.ajaxData,
deflt=/(rows?|pages?)$/i.test(str)?0:'';
if(/(startRow|page)/.test(extra[0]) && extra[1]==='input'){
len=('' + (extra[0]==='page'?p.totalPages:p.totalRows)).length;
indx=extra[0]==='page'?p.page + 1:p.startRow;
return '<input type="text" class="ts-' + extra[0] + '" style="max-width:' + len + 'em" value="' + indx + '"/>';}
return extra.length > 1 && data && data[extra[0]]?data[extra[0]][extra[1]]:p[str] || (data?data[str]:deflt) || deflt;});
if($out.length){
$out[ ($out[0].tagName==='INPUT')?'val':'html' ](s);
if( p.$goto.length ){
t='';
$.each(tsp.buildPageSelect(p, c), function(i, opt){
t +='<option value="' + opt + '">' + opt + '</option>';});
p.$goto.html(t).val( p.page + 1 );}
$out.find('.ts-startRow, .ts-page').off('change').on('change', function(){
var v=$(this).val(),
pg=$(this).hasClass('ts-startRow')?Math.floor( v/p.size ) + 1:v;
c.$table.trigger('pageSet.pager', [ pg ]);});}}
tsp.pagerArrows(c);
tsp.fixHeight(table, c);
if(p.initialized && completed !==false){
c.$table.trigger('pagerComplete', c);
if(wo.pager_savePages && ts.storage){
ts.storage(table, wo.pager_storageKey, {
page:p.page,
size:p.size
});}}},
buildPageSelect: function(p, c){
var i, central_focus_size, focus_option_pages, insert_index, option_length, focus_length,
wo=c.widgetOptions,
pg=Math.min( p.totalPages, p.filteredPages ) || 1,
skip_set_size=Math.ceil(( pg / wo.pager_maxOptionSize ) / 5 ) * 5,
large_collection=pg > wo.pager_maxOptionSize,
current_page=p.page + 1,
start_page=skip_set_size,
end_page=pg - skip_set_size,
option_pages=[1],
option_pages_start_page=(large_collection)?skip_set_size:1;
for ( i=option_pages_start_page; i <=pg; ){
option_pages.push(i);
i=i + ( large_collection?skip_set_size:1 );}
option_pages.push(pg);
if(large_collection){
focus_option_pages=[];
central_focus_size=Math.max( Math.floor( wo.pager_maxOptionSize / skip_set_size ) - 1, 5 );
start_page=current_page - central_focus_size;
if(start_page < 1){ start_page=1;}
end_page=current_page + central_focus_size;
if(end_page > pg){ end_page=pg;}
for (i=start_page; i <=end_page ; i++){
focus_option_pages.push(i);}
option_pages=$.grep(option_pages, function(value, indx){
return $.inArray(value, option_pages)===indx;});
option_length=option_pages.length;
focus_length=focus_option_pages.length;
if(option_length - focus_length > skip_set_size / 2 && option_length + focus_length > wo.pager_maxOptionSize ){
insert_index=Math.floor(option_length / 2) - Math.floor(focus_length / 2);
Array.prototype.splice.apply(option_pages, [ insert_index, focus_length ]);}
option_pages=option_pages.concat(focus_option_pages);}
option_pages=$.grep(option_pages, function(value, indx){
return $.inArray(value, option_pages)===indx;})
.sort(function(a,b){ return a - b;});
return option_pages;},
fixHeight: function(table, c){
var d, h,
p=c.pager,
wo=c.widgetOptions,
$b=c.$tbodies.eq(0);
$b.find('tr.pagerSavedHeightSpacer').remove();
if(wo.pager_fixedHeight && !p.isDisabled){
h=$.data(table,'pagerSavedHeight');
if(h){
d=h - $b.height();
if( d > 5 && $.data(table,'pagerLastSize')===p.size && $b.children('tr:visible').length < p.size ){
$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '" style="height:' + d + 'px;"></tr>');}}}},
changeHeight: function(table, c){
var h, $b=c.$tbodies.eq(0);
$b.find('tr.pagerSavedHeightSpacer').remove();
if(!$b.children('tr:visible').length){
$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '"><td>&nbsp</td></tr>');}
h=$b.children('tr').eq(0).height() * c.pager.size;
$.data(table,'pagerSavedHeight', h);
tsp.fixHeight(table, c);
$.data(table,'pagerLastSize', c.pager.size);},
hideRows: function(table, c){
if(!c.widgetOptions.pager_ajaxUrl){
var i,
lastIndex=0,
p=c.pager,
wo=c.widgetOptions,
rows=c.$tbodies.eq(0).children('tr'),
l=rows.length,
s=( p.page * p.size ),
e= s + p.size,
f=wo && wo.filter_filteredRow || 'filtered',
j=0;
for ( i=0; i < l; i++ ){
if( !rows[i].className.match(f) ){
if(j===s && rows[i].className.match(c.cssChildRow)){
rows[i].style.display='none';}else{
rows[i].style.display=( j >=s && j < e )?'':'none';
j +=rows[i].className.match(c.cssChildRow + '|' + c.selectorRemove.slice(1)) && !wo.pager_countChildRows?0:1;
if( j===e && rows[i].style.display !=='none' && rows[i].className.match(ts.css.cssHasChild) ){
lastIndex=i;}}}}
if( lastIndex > 0 && rows[lastIndex].className.match(ts.css.cssHasChild) ){
while ( ++lastIndex < l && rows[lastIndex].className.match(c.cssChildRow) ){
rows[lastIndex].style.display='';}}}},
hideRowsSetup: function(table, c){
var p=c.pager;
p.size=parseInt( p.$size.val(), 10 ) || p.size;
$.data(table,'pagerLastSize', p.size);
tsp.pagerArrows(c);
if( !c.widgetOptions.pager_removeRows ){
tsp.hideRows(table, c);
c.$table.on('sortEnd.pager filterEnd.pager', function(){
tsp.hideRows(table, c);});}},
renderAjax: function(data, table, c, xhr, exception){
var p=c.pager,
wo=c.widgetOptions;
if( $.isFunction(wo.pager_ajaxProcessing) ){
var i, j, t, hsh, $f, $sh, th, d, l, rr_count,
$t=c.$table,
tds='',
result=wo.pager_ajaxProcessing(data, table, xhr) || [ 0, [] ],
hl=$t.find('thead th').length;
ts.showError(table);
if( exception ){
if(c.debug){
ts.log('Ajax Error', xhr, exception);}
ts.showError(table, exception.message + ' (' + xhr.status + ')');
c.$tbodies.eq(0).children('tr').detach();
p.totalRows=0;}else{
if(!$.isArray(result)){
p.ajaxData=result;
c.totalRows=p.totalRows=result.total;
c.filteredRows=p.filteredRows=typeof result.filteredRows !=='undefined'?result.filteredRows:result.total;
th=result.headers;
d=result.rows;}else{
t=isNaN(result[0]) && !isNaN(result[1]);
rr_count=result[t?1:0];
p.totalRows=isNaN(rr_count)?p.totalRows || 0:rr_count;
c.totalRows=c.filteredRows=p.filteredRows=p.totalRows;
d=p.totalRows===0?[""]:result[t?0:1] || [];
th=result[2];}
l=d && d.length;
if(d instanceof jQuery){
if(wo.pager_processAjaxOnInit){
c.$tbodies.eq(0).children('tr').detach();
c.$tbodies.eq(0).append(d);}} else if(l){
for ( i=0; i < l; i++ ){
tds +='<tr>';
for ( j=0; j < d[i].length; j++ ){
tds +=/^\s*<td/.test(d[i][j])?$.trim(d[i][j]):'<td>' + d[i][j] + '</td>';}
tds +='</tr>';}
if(wo.pager_processAjaxOnInit){
c.$tbodies.eq(0).html( tds );}}
wo.pager_processAjaxOnInit=true;
if( th && th.length===hl ){
hsh=$t.hasClass('hasStickyHeaders');
$sh=hsh?wo.$sticky.children('thead:first').children('tr').children():'';
$f=$t.find('tfoot tr:first').children();
c.$headers.filter('th').each(function(j){
var $t=$(this), icn;
if( $t.find('.' + ts.css.icon).length ){
icn=$t.find('.' + ts.css.icon).clone(true);
$t.find('.tablesorter-header-inner').html( th[j] ).append(icn);
if( hsh && $sh.length ){
icn=$sh.eq(j).find('.' + ts.css.icon).clone(true);
$sh.eq(j).find('.tablesorter-header-inner').html( th[j] ).append(icn);}}else{
$t.find('.tablesorter-header-inner').html( th[j] );
if(hsh && $sh.length){
$sh.eq(j).find('.tablesorter-header-inner').html( th[j] );}}
$f.eq(j).html( th[j] );});}}
if(c.showProcessing){
ts.isProcessing(table);}
p.totalPages=Math.ceil( p.totalRows / ( p.size || 10 ) );
p.last.totalRows=p.totalRows;
p.last.currentFilters=p.currentFilters;
p.last.sortList=(c.sortList || []).join(',');
p.initializing=false;
tsp.updatePageDisplay(table, c);
$t.trigger('updateCache', [function(){
if(p.initialized){
setTimeout(function(){
$t
.trigger('applyWidgets')
.trigger('pagerChange', p);}, 0);}}]);}
if(!p.initialized){
c.$table.trigger('applyWidgets');}},
getAjax: function(table, c){
var counter,
url=tsp.getAjaxUrl(table, c),
$doc=$(document),
p=c.pager;
if( url !=='' ){
if(c.showProcessing){
ts.isProcessing(table, true);}
$doc.on('ajaxError.pager', function(e, xhr, settings, exception){
tsp.renderAjax(null, table, c, xhr, exception);
$doc.off('ajaxError.pager');});
counter=++p.ajaxCounter;
p.last.ajaxUrl=url;
p.ajaxObject.url=url;
p.ajaxObject.success=function(data, status, jqxhr){
if(counter < p.ajaxCounter){
return;}
tsp.renderAjax(data, table, c, jqxhr);
$doc.off('ajaxError.pager');
if(typeof p.oldAjaxSuccess==='function'){
p.oldAjaxSuccess(data);}};
if(c.debug){
ts.log('ajax initialized', p.ajaxObject);}
$.ajax(p.ajaxObject);}},
getAjaxUrl: function(table, c){
var p=c.pager,
wo=c.widgetOptions,
url=(wo.pager_ajaxUrl)?wo.pager_ajaxUrl
.replace(/\{page([\-+]\d+)?\}/, function(s,n){ return p.page + (n?parseInt(n, 10):0);})
.replace(/\{size\}/g, p.size):'',
sl=c.sortList,
fl=p.currentFilters || $(table).data('lastSearch') || [],
sortCol=url.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),
filterCol=url.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),
arry=[];
if(sortCol){
sortCol=sortCol[1];
$.each(sl, function(i,v){
arry.push(sortCol + '[' + v[0] + ']=' + v[1]);});
url=url.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length?arry.join('&'):sortCol );
arry=[];}
if(filterCol){
filterCol=filterCol[1];
$.each(fl, function(i,v){
if(v){
arry.push(filterCol + '[' + i + ']=' + encodeURIComponent(v));}});
url=url.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length?arry.join('&'):filterCol );
p.currentFilters=fl;}
if( $.isFunction(wo.pager_customAjaxUrl) ){
url=wo.pager_customAjaxUrl(table, url);}
if(c.debug){
ts.log('Pager ajax url: ' + url);}
return url;},
renderTable: function(table, rows){
var $tb, index, count, added,
c=table.config,
p=c.pager,
wo=c.widgetOptions,
f=c.$table.hasClass('hasFilters'),
l=rows && rows.length || 0,
s=( p.page * p.size ),
e=p.size;
if( l < 1 ){
if(c.debug){
ts.log('Pager: no rows for pager to render');}
return;}
if( p.page >=p.totalPages ){
return tsp.moveToLastPage(table, p);}
p.isDisabled=false;
if(p.initialized){ c.$table.trigger('pagerChange', c);}
if( !wo.pager_removeRows ){
tsp.hideRows(table, c);}else{
ts.clearTableBody(table);
$tb=ts.processTbody(table, c.$tbodies.eq(0), true);
index=f?0:s;
count=f?0:s;
added=0;
while (added < e && index < rows.length){
if(!f || !/filtered/.test(rows[index][0].className)){
count++;
if(count > s && added <=e){
added++;
$tb.append(rows[index]);}}
index++;}
ts.processTbody(table, $tb, false);}
tsp.updatePageDisplay(table, c);
wo.pager_startPage=p.page;
wo.pager_size=p.size;
if(table.isUpdating){
c.$table.trigger('updateComplete', [ table, true ]);}},
showAllRows: function(table, c){
var p=c.pager,
wo=c.widgetOptions;
if( p.ajax ){
tsp.pagerArrows(c, true);}else{
p.isDisabled=true;
$.data(table,'pagerLastPage', p.page);
$.data(table,'pagerLastSize', p.size);
p.page=0;
p.size=p.totalRows;
p.totalPages=1;
c.$table
.addClass('pagerDisabled')
.removeAttr('aria-describedby')
.find('tr.pagerSavedHeightSpacer').remove();
tsp.renderTable(table, c.rowsCopy);
c.$table.trigger('applyWidgets');
if(c.debug){
ts.log('pager disabled');}}
p.$size.add(p.$goto).each(function(){
$(this).attr('aria-disabled','true').addClass(wo.pager_css.disabled)[0].disabled=true;});},
updateCache: function(table){
var c=table.config,
p=c.pager;
c.$table.trigger('updateCache', [ function(){
if( !$.isEmptyObject(table.config.cache) ){
var i,
rows=[],
n=table.config.cache[0].normalized;
p.totalRows=n.length;
for (i=0; i < p.totalRows; i++){
rows.push(n[i][c.columns].$row);}
c.rowsCopy=rows;
tsp.moveToPage(table, p, true);
p.last.currentFilters=[' '];}} ]);},
moveToPage: function(table, p, pageMoved){
if( p.isDisabled ){ return;}
if( pageMoved !==false && p.initialized && $.isEmptyObject(table.config.cache)){
return tsp.updateCache(table);}
var pg, c=table.config,
wo=c.widgetOptions,
l=p.last;
if(p.ajax && !wo.filter_initialized && ts.hasWidget(table,'filter')){ return;}
tsp.calcFilters(table, c);
pg=Math.min( p.totalPages, p.filteredPages );
if( p.page < 0 ){ p.page=0;}
if( p.page > ( pg - 1 ) && pg !==0 ){ p.page=pg - 1;}
l.currentFilters=(l.currentFilters || []).join('')===''?[]:l.currentFilters;
p.currentFilters=(p.currentFilters || []).join('')===''?[]:p.currentFilters;
if( l.page===p.page && l.size===p.size && l.totalRows===p.totalRows &&
(l.currentFilters || []).join(',')===(p.currentFilters || []).join(',') &&
(l.ajaxUrl || '')===(p.ajaxObject.url || '') &&
(l.optAjaxUrl || '')===(wo.pager_ajaxUrl || '') &&
l.sortList===(c.sortList || []).join(',') ){
return;}
if(c.debug){
ts.log('Pager changing to page ' + p.page);}
p.last={
page:p.page,
size:p.size,
sortList:(c.sortList || []).join(','),
totalRows:p.totalRows,
currentFilters:p.currentFilters || [],
ajaxUrl:p.ajaxObject.url || '',
optAjaxUrl:wo.pager_ajaxUrl
};
if(p.ajax){
tsp.getAjax(table, c);} else if(!p.ajax){
tsp.renderTable(table, c.rowsCopy);}
$.data(table,'pagerLastPage', p.page);
if(p.initialized && pageMoved !==false){
c.$table
.trigger('pageMoved', c)
.trigger('applyWidgets');
if(!p.ajax && table.isUpdating){
c.$table.trigger('updateComplete', [ table, true ]);}}},
setPageSize: function(table, size, c){
var p=c.pager;
p.size=size || p.size || 10;
p.$size.val(p.size);
$.data(table,'pagerLastPage', p.page);
$.data(table,'pagerLastSize', p.size);
p.totalPages=Math.ceil( p.totalRows / p.size );
p.filteredPages=Math.ceil( p.filteredRows / p.size );
tsp.moveToPage(table, p, true);},
moveToFirstPage: function(table, p){
p.page=0;
tsp.moveToPage(table, p, true);},
moveToLastPage: function(table, p){
p.page=( Math.min( p.totalPages, p.filteredPages ) - 1 );
tsp.moveToPage(table, p, true);},
moveToNextPage: function(table, p){
p.page++;
if( p.page >=( Math.min( p.totalPages, p.filteredPages ) - 1 ) ){
p.page=( Math.min( p.totalPages, p.filteredPages ) - 1 );}
tsp.moveToPage(table, p, true);},
moveToPrevPage: function(table, p){
p.page--;
if( p.page <=0 ){
p.page=0;}
tsp.moveToPage(table, p, true);},
destroyPager: function(table, c){
var p=c.pager;
tsp.showAllRows(table, c);
p.$container.hide();
c.appender=null;
p.initialized=false;
delete table.config.rowsCopy;
c.$table.off('filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete pageSize pageSet '.split(' ').join('.pager '));
if(ts.storage){
ts.storage(table, c.widgetOptions.pager_storageKey,'');}},
enablePager: function(table, c, triggered){
var info, p=c.pager;
p.isDisabled=false;
p.page=$.data(table,'pagerLastPage') || p.page || 0;
p.size=$.data(table,'pagerLastSize') || parseInt(p.$size.find('option[selected]').val(), 10) || p.size || 10;
p.$size.val(p.size);
p.totalPages=Math.ceil( Math.min( p.totalRows, p.filteredRows ) / p.size );
c.$table.removeClass('pagerDisabled');
if( table.id ){
info=table.id + '_pager_info';
p.$container.find(c.widgetOptions.pager_selectors.pageDisplay).attr('id', info);
c.$table.attr('aria-describedby', info);}
tsp.changeHeight(table, c);
if( triggered ){
c.$table.trigger('updateRows');
tsp.setPageSize(table, p.size, c);
tsp.hideRowsSetup(table, c);
if(c.debug){
ts.log('pager enabled');}}},
appender: function(table, rows){
var c=table.config,
wo=c.widgetOptions,
p=c.pager;
if( !p.ajax ){
c.rowsCopy=rows;
p.totalRows=wo.pager_countChildRows?c.$tbodies.eq(0).children('tr').length:rows.length;
p.size=$.data(table,'pagerLastSize') || p.size || wo.pager_size || 10;
p.totalPages=Math.ceil( p.totalRows / p.size );
tsp.moveToPage(table, p);
tsp.updatePageDisplay(table, c, false);}else{
tsp.moveToPage(table, p, true);}}};
ts.showError=function(table, message){
$(table).each(function(){
var $row,
c=this.config,
wo=c.widgetOptions,
errorRow=c.pager && c.pager.cssErrorRow || wo.pager_css && wo.pager_css.errorRow || 'tablesorter-errorRow';
if(c){
if(typeof message==='undefined'){
c.$table.find('thead').find(c.selectorRemove).remove();}else{
$row=( /tr\>/.test(message)?$(message):$('<tr><td colspan="' + c.columns + '">' + message + '</td></tr>') )
.click(function(){
$(this).remove();})
.appendTo( c.$table.find('thead:first') )
.addClass( errorRow + ' ' + c.selectorRemove.slice(1) )
.attr({
role:'alert','aria-live':'assertive'
});}}});};})(jQuery);