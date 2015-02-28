// @file : /third/tablesorter/js/parsers/parser-input-select.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var resort=true,
updateServer=function(event, $table, $input){
};
$.tablesorter.addParser({
id: "inputs",
is: function(){
return false;},
format: function(s, table, cell){
return $(cell).find('input').val() || s;},
parsed:true,
type: "text"
});
$.tablesorter.addParser({
id: "checkbox",
is: function(){
return false;},
format: function(s, table, cell, cellIndex){
var $c=$(cell),
$input=$c.find('input[type="checkbox"]'),
isChecked=$input.length?$input[0].checked:'';
$c.closest('tr').toggleClass('checked-' + cellIndex, isChecked);
return $input.length?isChecked?'checked':'unchecked':s;},
parsed:true,
type: "text"
});
$.tablesorter.addParser({
id: "select",
is: function(){
return false;},
format: function(s, table, cell){
return $(cell).find('select').val() || s;},
parsed:true,
type: "text"
});
$.tablesorter.addParser({
id: "select-text",
is: function(){
return false;},
format: function(s, table, cell){
var $s=$(cell).find('select');
return $s.length?$s.find('option:selected').text() || '':s;},
parsed:true,
type: "text"
});
$.tablesorter.addParser({
id: "textarea",
is: function(){
return false;},
format: function(s, table, cell){
return $(cell).find('textarea').val() || s;},
parsed:true,
type: "text"
});
$(function(){
$('table').on('tablesorter-initialized', function(){
var focused=false,
restoreValue=function(isTbody){
if(isTbody){
$(':focus').blur();}
return;};
$(this).children('tbody')
.on('mouseleave', function(e){
restoreValue(e.target.tagName==='TBODY');})
.on('focus','select, input, textarea', function(){
focused=true;
$(this).data('ts-original-value', this.value);})
.on('blur','input, textarea', function(){
this.value=$(this).data('ts-original-value');})
.on('change keyup','select, input, textarea', function(e){
if( e.which===27 ){
this.value=$(this).data('ts-original-value');
return;}
if(( e.type==='change' && focused ) ||
( e.type==='keyup' && e.which===13 && ( e.target.tagName==='INPUT' || e.target.tagName==='TEXTAREA' && e.altKey ) ) ){
var $tar=$(e.target),
$cell=$tar.closest('td'),
$table=$cell.closest('table'),
indx=$cell[0].cellIndex,
c=$table[0].config || false,
$hdr=c && c.$headers && c.$headers.eq(indx);
if( !c || ( $hdr && $hdr.length && ( $hdr.hasClass('parser-false') || ( $hdr.hasClass('sorter-false') && $hdr.hasClass('filter-false') ) ) ) ){
return restoreValue();}
if($tar.val() !==$tar.data('ts-original-value')){
$tar.data('ts-original-value', $tar.val());
$table.trigger('updateCell', [ $tar.closest('td'), resort, function(){
updateServer(e, $table, $tar);
setTimeout(function(){ focused=false;}, 10);} ]);}}});});});})(jQuery);