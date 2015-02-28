// @file : /third/tablesorter/js/parsers/parser-ipv6.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
﻿
;(function($){
"use strict";var ts=$.tablesorter;
$.extend( ts.regex, {}, {
ipv4Validate:/((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})/,
ipv4Extract :/([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/,
ipv6Validate:/^\s*((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/i
});
ts.addParser({
id: "ipv6Address",
is: function(s){
return ts.regex.ipv6Validate.test(s);},
format: function(address, table){
var i, t, sides, groups, groupsPresent,
hex=table?(typeof table==="boolean"?table:table && table.config.ipv6HexFormat || false):false,
fullAddress='',
expandedAddress='',
validGroupCount=8,
validGroupSize=4;
address=address.replace(/\s*/g,'');
if(ts.regex.ipv4Validate.test(address)){
groups=address.match(ts.regex.ipv4Extract);
t='';
for (i=1; i < groups.length; i++){
t +=('00' + (parseInt(groups[i], 10).toString(16)) ).slice(-2) + ( i===2?':':'' );}
address=address.replace( ts.regex.ipv4Extract, t );}
if(address.indexOf("::")==-1){
fullAddress=address;}else{
sides=address.split("::");
groupsPresent=0;
for (i=0; i < sides.length; i++){
groupsPresent +=sides[i].split(":").length;}
fullAddress +=sides[0] + ":";
for (i=0; i < validGroupCount - groupsPresent; i++){
fullAddress +="0000:";}
fullAddress +=sides[1];}
groups=fullAddress.split(":");
for (i=0; i < validGroupCount; i++){
groups[i]=hex?('0000' + groups[i]).slice(-4) :
('00000' + (parseInt(groups[i], 16) || 0)).slice(-5);
expandedAddress +=( i !=validGroupCount-1)?groups[i] + ':':groups[i];}
return hex?expandedAddress:expandedAddress.replace(/:/g,'');},
type: "numeric"
});})(jQuery);