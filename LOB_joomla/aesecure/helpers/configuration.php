<?php
   // @file : /helpers/configuration.php
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
class aeSecureConfiguration{
static $_token=null;private $asFld=null;  private $sitertDr=null;private $aeSt = null;protected static $instance = null;protected static $filename='';private $config=null;private $JConfig=null;
function __construct(){
require_once(dirname(dirname(__FILE__)).'/helpers/functions.php');$this->asFld=dirname(dirname(__FILE__));$this->sitertDr=dirname(dirname(dirname(__FILE__)));require_once ($this->asFld.'/helpers/settings.php');$this->aeSt = aecSt::getInstance();self::$filename=$this->asFld.'/configuration/configuration.json';$this->config = (file_exists(self::$filename)?json_decode(file_get_contents(self::$filename, FILE_USE_INCLUDE_PATH),true):null);if(!(isset($this->config['key']))){$this->config['key']=aecFt::gnaTy(); self::set('key',$this->config['key']);}
if(!(isset($this->config['phpautocheck']))) self::set('phpautocheck',true);if(!(isset($this->config['takeBackuphtAccess']))) self::set('takeBackuphtAccess',true);if(!(isset($this->config['demo']))) self::set('demo',false);if(!(isset($this->config['seeadvancedoptions']))) self::set('seeadvancedoptions',true);if(!(isset($this->config['debug']))) self::set('debug',false);if(!(isset($this->config['debugLanguage']))) self::set('debugLanguage',false);if(!(isset($this->config['protect_token']))) self::set('protect_token',false);if(!(isset($this->config['language']))) self::set('language',self::getBrowserLanguage());
try{
$fname=$this->sitertDr.'/configuration.php';if(is_file($fname)&&is_readable($fname)){
require_once ($fname);$this->JConfig = new JConfig();}} catch (Exception $e){}
if(!(isset($this->config['timezone']))) self::set('timezone',(isset($this->JConfig)?$this->JConfig->offset:''));if(!(isset($this->config['sitename']))) self::set('sitename',(isset($this->JConfig)?$this->JConfig->sitename:''));if(!(isset($this->config['db']))){
$this->config['db']['name']=(isset($this->JConfig)?$this->JConfig->db:'');$this->config['db']['type']=(isset($this->JConfig)?$this->JConfig->dbtype:'');$this->config['db']['host']=(isset($this->JConfig)?$this->JConfig->host:'');$this->config['db']['user']=(isset($this->JConfig)?$this->JConfig->user:'');$this->config['db']['password']=(isset($this->JConfig)?$this->JConfig->password:'');$this->config['db']['prefix']=(isset($this->JConfig)?$this->JConfig->dbprefix:'');self::store();}
if(!(isset($this->config['dashboard']))){
$this->config['dashboard']['allow']=false;self::store();}
$folder=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/logs/');if(!(isset($this->config['log']))){
$this->config['log']['folder']=(isset($this->JConfig)?rtrim($this->JConfig->log_path,'/').'/':$folder);$this->config['log']['write']=true;$this->config['log']['type']='text';$this->config['log']['ignorePattern']='s=148';self::store();}
if(trim($this->config['log']['folder'])==''){$this->config['log']['folder']=$folder; self::store();}
if(!(isset($this->config['cms']))){
$this->config['cms']['autocheck']=true;self::store();}
if(!(isset($this->config['apache_error_log']))){
$this->config['apache_error_log']['maxchartoread']=1000000;self::store();}
if(!(isset($this->config['apache_error_log']['skip']))){
$this->config['apache_error_log']['skip']=
array(
"ini_set() has been disabled for security reasons",
"Directive 'magic_quotes_gpc'",
"PHP Strict Standards:",
"PHP Warning: ",
"PHP Notice: ");self::store();}
if(!(isset($this->config['robots-txt']))){
$this->config['robots-txt']['block']=true;self::store();}
if(!(isset($this->config['robots-txt']['allowed']))){
$this->config['robots-txt']['allowed']=
array("","","");self::store();}
if(!(isset($this->config['urls']))){
$this->config['urls']['geocoding']=$this->aeSt->get('geocoding','1');self::store();}
if(!(isset($this->config['mail']))){
$this->config['mail']['from'] = (isset($this->JConfig)?$this->JConfig->mailfrom:'');$this->config['mail']['fromName'] = (isset($this->JConfig)?$this->JConfig->fromname:'');$this->config['mail']['to'] = (isset($this->JConfig)?$this->JConfig->mailfrom:'');$this->config['mail']['send'] = false;$this->config['mail']['subject'] = 'aeSecure - Code %CODE% - %SITENAME% (%SITEURL%)';self::store();}
$folder=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/tmp/');if(!(isset($this->config['tmp']))){
$this->config['tmp']=rtrim((isset($this->JConfig)?$this->JConfig->tmp_path:$folder),'/').'/';}
if(trim($this->config['tmp'])==''){$this->config['tmp']=$folder; self::store();}
$folder=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/cache/');if(!(isset($this->config['cache']))){
$this->config['cache']=is_dir($this->sitertDr.'/cache')?$this->sitertDr.'/cache':$folder;self::store();}
if(!(isset($this->config['session']))){
$this->config['session']['timeout']=300; }
if(!(isset($this->config['optimize']))){
$this->config['optimize']['images']['enabled']=true;$this->config['optimize']['images']['ratio_decrease']=1;  $this->config['optimize']['images']['max_width']=0;  self::store();}
if(isset($this->JConfig)) unset($this->JConfig);
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aeSecureConfiguration;
return self::$instance;} public function sTkeN($value){
self::$_token=$value;
return;} public function gTkeN(){
return self::$_token;} public function SldTkeN(){
$value=isset($this->config['check_token'])?$this->config['check_token']:false;
$value = (trim($value)==''?0:(filter_var($value, FILTER_VALIDATE_BOOLEAN)?intval($value):0));
return (($value==1)?true:false);} public function get($var,$property=null,$default=''){
$return=(isset($this->config[$var])?$this->config[$var]:$default);if($property!=null){
if(is_array($return)&&(key_exists($property,$return))){
$return=$return[$property];} else{
$return=$default;}} return $return;}  public function set($var,$value){
$this->config[$var]=$value;
$demo=(isset($this->config['demo'])?$this->config['demo']:false);if(!$demo){
if((class_exists('aeCtu'))){
if($var=='timezone'){
$setup=aeCtu::getInstance();
$setup->etPni('date.timezone',$value);
unset($setup);}} } else{ return false;}  return self::store();}
private function store(){
if(!$this->config['demo']){
if($handle = fopen(self::$filename, 'w')){
fwrite($handle, json_encode($this->config));
fclose($handle);
return true;} else{
return false;}} else{ return false;} }
private function getBrowserLanguage(){
$default=$this->aeSt->get('defaultLanguage');
$httplanguages = $_SERVER['HTTP_ACCEPT_LANGUAGE'];if(empty($httplanguages)) return $default;
$lUAs = array();
$result='';foreach (preg_split('/,\s*/',$httplanguages) as $accept){
$result = preg_match('/^([a-z]{1,8}(?:[-_][a-z]{1,8})*)(?:;\s*q=(0(?:\.[0-9]{1,3})?|1(?:\.0{1,3})?))?$/i',$accept,$match);if(!$result) continue;
$quality = ( isset($match[2])?(float)$match[2]:1.0);
$countries = explode('-',$match[1]);
$region = array_shift($countries);
$country_sub = explode('_',$region);
$region = array_shift($country_sub);
foreach($countries as $country) $lUAs[$region.'_'.strtoupper($country)] = $quality;
foreach($country_sub as $country) $lUAs[$region.'_'.strtoupper($country)] = $quality;
$lUAs[$region] = $quality;}
$dir=dirname(dirname(__FILE__)).'/configuration/languages/';
$result=$default;foreach ($lUAs as $lang=>$value){
$arr=glob($dir.str_replace('-','_',$lang).'*.json');if(!empty($arr)){
$result=str_replace('.json','',str_replace($dir,'',str_replace('-','_',$arr[0])));break;}} return $result;}  public function Language(){return $this->config['language'];} public function Mail($var){return $this->config['mail'][$var];} public function tmp(){
if(!(is_dir($this->config['tmp']))){
$this->config['tmp']=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/tmp/');self::store();} return $this->config['tmp'];} public function cache(){
if(!(is_dir($this->config['cache']))){
$this->config['cache']=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/cache/');self::store();} return $this->config['cache'];} public function Log($var,$default=null){
if(!(is_dir($this->config['log']['folder']))){
$this->config['log']['folder']=str_replace('/',DIRECTORY_SEPARATOR,dirname(dirname(__FILE__)).'/logs/');self::store();} return isset($this->config['log'][$var])?$this->config['log'][$var]:$default;} public function mo(){return $this->config['demo']===true;} public function Hpotns(){return $this->config['seeadvancedoptions']===false;} public function dbu(){return $this->config['debug']===true;} public function getWhiteListedIP($folder,$default){
if((key_exists('WhiteListedIP',$this->config))&&key_exists($folder,$this->config['WhiteListedIP'])){
return $this->config['WhiteListedIP'][$folder];} else{
return $default;}} public function getMinify($property,$default=null){
if((key_exists('minify',$this->config))&&key_exists($property,$this->config['minify'])){
return $this->config['minify'][$property];} else{
return $default;}} public function SetMinify($property,$value){
if(!isset($this->config['minify'])) $this->config['minify']='';if(!isset($this->config['minify'][$property])) $this->config['minify'][$property]='';if($this->config['minify'][$property]!==$value){
$this->config['minify'][$property]=$value;
return self::store();}} public function getOptimize($what,$attribute,$default){
if((key_exists('optimize',$this->config))&&key_exists($what,$this->config['optimize']) &&
key_exists($attribute,$this->config['optimize'][$what])){
return $this->config['optimize'][$what][$attribute];} else{
return $default;}} public function getPostInstall($property,$attribute,$default){
$key='postinstall';if((key_exists($key,$this->config))&&key_exists($property,$this->config[$key]) &&
key_exists($attribute,$this->config[$key][$property])){
return $this->config[$key][$property][$attribute];} else{
return $default;}} public function setPostInstall($property,$attribute,$value){
$key='postinstall';if(!(isset($this->config[$key]))) $this->config[$key]='';if($property=='processhtaccess'){if(!(is_array($value))){$tmp=$value; $value=array(); $value[0]=$tmp;}}
$this->config[$key][$property][$attribute]=$value;
return self::store();} public function setDashboard($property,$value){
if($this->config['dashboard'][$property]!=$value){$this->config['dashboard'][$property]=$value;return self::store();}} public function SetCMS($property,$value){
if($this->config['cms'][$property]!=$value){$this->config['cms'][$property]=$value;return self::store();}} public function SetDB($property,$value){
if($this->config['db'][$property]!=$value){$this->config['db'][$property]=$value;return self::store();}} public function SetLog($property,$value){
if($this->config['log'][$property]!=$value){$this->config['log'][$property]=$value;return self::store();}} public function SetMail($property,$value){
if($this->config['mail'][$property]!=$value){$this->config['mail'][$property]=$value;return self::store();}} public function SetSession($property,$value){
if($this->config['session'][$property]!=$value){$this->config['session'][$property]=$value;return self::store();}} public function SetTips($property,$value){
if(!(isset($this->config['tips']))) $this->config['tips']='';if($property=='read'){if(!(is_array($value))){$tmp=$value; $value=array(); $value[0]=$tmp;}}
$this->config['tips'][$property]=$value;
return self::store();} public function SetURLs($property,$value){
if($this->config['urls'][$property]!=$value){$this->config['urls'][$property]=$value;return self::store();}} public function Sfcy($property,$attribute='',$value=''){
$key='functionnalities';if(strpos('.',$property)==false) $property=substr($property,0,1).'.'.substr($property,-1);if(class_exists('aecDb')) aecDb::log('Set '.$key.' for '.$property.($attribute!=''?'::'.$attribute:'').' to '.$value);if($value==='true') $value=true;if($value==='false') $value=false;if(!key_exists($key,$this->config)) $this->config[$key][$property]='';if(!key_exists($property,$this->config[$key])) $this->config[$key][$property]='';if(trim($attribute)==''){
if($this->config[$key][$property]!==$value){$this->config[$key][$property]=$value;return self::store();}} else{
if(($attribute!=='')&&(!is_array($this->config[$key][$property]))){
$this->config[$key][$property][$attribute]='';} else{
if(!key_exists($attribute,$this->config[$key][$property])) $this->config[$key][$property][$attribute]='';}
if($this->config[$key][$property][$attribute]!=$value){
$this->config[$key][$property][$attribute]=$value;return self::store();}}
if(in_array($property,array('1.4','1.5','7.4'))){
$tag=strtolower($this->aeSt->spts(str_replace('.','',$property),'tag'));if((trim($tag)!='')&&(key_exists($tag,$this->config))){
unset($this->config[$tag]);self::store();}}} public function gtTy($functionnality,$attribute='',$default=''){
if(($functionnality>9)&&($functionnality<100)&&(strpos('.',$functionnality)==false)) $functionnality=substr($functionnality,0,1).'.'.substr($functionnality,-1);
$key='functionnalities';$return=$default;if((key_exists($key,$this->config))&&(key_exists($functionnality,$this->config[$key]))){
if(trim($attribute)==''){
$return=$this->config[$key][$functionnality];} else{
if(key_exists($attribute,$this->config[$key][$functionnality])){
$return=$this->config[$key][$functionnality][$attribute];}} } return $return;}  public function sWLedi($folder,$value){
$key='WhiteListedIP';if(!key_exists($key,$this->config)) $this->config[$key][$folder]='';if(!key_exists($key,$this->config)) $this->config[$key]=array();if(!isset($this->config[$key][$folder])) $this->config[$key][$folder]='';if($this->config[$key][$folder]!=$value){
$this->config[$key][$folder]=$value;return self::store();}}}