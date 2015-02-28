<?php
   // @file : /third/FirePHP/fb.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:50
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
defined( '_AESECURE') or die('No direct access allowed');if(!class_exists('FirePHP')){
require_once dirname(__FILE__).DIRECTORY_SEPARATOR.'FirePHP.class.php';}
function fb()
{
$instance = FirePHP::getInstance(true);
$args = func_get_args();
return call_user_func_array(array($instance,'fb'),$args);}
class FB
{
public static function setEnabled($Enabled)
{
$instance = FirePHP::getInstance(true);
$instance->setEnabled($Enabled);} public static function getEnabled()
{
$instance = FirePHP::getInstance(true);
return $instance->getEnabled();} public static function setObjectFilter($Class,$Filter)
{
$instance = FirePHP::getInstance(true);
$instance->setObjectFilter($Class,$Filter);} public static function setOptions($Options)
{
$instance = FirePHP::getInstance(true);
$instance->setOptions($Options);} public static function gtOns()
{
$instance = FirePHP::getInstance(true);
return $instance->gtOns();} public static function send()
{
$instance = FirePHP::getInstance(true);
$args = func_get_args();
return call_user_func_array(array($instance,'fb'),$args);} public static function group($Name,$Options=null)
{
$instance = FirePHP::getInstance(true);
return $instance->group($Name,$Options);} public static function groupEnd()
{
return self::send(null, null, FirePHP::GROUP_END);} public static function log($Object,$Label=null)
{
return self::send($Object,$Label, FirePHP::LOG);} public static function info($Object,$Label=null)
{
return self::send($Object,$Label, FirePHP::INFO);} public static function warn($Object,$Label=null)
{
return self::send($Object,$Label, FirePHP::WARN);} public static function error($Object,$Label=null)
{
return self::send($Object,$Label, FirePHP::ERROR);} public static function dump($Key,$Variable)
{
return self::send($Variable,$Key, FirePHP::DUMP);} public static function trace($Label)
{
return self::send($Label, FirePHP::TRACE);} public static function table($Label,$Table)
{
return self::send($Table,$Label, FirePHP::TABLE);}}