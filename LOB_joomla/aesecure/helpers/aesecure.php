<?php
   // @file : /helpers/aesecure.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:46
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
defined( '_AESECURE') or die('No direct access allowed');
class aeSecure{
protected static $instance = null;var $aeSt = null;var $aesC=null;var $aesLg=null;var $aesS=null;var $aesD=null;var $aecPe = null;var $aecPo = null;var $premium=null;var $pro=null;var $icon_new=null;var $_iPiId=null;var $_iPoId=null;var $aesL = null;static $aDLgFe = 'aesecure_accessdenied.php';static $tlttH = '';static $code='';static $layout='';
function __construct(){
require_once(dirname(__FILE__).'/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();if($this->aesC->dbu()===true){error_reporting(E_ALL);}
require_once(dirname(__FILE__).'/session.php');$this->aesS = aecS::getInstance();require_once (dirname(__FILE__).'/error.php');require_once (dirname(__FILE__).'/functions.php');require_once (dirname(__FILE__).'/settings.php');$this->aeSt = aecSt::getInstance();require_once (dirname(__FILE__).'/logging.php');$this->aesLg = aecLg::getInstance();require_once (dirname(__FILE__).'/debug.php');$this->aesD = aecDb::getInstance();$this->aecPe=null; $this->_iPiId=false;if(file_exists(dirname(dirname(__FILE__)).'/premium/helpers/aesecure.php')){
require_once(dirname(dirname(__FILE__)).'/premium/helpers/aesecure.php');if(class_exists('aecPe')){
$this->aecPe = aecPe::getInstance();$this->_iPiId=true;}}
$this->aecPo=null; $this->_iPoId=false;if(file_exists(dirname(dirname(__FILE__)).'/pro/helpers/aesecure.php')){
require_once(dirname(dirname(__FILE__)).'/pro/helpers/aesecure.php');if(class_exists('aecPo')){
$this->aecPo = aecPo::getInstance();$this->_iPoId=true;}}
aecFt::$rootFolder=$this->aeSt->siOt();require_once (dirname(__FILE__).'/language.php');$this->aesL = aecLa::getInstance($this->aesS->get('language'));
aecFt::$Sce=$this->aesL->getMain('success');
aecFt::$flUe=$this->aesL->getMain('failure');
aecFt::$iain=$this->aesL->getMain('information');
aecFt::$wing=$this->aesL->getMain('warning');$this->premium = "<span class='premium' title='".str_replace("'","&#145;",$this->aesL->getMain('premium'))."'>&nbsp;</span>";$this->pro = "<span class='pro' title='".str_replace("'","&#145;",$this->aesL->getMain('pro'))."'>&nbsp;</span>";$this->icon_new = "<span class='new'>&nbsp;</span>";self::$tlttH = dirname(dirname(__FILE__)).'/template/';$this->failure = $this->aesL->getMain('failure');self::$layout='default';
return;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aeSecure;
return self::$instance;}
function __destruct(){
unset($this->aesD);
unset($this->aesL);
unset($this->aesC);
unset($this->aeSt);
unset($this->aecPo);
unset($this->aecPe);} public function setCode($value){
self::$code=$value;
return;} public function getCode(){
return self::$code;} public function isValidKey(){
$this->aesD->log(array('deprecated'=>'Call aesS->isValid() instead'), array('Type'=>'info','GroupTitle'=>__METHOD__));
return $this->aesS->isValid();} public function rpVs($html){
static $js_Script='';$value=($this->aeSt->ShowImg()?'<img src="'.dirname($_SERVER['SCRIPT_NAME']).'/assets/aesecure_denied.png"  title="" alt="" style="float:right;"/>':'');$html=aecFt::rphl('<!-- IMG -->',$value,$html);$html=aecFt::rphl('%CODE%', self::$code,$html);$html=aecFt::rphl('%SITENAME%',$this->aeSt->siaM(),$html);$html=aecFt::rphl('%SITEROOT%',$this->aeSt->siOt(),$html);$html=aecFt::rphl('%SITEURL%',$this->aeSt->siUl(),$html);$html=aecFt::rphl('%HTTP_HOST%/',$this->aeSt->siUl(),$html);$html=aecFt::rphl('%HTTP_HOST%',$this->aeSt->siUl(),$html);$html=aecFt::rphl('%REQUEST_URI%', ltrim($_SERVER['REQUEST_URI'],'/'),$html);$html=aecFt::rphl('%REMOTE_ADDR%',$_SERVER['REMOTE_ADDR'],$html);$html=aecFt::rphl('%REQUEST_METHOD%',$_SERVER['REQUEST_METHOD'],$html);$html=aecFt::rphl('%HTTP_USER_AGENT%',$_SERVER['HTTP_USER_AGENT'],$html);$html=aecFt::rphl('%HTTP_HOST%',$_SERVER['HTTP_HOST'],$html);$html=aecFt::rphl('%SERVER_SOFTWARE%',$_SERVER['SERVER_SOFTWARE'],$html);$html=aecFt::rphl('%SITEEMAIL%',$this->aesC->Mail('to'),$html);$html=aecFt::rphl('%AESECUREWEBSITE%',$this->aeSt->aeWbt(),$html);$html=aecFt::rphl('%AESECURETITLE%',$this->aesL->getMain('app_title'),$html);$html=aecFt::rphl('%AESECUREKEY%',$this->aesC->mo()?'':$this->aesC->get('key'),$html);$html=aecFt::rphl('%AESECURELANGUAGE%',$this->aesS->get('language'),$html);if(($tmz=ini_get('date.timezone'))=='') $tmz='Europe/Brussels';
date_default_timezone_set($tmz);if(($time = $_SERVER['REQUEST_TIME']) == '') $time = time();
$date = @date("Y",$time);$html=aecFt::rphl('%YEAR%',$date,$html);if($this->aesC->mo()){
$demoMode='<span class="blink btn btn-warning" style="cursor:default;">'.$this->aesL->getMain('demo').'</span>&nbsp;';} else{ $demoMode='';}
if($this->aesC->Hpotns()!==true){
$quickInfo='&nbsp;<span id="aeSecureQuickInfo" class="btn btn-info" title="'.$this->aesL->getQuickInfo('buttonhint').'" data-toggle="modal" data-target="#modalQuickInfo"><span class="glyphicon glyphicon-print"></span></span>';
$quickInfo=str_replace('%IsPremium%',$this->aesL->getMain('premium'),$quickInfo);} else{
$quickInfo='';}
$dashboard='';if(($this->_iPoId)&&(is_dir('dashboard'))){
$dashboard='<span disabled="disabled" id="aecDrd" class="btn btn-primary" data-active="true">'.$this->aesL->gDhrd('title').$this->pro.'</span>&nbsp;';} else{
$dashboard='';}
if($this->_iPiId){
if(!$this->aesC->mo()){
$premium='<span class="btn btn-success" style="cursor:default;">'.($this->_iPoId===true?'PRO':'Premium').'</span>&nbsp;';} else{
$premium='';}} else{
$link=aecFt::link($this->aeSt->aeWbt().'download','<strong style="color:white;">Limited version</strong>', 'id="aeFreeVersion" title="'.strip_tags($this->aesL->getMain('aeSecureGetIt')).'" target="_blank"');
$premium='<span class="btn btn-danger">'.$link.'</span>&nbsp;';}
$version='v'.$this->aeSt->get('version'). ' on PHP v'.phpversion();
$version=aecFt::link($this->aeSt->aeWbt().'releases',$version, 'target="_blank" id="aeRelease" title="'.$this->aesL->getMain('aeSecureRelease').'"');
$modeMaintenance='';
list($bBle,$block)=$this->cOeld('1.9');
$lUA=$this->aeSt->spts('19','language');
$popover=$this->aesL->$lUA('indicator');
$modeMaintenance='<span class="blink btn btn-danger"><span class="glyphicon glyphicon-ok">&nbsp;</span>MAINTENANCE</span>';
$modeMaintenance='<span style="display:'.($bBle==true?'inline':'none').';" id="indicatorMaintenance" data-toggle="popover" data-placement="bottom" data-content="'.$popover.'"><a class="scroll-anchor" href="#maintenance" data-anchor="#maintenance">'.$modeMaintenance.'</a>&nbsp;</span>';
$modeShowErrors='';
list($bBle,$block)=$this->cOeld('1.3');
$lUA=$this->aeSt->spts('13','language');
$popover=$this->aesL->$lUA('indicator');
$modeShowErrors='<span class="blink btn btn-danger"><span class="glyphicon glyphicon-ok">&nbsp;</span>Show errors</span>';
$modeShowErrors='<span style="display:'.($bBle==true?'none':'inline').';" id="indicatorShowError" data-toggle="popover" data-placement="bottom" data-content="'.$popover.'"><a class="scroll-anchor" href="#hideApacheErrors" data-anchor="#hideApacheErrors">'.$modeShowErrors.'</a>&nbsp;</span>';
$debugMode='';if($this->aesC->dbu()) $debugMode='<span id="aecDbModebtn" class="blink btn btn-danger">DEBUG MODE</span>&nbsp;';
$update='&nbsp;<span id="aeSecureUpdateVersion"><span id="aeSecureUpdateVersionbtn" class="btn btn-success" title="'.$this->aesL->getMain('version_control').'"><span class="glyphicon glyphicon-cloud-download"></span></span></span>';
$eraser='&nbsp;<span id="aeSecureEraser" class="btn btn-primary" title="'.$this->aesL->gDhrd('eraser').'"><span class="glyphicon aesecure-eraser"></span></span>';
$logout='&nbsp;<span id="aeSecureLogout" class="btn btn-success" title="'.$this->aesL->getMain('logout').'"><span class="glyphicon glyphicon-log-out"></span></span>';$html=aecFt::rphl('%AESECUREMAINMESSAGE%',$modeShowErrors.$modeMaintenance.$debugMode.$demoMode.$dashboard.$premium.'<span class="btn btn-info">'.$version.'</span>'.$eraser.$quickInfo.$update.$logout,$html);if(strpos($html,'<!-- AESECURE_JSSCRIPT -->')){
if(trim($js_Script)==''){
$jQuery_messages=$this->aesL->getjQuery_messages();
$count=count($jQuery_messages);
$i=0;
$script="<script type='text/javascript'>\n".
"$(document).ready(function (){\n".
"  jQuery.extend(jQuery.validator.messages,{\n";foreach ($jQuery_messages as $key=>$value){
$i++;
$script.="    ".$key.":\"".$value."\"".($i<$count?",":"")."\n";}
$script.= "});\n});\n</script>";}
$html=aecFt::rphl('<!-- AESECURE_JSSCRIPT -->',$script,$html);} return $html;}
private function gadHml(){
header("HTTP/1.0 403 Forbidden (aeSecure)");$html=file_get_contents(self::$tlttH.'deny.'.self::$layout.'.aec', FILE_USE_INCLUDE_PATH);$html=self::rpVs($html);$html=aecFt::rphl('%AESECUREACCESSDENIEDPAGETITLE%',$this->aesL->gadnid('pagetitle'),$html);$html=aecFt::rphl('%AESECUREACCESSDENIEDTITLE%',$this->aesL->gadnid('title'),$html);$html=aecFt::rphl('%AESECUREACCESSDENIEDCONTACT%',$this->aesL->gadnid('contactwebmaster'),$html);if(self::$code!='0'){
list($msg,$ban,$mail)=$this->aeSt->getCode(self::$code);$value='<pre>Code&nbsp;:&nbsp;'.self::$code.'&nbsp;-&nbsp;'.$msg.'</pre>';if(self::$code===403){
$folder=aecFt::gRvl($param='fld',$default='',$maxlen=50,$type='string');$folder=strip_tags($folder);if(trim($folder)!=''){
header('aeSecure-folder: '.$folder);
$value.='<pre>'.$this->aesL->getMain('folder').':'.$folder.'</pre>';}
$file=aecFt::gRvl($param='file',$default='',$maxlen=100,$type='string');$file=strip_tags($file);if(trim($file)!=''){
header('aeSecure-file: '.$file);
$value.='<pre>'.$this->aesL->getMain('file').':'.$file.'</pre>';}}
if($this->aesC->dbu()===true){
$blocked=aecFt::gRvl($param='blocked',$default='',$maxlen=50,$type='string');
$blocked=strip_tags($blocked);if(trim($blocked)!='') $value.='<pre style="color:yellow;font-weight:bold;">Debug Mode - Blocked by:'.rtrim($blocked,'/').'/.htaccess</pre>';}
$html=aecFt::rphl('<!-- REASON -->',$value,$html);$value='';if($this->aeSt->BanIP()==true){
$value=($ban==1?'<pre>'.sprintf($this->aesL->gadnid('banned'),$_SERVER['REMOTE_ADDR']).'</pre>':'');}
$html=aecFt::rphl('<!-- BANNED -->',$value,$html);$value='';if($this->aesC->Mail('send')==true){
$value=(($mail==1)?'<pre style="color:rgb(246, 142, 30);">'.$this->aesL->gadnid('emailsent').'</pre>':'');}
$html=aecFt::rphl('<!-- EMAIL -->',$value,$html);}
if(self::$code==671){
$tmp='<pre>'.$this->aesL->gadnid('mailwebmaster').'</pre>';$html=aecFt::rphl('<!-- MAILWEBMASTER -->',$tmp,$html);}
header('aeSecure-code: '.self::$code);$html=aecFt::rphl('%AESECUREACCESSDENIEDCONTACT%',$this->aesL->gadnid('contactwebmaster'),$html);$html.=self::waDlg();$html.=self::SendMail();
return $html;} public function waDlg(){
$this->aesD->BggP('aeSecure::waDlg()');if(($this->aesC->Log('write')==true)&&(is_dir($this->aesC->tmp()))){
$this->aesD->log('Write in log:True');
$lgFl = str_replace('/',DIRECTORY_SEPARATOR,$this->aesC->Log('folder'));if(!is_dir($lgFl)) $lgFl=rtrim(dirname(dirname(__FILE__)),DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.'logs';
$lgFl=rtrim($lgFl,DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.self::$aDLgFe;$this->aesD->log('FileName:'.$lgFl);if(($time = $_SERVER['REQUEST_TIME']) == '') $time = time();if(($remote_addr = $_SERVER['REMOTE_ADDR']) == '') $remote_addr = "REMOTE_ADDR_UNKNOWN";if(($request_uri = $_SERVER['REQUEST_URI']) == '') $request_uri = "REQUEST_URI_UNKNOWN";if(($useragent = $_SERVER['HTTP_USER_AGENT']) == '') $useragent = "HTTP_USER_AGENT_UNKNOWN";
$header='';
try{
if(function_exists('apache_request_headers')){
$headers = apache_request_headers();foreach ($headers as $key=>$value){
if(strpos($key,'aeSecure-')!==false) $header.=$key.'='.$value.';';}
$header=rtrim($header,';');} else{ $this->aesD->alDg($msg='Function apache_request_headers() not accessible on the host',$resetLog=false);}} catch (Exception $ex){
$this->aesD->alDg($msg='Exception raised when accessing to apache_request_headers()',$resetLog=false,$outputHTML=true);}
if(($tmz=ini_get('date.timezone'))=='') $tmz='Europe/Brussels';
date_default_timezone_set($tmz);if(($time = $_SERVER['REQUEST_TIME']) == '') $time = time();
$date = @date("Y-m-d H:i:s",$time);if($fd = @fopen($lgFl, "a")){
list($msg,$ban,$mail)=$this->aeSt->getCode(self::$code);
$result = fputcsv($fd, array($date,$remote_addr,$request_uri, self::$code,$msg,$ban,$mail,$useragent,$header));
fclose($fd);} else{
$this->aesD->alDg($msg='Unable to open log '.$lgFl.'!',$resetLog=false);}} else{
$this->aesD->alDg($msg='The configuration has disabled writing in the logfile',$resetLog=false);}
$this->aesD->cSgP();} public function gadDlg($return=false){
$this->aesS->isValid();
$lgFl = $this->aesC->Log('folder');if(!is_dir($lgFl)) $lgFl=dirname(dirname(__FILE__)).'/logs';
$lgFl=rtrim($lgFl,DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.self::$aDLgFe;$html='';
$type=aecFt::gRvl($param='format',$default=$this->aesC->Log('type'),
$maxlen=3,$type='string',$where='GET');if(is_file($lgFl)){
if($type==='xml'){
header('Content-Type: text/xml');$html='<?xml version="1.0" encoding="utf-8"?>'."\n";
$arrNode = array(0=>"timestamp", 1=>"ip", 2=>"url", 3=>"code", 4=>"msg", 5=>"banned", 6=>"email", 7=>"useragent");$html.="<!DOCTYPE root [\n";$html.= "<!ELEMENT root (log*)>\n";$html.= "<!ELEMENT log (";
$elements='';
$pcdata='';
for ($i=0; $i<count($arrNode); $i++){
$elements.=$arrNode[$i].',';
$pcdata.="<!ELEMENT ".$arrNode[$i]." (#PCDATA)>\n";}
$html.= rtrim($elements,',').")>\n<!ATTLIST log id ID #REQUIRED>\n".$pcdata."]>\n";$html.= "<root>\n";if(($handle = fopen($lgFl, "r")) !== FALSE){
$row=0;
while (($data = fgetcsv($handle, 1000, ",")) !== FALSE){
$wCol = count($data);$html.= '<log id="n'.$row.'">'."\n";
for ($i=0; $i<$wCol; $i++){
$html.= '<'.$arrNode[$i].'>'.htmlspecialchars($data[$i], ENT_QUOTES, "UTF-8").'</'.$arrNode[$i].'>'."\n";}
$html.= '</log>'."\n";
$row++;}
fclose($handle);}
$html.="</root>\n";} else{
$html='<html><body><pre>'.file_get_contents($lgFl, FILE_USE_INCLUDE_PATH).'</pre></body></html>';}} else{
$html=file_get_contents(self::$tlttH.'emptylog.'.self::$layout.'.aec',FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECUREPAGETITLE%',$this->aesL->getMain('aeSecurePageTitle'),$html);$html=aecFt::rphl('%AESECUREEMPTYLOG%',$this->aesL->getLog('empty'),$html);$html=aecFt::rphl('%AESECUREEMPTYLOGMORE%',$this->aesL->getLog('emptymore'),$html);}
if(!$return){echo $html; if($type==='xml') die();} return $html;}
private function ViewMail(){
$file=aecFt::gRvl($param=$this->aeSt->Params('filename'),$default='',$maxlen=50,$type='file');$file=$this->aesC->tmp().$file.'.html';$return= (is_file($file)?file_get_contents($file, FILE_USE_INCLUDE_PATH):aecFt::ShowEmptyPage());
return $return;}
private function BanIP(){
$ip=aecFt::gRvl($param=$this->aeSt->Params('ip'),$default='',$maxlen=15,$type='ip');if(trim($ip)!=''){
$html=file_get_contents(self::$tlttH.'banip.'.self::$layout.'.aec', FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECURE_BANNEDIP%',$this->aesL->getBanTitle($ip),$html);$html=aecFt::rphl('%AESECURE_BANNEDHTACCESS%',$this->aesL->getBanHTAccess($ip),$html);$html=self::rpVs($html);} else{
$html=aecFt::ShowEmptyPage();} return $html;}  public function SendKey(){
$email=trim($this->aesC->Mail('to'));if($email!='') self::SendMail('mail_reminder_key',true);if($email!=''){
preg_match('/((.*)@(.*)\.(.*))/',$email,$arr);
$email = substr($arr[2],0,3).'.....@'.substr($arr[3],0,2).'.....'.$arr[4];}
$lang=$this->aesS->get('language');
$FAQ=$this->aeSt->get('help');if(isset($FAQ[$lang])){
$url=$FAQ[$lang]['FAQ_ReminderKey'];} else{
$lang=$this->aeSt->get('defaultLanguage');
$url=(isset($FAQ[$lang])?$url=$FAQ[$lang]['FAQ_ReminderKey']:$FAQ['fr_FR']['FAQ_ReminderKey']);}
$msg=sprintf($this->aesL->gadnid('emailsent'),$email,$url);
aecFt::SeAD($msg=$msg,$extra='',$showErrorHeading=false);
return true;}
private function SendMail($template=null,$sendmail=false){
if($sendmail==false) $sendmail=$this->aesC->get('mail','send');if($template==null){
list($msg,$ban,$mail)=$this->aeSt->getCode(self::$code);if($mail==0) return;
$template = file_get_contents(self::$tlttH.'mail.'.self::$layout.'.aec', FILE_USE_INCLUDE_PATH);} else{
$template = file_get_contents(self::$tlttH.$template.'.'.self::$layout.'.aec', FILE_USE_INCLUDE_PATH);}
$return=false;$html='';if($sendmail==true){
if(trim($this->aesC->Mail('to'))=='') aecFt::SeAD($msg='There is no email\'s recipient defined in the configuration; no mails can be sent.',$extra='',$showErrorHeading=false);if(aecFt::checkEmail($this->aesC->Mail('to'))&&aecFt::checkEmail($this->aesC->Mail('from'))){
$mailHeaders=
"MIME-Version: 1.0\n".
"Content-Type: text/html; charset=UTF-8\n".
"From: ".$this->aesC->Mail('fromName')." <".$this->aesC->Mail('from').">\n";
$mailSubject=self::rpVs($this->aesC->get('mail','subject'));$html=self::rpVs($template);if(strpos($html,'%LATITUDE%')!=false){
$json=aecFt::gRtjON(sprintf($this->aesC->get('urls','geocoding'),$_SERVER['REMOTE_ADDR']));if(is_object($json)){
$html=aecFt::rphl('%LATITUDE%',$json->latitude,$html);$html=aecFt::rphl('%LONGITUDE%',$json->longitude,$html);} else{
$html=aecFt::rphl('%LATITUDE%', '',$html);$html=aecFt::rphl('%LONGITUDE%', '',$html);}}
$html=aecFt::rphl('%AESECUREMAILREMINDERKEY%',$this->aesL->gadnid('reminderkey_title'),$html);$html=aecFt::rphl('%AESECUREMAILREMINDERKEY_INFO%', sprintf($this->aesL->gadnid('reminderkey_info'),$_SERVER['REMOTE_ADDR']),$html);$html=aecFt::rphl('%AESECUREMAILREMINDERKEY_SECRET%',$this->aesL->gadnid('reminderkey_secret'),$html);$html=aecFt::rphl('%AESECUREMAILTITLE%',$this->aesL->getMail('title'),$html);$html=aecFt::rphl('%ILLEGITIMATE%', sprintf($this->aesL->getMail('illegitimate'),$this->aesC->get('sitename')),$html);$html=aecFt::rphl('%ACCESSEDURL%',$this->aesL->getMail('url'),$html);$html=aecFt::rphl('%TYPEOFATTACK%',$this->aesL->getMail('attack'),$html);
list($msg,$ban,$mail)=$this->aeSt->getCode(self::$code);$html=aecFt::rphl('%AESECURE_ATTACK%',$msg.' ('.self::$code.')',$html);$html=aecFt::rphl('%IPADDRESS%',$this->aesL->getMail('ipaddress'),$html);$html=aecFt::rphl('%SHOWLOG%',$this->aesL->getMail('showlog'),$html);$html=aecFt::rphl('%BANIP%',$this->aesL->getMail('banip'),$html);$html=aecFt::rphl('%SHOWVAE%',$this->aesL->getMail('showvar'),$html);$html=aecFt::rphl('%TECHINFOS%',$this->aesL->getMail('technicalinfos'),$html);if(strpos($html, '%VAR_SERVER%')>0){
$tmp='<ul class="list-unstyled">';
$arrIgnore=array('COMSPEC','DOCUMENT_ROOT','GATEWAY_INTERFACE','HTTP_ACCEPT','HTTP_ACCEPT_ENCODING','HTTP_ACCEPT_LANGUAGE','PATH','PATHEXT','SERVER_PROTOCOL','SystemRoot','WINDIR');foreach ($_SERVER as $key=>$value){
if(!in_array($key,$arrIgnore)){
if(!(is_array($value))){
$tmp.='<li><span class="glyphicon glyphicon-chevron-down">&nbsp;</span>'.$key.'='.$value.'</li>';} else{
$tmp.='<li><span class="glyphicon glyphicon-chevron-down">&nbsp;</span>'.$key.'='.print_r($value,true).'</li>';}}}
$tmp.='</ul>';$html=aecFt::rphl('%VAR_SERVER%',$tmp,$html);}
$tmp='<ul class="list-unstyled">';foreach ($_GET as $key=>$value) $tmp.='<li><span class="glyphicon glyphicon-chevron-down">&nbsp;</span>'.$key.'='.$value.'</li>';
$tmp.='</ul>';$html=aecFt::rphl('%VAR_GET%',$tmp,$html);
$tmp='<ul class="list-unstyled">';foreach ($_POST as $key=>$value) $tmp.='<li><span class="glyphicon glyphicon-chevron-down">&nbsp;</span>'.$key.'='.$value.'</li>';
$tmp.='</ul>';$html=aecFt::rphl('%VAR_POST%',$tmp,$html);
$url=$this->aeSt->siUl().'aesecure/process.php?'.($this->aesC->mo()?'':$this->aesC->get('key')).'&t=g';$html=aecFt::rphl('%URLGETLOG%',$url,$html);
$url=$this->aeSt->siUl().'aesecure/process.php?'.($this->aesC->mo()?'':$this->aesC->get('key')).'&t=b';$html=aecFt::rphl('%URLBANIP%',$url,$html);
try{
@$return=mail($this->aesC->get('mail','to'),$mailSubject,$html,$mailHeaders);$return=''; } catch (Exception $e){
$return='<html><body>An error has occured while sending the email...</body></html>';}}} else{ aecFt::SeAD($msg='The configuration don\'t allow to send emails',$extra='',$showErrorHeading=false);} return $return;}  public function Option91_getTabCleanTempFolder($action,$html){
$lUA=$this->aeSt->spts($action,'language');
$cty = str_replace('/',DIRECTORY_SEPARATOR,$this->aesC->tmp());$html=aecFt::rphl('%EXPLAIN%', str_replace('%1', '<strong>'.$cty.'</strong>',$this->aesL->$lUA('preface')),$html);
return $html;} public function Option94_getTabPassword($action,$html){
$lUA=$this->aeSt->spts($action,'language');$html=aecFt::rphl('%PWDLENGTH%',$this->aesL->$lUA('password_length'),$html);$html=aecFt::rphl('%YOURPWD%',$this->aesL->$lUA('password_generated'),$html);
return $html;} public function cOeld($action,$rcgtioN=false,$filename=null){
if($action==null) return;
$action=str_replace('.','',$action);
$bReturn=false;
$tag=$this->aeSt->spts($action,'tag');if((trim($filename)=='')||($filename==null)) $filename=$this->aeSt->siOt().'/.htaccess';if(file_exists($filename)&&(trim($tag)!=='')){
$htaccess=file_get_contents($filename, FILE_USE_INCLUDE_PATH);if(($action=='11')&&(strpos($htaccess, '#AESECURE')>0)){
$bReturn=true;$block = '';} else{
$block=aecFt::isTRls($htaccess,$tag);
$block=rtrim(rtrim(trim(str_replace($tag.'_START','',str_replace($tag.'_END','',$block))),'#'),PHP_EOL);if(trim($block)!==''){
$filename_disabled=$this->aeSt->spts($action,'filename_disabled');
$content_disabled='';if(trim($filename_disabled)!=''){
$tmp=dirname(dirname(__FILE__)).'/setup/snippets/'.$filename_disabled;if(file_exists($tmp)){
$content_disabled=file_get_contents($tmp, FILE_USE_INCLUDE_PATH);} else{
$tmp=str_replace('/setup','/premium/setup',$tmp);if(file_exists($tmp)) $content_disabled=file_get_contents($tmp, FILE_USE_INCLUDE_PATH);}
$this->aesD->log('Disabled value:'.$content_disabled);}
$bReturn=((((trim($content_disabled)=='')&&(trim($block)!=''))||((trim($content_disabled)!='')&&($block!==$content_disabled))) ?true:false);} else{
$bReturn=false;}}} else{
$block = '';
$bReturn=false;}
if($rcgtioN===true){
$datatype=$this->aeSt->spts($action,'datatype','boolean');
$configValue=$this->aesC->gtTy($action);if(in_array($datatype,array('text','boolean'))){
if(($datatype=='text')&&($configValue!=$block)){
$this->aesC->Sfcy($action,'',$block);} elseif(($datatype=='boolean')&&($configValue!=$bReturn)){
$this->aesC->Sfcy($action,'',$bReturn);}}} return array($bReturn,$block);} public function rtFeD(){
$status='';if(file_exists($this->aeSt->siOt().'/.htaccess')){
$htaccess=file_get_contents($this->aeSt->siOt().'/.htaccess', FILE_USE_INCLUDE_PATH);
$actions=$this->aeSt->spts();foreach ($actions as $action=>$data){
$tag=$this->aeSt->spts($action,'tag');
$target=$this->aeSt->spts($action,'htaccess');if(trim($target)!='') $target=$this->aeSt->siOt().$target;if(trim($tag)!==''){
$lUA=$this->aeSt->spts($action,'language');
$iPim=$this->aeSt->spts($action,'premium');
$iPio=$this->aeSt->spts($action,'pro');
$text=$this->aesL->$lUA('title');
list($bBle,$block)=self::cOeld($action,false,$target);if(($iPim||$iPio)&&($this->aesC->mo())){
$block=$this->aesL->getMain('hiddenindemo');}
if(($bBle===true)||(in_array($action,array(13,17,71)))){
$option=self::giDFly($action);
$popup=' data-toggle="popover" data-content="'.str_replace('<','-',str_replace('>','-',str_replace('"','\'',str_replace(PHP_EOL,'&lt;br/&gt;',$block)))).'"';
$span=(trim($block)==''?$text:'<span '.$popup.' style="border-bottom:1px dotted;">'.
$text.'</span>'.($iPim?$this->premium:'').($iPio?$this->pro:''));
$anchor=$this->aeSt->spts($action,'anchor','');if($anchor!=''){
$anchor='&nbsp;<a class="scroll-anchor" href="#'.$anchor.'" data-anchor="#'.$anchor.'">'.'<span  style="font-size:0.8em;" class="glyphicon glyphicon-link" /></a>';}
$status.='<li class="'.($bBle==true?'green':'red').'">'.$option.$span.'&nbsp;'.$anchor.'&nbsp;<span class="glyphicon glyphicon-'.($bBle==true?'ok':'remove').'"/>'.$this->aesL->getMain(($bBle==true?'state_enabled':'state_disabled')).'</li>';}}}
if(trim($status)!=''){
$status='<div id="aeSecureActiveFunctionnalities"><ul style="list-style-type: none;">'.$status.'</ul></div>';
$status.="<script>$('.scroll-anchor').click(function (){var anchor=$(this).data('anchor'); niceDisplayAnchor(anchor);})</script>";}} return $status;} public function Option11_getTabEnableaeSecure($action,$html){
$this->aesD->log('Task '.$action.' - Showing');
$filename=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('File:'.$filename);
$lUA=$this->aeSt->spts($action,'language');$html=aecFt::rphl('%AESECURESEECURRENTHTACCESS%',$this->aesL->getTools('see_current_htaccess'),$html);$html=aecFt::rphl('%AESECURESEEHTACCESS_HINT%',$this->aesL->getTools('see_htaccess_hint'),$html);
$filename=$this->aeSt->siOt().'/.htaccess';if(file_exists($filename)){
$tmp=file_get_contents($filename, FILE_USE_INCLUDE_PATH);if(strpos($tmp,'#aeSecure 1.1')>0){
$status=self::rtFeD();$html=str_replace('<!-- AESECURE_STATUS -->',$status,$html);}} return $html;} public function Option14_getTabManualEdit($action,$html){
$this->aesD->log('Task '.$action.' - Showing');
$target=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('File:'.$target);if(file_exists($target)){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$tag=$this->aeSt->spts($action,'tag');
$OHtc=aecFt::isTRls($htaccess, '#'.$tag);
$type=$this->aeSt->spts($action,'type');
$lUA=$this->aeSt->spts($action,'language');$html=aecFt::rphl('%ID%',$action,$html);$html=aecFt::rphl('%PLACEHOLDER%',$this->aesL->$lUA('placeholder'),$html);$html=aecFt::rphl('%EXPLAIN%',$this->aesL->$lUA('explain'),$html);$html=aecFt::rphl('%SAVEDMSG%', str_replace("'", "\'",$this->aesL->$lUA('saved')),$html);
$OHtc=aecFt::rphl('#'.$this->aeSt->spts($action,'tag').'_START','',$OHtc);
$OHtc=aecFt::rphl('#'.$this->aeSt->spts($action,'tag').'_END','',$OHtc);
$OHtc=str_replace('#aeSecure 1.4'.PHP_EOL,'',$OHtc);$html=str_replace('%VALUES%',$OHtc,$html);if((strpos($html,'%BACKUPVALUES%'))!==false){
$html=str_replace('%BACKUPVALUES%',$this->aesC->gtTy($action),$html);}
if((strpos($html,'%RESTOREFROMCONFIG%'))!==false) $html=aecFt::rphl('%RESTOREFROMCONFIG%',$this->aesL->getMain('restorefromconfig'),$html);if((strpos($html,'%RESTOREFROMCONFIGHINT%'))!==false) $html=aecFt::rphl('%RESTOREFROMCONFIGHINT%',$this->aesL->getMain('restorefromconfig_hint'),$html);} else{
$html=aecFt::feck('failure').sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$target));} return $html;} public function Option15_getTabBlockIP($action,$html){
$this->aesD->log('Task '.$action.' - Showing');
$target=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('File:'.$target);if(file_exists($target)){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$tag=$this->aeSt->spts($action,'tag');
$blockedip=$this->aesC->gtTy($action);
$type=$this->aeSt->spts($action,'type');
$lUA=$this->aeSt->spts($action,'language');$html=aecFt::rphl('%ID%',$action,$html);$html=aecFt::rphl('%PREFACE%',$this->aesL->$lUA('preface'),$html);$html=aecFt::rphl('%VALUES%',$blockedip,$html);$html=aecFt::rphl('%SAVEDMSG%', str_replace("'", "\'",$this->aesL->$lUA('saved')),$html);
$blockedip=aecFt::rphl('#'.$this->aeSt->spts($action,'tag').'_START','',$blockedip);
$blockedip=aecFt::rphl('#'.$this->aeSt->spts($action,'tag').'_END','',$blockedip);$html=str_replace('%VALUES%',$blockedip,$html);if((strpos($html,'%BACKUPVALUES%'))!==false){
if(trim($this->aesC->get(strtolower($tag)))!=''){
$IPs=$this->aesC->get(strtolower($tag));$this->aesC->Sfcy($action,'',$IPs);}
$html=str_replace('%BACKUPVALUES%',$this->aesC->gtTy($action),$html);}} else{
$html=aecFt::feck('failure').sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$target));} return $html;} public function Option17_getTabBlockFiles($action,$html){
$this->aesD->log('Task '.$action.' - Showing');
$target=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('File:'.$target);if(file_exists($target)){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$tag=$this->aeSt->spts($action,'tag');
$blockedfiles=$this->aesC->gtTy($action);if(trim($blockedfiles)==''){
$OHtc=aecFt::isTRls($htaccess, '#'.$tag);
$blockedfiles=aecFt::gtGcnt($htaccess=$OHtc,$tag=$tag,$EOL_char=';',
$aIgLn=array('RewriteCond %{QUERY_STRING}','RewriteCond %{SCRIPT_FILENAME} -f','RewriteRule'),
$aIRPtN=array('RewriteCond %{REQUEST_FILENAME}','[NC,OR]','$','(',')',PHP_EOL),
$aIrCHr=array('|'=>';'));}
$type=$this->aeSt->spts($action,'type');
$lUA=$this->aeSt->spts($action,'language');$html=aecFt::rphl('%ID%',$action,$html);$html=aecFt::rphl('%PREFACE%',$this->aesL->$lUA('preface'),$html);$html=aecFt::rphl('%VALUES%',$blockedfiles,$html);$html=aecFt::rphl('%SAVEDMSG%', str_replace("'", "\'",$this->aesL->$lUA('saved')),$html);$html=str_replace('%VALUES%',$blockedfiles,$html);if((strpos($html,'%BACKUPVALUES%'))!==false){
$html=str_replace('%BACKUPVALUES%',$this->aesC->gtTy($action),$html);}} else{
$html=aecFt::feck('failure').sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$target));} return $html;}
private function sCoig($action){
$this->aesD->BggP('aeSecure::sCoig()');$this->aesD->log('Action:'.$action);
$configTab=$this->aeSt->spts($action,'confightml');$html='';if($this->aesC->mo()){
$html=aecFt::feck('warning',$this->aesL->getMain('hiddenindemo'));} else{
if(trim($configTab)!=''){
if(method_exists($this,$configTab)){
$tmp=self::$configTab($action,$html);} elseif(method_exists($this->aecPe,$configTab)){
$tmp=$this->aecPe->$configTab($action,$html);} elseif(method_exists($this->aecPo,$configTab)){
$tmp=$this->aecPo->$configTab($action,$html);} else{
$this->aesD->log('Method not found:'.$configTab, array('type'=>'error'));
$pro=$this->aeSt->spts($action,'pro',false);
$msg=$this->aesL->getMain($pro==false?'onlypremium':'onlypro');
$tmp=aecFt::feck('warning',$msg);}
if(trim($tmp)!='') $html=$tmp;}} return $html;}
private function swTn($action){
$this->aesD->BggP('aeSecure::swTn()');$this->aesD->log('Action:'.$action);$file='snippets/'.$this->aeSt->spts($action,'filename');
$div=$this->aeSt->spts($action,'div');
$tag=$this->aeSt->spts($action,'tag','');$this->aesD->log('Tag:'.(trim($tag)==''?'none':$tag));
$type=$this->aeSt->spts($action,'type');
$anchor=$this->aeSt->spts($action,'anchor');
$modal=$this->aeSt->spts($action,'modal');
$lUA=$this->aeSt->spts($action,'language');
$filename_disabled=$this->aeSt->spts($action,'filename_disabled');
$protectTab=$this->aeSt->spts($action,'protecthtml');
$htaccess='/'.ltrim($this->aeSt->spts($action,'htaccess','.htaccess'),'/');$this->aesD->log('.htaccess to modify:'.$htaccess);if(method_exists($this->aesL,$lUA)){
$title=$this->aesL->$lUA('title');
$enabled=$this->aesL->$lUA('state_enabled');
$diBD=$this->aesL->$lUA('state_disabled');
$confirm=$this->aesL->$lUA('confirm');
$confirm_kill=$this->aesL->$lUA('confirm_kill');
$file_removed=$this->aesL->$lUA('file_removed');
$hint=$this->aesL->$lUA('hint');
$fUeB=$this->aesL->$lUA('feature_enabled');
$fDIb=$this->aesL->$lUA('feature_disabled');
$fRsTe=$this->aesL->$lUA('feature_restored');
$protect=$this->aesL->$lUA('protect');} else{
$title='';$enabled='';$diBD='';$confirm='';$confirm_kill='';$protect='';
$file_removed='';$hint='';$fUeB='';$fDIb='';$fRsTe='';}
if(trim($protect)=='') $protect=$this->aesL->getMain('protect');if(trim($enabled)=='') $enabled=$this->aesL->getMain('state_enabled');if(trim($diBD)=='') $diBD=$this->aesL->getMain('state_disabled');if(trim($fUeB)=='') $fUeB=$this->aesL->getMain('feature_enabled');if(trim($fDIb)=='') $fDIb=$this->aesL->getMain('feature_disabled');if(trim($fRsTe)=='') $fRsTe=$this->aesL->getMain('feature_restored');if(trim($type)!=''){
$formname=self::$tlttH.'form_'.$type.'.'.self::$layout.'.aec';if(!file_exists($formname)){
$folder=($this->aeSt->spts($action,'pro','false')=='true'?'pro':'premium');
$formname =dirname(dirname(__FILE__)).'/'.$folder.'/template/'.'form_'.$type.'.'.self::$layout.'.aec';}} else{
$formname='';}
$this->aesD->log('formname:'.$formname);if((trim($type)==='')||(file_exists($formname))){
$snippet = $this->aeSt->aERot().'/setup/'.$file;if(!file_exists($snippet)) $snippet = $this->aeSt->aERot().'/premium/setup/'.$file;$this->aesD->log('snippet:'.$snippet);
$bnUe = (trim($file)==''?true:file_exists($snippet));if($bnUe){
$target=$this->aeSt->siOt().$htaccess;if(file_exists($target)&&(trim($tag)!=='')){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$block=aecFt::isTRls($htaccess,$tag);
$block=rtrim(rtrim(trim(str_replace($tag.'_START','',str_replace($tag.'_END','',$block))),'#'),PHP_EOL);} else{
$block = '';}
$this->aesD->log('Current value:'.$block);
$content_disabled='';if(trim($filename_disabled)!=''){
$tmp=dirname(dirname(__FILE__)).'/setup/snippets/'.$filename_disabled;if(file_exists($tmp)){
$content_disabled=file_get_contents($tmp, FILE_USE_INCLUDE_PATH);} else{
$tmp=str_replace('/setup','/premium/setup',$tmp);if(file_exists($tmp)) $content_disabled=file_get_contents($tmp, FILE_USE_INCLUDE_PATH);}
$this->aesD->log('Disabled value:'.$content_disabled);}
if($action!=11){
list($bBle,$block)=self::cOeld($action,false,$target);
$checked=($bBle?'checked="checked"':'');} else{
$checked='';if(file_exists($this->aeSt->siOt().'/.htaccess')){
$tmp=file_get_contents($this->aeSt->siOt().'/.htaccess', FILE_USE_INCLUDE_PATH);if(strpos($htaccess, '#AESECURE')>0) $checked='checked="checked"';}}
if(trim($lUA)=='') $lUA='getMain';$html=(trim($formname)!='')?file_get_contents($formname, FILE_USE_INCLUDE_PATH):'';if((strpos($html,'%BACKUPVALUES%'))!==false){
$html=str_replace('%BACKUPVALUES%',($this->aesC->mo()===true?$this->aesL->getMain('hiddenindemo'):$block),$html);}
$html=aecFt::rphl('%AESECURETOKEN%',$this->aesS->get('token',NULL),$html);$html=aecFt::rphl('%TOKEN%',$this->aesS->get('token_value',NULL),$html);$html=aecFt::rphl('%ID%',$action,$html);$html=aecFt::rphl('%TAG%',$this->aeSt->spts($action,'tag'),$html);$html=aecFt::rphl('%DIV%',$div,$html);$html=aecFt::rphl('%ANCHOR%',$anchor,$html);$html=aecFt::rphl('%MODAL%',$modal,$html);$html=aecFt::rphl('%CONFIRM%',$confirm,$html);$html=aecFt::rphl('%CONFIRMKILL%',$confirm_kill,$html);$html=aecFt::rphl('%FILEREMOVED%',$file_removed,$html);$html=aecFt::rphl('%HINT%',$hint,$html);$html=aecFt::rphl('%ENABLE%',$enabled,$html);$html=aecFt::rphl('%DISABLE%',$diBD,$html);$html=aecFt::rphl('%CHECKED%',$checked,$html);$html=aecFt::rphl('%FEATURE_ENABLED%',str_replace("'","\'",$fUeB),$html);$html=aecFt::rphl('%FEATURE_DISABLED%', str_replace("'","\'",$fDIb),$html);$html=aecFt::rphl('%FEATURE_RESTORED%', str_replace("'","\'",$fRsTe),$html);$html=aecFt::rphl('%ADD%', str_replace("'", "\'",$this->aesL->getMain('add')),$html);$html=aecFt::rphl('%ADDHINT%', str_replace("'", "\'",$this->aesL->getMain('add_hint')),$html);$html=aecFt::rphl('%ADDMSG%', str_replace("'", "\'",$this->aesL->$lUA('addmsg')),$html);$html=aecFt::rphl('%ADDMSG2%', str_replace("'", "\'",$this->aesL->$lUA('addmsg2')),$html);$html=aecFt::rphl('%PROTECT%',$protect,$html);$html=aecFt::rphl('%UNPROTECT%',$this->aesL->getMain('unprotect'),$html);$html=aecFt::rphl('%CLICKONPROTECT%',$this->aesL->getMain('clickonprotect'),$html);$html=aecFt::rphl('%CONFIRM_SAVE%', str_replace("'", "\'",$this->aesL->getMain('confirm_save')),$html);$html=aecFt::rphl('%SAVE%', str_replace("'","\'",$this->aesL->getMain('save')),$html);$html=aecFt::rphl('%CLOSE%', str_replace("'","\'",$this->aesL->getMain('close')),$html);$html=aecFt::rphl('%CANCEL%', str_replace("'","\'",$this->aesL->getMain('cancel')),$html);$html=aecFt::rphl('%ADDRESSIP%', str_replace("'","\'",$this->aesL->$lUA('addressip')),$html);$html=aecFt::rphl('%PREVIOUS%', str_replace("'","\'",$this->aesL->$lUA('previous')),$html);$html=aecFt::rphl('%ONLYPREMIUM%', str_replace("'","\'",$this->aesL->getMain('premium')),$html);$html=aecFt::rphl('%AESECURESITEURL%',$this->aeSt->siUl(),$html);if((strpos($html,'%ACTION_TAG_START%'))!==false) $html=str_replace('%ACTION_TAG_START%', '<strong>#'.$tag.'_START</strong>',$html);if((strpos($html,'%ACTION_TAG_END%'))!==false) $html=str_replace('%ACTION_TAG_END%', '<strong>#'.$tag.'_END</strong>',$html);if((strpos($html,'%RESTOREFROMCONFIG%'))!==false) $html=aecFt::rphl('%RESTOREFROMCONFIG%',$this->aesL->getMain('restorefromconfig'),$html);if((strpos($html,'%RESTOREFROMCONFIGHINT%'))!==false) $html=aecFt::rphl('%RESTOREFROMCONFIGHINT%',$this->aesL->getMain('restorefromconfig_hint'),$html);if((strpos($html,'%AESECUREPREMIUM%'))!==false) $html=aecFt::rphl('%AESECUREPREMIUM%',$this->premium,$html);if((strpos($html,'%AESECUREPRO%'))!==false) $html=aecFt::rphl('%AESECUREPRO%',$this->pro,$html);$html=aecFt::rphl('%NOCHANGE%',$this->aesL->getMain('nochange'),$html);$html=aecFt::rphl('%HINT_IP%',$this->aesL->$lUA('hint_ip'),$html);$html=aecFt::rphl('%HINT_FOLDER%',$this->aesL->getMain('hint_folder'),$html);$html=aecFt::rphl('%FOLDER%',$this->aesL->getMain('folder'),$html);$html=aecFt::rphl('%FILE%',$this->aesL->getMain('file'),$html);$html=aecFt::rphl('%LOGIN%',$this->aesL->getMain('login'),$html);$html=aecFt::rphl('%PASSWORD%',$this->aesL->getMain('password'),$html);$html=aecFt::rphl('%AESECUREMODAL_CLOSE%',$this->aesL->getMain('modal_close'),$html);$html=aecFt::rphl('%AREYOUSURE%',$this->aesL->getMain('are_you_sure'),$html);$html=aecFt::rphl('%AREYOUSURE_YES%',$this->aesL->getMain('sure_yes'),$html);$html=aecFt::rphl('%AREYOUSURE_NO%',$this->aesL->getMain('sure_no'),$html);$html=aecFt::rphl('%AESECUREDOWNLOADANDKILL%', str_replace("'","\'",$this->aesL->getMain('downloadandkill')),$html);$html=aecFt::rphl('%ADVANCED_PARAMETERS%',$this->aesL->getMain('advanced_parameters'),$html);$html=aecFt::rphl('%LOADFROMAESECURE%',$this->aesL->getMain('loadfromaesecure'),$html);$html=aecFt::rphl('%LOADFROMAESECUREHINT%',$this->aesL->getMain('loadfromaesecure_hint'),$html);$html=aecFt::rphl('%SAVEFROMAESECUREHINT%',$this->aesL->getMain('savefromaesecure_hint'),$html);$html=aecFt::rphl('%PERMISSIONS%',$this->aesL->getMain('permissions'),$html);$html=aecFt::rphl('%PREFACE%',$this->aesL->$lUA('preface'),$html);$html=aecFt::rphl('%CANT_BE_USED%', str_replace("'","\'",$this->aesL->$lUA('cant_be_used')),$html);$html=aecFt::rphl('%SEARCH%',$this->aesL->getMain('search'),$html);$html=aecFt::rphl('%RECOMMANDED_STATE%',$this->aesL->getMain('recommanded_state'),$html);$html=aecFt::rphl('%RECOMMANDED_STATE_VALUE%',$this->aesL->$lUA('recommanded'),$html);if($this->aesC->Hpotns()===true) list($html,$bRemoved) = self::rmPotns($html,null);
$tmp='';if(trim($protectTab)!=''){
if(method_exists($this,$protectTab)){
$tmp=self::$protectTab($action,$html);} elseif(method_exists($this->aecPe,$protectTab)){
$tmp=$this->aecPe->$protectTab($action,$html);} elseif(method_exists($this->aecPo,$protectTab)){
$tmp=$this->aecPo->$protectTab($action,$html);} else{
$this->aesD->log('Method not found:'.$protectTab, array('type'=>'error'));
$pro=$this->aeSt->spts($action,'pro',false);
$msg=$this->aesL->getMain($pro==false?'onlypremium':'onlypro');
$tmp=aecFt::feck('warning',$msg);}
if(trim($tmp)!='') $html=$tmp;}} else{
$html=aecFt::showFailure($this->aesL->getMain('sorry_notfree').$this->aesL->gasGit());$this->aesD->log('File not found:'.$snippet, array('type'=>'error'));}} else{
$html =aecFt::showFailure($this->aesL->getMain('sorry_notfree').$this->aesL->gasGit());$this->aesD->log('File not found:'.$formname, array('type'=>'warning'));}
$this->aesD->cSgP();
return $html;}
private static function giDFly($id){return substr($id,0,1).'.'.substr($id,-1).' ';}
private function rmPotns($html,$wChapter){
if($this->aesC->mo()) return array($html,false);
$bRemoved=false;
$dom = new DOMDocument();
try{
@$dom->loadHTML('<?xml version="1.0" encoding="utf-8"?>'.$html);} catch (Exception $ex){}
$xpath = new DOMXPath($dom);if($wChapter!=null){
$arrNode=array('div','li');foreach ($arrNode as $tag){
$nodelist = $xpath->query("//".$tag);foreach ($nodelist as $n){
$id=$n->getAttribute('data-aesecureid');if($id!=null){
$pro=$this->aeSt->spts((int)$id,'pro','false')==='true'?true:false;
$premium=$this->aeSt->spts((int)$id,'premium','false')==='true'?true:false;if((($premium===true)&&($this->_iPiId===false))||(($pro===true)&&($this->_iPoId===false))){
$n->parentNode->removeChild($n);if($bRemoved==false){
$this->aesD->BggP('aeSecure::rmPotns() for group ['.$wChapter.']');
$bRemoved=true;}
$this->aesD->log('Free version of aeSecure - Remove advanced option ['.$id.']');}}}}
if($bRemoved==true) $this->aesD->cSgP();} else{
$arrNode=array('span','div','li');foreach ($arrNode as $tag){
$nodelist = $xpath->query("//".$tag);foreach ($nodelist as $n){
$type=trim($n->getAttribute('data-aesecure'));if($type!=null){
$type=strtolower($type);if((($type==='premium')&&($this->_iPiId===false))||(($type==='pro')&&($this->_iPoId===false))){
$n->parentNode->removeChild($n);if($bRemoved==false){
$bRemoved=true;$this->aesD->log('Free version of aeSecure - Remove advanced option ['.$id.']');}}}}}}
if($bRemoved) $html=$dom->saveHTML();
unset($dom);
return array($html,$bRemoved);}
private function rmUotns($html,$wChapter){
if($this->aesC->mo()) return array($html,false);if($wChapter=='4'){
$isJoomla=aecFt::iJaSt($this->aeSt->siOt());} elseif($wChapter=='5'){
$dbhost=$this->aesC->get('db','host');
$dbuser=$this->aesC->get('db','user');
$dbDriven=((trim($dbhost)=='')||(trim($dbuser)==''))?false:true;}
$bRemoved=false;
$dom = new DOMDocument();
$dom->loadHTML($html);
$xpath = new DOMXPath($dom);
$arrNode=array('div','li');foreach ($arrNode as $tag){
$nodelist = $xpath->query("//".$tag);foreach ($nodelist as $n){
$bRemoveNode=false;
$id=$n->getAttribute('data-aesecureid');if($id!=null){
if($wChapter=='4'){
$cms_joomla=$this->aeSt->spts((int)$id,'cms_joomla','false')==='true'?true:false;
$bRemoveNode=(($cms_joomla===true)&&($isJoomla===false));} elseif($wChapter=='5'){
$bRemoveNode=!$dbDriven;}
if($bRemoveNode===true){
$n->parentNode->removeChild($n);if($bRemoved==false){
$this->aesD->BggP('aeSecure::rmUotns() for group ['.$wChapter.']');
$bRemoved=true;}
$this->aesD->log('Remove unneeded option for this website ['.$id.']');}}}}
$html=$dom->saveHTML();
unset($dom);if($bRemoved==true) $this->aesD->cSgP();
return array($html,$bRemoved);}
private function Setup($args=null){
$this->aesS->isValid();require_once (dirname(dirname(__FILE__)).'/setup/setup.php');
$aeSu=new aeCtu($args);if(isset($_POST[$this->aeSt->Params('setuptask')])){
$action=aecFt::gRvl($param=$this->aeSt->Params('setuptask'),$default='0',$maxlen=50,$type='array_int',$where='POST');} else{
$action=aecFt::gRvl($param=$this->aeSt->Params('setuptask'),$default='0',$maxlen=50,$type='array_int');}
if(is_array($action)){
$this->aesD->log('Action:w=['.implode(',',$action).']', array('Type'=>'info'));} else{
$this->aesD->log('Action:w='.$action, array('Type'=>'info'));}
$getText=aecFt::gRvl($param=$this->aeSt->Params('gettext'),$default='0',$maxlen=1,$type='int',$where='POST');if(!(in_array($getText, array(0,1,2,3,4)))) $getText=0;
$tmp=array('Show setup page','Get \'full text\' tab','Get \'Try it\' tab','Get \'Protect it\' tab', 'Get the \'Get actual config\' tab');$this->aesD->log('getText:t='.$getText.' ==> '.$tmp[$getText], array('Type'=>'info'));
$showUseKey=NULL;if(isset($_SESSION['showkey'])){
$showUseKey=((int)$_SESSION['showkey']==1)?true:false;
unset($_SESSION['showkey']);} else{
$showUseKey=aecFt::gRvl($param='key',$default='0',$maxlen=1,$type='bool');}
if(($getText==0)&&((int)$action==0)){
if(!(file_exists(self::$tlttH.'setup.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup.aec is not found; error');$html=file_get_contents(self::$tlttH.'setup.aec', FILE_USE_INCLUDE_PATH);if($showUseKey===false){
if(!(file_exists(self::$tlttH.'setup_content.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup_content.aec is not found; error');
$tmp=file_get_contents(self::$tlttH.'setup_content.aec', FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECURE_CONTENT%',$tmp,$html);if(!(file_exists(self::$tlttH.'setup_topnav.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup_content.aec is not found; error');
$tmp=file_get_contents(self::$tlttH.'setup_topnav.aec', FILE_USE_INCLUDE_PATH);if($this->aesC->Hpotns()===true) list($tmp,$bRemoved) = self::rmPotns($tmp,'setup_topnav');$html=aecFt::rphl('%AESECURE_TOPNAV%',$tmp,$html);if(!(file_exists(self::$tlttH.'setup_sidebar.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup_content.aec is not found; error');
$tmp=file_get_contents(self::$tlttH.'setup_sidebar.aec', FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECURE_SIDEBAR%',$tmp,$html);if(!(file_exists(self::$tlttH.'setup_header.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup_content.aec is not found; error');
$tmp=file_get_contents(self::$tlttH.'setup_header.aec', FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECURE_HEADER%',$tmp,$html);$html=aecFt::rphl('%AESECURETIPS_CLOSE_HINT%',$this->aesL->getTips('close_hint'),$html);
$arr=array('1','2','3','4','5','7','8','9');foreach ($arr as $value){
if(!(file_exists(self::$tlttH.'setup_'.$value.'.aec'))) aecFt::SeAD('The file '.self::$tlttH.'setup_'.$value.'.aec is not found; error');
$tmp=file_get_contents(self::$tlttH.'setup_'.$value.'.aec', FILE_USE_INCLUDE_PATH);if($this->aesC->Hpotns()===true){
list($tmp,$bRemoved) = self::rmPotns($tmp,$value);if($bRemoved===true){
$tmp=aecFt::rphl('%AESECUREPOPUPTITLECHAPTER'.$value.'%',str_replace('"','\'','<span style="font-size:1.2em;">'.$this->aesL->getMain('advancedoptionsarehidden').'</span>'),$tmp);}}
if(strpos($tmp,'%AESECUREPOPUPTITLECHAPTER'.$value.'%')){
$title=$this->aesL->getMain('chapter'.$value.'popuptitle','');
$tmp=aecFt::rphl('%AESECUREPOPUPTITLECHAPTER'.$value.'%',$title,$tmp);}
switch ($value){
case 4:list($tmp,$bRemoved) = self::rmUotns($tmp,$value); break;case 5:list($tmp,$bRemoved) = self::rmUotns($tmp,$value); break;}
$html=aecFt::rphl('%AESECURE_SECTION_'.$value.'%',$tmp,$html);}
if(strpos($html,'%AESECURE_TMPL_QUICKINFO%')){
$tmp=file_get_contents(self::$tlttH.'setup_modal_quickinfo.aec', FILE_USE_INCLUDE_PATH);$html=aecFt::rphl('%AESECURE_TMPL_QUICKINFO%',$tmp,$html);}
$html=aecFt::rphl('%AESECUREEXTRA_JS%', '',$html);} else{
if(isset($_SESSION['minify_disabled'])){
$minify_disabled=$_SESSION['minify_disabled'];
unset($_SESSION['minify_disabled']);} else{
$minify_disabled=false;}
$setup_username=isset($_SESSION['user'])?$_SESSION['user']:'';$this->aesC->set('username',str_replace('@USER@','',$setup_username));if(trim($setup_username)!='') unset($_SESSION['user']) ;if(isset($_SESSION['language'])) $this->aesC->set('language',str_replace('@USER_LANGUAGE@','',$_SESSION['language']));$html=aecFt::rphl('%AESECUREPOSTINSTALL%',$this->aesL->getInstall('postinstall'),$html);$html=aecFt::rphl('%AESECURESETUP_KEYCHANGE%',$this->aesL->getInstall('key_change'),$html);$html=aecFt::rphl('%AESECURESETUP_KEYURL%', rtrim($this->aeSt->siUl(),'/').'/aesecure/setup.php?'.$this->aesC->get('key'),$html);$html=aecFt::rphl('%AESECURESETUP_KEY%',$this->aesL->getInstall('key'),$html);$html=aecFt::rphl('%AESECURESETUP_DISCLAIMER%',$this->aesL->getInstall('disclaimer'),$html);$html=aecFt::rphl('%AESECURESETUP_DISCLAIMER_CHK%',$this->aesL->getInstall('disclaimer_checkbox'),$html);$html=aecFt::rphl('%AESECURESETUP_DISCLAIMER_LIMITATION_CHK%',$this->aesL->getInstall('disclaimer_limitation_checkbox'),$html);$html=aecFt::rphl('%AESECURESETUP_DISCLAIMER_LIMITATION%',$this->aesL->getInstall('disclaimer_limitation'),$html);$html=aecFt::rphl('%AESECUREINSTALLEND%',$this->aesL->getInstall('finish'),$html);$html=aecFt::rphl('%AESECURESETUP_PLSWAIT%',$this->aesL->getInstall('finish_install'),$html);$html=aecFt::rphl('%AESECURE_TMPL_QUICKINFO%','',$html);$html=aecFt::rphl('%AESECUREMINIFYDISABLED%',($minify_disabled==true?'<div class="row alert alert-danger"><span class="col-md-1 glyphicon glyphicon-exclamation-sign" style="font-size:3em;"></span><span class="col-md-11">'. $this->aesL->getInstall('minify_disabled').'</span></div>':''),$html);$html=aecFt::rphl('%AESECUREEXTRA_JS%', '<script>PostInstall();</script>',$html);}
$html=self::rpVs($html);$html=aecFt::rphl('%AESECUREPREMIUM%',$this->premium,$html);$html=aecFt::rphl('%AESECUREPRO%',$this->pro,$html);$html=aecFt::rphl('%AESECURETOKEN%',$this->aesS->get('token'),$html);$html=aecFt::rphl('%TOKEN%',$this->aesS->get('token_value'),$html);$html=aecFt::rphl('%AESECUREUSERNAME%', str_replace('@USER@','',$this->aesC->get('username')),$html);$html=aecFt::rphl('%AESECUREDEBUG%',$this->aesC->dbu()?'true':'false',$html);$html=aecFt::rphl('%AESECUREKEY%',($this->aesC->mo()?'':$this->aesC->get('key')),$html);$html=aecFt::rphl('%AESECURESHOWUSEKEY%', ($showUseKey?'true':'false'),$html);$html=aecFt::rphl('%AESECUREVERSION%',$this->aeSt->get('version'),$html);$html=aecFt::rphl('%ONLYPREMIUM%', str_replace("'","\'",$this->aesL->getMain('premium')),$html);$html=aecFt::rphl('%ONLYPRO%', str_replace("'","\'",$this->aesL->getMain('pro')),$html);$html=aecFt::rphl('%AESECURELICENSE%', (!is_dir('premium')?'free':(!is_dir('dashboard')?'premium':'pro')),$html);$html=aecFt::rphl('%SITEBROKEN%', str_replace("'", "\'",$this->aesL->getMain('site_broken')),$html);$html=aecFt::rphl('%EDITANDSEARCHFOR%', str_replace("'", "\'",$this->aesL->getMain('edithtaccessandsearchfor')),$html);$html=aecFt::rphl('%ICONAESECUREPRO%',str_replace("'",'\"',$this->pro),$html);$html=aecFt::rphl('%HIDDENDEMOMODE%',str_replace("'",'\"',$this->aesL->getMain('hiddenindemo')),$html);if(strpos($html,'%AESECUREPREMIUM_JS%')!=false){
$tmp='';if(is_file($this->aeSt->aERot().'/premium/assets/aesecure.js')){
$tmp='<script type="text/javascript" src="premium/assets/aesecure.js?v='.str_replace(' ','.',$this->aeSt->get('version')).'"></script>';}
$html=aecFt::rphl('%AESECUREPREMIUM_JS%',$tmp,$html);}
if(strpos($html,'%AESECUREPRO_JS%')!=false){
$tmp='';if(is_file($this->aeSt->aERot().'/pro/assets/aesecure.js')){
$tmp='<script type="text/javascript" src="pro/assets/aesecure.js?v='.str_replace(' ','.',$this->aeSt->get('version')).'"></script>';}
$html=aecFt::rphl('%AESECUREPRO_JS%',$tmp,$html);}
$html=aecFt::rphl('%AESECURETITLEOPTIMIZE%',$this->aesL->getMain('optimize'),$html);$html=aecFt::rphl('%AESECUREGETIT%',$this->aesL->gasGit(),$html);$html=aecFt::rphl('%FANFACEBOOK%', aecFt::link('https://www.facebook.com/aesecure','<span id="fb" title="'.$this->aesL->getMain('fanfacebook').'">&nbsp;</span>','target="_blank"'),$html);$html=aecFt::rphl('%TWITTER%', aecFt::link('https://twitter.com/aesecure','<span id="twitter" title="'.str_replace('Facebook','Twitter',$this->aesL->getMain('fanfacebook')).'">&nbsp;</span>','target="_blank"'),$html);$html=aecFt::rphl('%GOOGLEPLUS%', aecFt::link('https://plus.google.com/+Aesecure789','<span id="linkgoogleplus" title="'.str_replace('Facebook','Google+',$this->aesL->getMain('fanfacebook')).'">&nbsp;</span>','target="_blank"'),$html);$html=aecFt::rphl('%AESECUREPAGETITLE%',$this->aesL->getMain('aeSecurePageTitle'),$html);$html=aecFt::rphl('%AESECURESETUPCONFIGTITLE%',$this->aesL->getConfigTitle(),$html);$html=aecFt::rphl('%AESECUREABOUT%',$this->aesL->getMain('about'),$html);$html=aecFt::rphl('%AESECUREACTIONS_BASE%',$this->aesL->getMain('actions_base'),$html);$html=aecFt::rphl('%AESECUREACTIONS_OTHER%',$this->aesL->getMain('actions_other'),$html);$html=aecFt::rphl('%AESECUREACTIONS_OPTIMIZE%',$this->aesL->getMain('actions_optimisation'),$html);$html=aecFt::rphl('%AESECUREACTIONS_MISC%',$this->aesL->getMain('actions_misc'),$html);$html=aecFt::rphl('%AESECUREMODAL_CLOSE%',$this->aesL->getMain('modal_close'),$html);$html=aecFt::rphl('%AESECURECONTACT%',$this->aesL->getMain('contact'),$html);$html=aecFt::rphl('%AESECURECONTINUE%',$this->aesL->getMain('continue'),$html);$html=aecFt::rphl('%AESECUREINSTALLDONE%', sprintf($this->aesL->getInstall('install_done'),$this->aeSt->get('version')),$html);$html=aecFt::rphl('%AESECUREDOCUMENTATION%',$this->aesL->getDocumentation('title'),$html);$html=aecFt::rphl('%AESECURESEOPTIONS%',$this->aesL->gtOns('title'),$html);$html=aecFt::rphl('%AESECURESEOPTIONS_HINT%',$this->aesL->gtOns('hint'),$html);$html=aecFt::rphl('%AESECUREDOCUMENTATION_HINT%',$this->aesL->getDocumentation('hint'),$html);$html=aecFt::rphl('%AESECURECODEREMOVER_HINT%',$this->aesL->getTools('coderemover-hint'),$html);$html=aecFt::rphl('%AESECUREJAMSS_HINT%',$this->aesL->getTools('jamss-hint'),$html);$html=aecFt::rphl('%AESECUREPSI_HINT%',$this->aesL->getTools('psi-hint'),$html);$html=aecFt::rphl('%AESECURELASTMOD_TEXT%',$this->aesL->getTools('lastmod-text'),$html);$html=aecFt::rphl('%AESECURELASTMOD_HINT%',$this->aesL->getTools('lastmod-hint'),$html);$html=aecFt::rphl('%AESECUREPHPINFO_TEXT%',$this->aesL->getTools('phpinfo-text'),$html);$html=aecFt::rphl('%AESECUREPHPINFO_HINT%',$this->aesL->getTools('phpinfo-hint'),$html);$html=aecFt::rphl('%AESECUREPENTEST_TEXT%',$this->aesL->getTools('pentest-text'),$html);$html=aecFt::rphl('%AESECUREPENTEST_HINT%',$this->aesL->getTools('pentest-hint'),$html);$html=aecFt::rphl('%AESECUREMIMETYPE_TEXT%',$this->aesL->getValue('mimetype','title'),$html);$html=aecFt::rphl('%AESECUREMIMETYPE_HINT%',$this->aesL->getValue('mimetype','hint'),$html);$html=aecFt::rphl('%AESECUREFORUM%',$this->aesL->getForum('title'),$html);$html=aecFt::rphl('%AESECUREFORUM_HINT%',$this->aesL->getForum('hint'),$html);$html=aecFt::rphl('%AESECURELINKS%',$this->aesL->getMain('links'),$html);$html=aecFt::rphl('%AESECUREDEMO%',$this->aesC->mo()?'true':'false',$html);
$css_rtl=$this->aeSt->get('css_rtl');if((trim($css_rtl)!='')&&($this->aesS->get('language')=='ar')){
$rtl='<link rel="stylesheet" href="'.$css_rtl.'" />';
$rtl.='<style>.ribbon-wrapper{display:none !important;}.nav-pills>li{float:none !important;}</style>';} else{
$rtl='';}
$html=aecFt::rphl('%AESECURERTL_SUPPORT%',$rtl,$html);$html=aecFt::rphl('%AESECURE_IMPORTANTINFO%',$this->aesL->getMain('important_info'),$html);$html=aecFt::rphl('%AESECURE_CHOICEVERSION%',$this->aesL->getMain('choice_version'),$html);$html=aecFt::rphl('%AESECURE_CHOICEVERSION_SUBTITLE%', sprintf($this->aesL->getMain('choice_version_subtitle'),$this->aeSt->aeWbt().'download',$this->aeSt->aeWbt()),$html);$html=aecFt::rphl('%AESECURESETUP_CONFIRM%',$this->aesL->getMain('confirm'),$html);$html=aecFt::rphl('%PRODASHBOARD%', 'Pro '.$this->aesL->gDhrd('title'),$html);$html=aecFt::rphl('%PRODASHBOARDCLASS%',is_dir('dashboard')?'':'disabled versiondisabled',$html);$html=aecFt::rphl('%PRODASHBOARDDISABLED%',is_dir('dashboard')?'':'disabled="disabled"',$html);$html=aecFt::rphl('%PROCLASS%',is_dir('pro')?'':'disabled versiondisabled',$html);$html=aecFt::rphl('%PRODISABLED%',is_dir('pro')?'':'disabled="disabled"',$html);$html=aecFt::rphl('%PREMIUMCLASS%',is_dir('premium')?'':'disabled versiondisabled',$html);$html=aecFt::rphl('%PREMIUMDISABLED%',is_dir('premium')?'':'disabled="disabled"',$html);$html=aecFt::rphl('%FREESELECTED%', (!is_dir('pro')&&!is_dir('premium'))?'checked="checked"':'',$html);$html=aecFt::rphl('%PREMIUMSELECTED%', (!is_dir('pro')&&is_dir('premium'))?'checked="checked"':'',$html);$html=aecFt::rphl('%PROSELECTED%', is_dir('pro')?'checked="checked"':'',$html);$html=aecFt::rphl('%AESECURETOOLS%',$this->aesL->getTools('title'),$html);$html=aecFt::rphl('%AESECURESECURITY%',$this->aesL->getMain('security'),$html);$html=aecFt::rphl('%AESECUREZIPWEB%',$this->aesL->getTools('ZipWebsite'),$html);$html=aecFt::rphl('%AESECUREZIPWEB_HINT%',$this->aesL->getTools('ZipWebsite_hint'),$html);$html=aecFt::rphl('%AESECURESEEHTACCESS%',$this->aesL->getTools('see_htaccess'),$html);$html=aecFt::rphl('%AESECURESEEHTACCESS_HINT%',$this->aesL->getTools('see_htaccess_hint'),$html);$html=aecFt::rphl('%AESECURESEEPHPINI%',$this->aesL->getTools('see_phpini'),$html);$html=aecFt::rphl('%AESECURESEEPHPINI_HINT%',$this->aesL->getTools('see_phpini_hint'),$html);$html=aecFt::rphl('%AESECURESEEACTIVITY%',$this->aesL->getTools('see_activity'),$html);$html=aecFt::rphl('%AESECURESEEACTIVITY_HINT%',$this->aesL->getTools('see_activity_hint'),$html);if(strpos($html,'%AESECUREFREEHIDDENPAIDOPTIONS%')){
$tmp='';if((!$this->_iPiId)||(!$this->_iPoId)){
if($this->aesC->Hpotns()===true){
if(!$this->_iPiId){
$tmp='<span>'.$this->aesL->getMain('versionfreehiddenpaidoptions').'</span>';} else{
$tmp='<span>'.$this->aesL->getMain('versionpremiumhiddenpaidoptions').'</span>';}}
$tmp='<div style="font-size:0.8em;max-width:220px;text-align:center;color:#CC3300;margin-top:40px;">'.$tmp.'</div>';}
$html=aecFt::rphl('%AESECUREFREEHIDDENPAIDOPTIONS%',$tmp,$html);}
$html=aecFt::rphl('%AESECURERESETHTACCESS%',$this->aesL->getTools('reset_htaccess'),$html);$html=aecFt::rphl('%AESECURERESETHTACCESS_HINT%', str_replace("|","\n",$this->aesL->getTools('reset_htaccess_hint')),$html);$html=aecFt::rphl('%AESECUREFILESANDFOLDERS%',$this->aesL->getMain('filesandfolders'),$html);$html=aecFt::rphl('%AESECUREDATABASE%',$this->aesL->getMain('database'),$html);$html=aecFt::rphl('%AESECUREGETLOG%',$this->aesL->getLog('menu'),$html);$html=aecFt::rphl('%AESECUREGETLOG_HINT%',$this->aesL->getLog('menu_hint'),$html);$html=aecFt::rphl('%AESECUREGETAPACHEERRORLOG%',$this->aesL->getTools('see_apache_error_log'),$html);$html=aecFt::rphl('%AESECUREGETAPACHEERRORLOG_HINT%', str_replace('\\r\\n',PHP_EOL.PHP_EOL,$this->aesL->getTools('see_apache_error_log_hint')),$html);$html=aecFt::rphl('%AESECURESEO%',$this->aesL->getMain('actions_seo'),$html);$html=aecFt::rphl('%AESECUREINTRO%',$this->aesL->getMain('intro'),$html);$html=aecFt::rphl('%AESECURETITLEMORE%',$this->aesL->getMain('more_info'),$html);$html=aecFt::rphl('%AESECURETITLEEDIT%',$this->aesL->getMain('edit'),$html);$html=aecFt::rphl('%AESECURETITLEPROTECT%',$this->aesL->getMain('protect'),$html);$html=aecFt::rphl('%AESECURETITLEPURGE%',$this->aesL->Option91_getCleanTempFolder('protect'),$html);$html=aecFt::rphl('%AESECURETITLECONFIGURE%',$this->aesL->getmain('configure'),$html);$html=aecFt::rphl('%AESECURETITLEACTUALCONFIG%',$this->aesL->getMain('actualconfig'),$html);$html=aecFt::rphl('%AESECURETITLEVERIFY%',$this->aesL->getMain('verify'),$html);$html=aecFt::rphl('%AESECURETITLEEXECUTE%',$this->aesL->getMain('execute'),$html);$html=aecFt::rphl('%AESECURETITLETEST%',$this->aesL->getMain('test'),$html);$html=aecFt::rphl('%AESECURETITLETEST_TIP%',$this->aesL->getMain('test_tip'),$html);
$actions=$this->aeSt->spts();foreach ($actions as $action=>$data){
$since=$this->aeSt->spts($action,'since','');
$isNew=((trim($since)!='')&&($since==trim(str_replace('beta','',$this->aeSt->get('version'))))? true: false);
$lUA=$this->aeSt->spts($action,'language');if(trim($lUA)!=''){
if(!(method_exists($this->aesL,$lUA))){
aecFt::SeAD('The public method '.$lUA.' isn\'t found in the '.'aecLa class.  Please add it.<br/>This method is needed for the option '.self::giDFly($action));}}
$iPim=$this->aeSt->spts($action,'premium',false);
$iPio=$this->aeSt->spts($action,'pro',false);
$tmp='%'.$action.'_AESECUREFCTCLASS%';if(($iPim==false)&&($iPio==false)){
$html=aecFt::rphl($tmp,'',$html);} else{
if(($iPim==true)&&($this->_iPiId==false)){
$html=aecFt::rphl($tmp,'paidFCT',$html);} else{
if(($iPio==true)&&($this->_iPoId==false)){
$html=aecFt::rphl($tmp,'paidFCT',$html);}}}
if(trim($lUA)!=''){
$html=aecFt::rphl('%'.$action.'_TITLE%', self::giDFly($action).
$this->aesL->$lUA('title').
'&nbsp;<a class="scroll-anchor" href="#'.$this->aeSt->spts($action,'anchor','').'" data-anchor="#'.$this->aeSt->spts($action,'anchor','').'"><span style="font-size:0.6em;" class="glyphicon glyphicon-link" /></a>'.
($iPio==true?$this->pro:($iPim==true?$this->premium:'')).
($isNew==true?$this->icon_new:''),$html);$html=aecFt::rphl('%'.$action.'_INTRO%',$this->aesL->$lUA('intro'),$html);}}
$html=aecFt::rphl('%AESECUREPERMISSIONS_UNCHANGED%',$this->aesL->Option31_getPermissions('unchanged'),$html);} else{
if($getText==0){
$this->aesS->isValid();$html='';foreach ($action as $key=>$value){
$html.=$aeSu->Setup($value);}} else{
foreach ($action as $key=>$value){
$lUA=$this->aeSt->spts($value,'language');if(method_exists($this->aesL,$lUA)){
$full=$this->aesL->$lUA('full');
$test=$this->aesL->$lUA('test');} else{
$full='';
$test='';}
$text='';if($getText==1){
$text=$full;
$arrHelp=$this->aeSt->spts($value,'help');if(is_array($arrHelp)){
if(isset($arrHelp[$this->aesS->get('language')])){
$helpurl=trim($arrHelp[$this->aesS->get('language')]);if(trim($helpurl)!=''){
$helpurl='<span class="glyphicon glyphicon-share-alt"></span>&nbsp;'.aecFt::link($helpurl,$this->aesL->getMain('helpreadonline'),'style="color:white;" target="_blank"');
$text.='<h4 style="text-align:center;"><div class="label label-success">'.$helpurl.'</div></h4>';}}}} elseif($getText==2){
switch ($value){
case 72:$text=sprintf($test,$this->aeSt->siUl(),$this->aeSt->siaM()); break;case 82:$text=sprintf($test,$this->aeSt->siUl(),base64_encode($this->aeSt->siUl())); break;
default:$text=$test;}} elseif($getText==3){
$this->aesS->isValid();
$text=self::swTn($value);} elseif($getText==4){
$text=self::sCoig($value);} else{
$text='invalid call';}
$html=self::rpVs($text);
$iJaSt=false;if(($value==2)||(($value>=40)&&($value<50))){
try{
$iJaSt=aecFt::iJaSt($this->aeSt->siOt());if(!$iJaSt) $html=aecFt::feck('info',$this->aesL->getMain('not_joomla'));} catch (Exception $e){}}} }}
unset($aeSu);
return $html;}
private function Logout(){
$this->aesS->destroy();header('Content-Type: text/html; charset=utf-8');
die($this->aesL->getMain('session_killed'));
return true;} public function Process($layout='default',$task=null,$args=null){
if(($layout==null)||(trim($layout)=='')) $layout='default';self::$layout = $layout;
$lUA=aecFt::gRvl($param='lang',$default='',$maxlen=5,$type='string',$where='POST');if(trim($lUA)=='') $lUA=aecFt::gRvl($param='lang',$default='',$maxlen=5,$type='string',$where='GET');if(trim($lUA)!=''){$arr=explode('#',$lUA);$this->aesL->set($arr[0]);}
$tmp=($task=='d'?$code='s':$code=$this->aeSt->Params('setuptask'));if(isset($_POST[$this->aeSt->Params('setuptask')])){
if($task==null) $task=aecFt::gRvl($param='t',$default='',$maxlen=1,$type='string',$where='POST');self::$code=aecFt::gRvl($param=$tmp,$default='0',$maxlen=4,$type='int',$where='POST');} else{
if($task==null) $task=aecFt::gRvl($param='t',$default='',$maxlen=1,$type='string');self::$code=aecFt::gRvl($param=$tmp,$default='0',$maxlen=4,$type='int');}
$html='';
switch ($task){
case $this->aeSt->Task('banIP'):$html=self::BanIP(); break;case $this->aeSt->Task('deny'):$html=self::gadHml(); break;case $this->aeSt->Task('getlog'):$html=self::gadDlg(); break;case 'l':self::Logout();break;case $this->aeSt->Task('maintenance'):{
if(isset($this->aecPe)){
$html=$this->aecPe->Maintenance();} else{
echo aecFt::feck('warning',$this->aesL->getMain('onlypremium'));}
break;}
case 'r':if(method_exists($this->aecPe,'RobotsTxt')) $this->aecPe->RobotsTxt();break;case $this->aeSt->Task('setup'):$html=self::Setup($args); break;case $this->aeSt->Task('viewmail'):$html=self::ViewMail(); break;
default:$html='';}
$this->aesD->alDg($msg='End of aeSecure',$resetLog=false,$outputHTML=false,$pos=0);echo $html;
return;}}