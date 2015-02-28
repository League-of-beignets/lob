<?php
   // @file : /json.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:46
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
if(!defined('_AESECURE')) define('_AESECURE',1);if(!(isset($_GET['task']))) die('Invalid call');
global $root;
global $aeSecure;
global $aecDb;
global $aeSt;
global $aesS;
global $aesC;
global $aecPe;
error_reporting(0);
function JSON_Die_NotEnabled(){
global $root;
global $aeSecure;
global $aeSt;
global $aesS;
global $aesC;
global $aecPe;require_once ($root.'helpers/language.php');
$aesL = aecLa::getInstance();
$msg=$aesL->gDhrd('notconfigured');if(trim($msg)=='') $msg='The dashboard isn\'t enabled on %1';
$site=$aeSt->siUl().(trim($aesC->get('sitename'))!=''?' ('.$aesC->get('sitename').' )':'');
$msg = sprintf($msg,'<strong>\"'.$site.'\"</strong>');
unset($aeSecure);
unset($aesC);
unset($aesL);
unset($aecPe);
unset($aesS);
unset($aeSt);
die('{"error":{"ID":"999","msg":"'.$msg.'"}}');}
function JSON_Dynamic(){
global $root;
global $aecPe;
$aePackage='Free';if(is_dir($root.'premium')){$aePackage=is_dir($root.'dashboard')?'Pro':'Premium';}
$dynamic='"dynamic":{"package":"'.$aePackage.'","type":"'.(aecFt::isCMS(dirname($root))?'cms':'other').'",';
$dynamic.='"cms":{"name":"'.(aecFt::iJaSt(dirname($root))?'Joomla!':'other').'",';if(isset($aecPe)){
list($currentver,$version)=$aecPe->Option41_getJVersion('41');if(trim($version)!='') $dynamic.='"version":{"major":"'.$currentver.'","version":"'.$version.'"},';
$dynamic=rtrim($dynamic,",");}
$dynamic=rtrim($dynamic,",")."}},";
return $dynamic;}
function JSON_DBVersion(){
global $aesC;
$dbVersion='';
try{
$dbhost=$aesC->get('db','host');
$dbuser=$aesC->get('db','user');if((trim($dbhost)!='')&&(trim($dbuser)!='')){
mysqli_report(MYSQLI_REPORT_STRICT);
$mysqli = new mysqli($dbhost,$dbuser,$aesC->get('db','password'));if(mysqli_connect_errno()===0) $dbVersion=$mysqli->server_info;
$mysqli->close();
unset($mysqli);}} catch (Exception $ex){} return $dbVersion;}
static $Pswrd='DfxsHIXYqi4oOhzwmnk';
$maxlen=10;
$task=substr($_GET['task'],0,$maxlen);
$task=filter_var($task, FILTER_SANITIZE_STRING);
$root=dirname(__FILE__).DIRECTORY_SEPARATOR;header('Access-Control-Allow-Origin: *');require_once ($root.'helpers/debug.php');
$aecDb = aecDb::getInstance();
$aecDb::DisplayError($enable=false);require_once ($root.'helpers/language.php');
$aecLa = aecLa::getInstance();require_once ($root.'helpers/settings.php');
$aeSt = aecSt::getInstance();require_once  ($root.'helpers/configuration.php');
$aesC = aeSecureConfiguration::getInstance();require_once  ($root.'helpers/aesecure.php');
$aeSecure=aeSecure::getInstance();if(file_exists($root.'/premium/helpers/aesecure.php')){
require_once($root.'/premium/helpers/aesecure.php');
$aecPe = aecPe::getInstance();} else{
$aecPe=null;}
require_once ($root.'helpers/session.php');
$aesS=aecS::getInstance();require_once  ($root.'helpers/functions.php');
$aeSt = aecSt::getInstance();
$json='"aeSecure":"'.$aeSt->get('version').'"';
$bNewerVersionAvailable=false;if(isset($_GET['current'])){
$current=substr($_GET['current'],0,15);
$current=urldecode (filter_var($current, FILTER_SANITIZE_STRING));
$bNewerVersionAvailable=$aeSt->get('version')!=$current;
$json.=',"installed":"'.$current.'"';}
if($task==='dashboard'){
$aesS->isValid();if($aesC->get('dashboard','allow')!=true) JSON_Die_NotEnabled();if(($tmz=ini_get('date.timezone'))=='') $tmz='Europe/Brussels';
date_default_timezone_set($tmz);require_once  ($root.'helpers/third/aes.php');  require_once ($root.'helpers/third/aesctr.php');
$info=file_get_contents($root.'configuration/configuration.json', FILE_USE_INCLUDE_PATH);
$arr = (array) json_decode($info,true);
$actions=$aeSt->spts();
$arr['functionnalities']=array();foreach ($actions as $action=>$data){
$tag=$aeSt->spts($action,'tag');
$datatype=$aeSt->spts($action,'datatype','boolean');
$target=$aeSt->spts($action,'htaccess');if(trim($target)!='') $target=$aeSt->siOt().$target;if(trim($tag)!==''){
list($bBle,$block)=$aeSecure->cOeld($action,false,$target);
$action=substr($action,0,1).'.'.substr($action,-1);if($aesC->mo()==true){
$premium=$aeSt->spts($action,'premium',false);
$pro=$aeSt->spts($action,'pro',false);if(($premium==true)||($pro==true)) $block='-hidden in demo mode-';}
if($datatype==='boolean'){
$arr['functionnalities'][$action]=$bBle;} else{
$arr['functionnalities'][$action]=$block;}}}
$info=json_encode($arr);
$info='{"php_version":"'.phpversion().'","db_version":"'.($aesC->mo()?'-demo-':JSON_DBVersion()).'",'.'"server":{"os":"'.($aesC->mo()?'-demo-':php_uname()).'",'.'"datedddtime":"'.date('d/m/Y H:i:s').'"},'.
JSON_Dynamic().ltrim($info,'{');
$info='"'.AesCtr::encrypt($info,$Pswrd,256).'"';
$json.=',"info":'.$info.'';
$json='{'.$json.'}';} else{
if($task==='getText'){
$code=substr($_GET['code'],0,50);
$code=filter_var($code, FILTER_SANITIZE_STRING);if(strpos($code,'.')>0){
$regex = "/(.*)\\.(.*)/";
preg_match($regex,$code,$matches);
$text=$aecLa->getValue($matches[1],$matches[2]);} else{
$text='incorrect code ['.$code.']';}
$json='{"text":"'.str_replace('"','\"',str_replace('/','\/',$text)).'"}';} elseif($task==='checkSite'){
$json='{"code":"1"}';} else{
if(is_file($root.'/json_aesecure.php')){
require_once($root.'/json_aesecure.php');
$aeJSON=new aeSecureJSONPrivate($task,$json);
$json=$aeJSON->Process();
unset($aeJSON);} else{
if($task!=='version') $json='["This task is not supported"]';}}}
unset($aeSecure);
unset($aesC);
unset($aecPe);
unset($aesS);
unset($aeSt);if(substr(ltrim($json),0,1)!='[') $json='{'.rtrim(ltrim($json,'{'),'}').'}';
die($json);