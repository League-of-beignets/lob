// @file : /third/tablesorter/js/widgets/widget-cssStickyHeaders.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;(function($){
'use strict';var ts=$.tablesorter;
ts.addWidget({
id: 'cssStickyHeaders',
priority: 10,
options: {
cssStickyHeaders_offset       :0,
cssStickyHeaders_addCaption   :false,
cssStickyHeaders_attachTo     :null,
cssStickyHeaders_filteredToTop:true
},
init:function(table, thisWidget, c, wo){
var ht, offst, adjustY,
$table=c.$table,
$attach=$(wo.cssStickyHeaders_attachTo),
isIE='ActiveXObject' in window,
namespace=c.namespace + 'cssstickyheader ',
$thead=$table.children('thead'),
$caption=$table.children('caption'),
$win=$attach.length?$attach:$(window),
$parent=$table.parent().closest('table.' + ts.css.table),
$parentThead=$parent.length && ts.hasWidget($parent[0],'cssStickyHeaders')?$parent.children('thead'):[],
borderTopWidth=( parseInt( $table.css('border-top-width'), 10 ) || 0 ),
lastCaptionSetting=wo.cssStickyHeaders_addCaption,
adjustOffsetTop=false,
addCaptionHeight=false,
setTransform=function( $elms, y ){
var translate=y===0?'':'translate(0px,' + y + 'px)';
$elms.css({
'transform':translate,'-ms-transform':translate,'-webkit-transform':translate
});};
if($caption.length){
ht=$table.height();
$caption.hide();
addCaptionHeight=$table.height()===ht;
$caption.show();
offst=$table.offset().top;
setTransform( $caption, 20 );
adjustOffsetTop=$table.offset().top !==offst;
setTransform( $caption, 0 );}
$win
.unbind('scroll resize '.split(' ').join(namespace))
.bind('scroll resize '.split(' ').join(namespace), function(){
wo=c.widgetOptions;
if( adjustOffsetTop ){
setTransform( $caption, 0 );
adjustY=$table.offset().top;}
var top=$attach.length?$attach.offset().top:$win.scrollTop(),
captionHeight=( $caption.outerHeight(true) || 0 ) +
( parseInt( $table.css('padding-top'), 10 ) || 0 ) +
( parseInt( $table.css('border-spacing'), 10 ) || 0 ),
bottom=$table.height() + ( addCaptionHeight && wo.cssStickyHeaders_addCaption?captionHeight:0 ) -
$thead.height() - ( $table.children('tfoot').height() || 0 ) -
( wo.cssStickyHeaders_addCaption?captionHeight:( addCaptionHeight?0:captionHeight ) ),
parentTheadHeight=$parentThead.length?$parentThead.height():0,
nestedStickyBottom=$parentThead.length?(
isIE?$parent.data('cssStickyHeaderBottom') + parentTheadHeight :
$parentThead.offset().top + parentTheadHeight - $win.scrollTop()
):0,
tableOffsetTop=adjustOffsetTop?adjustY:$table.offset().top,
offsetTop=addCaptionHeight?tableOffsetTop - ( wo.cssStickyHeaders_addCaption?captionHeight:0 ):tableOffsetTop,
deltaY=top - offsetTop + nestedStickyBottom + borderTopWidth + ( wo.cssStickyHeaders_offset || 0 ) -
( wo.cssStickyHeaders_addCaption?( addCaptionHeight?captionHeight:0 ):captionHeight ),
finalY=deltaY > 0 && deltaY <=bottom?deltaY:0,
$cells=isIE?$thead.children().children():$thead;
if(isIE){
c.$table.data( 'cssStickyHeaderBottom', ( $parentThead.length?parentTheadHeight:0 ) -
( wo.cssStickyHeaders_addCaption?captionHeight:0 ) );}
if(wo.cssStickyHeaders_addCaption){
$cells=$cells.add($caption);}
if(lastCaptionSetting !==wo.cssStickyHeaders_addCaption){
lastCaptionSetting=wo.cssStickyHeaders_addCaption;
if(!lastCaptionSetting){
setTransform( $caption, 0 );}}
setTransform( $cells, finalY );});
$table.unbind('filterEnd' + namespace).bind('filterEnd' + namespace, function(){
if(wo.cssStickyHeaders_filteredToTop){
window.scrollTo(0, $table.position().top);}});},
remove: function(table, c, wo){
var namespace=c.namespace + 'cssstickyheader ';
$(window).unbind('scroll resize '.split(' ').join(namespace));
c.$table
.unbind('filterEnd scroll resize '.split(' ').join(namespace))
.add( c.$table.children('thead').children().children() )
.children('thead, caption').css({
'transform':'','-ms-transform':'','-webkit-transform':''
});}});})(jQuery);