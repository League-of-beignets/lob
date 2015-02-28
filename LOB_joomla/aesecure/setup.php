<?php
   // @file : /setup.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:50
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
if(!defined('_AESECURE')) define('_AESECURE',1);require_once ('helpers/aesecure.php');require_once ('helpers/functions.php');
$aeSecure=new aeSecure();require_once ('helpers/configuration.php');
$aesC=new aeSecureConfiguration();if($aesC->get('dashboard','allow')===true) header('Access-Control-Allow-Origin: *');
$code='s';if(aecFt::gRvl($param='g',$default='0',$maxlen=1,$type='boolean')==1){
$code='g';} else if(aecFt::gRvl($param='d',$default='0',$maxlen=1,$type='boolean')==1){
$code='d';} else if(aecFt::gRvl($param='m',$default='0',$maxlen=1,$type='boolean')==1){
$code='m';} else if(aecFt::gRvl($param='logout',$default='0',$maxlen=1,$type='boolean')==1){
$code='l';} else if(aecFt::gRvl($param='r',$default='',$maxlen=1,$type='boolean')==1){
$code='r';}
echo $aeSecure->Process('default',$code, array('force'=>true));
unset($aeSecure);