// @file : /third/tablesorter/js/widgets/widget-build-table.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter=$.tablesorter || {},
bt=ts.buildTable=function(tar, c){
var $tbl=tar.tagName==='TABLE'?$(tar):$('<table>').appendTo(tar),
table=$tbl[0],
wo=c.widgetOptions=$.extend( true, {}, bt.defaults, c.widgetOptions ),
p=wo.build_processing,
typ=wo.build_type,
d=wo.build_source || c.data,
runType=function(d){
var t=$.type(d),
jq=d instanceof jQuery;
if( typeof p==='function' ){ d=p(d, wo);}
c.data=d;
if( jq || t==='string' ){
if( jq || /<\s*\/tr\s*>/.test(d) ){
return bt.html( table, d, wo );}
try {
d=$.parseJSON(d);
if(d){
return bt.object( table, d, wo );}} catch(ignore){}}
if(t==='array' || t==='string' || typ==='array' || typ==='csv'){
return bt.csv( table, d, wo );}
return bt.object( table, d, wo );};
table.config=c;
if( !ts.buildTable.hasOwnProperty(typ) && typ !=='' ){
if(c.debug){ ts.log('aborting build table widget, incorrect build type');}
return false;}
if( d instanceof jQuery ){
runType( $.trim( d.html() ) );} else if( d && ( d.hasOwnProperty('url') || typ==='json' ) ){
$.ajax( wo.build_source )
.done(function(data){
runType(data);})
.fail(function( jqXHR, textStatus, errorThrown){
if(c.debug){ ts.log('aborting build table widget, failed ajax load');}
$tbl.html('<tr><td class="error">' + jqXHR.status + ' '  + textStatus + '</td></tr>');});}else{
runType(d);}};
bt.defaults={
build_type      :'',
build_source    :'',
build_processing:null,
build_complete  :'tablesorter-build-complete',
build_headers  :{
rows   :1,
classes:[],
text   :[],
widths :[]
},
build_footers:{
rows   :1,
classes:[],
text   :[]
},
build_numbers:{
addColumn:false,
sortable :false
},
build_csvStartLine:0,
build_csvSeparator:",",
build_objectRowKey   :'rows',
build_objectCellKey  :'cells',
build_objectHeaderKey:'headers',
build_objectFooterKey:'footers'
};
bt.build={
colgroup:function(widths){
var t='';
if(widths && widths.length){
t +='<colgroup>';
$.each(widths, function(i, w){
t +='<col' + ( w?' style="width:' + w + '"':'' ) + '>';});
t +='</colgroup>';}
return t;},
cell:function(d, wo, typ, col, first){
var j, $td,
$col=first?$('<col>'):'',
cls=wo.build_headers.classes,
cw=wo.build_headers.widths;
if(/string|number/.test(typeof d)){
$td=$('<' + typ + (cls && cls[col]?' class="' + cls[col] + '"':'') + '>' + d + '</' + typ + '>');
if(first && cw && cw[col]){
$col.width(cw[col] || '');}}else{
$td=$('<' + typ + '>');
for (j in d){
if(d.hasOwnProperty(j)){
if(j==='text' || j==='html'){
$td[j]( d[j] );} else if(first && j==='width'){
$col.width(d[j] || '');}else{
$td.attr(j, d[j]);}}}}
return [ $td, $col ];},
header:function(h1, wo){
var h2=wo.build_headers.text,
cls=wo.build_headers.classes,
t='<tr>' + (wo.build_numbers.addColumn?'<th' + (wo.build_numbers.sortable?'' :
' class="sorter-false"') + '>' + wo.build_numbers.addColumn + '</th>':'');
$.each(h1, function(i, h){
if(/<\s*\/t(d|h)\s*>/.test(h)){
t +=h;}else{
t +='<th' + (cls && cls[i]?' class="' + cls[i] + '"':'') + '>' +
(h2 && h2[i]?h2[i]:h) + '</th>';}});
return t + '</tr>';},
rows:function(items, txt, c, wo, num, ftr){
var h=(ftr?'th':'td'),
t='<tr>' + (wo.build_numbers.addColumn?'<' + h + '>' + (ftr?'':num) + '</' + h + '>':'');
$.each(items, function(i, item){
if(/<\s*\/t(d|h)\s*>/.test(item)){
t +=item;}else{
t +='<' + (ftr?h + (c && c[i]?' class="' + c[i] + '"':''):h) + '>' +
(ftr && txt && txt.length && txt[i]?txt[i]:item) + '</' + h + '>';}});
return t + '</tr>';}};
bt.buildComplete=function(table, wo){
$(table).trigger(wo.build_complete);
ts.setup(table, table.config);};
bt.array=function(table, data, wo){
return bt.csv(table, data, wo);};
bt.csv=function(table, data, wo){
var c, h,
csv=wo.build_type==='csv' || typeof data==='string',
$t=$(table),
lines=csv?data.replace('\r','').split('\n'):data,
len=lines.length,
printedLines=0,
infooter=false,
r=wo.build_headers.rows + (csv?wo.build_csvStartLine:0),
f=wo.build_footers.rows,
headerCount=0,
error='',
items,
tableHTML=bt.build.colgroup( wo.build_headers.widths ) + '<thead>';
$.each(lines, function(n, line){
if( n >=len - f ){ infooter=true;}
if((csv?n >=wo.build_csvStartLine:true) && ( n < r ) ){
h=csv?bt.splitCSV( line, wo.build_csvSeparator ):line;
headerCount=h.length;
tableHTML +=bt.build.header(h, wo);} else if( n >=r ){
if(n===r){
tableHTML +='</thead><tbody>';}
items=csv?bt.splitCSV( line, wo.build_csvSeparator ):line;
if(infooter && f > 0){
tableHTML +=(n===len - f?'</tbody><tfoot>':'') +
(n===len?'</tfoot>':'');}
if(items.length > 1){
printedLines++;
if( items.length !==headerCount ){
error +='error on line ' + n + ': Item count (' + items.length +
') does not match header count (' + headerCount + ') \n';}
c=infooter?wo.build_footers.classes:'';
tableHTML +=bt.build.rows(items, wo.build_footers.text, c, wo, printedLines, infooter);}}});
tableHTML +=(f > 0?'':'</tbody>');
if(error){
$t.html(error);}else{
$t.html(tableHTML);
bt.buildComplete(table, wo);}};
bt.splitCSV=function(str, sep){
var x, tl,
thisCSV=$.trim(str).split(sep=sep || ",");
for ( x=thisCSV.length - 1; x >=0; x-- ){
if( thisCSV[x].replace(/\"\s+$/,'"').charAt(thisCSV[x].length - 1)==='"' ){
if((tl=thisCSV[x].replace(/^\s+\"/,'"')).length > 1 && tl.charAt(0)==='"' ){
thisCSV[x]=thisCSV[x].replace(/^\s*"|"\s*$/g,'').replace(/""/g,'"');} else if(x){
thisCSV.splice(x - 1, 2, [thisCSV[x - 1], thisCSV[x]].join(sep));}else{
thisCSV=thisCSV.shift().split(sep).concat(thisCSV);}}else{
thisCSV[x].replace(/""/g,'"');}}
return thisCSV;};
bt.html=function(table, data, wo){
var $t=$(table);
if( data instanceof jQuery ){
$t.empty().append(data);}else{
$t.html(data);}
bt.buildComplete(table, wo);};
bt.object=function(table, data, wo){
var j, l, t, $c, $t, $tb, $tr,
c=table.config,
kh=wo.build_objectHeaderKey,
kr=wo.build_objectRowKey,
h=data.hasOwnProperty(kh) && !$.isEmptyObject(data.kh)?data.kh:data.hasOwnProperty('headers')?data.headers:false,
r=data.hasOwnProperty(kr) && !$.isEmptyObject(data.kr)?data.kr:data.hasOwnProperty('rows')?data.rows:false;
if(!h || !r || h.length===0 || r.length===0){
if(c.debug){ ts.log('aborting build table widget, missing data for object build');}
return false;}
$c=$('<colgroup>');
$t=$('<table><thead/></table>');
$.each(h, function(i, d){
$tr=$('<tr>').appendTo( $t.find('thead') );
l=d.length;
for ( j=0; j < l; j++ ){
t=bt.build.cell(d[j], wo,'th', j, i===0);
if(t[0] && t[0].length){ t[0].appendTo( $tr );}
if(i===0 && t[1]){ t[1].appendTo( $c );}}});
if($c.find('col[style]').length){
$t.prepend( $c );}
$tb=$('<tbody>');
$.each(r, function(i, d){
var j;
t=$.type(d)==='object';
if(t && d.newTbody){
$tb=$('<tbody>').appendTo( $t );
for (j in d){
if(d.hasOwnProperty(j) && j !=='newTbody'){
$tb.attr(j, d[j]);}}}else{
if(i===0){
$tb.appendTo( $t );}
$tr=$('<tr>').appendTo( $tb );
if(t){
for (j in d){
if(d.hasOwnProperty(j) && j !==wo.build_objectCellKey){
$tr.attr(j, d[j]);}}
if(d.hasOwnProperty(wo.build_objectCellKey)){
d=d.cells;}}
l=d.length;
for ( j=0; j < l; j++ ){
$c=bt.build.cell(d[j], wo,'td', j);
if($c[0] && $c[0].length){ $c[0].appendTo( $tr );}}}});
if(data.hasOwnProperty(wo.build_objectFooterKey)){
t=data[wo.build_objectFooterKey];
if(t==='clone'){
$c=$t.find('thead').html();
$t.append('<tfoot>' + $c + '</tfoot>');}else{
$c=$('<tfoot>').appendTo( $t );
$.each(t, function(i, d){
$tr=$('<tr>').appendTo( $c );
l=d.length;
for ( j=0; j < l; j++ ){
$tb=bt.build.cell(d[j], wo,'th', j);
if($tb[0] && $tb[0].length){ $tb[0].appendTo( $tr );}}});}}
$(table).html( $t.html() );
bt.buildComplete(table, wo);};
bt.ajax=bt.json=function(table, data, wo){
return bt.object(table, data, wo);};})(jQuery);