// @file : /third/tablesorter/addons/pager/jquery.tablesorter.pager.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:51
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter;
$.extend({ tablesorterPager: new function(){
this.defaults={
container: null,
ajaxUrl: null,
customAjaxUrl: function(table, url){ return url;},
ajaxObject: {
dataType: 'json'
},
processAjaxOnInit: true,
ajaxProcessing: function(ajax){ return [ 0, [], null ];},
output: '{startRow} to {endRow} of {totalRows} rows',
updateArrows: true,
page: 0,
pageReset: 0,
size: 10,
maxOptionSize: 20,
savePages: true,
storageKey: 'tablesorter-pager',
fixedHeight: false,
countChildRows: false,
removeRows: false,
cssFirst: '.first',
cssPrev: '.prev',
cssNext: '.next',
cssLast: '.last',
cssGoto: '.gotoPage',
cssPageDisplay: '.pagedisplay',
cssPageSize: '.pagesize',
cssErrorRow: 'tablesorter-errorRow',
cssDisabled: 'disabled',
totalRows: 0,
totalPages: 0,
filteredRows: 0,
filteredPages: 0,
ajaxCounter: 0,
currentFilters: [],
startRow: 0,
endRow: 0,
$size: null,
last: {}};var $this=this,
pagerArrows=function(p, disable){
var a='addClass',
r='removeClass',
d=p.cssDisabled,
dis=!!disable,
first=( dis || p.page===0 ),
tp=Math.min( p.totalPages, p.filteredPages ),
last=( dis || (p.page===tp - 1) || tp===0 );
if( p.updateArrows ){
p.$container.find(p.cssFirst + ',' + p.cssPrev)[ first?a:r ](d).attr('aria-disabled', first);
p.$container.find(p.cssNext + ',' + p.cssLast)[ last?a:r ](d).attr('aria-disabled', last);}},
calcFilters=function(table, p){
var c=table.config,
hasFilters=c.$table.hasClass('hasFilters');
if(hasFilters && !p.ajaxUrl){
if($.isEmptyObject(c.cache)){
p.filteredRows=p.totalRows=c.$tbodies.eq(0).children('tr').not( p.countChildRows?'':'.' + c.cssChildRow ).length;}else{
p.filteredRows=0;
$.each(c.cache[0].normalized, function(i, el){
p.filteredRows +=p.regexRows.test(el[c.columns].$row[0].className)?0:1;});}} else if(!hasFilters){
p.filteredRows=p.totalRows;}},
updatePageDisplay=function(table, p, completed){
if( p.initializing ){ return;}
var s, t, $out,
c=table.config,
sz=p.size || 10;
if(p.countChildRows){ t.push(c.cssChildRow);}
p.totalPages=Math.ceil( p.totalRows / sz );
c.totalRows=p.totalRows;
calcFilters(table, p);
c.filteredRows=p.filteredRows;
p.filteredPages=Math.ceil( p.filteredRows / sz ) || 0;
if( Math.min( p.totalPages, p.filteredPages ) >=0 ){
t=(p.size * p.page > p.filteredRows) && completed;
p.startRow=(t)?1:(p.filteredRows===0?0:p.size * p.page + 1);
p.page=(t)?0:p.page;
p.endRow=Math.min( p.filteredRows, p.totalRows, p.size * ( p.page + 1 ) );
$out=p.$container.find(p.cssPageDisplay);
s=( p.ajaxData && p.ajaxData.output?p.ajaxData.output || p.output:p.output )
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
$.each(buildPageSelect(p), function(i, opt){
t +='<option value="' + opt + '">' + opt + '</option>';});
p.$goto.html(t).val( p.page + 1 );}
$out.find('.ts-startRow, .ts-page').unbind('change').bind('change', function(){
var v=$(this).val(),
pg=$(this).hasClass('ts-startRow')?Math.floor( v/p.size ) + 1:v;
c.$table.trigger('pageSet.pager', [ pg ]);});}}
pagerArrows(p);
fixHeight(table, p);
if(p.initialized && completed !==false){
c.$table.trigger('pagerComplete', p);
if(p.savePages && ts.storage){
ts.storage(table, p.storageKey, {
page:p.page,
size:p.size
});}}},
buildPageSelect=function(p){
var i, central_focus_size, focus_option_pages, insert_index, option_length, focus_length,
pg=Math.min( p.totalPages, p.filteredPages ) || 1,
skip_set_size=Math.ceil(( pg / p.maxOptionSize ) / 5 ) * 5,
large_collection=pg > p.maxOptionSize,
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
central_focus_size=Math.max( Math.floor( p.maxOptionSize / skip_set_size ) - 1, 5 );
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
if(option_length - focus_length > skip_set_size / 2 && option_length + focus_length > p.maxOptionSize ){
insert_index=Math.floor(option_length / 2) - Math.floor(focus_length / 2);
Array.prototype.splice.apply(option_pages, [ insert_index, focus_length ]);}
option_pages=option_pages.concat(focus_option_pages);}
option_pages=$.grep(option_pages, function(value, indx){
return $.inArray(value, option_pages)===indx;})
.sort(function(a,b){ return a - b;});
return option_pages;},
fixHeight=function(table, p){
var d, h,
c=table.config,
$b=c.$tbodies.eq(0);
$b.find('tr.pagerSavedHeightSpacer').remove();
if(p.fixedHeight && !p.isDisabled){
h=$.data(table,'pagerSavedHeight');
if(h){
d=h - $b.height();
if( d > 5 && $.data(table,'pagerLastSize')===p.size && $b.children('tr:visible').length < p.size ){
$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '" style="height:' + d + 'px;"></tr>');}}}},
changeHeight=function(table, p){
var h,
c=table.config,
$b=c.$tbodies.eq(0);
$b.find('tr.pagerSavedHeightSpacer').remove();
if(!$b.children('tr:visible').length){
$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '"><td>&nbsp</td></tr>');}
h=$b.children('tr').eq(0).height() * p.size;
$.data(table,'pagerSavedHeight', h);
fixHeight(table, p);
$.data(table,'pagerLastSize', p.size);},
hideRows=function(table, p){
if(!p.ajaxUrl){
var i,
lastIndex=0,
c=table.config,
rows=c.$tbodies.eq(0).children('tr'),
l=rows.length,
s=( p.page * p.size ),
e= s + p.size,
f=c.widgetOptions && c.widgetOptions.filter_filteredRow || 'filtered',
j=0;
for ( i=0; i < l; i++ ){
if( !rows[i].className.match(f) ){
if(j===s && rows[i].className.match(c.cssChildRow)){
rows[i].style.display='none';}else{
rows[i].style.display=( j >=s && j < e )?'':'none';
j +=rows[i].className.match(c.cssChildRow + '|' + c.selectorRemove.slice(1)) && !p.countChildRows?0:1;
if( j===e && rows[i].style.display !=='none' && rows[i].className.match(ts.css.cssHasChild) ){
lastIndex=i;}}}}
if( lastIndex > 0 && rows[lastIndex].className.match(ts.css.cssHasChild) ){
while ( ++lastIndex < l && rows[lastIndex].className.match(c.cssChildRow) ){
rows[lastIndex].style.display='';}}}},
hideRowsSetup=function(table, p){
p.size=parseInt( p.$size.val(), 10 ) || p.size;
$.data(table,'pagerLastSize', p.size);
pagerArrows(p);
if( !p.removeRows ){
hideRows(table, p);
$(table).bind('sortEnd.pager filterEnd.pager', function(){
hideRows(table, p);});}},
renderAjax=function(data, table, p, xhr, exception){
if( typeof(p.ajaxProcessing)==="function" ){
var i, j, hsh, $f, $sh, t, th, d, l, rr_count,
c=table.config,
$t=c.$table,
tds='',
result=p.ajaxProcessing(data, table, xhr) || [ 0, [] ],
hl=$t.find('thead th').length;
ts.showError(table);
if( exception ){
if(c.debug){
ts.log('Ajax Error', xhr, exception);}
ts.showError(table,
xhr.status===0?'Not connected, verify Network' :
xhr.status===404?'Requested page not found [404]' :
xhr.status===500?'Internal Server Error [500]' :
exception==='parsererror'?'Requested JSON parse failed' :
exception==='timeout'?'Time out error' :
exception==='abort'?'Ajax Request aborted' :
'Uncaught error: ' + xhr.statusText + ' [' + xhr.status + ']' );
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
if(p.processAjaxOnInit){
c.$tbodies.eq(0).children('tr').detach();
c.$tbodies.eq(0).append(d);}} else if(l){
for ( i=0; i < l; i++ ){
tds +='<tr>';
for ( j=0; j < d[i].length; j++ ){
tds +=/^\s*<td/.test(d[i][j])?$.trim(d[i][j]):'<td>' + d[i][j] + '</td>';}
tds +='</tr>';}
if(p.processAjaxOnInit){
c.$tbodies.eq(0).html( tds );}}
p.processAjaxOnInit=true;
if( th && th.length===hl ){
hsh=$t.hasClass('hasStickyHeaders');
$sh=hsh?c.widgetOptions.$sticky.children('thead:first').children('tr').children():'';
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
updatePageDisplay(table, p, true);
$t.trigger('updateCache', [function(){
if(p.initialized){
setTimeout(function(){
$t
.trigger('applyWidgets')
.trigger('pagerChange', p);}, 0);}}]);}
if(!p.initialized){
p.initialized=true;
p.initializing=false;
$(table)
.trigger('applyWidgets')
.trigger('pagerInitialized', p);
updatePageDisplay(table, p);}},
getAjax=function(table, p){
var url=getAjaxUrl(table, p),
$doc=$(document),
counter,
c=table.config;
if( url !=='' ){
if(c.showProcessing){
ts.isProcessing(table, true);}
$doc.bind('ajaxError.pager', function(e, xhr, settings, exception){
renderAjax(null, table, p, xhr, exception);
$doc.unbind('ajaxError.pager');});
counter=++p.ajaxCounter;
p.last.ajaxUrl=url;
p.ajaxObject.url=url;
p.ajaxObject.success=function(data, status, jqxhr){
if(counter < p.ajaxCounter){
return;}
renderAjax(data, table, p, jqxhr);
$doc.unbind('ajaxError.pager');
if(typeof p.oldAjaxSuccess==='function'){
p.oldAjaxSuccess(data);}};
if(c.debug){
ts.log('ajax initialized', p.ajaxObject);}
$.ajax(p.ajaxObject);}},
getAjaxUrl=function(table, p){
var c=table.config,
url=(p.ajaxUrl)?p.ajaxUrl
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
if( typeof(p.customAjaxUrl)==="function" ){
url=p.customAjaxUrl(table, url);}
if(c.debug){
ts.log('Pager ajax url: ' + url);}
return url;},
renderTable=function(table, rows, p){
var $tb, index, count, added,
$t=$(table),
c=table.config,
f=c.$table.hasClass('hasFilters'),
l=rows && rows.length || 0,
s=( p.page * p.size ),
e=p.size;
if( l < 1 ){
if(c.debug){
ts.log('Pager: no rows for pager to render');}
return;}
if( p.page >=p.totalPages ){
moveToLastPage(table, p);}
p.isDisabled=false;
if(p.initialized){ $t.trigger('pagerChange', p);}
if( !p.removeRows ){
hideRows(table, p);}else{
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
updatePageDisplay(table, p);
if(table.isUpdating){
$t.trigger('updateComplete', [ table, true ]);}},
showAllRows=function(table, p){
if( p.ajax ){
pagerArrows(p, true);}else{
p.isDisabled=true;
$.data(table,'pagerLastPage', p.page);
$.data(table,'pagerLastSize', p.size);
p.page=0;
p.size=p.totalRows;
p.totalPages=1;
$(table)
.addClass('pagerDisabled')
.removeAttr('aria-describedby')
.find('tr.pagerSavedHeightSpacer').remove();
renderTable(table, table.config.rowsCopy, p);
$(table).trigger('applyWidgets');
if(table.config.debug){
ts.log('pager disabled');}}
p.$size.add(p.$goto).add(p.$container.find('.ts-startRow, .ts-page')).each(function(){
$(this).attr('aria-disabled','true').addClass(p.cssDisabled)[0].disabled=true;});},
updateCache=function(table){
var c=table.config,
p=c.pager;
c.$table.trigger('updateCache', [ function(){
var i,
rows=[],
n=table.config.cache[0].normalized;
p.totalRows=n.length;
for (i=0; i < p.totalRows; i++){
rows.push(n[i][c.columns].$row);}
c.rowsCopy=rows;
moveToPage(table, p, true);} ]);},
moveToPage=function(table, p, pageMoved){
if( p.isDisabled ){ return;}
var pg, c=table.config,
$t=$(table),
l=p.last;
if( pageMoved !==false && p.initialized && $.isEmptyObject(c.cache)){
return updateCache(table);}
if(p.ajax && ts.hasWidget(table,'filter') && !c.widgetOptions.filter_initialized){ return;}
calcFilters(table, p);
pg=Math.min( p.totalPages, p.filteredPages );
if( p.page < 0 ){ p.page=0;}
if( p.page > ( pg - 1 ) && pg !==0 ){ p.page=pg - 1;}
l.currentFilters=(l.currentFilters || []).join('')===''?[]:l.currentFilters;
p.currentFilters=(p.currentFilters || []).join('')===''?[]:p.currentFilters;
if( l.page===p.page && l.size===p.size && l.totalRows===p.totalRows &&
(l.currentFilters || []).join(',')===(p.currentFilters || []).join(',') &&
(l.ajaxUrl || '')===(p.ajaxObject.url || '') &&
(l.optAjaxUrl || '')===(p.ajaxUrl || '') &&
l.sortList===(c.sortList || []).join(',') ){ return;}
if(c.debug){
ts.log('Pager changing to page ' + p.page);}
p.last={
page:p.page,
size:p.size,
sortList:(c.sortList || []).join(','),
totalRows:p.totalRows,
currentFilters:p.currentFilters || [],
ajaxUrl:p.ajaxObject.url || '',
optAjaxUrl:p.ajaxUrl || ''
};
if(p.ajax){
getAjax(table, p);} else if(!p.ajax){
renderTable(table, c.rowsCopy, p);}
$.data(table,'pagerLastPage', p.page);
if(p.initialized && pageMoved !==false){
$t
.trigger('pageMoved', p)
.trigger('applyWidgets');
if(table.isUpdating){
$t.trigger('updateComplete', [ table, true ]);}}},
setPageSize=function(table, size, p){
p.size=size || p.size || 10;
p.$size.val(p.size);
$.data(table,'pagerLastPage', p.page);
$.data(table,'pagerLastSize', p.size);
p.totalPages=Math.ceil( p.totalRows / p.size );
p.filteredPages=Math.ceil( p.filteredRows / p.size );
moveToPage(table, p);},
moveToFirstPage=function(table, p){
p.page=0;
moveToPage(table, p);},
moveToLastPage=function(table, p){
p.page=( Math.min( p.totalPages, p.filteredPages ) - 1 );
moveToPage(table, p);},
moveToNextPage=function(table, p){
p.page++;
if( p.page >=( Math.min( p.totalPages, p.filteredPages ) - 1 ) ){
p.page=( Math.min( p.totalPages, p.filteredPages ) - 1 );}
moveToPage(table, p);},
moveToPrevPage=function(table, p){
p.page--;
if( p.page <=0 ){
p.page=0;}
moveToPage(table, p);},
destroyPager=function(table, p){
showAllRows(table, p);
p.$container.hide();
table.config.appender=null;
p.initialized=false;
delete table.config.rowsCopy;
$(table).unbind('filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete pageSize pageSet '.split(' ').join('.pager '));
if(ts.storage){
ts.storage(table, p.storageKey,'');}},
enablePager=function(table, p, triggered){
var info,
c=table.config;
p.$size.add(p.$goto).add(p.$container.find('.ts-startRow, .ts-page'))
.removeClass(p.cssDisabled)
.removeAttr('disabled')
.attr('aria-disabled','false');
p.isDisabled=false;
p.page=$.data(table,'pagerLastPage') || p.page || 0;
p.size=$.data(table,'pagerLastSize') || parseInt(p.$size.find('option[selected]').val(), 10) || p.size || 10;
p.$size.val(p.size);
p.totalPages=Math.ceil( Math.min( p.totalRows, p.filteredRows ) / p.size );
if( table.id ){
info=table.id + '_pager_info';
p.$container.find(p.cssPageDisplay).attr('id', info);
c.$table.attr('aria-describedby', info);}
changeHeight(table, p);
if( triggered ){
c.$table.trigger('updateRows');
setPageSize(table, p.size, p);
hideRowsSetup(table, p);
if(c.debug){
ts.log('pager enabled');}}};
$this.appender=function(table, rows){
var c=table.config,
p=c.pager;
if( !p.ajax ){
c.rowsCopy=rows;
p.totalRows=p.countChildRows?c.$tbodies.eq(0).children('tr').length:rows.length;
p.size=$.data(table,'pagerLastSize') || p.size || 10;
p.totalPages=Math.ceil( p.totalRows / p.size );
renderTable(table, rows, p);
updatePageDisplay(table, p, false);}};
$this.construct=function(settings){
return this.each(function(){
if(!(this.config && this.hasInitialized)){ return;}
var t, ctrls, fxn,
table=this,
c=table.config,
wo=c.widgetOptions,
p=c.pager=$.extend( true, {}, $.tablesorterPager.defaults, settings ),
$t=c.$table,
pager=p.$container=$(p.container).addClass('tablesorter-pager').show();
if(c.debug){
ts.log('Pager initializing');}
p.oldAjaxSuccess=p.oldAjaxSuccess || p.ajaxObject.success;
c.appender=$this.appender;
p.initializing=true;
if(p.savePages && ts.storage){
t=ts.storage(table, p.storageKey) || {};
p.page=isNaN(t.page)?p.page:t.page;
p.size=( isNaN(t.size)?p.size:t.size ) || 10;
$.data(table,'pagerLastSize', p.size);}
p.regexRows=new RegExp('(' + (wo.filter_filteredRow || 'filtered') + '|' + c.selectorRemove.slice(1) + '|' + c.cssChildRow + ')');
$t
.unbind('filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete pageSize pageSet '.split(' ').join('.pager '))
.bind('filterInit.pager filterStart.pager', function(e){
p.currentFilters=c.$table.data('lastSearch');
if(e.type==='filterStart' && p.pageReset !==false && (c.lastCombinedFilter || '') !==(p.currentFilters || []).join('')){
p.page=p.pageReset;}})
.bind('filterEnd.pager sortEnd.pager', function(){
p.currentFilters=c.$table.data('lastSearch');
if(p.initialized || p.initializing){
if(c.delayInit && c.rowsCopy && c.rowsCopy.length===0){
updateCache(table);}
moveToPage(table, p, false);
c.$table.trigger('applyWidgets');
updatePageDisplay(table, p, false);}})
.bind('disable.pager', function(e){
e.stopPropagation();
showAllRows(table, p);})
.bind('enable.pager', function(e){
e.stopPropagation();
enablePager(table, p, true);})
.bind('destroy.pager', function(e){
e.stopPropagation();
destroyPager(table, p);})
.bind('updateComplete.pager', function(e, table, triggered){
e.stopPropagation();
if( !table || triggered ){ return;}
var $rows=c.$tbodies.eq(0).children('tr').not(c.selectorRemove);
p.totalRows=$rows.length - ( p.countChildRows?0:$rows.filter('.' + c.cssChildRow).length );
p.totalPages=Math.ceil( p.totalRows / p.size );
if($rows.length && c.rowsCopy && c.rowsCopy.length===0){
updateCache(table);}
if( p.page >=p.totalPages ){
moveToLastPage(table, p);}
hideRows(table, p);
changeHeight(table, p);
updatePageDisplay(table, p, true);})
.bind('pageSize.pager', function(e,v){
e.stopPropagation();
setPageSize(table, parseInt(v, 10) || 10, p);
hideRows(table, p);
updatePageDisplay(table, p, false);
if(p.$size.length){ p.$size.val(p.size);}})
.bind('pageSet.pager', function(e,v){
e.stopPropagation();
p.page=(parseInt(v, 10) || 1) - 1;
if(p.$goto.length){ p.$goto.val(p.size);}
moveToPage(table, p, true);
updatePageDisplay(table, p, false);});
ctrls=[ p.cssFirst, p.cssPrev, p.cssNext, p.cssLast ];
fxn=[ moveToFirstPage, moveToPrevPage, moveToNextPage, moveToLastPage ];
pager.find(ctrls.join(','))
.attr("tabindex", 0)
.unbind('click.pager')
.bind('click.pager', function(e){
e.stopPropagation();var i, $t=$(this), l=ctrls.length;
if( !$t.hasClass(p.cssDisabled) ){
for (i=0; i < l; i++){
if($t.is(ctrls[i])){
fxn[i](table, p);
break;}}}});
p.$goto=pager.find(p.cssGoto);
if( p.$goto.length ){
p.$goto
.unbind('change')
.bind('change', function(){
p.page=$(this).val() - 1;
moveToPage(table, p, true);
updatePageDisplay(table, p, false);});}
p.$size=pager.find(p.cssPageSize);
if( p.$size.length ){
p.$size.find('option').removeAttr('selected');
p.$size.unbind('change.pager').bind('change.pager', function(){
p.$size.val( $(this).val() );
if( !$(this).hasClass(p.cssDisabled) ){
setPageSize(table, parseInt( $(this).val(), 10 ), p);
changeHeight(table, p);}
return false;});}
p.initialized=false;
$t.trigger('pagerBeforeInitialized', p);
enablePager(table, p, false);
if( typeof(p.ajaxUrl)==='string' ){
p.ajax=true;
c.widgetOptions.filter_serversideFiltering=true;
c.serverSideSorting=true;
moveToPage(table, p);}else{
p.ajax=false;
$(this).trigger("appendCache", true);
hideRowsSetup(table, p);}
if(!p.ajax && !p.initialized){
p.initializing=false;
p.initialized=true;
moveToPage(table, p);
$(table).trigger('pagerInitialized', p);
if( !( c.widgetOptions.filter_initialized && ts.hasWidget(table,'filter') ) ){
updatePageDisplay(table, p, false);}}});};}() });
ts.showError=function(table, message){
$(table).each(function(){
var $row,
c=this.config,
errorRow=c.pager && c.pager.cssErrorRow || c.widgetOptions.pager_css && c.widgetOptions.pager_css.errorRow || 'tablesorter-errorRow';
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
});}}});};
$.fn.extend({
tablesorterPager: $.tablesorterPager.construct
});})(jQuery);