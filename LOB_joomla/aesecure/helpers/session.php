<?php
   // @file : /helpers/session.php
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
class aecS{
protected static $instance = null;var $aesC=null;var $aeSt=null;
function __construct(){
$root=dirname(__FILE__).DIRECTORY_SEPARATOR;require_once ($root.'configuration.php');$this->aesC = aeSecureConfiguration::getInstance();require_once ($root.'settings.php');$this->aeSt = aecSt::getInstance();require_once ($root.'functions.php');self::init();if($_SERVER['REQUEST_METHOD']=='GET'){
$tmp=$_SERVER['SCRIPT_NAME'].'?'.$this->aesC->get('key');
$bKeyOK=(($tmp===substr($_SERVER['REQUEST_URI'],0, strlen($tmp)))?1:0);if(!$bKeyOK){
$tmp=aecFt::gRvl($param='key',$default='',$maxlen=strlen($this->aesC->get('key')),$type='string',$where='GET');
$bKeyOK=($tmp===$this->aesC->get('key'))?1:0;}} else{
$tmp=aecFt::gRvl($param='key',$default='',$maxlen=strlen($this->aesC->get('key')),$type='string',$where='POST');
$bKeyOK=($tmp===$this->aesC->get('key'))?1:0;}
if(($bKeyOK===1)||$this->aesC->mo()===true) self::set('aeSecure',1);
$lUA=aecFt::gRvl($param='lang',$default='',$maxlen=5,$type='string',$where='GET');if(trim($lUA)=='') $lUA=(isset($_SESSION['language'])?$_SESSION['language']:$this->aesC->Language());if($lUA=='@USER_LANGUAGE@'){$lUA=$this->aesC->Language();$_SESSION['language']=$this->aesC->Language();}
if(trim($lUA)!='') self::set('language',str_replace('-','_',$lUA));
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aecS;
return self::$instance;} public function init(){
if(!isset($_SESSION)){
self::set('aeSecure',0);if(session_id()=='') session_start();self::set('IP',$_SERVER['REMOTE_ADDR']);if(!isset($_SESSION['token'])){
self::set('token',md5(base64_encode($_SERVER['PHP_SELF']).uniqid(rand(), TRUE)));
$token=md5(base64_encode(hash('crc32',$this->aesC->get('key'))).uniqid(rand(), TRUE));self::set('token_length',strlen($token));self::set('token_value',$token);if($this->aesC->SldTkeN()!==true){
self::set('CheckToken',0);}}}
return;} public function destroy($code=0){
session_destroy();$this->aesC->sTkeN(NULL);if($code!=0){
header('HTTP/1.1 403 Forbidden');self::set('CheckToken',0);header('Location: '.$this->aeSt->siUl().'aesecure/accessdenied.php?s='.$code);
return false;}} public function set($name,$value){
$_SESSION[$name]=$value;
return true;} public function get($name=null,$default=null,$unset=false){
$return=isset($_SESSION)?( $name==null?$_SESSION:(isset($_SESSION[$name])?$_SESSION[$name]:$default)):null;if(($unset==true)&&(isset($_SESSION[$name]))) unset($_SESSION[$name]);
return $return;} public function isValid(){
$bValid = null;
$inactive = null;if(!isset($_SESSION['aeSecure'])&&($_SESSION['aeSecure']!==0)){$bValid=0; self::destroy($code=671);}
if($bValid){
$bValid = (isset($_SESSION['aeSecure'])&&($_SESSION['aeSecure']===1) &&
isset($_SESSION['timeout'])&&(time() < $_SESSION['timeout']));}
if($bValid){
$inactive=$this->aesC->get('session','session_timeout');
$sessionTTL = time() - $_SESSION["timeout"];if($sessionTTL > $inactive){$bValid=0; self::session_destroy($code=579);}}
if($bValid){
$bValid = (isset($_SESSION['IP'])&&($_SESSION['IP']===$_SERVER['REMOTE_ADDR']));if(!$bValid){$bValid=0; self::session_destroy($code=579);}}
if($bValid===1) self::extend();
return $bValid;} public function extend(){
session_regenerate_id();self::set('timeout',time());
return;}}