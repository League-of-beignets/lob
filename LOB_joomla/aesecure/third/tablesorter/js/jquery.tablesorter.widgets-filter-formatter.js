// @file : /third/tablesorter/js/jquery.tablesorter.widgets-filter-formatter.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter || {},
compareSelect='.compare-select',
tsff=ts.filterFormatter={
addCompare: function($cell, indx, options){
if(options.compare && $.isArray(options.compare) && options.compare.length > 1){
var opt='',
compareSelectClass=[ compareSelect.slice(1),' ' + compareSelect.slice(1),'' ],
txt=options.cellText?'<label class="' + compareSelectClass.join('-label') + indx + '">' + options.cellText + '</label>':'';
$.each(options.compare, function(i, c){
opt +='<option ' + (options.selected===i?'selected':'') + '>' + c + '</option>';});
$cell
.wrapInner('<div class="' + compareSelectClass.join('-wrapper') + indx + '" />')
.prepend( txt + '<select class="' + compareSelectClass.join('') + indx + '" />' )
.find('select')
.append(opt);}},
updateCompare:function($cell, $input, o){
var val=$input.val() || '',
num=val.replace(/\s*?[><=]\s*?/g,''),
compare=val.match(/[><=]/g) || '';
if(o.compare){
if($.isArray(o.compare)){
compare=(compare || []).join('') || o.compare[o.selected || 0];}
$cell.find(compareSelect).val( compare );}
return [ val, num ];},
uiSpinner: function($cell, indx, spinnerDef){
var o=$.extend({
delayed:true,
addToggle:true,
exactMatch:true,
value:1,
cellText:'',
compare:'',
min:0,
max:100,
step:1,
disabled:false
}, spinnerDef ),
c=$cell.closest('table')[0].config,
$input=$('<input class="filter" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
updateSpinner({ value: this.value, delayed: false });}),
$shcell=[],
updateSpinner=function(ui, notrigger){
var chkd=true, state,
v=ui && ui.value && ts.formatFloat((ui.value + '').replace(/[><=]/g,'')) ||
$cell.find('.spinner').val() || o.value,
compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '',
searchType=ui && typeof ui.delayed==='boolean'?ui.delayed:c.$table[0].hasInitialized?o.delayed || '':true;
if(o.addToggle){
chkd=$cell.find('.toggle').is(':checked');}
state=o.disabled || !chkd?'disable':'enable';
$cell.find('.filter')
.val( chkd?(compare?compare:o.exactMatch?'=':'') + v:'' )
.trigger( notrigger?'':'search', searchType ).end()
.find('.spinner').spinner(state).val(v);
if($shcell.length){
$shcell
.find('.spinner').spinner(state).val(v).end()
.find(compareSelect).val( compare );
if(o.addToggle){
$shcell.find('.toggle')[0].checked=chkd;}}};
o.oldcreate=o.create;
o.oldspin=o.spin;
o.create=function(event, ui){
updateSpinner();
if(typeof o.oldcreate==='function'){ o.oldcreate(event, ui);}};
o.spin =function(event, ui){
updateSpinner(ui);
if(typeof o.oldspin==='function'){ o.oldspin(event, ui);}};
if(o.addToggle){
$('<div class="button"><input id="uispinnerbutton' + indx + '" type="checkbox" class="toggle" />' +
'<label for="uispinnerbutton' + indx + '"></label></div>')
.appendTo($cell)
.find('.toggle')
.bind('change', function(){
updateSpinner();});}
$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
$('<input class="spinner spinner' + indx + '" />')
.val(o.value)
.appendTo($cell)
.spinner(o)
.bind('change keyup', function(){
updateSpinner();});
c.$table.bind('filterFomatterUpdate', function(){
var val=tsff.updateCompare($cell, $input, o)[0];
$cell.find('.spinner').val( val );
updateSpinner({ value: val }, true);
ts.filter.formatterUpdated($cell, indx);});
if(o.compare){
tsff.addCompare($cell, indx, o);
$cell.find(compareSelect).bind('change', function(){
updateSpinner();});}
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
if(o.addToggle){
$('<div class="button"><input id="stickyuispinnerbutton' + indx + '" type="checkbox" class="toggle" />' +
'<label for="stickyuispinnerbutton' + indx + '"></label></div>')
.appendTo($shcell)
.find('.toggle')
.bind('change', function(){
$cell.find('.toggle')[0].checked=this.checked;
updateSpinner();});}
$('<input class="spinner spinner' + indx + '" />')
.val(o.value)
.appendTo($shcell)
.spinner(o)
.bind('change keyup', function(){
$cell.find('.spinner').val( this.value );
updateSpinner();});
if(o.compare){
tsff.addCompare($shcell, indx, o);
$shcell.find(compareSelect).bind('change', function(){
$cell.find(compareSelect).val( $(this).val() );
updateSpinner();});}});
c.$table.bind('filterReset', function(){
if($.isArray(o.compare)){
$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );}
if(o.addToggle){
$cell.find('.toggle')[0].checked=false;}
$cell.find('.spinner').spinner('value', o.value);
setTimeout(function(){
updateSpinner();}, 0);});
updateSpinner();
return $input;},
uiSlider: function($cell, indx, sliderDef){
var o=$.extend({
delayed:true,
valueToHeader:false,
exactMatch:true,
cellText:'',
compare:'',
allText:'all',
value:0,
min:0,
max:100,
step:1,
range:"min"
}, sliderDef ),
c=$cell.closest('table')[0].config,
$input=$('<input class="filter" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
updateSlider({ value: this.value });}),
$shcell=[],
updateSlider=function(ui, notrigger){
var v=typeof ui !=="undefined"?ts.formatFloat((ui.value + '').replace(/[><=]/g,'')) || o.value:o.value,
val=o.compare?v:v===o.min?o.allText:v,
compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '',
result=compare + val,
searchType=ui && typeof ui.delayed==='boolean'?ui.delayed:c.$table[0].hasInitialized?o.delayed || '':true;
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + result + ')');}else{
$cell.find('.ui-slider-handle').addClass('value-popup').attr('data-value', result);}
$cell.find('.filter')
.val(( compare?compare + v:v===o.min?'':(o.exactMatch?'=':'') + v ) )
.trigger( notrigger?'':'search', searchType ).end()
.find('.slider').slider('value', v);
if($shcell.length){
$shcell
.find(compareSelect).val( compare ).end()
.find('.slider').slider('value', v);
if(o.valueToHeader){
$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(' (' + result + ')');}else{
$shcell.find('.ui-slider-handle').addClass('value-popup').attr('data-value', result);}}};
$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curvalue" />');}
o.oldcreate=o.create;
o.oldslide=o.slide;
o.create=function(event, ui){
updateSlider();
if(typeof o.oldcreate==='function'){ o.oldcreate(event, ui);}};
o.slide =function(event, ui){
updateSlider(ui);
if(typeof o.oldslide==='function'){ o.oldslide(event, ui);}};
$('<div class="slider slider' + indx + '"/>')
.appendTo($cell)
.slider(o);
c.$table.bind('filterFomatterUpdate', function(){
var val=tsff.updateCompare($cell, $input, o)[0];
$cell.find('.slider').slider('value', val );
updateSlider({ value: val }, false);
ts.filter.formatterUpdated($cell, indx);});
if(o.compare){
tsff.addCompare($cell, indx, o);
$cell.find(compareSelect).bind('change', function(){
updateSlider({ value: $cell.find('.slider').slider('value') });});}
c.$table.bind('filterReset', function(){
if($.isArray(o.compare)){
$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );}
setTimeout(function(){
updateSlider({ value: o.value });}, 0);});
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$('<div class="slider slider' + indx + '"/>')
.val(o.value)
.appendTo($shcell)
.slider(o)
.bind('change keyup', function(){
$cell.find('.slider').slider('value', this.value );
updateSlider();});
if(o.compare){
tsff.addCompare($shcell, indx, o);
$shcell.find(compareSelect).bind('change', function(){
$cell.find(compareSelect).val( $(this).val() );
updateSlider();});}});
return $input;},
uiRange: function($cell, indx, rangeDef){
var o=$.extend({
delayed:true,
valueToHeader:false,
values:[0, 100],
min:0,
max:100,
range:true
}, rangeDef ),
c=$cell.closest('table')[0].config,
$input=$('<input class="filter" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
getRange();}),
$shcell=[],
getRange=function(){
var val=$input.val(),
v=val.split(' - ');
if(val===''){ v=[ o.min, o.max ];}
if(v && v[1]){
updateUiRange({ values: v, delay: false }, true);}},
updateUiRange=function(ui, notrigger){
var val=ui && ui.values || o.values,
result=val[0] + ' - ' + val[1],
range=val[0]===o.min && val[1]===o.max?'':result,
searchType=ui && typeof ui.delayed==='boolean'?ui.delayed:c.$table[0].hasInitialized?o.delayed || '': true;
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.currange').html(' (' + result + ')');}else{
$cell.find('.ui-slider-handle')
.addClass('value-popup')
.eq(0).attr('data-value', val[0]).end()
.eq(1).attr('data-value', val[1]);}
$cell.find('.filter').val(range)
.trigger(notrigger?'':'search', searchType).end()
.find('.range').slider('values', val);
if($shcell.length){
$shcell.find('.range').slider('values', val);
if(o.valueToHeader){
$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.currange').html(' (' + result + ')');}else{
$shcell.find('.ui-slider-handle')
.addClass('value-popup')
.eq(0).attr('data-value', val[0]).end()
.eq(1).attr('data-value', val[1]);}}};
$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="currange"/>');}
o.oldcreate=o.create;
o.oldslide=o.slide;
o.create=function(event, ui){
updateUiRange();
if(typeof o.oldcreate==='function'){ o.oldcreate(event, ui);}};
o.slide =function(event, ui){
updateUiRange(ui);
if(typeof o.oldslide==='function'){ o.oldslide(event, ui);}};
$('<div class="range range' + indx +'"/>')
.appendTo($cell)
.slider(o);
c.$table.bind('filterFomatterUpdate', function(){
getRange();
ts.filter.formatterUpdated($cell, indx);});
c.$table.bind('filterReset', function(){
$cell.find('.range').slider('values', o.values);
setTimeout(function(){
updateUiRange();}, 0);});
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$('<div class="range range' + indx + '"/>')
.val(o.value)
.appendTo($shcell)
.slider(o)
.bind('change keyup', function(){
$cell.find('.range').val( this.value );
updateUiRange();});});
return $input;},
uiDateCompare: function($cell, indx, defDate){
var o=$.extend({
cellText:'',
compare:'',
endOfDay:true,
defaultDate:'',
changeMonth:true,
changeYear:true,
numberOfMonths:1
}, defDate),
$date,
c=$cell.closest('table')[0].config,
$hdr=$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed'),
$input=$('<input class="dateCompare" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
var v=this.value;
if(v){
o.onClose(v);}}),
t, $shcell=[],
date1Compare=function(notrigger){
var date, query,
getdate=$date.datepicker('getDate') || '',
compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '',
searchType=c.$table[0].hasInitialized?o.delayed || '': true;
$date.datepicker('setDate', (getdate===''?'':getdate) || null);
if(getdate===''){ notrigger=false;}
date=$date.datepicker('getDate');
query=date?( o.endOfDay && /<=/.test(compare)?date.setHours(23, 59, 59):date.getTime() ) || '':'';
if(date && o.endOfDay && compare==='='){
compare='';
query +=' - ' + date.setHours(23, 59, 59);
notrigger=false;}
$cell.find('.dateCompare')
.val(compare + query)
.trigger( notrigger?'':'search', searchType ).end();
if($shcell.length){
$shcell
.find('.dateCompare').val(compare + query).end()
.find(compareSelect).val(compare);}};
t='<input type="text" class="date date' + indx + '" placeholder="' +
($hdr.data('placeholder') || $hdr.attr('data-placeholder') || c.widgetOptions.filter_placeholder.search || '') + '" />';
$date=$(t).appendTo($cell);
o.oldonClose=o.onClose;
o.onClose=function( selectedDate, ui ){
date1Compare();
if(typeof o.oldonClose==='function'){ o.oldonClose(selectedDate, ui);}};
$date.datepicker(o);
c.$table.bind('filterReset', function(){
if($.isArray(o.compare)){
$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );}
$cell.add($shcell).find('.date').val(o.defaultDate).datepicker('setDate', o.defaultDate || null);
setTimeout(function(){
date1Compare();}, 0);});
c.$table.bind('filterFomatterUpdate', function(){
var num, v=$input.val();
if(/\s+-\s+/.test(v)){
$cell.find(compareSelect).val('=');
num=v.split(/\s+-\s+/)[0];
$date.datepicker( 'setDate', num || null );}else{
num=(tsff.updateCompare($cell, $input, o)[1]).toString() || '';
num=num !==''?/\d{5}/g.test(num)?new Date(Number(num)):num || '':'';}
$cell.add($shcell).find('.date').datepicker( 'setDate', num || null );
setTimeout(function(){
date1Compare(true);
ts.filter.formatterUpdated($cell, indx);}, 0);});
if(o.compare){
tsff.addCompare($cell, indx, o);
$cell.find(compareSelect).bind('change', function(){
date1Compare();});}
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$shcell
.append(t)
.find('.date')
.datepicker(o);
if(o.compare){
tsff.addCompare($shcell, indx, o);
$shcell.find(compareSelect).bind('change', function(){
$cell.find(compareSelect).val( $(this).val() );
date1Compare();});}});
return $input.val( o.defaultDate?o.defaultDate:'' );},
uiDatepicker: function($cell, indx, defDate){
var o=$.extend({
endOfDay:true,
textFrom:'from',
textTo:'to',
from:'',
to:'',
changeMonth:true,
changeYear:true,
numberOfMonths:1
}, defDate),
t, closeDate, $shcell=[],
c=$cell.closest('table')[0].config,
validDate=function(d){
return d instanceof Date && isFinite(d);},
$input=$('<input class="dateRange" type="hidden">')
.appendTo($cell)
.bind('change' + c.namespace + 'filter', function(){
var v=this.value;
if(v.match(' - ')){
v=v.split(' - ');
$cell.find('.dateTo').val(v[1]);
closeDate(v[0]);} else if(v.match('>=')){
closeDate( v.replace('>=','') );} else if(v.match('<=')){
closeDate( v.replace('<=','') );}}),
$hdr=$cell.closest('thead').find('th[data-column=' + indx + ']').addClass('filter-parsed');
t='<label>' + o.textFrom + '</label><input type="text" class="dateFrom" placeholder="' +
($hdr.data('placeholderFrom') || $hdr.attr('data-placeholder-from') || c.widgetOptions.filter_placeholder.from || '') + '" />' +
'<label>' + o.textTo + '</label><input type="text" class="dateTo" placeholder="' +
($hdr.data('placeholderTo') || $hdr.attr('data-placeholder-to') || c.widgetOptions.filter_placeholder.to || '') + '" />';
$(t).appendTo($cell);
o.oldonClose=o.onClose;
closeDate=o.onClose=function( selectedDate, ui ){
var range,
from=$cell.find('.dateFrom').datepicker('getDate'),
to=$cell.find('.dateTo').datepicker('getDate');
from=validDate(from)?from.getTime():'';
to=validDate(to)?( o.endOfDay?to.setHours(23, 59, 59):to.getTime() ) || '':'';
range=from?( to?from + ' - ' + to:'>=' + from ):(to?'<=' + to:'');
$cell.add( $shcell )
.find('.dateRange').val(range)
.trigger('search');
from=from?new Date(from):'';
to=to?new Date(to):'';
if(/<=/.test(range)){
$cell.add( $shcell )
.find('.dateFrom').datepicker('option','maxDate', to || null ).end()
.find('.dateTo').datepicker('option','minDate', null).datepicker('setDate', to || null);} else if(/>=/.test(range)){
$cell.add( $shcell )
.find('.dateFrom').datepicker('option','maxDate', null).datepicker('setDate', from || null).end()
.find('.dateTo').datepicker('option','minDate', from || null );}else{
$cell.add( $shcell )
.find('.dateFrom').datepicker('option','maxDate', null).datepicker('setDate', from || null ).end()
.find('.dateTo').datepicker('option','minDate', null).datepicker('setDate', to || null);}
if(typeof o.oldonClose==='function'){ o.oldonClose(selectedDate, ui);}};
o.defaultDate=o.from || '';
$cell.find('.dateFrom').datepicker(o);
o.defaultDate=o.to || '+7d';
$cell.find('.dateTo').datepicker(o);
c.$table.bind('filterFomatterUpdate', function(){
var val=$input.val() || '',
from='',
to='';
if(/\s+-\s+/.test(val)){
val=val.split(/\s+-\s+/) || [];
from=val[0] || '';
to=val[1] || '';} else if(/>=/.test(val)){
from=val.replace(/>=/,'') || '';} else if(/<=/.test(val)){
to=val.replace(/<=/,'') || '';}
from=from !==''?/\d{5}/g.test(from)?new Date(Number(from)):from || '':'';
to=to !==''?/\d{5}/g.test(to)?new Date(Number(to)):to || '':'';
$cell.add($shcell).find('.dateFrom').datepicker('setDate', from || null);
$cell.add($shcell).find('.dateTo').datepicker('setDate', to || null);
setTimeout(function(){
closeDate();
ts.filter.formatterUpdated($cell, indx);}, 0);});
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$shcell.append(t);
o.defaultDate=o.from || '';
$shcell.find('.dateFrom').datepicker(o);
o.defaultDate=o.to || '+7d';
$shcell.find('.dateTo').datepicker(o);});
$cell.closest('table').bind('filterReset', function(){
$cell.add($shcell).find('.dateFrom').val('').datepicker('setDate', o.from || null );
$cell.add($shcell).find('.dateTo').val('').datepicker('setDate', o.to || null );
setTimeout(function(){
closeDate();}, 0);});
return $input.val( o.from?( o.to?o.from + ' - ' + o.to:'>=' + o.from ):(o.to?'<=' + o.to:'') );},
html5Number:function($cell, indx, def5Num){
var t, o=$.extend({
value:0,
min:0,
max:100,
step:1,
delayed:true,
disabled:false,
addToggle:false,
exactMatch:false,
cellText:'',
compare:'',
skipTest: false
}, def5Num),
$input,
$number=$('<input type="number" style="visibility:hidden;" value="test">').appendTo($cell),
numberSupported=o.skipTest || $number.attr('type')==='number' && $number.val() !=='test',
$shcell=[],
c=$cell.closest('table')[0].config,
updateNumber=function(delayed, notrigger){
var chkd=o.addToggle?$cell.find('.toggle').is(':checked'):true,
v=$cell.find('.number').val(),
compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '',
searchType=c.$table[0].hasInitialized?(delayed?delayed:o.delayed) || '':true;
$input
.val( !o.addToggle || chkd?(compare?compare:o.exactMatch?'=':'') + v:'' )
.trigger( notrigger?'':'search', searchType ).end()
.find('.number').val(v);
if($cell.find('.number').length){
$cell.find('.number')[0].disabled=(o.disabled || !chkd);}
if($shcell.length){
$shcell.find('.number').val(v)[0].disabled=(o.disabled || !chkd);
$shcell.find(compareSelect).val(compare);
if(o.addToggle){
$shcell.find('.toggle')[0].checked=chkd;}}};
$number.remove();
if(numberSupported){
t=o.addToggle?'<div class="button"><input id="html5button' + indx + '" type="checkbox" class="toggle" />' +
'<label for="html5button' + indx + '"></label></div>':'';
t +='<input class="number" type="number" min="' + o.min + '" max="' + o.max + '" value="' +
o.value + '" step="' + o.step + '" />';
$cell
.append(t + '<input type="hidden" />')
.find('.toggle, .number').bind('change', function(){
updateNumber();})
.closest('thead').find('th[data-column=' + indx + ']')
.addClass('filter-parsed')
.closest('table').bind('filterReset', function(){
if($.isArray(o.compare)){
$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );}
if(o.addToggle){
$cell.find('.toggle')[0].checked=false;
if($shcell.length){
$shcell.find('.toggle')[0].checked=false;}}
$cell.find('.number').val( o.value );
setTimeout(function(){
updateNumber();}, 0);});
$input=$cell.find('input[type=hidden]').bind('change', function(){
$cell.find('.number').val( this.value );
updateNumber();});
c.$table.bind('filterFomatterUpdate', function(){
var val=tsff.updateCompare($cell, $input, o)[0] || o.value;
$cell.find('.number').val(((val || '') + '').replace(/[><=]/g,'') );
updateNumber(false, true);
ts.filter.formatterUpdated($cell, indx);});
if(o.compare){
tsff.addCompare($cell, indx, o);
$cell.find(compareSelect).bind('change', function(){
updateNumber();});}
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$shcell
.append(t)
.find('.toggle, .number').bind('change', function(){
$cell.find('.number').val( $(this).val() );
updateNumber();});
if(o.compare){
tsff.addCompare($shcell, indx, o);
$shcell.find(compareSelect).bind('change', function(){
$cell.find(compareSelect).val( $(this).val() );
updateNumber();});}
updateNumber();});
updateNumber();}
return numberSupported?$cell.find('input[type="hidden"]'):$('<input type="search">');},
html5Range:function($cell, indx, def5Range){
var o=$.extend({
value:0,
min:0,
max:100,
step:1,
delayed:true,
valueToHeader:true,
exactMatch:true,
cellText:'',
compare:'',
allText:'all',
skipTest:false
}, def5Range),
$input,
$range=$('<input type="range" style="visibility:hidden;" value="test">').appendTo($cell),
rangeSupported=o.skipTest || $range.attr('type')==='range' && $range.val() !=='test',
$shcell=[],
c=$cell.closest('table')[0].config,
updateRange=function(v, delayed, notrigger){
v=( typeof v==="undefined"?$input.val():v ).toString().replace(/[<>=]/g,'') || o.value;var compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '',
t=' (' + (compare?compare + v:v==o.min?o.allText:v) + ')',
searchType= c.$table[0].hasInitialized?(delayed?delayed:o.delayed) || '':true;
$cell.find('input[type=hidden]')
.val(( compare?compare + v:( v==o.min?'':( o.exactMatch?'=':'' ) + v ) ) )
.trigger( notrigger?'':'search', searchType ).end()
.find('.range').val(v);
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(t);
if($shcell.length){
$shcell
.find('.range').val(v).end()
.find(compareSelect).val( compare );
$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curvalue').html(t);}};
$range.remove();
if(rangeSupported){
$cell
.html('<input type="hidden"><input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
.closest('thead').find('th[data-column=' + indx + ']')
.addClass('filter-parsed')
.find('.tablesorter-header-inner').append('<span class="curvalue" />');
$input=$cell.find('input[type=hidden]').bind('change' + c.namespace + 'filter', function(){
var v=this.value,
compare=($.isArray(o.compare)?$cell.find(compareSelect).val() || o.compare[ o.selected || 0]:o.compare) || '';
if(v !==this.lastValue){
this.lastValue=( compare?compare + v:( v==o.min?'':( o.exactMatch?'=':'' ) + v ) );
this.value=this.lastValue;
updateRange( v );}});
$cell.find('.range').bind('change', function(){
updateRange( this.value );});
c.$table.bind('filterFomatterUpdate', function(){
var val=tsff.updateCompare($cell, $input, o)[0];
$cell.find('.range').val( val );
updateRange(val, false, true);
ts.filter.formatterUpdated($cell, indx);});
if(o.compare){
tsff.addCompare($cell, indx, o);
$cell.find(compareSelect).bind('change', function(){
updateRange();});}
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx).empty();
$shcell
.html('<input class="range" type="range" min="' + o.min + '" max="' + o.max + '" value="' + o.value + '" />')
.find('.range').bind('change', function(){
updateRange( $shcell.find('.range').val() );});
updateRange();
if(o.compare){
tsff.addCompare($shcell, indx, o);
$shcell.find(compareSelect).bind('change', function(){
$cell.find(compareSelect).val( $(this).val() );
updateRange();});}});
$cell.closest('table').bind('filterReset', function(){
if($.isArray(o.compare)){
$cell.add($shcell).find(compareSelect).val( o.compare[ o.selected || 0 ] );}
setTimeout(function(){
updateRange(o.value, false, true);}, 0);});
updateRange();}
return rangeSupported?$cell.find('input[type="hidden"]'):$('<input type="search">');},
html5Color: function($cell, indx, defColor){
var t, o=$.extend({
value:'#000000',
disabled:false,
addToggle:true,
exactMatch:true,
valueToHeader:false,
skipTest:false
}, defColor),
$input,
$color=$('<input type="color" style="visibility:hidden;" value="test">').appendTo($cell),
colorSupported=o.skipTest || $color.attr('type')==='color' && $color.val() !=='test',
$shcell=[],
c=$cell.closest('table')[0].config,
updateColor=function(v, notrigger){
v=( typeof v==="undefined"?$input.val():v ).toString().replace('=','') || o.value;var chkd=true,
t=' (' + v + ')';
if(o.addToggle){
chkd=$cell.find('.toggle').is(':checked');}
if($cell.find('.colorpicker').length){
$cell.find('.colorpicker').val(v)[0].disabled=(o.disabled || !chkd);}
$input
.val( chkd?v + (o.exactMatch?'=':''):'' )
.trigger( !c.$table[0].hasInitialized || notrigger?'':'search' );
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.curcolor').html(t);}else{
$cell.find('.currentColor').html(t);}
if($shcell.length){
$shcell.find('.colorpicker').val(v)[0].disabled=(o.disabled || !chkd);
if(o.addToggle){
$shcell.find('.toggle')[0].checked=chkd;}
if(o.valueToHeader){
$shcell.closest('thead').find('th[data-column=' + indx + ']').find('.curcolor').html(t);}else{
$shcell.find('.currentColor').html(t);}}};
$color.remove();
if(colorSupported){
t='' + indx + Math.round(Math.random() * 100);
t='<div class="color-controls-wrapper">' +
(o.addToggle?'<div class="button"><input id="colorbutton' + t + '" type="checkbox" class="toggle" /><label for="colorbutton' +
t + '"></label></div>':'') +
'<input type="hidden"><input class="colorpicker" type="color" />' +
(o.valueToHeader?'':'<span class="currentColor">(#000000)</span>') + '</div>';
$cell.html(t);
if(o.valueToHeader){
$cell.closest('thead').find('th[data-column=' + indx + ']').find('.tablesorter-header-inner').append('<span class="curcolor" />');}
$cell.find('.toggle, .colorpicker').bind('change', function(){
updateColor( $cell.find('.colorpicker').val() );});
$input=$cell.find('input[type=hidden]').bind('change' + c.namespace + 'filter', function(){
updateColor( this.value );});
c.$table.bind('filterFomatterUpdate', function(){
updateColor( $input.val(), true );
ts.filter.formatterUpdated($cell, indx);});
$cell.closest('table').bind('filterReset', function(){
if(o.addToggle){
$cell.find('.toggle')[0].checked=false;}
setTimeout(function(){
updateColor();}, 0);});
c.$table.bind('stickyHeadersInit', function(){
$shcell=c.widgetOptions.$sticky.find('.tablesorter-filter-row').children().eq(indx);
$shcell
.html(t)
.find('.toggle, .colorpicker').bind('change', function(){
updateColor( $shcell.find('.colorpicker').val() );});
updateColor( $shcell.find('.colorpicker').val() );});
updateColor( o.value );}
return colorSupported?$cell.find('input[type="hidden"]'):$('<input type="search">');}};})(jQuery);