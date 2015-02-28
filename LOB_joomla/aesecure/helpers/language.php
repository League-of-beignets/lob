<?php
   // @file : /helpers/language.php
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
class aecLa{
protected static $instance = null;protected static $UserLanguage='fr_FR';protected static $DefaultLanguage='fr_FR';private $asFld='';private $Debug=false;private $DefaultFileName='';private $FileName='';private $arrDefaultLanguage;  private $arrUserLanguage;  private $aeSt;private $aesCuration;private $aesD;private $premium='';
function __construct(){
$this->asFld=dirname(dirname(__FILE__));require_once ($this->asFld.'/helpers/debug.php');require_once ($this->asFld.'/helpers/error.php');require_once ($this->asFld.'/helpers/functions.php');require_once ($this->asFld.'/helpers/session.php');require_once ($this->asFld.'/helpers/settings.php');require_once ($this->asFld.'/helpers/configuration.php');$this->aeSt = aecSt::getInstance();$this->aesC = aeSecureConfiguration::getInstance();$this->aesD = aecDb::getInstance();$this->aesS = aecS::getInstance();self::$UserLanguage=$this->aesS->get('language');$this->Debug= $this->aesC->get('debugLanguage');self::readLanguage();$this->premium = "<span class='premium' title='".str_replace("'","&#145;",self::getMain('premium'))."'></span>";
return true;}  public static function getInstance($lang=null){
if($lang==null) $lang=self::$DefaultLanguage;self::$UserLanguage=str_replace('-','_',$lang);if(self::$instance === null) self::$instance = new aecLa;
return self::$instance;} public function set($lang){
if($lang!=null){
self::$UserLanguage=str_replace('-','_',$lang);self::readLanguage();}
return;} public function get(){
return self::$UserLanguage;} public function getValue($group,$entry='',$default=''){
$tmp=$default;if($entry<>''){
if(isset($this->arrDefaultLanguage[$group][$entry])) $tmp=$this->arrDefaultLanguage[$group][$entry];if(isset($this->arrUserLanguage[$group])){
if(isset($this->arrUserLanguage[$group][$entry])) $tmp=$this->arrUserLanguage[$group][$entry];}
if(strpos($tmp,'\u00e8')>0) $tmp=str_replace('\u00e8','è',$tmp);if(strpos($tmp,'\u00e9')) $tmp=str_replace('\u00e9','é',$tmp);if(strpos($tmp,'\u00e0')) $tmp=str_replace('\u00e0','à',$tmp);;if(strpos($tmp,'\u00e2')) $tmp=str_replace('\u00e2','â',$tmp);if($this->Debug) $tmp='#'.$entry.'#'.$tmp;} else{
$tmp=isset($this->arrUserLanguage[$group])?$this->arrUserLanguage[$group]:$this->arrDefaultLanguage[$group];} return $tmp;} public function readLanguage(){
$this->DefaultFileName = $this->asFld.'/configuration/languages/'.str_replace('-','_',self::$DefaultLanguage).'.json';$this->FileName = $this->asFld.'/configuration/languages/'.self::$UserLanguage.'.json';if(!(file_exists($this->FileName ))) $this->FileName = $this->DefaultFileName;
try{
if(!(file_exists($this->FileName ))) aecFt::SeAD(sprintf('file %s not found',$this->FileName ));
$string = file_get_contents($this->FileName);
$string=str_replace('\\u','\u',$string);if(json_decode($string,true)===null){
aecFt::SeAD('There is a problem in '.$this->FileName.'.  Probably an invalid json file','<pre>'.html_entity_decode($string).'</pre>');}
$this->arrUserLanguage=json_decode($string,true);if(file_exists($this->DefaultFileName)){
$string = file_get_contents($this->DefaultFileName);$this->arrDefaultLanguage=json_decode($string,true);} return true;} catch(Exception $e){
echo $e->errorMessage();
return false;}}  public function Option11_getProtectHTAccess($var,$args=null){
$tmp=self::getValue('11_protecthtaccess',$var);if((isset($args))&&($args!=null)) foreach($args as $val) $tmp=preg_replace("/%s/",$val,$tmp, 1);
return $tmp;} public function Option12_getProtectFolder($var,$args=null){
$tmp=self::getValue('12_protectFolder',$var);if((isset($args))&&($args!=null)) foreach($args as $val) $tmp=preg_replace("/%s/",$val,$tmp, 1);
return $tmp;} public function Option13_getErrorReporting($var){return self::getValue('13_error_reporting',$var);}  public function Option14_getOldHTAccess($var){return self::getValue('14_old_htaccess',$var);}  public function Option15_getBlockIP($var){return self::getValue('15_blockip',$var);}  public function Option16_getBlockPartURL($var){return self::getValue('16_blockpartURL',$var);}  public function Option17_getBlockFiles($var){return self::getValue('17_blockfiles',$var);}  public function Option19_getMaintenance($var){return self::getValue('19_maintenance',$var);}  public function Option21_getProtectFolderIp($var){return self::getValue('21_protectFolderIp',$var);}  public function Option22_getPasswordProtectFolder($var){return self::getValue('22_protectPassword',$var);}  public function Option23_getBlockBadbots($var){return self::getValue('23_blockbots',$var);}  public function Option24_getBlockFileUpload($var){return self::getValue('24_blockfileupload',$var);}  public function Option25_getNoArchive($var){return self::getValue('25_noarchive',$var);}  public function Option26_getBlockHiddenFolders($var){return self::getValue('26_blockhiddenfolders',$var);}  public function Option27_getBlockRobotsTxt($var){return self::getValue('27_blockrobotstxt',$var);}  public function Option28_getBlockUserAgent($var){return self::getValue('28_blockuseragent',$var);}  public function Option29_getBlockReferrer($var){return self::getValue('29_blockreferrer',$var);}  public function Option31_getPermissions($var){return self::getValue('31_permissions',$var);}  public function Option32_getDevilNumber($var){return self::getValue('18_devilnumber',$var);}  public function Option41_getJoomlaVersion($var){return self::getValue('41_joomlaversion',$var);}  public function Option42_getBlockcomUsers($var){return self::getValue('42_blockcomusers',$var);}  public function Option43_getProtectAdmin($var){return self::getValue('43_protectadmin',$var);}  public function Option44_getBlockComponents($var){return self::getValue('44_blockcomp',$var);}  public function Option45_getJoomlaDBAdmin($var){return self::getValue('45_dbadmin',$var);}  public function Option49_getJoomlaRedirection($var){return self::getValue('49_showredirect',$var);}  public function Option51_getBackupDB($var){return self::getValue('51_backupdb',$var);}  public function Option71_getSEORewrite($var){return self::getValue('71_seo_rewrite',$var);}  public function Option72_getSEOWWW($var){return self::getValue('72_seo_www',$var);}  public function Option73_getEditRobots($var){return self::getValue('73_editrobots',$var);}  public function Option74_getEditRedirection($var){return self::getValue('74_editredirection',$var);}  public function Option81_getPageSpeed($var){return self::getValue('81_pagespeed',$var);}  public function Option82_getCompress($var){return self::getValue('82_compress',$var);}  public function Option83_getExpire($var){return self::getValue('83_expire',$var);}  public function Option84_getMinify($var){return self::getValue('84_minify',$var);}  public function Option89_getHotLinking($var){return self::getValue('89_hotlinking',$var);}  public function Option91_getCleanTempFolder($var){return self::getValue('91_cleantmpfolder',$var);}  public function Option92_getCleanCacheFolder($var){return self::getValue('92_cleancachefolder',$var);}  public function Option93_getCrontab($var){return self::getValue('93_crontab',$var);}  public function Option94_genPassword($var){return self::getValue('94_password',$var);}  public function getTips($var){return self::getValue('tips',$var);} public function getMaintenancePageTitle(){
$tmp=self::Option19_getMaintenance('pagetitle');
return sprintf($tmp,$this->aesC->get('sitename'));}  public function getMaintenanceContact(){
$tmp=self::Option19_getMaintenance('contact');
return sprintf($tmp,$this->aesC->Mail('to'),$this->aesC->get('sitename'));}  public function gadnid($var){return self::GetValue('accessdenied',$var);} public function gasGit(){
$tmp=self::GetValue('main','aeSecureGetIt');
return sprintf($tmp,$this->aeSt->aeWbt(), self::getMain('aeSecurePageTitle'));} public function getBlocked($var){return self::GetValue('blocked',$var);} public function getInstall($var){return self::GetValue('install',$var);} public function getMain($var,$default=''){return self::GetValue('main',$var,$default);} public function getConfigTitle(){
$url=aecFt::link($this->aeSt->siUl(),$this->aeSt->siUl(),'title="'.$this->aesC->get('sitename').'" target="_blank"');
return sprintf(self::GetValue('main','config'),$this->aesC->get('sitename'),$url);} public function gDhrd($var=''){return self::GetValue('dashboard',$var);} public function getDocumentation($var){return self::GetValue('documentation',$var);} public function gRrs($var){return self::GetValue('errors',$var);} public function getForum($var){return self::GetValue('forum',$var);} public function getjQuery_messages(){return self::GetValue('jQuery-messages','');} public function getLog($var){return self::GetValue('getlog',$var);} public function getMail($var){return sprintf(self::GetValue('mail',$var),$this->aesC->get('sitename'));} public function gtOns($var){return self::GetValue('options',$var);} public function getBanTitle($ip){return sprintf(self::GetValue('ban','title'),$ip);} public function getBanHTAccess($ip){return sprintf(self::GetValue('ban','htaccess'),$this->aesC->get('sitename'),$ip);} public function getTools($var){return self::GetValue('tools',$var);} public function getQuickInfo($var){return self::GetValue('quickinfo',$var);}}