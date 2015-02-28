// @file : /assets/aesecure.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:45
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
$(document).ready(function (){
$('.scroll-anchor').click(function (){
var $anchor=$(this).data('anchor');
niceDisplayAnchor($anchor)
});
$('#topnav').affix({offset: {top: $('header').height()-$('#topnav').height()}});
$('.scroll-top').click(function (){$('body,html').animate({scrollTop:0},1000);});
$('#topnav .navbar-nav li>a').click(function (){smoothScroll($(this).attr('href'));});
$('#sidebar .nav li>a').click(function (){ smoothScroll($(this).attr('href'));});
if(aeSecure.showUseKey=='true'){
$('#aeSecureUseKey').show();
$('#aeSecureMainBody').hide();}else{
$('#aeSecureUseKey').hide();
$('#aeSecureMainBody').show();}
$('#lblDisclaimer').click(function (){ $('#chkDisclaimer').prop("checked", true);});
$('#lblLimitation').click(function (){ $('#chkLimitation').prop("checked", true);});
$('a[id^="showTab"]').click(function (event){
var name=this.id;var id=name.replace('showTab','').substr(0,2);
$('div [id^=tab'+id+']').hide();
sDiv=name.replace('showTab','tab');
type=name.replace('showTab'+id,'');
bContinue=true;
switch (type){
case 'Help'  :sParam='t=1'; break;
case 'Test':sParam='t=2'; break;
case 'Result':sParam='t=3'; break;
case 'Config':sParam='t=4'; break;
default:bContinue=false;sParam='';}
if(bContinue){
SetupTask(id, sDiv, sParam,'','','','','POST');}else{
$('#'+sDiv).show();}});
if($.fn.textillate){
$bAnimate=true;
if(typeof aeSecure.language !=="undefined") $bAnimate=(aeSecure.language=='ar'?false:true);
if($bAnimate) $('.appTitle').textillate();}
if($.fn.popover){
var popoverTemplate=['<div class="popover">','<div class="arrow"></div>','<div class="popover-content" style="background-color:#FFFFC5;">','</div>','</div>'].join('');
$('[data-toggle="popover"]').popover({trigger:'hover','html':true,'template':popoverTemplate});}
if($('#aeSecureVersion').length>0) getaeSecureMostRecentVersion(0);
if(document.location.href.indexOf("/aesecure/setup.php")>0){
var sTemp=getURLParameter(document.location.href,'w');
if((sTemp=="") && (aeSecure.showUseKey!='true')){
SetupTask(5,'aeSecureNewerHTAccessMsg','','','','processTask05()','','POST');
SetupTask(3,'aeSecureConfigurationWarning','','','','processTask03()','','POST');
SetupTask(4,'aeSecureTipsMsg','','','','processTask04()','','POST');}}
$("#aeSecureDebugModebtn").click(function (e){
SetupTask(6,'','','','','new_window',false,'POST');
SetupTask(7,'','','','','new_window',false,'POST');});
$("#aeSecureConfirmChoiceVersion").click(function (e){
var sVersion=$('input[name=optVersion]:checked','#frmVersion').val();var selver='0';
if(sVersion=='ProDashboard'){
selver='3';
$('#lblProNoDashboard').hide();
$('#lblPremium').hide();
$('#lblFree').hide();} else if(sVersion=='Pro'){
selver='2';
$('#lblProDashboard').hide();
$('#lblPremium').hide();
$('#lblFree').hide();} else if(sVersion=='Premium')  {
selver='1';
$('#lblProDashboard').hide();
$('#lblProNoDashboard').hide();
$('#lblFree').hide();}else{
$('#lblProDashboard').hide();
$('#lblProNoDashboard').hide();
$('#lblPremium').hide();}
SetupTask(9998,'','ver='+selver,'','','processTask9998()','','POST','aeSecureConfirmChoiceVersion');});
$("#aeSecureUseKeyContinue").click(function (e){
var chkDisclaimer=$('#chkDisclaimer:checked').val();var chkLimitation=$('#chkLimitation:checked').val();
if((chkDisclaimer!='on') || (chkLimitation!='on')){
alertify.log('<span class="lead">'+getLanguageText('install.pleaseaccept')+'</span>');
if(chkDisclaimer!='on'){
$('#lblLimitation').removeClass('focus');
$('#lblDisclaimer').addClass('focus');
$('#chkDisclaimer').focus();}else{
$('#lblDisclaimer').removeClass('focus');
$('#lblLimitation').addClass('focus');
$('#chkLimitation').focus();}}else{
document.location.href=$('#urlsetupkey').html();}});
$("#aeSecurehtAccessHide").click(function (e){$('#aeSecurehtAccess').hide();});
$("#aeSecureOptionsHide").click(function (e){$('#aeSecureOptions').hide();});
attachHandlerToolsMenu();
attachHandlerToolbarMenu();
if(typeof documentReadyPremium !=='undefined' && $.isFunction(documentReadyPremium)) documentReadyPremium();
if(typeof documentReadyPro !=='undefined' && $.isFunction(documentReadyPro)) documentReadyPro();var $anchor=window.location.hash;
if($anchor!=''){
var $height=$('#aeSecureTitle').height()+$('#aeSecureOptions').height()+$('#aeSecurehtAccess').height()+
$('#aeSecureVersion').height()+$('#aeSecureWarning').height()+
$('#aeSecureNewerHTAccess').height()+$('#aeSecureConfiguration').height()+
$('#aeSecureTips').height()+$('#aeSecureJVersion').height()+10;
niceDisplayAnchor($anchor, $height);}});
function processTask9997(){
$('#aeSecureUseKeyContinue').removeAttr("disabled").removeClass("cursor-wait");
$('#aeSecureUseKeyContinue').html($('#PostInstallMsg').html());}
function PostInstall(){
$('#aeSecureUseKeyContinue').attr("disabled", "disabled").addClass("cursor-wait");
$('#aeSecureUseKeyContinue').html("<img src='assets/loading.gif' height='16' width='16' alt=''/>&nbsp;"+$('#aeSecureUseKeyContinue').html());
SetupTask(9997,'PostInstallMsg','','','','processTask9997()',false,'POST','aeSecureUseKeyContinue',true,true,'',false);}
function niceDisplayAnchor($anchor, $height){
$height=(typeof $height==="undefined")?0:$height;
$('body,html').animate({scrollTop:$($anchor).offset().top-($('#topnav').height()+5)+$height},'slow');}
function attachHandlerToolsMenu(){
$("#options").click(function (e){ SetupTask(990,'aeSecureOptionsContent','','','','processTask990()','','POST');});
$("#pentest").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ window.open(getURL()+"w=1005");}});
$("#phpinfo").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ SetupTask(998,'','','','','new_window',false,'POST');}} );
$("#seehtaccess").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ SetupTask(991,'','','','','new_window',false,'POST');}});
$("#seephpini").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ SetupTask(999,'','','','','new_window',false,'POST');}});
$("#seelog").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){
if(aeSecure.license=='free'){
SetupTask(1001,'','','','','new_window',false,'POST');}else{
var w=window.open(getURL()+"w=1001", "");
if(w==undefined) alertify.error(getLanguageText('main.authorize_popups'));}}});
if(typeof attachHandlerToolsMenuPremium !=='undefined' && $.isFunction(attachHandlerToolsMenuPremium)){
attachHandlerToolsMenuPremium();}else{
$("#lastmod").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#psi").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#jamss").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#coderemover").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#zipwebsite").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#seeactivity").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});
$("#seeapacheerrorlog").click(function(e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});}
if(typeof attachHandlerToolsMenuPro !=='undefined' && $.isFunction(attachHandlerToolsMenuPro)){
attachHandlerToolsMenuPro();}else{
$("#mimetype").click(function (e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('premium');});}
return true;}
function attachHandlerToolbarMenu(){
$("#aeSecureEraser").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
SetupTask('[91,92]','','','','','','','POST');});
$("#aeSecureLogout").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
window.location.href=getURL(false)+ "?logout=1";})
$("#aeSecureUpdateVersion").dblclick(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ getaeSecureMostRecentVersion(1,1);}});
$("#aeSecureUpdateVersion").click(function (e){
e.stopImmediatePropagation();e.preventDefault();
if(!DontRunInDemoMode()){ getaeSecureMostRecentVersion(1);}});
if(typeof attachHandlerToolbarMenuPremium !=='undefined' && $.isFunction(attachHandlerToolbarMenuPremium)){
attachHandlerToolbarMenuPremium();}else{
$("#aeSecureQuickInfo").click(function (e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('free');});}
if(typeof attachHandlerToolbarMenuPro !=='undefined' && $.isFunction(attachHandlerToolbarMenuPro)){
attachHandlerToolbarMenuPro();}else{
$("#aeSecureDashboard").click(function (e){e.stopImmediatePropagation();e.preventDefault();FunctionNotAvailable('premium');});}}
function getURL($addKey){
$addKey=(typeof $addKey==="undefined")?true:(($addKey===false)?false:true);var url=window.location.href;
if(url.indexOf("?")>0) url=url.split("?")[0];
if(url.indexOf("#")>0) url=url.split("#")[0];
if($addKey==true) url=url+"?"+(typeof aeSecure.key!="undefined"?aeSecure.key+'&':'');
return url;}
function DontRunInDemoMode(){
if(aeSecure.demo=='true'){
alertify.error(aeSecure.msgHiddenDemoMode);
return true;}else{
return false;}}
function FunctionNotAvailable($version){
$msg=($version=='free'?aeSecure.onlyPremium:aeSecure.onlyPRO);
alertify.set({ delay: 1000 });
alertify.log('<span style="font-size:1.4em;">'+$msg+'</span>');
alertify.set({ delay: 5000 });
return true;}
function Dashboard(){
if(aeSecure.license=='pro'){
var html=$('#aeSecureTempHTML').html();
if(html==''){
alertify.error('Sorry, there is an unforeseen problem with this option','',0);}else{
html+='?'+aeSecure.key;
document.location=html;}}
return;}
function getaeSecureMostRecentVersion(btnUpdateClick, forceReinstall){
btnUpdateClick=(typeof btnUpdateClick==="undefined")?0:btnUpdateClick;
forceReinstall=(typeof forceReinstall==="undefined")?0:forceReinstall;
if(typeof aeSecure.website!=undefined){
$.getJSON(aeSecure.website+'aesecure/json.php?user='+aeSecure.username+'&language='+aeSecure.language+'&task=version&current='+encodeURIComponent (aeSecure.version), function(data){
if(data){
var version=data['aeSecure'];
$('#aeSecureVersion').show();
if((forceReinstall) || (version_compare(version,aeSecure.version,'gt'))){
sText=getLanguageText('main.ajax_new_version').replace('%s',version).replace('%s','<span class="glyphicon glyphicon-cloud-download"></span>');
$('#aeSecureVersionData').html(sText);
$('#aeSecureUpdateVersion').show();
$('#aeSecureUpdateVersionbtn').removeClass('btn-success');
$('#aeSecureUpdateVersionbtn').addClass('btn-danger');
$('#aeSecureVersion').removeClass('alert-success');
$('#aeSecureVersion').addClass('alert-danger');
if(btnUpdateClick || forceReinstall){
var $bAllowReinstall=true;
if((aeSecure.license.toLowerCase()=='premium')||(aeSecure.license.toLowerCase()=='pro')){
if(aeSecure.username!=''){
$.getJSON(aeSecure.website+'aesecure/json.php?user='+aeSecure.username+'&task=getSubs', function(data){
if(data){
var $plan=data.hasOwnProperty('plan')?data['plan']:'';
if(($plan=='')||($plan=='free')){
alertify.alert(getLanguageText('install.freeonpaid'));
$bAllowReinstall=false;}else{
$plan=$plan.toLowerCase();
if($plan!=aeSecure.license.toLowerCase()){
if((aeSecure.license.toLowerCase()!='pro')&&($plan=='pro')){
}else{
if((aeSecure.license.toLowerCase()=='pro')&&($plan!='pro')){
alertify.alert(getLanguageText('install.premiumonpro'));
$bAllowReinstall=false;}}}}}
if($bAllowReinstall===true) reinstall_getinstall();});}else{
alertify.alert(getLanguageText('install.usernamenotfound'));
$bAllowReinstall=false;}}else{
if($bAllowReinstall===true) reinstall_getinstall();}}}else{
msgLatestVersion=getLanguageText('main.latest_version');
$('#aeSecureVersionData').html('<span class="glyphicon glyphicon-star"></span>&nbsp;</span>'+msgLatestVersion);
if(btnUpdateClick===1) alertify.success('<span class="lead">'+msgLatestVersion+'</span>');}}});}
return;}
function reinstall_getinstall(){
$.getJSON(aeSecure.website+'aesecure/json.php?user='+aeSecure.username+'&language='+aeSecure.language+'&task=version&current='+encodeURIComponent(aeSecure.version)+'&get='+aeSecure.token_value, function(data){
if(data){
var $jsonScript='';
if(data.hasOwnProperty('script')) $jsonScript=data['script'];
alertify.set({ buttonFocus: "cancel",  buttonReverse: true  });
msg=getLanguageText('main.new_version').replace('%1',aeSecure.version).replace('%2',data['aeSecure']);
alertify.confirm(msg, function (e){
if(e) SetupTask(9999,'','w=9999&script="'+$jsonScript+'"','','','reinstall_runinstall()',false,'POST');});}});
return true;}
function reinstall_runinstall(){
if(aeSecure.demo=='false'){
var url=document.location.href;var wPos=url.indexOf('/aesecure/');
document.location.href=url.substr(0, wPos)+'/aesecure.php';}else{
alertify.error('Functionality not enabled during the demo mode');}}
function getLanguageText($code){
var $return='';
$.ajax({
dataType: "json",
async:false,
url: "json.php",
data: "task=getText&code="+$code,
success: function (data){
$return=data['text'];}});
return $return;}
function smoothScroll(link){
if((link!='#')&&($(link)!=undefined) ){
try{
var posi=$(link).offset().top;
$('body,html').animate({scrollTop:posi},700);} catch(err){
}}
return;}
function removeURLParameter(url, parameter){
if(url.substring(0,1)!='?') url='?'+url;var urlparts=url.split('?');
if(urlparts.length>=2){
var prefix=encodeURIComponent(parameter)+'=';var pars=urlparts[1].split(/[&;]/g);
for (var i=pars.length; i-->0;){
if(pars[i].lastIndexOf(prefix, 0)!==-1) pars.splice(i, 1);}
url=urlparts[0]+'?'+pars.join('&');
return url;}else{
return url;}}
function getURLParameter(url, parameter){
var sReturn='';var urlparts=url.split('?');
if(urlparts.length>=2){
var prefix=encodeURIComponent(parameter)+'=';var pars=urlparts[1].split(/[&;]/g);
for (var i=pars.length; i-->0;)
if(pars[i].lastIndexOf(prefix, 0)!==-1) sReturn=pars[i];}else{
sReturn='';}
return (sReturn!='undefined'?sReturn:'');}
function noscript(strCode){
var div=document.createElement('div');
div.innerHTML=strCode;var scripts=div.getElementsByTagName('script');var i=scripts.length;
while (i--){
scripts[i].parentNode.removeChild(scripts[i]);}
return div.innerHTML;}
function processTask03(){
$('#aeSecureConfiguration').hide();
if($('#aeSecureConfiguration').html()!==''){
var data=$('#aeSecureConfigurationWarning').html();
if(noscript(data)!=='') $('#aeSecureConfiguration').show();}}
function processTask04(){
$('#aeSecureTips').hide();
if($('#aeSecureTips').html()!==''){
var data=$('#aeSecureTipsMsg').html();
if(noscript(data)!==''){
$('#aeSecureTips').show();
$('#aeSecureTipsClose').click(function(e){
if($('#aeSecureTips_ID').length>0){
var id=$('#aeSecureTips_ID').val();
SetupTask(4,'','a=close&id='+id,'','','');}});}}}
function processTask05(){
$('#aeSecureNewerHTAccess').hide();
if($('#aeSecureNewerHTAccess').html()!==''){
var data=$('#aeSecureNewerHTAccessMsg').html();
if(noscript(data)!==''){
$('#aeSecureNewerHTAccess').show();}}}
function processTask990(){
$('#aeSecureOptions').show();
return true;}
function processTask9998(){
$("#aeSecureChoiceVersion").fadeOut("slow");
return true;}
function SetupTask(wTask, sDiv, sParam, successMsg, failMsg, chainedFunction, bShowDiv, method, objButton, silentMode, aSync, sTag, checkSite){
if(aeSecure.debug===true){
if(jQuery.inArray(wTask, [14,15,16,17,28,29,44,71,84])<0) method='GET';}
var $sSetup='setup.php';var pleasewait="";var sTemp=new String(wTask);
if(sTemp.substring(0,1)!="[") wTask=parseInt(sTemp);
if(sParam.substring(0,1)==='?') sParam=sParam.substring(1);
if(jQuery.inArray(wTask, [12,18,49,1002])> -1){
if((sParam=='') || (sParam.indexOf('t=')==-1)){
pleasewait=getLanguageText('main.pleasewait');}else{
if(sParam.indexOf('t=3')>-1){
alertify.log(getLanguageText('main.pleasewait'));}}} else if(wTask=='100699'){
$sSetup='../../../'+$sSetup;
wTask=31;}
successMsg=(typeof successMsg==="undefined")?'':successMsg;
successMsg=(typeof successMsg==="undefined")?'':successMsg;
bShowDiv=(typeof bShowDiv==="undefined")?true:((bShowDiv===false)?false:true);
method=(((typeof method==="undefined") || (method===""))? 'GET':method);
objButton=((typeof objButton==="undefined")?'':objButton);
silentMode=(typeof silentMode==="undefined")?false:silentMode;
aSync=(typeof aSync==="undefined")?true:aSync;
checkSite=(typeof checkSite==="undefined")?true:checkSite;
sKey=typeof aeSecure.key!="undefined"?aeSecure.key:'';
chainedFunction=(typeof chainedFunction==="undefined")?'':chainedFunction;
if((sDiv!='') && ($('#'+sDiv).length>0)){
if(bShowDiv){
$('#'+sDiv).show();
$('#'+sDiv).html("<div class='text text-info'><img src='assets/loading.gif' height='16' width='16' alt=''/>&nbsp;"+pleasewait+"</div>");}}
$.ajaxSetup({ cache: false });
if(objButton!=''){$('#'+objButton).attr("disabled", "disabled").addClass("cursor-wait");}
if(method=='POST'){
if(typeof sParam==='undefined') sParam='';
if(sParam.indexOf('w')==-1) sParam='w='+wTask+(sParam!=''?'&'+sParam:'');
if(sParam.indexOf(aeSecure.token)==-1) sParam=aeSecure.token+'='+aeSecure.token_value+(sParam!=''?'&'+sParam:'');
if(aeSecure.demo!='true'){
if(sParam.indexOf(sKey)==-1) sParam='key='+aeSecure.key+(sParam!=''?'&'+sParam:'');}}
if((sLang=getURLParameter(document.location.href,'lang'))!=''){
if(sParam.indexOf("lang=")==-1) sParam+="&"+sLang;}
if(sParam!="") sParam=sParam.replace(/\&$/,'')
if(method==="GET"){
if(sParam.indexOf("w=")==-1) sParam+="&w="+wTask;}
if(sParam.substring(0,1)!='&') sParam='&'+sParam;
$.ajax({
type: method,
url: $sSetup,
async: aSync,
data: sKey + sParam,
success: function (data){
if($('#'+sDiv).length>0){
$('#'+sDiv).html(data);
if(data!=''){ if(bShowDiv) $('#'+sDiv).show();}else{ $('#'+sDiv).hide();}}else{
if(chainedFunction!=='new_window') successMsg=data;}
if((successMsg!='') && (silentMode!==true)){
msg=(aeSecure.demo=='true'?'<span class="text-danger" style="font-weight:bold;">demo</span>&nbsp;':'')+successMsg;
alertify.success(msg);}
$.ajax({
type: 'GET',
url: 'json.php',
data: 'task=checkSite',
async: false,
cache: false,
success: function (favIcon){
if(chainedFunction!=''){
if(chainedFunction=='new_window'){
var w=window.open("", "", "width="+$(window).width()+", height=800, scrollbars=yes");
if(w!=undefined){
var $w=$(w.document.body);
if(typeof data==="object"){
$w.html(xmlToString(data));}else{
$w.html(data);}
$('div.doit').click(function(){ DoIt();});}else{
alertify.error(getLanguageText('main.authorize_popups'));}}else{
eval(chainedFunction);}}},
error:function(data){
var msg=aeSecure.msgSiteBroken+"<br/>"+aeSecure.msgEditHtAccess;
msg=msg.replace('%ACTION_TAG_START%','<strong>#'+sTag+'_START</strong>');
msg=msg.replace('%ACTION_TAG_END%','<strong>#'+sTag+'_END</strong>');
alertify.alert("<div class='alert alert-danger' style='text-align:center;'>"+msg+"</div>");}});
if(objButton!=''){$('#'+objButton).removeAttr("disabled").removeClass("cursor-wait");}}});}
function isRegExValid(sRegex){
var isValid;
isValid=false;
try {
new RegExp(sRegex);
isValid=true;} catch(e){
isValid=false;}
if(!isValid) alertify.error('<strong>'+getLanguageText('main.invalidregex')+'</strong>');
return isValid;}
function xmlToString(xmlElem){
var serialized;
try {
serializer=new XMLSerializer();
serialized=serializer.serializeToString(xmlElem);} catch (e){
serialized=xmlElem.xml;}
serialized=serialized.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
return serialized;}
function version_compare (v1, v2, operator){
v1=v1.replace(/[^0-9.]/g,'');
v2=v2.replace(/[^0-9.]/g,'');
this.php_js=this.php_js || {};
this.php_js.ENV=this.php_js.ENV || {};var i=0,
x=0,
compare=0,
vm={
'dev': -6,'alpha': -5,'a': -5,'beta': -4,'b': -4,'RC': -3,'rc': -3,'#': -2,'p': 1,'pl': 1
},
prepVersion=function (v){
v=('' + v).replace(/[_\-+]/g,'.');
v=v.replace(/([^.\d]+)/g,'.$1.').replace(/\.{2,}/g,'.');
return (!v.length?[-8]:v.split('.'));},
numVersion=function (v){
return !v?0:(isNaN(v)?vm[v] || -7:parseInt(v, 10));};
v1=prepVersion(v1);
v2=prepVersion(v2);
x=Math.max(v1.length, v2.length);
for (i=0; i < x; i++){
if(v1[i]==v2[i]){
continue;}
v1[i]=numVersion(v1[i]);
v2[i]=numVersion(v2[i]);
if(v1[i] < v2[i]){
compare=-1;
break;} else if(v1[i] > v2[i]){
compare=1;
break;}}
if(!operator){
return compare;}
switch (operator){
case '>':
case 'gt':
return (compare > 0);
case '>=':
case 'ge':
return (compare >=0);
case '<=':
case 'le':
return (compare <=0);
case '==':
case '=':
case 'eq':
return (compare===0);
case '<>':
case '!=':
case 'ne':
return (compare !==0);
case '':
case '<':
case 'lt':
return (compare < 0);
default:
return null;}}