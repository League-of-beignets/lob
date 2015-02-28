<?php
   // @file : /tools/aesecure.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:53
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
if(!defined('_AESECURE')) define('_AESECURE',1);
$root='../../';require_once  ($root.'helpers/debug.php');
$aesD = aecDb::getInstance();require_once  ($root.'helpers/settings.php');
$aeSt = aecSt::getInstance();require_once  ($root.'helpers/configuration.php');
$aesC = aeSecureConfiguration::getInstance();if($aesC->mo()) die('aeSecure - No tools execution in demo mode');require_once  ($root.'helpers/language.php');
$aesL = aecLa::getInstance($aesC->Language());require_once  ($root.'helpers/session.php');
$aesS = aecS::getInstance();
$aesS->isValid();if($aesC->SldTkeN()===true){
$aesD->alDg($msg='Check session token',$resetLog=false);
$token=aecFt::gRvl($param=$aesS->get('token'),$default=NULL,$maxlen=$aesS->get('token_length'),$type='string',$where='POST');if($token!==$aesS->get('token_value',NULL)){
$aesD->alDg($msg='TOKEN CONTROL HAS FAILED !!!',$resetLog=false);
aecFt::SeAD($aesL->getMain('incorrect_token'));}}
require_once ($root.'helpers/aesecure.php');
$aeSecure=aeSecure::getInstance();