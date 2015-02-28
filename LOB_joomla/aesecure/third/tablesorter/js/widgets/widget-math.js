// @file : /third/tablesorter/js/widgets/widget-math.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
"use strict";var ts=$.tablesorter,
math={
getRow:function(table, wo, $el, dataAttrib){
var $t, txt,
c=table.config,
arry=[],
$row=$el.closest('tr'),
$cells=$row.children();
if(!$row.hasClass(wo.filter_filteredRow || 'filtered')){
if(wo.math_ignore.length){
$cells=$cells.not('[' + dataAttrib + '=ignore]').not('[data-column=' + wo.math_ignore.join('],[data-column=') + ']');}
arry=$cells.not($el).map(function(){
$t=$(this);
txt=$t.attr(c.textAttribute);
if(typeof txt==="undefined"){
txt=this.textContent || $t.text();}
txt=ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
return isNaN(txt)?0:txt;}).get();}
return arry;},
getColumn:function(table, wo, $el, type, dataAttrib){
var i, txt, $t, len, mathAbove,
arry=[],
c=table.config,
filtered=wo.filter_filteredRow || 'filtered',
cIndex=parseInt( $el.attr('data-column'), 10 ),
$rows=c.$table.children('tbody').children(),
$row=$el.closest('tr');
if(type==='above'){
len=$rows.index($row);
i=len;
while (i >=0){
$t=$rows.eq(i).children().filter('[data-column=' + cIndex + ']');
mathAbove=$t.filter('[' + dataAttrib + '^=above]').length;
if(( !$rows.eq(i).hasClass(filtered) && $rows.eq(i).not('[' + dataAttrib + '=ignore]').length && i !==len ) || mathAbove && i !==len ){
if(mathAbove){
i=0;} else if($t.length){
txt=$t.attr(c.textAttribute);
if(typeof txt==="undefined"){
txt=$t[0].textContent || $t.text();}
txt=ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
arry.push(isNaN(txt)?0:txt);}}
i--;}}else{
$rows.each(function(){
$t=$(this).children().filter('[data-column=' + cIndex + ']');
if(!$(this).hasClass(filtered) && $t.not('[' + dataAttrib + '^=above],[' + dataAttrib + '^=col]').length && !$t.is($el)){
txt=$t.attr(c.textAttribute);
if(typeof txt==="undefined"){
txt=($t[0]?$t[0].textContent:'') || $t.text();}
txt=ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
arry.push(isNaN(txt)?0:txt);}});}
return arry;},
getAll:function(table, wo, dataAttrib){
var txt, $t, col,
arry=[],
c=table.config,
filtered=wo.filter_filteredRow || 'filtered',
$rows=c.$table.children('tbody').children();
$rows.each(function(){
if(!$(this).hasClass(filtered)){
$(this).children().each(function(){
$t=$(this);
col=parseInt( $t.attr('data-column'), 10);
if(!$t.filter('[' + dataAttrib + ']').length && $.inArray(col, wo.math_ignore) < 0){
txt=$t.attr(c.textAttribute);
if(typeof txt==="undefined"){
txt=($t[0]?$t[0].textContent:'') || $t.text();}
txt=ts.formatFloat(txt.replace(/[^\w,. \-()]/g, ""), table);
arry.push(isNaN(txt)?0:txt);}});}});
return arry;},
recalculate:function(table, c, wo, init){
if(c && (!wo.math_isUpdating || init)){
if(init){
ts.computeColumnIndex( c.$table.children('tbody').children() );}
var dataAttrib='data-' + (wo.math_data || 'math'),
$mathCells=c.$tbodies.find('[' + dataAttrib + ']');
math.mathType( table, wo, $mathCells, wo.math_priority, dataAttrib );
$mathCells=c.$table.find('.' + c.cssInfoBlock + ', tfoot').find('[' + dataAttrib + ']');
math.mathType( table, wo, $mathCells, wo.math_priority, dataAttrib );
math.mathType( table, wo, c.$table.find('[' + dataAttrib + '^=all]'), ['all'], dataAttrib );
wo.math_isUpdating=true;
c.$table.trigger('update');}},
mathType:function(table, wo, $cells, priority, dataAttrib){
if($cells.length){
var formula, t, $t, arry, getAll,
eq=ts.equations;
if(priority[0]==='all'){
getAll=math.getAll(table, wo, dataAttrib);}
$.each( priority, function(i, type){
$cells.filter('[' + dataAttrib + '^=' + type + ']').each(function(){
$t=$(this);
formula=($t.attr(dataAttrib) || '').replace(type + '-','');
arry=(type==="row")?math.getRow(table, wo, $t, dataAttrib) :
(type==="all")?getAll:math.getColumn(table, wo, $t, type, dataAttrib);
if(eq[formula]){
t=eq[formula](arry);
if(table.config.debug && console && console.log){
console.log($t.attr(dataAttrib), arry,'=', t);}
math.output( $t, wo, t, arry );}});});}},
output:function($cell, wo, value, arry){
var result=ts.formatMask( $cell.attr('data-' + wo.math_data + '-mask') || wo.math_mask, value, wo.math_wrapPrefix, wo.math_wrapSuffix );
if($.isFunction(wo.math_complete)){
result=wo.math_complete($cell, wo, result, value, arry);}
if(result !==false){
$cell.html(result);}}};
ts.formatMask=function(m, v, tmpPrefix, tmpSuffix){
if( !m || isNaN(+v) ){
return v;}
var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator, part, szSep,
integer, str, offset, i, l, len, start, tmp, end, inv,
prefix='',
suffix='';
len=m.length;
start=m.search( /[0-9\-\+#]/ );
tmp=start > 0?m.substring(0, start):'';
prefix=tmp;
if( start > 0 && tmpPrefix ){
if( /\{content\}/.test(tmpPrefix || '') ){
prefix=(tmpPrefix || '').replace(/\{content\}/g, tmp || '');}else{
prefix=(tmpPrefix || '') + tmp;}}
inv=m.split('').reverse().join('');
end=inv.search( /[0-9\-\+#]/ );
i=len - end;
i +=(m.substring( i, i + 1 )==='.')?1:0;
tmp=end > 0?m.substring( i, len):'';
suffix=tmp;
if(tmp !=='' && tmpSuffix){
if( /\{content\}/.test(tmpSuffix || '') ){
suffix=(tmpSuffix || '').replace(/\{content\}/g, tmp || '');}else{
suffix=tmp + (tmpSuffix || '');}}
m=m.substring(start, i);
v=m.charAt(0)=='-'?-v:+v;
isNegative=v < 0?v=-v:0;
result=m.match( /[^\d\-\+#]/g );
decimal=( result && result[result.length-1] ) || '.';
group=( result && result[1] && result[0] ) || ',';
m=m.split( decimal );
v=v.toFixed( m[1] && m[1].length );
v=+(v) + '';
posTrailZero=m[1] && m[1].lastIndexOf('0');
part=v.split('.');
if( !part[1] || ( part[1] && part[1].length <=posTrailZero ) ){
v=(+v).toFixed( posTrailZero + 1 );}
szSep=m[0].split( group );
m[0]=szSep.join('');
posLeadZero=m[0] && m[0].indexOf('0');
if( posLeadZero > -1 ){
while ( part[0].length < ( m[0].length - posLeadZero ) ){
part[0]='0' + part[0];}} else if( +part[0]===0 ){
part[0]='';}
v=v.split('.');
v[0]=part[0];
posSeparator=( szSep[1] && szSep[ szSep.length - 1 ].length );
if( posSeparator ){
integer=v[0];
str='';
offset=integer.length % posSeparator;
l=integer.length;
for ( i=0; i < l; i++ ){
str +=integer.charAt(i);
if( !(( i - offset + 1 ) % posSeparator ) && i < l - posSeparator ){
str +=group;}}
v[0]=str;}
v[1]=( m[1] && v[1] )?decimal + v[1]:"";
return prefix + (( isNegative?'-':'' ) + v[0] + v[1] ) + suffix;};
ts.equations={
count:function(arry){
return arry.length;},
sum:function(arry){
var total=0;
$.each( arry, function(i){
total +=arry[i];});
return total;},
mean:function(arry){
var total=ts.equations.sum( arry );
return total / arry.length;},
median:function(arry){
arry.sort( function(a,b){ return a - b;} );var half=Math.floor( arry.length / 2 );
return (arry.length % 2)?arry[half]:( arry[half - 1] + arry[half] ) / 2.0;},
mode:function(arry){
if( arry.length===0 ){ return 'none';}
var i, el,
modeMap={},
maxCount=1,
modes=[arry[0]];
for (i=0; i < arry.length; i++){
el=arry[i];
modeMap[el]=modeMap[el]?modeMap[el] + 1:1;
if( modeMap[el] > maxCount ){
modes=[el];
maxCount=modeMap[el];} else if(modeMap[el]===maxCount){
modes.push(el);
maxCount=modeMap[el];}}
return modes.sort( function(a,b){ return a - b;} );},
max:function(arry){
return Math.max.apply( Math, arry );},
min:function(arry){
return Math.min.apply( Math, arry );},
range: function(arry){
var v=arry.sort(function(a,b){ return a - b;});
return v[ arry.length - 1 ] - v[0];},
variance: function(arry, population){
var avg=ts.equations.mean( arry ),
v=0,
i=arry.length;
while (i--){
v +=Math.pow(( arry[i] - avg ), 2 );}
v /=( arry.length - (population?0:1) );
return v;},
varp:function(arry){
return ts.equations.variance(arry, true);},
vars:function(arry){
return ts.equations.variance(arry);},
stdevs:function(arry){
var vars=ts.equations.variance(arry);
return Math.sqrt( vars );},
stdevp:function(arry){
var varp=ts.equations.variance(arry, true);
return Math.sqrt( varp );}};
ts.addWidget({
id: "math",
priority: 100,
options: {
math_data    :'math',
math_ignore  :[],
math_mask    :'#,##0.00',
math_complete:null,
math_priority:[ 'row','above','col' ],
math_prefix  :'',
math_suffix  :''
},
init:function(table, thisWidget, c, wo){
c.$table
.bind('tablesorter-initialized update updateRows addRows updateCell filterReset filterEnd '.split(' ').join('.tsmath '), function(e){
var init=e.type==='tablesorter-initialized';
if(!wo.math_isUpdating || init){
math.recalculate( table, c, wo, init );}})
.bind('updateComplete.tsmath', function(){
setTimeout(function(){
wo.math_isUpdating=false;}, 500);});
wo.math_isUpdating=false;},
remove: function(table, c, wo){
$(table)
.unbind('tablesorter-initialized update updateRows addRows updateCell filterReset filterEnd '.split(' ').join('.tsmath '))
.find('[data-' + wo.math_data + ']').empty();}});})(jQuery);