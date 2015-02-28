// @file : /third/tablesorter/js/widgets/widget-print.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
printTable=ts.printTable={
event     :'printTable',
basicStyle:'table, tr, td, th { border:solid 1px black; border-collapse:collapse;} td, th { padding: 2px;}',
init:function(c){
c.$table
.unbind(printTable.event)
.bind(printTable.event, function(){
printTable.process(c, c.widgetOptions);});},
process:function(c, wo){
var $this,
$table=$('<div/>').append(c.$table.clone()),
printStyle=printTable.basicStyle + 'table { width: 100% }' +
'.tablesorter-filter-row { display: none }' +
'.tablesorter-header { background-image: none !important;}';
$table.find('[' + wo.print_dataAttrib + ']').each(function(){
$this=$(this);
$this.text( $this.attr(wo.print_dataAttrib) );});
if(/a/i.test(wo.print_rows)){
printStyle +='tbody tr { display: table-row !important;}';} else if(/f/i.test(wo.print_rows)){
printStyle +='tbody tr:not(.' + (wo.filter_filteredRow || 'filtered') + '){ display: table-row !important;}';}
if(/s/i.test(wo.print_columns) && c.selector && c.widgets.indexOf('columnSelector') >=0){
printStyle +=c.selector.auto?'':c.selector.$style.text();} else if(/a/i.test(wo.print_columns)){
printStyle +='td, th { display: table-cell !important;}';}
printStyle +=wo.print_extraCSS;
if( $.isFunction(wo.print_callback) ){
wo.print_callback( c, $table, printStyle );}else{
printTable.printOutput(c, $table.html(), printStyle);}},
printOutput:function(c, data, style){
var wo=c.widgetOptions,
generator=window.open('', wo.print_title,'width=500,height=300'),
t=wo.print_title || c.$table.find('caption').text() || c.$table[0].id || document.title || 'table';
generator.document.write(
'<html><head><title>' + t + '</title>' +
( wo.print_styleSheet?'<link rel="stylesheet" href="' + wo.print_styleSheet + '">':'' ) +
'<style>' + style + '</style>' +
'</head><body>' + data + '</body></html>'
);
generator.document.close();
generator.print();
generator.close();
return true;},
remove:function(c){
c.$table.off(printTable.event);}};
ts.addWidget({
id: 'print',
options: {
print_title     :'',
print_dataAttrib:'data-name',
print_rows      :'filtered',
print_columns   :'selected',
print_extraCSS  :'',
print_styleSheet:'',
print_callback  :null
},
init: function(table, thisWidget, c){
printTable.init(c);},
remove: function(table, c){
printTable.remove(c);}});})(jQuery);