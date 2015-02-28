// @file : /third/htmltable_export/jquery.base64.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:51
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
jQuery.base64=( function( $ ){
var _PADCHAR="=",
_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
_VERSION="1.0";
function _getbyte64( s, i ){
var idx=_ALPHA.indexOf( s.charAt( i ) );
if( idx===-1 ){
throw "Cannot decode base64";}
return idx;}
function _decode( s ){
var pads=0,
i,
b10,
imax=s.length,
x=[];
s=String( s );
if( imax===0 ){
return s;}
if( imax % 4 !==0 ){
throw "Cannot decode base64";}
if( s.charAt( imax - 1 )===_PADCHAR ){
pads=1;
if( s.charAt( imax - 2 )===_PADCHAR ){
pads=2;}
imax -=4;}
for ( i=0; i < imax; i +=4 ){
b10=( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 ) | _getbyte64( s, i + 3 );
x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff ) );}
switch ( pads ){
case 1:
b10=( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 );
x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff ) );
break;
case 2:
b10=( _getbyte64( s, i ) << 18) | ( _getbyte64( s, i + 1 ) << 12 );
x.push( String.fromCharCode( b10 >> 16 ) );
break;}
return x.join( "" );}
function _getbyte( s, i ){
var x=s.charCodeAt( i );
if( x > 255 ){
throw "INVALID_CHARACTER_ERR: DOM Exception 5";}
return x;}
function _encode( s ){
if( arguments.length !==1 ){
throw "SyntaxError: exactly one argument required";}
s=String( s );var i,
b10,
x=[],
imax=s.length - s.length % 3;
if( s.length===0 ){
return s;}
for ( i=0; i < imax; i +=3 ){
b10=( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
x.push( _ALPHA.charAt( b10 >> 18 ) );
x.push( _ALPHA.charAt(( b10 >> 12 ) & 0x3F ) );
x.push( _ALPHA.charAt(( b10 >> 6 ) & 0x3f ) );
x.push( _ALPHA.charAt( b10 & 0x3f ) );}
switch ( s.length - imax ){
case 1:
b10=_getbyte( s, i ) << 16;
x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt(( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
break;
case 2:
b10=( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt(( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt(( b10 >> 6 ) & 0x3f ) + _PADCHAR );
break;}
return x.join( "" );}
return {
decode: _decode,
encode: _encode,
VERSION: _VERSION
};}( jQuery ) );