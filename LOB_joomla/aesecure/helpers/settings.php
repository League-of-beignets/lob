<?php
   // @file : /helpers/settings.php
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
class aecSt{
protected static $instance = null;private $asFld=null;  private $sitertDr=null;  private $website=null;  private $siteUrl=null;  private $siteName=null;var $aesD = null;var $aesC = null;
function __construct(){
$this->asFld=dirname(dirname(__FILE__));require_once ($this->asFld.'/helpers/error.php');$this->sitertDr=dirname(dirname(dirname(__FILE__)));$this->website=str_replace('/','',substr($_SERVER['PHP_SELF'], 1, strpos($_SERVER['PHP_SELF'],'/aesecure')));$this->siteUrl=self::strleft(self::selfURL(),'/aesecure');self::readSettings();
return true;}  function __destruct(){
unset($this->aesD);} public static function getInstance(){
if(self::$instance === null) self::$instance = new aecSt;
return self::$instance;}
private function selfURL(){
$s = empty($_SERVER["HTTPS"])?'':($_SERVER["HTTPS"] == "on")?"s":"";
$protocol = self::strleft(strtolower($_SERVER["SERVER_PROTOCOL"]), "/").$s;
$port = ($_SERVER["SERVER_PORT"] == "80")?"":(":".$_SERVER["SERVER_PORT"]);
return $protocol."://".$_SERVER['SERVER_NAME'].$port.$_SERVER['REQUEST_URI'];}
private function strleft($s1,$s2){return substr($s1, 0, strrpos($s1,$s2));} public function readSettings(){
$sFileName = $this->asFld.'/configuration/settings.json';
try{
if(!(file_exists($sFileName))) aecFt::SeAD(sprintf('file %s not found',$sFileName));
$string = file_get_contents($sFileName);$this->settings =json_decode($string,true);
return true;} catch(Exception $e){
echo $e->errorMessage();
return false;}}  public function get($var,$property=null){
$return=(isset($this->settings[$var])?$this->settings[$var]:'');if(($property!=null)&&(is_array($return))&&(key_exists($property,$return))) $return=$return[$property];
return $return;}  public function siaM(){return $this->siteName;} public function Website($subfolder=null){return $this->website.'/'.($subfolder!=null?ltrim(rtrim($subfolder,'/'),'/'):'');} public function siUl(){return rtrim($this->siteUrl,'/').'/';} public function siOt(){return $this->sitertDr;} public function aERot(){return $this->asFld;} public function DebugEnabled(){return $this->settings['debug'];} public function aeWbt(){return $this->settings['aeSecurewebsite'];} public function BanIP(){return $this->settings['banIP'];} public function ShowImg(){return $this->settings['showImg'];} public function Task($var){return $this->settings['task'][$var];} public function Params($var){return $this->settings['params'][$var];} public function php($var){return $this->settings['php'][$var];} public function spts($id='',$info='',$default=''){
if(trim($id)!=''){
$id=str_replace('.','',$id);if(trim($info)==''){
return $this->settings['Snippets'][$id];} else{
return isset($this->settings['Snippets'][$id][$info])?$this->settings['Snippets'][$id][$info]:$default;}} else{
return $this->settings['Snippets'];}} public function getCode($code){
if(key_exists($code,$this->settings['Errors'])){
if(!(isset($this->aesC))){
require_once(dirname(__FILE__).'/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();}
require_once(dirname(__FILE__).'/language.php');$this->aesL = aecLa::getInstance($this->aesC->Language());
$msg=$this->settings['Errors'][$code]['msg'];
$msg=$this->aesL->getBlocked($msg);
$ban=$this->settings['Errors'][$code]['ban'];
$mail=$this->settings['Errors'][$code]['mail'];} else{
if($this->aesD==null){
require_once(dirname(__FILE__).'/debug.php');$this->aesD = aecDb::getInstance();}
$this->aesD->log('ERROR - aecSt::getCode - Code unknown:'.$code, array('Type'=>'error'));
$msg='';
$ban=0;
$mail=0;} return array($msg,$ban,$mail);}}