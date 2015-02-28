// @file : /third/tablesorter/js/jquery.tablesorter.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:51
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
!(function($){
"use strict";
$.extend({
tablesorter: new function(){
var ts=this;
ts.version="2.18.3";
ts.parsers=[];
ts.widgets=[];
ts.defaults={
theme           :'default',
widthFixed      :false,
showProcessing  :false,
headerTemplate  :'{content}',// header layout template (HTML ok); {content}=innerHTML, {icon}=<i/> (class from cssIcon)
onRenderTemplate:null,
onRenderHeader  :null,
cancelSelection :true,
tabIndex        :true,
dateFormat      :'mmddyyyy',
sortMultiSortKey:'shiftKey',
sortResetKey    :'ctrlKey',
usNumberFormat  :true,
delayInit       :false,
serverSideSorting: false,
headers         :{},
ignoreCase      :true,
sortForce       :null,
sortList        :[],
sortAppend      :null,
sortStable      :false,
sortInitialOrder:'asc',
sortLocaleCompare: false,
sortReset       :false,
sortRestart     :false,
emptyTo         :'bottom',
stringTo        :'max',
textExtraction  :'basic',
textAttribute   :'data-text',// data-attribute that contains alternate cell text (used in textExtraction function)
textSorter      :null,
numberSorter    :null,
widgets: [],
widgetOptions   :{
zebra:[ 'even','odd' ]
},
initWidgets     :true,
widgetClass    :'widget-{name}',
initialized     :null,
tableClass      :'',
cssAsc          :'',
cssDesc         :'',
cssNone         :'',
cssHeader       :'',
cssHeaderRow    :'',
cssProcessing   :'',
cssChildRow     :'tablesorter-childRow',
cssIcon         :'tablesorter-icon',
cssIconNone     :'',
cssIconAsc      :'',
cssIconDesc     :'',
cssInfoBlock    :'tablesorter-infoOnly',
cssAllowClicks  :'tablesorter-allowClicks',
selectorHeaders :'> thead th, > thead td',
selectorSort    :'th, td',
selectorRemove  :'.remove-me',
debug           :false,
headerList: [],
empties: {},
strings: {},
parsers: []
};
ts.css={
table     :'tablesorter',
cssHasChild: 'tablesorter-hasChildRow',
childRow  :'tablesorter-childRow',
header    :'tablesorter-header',
headerRow :'tablesorter-headerRow',
headerIn  :'tablesorter-header-inner',
icon      :'tablesorter-icon',
info      :'tablesorter-infoOnly',
processing:'tablesorter-processing',
sortAsc   :'tablesorter-headerAsc',
sortDesc  :'tablesorter-headerDesc',
sortNone  :'tablesorter-headerUnSorted'
};
ts.language={
sortAsc :'Ascending sort applied,',
sortDesc:'Descending sort applied,',
sortNone:'No sort applied,',
nextAsc :'activate to apply an ascending sort',
nextDesc:'activate to apply a descending sort',
nextNone:'activate to remove the sort'
};
function log(){
var a=arguments[0],
s=arguments.length > 1?Array.prototype.slice.call(arguments):a;
if(typeof console !=="undefined" && typeof console.log !=="undefined"){
console[ /error/i.test(a)?'error':/warn/i.test(a)?'warn':'log' ](s);}else{
alert(s);}}
function benchmark(s, d){
log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");}
ts.log=log;
ts.benchmark=benchmark;
function isEmptyObject(obj){
for (var name in obj){
return false;}
return true;}
function getElementText(table, node, cellIndex){
if(!node){ return "";}
var te, c=table.config,
t=c.textExtraction || '',
text="";
if(t==="basic"){
text=$(node).attr(c.textAttribute) || node.textContent || node.innerText || $(node).text() || "";}else{
if(typeof(t)==="function"){
text=t(node, table, cellIndex);} else if(typeof (te=ts.getColumnData( table, t, cellIndex ))==='function'){
text=te(node, table, cellIndex);}else{
text=node.textContent || node.innerText || $(node).text() || "";}}
return $.trim(text);}
function detectParserForColumn(table, rows, rowIndex, cellIndex){
var cur, $node,
i=ts.parsers.length,
node=false,
nodeValue='',
keepLooking=true;
while (nodeValue==='' && keepLooking){
rowIndex++;
if(rows[rowIndex]){
node=rows[rowIndex].cells[cellIndex];
nodeValue=getElementText(table, node, cellIndex);
$node=$(node);
if(table.config.debug){
log('Checking if value was empty on row ' + rowIndex + ', column: ' + cellIndex + ': "' + nodeValue + '"');}}else{
keepLooking=false;}}
while (--i >=0){
cur=ts.parsers[i];
if(cur && cur.id !=='text' && cur.is && cur.is(nodeValue, table, node, $node)){
return cur;}}
return ts.getParserById('text');}
function buildParserCache(table){
var c=table.config,
tb=c.$tbodies=c.$table.children('tbody:not(.' + c.cssInfoBlock + ')'),
rows, list, l, i, h, ch, np, p, e, time,
j=0,
parsersDebug="",
len=tb.length;
if( len===0){
return c.debug?log('Warning: *Empty table!* Not building a parser cache'):'';} else if(c.debug){
time=new Date();
log('Detecting parsers for each column');}
list={
extractors: [],
parsers: []
};
while (j < len){
rows=tb[j].rows;
if(rows[j]){
l=c.columns;
for (i=0; i < l; i++){
h=c.$headers.filter('[data-column="' + i + '"]:last');
ch=ts.getColumnData( table, c.headers, i );
e=ts.getParserById( ts.getData(h, ch,'extractor') );
p=ts.getParserById( ts.getData(h, ch,'sorter') );
np=ts.getData(h, ch,'parser')==='false';
c.empties[i]=( ts.getData(h, ch,'empty') || c.emptyTo || (c.emptyToBottom?'bottom':'top' ) ).toLowerCase();
c.strings[i]=( ts.getData(h, ch,'string') || c.stringTo || 'max' ).toLowerCase();
if(np){
p=ts.getParserById('no-parser');}
if(!e){
e=false;}
if(!p){
p=detectParserForColumn(table, rows, -1, i);}
if(c.debug){
parsersDebug +="column:" + i + "; extractor:" + e.id + "; parser:" + p.id + "; string:" + c.strings[i] + '; empty: ' + c.empties[i] + "\n";}
list.parsers[i]=p;
list.extractors[i]=e;}}
j +=(list.parsers.length)?len:1;}
if(c.debug){
log(parsersDebug?parsersDebug:"No parsers detected");
benchmark("Completed detecting parsers", time);}
c.parsers=list.parsers;
c.extractors=list.extractors;}
function buildCache(table){
var cc, t, tx, v, i, j, k, $row, rows, cols, cacheTime,
totalRows, rowData, colMax,
c=table.config,
$tb=c.$table.children('tbody'),
extractors=c.extractors,
parsers=c.parsers;
c.cache={};
c.totalRows=0;
if(!parsers){
return c.debug?log('Warning: *Empty table!* Not building a cache'):'';}
if(c.debug){
cacheTime=new Date();}
if(c.showProcessing){
ts.isProcessing(table, true);}
for (k=0; k < $tb.length; k++){
colMax=[];
cc=c.cache[k]={
normalized: []
};
if(!$tb.eq(k).hasClass(c.cssInfoBlock)){
totalRows=($tb[k] && $tb[k].rows.length) || 0;
for (i=0; i < totalRows; ++i){
rowData={
child: []
};
$row=$($tb[k].rows[i]);
rows=[ new Array(c.columns) ];
cols=[];
if($row.hasClass(c.cssChildRow) && i !==0){
t=cc.normalized.length - 1;
cc.normalized[t][c.columns].$row=cc.normalized[t][c.columns].$row.add($row);
if(!$row.prev().hasClass(c.cssChildRow)){
$row.prev().addClass(ts.css.cssHasChild);}
rowData.child[t]=$.trim( $row[0].textContent || $row[0].innerText || $row.text() || "" );
continue;}
rowData.$row=$row;
rowData.order=i;
for (j=0; j < c.columns; ++j){
if(typeof parsers[j]==='undefined'){
if(c.debug){
log('No parser found for cell:', $row[0].cells[j],'does it have a header?');}
continue;}
t=getElementText(table, $row[0].cells[j], j);
if(typeof extractors[j].id==='undefined'){
tx=t;}else{
tx=extractors[j].format(t, table, $row[0].cells[j], j);}
v=parsers[j].id==='no-parser'?'':parsers[j].format(tx, table, $row[0].cells[j], j);
cols.push( c.ignoreCase && typeof v==='string'?v.toLowerCase():v );
if((parsers[j].type || '').toLowerCase()==="numeric"){
colMax[j]=Math.max(Math.abs(v) || 0, colMax[j] || 0);}}
cols[c.columns]=rowData;
cc.normalized.push(cols);}
cc.colMax=colMax;
c.totalRows +=cc.normalized.length;}}
if(c.showProcessing){
ts.isProcessing(table);}
if(c.debug){
benchmark("Building cache for " + totalRows + " rows", cacheTime);}}
function appendToTable(table, init){
var c=table.config,
wo=c.widgetOptions,
b=table.tBodies,
rows=[],
cc=c.cache,
n, totalRows, $bk, $tb,
i, k, appendTime;
if(isEmptyObject(cc)){
return c.appender?c.appender(table, rows) :
table.isUpdating?c.$table.trigger("updateComplete", table):'';}
if(c.debug){
appendTime=new Date();}
for (k=0; k < b.length; k++){
$bk=$(b[k]);
if($bk.length && !$bk.hasClass(c.cssInfoBlock)){
$tb=ts.processTbody(table, $bk, true);
n=cc[k].normalized;
totalRows=n.length;
for (i=0; i < totalRows; i++){
rows.push(n[i][c.columns].$row);
if(!c.appender || (c.pager && (!c.pager.removeRows || !wo.pager_removeRows) && !c.pager.ajax)){
$tb.append(n[i][c.columns].$row);}}
ts.processTbody(table, $tb, false);}}
if(c.appender){
c.appender(table, rows);}
if(c.debug){
benchmark("Rebuilt table", appendTime);}
if(!init && !c.appender){ ts.applyWidget(table);}
if(table.isUpdating){
c.$table.trigger("updateComplete", table);}}
function formatSortingOrder(v){
return (/^d/i.test(v) || v===1);}
function buildHeaders(table){
var ch, $t,
h, i, t, lock, time,
c=table.config;
c.headerList=[];
c.headerContent=[];
if(c.debug){
time=new Date();}
c.columns=ts.computeColumnIndex( c.$table.children('thead, tfoot').children('tr') );
i=c.cssIcon?'<i class="' + ( c.cssIcon===ts.css.icon?ts.css.icon:c.cssIcon + ' ' + ts.css.icon ) + '"></i>':'';
c.$headers=$(table).find(c.selectorHeaders).each(function(index){
$t=$(this);
ch=ts.getColumnData( table, c.headers, index, true );
c.headerContent[index]=$(this).html();
if( c.headerTemplate !=='' ){
t=c.headerTemplate.replace(/\{content\}/g, $(this).html()).replace(/\{icon\}/g, i);
if(c.onRenderTemplate){
h=c.onRenderTemplate.apply($t, [index, t]);
if(h && typeof h==='string'){ t=h;}}
$(this).html('<div class="' + ts.css.headerIn + '">' + t + '</div>');}
if(c.onRenderHeader){ c.onRenderHeader.apply($t, [index, c, c.$table]);}
this.column=parseInt( $(this).attr('data-column'), 10);
this.order=formatSortingOrder( ts.getData($t, ch,'sortInitialOrder') || c.sortInitialOrder )?[1,0,2]:[0,1,2];
this.count=-1;
this.lockedOrder=false;
lock=ts.getData($t, ch,'lockedOrder') || false;
if(typeof lock !=='undefined' && lock !==false){
this.order=this.lockedOrder=formatSortingOrder(lock)?[1,1,1]:[0,0,0];}
$t.addClass(ts.css.header + ' ' + c.cssHeader);
c.headerList[index]=this;
$t.parent().addClass(ts.css.headerRow + ' ' + c.cssHeaderRow).attr('role','row');
if(c.tabIndex){ $t.attr("tabindex", 0);}}).attr({
scope: 'col',
role:'columnheader'
});
updateHeader(table);
if(c.debug){
benchmark("Built headers:", time);
log(c.$headers);}}
function commonUpdate(table, resort, callback){
var c=table.config;
c.$table.find(c.selectorRemove).remove();
buildParserCache(table);
buildCache(table);
checkResort(c.$table, resort, callback);}
function updateHeader(table){
var s, $th, col,
c=table.config;
c.$headers.each(function(index, th){
$th=$(th);
col=ts.getColumnData( table, c.headers, index, true );
s=ts.getData( th, col,'sorter' )==='false' || ts.getData( th, col,'parser' )==='false';
th.sortDisabled=s;
$th[ s?'addClass':'removeClass' ]('sorter-false').attr('aria-disabled','' + s);
if(table.id){
if(s){
$th.removeAttr('aria-controls');}else{
$th.attr('aria-controls', table.id);}}});}
function setHeadersCss(table){
var f, i, j,
c=table.config,
list=c.sortList,
len=list.length,
none=ts.css.sortNone + ' ' + c.cssNone,
css=[ts.css.sortAsc + ' ' + c.cssAsc, ts.css.sortDesc + ' ' + c.cssDesc],
cssIcon=[ c.cssIconAsc, c.cssIconDesc, c.cssIconNone ],
aria=['ascending','descending'],
$t=$(table).find('tfoot tr').children().add(c.$extraHeaders).removeClass(css.join(' '));
c.$headers
.removeClass(css.join(' '))
.addClass(none).attr('aria-sort','none')
.find('.' + c.cssIcon)
.removeClass(cssIcon.join(' '))
.addClass(cssIcon[2]);
for (i=0; i < len; i++){
if(list[i][1] !==2){
f=c.$headers.not('.sorter-false').filter('[data-column="' + list[i][0] + '"]' + (len===1?':last':'') );
if(f.length){
for (j=0; j < f.length; j++){
if(!f[j].sortDisabled){
f.eq(j)
.removeClass(none)
.addClass(css[list[i][1]])
.attr('aria-sort', aria[list[i][1]])
.find('.' + c.cssIcon)
.removeClass(cssIcon[2])
.addClass(cssIcon[list[i][1]]);}}
if($t.length){
$t.filter('[data-column="' + list[i][0] + '"]').removeClass(none).addClass(css[list[i][1]]);}}}}
c.$headers.not('.sorter-false').each(function(){
var $this=$(this),
nextSort=this.order[(this.count + 1) % (c.sortReset?3:2)],
txt=$this.text() + ': ' +
ts.language[ $this.hasClass(ts.css.sortAsc)?'sortAsc':$this.hasClass(ts.css.sortDesc)?'sortDesc':'sortNone' ] +
ts.language[ nextSort===0?'nextAsc':nextSort===1?'nextDesc':'nextNone' ];
$this.attr('aria-label', txt );});}
function fixColumnWidth(table){
var colgroup, overallWidth,
c=table.config;
if(c.widthFixed && c.$table.children('colgroup').length===0){
colgroup=$('<colgroup>');
overallWidth=$(table).width();
$(table.tBodies).not('.' + c.cssInfoBlock).find("tr:first").children(":visible").each(function(){
colgroup.append($('<col>').css('width', parseInt(($(this).width()/overallWidth)*1000, 10)/10 + '%'));});
c.$table.prepend(colgroup);}}
function updateHeaderSortCount(table, list){
var s, t, o, col, primary,
c=table.config,
sl=list || c.sortList;
c.sortList=[];
$.each(sl, function(i,v){
col=parseInt(v[0], 10);
o=c.$headers.filter('[data-column="' + col + '"]:last')[0];
if(o){
t=('' + v[1]).match(/^(1|d|s|o|n)/);
t=t?t[0]:'';
switch(t){
case '1': case 'd':
t=1;
break;
case 's':
t=primary || 0;
break;
case 'o':
s=o.order[(primary || 0) % (c.sortReset?3:2)];
t=s===0?1:s===1?0:2;
break;
case 'n':
o.count=o.count + 1;
t=o.order[(o.count) % (c.sortReset?3:2)];
break;
default:
t=0;
break;}
primary=i===0?t:primary;
s=[ col, parseInt(t, 10) || 0 ];
c.sortList.push(s);
t=$.inArray(s[1], o.order);
o.count=t >=0?t:s[1] % (c.sortReset?3:2);}});}
function getCachedSortType(parsers, i){
return (parsers && parsers[i])?parsers[i].type || '':'';}
function initSort(table, cell, event){
if(table.isUpdating){
return setTimeout(function(){ initSort(table, cell, event);}, 50);}
var arry, indx, col, order, s,
c=table.config,
key=!event[c.sortMultiSortKey],
$table=c.$table;
$table.trigger("sortStart", table);
cell.count=event[c.sortResetKey]?2:(cell.count + 1) % (c.sortReset?3:2);
if(c.sortRestart){
indx=cell;
c.$headers.each(function(){
if(this !==indx && (key || !$(this).is('.' + ts.css.sortDesc + ',.' + ts.css.sortAsc))){
this.count=-1;}});}
indx=parseInt( $(cell).attr('data-column'), 10 );
if(key){
c.sortList=[];
if(c.sortForce !==null){
arry=c.sortForce;
for (col=0; col < arry.length; col++){
if(arry[col][0] !==indx){
c.sortList.push(arry[col]);}}}
order=cell.order[cell.count];
if(order < 2){
c.sortList.push([indx, order]);
if(cell.colSpan > 1){
for (col=1; col < cell.colSpan; col++){
c.sortList.push([indx + col, order]);}}}}else{
if(c.sortAppend && c.sortList.length > 1){
for (col=0; col < c.sortAppend.length; col++){
s=ts.isValueInArray(c.sortAppend[col][0], c.sortList);
if(s >=0){
c.sortList.splice(s,1);}}}
if(ts.isValueInArray(indx, c.sortList) >=0){
for (col=0; col < c.sortList.length; col++){
s=c.sortList[col];
order=c.$headers.filter('[data-column="' + s[0] + '"]:last')[0];
if(s[0]===indx){
s[1]=order.order[cell.count];
if(s[1]===2){
c.sortList.splice(col,1);
order.count=-1;}}}}else{
order=cell.order[cell.count];
if(order < 2){
c.sortList.push([indx, order]);
if(cell.colSpan > 1){
for (col=1; col < cell.colSpan; col++){
c.sortList.push([indx + col, order]);}}}}}
if(c.sortAppend !==null){
arry=c.sortAppend;
for (col=0; col < arry.length; col++){
if(arry[col][0] !==indx){
c.sortList.push(arry[col]);}}}
$table.trigger("sortBegin", table);
setTimeout(function(){
setHeadersCss(table);
multisort(table);
appendToTable(table);
$table.trigger("sortEnd", table);}, 1);}
function multisort(table){
var i, k, num, col, sortTime, colMax,
cache, order, sort, x, y,
dir=0,
c=table.config,
cts=c.textSorter || '',
sortList=c.sortList,
l=sortList.length,
bl=table.tBodies.length;
if(c.serverSideSorting || isEmptyObject(c.cache)){
return;}
if(c.debug){ sortTime=new Date();}
for (k=0; k < bl; k++){
colMax=c.cache[k].colMax;
cache=c.cache[k].normalized;
cache.sort(function(a, b){
for (i=0; i < l; i++){
col=sortList[i][0];
order=sortList[i][1];
dir=order===0;
if(c.sortStable && a[col]===b[col] && l===1){
return a[c.columns].order - b[c.columns].order;}
num=/n/i.test(getCachedSortType(c.parsers, col));
if(num && c.strings[col]){
if(typeof (c.string[c.strings[col]])==='boolean'){
num=(dir?1:-1) * (c.string[c.strings[col]]?-1:1);}else{
num=(c.strings[col])?c.string[c.strings[col]] || 0:0;}
sort=c.numberSorter?c.numberSorter(a[col], b[col], dir, colMax[col], table) :
ts[ 'sortNumeric' + (dir?'Asc':'Desc') ](a[col], b[col], num, colMax[col], col, table);}else{
x=dir?a:b;
y=dir?b:a;
if(typeof(cts)==='function'){
sort=cts(x[col], y[col], dir, col, table);} else if(typeof(cts)==='object' && cts.hasOwnProperty(col)){
sort=cts[col](x[col], y[col], dir, col, table);}else{
sort=ts[ 'sortNatural' + (dir?'Asc':'Desc') ](a[col], b[col], col, table, c);}}
if(sort){ return sort;}}
return a[c.columns].order - b[c.columns].order;});}
if(c.debug){ benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time", sortTime);}}
function resortComplete($table, callback){
var table=$table[0];
if(table.isUpdating){
$table.trigger('updateComplete', table);}
if($.isFunction(callback)){
callback($table[0]);}}
function checkResort($table, flag, callback){
var sl=$table[0].config.sortList;
if(flag !==false && !$table[0].isProcessing && sl.length){
$table.trigger("sorton", [sl, function(){
resortComplete($table, callback);}, true]);}else{
resortComplete($table, callback);
ts.applyWidget($table[0], false);}}
function bindMethods(table){
var c=table.config,
$table=c.$table;
$table
.unbind('sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave '.split(' ').join(c.namespace + ' '))
.bind("sortReset" + c.namespace, function(e, callback){
e.stopPropagation();
c.sortList=[];
setHeadersCss(table);
multisort(table);
appendToTable(table);
if($.isFunction(callback)){
callback(table);}})
.bind("updateAll" + c.namespace, function(e, resort, callback){
e.stopPropagation();
table.isUpdating=true;
ts.refreshWidgets(table, true, true);
ts.restoreHeaders(table);
buildHeaders(table);
ts.bindEvents(table, c.$headers, true);
bindMethods(table);
commonUpdate(table, resort, callback);})
.bind("update" + c.namespace + " updateRows" + c.namespace, function(e, resort, callback){
e.stopPropagation();
table.isUpdating=true;
updateHeader(table);
commonUpdate(table, resort, callback);})
.bind("updateCell" + c.namespace, function(e, cell, resort, callback){
e.stopPropagation();
table.isUpdating=true;
$table.find(c.selectorRemove).remove();var v, t, row, icell,
$tb=$table.find('tbody'),
$cell=$(cell),
tbdy=$tb.index( $.fn.closest?$cell.closest('tbody'):$cell.parents('tbody').filter(':first') ),
$row=$.fn.closest?$cell.closest('tr'):$cell.parents('tr').filter(':first');
cell=$cell[0];
if($tb.length && tbdy >=0){
row=$tb.eq(tbdy).find('tr').index( $row );
icell=$cell.index();
c.cache[tbdy].normalized[row][c.columns].$row=$row;
if(typeof c.extractors[icell].id==='undefined'){
t=getElementText(table, cell, icell);}else{
t=c.extractors[icell].format( getElementText(table, cell, icell), table, cell, icell );}
v=c.parsers[icell].id==='no-parser'?'' :
c.parsers[icell].format( t, table, cell, icell );
c.cache[tbdy].normalized[row][icell]=c.ignoreCase && typeof v==='string'?v.toLowerCase():v;
if((c.parsers[icell].type || '').toLowerCase()==="numeric"){
c.cache[tbdy].colMax[icell]=Math.max(Math.abs(v) || 0, c.cache[tbdy].colMax[icell] || 0);}
checkResort($table, resort, callback);}})
.bind("addRows" + c.namespace, function(e, $row, resort, callback){
e.stopPropagation();
table.isUpdating=true;
if(isEmptyObject(c.cache)){
updateHeader(table);
commonUpdate(table, resort, callback);}else{
$row=$($row).attr('role','row');var i, j, l, t, v, rowData, cells,
rows=$row.filter('tr').length,
tbdy=$table.find('tbody').index( $row.parents('tbody').filter(':first') );
if(!(c.parsers && c.parsers.length)){
buildParserCache(table);}
for (i=0; i < rows; i++){
l=$row[i].cells.length;
cells=[];
rowData={
child: [],
$row:$row.eq(i),
order: c.cache[tbdy].normalized.length
};
for (j=0; j < l; j++){
if(typeof c.extractors[j].id==='undefined'){
t=getElementText(table, $row[i].cells[j], j);}else{
t=c.extractors[j].format( getElementText(table, $row[i].cells[j], j), table, $row[i].cells[j], j );}
v=c.parsers[j].id==='no-parser'?'' :
c.parsers[j].format( t, table, $row[i].cells[j], j );
cells[j]=c.ignoreCase && typeof v==='string'?v.toLowerCase():v;
if((c.parsers[j].type || '').toLowerCase()==="numeric"){
c.cache[tbdy].colMax[j]=Math.max(Math.abs(cells[j]) || 0, c.cache[tbdy].colMax[j] || 0);}}
cells.push(rowData);
c.cache[tbdy].normalized.push(cells);}
checkResort($table, resort, callback);}})
.bind("updateComplete" + c.namespace, function(){
table.isUpdating=false;})
.bind("sorton" + c.namespace, function(e, list, callback, init){
var c=table.config;
e.stopPropagation();
$table.trigger("sortStart", this);
updateHeaderSortCount(table, list);
setHeadersCss(table);
if(c.delayInit && isEmptyObject(c.cache)){ buildCache(table);}
$table.trigger("sortBegin", this);
multisort(table);
appendToTable(table, init);
$table.trigger("sortEnd", this);
ts.applyWidget(table);
if($.isFunction(callback)){
callback(table);}})
.bind("appendCache" + c.namespace, function(e, callback, init){
e.stopPropagation();
appendToTable(table, init);
if($.isFunction(callback)){
callback(table);}})
.bind("updateCache" + c.namespace, function(e, callback){
if(!(c.parsers && c.parsers.length)){
buildParserCache(table);}
buildCache(table);
if($.isFunction(callback)){
callback(table);}})
.bind("applyWidgetId" + c.namespace, function(e, id){
e.stopPropagation();
ts.getWidgetById(id).format(table, c, c.widgetOptions);})
.bind("applyWidgets" + c.namespace, function(e, init){
e.stopPropagation();
ts.applyWidget(table, init);})
.bind("refreshWidgets" + c.namespace, function(e, all, dontapply){
e.stopPropagation();
ts.refreshWidgets(table, all, dontapply);})
.bind("destroy" + c.namespace, function(e, c, cb){
e.stopPropagation();
ts.destroy(table, c, cb);})
.bind("resetToLoadState" + c.namespace, function(){
ts.refreshWidgets(table, true, true);
c=$.extend(true, ts.defaults, c.originalSettings);
table.hasInitialized=false;
ts.setup( table, c );});}
ts.construct=function(settings){
return this.each(function(){
var table=this,
c=$.extend(true, {}, ts.defaults, settings);
c.originalSettings=settings;
if(!table.hasInitialized && ts.buildTable && this.tagName !=='TABLE'){
ts.buildTable(table, c);}else{
ts.setup(table, c);}});};
ts.setup=function(table, c){
if(!table || !table.tHead || table.tBodies.length===0 || table.hasInitialized===true){
return c.debug?log('ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized'):'';}
var k='',
$table=$(table),
m=$.metadata;
table.hasInitialized=false;
table.isProcessing=true;
table.config=c;
$.data(table, "tablesorter", c);
if(c.debug){ $.data( table,'startoveralltimer', new Date());}
c.supportsDataObject=(function(version){
version[0]=parseInt(version[0], 10);
return (version[0] > 1) || (version[0]===1 && parseInt(version[1], 10) >=4);})($.fn.jquery.split("."));
c.string={ 'max': 1,'min': -1,'emptymin': 1,'emptymax': -1,'zero': 0,'none': 0,'null': 0,'top': true,'bottom': false };
c.emptyTo=c.emptyTo.toLowerCase();
c.stringTo=c.stringTo.toLowerCase();
if(!/tablesorter\-/.test($table.attr('class'))){
k=(c.theme !==''?' tablesorter-' + c.theme:'');}
c.table=table;
c.$table=$table
.addClass(ts.css.table + ' ' + c.tableClass + k)
.attr('role','grid');
c.$headers=$table.find(c.selectorHeaders);
if(!c.namespace){
c.namespace='.tablesorter' + Math.random().toString(16).slice(2);}else{
c.namespace='.' + c.namespace.replace(/\W/g,'');}
c.$table.children().children('tr').attr('role','row');
c.$tbodies=$table.children('tbody:not(.' + c.cssInfoBlock + ')').attr({
'aria-live':'polite','aria-relevant':'all'
});
if(c.$table.children('caption').length){
k=c.$table.children('caption')[0];
if(!k.id){ k.id=c.namespace.slice(1) + 'caption';}
c.$table.attr('aria-labelledby', k.id);}
c.widgetInit={};
c.textExtraction=c.$table.attr('data-text-extraction') || c.textExtraction || 'basic';
buildHeaders(table);
fixColumnWidth(table);
buildParserCache(table);
c.totalRows=0;
if(!c.delayInit){ buildCache(table);}
ts.bindEvents(table, c.$headers, true);
bindMethods(table);
if(c.supportsDataObject && typeof $table.data().sortlist !=='undefined'){
c.sortList=$table.data().sortlist;} else if(m && ($table.metadata() && $table.metadata().sortlist)){
c.sortList=$table.metadata().sortlist;}
ts.applyWidget(table, true);
if(c.sortList.length > 0){
$table.trigger("sorton", [c.sortList, {}, !c.initWidgets, true]);}else{
setHeadersCss(table);
if(c.initWidgets){
ts.applyWidget(table, false);}}
if(c.showProcessing){
$table
.unbind('sortBegin' + c.namespace + ' sortEnd' + c.namespace)
.bind('sortBegin' + c.namespace + ' sortEnd' + c.namespace, function(e){
clearTimeout(c.processTimer);
ts.isProcessing(table);
if(e.type==='sortBegin'){
c.processTimer=setTimeout(function(){
ts.isProcessing(table, true);}, 500);}});}
table.hasInitialized=true;
table.isProcessing=false;
if(c.debug){
ts.benchmark("Overall initialization time", $.data( table,'startoveralltimer'));}
$table.trigger('tablesorter-initialized', table);
if(typeof c.initialized==='function'){ c.initialized(table);}};
ts.getColumnData=function(table, obj, indx, getCell){
if(typeof obj==='undefined' || obj===null){ return;}
table=$(table)[0];var result, $h, k,
c=table.config;
if(obj[indx]){
return getCell?obj[indx]:obj[c.$headers.index( c.$headers.filter('[data-column="' + indx + '"]:last') )];}
for (k in obj){
if(typeof k==='string'){
$h=c.$headers.filter('[data-column="' + indx + '"]:last')
.filter(k)
.add( c.$headers.filter('[data-column="' + indx + '"]:last').find(k) );
if($h.length){
return obj[k];}}}
return result;};
ts.computeColumnIndex=function(trs){
var matrix=[],
lookup={},
cols=0,
i, j, k, l, $cell, cell, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
for (i=0; i < trs.length; i++){
cells=trs[i].cells;
for (j=0; j < cells.length; j++){
cell=cells[j];
$cell=$(cell);
rowIndex=cell.parentNode.rowIndex;
cellId=rowIndex + "-" + $cell.index();
rowSpan=cell.rowSpan || 1;
colSpan=cell.colSpan || 1;
if(typeof(matrix[rowIndex])==="undefined"){
matrix[rowIndex]=[];}
for (k=0; k < matrix[rowIndex].length + 1; k++){
if(typeof(matrix[rowIndex][k])==="undefined"){
firstAvailCol=k;
break;}}
lookup[cellId]=firstAvailCol;
cols=Math.max(firstAvailCol, cols);
$cell.attr({ 'data-column':firstAvailCol });
for (k=rowIndex; k < rowIndex + rowSpan; k++){
if(typeof(matrix[k])==="undefined"){
matrix[k]=[];}
matrixrow=matrix[k];
for (l=firstAvailCol; l < firstAvailCol + colSpan; l++){
matrixrow[l]="x";}}}}
return cols + 1;};
ts.isProcessing=function(table, toggle, $ths){
table=$(table);var c=table[0].config,
$h=$ths || table.find('.' + ts.css.header);
if(toggle){
if(typeof $ths !=='undefined' && c.sortList.length > 0){
$h=$h.filter(function(){
return this.sortDisabled?false:ts.isValueInArray( parseFloat($(this).attr('data-column')), c.sortList) >=0;});}
table.add($h).addClass(ts.css.processing + ' ' + c.cssProcessing);}else{
table.add($h).removeClass(ts.css.processing + ' ' + c.cssProcessing);}};
ts.processTbody=function(table, $tb, getIt){
table=$(table)[0];var holdr;
if(getIt){
table.isProcessing=true;
$tb.before('<span class="tablesorter-savemyplace"/>');
holdr=($.fn.detach)?$tb.detach():$tb.remove();
return holdr;}
holdr=$(table).find('span.tablesorter-savemyplace');
$tb.insertAfter( holdr );
holdr.remove();
table.isProcessing=false;};
ts.clearTableBody=function(table){
$(table)[0].config.$tbodies.children().detach();};
ts.bindEvents=function(table, $headers, core){
table=$(table)[0];var downTime,
c=table.config;
if(core !==true){
c.$extraHeaders=c.$extraHeaders?c.$extraHeaders.add($headers):$headers;}
$headers
.find(c.selectorSort).add( $headers.filter(c.selectorSort) )
.unbind('mousedown mouseup sort keyup '.split(' ').join(c.namespace + ' '))
.bind('mousedown mouseup sort keyup '.split(' ').join(c.namespace + ' '), function(e, external){
var cell, type=e.type;
if(((e.which || e.button) !==1 && !/sort|keyup/.test(type)) || (type==='keyup' && e.which !==13) ){
return;}
if(type==='mouseup' && external !==true && (new Date().getTime() - downTime > 250)){ return;}
if(type==='mousedown'){
downTime=new Date().getTime();
return /(input|select|button|textarea)/i.test(e.target.tagName) ||
$(e.target).closest('td,th').hasClass(c.cssAllowClicks)?'':!c.cancelSelection;}
if(c.delayInit && isEmptyObject(c.cache)){ buildCache(table);}
cell=$.fn.closest?$(this).closest('th, td')[0]:/TH|TD/.test(this.tagName)?this:$(this).parents('th, td')[0];
cell=c.$headers[ $headers.index( cell ) ];
if(!cell.sortDisabled){
initSort(table, cell, e);}});
if(c.cancelSelection){
$headers
.attr('unselectable','on')
.bind('selectstart', false)
.css({
'user-select': 'none','MozUserSelect': 'none'
});}};
ts.restoreHeaders=function(table){
var c=$(table)[0].config;
c.$table.find(c.selectorHeaders).each(function(i){
if($(this).find('.' + ts.css.headerIn).length){
$(this).html( c.headerContent[i] );}});};
ts.destroy=function(table, removeClasses, callback){
table=$(table)[0];
if(!table.hasInitialized){ return;}
ts.refreshWidgets(table, true, true);var $t=$(table), c=table.config,
$h=$t.find('thead:first'),
$r=$h.find('tr.' + ts.css.headerRow).removeClass(ts.css.headerRow + ' ' + c.cssHeaderRow),
$f=$t.find('tfoot:first > tr').children('th, td');
if(removeClasses===false && $.inArray('uitheme', c.widgets) >=0){
$t.trigger('applyWidgetId', ['uitheme']);
$t.trigger('applyWidgetId', ['zebra']);}
$h.find('tr').not($r).remove();
$t
.removeData('tablesorter')
.unbind('sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState '.split(' ').join(c.namespace + ' '));
c.$headers.add($f)
.removeClass( [ts.css.header, c.cssHeader, c.cssAsc, c.cssDesc, ts.css.sortAsc, ts.css.sortDesc, ts.css.sortNone].join(' ') )
.removeAttr('data-column')
.removeAttr('aria-label')
.attr('aria-disabled','true');
$r.find(c.selectorSort).unbind('mousedown mouseup keypress '.split(' ').join(c.namespace + ' '));
ts.restoreHeaders(table);
$t.toggleClass(ts.css.table + ' ' + c.tableClass + ' tablesorter-' + c.theme, removeClasses===false);
table.hasInitialized=false;
delete table.config.cache;
if(typeof callback==='function'){
callback(table);}};
ts.regex={
chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
chunks: /(^\\0|\\0$)/,
hex: /^0x[0-9a-f]+$/i
};
ts.sortNatural=function(a, b){
if(a===b){ return 0;}
var xN, xD, yN, yD, xF, yF, i, mx,
r=ts.regex;
if(r.hex.test(b)){
xD=parseInt(a.match(r.hex), 16);
yD=parseInt(b.match(r.hex), 16);
if( xD < yD ){ return -1;}
if( xD > yD ){ return 1;}}
xN=a.replace(r.chunk,'\\0$1\\0').replace(r.chunks,'').split('\\0');
yN=b.replace(r.chunk,'\\0$1\\0').replace(r.chunks,'').split('\\0');
mx=Math.max(xN.length, yN.length);
for (i=0; i < mx; i++){
xF=isNaN(xN[i])?xN[i] || 0:parseFloat(xN[i]) || 0;
yF=isNaN(yN[i])?yN[i] || 0:parseFloat(yN[i]) || 0;
if(isNaN(xF) !==isNaN(yF)){ return (isNaN(xF))?1:-1;}
if(typeof xF !==typeof yF){
xF +='';
yF +='';}
if(xF < yF){ return -1;}
if(xF > yF){ return 1;}}
return 0;};
ts.sortNaturalAsc=function(a, b, col, table, c){
if(a===b){ return 0;}
var e=c.string[ (c.empties[col] || c.emptyTo ) ];
if(a==='' && e !==0){ return typeof e==='boolean'?(e?-1:1):-e || -1;}
if(b==='' && e !==0){ return typeof e==='boolean'?(e?1:-1):e || 1;}
return ts.sortNatural(a, b);};
ts.sortNaturalDesc=function(a, b, col, table, c){
if(a===b){ return 0;}
var e=c.string[ (c.empties[col] || c.emptyTo ) ];
if(a==='' && e !==0){ return typeof e==='boolean'?(e?-1:1):e || 1;}
if(b==='' && e !==0){ return typeof e==='boolean'?(e?1:-1):-e || -1;}
return ts.sortNatural(b, a);};
ts.sortText=function(a, b){
return a > b?1:(a < b?-1:0);};
ts.getTextValue=function(a, num, mx){
if(mx){
var i, l=a?a.length:0, n=mx + num;
for (i=0; i < l; i++){
n +=a.charCodeAt(i);}
return num * n;}
return 0;};
ts.sortNumericAsc=function(a, b, num, mx, col, table){
if(a===b){ return 0;}
var c=table.config,
e=c.string[ (c.empties[col] || c.emptyTo ) ];
if(a==='' && e !==0){ return typeof e==='boolean'?(e?-1:1):-e || -1;}
if(b==='' && e !==0){ return typeof e==='boolean'?(e?1:-1):e || 1;}
if(isNaN(a)){ a=ts.getTextValue(a, num, mx);}
if(isNaN(b)){ b=ts.getTextValue(b, num, mx);}
return a - b;};
ts.sortNumericDesc=function(a, b, num, mx, col, table){
if(a===b){ return 0;}
var c=table.config,
e=c.string[ (c.empties[col] || c.emptyTo ) ];
if(a==='' && e !==0){ return typeof e==='boolean'?(e?-1:1):e || 1;}
if(b==='' && e !==0){ return typeof e==='boolean'?(e?1:-1):-e || -1;}
if(isNaN(a)){ a=ts.getTextValue(a, num, mx);}
if(isNaN(b)){ b=ts.getTextValue(b, num, mx);}
return b - a;};
ts.sortNumeric=function(a, b){
return a - b;};
ts.characterEquivalents={
"a":"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",
"A":"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",
"c":"\u00e7\u0107\u010d",
"C":"\u00c7\u0106\u010c",
"e":"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",
"E":"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",
"i":"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",
"I":"\u00cd\u00cc\u0130\u00ce\u00cf",
"o":"\u00f3\u00f2\u00f4\u00f5\u00f6",
"O":"\u00d3\u00d2\u00d4\u00d5\u00d6",
"ss": "\u00df",
"SS": "\u1e9e",
"u":"\u00fa\u00f9\u00fb\u00fc\u016f",
"U":"\u00da\u00d9\u00db\u00dc\u016e"
};
ts.replaceAccents=function(s){
var a, acc='[', eq=ts.characterEquivalents;
if(!ts.characterRegex){
ts.characterRegexArray={};
for (a in eq){
if(typeof a==='string'){
acc +=eq[a];
ts.characterRegexArray[a]=new RegExp('[' + eq[a] + ']','g');}}
ts.characterRegex=new RegExp(acc + ']');}
if(ts.characterRegex.test(s)){
for (a in eq){
if(typeof a==='string'){
s=s.replace( ts.characterRegexArray[a], a );}}}
return s;};
ts.isValueInArray=function(column, arry){
var indx, len=arry.length;
for (indx=0; indx < len; indx++){
if(arry[indx][0]===column){
return indx;}}
return -1;};
ts.addParser=function(parser){
var i, l=ts.parsers.length, a=true;
for (i=0; i < l; i++){
if(ts.parsers[i].id.toLowerCase()===parser.id.toLowerCase()){
a=false;}}
if(a){
ts.parsers.push(parser);}};
ts.getParserById=function(name){
if(name=='false'){ return false;}
var i, l=ts.parsers.length;
for (i=0; i < l; i++){
if(ts.parsers[i].id.toLowerCase()===(name.toString()).toLowerCase()){
return ts.parsers[i];}}
return false;};
ts.addWidget=function(widget){
ts.widgets.push(widget);};
ts.hasWidget=function(table, name){
table=$(table);
return table.length && table[0].config && table[0].config.widgetInit[name] || false;};
ts.getWidgetById=function(name){
var i, w, l=ts.widgets.length;
for (i=0; i < l; i++){
w=ts.widgets[i];
if(w && w.hasOwnProperty('id') && w.id.toLowerCase()===name.toLowerCase()){
return w;}}};
ts.applyWidget=function(table, init){
table=$(table)[0];var c=table.config,
wo=c.widgetOptions,
tableClass=' ' + c.table.className + ' ',
widgets=[],
time, time2, w, wd;
if(init !==false && table.hasInitialized && (table.isApplyingWidgets || table.isUpdating)){ return;}
if(c.debug){ time=new Date();}
wd=new RegExp( '\\s' + c.widgetClass.replace( /\{name\}/i,'([\\w-]+)' )+ '\\s','g' );
if( tableClass.match( wd ) ){
w=tableClass.match( wd );
if( w ){
$.each( w, function( i,n ){
c.widgets.push( n.replace( wd,'$1' ) );});}}
if(c.widgets.length){
table.isApplyingWidgets=true;
c.widgets=$.grep(c.widgets, function(v, k){
return $.inArray(v, c.widgets)===k;});
$.each(c.widgets || [], function(i,n){
wd=ts.getWidgetById(n);
if(wd && wd.id){
if(!wd.priority){ wd.priority=10;}
widgets[i]=wd;}});
widgets.sort(function(a, b){
return a.priority < b.priority?-1:a.priority===b.priority?0:1;});
$.each(widgets, function(i,w){
if(w){
if(init || !(c.widgetInit[w.id])){
c.widgetInit[w.id]=true;
if(w.hasOwnProperty('options')){
wo=table.config.widgetOptions=$.extend( true, {}, w.options, wo );}
if(w.hasOwnProperty('init')){
if(c.debug){ time2=new Date();}
w.init(table, w, c, wo);
if(c.debug){ ts.benchmark('Initializing ' + w.id + ' widget', time2);}}}
if(!init && w.hasOwnProperty('format')){
if(c.debug){ time2=new Date();}
w.format(table, c, wo, false);
if(c.debug){ ts.benchmark(( init?'Initializing ':'Applying ' ) + w.id + ' widget', time2);}}}});}
setTimeout(function(){
table.isApplyingWidgets=false;
$.data(table,'lastWidgetApplication', new Date());}, 0);
if(c.debug){
w=c.widgets.length;
benchmark("Completed " + (init===true?"initializing ":"applying ") + w + " widget" + (w !==1?"s":""), time);}};
ts.refreshWidgets=function(table, doAll, dontapply){
table=$(table)[0];var i, c=table.config,
cw=c.widgets,
w=ts.widgets, l=w.length;
for (i=0; i < l; i++){
if( w[i] && w[i].id && (doAll || $.inArray( w[i].id, cw ) < 0) ){
if(c.debug){ log( 'Refeshing widgets: Removing "' + w[i].id + '"' );}
if(w[i].hasOwnProperty('remove') && c.widgetInit[w[i].id]){
w[i].remove(table, c, c.widgetOptions);
c.widgetInit[w[i].id]=false;}}}
if(dontapply !==true){
ts.applyWidget(table, doAll);}};
ts.getData=function(h, ch, key){
var val='', $h=$(h), m, cl;
if(!$h.length){ return '';}
m=$.metadata?$h.metadata():false;
cl=' ' + ($h.attr('class') || '');
if(typeof $h.data(key) !=='undefined' || typeof $h.data(key.toLowerCase()) !=='undefined'){
val +=$h.data(key) || $h.data(key.toLowerCase());} else if(m && typeof m[key] !=='undefined'){
val +=m[key];} else if(ch && typeof ch[key] !=='undefined'){
val +=ch[key];} else if(cl !==' ' && cl.match(' ' + key + '-')){
val=cl.match( new RegExp('\\s' + key + '-([\\w-]+)') )[1] || '';}
return $.trim(val);};
ts.formatFloat=function(s, table){
if(typeof s !=='string' || s===''){ return s;}
var i,
t=table && table.config?table.config.usNumberFormat !==false :
typeof table !=="undefined"?table:true;
if(t){
s=s.replace(/,/g,'');}else{
s=s.replace(/[\s|\.]/g,'').replace(/,/g,'.');}
if(/^\s*\([.\d]+\)/.test(s)){
s=s.replace(/^\s*\(([.\d]+)\)/,'-$1');}
i=parseFloat(s);
return isNaN(i)?$.trim(s):i;};
ts.isDigit=function(s){
return isNaN(s)?(/^[\-+(]?\d+[)]?$/).test(s.toString().replace(/[,.'"\s]/g,'')):true;};}()
});var ts=$.tablesorter;
$.fn.extend({
tablesorter: ts.construct
});
ts.addParser({
id: 'no-parser',
is: function(){
return false;},
format: function(){
return '';},
type: 'text'
});
ts.addParser({
id: "text",
is: function(){
return true;},
format: function(s, table){
var c=table.config;
if(s){
s=$.trim( c.ignoreCase?s.toLocaleLowerCase():s );
s=c.sortLocaleCompare?ts.replaceAccents(s):s;}
return s;},
type: "text"
});
ts.addParser({
id: "digit",
is: function(s){
return ts.isDigit(s);},
format: function(s, table){
var n=ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
return s && typeof n==='number'?n:s?$.trim( s && table.config.ignoreCase?s.toLocaleLowerCase():s ):s;},
type: "numeric"
});
ts.addParser({
id: "currency",
is: function(s){
return (/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/).test((s || '').replace(/[+\-,. ]/g,''));},
format: function(s, table){
var n=ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
return s && typeof n==='number'?n:s?$.trim( s && table.config.ignoreCase?s.toLocaleLowerCase():s ):s;},
type: "numeric"
});
ts.addParser({
id: "url",
is: function(s){
return (/^(https?|ftp|file):\/\//).test(s);},
format: function(s){
return s?$.trim(s.replace(/(https?|ftp|file):\/\//,'')):s;},
parsed:true,
type: "text"
});
ts.addParser({
id: "isoDate",
is: function(s){
return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/).test(s);},
format: function(s, table){
var date=s?new Date( s.replace(/-/g, "/") ):s;
return date instanceof Date && isFinite(date)?date.getTime():s;},
type: "numeric"
});
ts.addParser({
id: "percent",
is: function(s){
return (/(\d\s*?%|%\s*?\d)/).test(s) && s.length < 15;},
format: function(s, table){
return s?ts.formatFloat(s.replace(/%/g, ""), table):s;},
type: "numeric"
});
ts.addParser({
id: "image",
is: function(s, table, node, $node){
return $node.find('img').length > 0;},
format: function(s, table, cell){
return $(cell).find('img').attr(table.config.imgAttr || 'alt') || s;},
parsed:true,
type: "text"
});
ts.addParser({
id: "usLongDate",
is: function(s){
return (/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i).test(s) || (/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i).test(s);},
format: function(s, table){
var date=s?new Date( s.replace(/(\S)([AP]M)$/i, "$1 $2") ):s;
return date instanceof Date && isFinite(date)?date.getTime():s;},
type: "numeric"
});
ts.addParser({
id: "shortDate",
is: function(s){
return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/).test((s || '').replace(/\s+/g," ").replace(/[\-.,]/g, "/"));},
format: function(s, table, cell, cellIndex){
if(s){
var date, d,
c=table.config,
ci=c.$headers.filter('[data-column=' + cellIndex + ']:last'),
format=ci.length && ci[0].dateFormat || ts.getData( ci, ts.getColumnData( table, c.headers, cellIndex ),'dateFormat') || c.dateFormat;
d=s.replace(/\s+/g," ").replace(/[\-.,]/g, "/");
if(format==="mmddyyyy"){
d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");} else if(format==="ddmmyyyy"){
d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");} else if(format==="yyyymmdd"){
d=d.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");}
date=new Date(d);
return date instanceof Date && isFinite(date)?date.getTime():s;}
return s;},
type: "numeric"
});
ts.addParser({
id: "time",
is: function(s){
return (/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i).test(s);},
format: function(s, table){
var date=s?new Date( "2000/01/01 " + s.replace(/(\S)([AP]M)$/i, "$1 $2") ):s;
return date instanceof Date && isFinite(date)?date.getTime():s;},
type: "numeric"
});
ts.addParser({
id: "metadata",
is: function(){
return false;},
format: function(s, table, cell){
var c=table.config,
p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;
return $(cell).metadata()[p];},
type: "numeric"
});
ts.addWidget({
id: "zebra",
priority: 90,
format: function(table, c, wo){
var $tb, $tv, $tr, row, even, time, k,
child=new RegExp(c.cssChildRow,'i'),
b=c.$tbodies;
if(c.debug){
time=new Date();}
for (k=0; k < b.length; k++ ){
row=0;
$tb=b.eq(k);
$tv=$tb.children('tr:visible').not(c.selectorRemove);
$tv.each(function(){
$tr=$(this);
if(!child.test(this.className)){ row++;}
even=(row % 2===0);
$tr.removeClass(wo.zebra[even?1:0]).addClass(wo.zebra[even?0:1]);});}},
remove: function(table, c, wo){
var k, $tb,
b=c.$tbodies,
rmv=(wo.zebra || [ "even", "odd" ]).join(' ');
for (k=0; k < b.length; k++ ){
$tb=ts.processTbody(table, b.eq(k), true);
$tb.children().removeClass(rmv);
ts.processTbody(table, $tb, false);}}});})(jQuery);