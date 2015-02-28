// @file : /third/tablesorter/js/widgets/widget-editable.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
;( function( $ ){
'use strict';var tse=$.tablesorter.editable={
editComplete: function( c, wo, $cell, refocus ){
$cell
.removeClass( 'tseditable-last-edited-cell' )
.trigger( wo.editable_editComplete, [ c ] );
if( refocus ){
setTimeout( function(){
$cell.focus();}, 50 );}},
selectAll: function( cell ){
setTimeout( function(){
var sel, range=document.createRange();
range.selectNodeContents( cell );
sel=window.getSelection();
sel.removeAllRanges();
sel.addRange( range );}, 100 );},
update: function( c, wo ){
var indx, tmp, $t,
cols=[];
if( $.type( wo.editable_columns )==='string' && wo.editable_columns.indexOf( '-' ) >=0 ){
tmp=wo.editable_columns.split( /\s*-\s*/ );
indx=parseInt( tmp[ 0 ], 10 ) || 0;
tmp=parseInt( tmp[ 1 ], 10 ) || ( c.columns - 1 );
if( tmp > c.columns ){
tmp=c.columns - 1;}
for ( ; indx <=tmp; indx++ ){
cols.push( 'td:nth-child(' + ( indx + 1 ) + ')' );}} else if( $.isArray( wo.editable_columns ) ){
$.each( wo.editable_columns, function( i, col ){
if( col < c.columns ){
cols.push( 'td:nth-child(' + ( col + 1 ) + ')' );}});}
tmp=$( '<div>' ).wrapInner( wo.editable_wrapContent ).children().length || $.isFunction( wo.editable_wrapContent );
c.$tbodies.find( cols.join( ',' ) ).not( '.' + wo.editable_noEdit ).each( function(){
$t=$( this );
if( tmp && $t.children().length===0 ){
$t.wrapInner( wo.editable_wrapContent );}
if( $t.children().length ){
$t.children().not( '.' + wo.editable_noEdit ).each( function(){
var $this=$( this );
if( wo.editable_trimContent ){
$this.text( function( i, txt ){
return $.trim( txt );});}
$this.prop( 'contenteditable', true );});}else{
if( wo.editable_trimContent ){
$t.text( function( i, txt ){
return $.trim( txt );});}
$t.prop( 'contenteditable', true );}});},
bindEvents: function( c, wo ){
c.$table
.off( 'updateComplete pagerComplete '.split( ' ' ).join( '.tseditable' ) )
.on( 'updateComplete pagerComplete '.split( ' ' ).join( '.tseditable' ), function(){
tse.update( c, wo );});
c.$tbodies
.off( 'mouseleave focus blur focusout keydown '.split( ' ' ).join( '.tseditable ' ) )
.on( 'mouseleave.tseditable', function(){
if( c.$table.data( 'contentFocused' ) ){
c.$table.data( 'contentFocused', true );
$( ':focus' ).trigger( 'focusout' );}})
.on( 'focus.tseditable','[contenteditable]', function( e ){
clearTimeout( $( this ).data( 'timer' ) );
c.$table.data( 'contentFocused', e.target );var $this=$( this ),
selAll=wo.editable_selectAll,
column=$this.closest( 'td' ).index(),
txt=$.trim( $this.text() );
if( wo.editable_enterToAccept ){
$this.on( 'keydown.tseditable', function( e ){
if( e.which===13 ){
e.preventDefault();}});}
$this.data({ before:txt, original: txt });
if( typeof wo.editable_focused==='function' ){
wo.editable_focused( txt, column, $this );}
if( selAll ){
if( typeof selAll==='function' ){
if( selAll( txt, column, $this ) ){
tse.selectAll( $this[0] );}}else{
tse.selectAll( $this[0] );}}})
.on( 'blur focusout keydown '.split( ' ' ).join( '.tseditable ' ),'[contenteditable]', function( e ){
if( !c.$table.data( 'contentFocused' ) ){ return;}
var t, validate,
valid=false,
$this=$( e.target ),
txt=$.trim( $this.text() ),
column=$this.closest( 'td' ).index();
if( e.which===27 ){
$this.html( $.trim( $this.data( 'original' ) ) ).trigger( 'blur.tseditable' );
c.$table.data( 'contentFocused', false );
return false;}
t=e.which===13 && ( wo.editable_enterToAccept || e.altKey ) || wo.editable_autoAccept && e.type !=='keydown';
if( t && $this.data( 'before' ) !==txt ){
validate=wo.editable_validate;
valid=txt;
if( typeof( validate )==='function' ){
valid=validate( txt, $this.data( 'original' ), column, $this );} else if( typeof ( validate=$.tablesorter.getColumnData( c.table, validate, column ) )==='function' ){
valid=validate( txt, $this.data( 'original' ), column, $this );}
if( t && valid !==false ){
c.$table.find( '.tseditable-last-edited-cell' ).removeClass( 'tseditable-last-edited-cell' );
$this
.addClass( 'tseditable-last-edited-cell' )
.html( $.trim( valid ) )
.data( 'before', valid )
.data( 'original', valid )
.trigger( 'change' );
c.$table.trigger( 'updateCell', [ $this.closest( 'td' ), false, function(){
if( wo.editable_autoResort ){
setTimeout( function(){
c.$table.trigger( 'sorton', [ c.sortList, function(){
tse.editComplete( c, wo, c.$table.find( '.tseditable-last-edited-cell' ), true );}, true ] );}, 10 );}else{
tse.editComplete( c, wo, c.$table.find( '.tseditable-last-edited-cell' ) );}} ] );
return false;}} else if( !valid && e.type !=='keydown' ){
clearTimeout( $this.data( 'timer' ) );
$this.data( 'timer', setTimeout( function(){
if( $.isFunction( wo.editable_blur ) ){
wo.editable_blur( $.trim( $this.text() ), column, $this );}}, 100 ) );
$this.html( $.trim( $this.data( 'original' ) ) );}});}};
$.tablesorter.addWidget({
id: 'editable',
options:{
editable_columns      :[],
editable_enterToAccept:true,
editable_autoAccept   :true,
editable_autoResort   :false,
editable_wrapContent  :'<div>',
editable_trimContent  :true,
editable_validate     :null,
editable_focused      :null,
editable_blur         :null,
editable_selectAll    :false,
editable_noEdit       :'no-edit',
editable_editComplete :'editComplete'
},
init: function( table, thisWidget, c, wo ){
if( !wo.editable_columns.length ){ return;}
tse.update( c, wo );
tse.bindEvents( c, wo );}});})( jQuery );