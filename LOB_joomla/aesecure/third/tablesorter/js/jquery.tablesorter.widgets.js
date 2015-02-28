// @file : /third/tablesorter/js/jquery.tablesorter.widgets.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function ($, window){
"use strict";var ts=$.tablesorter=$.tablesorter || {};
ts.themes={
"bootstrap":{
table     :'table table-bordered table-striped',
caption   :'caption',
header    :'bootstrap-header',
footerRow :'',
footerCells: '',
icons     :'',
sortNone  :'bootstrap-icon-unsorted',
sortAsc   :'icon-chevron-up glyphicon glyphicon-chevron-up',
sortDesc  :'icon-chevron-down glyphicon glyphicon-chevron-down',
active    :'',
hover     :'',
filterRow :'',
even      :'',
odd       :''
},
"jui":{
table     :'ui-widget ui-widget-content ui-corner-all',
caption   :'ui-widget-content',
header    :'ui-widget-header ui-corner-all ui-state-default',
footerRow :'',
footerCells: '',
icons     :'ui-icon',
sortNone  :'ui-icon-carat-2-n-s',
sortAsc   :'ui-icon-carat-1-n',
sortDesc  :'ui-icon-carat-1-s',
active    :'ui-state-active',
hover     :'ui-state-hover',
filterRow :'',
even      :'ui-widget-content',
odd       :'ui-state-default'
}};
$.extend(ts.css, {
filterRow:'tablesorter-filter-row',
filter   :'tablesorter-filter',
wrapper  :'tablesorter-wrapper',
resizer  :'tablesorter-resizer',
sticky   :'tablesorter-stickyHeader',
stickyVis:'tablesorter-sticky-visible',
stickyWrap: 'tablesorter-sticky-wrapper'
});
ts.storage=function(table, key, value, options){
table=$(table)[0];var cookieIndex, cookies, date,
hasLocalStorage=false,
values={},
c=table.config,
$table=$(table),
id=options && options.id || $table.attr(options && options.group ||
'data-table-group') || table.id || $('.tablesorter').index( $table ),
url=options && options.url || $table.attr(options && options.page ||
'data-table-page') || c && c.fixedUrl || window.location.pathname;
if("localStorage" in window){
try {
window.localStorage.setItem('_tmptest','temp');
hasLocalStorage=true;
window.localStorage.removeItem('_tmptest');} catch(error){}}
if($.parseJSON){
if(hasLocalStorage){
values=$.parseJSON(localStorage[key] || '{}');}else{
cookies=document.cookie.split(/[;\s|=]/);
cookieIndex=$.inArray(key, cookies) + 1;
values=(cookieIndex !==0)?$.parseJSON(cookies[cookieIndex] || '{}'):{};}}
if((value || value==='') && window.JSON && JSON.hasOwnProperty('stringify')){
if(!values[url]){
values[url]={};}
values[url][id]=value;
if(hasLocalStorage){
localStorage[key]=JSON.stringify(values);}else{
date=new Date();
date.setTime(date.getTime() + (31536e+6));
document.cookie=key + '=' + (JSON.stringify(values)).replace(/\"/g,'\"') + '; expires=' + date.toGMTString() + '; path=/';}}else{
return values && values[url]?values[url][id]:'';}};
ts.addHeaderResizeEvent=function(table, disable, settings){
table=$(table)[0];var headers,
defaults={
timer:250
},
options=$.extend({}, defaults, settings),
c=table.config,
wo=c.widgetOptions,
checkSizes=function(triggerEvent){
wo.resize_flag=true;
headers=[];
c.$headers.each(function(){
var $header=$(this),
sizes=$header.data('savedSizes') || [0,0],
width=this.offsetWidth,
height=this.offsetHeight;
if(width !==sizes[0] || height !==sizes[1]){
$header.data('savedSizes', [ width, height ]);
headers.push(this);}});
if(headers.length && triggerEvent !==false){
c.$table.trigger('resize', [ headers ]);}
wo.resize_flag=false;};
checkSizes(false);
clearInterval(wo.resize_timer);
if(disable){
wo.resize_flag=false;
return false;}
wo.resize_timer=setInterval(function(){
if(wo.resize_flag){ return;}
checkSizes();}, options.timer);};
ts.addWidget({
id: "uitheme",
priority: 10,
format: function(table, c, wo){
var i, time, classes, $header, $icon, $tfoot, $h, oldtheme, oldremove,
themesAll=ts.themes,
$table=c.$table,
$headers=c.$headers,
theme=c.theme || 'jui',
themes=themesAll[theme] || themesAll.jui,
remove=[ themes.sortNone, themes.sortDesc, themes.sortAsc, themes.active ].join( ' ' );
if(c.debug){ time=new Date();}
if(!$table.hasClass('tablesorter-' + theme) || c.theme !==c.appliedTheme || !table.hasInitialized){
oldtheme=themes[c.appliedTheme] || {};
oldremove=oldtheme?[ oldtheme.sortNone, oldtheme.sortDesc, oldtheme.sortAsc, oldtheme.active ].join( ' ' ):'';
if(oldtheme){
wo.zebra[0]=wo.zebra[0].replace(' ' + oldtheme.even,'');
wo.zebra[1]=wo.zebra[1].replace(' ' + oldtheme.odd,'');}
if(themes.even !==''){ wo.zebra[0] +=' ' + themes.even;}
if(themes.odd !==''){ wo.zebra[1] +=' ' + themes.odd;}
$table.children('caption').removeClass(oldtheme.caption).addClass(themes.caption);
$tfoot=$table
.removeClass( c.appliedTheme?'tablesorter-' + ( c.appliedTheme || '' ):'' )
.addClass('tablesorter-' + theme + ' ' + themes.table)
.children('tfoot');
if($tfoot.length){
$tfoot
.children('tr').removeClass(oldtheme.footerRow || '').addClass(themes.footerRow)
.children('th, td').removeClass(oldtheme.footerCells || '').addClass(themes.footerCells);}
$headers
.add(c.$extraHeaders)
.removeClass(oldtheme.header + ' ' + oldtheme.hover + ' ' + oldremove)
.addClass(themes.header)
.not('.sorter-false')
.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event){
$(this)[ event.type==='mouseenter'?'addClass':'removeClass' ](themes.hover);});
if(!$headers.find('.' + ts.css.wrapper).length){
$headers.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');}
if(c.cssIcon){
$headers.find('.' + ts.css.icon).removeClass(oldtheme.icons + ' ' + oldremove).addClass(themes.icons);}
if($table.hasClass('hasFilters')){
$table.children('thead').children('.' + ts.css.filterRow).removeClass(oldtheme.filterRow).addClass(themes.filterRow);}
c.appliedTheme=c.theme;}
for (i=0; i < c.columns; i++){
$header=c.$headers.add(c.$extraHeaders).not('.sorter-false').filter('[data-column="' + i + '"]');
$icon=(ts.css.icon)?$header.find('.' + ts.css.icon):$header;
$h=$headers.not('.sorter-false').filter('[data-column="' + i + '"]:last');
if($h.length){
if($h[0].sortDisabled){
$header.removeClass(remove);
$icon.removeClass(remove + ' ' + themes.icons);}else{
classes=($header.hasClass(ts.css.sortAsc)) ?
themes.sortAsc :
($header.hasClass(ts.css.sortDesc))?themes.sortDesc :
$header.hasClass(ts.css.header)?themes.sortNone:'';
$header[classes===themes.sortNone?'removeClass':'addClass'](themes.active);
$icon.removeClass(remove).addClass(classes);}}}
if(c.debug){
ts.benchmark("Applying " + theme + " theme", time);}},
remove: function(table, c){
var $table=c.$table,
theme=c.theme || 'jui',
themes=ts.themes[ theme ] || ts.themes.jui,
$headers=$table.children('thead').children(),
remove=themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc;
$table
.removeClass('tablesorter-' + theme + ' ' + themes.table)
.find(ts.css.header).removeClass(themes.header);
$headers
.unbind('mouseenter.tsuitheme mouseleave.tsuitheme')
.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
.find('.' + ts.css.filterRow)
.removeClass(themes.filterRow);
$headers.find('.' + ts.css.icon).removeClass(themes.icons);}});
ts.addWidget({
id: "columns",
priority: 30,
options:{
columns:[ "primary", "secondary", "tertiary" ]
},
format: function(table, c, wo){
var $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
$table=c.$table,
$tbodies=c.$tbodies,
sortList=c.sortList,
len=sortList.length,
css=wo && wo.columns || [ "primary", "secondary", "tertiary" ],
last=css.length - 1;
remove=css.join(' ');
for (tbodyIndex=0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
$tbody=ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
$rows=$tbody.children('tr');
$rows.each(function(){
$row=$(this);
if(this.style.display !=='none'){
$cells=$row.children().removeClass(remove);
if(sortList && sortList[0]){
$cells.eq(sortList[0][0]).addClass(css[0]);
if(len > 1){
for (indx=1; indx < len; indx++){
$cells.eq(sortList[indx][0]).addClass( css[indx] || css[last] );}}}}});
ts.processTbody(table, $tbody, false);}
rows=wo.columns_thead !==false?['thead tr']:[];
if(wo.columns_tfoot !==false){
rows.push('tfoot tr');}
if(rows.length){
$rows=$table.find( rows.join(',') ).children().removeClass(remove);
if(len){
for (indx=0; indx < len; indx++){
$rows.filter('[data-column="' + sortList[indx][0] + '"]').addClass(css[indx] || css[last]);}}}},
remove: function(table, c, wo){
var tbodyIndex, $tbody,
$tbodies=c.$tbodies,
remove=(wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
c.$headers.removeClass(remove);
c.$table.children('tfoot').children('tr').children('th, td').removeClass(remove);
for (tbodyIndex=0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
$tbody=ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
$tbody.children('tr').each(function(){
$(this).children().removeClass(remove);});
ts.processTbody(table, $tbody, false);}}});
ts.addWidget({
id: "filter",
priority: 50,
options:{
filter_childRows    :false,
filter_columnFilters:true,
filter_cellFilter   :'',
filter_cssFilter    :'',
filter_defaultFilter:{},
filter_excludeFilter:{},
filter_external     :'',
filter_filteredRow  :'filtered',
filter_formatter    :null,
filter_functions    :null,
filter_hideEmpty    :true,
filter_hideFilters  :false,
filter_ignoreCase   :true,
filter_liveSearch   :true,
filter_onlyAvail    :'filter-onlyAvail',
filter_placeholder  :{ search:'', select:'' },
filter_reset        :null,
filter_saveFilters  :false,
filter_searchDelay  :300,
filter_searchFiltered: true,
filter_selectSource :null,
filter_startsWith   :false,
filter_useParsedData:false,
filter_serversideFiltering:false,
filter_defaultAttrib:'data-value',
filter_selectSourceSeparator:'|'
},
format: function(table, c, wo){
if(!c.$table.hasClass('hasFilters')){
ts.filter.init(table, c, wo);}},
remove: function(table, c, wo){
var tbodyIndex, $tbody,
$table=c.$table,
$tbodies=c.$tbodies;
$table
.removeClass('hasFilters')
.unbind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '))
.find('.' + ts.css.filterRow).remove();
for (tbodyIndex=0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
$tbody=ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
$tbody.children().removeClass(wo.filter_filteredRow).show();
ts.processTbody(table, $tbody, false);}
if(wo.filter_reset){
$(document).undelegate(wo.filter_reset,'click.tsfilter');}}});
ts.filter={
regex: {
regex    :/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,
child    :/tablesorter-childRow/,
filtered :/filtered/,
type     :/undefined|number/,
exact    :/(^[\"\'=]+)|([\"\'=]+$)/g,
nondigit :/[^\w,. \-()]/g,
operators:/[<>=]/g,
query    :'(q|query)'
},
types: {
regex: function( c, data ){
if( ts.filter.regex.regex.test(data.iFilter) ){
var matches,
regex=ts.filter.regex.regex.exec(data.iFilter);
try {
matches=new RegExp(regex[1], regex[2]).test( data.iExact );} catch (error){
matches=false;}
return matches;}
return null;},
operators: function( c, data ){
if( /^[<>]=?/.test(data.iFilter) ){
var cachedValue, result,
table=c.table,
index=data.index,
parsed=data.parsed[index],
query=ts.formatFloat( data.iFilter.replace(ts.filter.regex.operators,''), table ),
parser=c.parsers[index],
savedSearch=query;
if(parsed || parser.type==='numeric'){
result=ts.filter.parseFilter(c, $.trim('' + data.iFilter.replace(ts.filter.regex.operators,'')), index, parsed, true);
query=( typeof result==="number" && result !=='' && !isNaN(result) )?result:query;}
cachedValue=( parsed || parser.type==='numeric' ) && !isNaN(query) && typeof data.cache !=='undefined'?data.cache :
isNaN(data.iExact)?ts.formatFloat( data.iExact.replace(ts.filter.regex.nondigit,''), table) :
ts.formatFloat( data.iExact, table );
if( />/.test(data.iFilter) ){ result=/>=/.test(data.iFilter)?cachedValue >=query:cachedValue > query;}
if( /</.test(data.iFilter) ){ result=/<=/.test(data.iFilter)?cachedValue <=query:cachedValue < query;}
if( !result && savedSearch==='' ){ result=true;}
return result;}
return null;},
notMatch: function( c, data ){
if( /^\!/.test(data.iFilter) ){
var indx,
filter=ts.filter.parseFilter(c, data.iFilter.replace('!',''), data.index, data.parsed[data.index]);
if(ts.filter.regex.exact.test(filter)){
filter=filter.replace(ts.filter.regex.exact,'');
return filter===''?true:$.trim(filter) !==data.iExact;}else{
indx=data.iExact.search( $.trim(filter) );
return filter===''?true:!(c.widgetOptions.filter_startsWith?indx===0:indx >=0);}}
return null;},
exact: function( c, data ){
if(ts.filter.regex.exact.test(data.iFilter)){
var filter=ts.filter.parseFilter(c, data.iFilter.replace(ts.filter.regex.exact,''), data.index, data.parsed[data.index]);
return data.anyMatch?$.inArray(filter, data.rowArray) >=0:filter==data.iExact;}
return null;},
and:function( c, data ){
if( ts.filter.regex.andTest.test(data.filter) ){
var index=data.index,
parsed=data.parsed[index],
query=data.iFilter.split( ts.filter.regex.andSplit ),
result=data.iExact.search( $.trim( ts.filter.parseFilter(c, query[0], index, parsed) ) ) >=0,
indx=query.length - 1;
while (result && indx){
result=result && data.iExact.search( $.trim( ts.filter.parseFilter(c, query[indx], index, parsed) ) ) >=0;
indx--;}
return result;}
return null;},
range:function( c, data ){
if( ts.filter.regex.toTest.test(data.iFilter) ){
var result, tmp,
table=c.table,
index=data.index,
parsed=data.parsed[index],
query=data.iFilter.split( ts.filter.regex.toSplit ),
range1=ts.formatFloat( ts.filter.parseFilter(c, query[0].replace(ts.filter.regex.nondigit,''), index, parsed), table ),
range2=ts.formatFloat( ts.filter.parseFilter(c, query[1].replace(ts.filter.regex.nondigit,''), index, parsed), table );
if(parsed || c.parsers[index].type==='numeric'){
result=c.parsers[index].format('' + query[0], table, c.$headers.eq(index), index);
range1=(result !=='' && !isNaN(result))?result:range1;
result=c.parsers[index].format('' + query[1], table, c.$headers.eq(index), index);
range2=(result !=='' && !isNaN(result))?result:range2;}
result=( parsed || c.parsers[index].type==='numeric' ) && !isNaN(range1) && !isNaN(range2)?data.cache :
isNaN(data.iExact)?ts.formatFloat( data.iExact.replace(ts.filter.regex.nondigit,''), table) :
ts.formatFloat( data.iExact, table );
if(range1 > range2){ tmp=range1; range1=range2; range2=tmp;}
return (result >=range1 && result <=range2) || (range1==='' || range2==='');}
return null;},
wild:function( c, data ){
if( /[\?\*\|]/.test(data.iFilter) || ts.filter.regex.orReplace.test(data.filter) ){
var index=data.index,
parsed=data.parsed[index],
query=ts.filter.parseFilter(c, data.iFilter.replace(ts.filter.regex.orReplace, "|"), index, parsed);
if(!c.$headers.filter('[data-column="' + index + '"]:last').hasClass('filter-match') && /\|/.test(query)){
if(query[ query.length - 1 ]==='|'){ query +='*';}
query=data.anyMatch && $.isArray(data.rowArray)?'(' + query + ')':'^(' + query + ')$';}
return new RegExp( query.replace(/\?/g,'\\S{1}').replace(/\*/g,'\\S*') ).test(data.iExact);}
return null;},
fuzzy: function( c, data ){
if( /^~/.test(data.iFilter) ){
var indx,
patternIndx=0,
len=data.iExact.length,
pattern=ts.filter.parseFilter(c, data.iFilter.slice(1), data.index, data.parsed[data.index]);
for (indx=0; indx < len; indx++){
if(data.iExact[indx]===pattern[patternIndx]){
patternIndx +=1;}}
if(patternIndx===pattern.length){
return true;}
return false;}
return null;}},
init: function(table, c, wo){
ts.language=$.extend(true, {}, {
to :'to',
or :'or',
and:'and'
}, ts.language);var options, string, txt, $header, column, filters, val, fxn, noSelect,
regex=ts.filter.regex;
c.$table.addClass('hasFilters');
wo.searchTimer=null;
wo.filter_initTimer=null;
wo.filter_formatterCount=0;
wo.filter_formatterInit=[];
wo.filter_anyColumnSelector='[data-column="all"],[data-column="any"]';
wo.filter_multipleColumnSelector='[data-column*="-"],[data-column*=","]';
txt='\\{' + ts.filter.regex.query + '\\}';
$.extend( regex, {
child:new RegExp(c.cssChildRow),
filtered:new RegExp(wo.filter_filteredRow),
alreadyFiltered:new RegExp('(\\s+(' + ts.language.or + '|-|' + ts.language.to + ')\\s+)','i'),
toTest:new RegExp('\\s+(-|' + ts.language.to + ')\\s+','i'),
toSplit:new RegExp('(?:\\s+(?:-|' + ts.language.to + ')\\s+)' ,'gi'),
andTest:new RegExp('\\s+(' + ts.language.and + '|&&)\\s+','i'),
andSplit:new RegExp('(?:\\s+(?:' + ts.language.and + '|&&)\\s+)','gi'),
orReplace:new RegExp('\\s+(' + ts.language.or + ')\\s+','gi'),
iQuery:new RegExp(txt,'i'),
igQuery:new RegExp(txt,'ig')
});
if(wo.filter_columnFilters !==false && c.$headers.filter('.filter-false, .parser-false').length !==c.$headers.length){
ts.filter.buildRow(table, c, wo);}
c.$table.bind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '), function(event, filter){
c.$table.find('.' + ts.css.filterRow).toggle( !(wo.filter_hideEmpty && $.isEmptyObject(c.cache) && !(c.delayInit && event.type==='appendCache')) );
if( !/(search|filter)/.test(event.type) ){
event.stopPropagation();
ts.filter.buildDefault(table, true);}
if(event.type==='filterReset'){
c.$table.find('.' + ts.css.filter).add(wo.filter_$externalFilters).val('');
ts.filter.searching(table, []);} else if(event.type==='filterEnd'){
ts.filter.buildDefault(table, true);}else{
filter=event.type==='search'?filter:event.type==='updateComplete'?c.$table.data('lastSearch'):'';
if(/(update|add)/.test(event.type) && event.type !=="updateComplete"){
c.lastCombinedFilter=null;
c.lastSearch=[];}
ts.filter.searching(table, filter, true);}
return false;});
if(wo.filter_reset){
if(wo.filter_reset instanceof $){
wo.filter_reset.click(function(){
c.$table.trigger('filterReset');});} else if($(wo.filter_reset).length){
$(document)
.undelegate(wo.filter_reset,'click.tsfilter')
.delegate(wo.filter_reset,'click.tsfilter', function(){
c.$table.trigger('filterReset');});}}
if(wo.filter_functions){
for (column=0; column < c.columns; column++){
fxn=ts.getColumnData( table, wo.filter_functions, column );
if(fxn){
$header=c.$headers.filter('[data-column="' + column + '"]:last').removeClass('filter-select');
noSelect=!($header.hasClass('filter-false') || $header.hasClass('parser-false'));
options='';
if( fxn===true && noSelect ){
ts.filter.buildSelect(table, column);} else if( typeof fxn==='object' && noSelect ){
for (string in fxn){
if(typeof string==='string'){
options +=options==='' ?
'<option value="">' + ($header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.select || '') + '</option>':'';
val=string;
txt=string;
if(string.indexOf(wo.filter_selectSourceSeparator) >=0){
val=string.split(wo.filter_selectSourceSeparator);
txt=val[1];
val=val[0];}
options +='<option ' + (txt===val?'':'data-function-name="' + string + '" ') + 'value="' + val + '">' + txt + '</option>';}}
c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').append(options);}}}}
ts.filter.buildDefault(table, true);
ts.filter.bindSearch( table, c.$table.find('.' + ts.css.filter), true );
if(wo.filter_external){
ts.filter.bindSearch( table, wo.filter_external );}
if(wo.filter_hideFilters){
ts.filter.hideFilters(table, c);}
if(c.showProcessing){
c.$table.bind('filterStart' + c.namespace + 'filter filterEnd' + c.namespace + 'filter', function(event, columns){
$header=(columns)?c.$table.find('.' + ts.css.header).filter('[data-column]').filter(function(){
return columns[$(this).data('column')] !=='';}):'';
ts.isProcessing(table, event.type==='filterStart', columns?$header:'');});}
c.filteredRows=c.totalRows;
c.$table.bind('tablesorter-initialized pagerBeforeInitialized', function(){
var wo=this.config.widgetOptions;
filters=ts.filter.setDefaults(table, c, wo) || [];
if(filters.length){
if( !(c.delayInit && filters.join('')==='') ){
ts.setFilters(table, filters, true);}}
c.$table.trigger('filterFomatterUpdate');
setTimeout(function(){
if(!wo.filter_initialized){
ts.filter.filterInitComplete(c);}}, 100);});
if(c.pager && c.pager.initialized && !wo.filter_initialized){
c.$table.trigger('filterFomatterUpdate');
setTimeout(function(){
ts.filter.filterInitComplete(c);}, 100);}},
formatterUpdated: function($cell, column){
var wo=$cell.closest('table')[0].config.widgetOptions;
if(!wo.filter_initialized){
wo.filter_formatterInit[column]=1;}},
filterInitComplete: function(c){
var wo=c.widgetOptions,
count=0,
completed=function(){
wo.filter_initialized=true;
c.$table.trigger('filterInit', c);
ts.filter.findRows(c.table, c.$table.data('lastSearch') || []);};
if( $.isEmptyObject( wo.filter_formatter ) ){
completed();}else{
$.each( wo.filter_formatterInit, function(i, val){
if(val===1){
count++;}});
clearTimeout(wo.filter_initTimer);
if(!wo.filter_initialized && count===wo.filter_formatterCount){
completed();} else if(!wo.filter_initialized){
wo.filter_initTimer=setTimeout(function(){
completed();}, 500);}}},
setDefaults: function(table, c, wo){
var isArray, saved, indx,
filters=ts.getFilters(table) || [];
if(wo.filter_saveFilters && ts.storage){
saved=ts.storage( table,'tablesorter-filters' ) || [];
isArray=$.isArray(saved);
if( !(isArray && saved.join('')==='' || !isArray) ){ filters=saved;}}
if(filters.join('')===''){
for (indx=0; indx < c.columns; indx++){
filters[indx]=c.$headers.filter('[data-column="' + indx + '"]:last').attr(wo.filter_defaultAttrib) || filters[indx];}}
c.$table.data('lastSearch', filters);
return filters;},
parseFilter: function(c, filter, column, parsed, forceParse){
return forceParse || parsed ?
c.parsers[column].format( filter, c.table, [], column ) :
filter;},
buildRow: function(table, c, wo){
var col, column, $header, buildSelect, disabled, name, ffxn,
columns=c.columns,
arry=$.isArray(wo.filter_cellFilter),
buildFilter='<tr role="row" class="' + ts.css.filterRow + '">';
for (column=0; column < columns; column++){
if(arry){
buildFilter +='<td' + ( wo.filter_cellFilter[column]?' class="' + wo.filter_cellFilter[column] + '"':'' ) + '></td>';}else{
buildFilter +='<td' + ( wo.filter_cellFilter !==''?' class="' + wo.filter_cellFilter + '"':'' ) + '></td>';}}
c.$filters=$(buildFilter +='</tr>').appendTo( c.$table.children('thead').eq(0) ).find('td');
for (column=0; column < columns; column++){
disabled=false;
$header=c.$headers.filter('[data-column="' + column + '"]:last');
ffxn=ts.getColumnData( table, wo.filter_functions, column );
buildSelect=(wo.filter_functions && ffxn && typeof ffxn !=="function" ) ||
$header.hasClass('filter-select');
col=ts.getColumnData( table, c.headers, column );
disabled=ts.getData($header[0], col,'filter')==='false' || ts.getData($header[0], col,'parser')==='false';
if(buildSelect){
buildFilter=$('<select>').appendTo( c.$filters.eq(column) );}else{
ffxn=ts.getColumnData( table, wo.filter_formatter, column );
if(ffxn){
wo.filter_formatterCount++;
buildFilter=ffxn( c.$filters.eq(column), column );
if(buildFilter && buildFilter.length===0){
buildFilter=c.$filters.eq(column).children('input');}
if( buildFilter && (buildFilter.parent().length===0 ||
(buildFilter.parent().length && buildFilter.parent()[0] !==c.$filters[column])) ){
c.$filters.eq(column).append(buildFilter);}}else{
buildFilter=$('<input type="search">').appendTo( c.$filters.eq(column) );}
if(buildFilter){
buildFilter.attr('placeholder', $header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.search || '');}}
if(buildFilter){
name=( $.isArray(wo.filter_cssFilter) ?
(typeof wo.filter_cssFilter[column] !=='undefined'?wo.filter_cssFilter[column] || '':'') :
wo.filter_cssFilter ) || '';
buildFilter.addClass( ts.css.filter + ' ' + name ).attr('data-column', column);
if(disabled){
buildFilter.attr('placeholder','').addClass('disabled')[0].disabled=true;}}}},
bindSearch: function(table, $el, internal){
table=$(table)[0];
$el=$($el);
if(!$el.length){ return;}
var c=table.config,
wo=c.widgetOptions,
$ext=wo.filter_$externalFilters;
if(internal !==true){
wo.filter_$anyMatch=$el.filter(wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector);
if($ext && $ext.length){
wo.filter_$externalFilters=wo.filter_$externalFilters.add( $el );}else{
wo.filter_$externalFilters=$el;}
ts.setFilters(table, c.$table.data('lastSearch') || [], internal===false);}
$el
.attr('data-lastSearchTime', new Date().getTime())
.unbind('keypress keyup search change '.split(' ').join(c.namespace + 'filter '))
.bind('keyup' + c.namespace + 'filter', function(event){
$(this).attr('data-lastSearchTime', new Date().getTime());
if(event.which===27){
this.value='';} else if( wo.filter_liveSearch===false ){
return;} else if( this.value !=='' && (
( typeof wo.filter_liveSearch==='number' && this.value.length < wo.filter_liveSearch ) ||
( event.which !==13 && event.which !==8 && ( event.which < 32 || (event.which >=37 && event.which <=40) ) ) ) ){
return;}
ts.filter.searching( table, true, true );})
.bind('search change keypress '.split(' ').join(c.namespace + 'filter '), function(event){
var column=$(this).data('column');
if(event.which===13 || event.type==='search' || event.type==='change' && this.value !==c.lastSearch[column]){
event.preventDefault();
$(this).attr('data-lastSearchTime', new Date().getTime());
ts.filter.searching( table, false, true );}});},
searching: function(table, filter, skipFirst){
var wo=table.config.widgetOptions;
clearTimeout(wo.searchTimer);
if(typeof filter==='undefined' || filter===true){
wo.searchTimer=setTimeout(function(){
ts.filter.checkFilters(table, filter, skipFirst );}, wo.filter_liveSearch?wo.filter_searchDelay:10);}else{
ts.filter.checkFilters(table, filter, skipFirst);}},
checkFilters: function(table, filter, skipFirst){
var c=table.config,
wo=c.widgetOptions,
filterArray=$.isArray(filter),
filters=(filterArray)?filter:ts.getFilters(table, true),
combinedFilters=(filters || []).join('');
if($.isEmptyObject(c.cache)){
if(c.delayInit && c.pager && c.pager.initialized){
c.$table.trigger('updateCache', [function(){
ts.filter.checkFilters(table, false, skipFirst);}] );}
return;}
if(filterArray){
ts.setFilters( table, filters, false, skipFirst !==true );
if(!wo.filter_initialized){ c.lastCombinedFilter='';}}
if(wo.filter_hideFilters){
c.$table.find('.' + ts.css.filterRow).trigger( combinedFilters===''?'mouseleave':'mouseenter' );}
if(c.lastCombinedFilter===combinedFilters && filter !==false){
return;} else if(filter===false){
c.lastCombinedFilter=null;
c.lastSearch=[];}
if(wo.filter_initialized){ c.$table.trigger('filterStart', [filters]);}
if(c.showProcessing){
setTimeout(function(){
ts.filter.findRows(table, filters, combinedFilters);
return false;}, 30);}else{
ts.filter.findRows(table, filters, combinedFilters);
return false;}},
hideFilters: function(table, c){
var $filterRow, $filterRow2, timer;
$(table)
.find('.' + ts.css.filterRow)
.addClass('hideme')
.bind('mouseenter mouseleave', function(e){
var event=e;
$filterRow=$(this);
clearTimeout(timer);
timer=setTimeout(function(){
if( /enter|over/.test(event.type) ){
$filterRow.removeClass('hideme');}else{
if( $(document.activeElement).closest('tr')[0] !==$filterRow[0] ){
if(c.lastCombinedFilter===''){
$filterRow.addClass('hideme');}}}}, 200);})
.find('input, select').bind('focus blur', function(e){
$filterRow2=$(this).closest('tr');
clearTimeout(timer);var event=e;
timer=setTimeout(function(){
if(ts.getFilters(c.$table).join('')===''){
$filterRow2[ event.type==='focus'?'removeClass':'addClass']('hideme');}}, 200);});},
defaultFilter: function(filter, mask){
if(filter===''){ return filter;}
var regex=ts.filter.regex.iQuery,
maskLen=mask.match( ts.filter.regex.igQuery ).length,
query=maskLen > 1?$.trim(filter).split(/\s/):[ $.trim(filter) ],
len=query.length - 1,
indx=0,
val=mask;
if( len < 1 && maskLen > 1 ){
query[1]=query[0];}
while (regex.test(val)){
val=val.replace(regex, query[indx++] || '');
if(regex.test(val) && indx < len && (query[indx] || '') !==''){
val=mask.replace(regex, val);}}
return val;},
getLatestSearch: function( $input ){
return $input.sort(function(a, b){
return $(b).attr('data-lastSearchTime') - $(a).attr('data-lastSearchTime');});},
multipleColumns: function( c, $input ){
var ranges, singles, indx,
wo=c.widgetOptions,
targets=wo.filter_initialized || !$input.filter(wo.filter_anyColumnSelector).length,
columns=[],
val=$.trim( ts.filter.getLatestSearch( $input ).attr('data-column') );
if( targets && /-/.test( val ) ){
ranges=val.match( /(\d+)\s*-\s*(\d+)/g );
$.each(ranges, function(i,v){
var t,
range=v.split( /\s*-\s*/ ),
start=parseInt( range[0], 10 ) || 0,
end=parseInt( range[1], 10 ) || ( c.columns - 1 );
if( start > end ){ t=start; start=end; end=t;}
if( end >=c.columns ){ end=c.columns - 1;}
for ( ; start <=end; start++ ){
columns.push(start);}
val=val.replace( v,'' );});}
if( targets && /,/.test( val ) ){
singles=val.split( /\s*,\s*/ );
$.each( singles, function(i,v){
if(v !==''){
indx=parseInt( v, 10 );
if( indx < c.columns ){
columns.push( indx );}}});}
if(!columns.length){
for ( indx=0; indx < c.columns; indx++ ){
columns.push( indx );}}
return columns;},
findRows: function(table, filters, combinedFilters){
if(table.config.lastCombinedFilter===combinedFilters || !table.config.widgetOptions.filter_initialized){ return;}
var len, $rows, rowIndex, tbodyIndex, $tbody, $cells, $cell, columnIndex,
childRow, lastSearch, hasSelect, matches, result, showRow, time, val, indx,
notFiltered, searchFiltered, filterMatched, excludeMatch, fxn, ffxn,
regex=ts.filter.regex,
c=table.config,
wo=c.widgetOptions,
$tbodies=c.$table.children('tbody'),
data={ anyMatch: false },
noAnyMatch=[ 'range','notMatch',  'operators' ];
data.parsed=c.$headers.map(function(columnIndex){
return c.parsers && c.parsers[columnIndex] && c.parsers[columnIndex].parsed ||
ts.getData && ts.getData(c.$headers.filter('[data-column="' + columnIndex + '"]:last'), ts.getColumnData( table, c.headers, columnIndex ),'filter')==='parsed' ||
$(this).hasClass('filter-parsed');}).get();
if(c.debug){
ts.log('Starting filter widget search', filters);
time=new Date();}
c.filteredRows=0;
c.totalRows=0;
combinedFilters=(filters || []).join('');
for (tbodyIndex=0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
if($tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock || ts.css.info)){ continue;}
$tbody=ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
columnIndex=c.columns;
$rows=$( $.map(c.cache[tbodyIndex].normalized, function(el){ return el[columnIndex].$row.get();}) );
if(combinedFilters==='' || wo.filter_serversideFiltering){
$rows.removeClass(wo.filter_filteredRow).not('.' + c.cssChildRow).show();}else{
$rows=$rows.not('.' + c.cssChildRow);
len=$rows.length;
searchFiltered=wo.filter_searchFiltered;
lastSearch=c.lastSearch || c.$table.data('lastSearch') || [];
if(searchFiltered){
for (indx=0; indx < columnIndex + 1; indx++){
val=filters[indx] || '';
if(!searchFiltered){ indx=columnIndex;}
searchFiltered=searchFiltered && lastSearch.length &&
val.indexOf(lastSearch[indx] || '')===0 &&
!regex.alreadyFiltered.test(val) &&
!/[=\"\|!]/.test(val) &&
!(/(>=?\s*-\d)/.test(val) || /(<=?\s*\d)/.test(val)) &&
!( val !=='' && c.$filters && c.$filters.eq(indx).find('select').length && !c.$headers.filter('[data-column="' + indx + '"]:last').hasClass('filter-match') );}}
notFiltered=$rows.not('.' + wo.filter_filteredRow).length;
if(searchFiltered && notFiltered===0){ searchFiltered=false;}
if(c.debug){
ts.log( "Searching through " + ( searchFiltered && notFiltered < len?notFiltered:"all" ) + " rows" );}
if((wo.filter_$anyMatch && wo.filter_$anyMatch.length) || filters[c.columns]){
data.anyMatchFlag=true;
data.anyMatchFilter=wo.filter_$anyMatch && ts.filter.getLatestSearch( wo.filter_$anyMatch ).val() || filters[c.columns] || '';
if(c.sortLocaleCompare){
data.anyMatchFilter=ts.replaceAccents(data.anyMatchFilter);}
if(wo.filter_defaultFilter && regex.iQuery.test( ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) || '')){
data.anyMatchFilter=ts.filter.defaultFilter( data.anyMatchFilter, ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) );
searchFiltered=false;}
data.iAnyMatchFilter=!(wo.filter_ignoreCase && c.ignoreCase)?data.anyMatchFilter:data.anyMatchFilter.toLocaleLowerCase();}
for (rowIndex=0; rowIndex < len; rowIndex++){
data.cacheArray=c.cache[tbodyIndex].normalized[rowIndex];
childRow=$rows[rowIndex].className;
if( regex.child.test(childRow) || (searchFiltered && regex.filtered.test(childRow)) ){ continue;}
showRow=true;
childRow=$rows.eq(rowIndex).nextUntil('tr:not(.' + c.cssChildRow + ')');
data.childRowText=(childRow.length && wo.filter_childRows)?childRow.text():'';
data.childRowText=wo.filter_ignoreCase?data.childRowText.toLocaleLowerCase():data.childRowText;
$cells=$rows.eq(rowIndex).children();
if(data.anyMatchFlag){
columnIndex=ts.filter.multipleColumns( c, wo.filter_$anyMatch );
data.anyMatch=true;
data.rowArray=$cells.map(function(i){
if( $.inArray(i, columnIndex) > -1 ){
var txt;
if(data.parsed[i]){
txt=data.cacheArray[i];}else{
txt=wo.filter_ignoreCase?$(this).text().toLowerCase():$(this).text();
if(c.sortLocaleCompare){
txt=ts.replaceAccents(txt);}}
return txt;}}).get();
data.filter=data.anyMatchFilter;
data.iFilter=data.iAnyMatchFilter;
data.exact=data.rowArray.join(' ');
data.iExact=wo.filter_ignoreCase?data.exact.toLowerCase():data.exact;
data.cache=data.cacheArray.slice(0,-1).join(' ');
filterMatched=null;
$.each(ts.filter.types, function(type, typeFunction){
if($.inArray(type, noAnyMatch) < 0){
matches=typeFunction( c, data );
if(matches !==null){
filterMatched=matches;
return false;}}});
if(filterMatched !==null){
showRow=filterMatched;}else{
if(wo.filter_startsWith){
showRow=false;
columnIndex=c.columns;
while (!showRow && columnIndex > 0){
columnIndex--;
showRow=showRow || data.rowArray[columnIndex].indexOf(data.iFilter)===0;}}else{
showRow=(data.iExact + data.childRowText).indexOf(data.iFilter) >=0;}}
data.anyMatch=false;}
for (columnIndex=0; columnIndex < c.columns; columnIndex++){
data.filter=filters[columnIndex];
data.index=columnIndex;
excludeMatch=( ts.getColumnData( table, wo.filter_excludeFilter, columnIndex, true ) || '' ).split(/\s+/);
if(data.filter){
data.cache=data.cacheArray[columnIndex];
if(wo.filter_useParsedData || data.parsed[columnIndex]){
data.exact=data.cache;}else{
data.exact=$.trim( $cells.eq(columnIndex).text() );
data.exact=c.sortLocaleCompare?ts.replaceAccents(data.exact):data.exact;}
data.iExact=!regex.type.test(typeof data.exact) && wo.filter_ignoreCase?data.exact.toLocaleLowerCase():data.exact;
result=showRow;
ffxn=wo.filter_columnFilters ?
c.$filters.add(c.$externalFilters).filter('[data-column="'+ columnIndex + '"]').find('select option:selected').attr('data-function-name') || '':'';
data.filter=c.sortLocaleCompare?ts.replaceAccents(data.filter):data.filter;
val=true;
if(wo.filter_defaultFilter && regex.iQuery.test( ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) || '')){
data.filter=ts.filter.defaultFilter( data.filter, ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) );
val=false;}
data.iFilter=wo.filter_ignoreCase?(data.filter || '').toLocaleLowerCase():data.filter;
fxn=ts.getColumnData( table, wo.filter_functions, columnIndex );
$cell=c.$headers.filter('[data-column="' + columnIndex + '"]:last');
hasSelect=$cell.hasClass('filter-select');
if( fxn || ( hasSelect && val ) ){
if(fxn===true || hasSelect){
result=($cell.hasClass('filter-match'))?data.iExact.search(data.iFilter) >=0:data.filter===data.exact;} else if(typeof fxn==='function'){
result=fxn(data.exact, data.cache, data.filter, columnIndex, $rows.eq(rowIndex));} else if(typeof fxn[ffxn || data.filter]==='function'){
result=fxn[ffxn || data.filter](data.exact, data.cache, data.filter, columnIndex, $rows.eq(rowIndex));}}else{
filterMatched=null;
$.each(ts.filter.types, function(type, typeFunction){
if($.inArray(type, excludeMatch) < 0){
matches=typeFunction( c, data );
if(matches !==null){
filterMatched=matches;
return false;}}});
if(filterMatched !==null){
result=filterMatched;}else{
data.exact=(data.iExact + data.childRowText).indexOf( ts.filter.parseFilter(c, data.iFilter, columnIndex, data.parsed[columnIndex]) );
result=((!wo.filter_startsWith && data.exact >=0) || (wo.filter_startsWith && data.exact===0) );}}
showRow=(result)?showRow:false;}}
$rows.eq(rowIndex)
.toggle(showRow)
.toggleClass(wo.filter_filteredRow, !showRow);
if(childRow.length){
childRow.toggleClass(wo.filter_filteredRow, !showRow);}}}
c.filteredRows +=$rows.not('.' + wo.filter_filteredRow).length;
c.totalRows +=$rows.length;
ts.processTbody(table, $tbody, false);}
c.lastCombinedFilter=combinedFilters;
c.lastSearch=filters;
c.$table.data('lastSearch', filters);
if(wo.filter_saveFilters && ts.storage){
ts.storage( table,'tablesorter-filters', filters );}
if(c.debug){
ts.benchmark("Completed filter widget search", time);}
if(wo.filter_initialized){ c.$table.trigger('filterEnd', c );}
setTimeout(function(){
c.$table.trigger('applyWidgets');}, 0);},
getOptionSource: function(table, column, onlyAvail){
var cts,
c=table.config,
wo=c.widgetOptions,
parsed=[],
arry=false,
source=wo.filter_selectSource,
last=c.$table.data('lastSearch') || [],
fxn=$.isFunction(source)?true:ts.getColumnData( table, source, column );
if(onlyAvail && last[column] !==''){
onlyAvail=false;}
if(fxn===true){
arry=source(table, column, onlyAvail);} else if( fxn instanceof $ || ($.type(fxn)==='string' && fxn.indexOf('</option>') >=0) ){
return fxn;} else if($.isArray(fxn)){
arry=fxn;} else if($.type(source)==='object' && fxn){
arry=fxn(table, column, onlyAvail);}
if(arry===false){
arry=ts.filter.getOptions(table, column, onlyAvail);}
arry=$.grep(arry, function(value, indx){
return $.inArray(value, arry)===indx;});
if(c.$headers.filter('[data-column="' + column + '"]:last').hasClass('filter-select-nosort')){
return arry;}else{
$.each(arry, function(i, v){
parsed.push({ t:v, p:c.parsers && c.parsers[column].format( v, table, [], column ) });});
cts=c.textSorter || '';
parsed.sort(function(a, b){
var x=a.p.toString(), y=b.p.toString();
if($.isFunction(cts)){
return cts(x, y, true, column, table);} else if(typeof(cts)==='object' && cts.hasOwnProperty(column)){
return cts[column](x, y, true, column, table);} else if(ts.sortNatural){
return ts.sortNatural(x, y);}
return true;});
arry=[];
$.each(parsed, function(i, v){
arry.push(v.t);});
return arry;}},
getOptions: function(table, column, onlyAvail){
var rowIndex, tbodyIndex, len, row, cache, cell,
c=table.config,
wo=c.widgetOptions,
$tbodies=c.$table.children('tbody'),
arry=[];
for (tbodyIndex=0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
if(!$tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock)){
cache=c.cache[tbodyIndex];
len=c.cache[tbodyIndex].normalized.length;
for (rowIndex=0; rowIndex < len; rowIndex++){
row=cache.row?cache.row[rowIndex]:cache.normalized[rowIndex][c.columns].$row[0];
if(onlyAvail && row.className.match(wo.filter_filteredRow)){ continue;}
if(wo.filter_useParsedData || c.parsers[column].parsed || c.$headers.filter('[data-column="' + column + '"]:last').hasClass('filter-parsed')){
arry.push( '' + cache.normalized[rowIndex][column] );}else{
cell=row.cells[column];
if(cell){
arry.push( $.trim( cell.textContent || cell.innerText || $(cell).text() ) );}}}}}
return arry;},
buildSelect: function(table, column, arry, updating, onlyAvail){
table=$(table)[0];
column=parseInt(column, 10);
if(!table.config.cache || $.isEmptyObject(table.config.cache)){ return;}
var indx, val, txt, t, $filters, $filter,
c=table.config,
wo=c.widgetOptions,
node=c.$headers.filter('[data-column="' + column + '"]:last'),
options='<option value="">' + ( node.data('placeholder') || node.attr('data-placeholder') || wo.filter_placeholder.select || '' ) + '</option>',
currentValue=c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').val();
if(typeof arry==='undefined' || arry===''){
arry=ts.filter.getOptionSource(table, column, onlyAvail);}
if($.isArray(arry)){
for (indx=0; indx < arry.length; indx++){
txt=arry[indx]=('' + arry[indx]).replace(/\"/g, "&quot;");
val=txt;
if(txt.indexOf(wo.filter_selectSourceSeparator) >=0){
t=txt.split(wo.filter_selectSourceSeparator);
val=t[0];
txt=t[1];}
options +=arry[indx] !==''?'<option ' + (val===txt?'':'data-function-name="' + arry[indx] + '" ') + 'value="' + val + '">' + txt + '</option>':'';}
arry=[];}
$filters=( c.$filters?c.$filters:c.$table.children('thead') ).find('.' + ts.css.filter);
if(wo.filter_$externalFilters){
$filters=$filters && $filters.length?$filters.add(wo.filter_$externalFilters):wo.filter_$externalFilters;}
$filter=$filters.filter('select[data-column="' + column + '"]');
if($filter.length){
$filter[ updating?'html':'append' ](options);
if(!$.isArray(arry)){
$filter.append(arry).val(currentValue);}
$filter.val(currentValue);}},
buildDefault: function(table, updating){
var columnIndex, $header, noSelect,
c=table.config,
wo=c.widgetOptions,
columns=c.columns;
for (columnIndex=0; columnIndex < columns; columnIndex++){
$header=c.$headers.filter('[data-column="' + columnIndex + '"]:last');
noSelect=!($header.hasClass('filter-false') || $header.hasClass('parser-false'));
if(($header.hasClass('filter-select') || ts.getColumnData( table, wo.filter_functions, columnIndex )===true) && noSelect){
ts.filter.buildSelect(table, columnIndex,'', updating, $header.hasClass(wo.filter_onlyAvail));}}}};
ts.getFilters=function(table, getRaw, setFilters, skipFirst){
var i, $filters, $column, cols,
filters=false,
c=table?$(table)[0].config:'',
wo=c?c.widgetOptions:'';
if(getRaw !==true && wo && !wo.filter_columnFilters){
return $(table).data('lastSearch');}
if(c){
if(c.$filters){
$filters=c.$filters.find('.' + ts.css.filter);}
if(wo.filter_$externalFilters){
$filters=$filters && $filters.length?$filters.add(wo.filter_$externalFilters):wo.filter_$externalFilters;}
if($filters && $filters.length){
filters=setFilters || [];
for (i=0; i < c.columns + 1; i++){
cols=( i===c.columns ?
wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector :
'[data-column="' + i + '"]' );
$column=$filters.filter(cols);
if($column.length){
$column=ts.filter.getLatestSearch( $column );
if($.isArray(setFilters)){
if(skipFirst){ $column.slice(1);}
if(i===c.columns){
cols=$column.filter(wo.filter_anyColumnSelector);
$column=cols.length?cols:$column;}
$column
.val( setFilters[i] )
.trigger('change.tsfilter');}else{
filters[i]=$column.val() || '';
if(i===c.columns){
$column.slice(1).filter('[data-column*="' + $column.attr('data-column') + '"]').val( filters[i] );}else{
$column.slice(1).val( filters[i] );}}
if(i===c.columns && $column.length){
wo.filter_$anyMatch=$column;}}}}}
if(filters.length===0){
filters=false;}
return filters;};
ts.setFilters=function(table, filter, apply, skipFirst){
var c=table?$(table)[0].config:'',
valid=ts.getFilters(table, true, filter, skipFirst);
if(c && apply){
c.lastCombinedFilter=null;
c.lastSearch=[];
ts.filter.searching(c.$table[0], filter, skipFirst);
c.$table.trigger('filterFomatterUpdate');}
return !!valid;};
ts.addWidget({
id: "stickyHeaders",
priority: 60,
options: {
stickyHeaders:'',
stickyHeaders_attachTo:null,
stickyHeaders_xScroll:null,
stickyHeaders_yScroll:null,
stickyHeaders_offset:0,
stickyHeaders_filteredToTop: true,
stickyHeaders_cloneId:'-sticky',
stickyHeaders_addResizeEvent:true,
stickyHeaders_includeCaption:true,
stickyHeaders_zIndex:2
},
format: function(table, c, wo){
if( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >=0 && !c.$table.hasClass('hasFilters')) ){
return;}
var $table=c.$table,
$attach=$(wo.stickyHeaders_attachTo),
namespace=c.namespace + 'stickyheaders ',
$yScroll=$(wo.stickyHeaders_yScroll || wo.stickyHeaders_attachTo || window),
$xScroll=$(wo.stickyHeaders_xScroll || wo.stickyHeaders_attachTo || window),
$thead=$table.children('thead:first'),
$header=$thead.children('tr').not('.sticky-false').children(),
$tfoot=$table.children('tfoot'),
$stickyOffset=isNaN(wo.stickyHeaders_offset)?$(wo.stickyHeaders_offset):'',
stickyOffset=$attach.length?0:$stickyOffset.length ?
$stickyOffset.height() || 0:parseInt(wo.stickyHeaders_offset, 10) || 0,
$nestedSticky=$table.parent().closest('.' + ts.css.table).hasClass('hasStickyHeaders') ?
$table.parent().closest('table.tablesorter')[0].config.widgetOptions.$sticky.parent():[],
nestedStickyTop=$nestedSticky.length?$nestedSticky.height():0,
$stickyTable=wo.$sticky=$table.clone()
.addClass('containsStickyHeaders ' + ts.css.sticky + ' ' + wo.stickyHeaders)
.wrap('<div class="' + ts.css.stickyWrap + '">'),
$stickyWrap=$stickyTable.parent().css({
position  :$attach.length?'absolute':'fixed',
margin    :0,
top       :stickyOffset + nestedStickyTop,
left      :0,
visibility:'hidden',
zIndex    :wo.stickyHeaders_zIndex || 2
}),
$stickyThead=$stickyTable.children('thead:first'),
$stickyCells,
laststate='',
spacing=0,
setWidth=function($orig, $clone){
$orig.filter(':visible').each(function(i){
var width, border,
$cell=$clone.filter(':visible').eq(i),
$this=$(this);
if($this.css('box-sizing')==='border-box'){
width=$this.outerWidth();}else{
if($cell.css('border-collapse')==='collapse'){
if(window.getComputedStyle){
width=parseFloat( window.getComputedStyle(this, null).width );}else{
border=parseFloat( $this.css('border-width') );
width=$this.outerWidth() - parseFloat( $this.css('padding-left') ) - parseFloat( $this.css('padding-right') ) - border;}}else{
width=$this.width();}}
$cell.css({
'min-width': width,'max-width': width
});});},
resizeHeader=function(){
stickyOffset=$stickyOffset.length?$stickyOffset.height() || 0:parseInt(wo.stickyHeaders_offset, 10) || 0;
spacing=0;
$stickyWrap.css({
left:$attach.length?parseInt($attach.css('padding-left'), 10) || 0 :
$table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing,
width: $table.outerWidth()
});
setWidth( $table, $stickyTable );
setWidth( $header, $stickyCells );};
if($stickyTable.attr('id')){ $stickyTable[0].id +=wo.stickyHeaders_cloneId;}
$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
$stickyTable.find('tbody, tfoot').remove();
if(!wo.stickyHeaders_includeCaption){
$stickyTable.find('caption').remove();}
$stickyCells=$stickyThead.children().children();
$stickyTable.css({ height:0, width:0, margin: 0 });
$stickyCells.find('.' + ts.css.resizer).remove();
$table
.addClass('hasStickyHeaders')
.bind('pagerComplete' + namespace, function(){
resizeHeader();});
ts.bindEvents(table, $stickyThead.children().children('.tablesorter-header'));
$table.after( $stickyWrap );
if(c.onRenderHeader){
$stickyThead.children('tr').children().each(function(index){
c.onRenderHeader.apply( $(this), [ index, c, $stickyTable ] );});}
$xScroll.add($yScroll)
.unbind('scroll resize '.split(' ').join( namespace ) )
.bind('scroll resize '.split(' ').join( namespace ), function(event){
if(!$table.is(':visible')){ return;}
nestedStickyTop=$nestedSticky.length?$nestedSticky.offset().top - $yScroll.scrollTop() + $nestedSticky.height():0;var prefix='tablesorter-sticky-',
offset=$table.offset(),
yWindow=$.isWindow( $yScroll[0] ),
xWindow=$.isWindow( $xScroll[0] ),
scrollTop=( $attach.length?( yWindow?$yScroll.scrollTop():$yScroll.offset().top ):$yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
tableHeight=$table.height() - ($stickyWrap.height() + ($tfoot.height() || 0)),
isVisible=( scrollTop > offset.top) && (scrollTop < offset.top + tableHeight)?'visible':'hidden',
cssSettings={ visibility:isVisible };
if($attach.length){
cssSettings.top=yWindow?scrollTop:$attach.scrollTop();}
if(xWindow){
cssSettings.left=$table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing;}
if($nestedSticky.length){
cssSettings.top=( cssSettings.top || 0 ) + stickyOffset + nestedStickyTop;}
$stickyWrap
.removeClass(prefix + 'visible ' + prefix + 'hidden')
.addClass(prefix + isVisible)
.css(cssSettings);
if(isVisible !==laststate || event.type==='resize'){
resizeHeader();
laststate=isVisible;}});
if(wo.stickyHeaders_addResizeEvent){
ts.addHeaderResizeEvent(table);}
if($table.hasClass('hasFilters') && wo.filter_columnFilters){
$table.bind('filterEnd' + namespace, function(){
var $td=$(document.activeElement).closest('td'),
column=$td.parent().children().index($td);
if($stickyWrap.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop){
window.scrollTo(0, $table.position().top);
if(column >=0 && c.$filters){
c.$filters.eq(column).find('a, select, input').filter(':visible').focus();}}});
ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
if(wo.filter_hideFilters){
ts.filter.hideFilters($stickyTable, c);}}
$table.trigger('stickyHeadersInit');},
remove: function(table, c, wo){
var namespace=c.namespace + 'stickyheaders ';
c.$table
.removeClass('hasStickyHeaders')
.unbind( 'pagerComplete filterEnd '.split(' ').join(namespace) )
.next('.' + ts.css.stickyWrap).remove();
if(wo.$sticky && wo.$sticky.length){ wo.$sticky.remove();}
if(!$('.hasStickyHeaders').length){
$(window).add(wo.stickyHeaders_xScroll).add(wo.stickyHeaders_yScroll).add(wo.stickyHeaders_attachTo)
.unbind( 'scroll resize '.split(' ').join(namespace) );}
ts.addHeaderResizeEvent(table, false);}});
ts.addWidget({
id: "resizable",
priority: 40,
options: {
resizable:true,
resizable_addLastColumn:false,
resizable_widths:[],
resizable_throttle:false
},
format: function(table, c, wo){
if(c.$table.hasClass('hasResizable')){ return;}
c.$table.addClass('hasResizable');
ts.resizableReset(table, true);var $rows, $columns, $column, column, timer,
storedSizes={},
$table=c.$table,
$wrap=$table.parent(),
overflow=$table.parent().css('overflow')==='auto',
mouseXPosition=0,
$target=null,
$next=null,
fullWidth=Math.abs($table.parent().width() - $table.width()) < 20,
mouseMove=function(event){
if(mouseXPosition===0 || !$target){ return;}
var leftEdge=event.pageX - mouseXPosition,
targetWidth=$target.width();
$target.width( targetWidth + leftEdge );
if($target.width() !==targetWidth && fullWidth){
$next.width( $next.width() - leftEdge );} else if(overflow){
$table.width(function(i, w){
return w + leftEdge;});
if(!$next.length){
$wrap[0].scrollLeft=$table.width();}}
mouseXPosition=event.pageX;},
stopResize=function(){
if(ts.storage && $target && $next){
storedSizes={};
storedSizes[$target.index()]=$target.width();
storedSizes[$next.index()]=$next.width();
$target.width( storedSizes[$target.index()] );
$next.width( storedSizes[$next.index()] );
if(wo.resizable !==false){
ts.storage(table,'tablesorter-resizable', c.$headers.map(function(){ return $(this).width();}).get() );}}
mouseXPosition=0;
$target=$next=null;
$(window).trigger('resize');};
storedSizes=(ts.storage && wo.resizable !==false)?ts.storage(table,'tablesorter-resizable'):{};
if(storedSizes){
for (column in storedSizes){
if(!isNaN(column) && column < c.$headers.length){
c.$headers.eq(column).width(storedSizes[column]);}}}
$rows=$table.children('thead:first').children('tr');
$rows.children().each(function(){
var canResize,
$column=$(this);
column=$column.attr('data-column');
canResize=ts.getData( $column, ts.getColumnData( table, c.headers, column ),'resizable')==="false";
$rows.children().filter('[data-column="' + column + '"]')[canResize?'addClass':'removeClass']('resizable-false');});
$rows.each(function(){
$column=$(this).children().not('.resizable-false');
if(!$(this).find('.' + ts.css.wrapper).length){
$column.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');}
if(!wo.resizable_addLastColumn){ $column=$column.slice(0,-1);}
$columns=$columns?$columns.add($column):$column;});
$columns
.each(function(){
var $column=$(this),
padding=parseInt($column.css('padding-right'), 10) + 10;
$column
.find('.' + ts.css.wrapper)
.append('<div class="' + ts.css.resizer + '" style="cursor:w-resize;position:absolute;z-index:1;right:-' +
padding + 'px;top:0;height:100%;width:20px;"></div>');})
.find('.' + ts.css.resizer)
.bind('mousedown', function(event){
$target=$(event.target).closest('th');var $header=c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
if($header.length > 1){ $target=$target.add($header);}
$next=event.shiftKey?$target.parent().find('th').not('.resizable-false').filter(':last'):$target.nextAll(':not(.resizable-false)').eq(0);
mouseXPosition=event.pageX;});
$(document)
.bind('mousemove.tsresize', function(event){
if(mouseXPosition===0 || !$target){ return;}
if(wo.resizable_throttle){
clearTimeout(timer);
timer=setTimeout(function(){
mouseMove(event);}, isNaN(wo.resizable_throttle)?5:wo.resizable_throttle );}else{
mouseMove(event);}})
.bind('mouseup.tsresize', function(){
stopResize();});
$table.find('thead:first').bind('contextmenu.tsresize', function(){
ts.resizableReset(table);var allowClick=$.isEmptyObject?$.isEmptyObject(storedSizes):true;
storedSizes={};
return allowClick;});},
remove: function(table, c){
c.$table
.removeClass('hasResizable')
.children('thead')
.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
.children('tr').children()
.unbind('mousemove.tsresize mouseup.tsresize')
.find('.' + ts.css.resizer).remove();
ts.resizableReset(table);}});
ts.resizableReset=function(table, nosave){
$(table).each(function(){
var $t,
c=this.config,
wo=c && c.widgetOptions;
if(table && c){
c.$headers.each(function(i){
$t=$(this);
if(wo.resizable_widths[i]){
$t.css('width', wo.resizable_widths[i]);} else if(!$t.hasClass('resizable-false')){
$t.css('width','');}});
if(ts.storage && !nosave){ ts.storage(this,'tablesorter-resizable', {});}}});};
ts.addWidget({
id: 'saveSort',
priority: 20,
options: {
saveSort:true
},
init: function(table, thisWidget, c, wo){
thisWidget.format(table, c, wo, true);},
format: function(table, c, wo, init){
var stored, time,
$table=c.$table,
saveSort=wo.saveSort !==false,
sortList={ "sortList":c.sortList };
if(c.debug){
time=new Date();}
if($table.hasClass('hasSaveSort')){
if(saveSort && table.hasInitialized && ts.storage){
ts.storage( table,'tablesorter-savesort', sortList );
if(c.debug){
ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);}}}else{
$table.addClass('hasSaveSort');
sortList='';
if(ts.storage){
stored=ts.storage( table,'tablesorter-savesort' );
sortList=(stored && stored.hasOwnProperty('sortList') && $.isArray(stored.sortList))?stored.sortList:'';
if(c.debug){
ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);}
$table.bind('saveSortReset', function(event){
event.stopPropagation();
ts.storage( table,'tablesorter-savesort','' );});}
if(init && sortList && sortList.length > 0){
c.sortList=sortList;} else if(table.hasInitialized && sortList && sortList.length > 0){
$table.trigger('sorton', [sortList]);}}},
remove: function(table){
if(ts.storage){ ts.storage( table,'tablesorter-savesort','' );}}});})(jQuery, window);