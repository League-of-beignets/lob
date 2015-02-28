// @file : /third/entropizer/js/entropizer.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:50
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
(function(){
'use strict';var defaultClasses=['lowercase','uppercase','numeric','symbolsCommon','symbolsUncommon'],
symbolsCommon=' ,.?!',
symbolsUncommon='"£$%^&*()-_=+[]{};:\'@#~<>/\\|`¬¦';
function Entropizer(options){
var classes=(options && options.classes) || defaultClasses;
this.classes=[];
for (var i=0; i < classes.length; i++){
this.classes.push(typeof classes[i]==='string'?Entropizer.classes[classes[i]]:classes[i]);}}
Entropizer.classes={
lowercase: { regex: /[a-z]/, size: 26 },
uppercase: { regex: /[A-Z]/, size: 26 },
numeric: { regex: /[0-9]/, size: 10 },
symbols: { characters: symbolsCommon + symbolsUncommon },
symbolsCommon: { characters: symbolsCommon },
symbolsUncommon: { characters: symbolsUncommon },
hexadecimal: { regex: /[a-fA-F0-9]/, size: 16 }};
Entropizer.prototype._evaluateClass=function(charClass, password){
var chars, i;
if(charClass.regex && charClass.regex.test(password)){
return charClass.size;}
else if(charClass.characters){
chars=charClass.characters;
for (i=0; i < chars.length; i++){
if(password.indexOf(chars.charAt(i)) > -1){
return chars.length;}}}
return 0;};
Entropizer.prototype.evaluate=function(password){
var i, alphabetSize=0;
if(!password){
return 0;}
for (i=0; i < this.classes.length; i++){
alphabetSize +=this._evaluateClass(this.classes[i], password);}
if(alphabetSize===0){
return 0;}
return Math.log(alphabetSize) / Math.log(2) * password.length;};
if(typeof define==='function' && define.amd){
define([], function(){
return Entropizer;});}
else if(typeof module==='object' && typeof module.exports==='object'){
module.exports=Entropizer;}
else if(typeof window==='object'){
window.Entropizer=Entropizer;}})();