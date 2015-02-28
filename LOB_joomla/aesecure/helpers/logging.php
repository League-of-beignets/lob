<?php
   // @file : /helpers/logging.php
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
class aecLg{
protected static $instance = null;private $aeSt = null;private $aesC = null;static $LLnME = null;
function __construct(){
require_once(dirname(__FILE__).'/settings.php');$this->aeSt = aecSt::getInstance();require_once (dirname(__FILE__).'/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();self::$LLnME=dirname(dirname(__FILE__)).'/logs/activity.log';
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aecLg;
return self::$instance;} public static function gFeNm(){
return self::$LLnME;} public function Write($sLine){
if($this->aesC->mo()) return false;if(!(file_exists(self::$LLnME))){
if(is_writeable(dirname(self::$LLnME))){
if($fd = @fopen(self::$LLnME, "a")) fclose($fd);}}
if(file_exists(self::$LLnME)&&is_writable(self::$LLnME)){
if(($tmz=ini_get('date.timezone'))=='') $tmz='Europe/Brussels';
date_default_timezone_set($tmz);if(($time = $_SERVER['REQUEST_TIME']) == '') $time = time();if(($remote_addr = $_SERVER['REMOTE_ADDR']) == '') $remote_addr = "REMOTE_ADDR_UNKNOWN";if(($request_uri = $_SERVER['REQUEST_URI']) == '') $request_uri = "REQUEST_URI_UNKNOWN";
$date = @date("Y-m-d H:i:s",$time);if($fd = @fopen(self::$LLnME, "a")){
$result = fputcsv($fd, array($date,$remote_addr,$request_uri,$sLine));
fclose($fd);}} return true;}}