// @file : /third/tablesorter/js/widgets/widget-output.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
output=ts.output={
event     :'outputTable',
regexQuote:/([\n\t]|<[^<]+>)/,
regexBR   :/(<br([\s\/])?>|\n)/g,
regexIMG  :/<img[^>]+alt\s*=\s*['"]([^'"]+)['"][^>]*>/i,
regexHTML :/<[^<]+>/g,
replaceCR :'\\n',
replaceTab:'\\t',
popupTitle:'Output',
popupStyle:'width:100%;height:100%;',
message   :'Your device does not support downloading. Please try again in desktop browser.',
init:function(c){
c.$table
.off(output.event)
.on(output.event, function(){
output.process(c, c.widgetOptions);});},
processRow: function(c, $rows, isHeader, isJSON){
var $this, row, col, rowlen, collen, txt,
wo=c.widgetOptions,
tmpRow=[],
dupe=wo.output_duplicateSpans,
addSpanIndex=isHeader && isJSON && wo.output_headerRows && $.isFunction(wo.output_callbackJSON),
cellIndex=0;
$rows.each(function(rowIndex){
if(!tmpRow[rowIndex]){ tmpRow[rowIndex]=[];}
cellIndex=0;
$(this).children().each(function(){
$this=$(this);
if($this.filter('[rowspan]').length){
rowlen=parseInt( $this.attr('rowspan'), 10) - 1;
txt=output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
for (row=1; row <=rowlen; row++){
if(!tmpRow[rowIndex + row]){ tmpRow[rowIndex + row]=[];}
tmpRow[rowIndex + row][cellIndex]=isHeader?txt:dupe?txt:'';}}
if($this.filter('[colspan]').length){
collen=parseInt( $this.attr('colspan'), 10) - 1;
txt=output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
for (col=1; col <=collen; col++){
if($this.filter('[rowspan]').length){
rowlen=parseInt( $this.attr('rowspan'), 10);
for (row=0; row < rowlen; row++){
if(!tmpRow[rowIndex + row]){ tmpRow[rowIndex + row]=[];}
tmpRow[rowIndex + row][cellIndex + col]=addSpanIndex ?
wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')':isHeader?txt:dupe?txt:'';}}else{
tmpRow[rowIndex][cellIndex + col]=addSpanIndex ?
wo.output_callbackJSON($this, txt, cellIndex + col) || txt + '(' + (cellIndex + col) + ')':isHeader?txt:dupe?txt:'';}}}
if( $this.css('display') !=='none' ){
while (typeof tmpRow[rowIndex][cellIndex] !=='undefined'){ cellIndex++;}
tmpRow[rowIndex][cellIndex]=tmpRow[rowIndex][cellIndex] ||
output.formatData( wo, $this.attr(wo.output_dataAttrib) || $this.html(), isHeader );
cellIndex++;}});});
return tmpRow;},
ignoreColumns:function(wo, data){
$.each( data, function(indx, val){
data[indx]=$.grep(val, function(v, cellIndx){
return $.inArray(cellIndx, wo.output_ignoreColumns) < 0;});});
return data;},
process:function(c, wo){
var mydata, $this, $rows, headers, csvData, len,
hasStringify=window.JSON && JSON.hasOwnProperty('stringify'),
indx=0,
tmpData=(wo.output_separator || ',').toLowerCase(),
outputJSON=tmpData==='json',
outputArray=tmpData==='array',
separator=outputJSON || outputArray?',':wo.output_separator,
$el=c.$table;
wo.output_regex=new RegExp('(' + (/\\/.test(separator)?'\\':'' ) + separator + ')' );
$this=$el.find('thead tr:visible').not('.' + (ts.css.filterRow || 'tablesorter-filter-row') );
headers=output.processRow(c, $this, true, outputJSON);
$rows=$el.children('tbody').children('tr');
$rows=/f/.test(wo.output_saveRows)?$rows.not('.' + (wo.filter_filteredRow || 'filtered') ) :
/v/.test(wo.output_saveRows)?$rows.filter(':visible'):$rows;
csvData=output.processRow(c, $rows);
len=headers.length;
if(wo.output_ignoreColumns.length){
headers=output.ignoreColumns(wo, headers);
csvData=output.ignoreColumns(wo, csvData);}
if(outputJSON){
tmpData=[];
$.each( csvData, function(indx, val){
tmpData.push( output.row2Hash( headers[ (len > 1 && wo.output_headerRows)?indx % len:len - 1], val ) );});
mydata=hasStringify?JSON.stringify(tmpData):tmpData;}else{
tmpData=output.row2CSV(wo, wo.output_headerRows?headers:[ headers[ (len > 1 && wo.output_headerRows)?indx % len:len - 1] ], outputArray)
.concat( output.row2CSV(wo, csvData, outputArray) );
mydata=outputArray && hasStringify?JSON.stringify(tmpData):tmpData.join('\n');}
if($.isFunction(wo.output_callback) && !wo.output_callback(c, mydata)){ return;}
if( /p/.test((wo.output_delivery || '').toLowerCase() ) ){
output.popup(mydata, wo.output_popupStyle, outputJSON || outputArray);}else{
output.download(wo, mydata);}},
row2CSV:function(wo, tmpRow, outputArray){
var tmp, rowIndex,
csvData=[],
rowLen=tmpRow.length;
for (rowIndex=0; rowIndex < rowLen; rowIndex++){
tmp=tmpRow[rowIndex].join('').replace(/\"/g,'');
if(tmpRow[rowIndex].length > 0 && tmp !==''){
csvData[csvData.length]=outputArray?tmpRow[rowIndex]:tmpRow[rowIndex].join(wo.output_separator);}}
return csvData;},
row2Hash:function(keys, values){
var json={};
$.each(values, function(indx, val){
if( indx < keys.length ){
json[ keys[indx] ]=val;}});
return json;},
formatData:function(wo, input, isHeader){
var txt,
quotes=(wo.output_separator || ',').toLowerCase(),
separator=quotes==='json' || quotes==='array',
result=input.replace(/\"/g, wo.output_replaceQuote || '\u201c');
result=result.replace(output.regexBR, output.replaceCR).replace(/\t/g, output.replaceTab);
txt=result.match(output.regexIMG);
if(!wo.output_includeHTML && txt !==null){
result=txt[1];}
result=wo.output_includeHTML && !isHeader?result:result.replace(output.regexHTML,'');
result=wo.output_trimSpaces || isHeader?$.trim(result):result;
quotes=separator?false:wo.output_wrapQuotes || wo.output_regex.test(result) || output.regexQuote.test(result);
return quotes?'"' + result + '"':result;},
popup:function(data, style, wrap){
var generator=window.open('', output.popupTitle, style);
generator.document.write(
'<html><head><title>' + output.popupTitle + '</title></head><body>' +
'<textarea wrap="' + (wrap?'on':'off') + '" style="' + output.popupStyle + '">' + data + '\n</textarea>' +
'</body></html>'
);
generator.document.close();
generator.focus();
return true;},
download:function (wo, data){
var e, blob, gotBlob,
nav=window.navigator,
link=document.createElement('a');
if(/(iP)/g.test(nav.userAgent)){
alert(output.message);
return false;}
try {
gotBlob=!!new Blob();} catch (err){
gotBlob=false;}
if( gotBlob ){
window.URL=window.webkitURL || window.URL;
blob=new Blob([data], {type: wo.output_encoding});
if(nav.msSaveBlob){
nav.msSaveBlob(blob, wo.output_saveFileName);}else{
link.href=window.URL.createObjectURL(blob);
link.download=wo.output_saveFileName;
if(document.createEvent){
e=document.createEvent('MouseEvents');
e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
link.dispatchEvent(e);}}
return false;}
window.open( wo.output_encoding + encodeURIComponent(data) + '?download' ,'_self');
return true;},
remove:function(c){
c.$table.off(output.event);}};
ts.addWidget({
id: "output",
options: {
output_separator    :',',
output_ignoreColumns:[],
output_dataAttrib   :'data-name',
output_headerRows   :false,
output_delivery     :'popup',
output_saveRows     :'filtered',
output_duplicateSpans: true,
output_replaceQuote :'\u201c;',
output_includeHTML  :false,
output_trimSpaces   :true,
output_wrapQuotes   :false,
output_popupStyle   :'width=500,height=300',
output_saveFileName :'mytable.csv',
output_callback     :function(config, data){ return true;},
output_callbackJSON :function($cell, txt, cellIndex){ return txt + '(' + (cellIndex) + ')';},
output_encoding     :'data:application/octet-stream;charset=utf8,'
},
init: function(table, thisWidget, c){
output.init(c);},
remove: function(table, c){
output.remove(c);}});})(jQuery);