// @file : /third/tablesorter/js/widgets/widget-reflow.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
tablereflow={
init:function(table, c, wo){
var $this,
title=wo.reflow_dataAttrib,
header=wo.reflow_headerAttrib,
headers=[];
c.$table
.addClass(wo.reflow_className)
.off('refresh.tsreflow updateComplete.tsreflow2')
.on('refresh.tsreflow updateComplete.tsreflow2', function(){
tablereflow.init(table, c, wo);});
c.$headers.each(function(){
$this=$(this);
headers.push( $this.attr(header) || $this.text() );});
c.$tbodies.children().each(function(){
$(this).children().each(function(i){
$(this).attr(title, headers[i]);});});},
init2: function(table, c, wo){
var $this, $tbody, i, $hdr, txt, len,
cols=c.columns,
header=wo.reflow2_headerAttrib,
headers=[];
c.$table
.addClass(wo.reflow2_className)
.off('refresh.tsreflow2 updateComplete.tsreflow2')
.on('refresh.tsreflow2 updateComplete.tsreflow2', function(){
tablereflow.init2(table, c, wo);});
for (i=0; i < cols; i++){
$hdr=c.$headers.filter('[data-column="' + i + '"]');
if($hdr.length > 1){
txt=[];
$hdr.each(function(){
$this=$(this);
if(!$this.hasClass(wo.reflow2_classIgnore)){
txt.push( $this.attr(header) || $this.text() );}});}else{
txt=[ $hdr.attr(header) || $hdr.text() ];}
headers.push( txt );}
txt='<b class="' + c.selectorRemove.slice(1) + ' ' + wo.reflow2_labelClass;
c.$tbodies.children().each(function(){
$tbody=ts.processTbody(table, $(this), true);
$tbody.children().each(function(j){
$this=$(this);
len=headers[j].length
i=len - 1;
while (i >=0){
$this.prepend(txt + (i===0 && len > 1?' ' + wo.reflow2_labelTop:'') + '">' + headers[j][i] + '</b>');
i--;}});
ts.processTbody(table, $tbody, false);});},
remove:function(table, c, wo){
c.$table.removeClass(wo.reflow_className);},
remove2:function(table, c, wo){
c.$table.removeClass(wo.reflow2_className);}};
ts.addWidget({
id: "reflow",
options: {
reflow_className   :'ui-table-reflow',
reflow_headerAttrib:'data-name',
reflow_dataAttrib  :'data-title'
},
init: function(table, thisWidget, c, wo){
tablereflow.init(table, c, wo);},
remove: function(table, c, wo){
tablereflow.remove(table, c, wo);}});
ts.addWidget({
id: "reflow2",
options: {
reflow2_className   :'ui-table-reflow',
reflow2_classIgnore :'ui-table-reflow-ignore',
reflow2_headerAttrib:'data-name',
reflow2_labelClass  :'ui-table-cell-label',
reflow2_labelTop    :'ui-table-cell-label-top'
},
init: function(table, thisWidget, c, wo){
tablereflow.init2(table, c, wo);},
remove: function(table, c, wo){
tablereflow.remove2(table, c, wo);}});})(jQuery);