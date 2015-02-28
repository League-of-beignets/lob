<?php
   // @file : /helpers/error.php
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
class aecEr{
protected static $instance = null;protected static $errorFile=null;protected static $arrSkip=null;
function __construct(){
static::$errorFile=dirname(dirname(__FILE__)).'/logs/error.log';
static::$arrSkip=array('ini_set() has been disabled for security reasons');
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aecEr;
return self::$instance;} public static function logFile(){
return static::$errorFile;} public static function AddError($msg=null){
$bSkip=false;
preg_match('/(.*==> )(.*)?$/i',$msg,$match);if(isset($match[2])){
$bSkip=in_array(rtrim($match[2]," \r\n\t"),self::$arrSkip,true)?true:false;}
if(($bSkip==false)&& (is_dir(dirname(static::$errorFile)))){
if(is_writable(dirname(self::$errorFile))){
try{
$handle = fopen(self::$errorFile, 'a');
fwrite($handle,str_replace('&nbsp;',' ',strip_tags($msg)).PHP_EOL);
fclose($handle);} catch (Exception $ex){}}} return true;}}