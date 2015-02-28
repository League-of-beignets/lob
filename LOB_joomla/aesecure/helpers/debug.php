<?php
   // @file : /helpers/debug.php
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
define ('_DEBUG_MSG', '<div class="btn btn-danger" style="white-space:normal;">[%s] [%s] [File&nbsp;%s] [Line&nbsp;%d] ==> %s</div>');
class aecDb{
private static $log_time=false;private static $log_addr=false;private static $log_uri=false;private static $log_file=false;protected static $instance = null;protected static $firephp=null;protected static $ajax=false;protected static $debugLogFile=null;private static $_errorlevels=null;private static $_displayError=true;private $aesC = null;private $aesS = null;private $aeSt = null;
function __construct(){
require_once(dirname(__FILE__).'/settings.php');$this->aeSt = aecSt::getInstance();require_once (dirname(__FILE__).'/session.php');$this->aesS = aecS::getInstance();require_once (dirname(__FILE__).'/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])){
self::$ajax=(strcasecmp($_SERVER['HTTP_X_REQUESTED_WITH'],'xmlhttprequest')==0);} else{
self::$ajax=false;}
if($this->aesC->dbu()===true){
self::$debugLogFile=dirname(dirname(__FILE__)).'/logs/debug.log';self::alDg($msg='Start aeSecure',$resetLog=!self::$ajax,$outputHTML=false,$pos=0);}
self::enable();
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aecDb;
return self::$instance;} public static function logFile(){
return static::$debugLogFile;} public function enable(){
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])&&strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
static::$_displayError=false;}
if(($this->aesC->dbu()===true)&&(self::$firephp==null)){
if(extension_loaded('xdebug')) xdebug_enable();
error_reporting(E_ALL);self::$_errorlevels = array (
E_ERROR => array('code'=>'E_ERROR'),  E_WARNING => array('code'=>'E_WARNING'),  E_PARSE => array('code'=>'E_PARSE'),  E_NOTICE => array('code'=>'E_NOTICE'),  E_CORE_ERROR => array('code'=>'E_CORE_ERROR'),  E_CORE_WARNING => array('code'=>'E_CORE_WARNING'),  E_COMPILE_ERROR => array('code'=>'E_COMPILE_ERROR'),  E_COMPILE_WARNING => array('code'=>'E_COMPILE_WARNING'),  E_USER_ERROR => array('code'=>'E_USER_ERROR'),  E_USER_WARNING => array('code'=>'E_USER_WARNING'),  E_USER_NOTICE => array('code'=>'E_USER_NOTICE'),  E_STRICT => array('code'=>'E_STRICT'),  E_RECOVERABLE_ERROR => array('code'=>'E_RECOVERABLE_ERROR'),  8192 => array('code'=>'E_DEPRECATED'),  16384 => array('code'=>'E_USER_DEPRECATED'),  E_ALL => array('code'=>'E_ALL'),  E_RECOVERABLE_ERROR => array('code'=>'E_RECOVERABLE_ERROR')
);
set_error_handler(array('aecDb', 'customErrorHandler'));if(file_exists('third/FirePHP/FirePHP.class.php')){
require_once('third/FirePHP/FirePHP.class.php');
ob_start();self::$firephp = FirePHP::getInstance(true);self::$firephp->setOptions(array('includeLineNumbers'=>false));if(self::$ajax==false){
self::BggP('Initialization aecDb');self::log('Debugging mode is enabled in the aeSecure configuration',array('ShowAjax'=>false));self::debugShowVar();self::cSgP();} else{}}} return true;}
static public function DisplayError($enable=true){
static::$_displayError=$enable;
return true;}
static public function alDg($msg=null,$resetLog=false,$outputHTML=false,$pos=0){
static $root='';if(trim($root)=='') $root=dirname(dirname(dirname(__FILE__)));
$debugTrace = debug_backtrace();$file='';$line='';$func='';if(isset($debugTrace[$pos])){
$file = $debugTrace[$pos]['file']?str_replace($root, '',$debugTrace[$pos]['file']):'';
$line = $debugTrace[$pos]['line']?$debugTrace[$pos]['line']:'';}
if(isset($debugTrace[$pos+1])){
$class = $debugTrace[$pos+1]['class']?$debugTrace[$pos+1]['class'].'::':'';
$func = $debugTrace[$pos+1]['function']?$debugTrace[$pos+1]['function'].'()':'';}
if(is_dir(dirname(dirname(__FILE__)).'/logs')){
if(is_writable(dirname(self::$debugLogFile))){
if(($resetLog===true)&&(file_exists(self::$debugLogFile))) unlink(self::$debugLogFile);
try{
$handle = fopen(self::$debugLogFile, 'a');if(($time = $_SERVER['REQUEST_TIME']) == '') $time = time();if(($remote_addr = $_SERVER['REMOTE_ADDR']) == '') $remote_addr = "REMOTE_ADDR_UNKNOWN";if(($request_uri = $_SERVER['REQUEST_URI']) == ''){
$request_uri = "REQUEST_URI_UNKNOWN";} else{
$request_uri=preg_replace('/&_=[0-9]*/','',$request_uri);}
$date = date("Y-m-d H:i:s",$time);if($outputHTML===true){
echo '<h3>'.$file.' '.$class.$func.' in line '.$line.':'.$msg.'</h3>';}
$result = fputcsv($handle, array((static::$log_time?$date:''), (static::$log_addr?$remote_addr:''), (static::$log_uri?$request_uri:''), (static::$log_file?$file:''),$class.$func,$line, str_replace('&nbsp;',' ',strip_tags($msg))));
fclose($handle);} catch (Exception $ex){}}} return true;}
static public function here($msg=null,$deep=3){
self::alDg($msg=$msg,$resetLog=false);
$pos=0;if($deep<1) $deep=1;
$debugTrace = debug_backtrace();$file='';$line='';$func='';$txt='';
for ($i=0; $i<$deep; $i++){
if(isset($debugTrace[$pos+$i])){
$file = $debugTrace[$pos+$i]['file']?$debugTrace[$pos+$i]['file']:'';
$line = $debugTrace[$pos+$i]['line']?$debugTrace[$pos+$i]['line']:'';}
if(isset($debugTrace[$pos+$i+1])){
$class = $debugTrace[$pos+$i+1]['class']?$debugTrace[$pos+$i+1]['class'].'::':'';
$func = $debugTrace[$pos+$i+1]['function']?$debugTrace[$pos+$i+1]['function'].'()':'';}
$txt.=($deep>1?'<li>':'').$class.$func.' in&nbsp;'.$file.' line&nbsp;'.$line.($deep>1?'</li>':'');}
$txt='<pre>'.__METHOD__.' called by '.($deep>1?'<ol>':'').$txt.($deep>1?'</ol>':'').
($msg!=null?'<div style="padding:10px;border:1px dotted;">'.print_r($msg,true).'</div>':'').
'</pre>';echo $txt;
return true;}
static function getCaller(){
if((self::$debugLogFile==null)||(self::$debugLogFile=='')) return '';
$wPos=2;
$debugTrace = debug_backtrace();
$caller=$debugTrace[$wPos]['class'].'::'.$debugTrace[$wPos]['function'].' (file '.$debugTrace[$wPos-1]['file'].' line '.$debugTrace[$wPos-1]['line'].')';
unset($debugTrace);
return $caller;}  private function debugShowVar(){
if(self::$firephp!=null){
$table=array();
$table[]=array('Name','Variable name','Value');
$table[]=array('Script name','$_SERVER[\'SCRIPT_NAME\']',$_SERVER['SCRIPT_NAME']);
$table[]=array('Key','$this->aesC->get(\'key\')',$this->aesC->get('key'));
$table[]=array('%SITEEMAIL%','$this->aesC->Mail(\'to\')',$this->aesC->Mail('to'));
$table[]=array('%SITEEMAIL%','$this->aesC->Mail(\'fromName\')',$this->aesC->Mail('fromName'));
$table[]=array('','$this->aesC->Log(\'folder\')',$this->aesC->Log('folder'));
$table[]=array('','$this->aesC->Language()',$this->aesC->Language());
$table[]=array('','$this->aesC->tmp()',$this->aesC->tmp());
$table[]=array('','$this->aesC->cache()',$this->aesC->cache());
$table[]=array('','$this->aesS->get(\'token\')',$this->aesS->get('token'));
$table[]=array('','$this->aesS->get(\'token_value\')',$this->aesS->get('token_value'));
$table[]=array('','$this->aesS->get(\'token_length\')',$this->aesS->get('token_length'));
$table[]=array('%SITENAME%','$this->aeSt->siaM()',$this->aeSt->siaM());
$table[]=array('%SITEURL%','$this->aeSt->siOt()',$this->aeSt->siOt());
$table[]=array('%HTTP_HOST%','$this->aeSt->siUl()',$this->aeSt->siUl());
$table[]=array('Website','$this->aeSt->Website()',$this->aeSt->Website());
$table[]=array('','$this->aeSt->aERot()',$this->aeSt->aERot());
$table[]=array('','$this->aeSt->aeWbt()',$this->aeSt->aeWbt());
$table[]=array('%REQUEST_TIME%','$_SERVER[\'REQUEST_TIME\']',$_SERVER['REQUEST_TIME']);
$table[]=array('%REQUEST_URI%','$_SERVER[\'REQUEST_URI\']',$_SERVER['REQUEST_URI']);
$table[]=array('%REMOTE_ADDR%','$_SERVER[\'REMOTE_ADDR\']',$_SERVER['REMOTE_ADDR']);
$table[]=array('%REQUEST_METHOD%','$_SERVER[\'REQUEST_METHOD\']',$_SERVER['REQUEST_METHOD']);
$table[]=array('%HTTP_USER_AGENT%','$_SERVER[\'HTTP_USER_AGENT\']',$_SERVER['HTTP_USER_AGENT']);
$table[]=array('%HTTP_HOST%','$_SERVER[\'HTTP_HOST\']',$_SERVER['HTTP_HOST']);
$table[]=array('%SERVER_SOFTWARE%','$_SERVER[\'SERVER_SOFTWARE\']',$_SERVER['SERVER_SOFTWARE']);self::$firephp->group('aeSecure Variables - '.__METHOD__.' ('.__FILE__.', '.__LINE__.')',array('Collapsed' => true));self::$firephp->table('Variables that can be used in, f.i., HTML templates or language\'s strings',$table);self::$firephp->groupEnd();
$table=array();
$table[]=array('Key','Value');foreach ($_SERVER as $key=>$value){
$table[]=array($key,$value);}
self::$firephp->group('Server variables - '.__METHOD__.' ('.__FILE__.', '.__LINE__.')',array('Collapsed' => true));self::$firephp->table('',$table);self::$firephp->groupEnd();}
return;}  public function BggP($groupTitle=''){
if(isset(self::$firephp)){
$caller = debug_backtrace();
$id=0;self::$firephp->group($groupTitle.' - '.$caller[$id]['class'].':'.$caller[$id]['function'].
' ('.$caller[$id]['file'].', '.$caller[$id]['line'].')', array('Collapsed'=>true));self::$firephp->info('url:'.$_SERVER['REQUEST_URI']);} return true;}  public function cSgP(){
if(isset(self::$firephp)) self::$firephp->groupEnd();
return true;}
static public function log($arrMsg,$arrOptions=null){
if(isset(self::$firephp)){
$caller = debug_backtrace();
$key=isset($arrOptions['ShowAjax'])?'ShowAjax':'showajax';
$showAjax=isset($arrOptions[$key])?$arrOptions[$key]:true;
$key=isset($arrOptions['GroupTitle'])?'GroupTitle':'grouptitle';
$groupTitle=isset($arrOptions[$key])?$arrOptions[$key]:null;
$key=isset($arrOptions['Type'])?'Type':'type';
$type=isset($arrOptions[$key])?strtolower($arrOptions[$key]):'log';if(!(in_array($type,array('log','info','error')))) $type='log';if($groupTitle!=null) self::$firephp->group($groupTitle.' - '.$caller[0]['class'].':'.$caller[0]['function'].' ('.$caller[0]['file'].', '.$caller[0]['line'].')', array('Collapsed'=>true));if(is_array($arrMsg)){
$table=array();
$table[]=array('Key','Value');foreach ($arrMsg as $key=>$value){
$table[]=array($key,str_replace('|','§',$value));if(is_array($value)){
foreach ($value as $tmp=>$data){
self::alDg($msg=$key.'=['.$tmp.']:['.$data.']',$resetLog=false,$outputHTML=false,$pos=1);}} else{
self::alDg($msg=$key.'='.$value,$resetLog=false,$outputHTML=false,$pos=1);}}
self::$firephp->table('',$table);} else{
self::alDg($msg=$arrMsg,$resetLog=false,$outputHTML=false,$pos=1);self::$firephp->$type(str_replace('|','§',$arrMsg));}
if($groupTitle!=null) self::$firephp->groupEnd();} else{ if(is_array($arrMsg)){
foreach ($arrMsg as $key=>$value){
if(is_array($value)){
foreach ($value as $tmp=>$data) self::alDg($msg=$key.'=['.$tmp.']:['.$data.']',$resetLog=false,$outputHTML=false,$pos=1);} else{
self::alDg($msg=$key.'='.$value,$resetLog=false,$outputHTML=false,$pos=1);}}} else{
self::alDg($msg=str_replace('|','§',$arrMsg),$resetLog=false,$outputHTML=false,$pos=1);}} return true;} public static function customErrorHandler($errorType,$errorString,$errorFile,$errorLine){
static $arrSkip=array();if($arrSkip==null){
$arrSkip=array('ini_set() has been disabled for security reasons');}
$msg = sprintf(_DEBUG_MSG, self::$_errorlevels[$errorType]['code'], date("Y-m-d H:i:s (T)"),
$errorFile,$errorLine,$errorString);require_once (dirname(__FILE__).'/error.php');
$aeError = aecEr::getInstance();
$aeError->AddError($msg=$msg);
unset($aeError);self::alDg($msg=$msg,$resetLog=false);if((static::$_displayError)&&(!in_array($errorString,$arrSkip))) echo $msg;
return 0;}}