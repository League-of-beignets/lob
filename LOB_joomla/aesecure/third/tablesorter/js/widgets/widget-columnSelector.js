// @file : /third/tablesorter/js/widgets/widget-columnSelector.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
namespace='.tscolsel',
tsColSel=ts.columnSelector={
queryAll  :'@media only all { [columns] { display: none;} } ',
queryBreak:'@media all and (min-width: [size]){ [columns] { display: table-cell;} } ',
init: function(table, c, wo){
var $t, colSel;
$t=$(wo.columnSelector_layout);
if(!$t.find('input').add( $t.filter('input') ).length){
if(c.debug){
ts.log('*** ERROR: Column Selector aborting, no input found in the layout! ***');}
return;}
c.tableId='tablesorter' + new Date().getTime();
c.$table.addClass( c.tableId );
colSel=c.selector={ $container:$(wo.columnSelector_container || '<div>') };
colSel.$style=$('<style></style>').prop('disabled', true).appendTo('head');
colSel.$breakpoints=$('<style></style>').prop('disabled', true).appendTo('head');
colSel.isInitializing=true;
tsColSel.setupSelector(table, c, wo);
if(wo.columnSelector_mediaquery){
tsColSel.setupBreakpoints(c, wo);}
colSel.isInitializing=false;
if(colSel.$container.length){
tsColSel.updateCols(c, wo);}
c.$table
.off('refreshColumnSelector' + namespace)
.on('refreshColumnSelector' + namespace, function(){
var c=this.config;
tsColSel.updateBreakpoints(c, c.widgetOptions);
tsColSel.updateCols(c, c.widgetOptions);});},
setupSelector: function(table, c, wo){
var name,
colSel=c.selector,
$container=colSel.$container,
useStorage=wo.columnSelector_saveColumns && ts.storage,
saved=useStorage?ts.storage( table,'tablesorter-columnSelector' ):[],
state=useStorage?ts.storage( table,'tablesorter-columnSelector-auto'):{};
colSel.auto=$.isEmptyObject(state) || $.type(state.auto) !=="boolean"?wo.columnSelector_mediaqueryState:state.auto;
colSel.states=[];
colSel.$column=[];
colSel.$wrapper=[];
colSel.$checkbox=[];
c.$table.children('thead').find('tr:first th', table).each(function(){
var $this=$(this),
priority=$this.attr(wo.columnSelector_priority) || 1,
colId=$this.attr('data-column'),
state=ts.getData(this, c.headers[colId],'columnSelector');
if( isNaN(priority) && priority.length > 0 || state==='disable' ||
( wo.columnSelector_columns[colId] && wo.columnSelector_columns[colId]==='disable') ){
return true;}
colSel.states[colId]=saved && typeof(saved[colId]) !=='undefined' ?
saved[colId]:typeof(wo.columnSelector_columns[colId]) !=='undefined' ?
wo.columnSelector_columns[colId]:(state==='true' || !(state==='false'));
colSel.$column[colId]=$(this);
name=$this.attr(wo.columnSelector_name) || $this.text();
if($container.length){
colSel.$wrapper[colId]=$(wo.columnSelector_layout.replace(/\{name\}/g, name)).appendTo($container);
colSel.$checkbox[colId]=colSel.$wrapper[colId]
.find('input').add( colSel.$wrapper[colId].filter('input') )
.attr('data-column', colId)
.prop('checked', colSel.states[colId])
.on('change', function(){
colSel.states[colId]=this.checked;
tsColSel.updateCols(c, wo);}).change();}});},
setupBreakpoints: function(c, wo){
var colSel=c.selector;
if(wo.columnSelector_mediaquery){
colSel.lastIndex=-1;
tsColSel.updateBreakpoints(c, wo);
c.$table
.off('updateAll' + namespace)
.on('updateAll' + namespace, function(){
tsColSel.updateBreakpoints(c, wo);
tsColSel.updateCols(c, wo);});}
if(colSel.$container.length){
if(wo.columnSelector_mediaquery){
colSel.$auto=$( wo.columnSelector_layout.replace(/\{name\}/g, wo.columnSelector_mediaqueryName) ).prependTo(colSel.$container);
colSel.$auto
.find('input').add( colSel.$auto.filter('input') )
.attr('data-column','auto')
.prop('checked', colSel.auto)
.on('change', function(){
colSel.auto=this.checked;
$.each( colSel.$checkbox, function(i, $cb){
if($cb){
$cb[0].disabled=colSel.auto;
colSel.$wrapper[i].toggleClass('disabled', colSel.auto);}});
if(wo.columnSelector_mediaquery){
tsColSel.updateBreakpoints(c, wo);}
tsColSel.updateCols(c, wo);
if(c.selector.$popup){
c.selector.$popup.find('.tablesorter-column-selector')
.html( colSel.$container.html() )
.find('input').each(function(){
var indx=$(this).attr('data-column');
$(this).prop( 'checked', indx==='auto'?colSel.auto:colSel.states[indx] );});}
if(wo.columnSelector_saveColumns && ts.storage){
ts.storage( c.$table[0],'tablesorter-columnSelector-auto', { auto:colSel.auto } );}}).change();}
c.$table.off('update' + namespace).on('update' + namespace, function(){
tsColSel.updateCols(c, wo);});}},
updateBreakpoints: function(c, wo){
var priority, column, breaks,
colSel=c.selector,
prefix='.' + c.tableId,
mediaAll=[],
breakpts='';
if(wo.columnSelector_mediaquery && !colSel.auto){
colSel.$breakpoints.prop('disabled', true);
colSel.$style.prop('disabled', false);
return;}
for (priority=0; priority < 6; priority++){
breaks=[];
c.$headers.filter('[' + wo.columnSelector_priority + '=' + (priority + 1) + ']').each(function(){
column=parseInt($(this).attr('data-column'), 10) + 1;
breaks.push(prefix + ' col:nth-child(' + column + ')');
breaks.push(prefix + ' tr th:nth-child(' + column + ')');
breaks.push(prefix + ' tr td:nth-child(' + column + ')');});
if(breaks.length){
mediaAll=mediaAll.concat( breaks );
breakpts +=tsColSel.queryBreak
.replace(/\[size\]/g, wo.columnSelector_breakpoints[priority])
.replace(/\[columns\]/g, breaks.join(','));}}
if(colSel.$style){
colSel.$style.prop('disabled', true);}
if(mediaAll.length){
colSel.$breakpoints
.prop('disabled', false)
.html( tsColSel.queryAll.replace(/\[columns\]/g, mediaAll.join(',')) + breakpts );}},
updateCols: function(c, wo){
if(wo.columnSelector_mediaquery && c.selector.auto || c.selector.isInitializing){
return;}
var column,
colSel=c.selector,
styles=[],
prefix='.' + c.tableId;
colSel.$container.find('input[data-column]').filter('[data-column!="auto"]').each(function(){
if(!this.checked){
column=parseInt( $(this).attr('data-column'), 10 ) + 1;
styles.push(prefix + ' col:nth-child(' + column + ')');
styles.push(prefix + ' tr th:nth-child(' + column + ')');
styles.push(prefix + ' tr td:nth-child(' + column + ')');}});
if(wo.columnSelector_mediaquery){
colSel.$breakpoints.prop('disabled', true);}
if(colSel.$style){
colSel.$style.prop('disabled', false).html( styles.length?styles.join(',') + ' { display: none;}':'' );}
if(wo.columnSelector_saveColumns && ts.storage){
ts.storage( c.$table[0],'tablesorter-columnSelector', colSel.states );}},
attachTo:function(table, elm){
table=$(table)[0];var colSel, wo, indx,
c=table.config,
$popup=$(elm);
if($popup.length && c){
if(!$popup.find('.tablesorter-column-selector').length){
$popup.append('<span class="tablesorter-column-selector"></span>');}
colSel=c.selector;
wo=c.widgetOptions;
$popup.find('.tablesorter-column-selector')
.html( colSel.$container.html() )
.find('input').each(function(){
var indx=$(this).attr('data-column');
$(this).prop( 'checked', indx==='auto'?colSel.auto:colSel.states[indx] );});
colSel.$popup=$popup.on('change','input', function(){
indx=$(this).attr('data-column');
colSel.$container.find('input[data-column="' + indx + '"]')
.prop('checked', this.checked)
.trigger('change');});}}};
ts.addWidget({
id: "columnSelector",
priority: 10,
options: {
columnSelector_container:null,
columnSelector_columns:{},
columnSelector_saveColumns: true,
columnSelector_layout:'<label><input type="checkbox">{name}</label>',
columnSelector_name :'data-selector-name',
columnSelector_mediaquery: true,
columnSelector_mediaqueryName: 'Auto: ',
columnSelector_mediaqueryState: true,
columnSelector_breakpoints:[ '20em','30em','40em','50em','60em','70em' ],
columnSelector_priority:'data-priority'
},
init: function(table, thisWidget, c, wo){
tsColSel.init(table, c, wo);},
remove: function(table, c){
var csel=c.selector;
csel.$container.empty();
if(csel.$popup){ csel.$popup.empty();}
csel.$style.remove();
csel.$breakpoints.remove();
c.$table.off('updateAll' + namespace + ' update' + namespace);}});})(jQuery);