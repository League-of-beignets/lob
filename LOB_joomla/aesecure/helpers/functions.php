<?php
   // @file : /helpers/functions.php
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
class aecFt{
static public $rootFolder='';static public $span_success='&nbsp;<span class="label label-success">%s</span>&nbsp;<span class="text-success">%s</span>';static public $span_error='&nbsp;<span class="label label-warning">%s</span>&nbsp;<span class="text-danger">%s</span>';static public $div_info='<div class="alert alert-info"><strong>%s</strong>&nbsp;%s</div>';static public $div_warning='<div class="alert alert-warning"><strong>%s</strong>&nbsp;%s</div>';static public $div_danger='<div class="alert alert-danger"><strong>%s</strong>&nbsp;%s</div>';static public $Sce='';static public $iain='';static public $flUe='';static public $wing='';static public $premium = "<span class='premium'>&nbsp;</span>";static public function getTmpPath(){
$return='';if(!empty($_ENV['TMP'])){
$return=realpath($_ENV['TMP']);} elseif(!empty($_ENV['TMPDIR'])){
$return=realpath( $_ENV['TMPDIR']);} else if(!empty($_ENV['TEMP'])){
$return=realpath( $_ENV['TEMP']);} else if(isset($_SERVER['TMP'])){
$return=realpath($_SERVER['TMP']);} else{
$return=sys_get_temp_dir();} return rtrim($return,DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;}
static public function link($url,$text,$args=null){
return '<a href="'.$url.'" '.$args.'>'.$text.'</a>';}
static public function rphl($search,$replace,$html){
if(strpos($html,'%isPremium%')) $html=str_replace('%isPremium%',$premium,$html);
return str_replace($search,$replace,$html);}
static public function checkEmail($email){
return filter_var($email, FILTER_VALIDATE_EMAIL);}
static public function MFL($content,$filename){
if(class_exists('aecDb')){$aesD = aecDb::getInstance(); $aesD->log('Rewrite file '.$filename);}
$bReturn=false;
$oPeM='';if(file_exists($filename)&&!is_writable($filename)){
$oPeM=fileperms($filename);
$bST=@chmod($filename, octdec('755'));}
if(((!file_exists($filename))&&is_writable(dirname($filename)))||(is_writable($filename))){
if($handle = fopen($filename, 'w')){
if(class_exists('aecDb')){$aesD = aecDb::getInstance(); $aesD->log('Rewrite file '.$filename);}
$byteWritten=fwrite($handle,$content);if(($byteWritten==false)&&(class_exists('aecDb'))){$aesD = aecDb::getInstance(); $aesD->log('ERROR NOTHING WRITTEN IN THE FILE');}
fclose($handle);if(trim($oPeM)!='') chmod($filename,$oPeM);
$bReturn=true;} else{
if(class_exists('aecDb')){$aesD = aecDb::getInstance(); $aesD->log('ERROR '.$filename.' IS NOT WRITABLE');}
$bReturn=false;}} else{
$bReturn=false;} return $bReturn;}
static public function gRvl($param,$default='',$maxlen=50,$type='string',$where='GET'){
static $debug=NULL;if($debug===NULL){
$root = dirname(dirname(__FILE__));if(file_exists($root.'/helpers/configuration.php')){
require_once($root.'/helpers/configuration.php');
$aeSt = aecSt::getInstance();require_once ($root.'/helpers/configuration.php');
$aesCuration = aeSecureConfiguration::getInstance();
$debug=$aesCuration->dbu();} else{
$debug=false;}}
if($maxlen===null) $maxlen=50;if(in_array($type,array('bool','boolean'))) $maxlen=5;if($where=='GET'){
if(isset($_GET[$param])){
$return=$_GET[$param];} else{
$return=$default;}} else{
if(isset($_POST[$param])){
$return=$_POST[$param];} else{
if(($debug===true)&&isset($_GET[$param])){
$return=$_GET[$param];} else{
$return=$default;}}}
if($type=='boolean') $type='bool';if(($type=='bool')||($type=='bool_NULL')) $maxlen=4;if($maxlen!==0){
if(strlen($return)>$maxlen) $return=substr($return,0,$maxlen);}
try{
switch ($type){
case 'array_int':
if(substr($return,0,1)=='['){
$return=str_replace(array('[',']'), '',$return);
$arr=explode(',',$return);} else{
$arr[]=(trim($return)==''?0:(filter_var($return, FILTER_VALIDATE_INT)?intval($return):0));}
foreach ($arr as $key=>$value){
if(!filter_var($value, FILTER_VALIDATE_INT)){
unset($arr[$key]);} else{
$arr[$key]=(trim($value)==''?0:(filter_var($value, FILTER_VALIDATE_INT)?intval($value):0));}}  $return=$arr;break;case 'bool':
if(($return=='1')||($return=='true')||($return=='on')) $return=1;$return=(trim($return)==''?0:(filter_var($return, FILTER_VALIDATE_BOOLEAN)?intval($return):0));$return=(($return==1)?true:false);break;case 'bool_NULL':
if(($return=='true')||($return=='on')||($return=='1')|| ($return==1)){
$return=true;} elseif(($return=='false')||($return=='off')||($return=='0')){
$return=false;} else{
$return=null;}
break;case 'int':$return=(trim($return)==''?0:(filter_var($return, FILTER_VALIDATE_INT)?intval($return):0)); break;case 'ip':$return=(filter_var($return, FILTER_VALIDATE_IP)?$return:''); break;case 'file':
$return=filter_var($return, FILTER_SANITIZE_STRING);$return=preg_replace("([^\.\w\s\d\-_~,;:\[\]\(\]]|[\.]{2,})", '',$return);$return=str_replace('..','', str_replace('\\','',str_replace('/','',$return)));break;case 'rules':
break;
default:$return=filter_var($return, FILTER_SANITIZE_STRING);}} catch (Exception $exc){
$return=0;} return $return;}
static public function ShowEmptyPage(){
return '<html><head><title>aeSecure</title></head><body>There is nothing to display here...</body></html>';}
static public function hPh($file){
return str_replace('/',DIRECTORY_SEPARATOR,str_replace(self::$rootFolder,'',$file));}
static public function feck($type,$msg=null){
$return='';
switch ($type){
case 'success':$return=sprintf(self::$span_success,self::$Sce,$msg);break;case 'failure':$return=sprintf(self::$span_error,self::$flUe,$msg);break;case 'warning':$return=sprintf(self::$div_warning,self::$wing,$msg);break;case 'danger':$return=sprintf(self::$div_danger,self::$flUe,$msg);break;case 'info':$return=sprintf(self::$div_info,self::$iain,$msg);break;} return $return;}
static public function showFailure($msg){
return sprintf(self::$span_error,self::$flUe,$msg);}
static public function isTRls($htaccess,$tag){
if(!(is_array($tag))){
if(strpos($htaccess,$tag.'_START')!==false){
$block=substr($htaccess, strpos($htaccess,$tag.'_START'), strlen($htaccess));
$block=substr($block, 0, strpos($block,$tag.'_END')+strlen($tag.'_END'));} else{
$block='';}} else{
$block='';} return $block;}
static public function gnaTy(){
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$key = '';
$lenght=30;
for ($i = 0; $i < $lenght; $i++){$key .= $characters[rand(0, strlen($characters) - 1)]; if(($i %5)==4) $key.='-';}
$key=rtrim($key,'-');
return $key;}
static public function gRtjON($url){
$json = '';
$localhost=(substr($_SERVER['HTTP_HOST'],0,9)=='127.0.0.1');if(!$localhost) $localhost=(substr($_SERVER['HTTP_HOST'],0,9)=='localhost');if((trim($url)!='')&&(!$localhost)){
try{
$json = @file_get_contents($url);if(trim($json)!='') $json=json_decode($json);} catch (Exception $exc){}} return $json;}
static public function rsvCSch($cty,$Perm='0777',$recursive=true,$arrIgnore = array('.','..'),$arrReplace=null){
static $arr=array();if(!file_exists ($cty)) return(false);
$comment='';
$handle = opendir($cty);if($handle){
while (false !== ($file = readdir($handle))){
if(!(in_array($file,$arrIgnore))){
if(is_dir($cty.DIRECTORY_SEPARATOR.$file)){
if($recursive){
$arr = array_merge(self::rsvCSch($cty.'/'.$file,$Perm,$recursive,$arrIgnore,$arrReplace));}}
$fname=$cty.'/'.$file;
$fperm=substr(sprintf('%o', (fileperms($fname))),-4);if($fperm==$Perm){
if(isset($arrReplace)){
if(is_file($fname)){
if(isset($arrReplace['file'])){
$comment='<span class="glyphicon glyphicon-pencil" style="padding-left:25px;">'.substr($arrReplace['file'],1,3).'</span>';
$bST=chmod($fname, octdec($arrReplace['file']));}} else{
if(isset($arrReplace['folder'])){
$comment='<span class="glyphicon glyphicon-pencil" style="padding-left:25px;">'.substr($arrReplace['folder'],1,3).'</span>';
$bST=chmod($fname, octdec($arrReplace['folder']));}}}
$arr[]=array('name'=>$fname,'type'=>is_file($fname)?'file':'folder', 'comment'=>$comment);}}}
closedir($handle);}
$type=array();
$name=array();
$comments=array();foreach ($arr as $key => $row){
$type[$key] = $row['type'];
$name[$key] = $row['name'];}
array_multisort($type, SORT_DESC,$name, SORT_ASC,$arr);
return($arr);}  static public function Encrypt($sClearText,$sSecretKey){
return rtrim(
base64_encode(
mcrypt_encrypt(
MCRYPT_RIJNDAEL_256,
$sSecretKey,$sClearText,
MCRYPT_MODE_ECB,
mcrypt_create_iv(
mcrypt_get_iv_size(
MCRYPT_RIJNDAEL_256,
MCRYPT_MODE_ECB
),
MCRYPT_RAND)
)
), "\0"
);}  static public function Decrypt($sEncryptedText,$sSecretKey){
return rtrim(
mcrypt_decrypt(
MCRYPT_RIJNDAEL_256,
$sSecretKey,
base64_decode($sEncryptedText),
MCRYPT_MODE_ECB,
mcrypt_create_iv(
mcrypt_get_iv_size(
MCRYPT_RIJNDAEL_256,
MCRYPT_MODE_ECB
),
MCRYPT_RAND
)
), "\0"
);}
static function isCMS($rootfolder){
return self::iJaSt($rootfolder)||self::iWpte($rootfolder);}
static function iJaSt($rootfolder){
$fname=rtrim($rootfolder,DIRECTORY_SEPARATOR).'/configuration.php';
$iJaSt=(is_file($fname)&&is_readable($fname));
return $iJaSt;}
static function iWpte($rootfolder){
$fname=rtrim($rootfolder,DIRECTORY_SEPARATOR).'/wp-config.php';
$iWpte=(is_file($fname)&&is_readable($fname));
return $iWpte;}
static function SeAD($msg,$extra=null,$showErrorHeading=true){
$root = dirname(dirname(__FILE__));if(file_exists($root.'/helpers/configuration.php')){
require_once($root.'/helpers/configuration.php');
$aeSt = aecSt::getInstance();require_once ($root.'/helpers/configuration.php');
$aesCuration = aeSecureConfiguration::getInstance();
$debug=$aesCuration->dbu();
$url=$aeSt->siUl().'aesecure/';} else{
$debug=false;
$url='';}
if($debug===true){
$trace = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT);if($trace!=null){
$caller = array_shift($trace);
$function_name = $caller['function'];
$sLines=sprintf('%s: Called from %s:%s', __CLASS__.'::'.$function_name,$caller['file'],$caller['line']).'<br/>';foreach ($trace as $entry_id => $entry){
if(empty($entry['class'])){
$sLines.=sprintf('   %s. %s() in %s line %s',$entry_id + 1,$entry['function'],$entry['file'],$entry['line']).'<br/>';} else{
$sLines.=sprintf('   %s. %s->%s() in %s line %s',$entry_id + 1,$entry['class'],$entry['function'],$entry['file'],$entry['line']).'<br/>';}} } else{
$sLines='(debug_backtrace is empty)';}
$debug='<pre>'.$sLines.'</pre>';if(count($arr=$_GET)>0){
if(isset($arr['undefined'])) unset($arr['undefined']);if(isset($arr['_'])) unset($arr['_']);
$debug.='<hr/><pre>';if(isset($arr[$aeSt->Params('setuptask')])){
$task=$arr[$aeSt->Params('setuptask')];
$debug.='<strong style="font-size:1.5em;">Task&nbsp;:&nbsp;'.$task.' - '.$aeSt->spts($task,'title','').'</strong><br/><br/>';
$debug.='<strong>Setting.json:</strong></br>'.print_r($aeSt->spts($task),true).'<br/><br/>';}
$debug.='<strong>$_GET</strong><br/>'.print_r($arr,true).'</pre>';}}
$ajax=(
(isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'))?true:false);$html='';if(!$ajax) $html=
'<!DOCTYPE html>'.'<html lang="en">'.'<head>'.'<meta charset="utf-8"/>'.'<meta http-equiv="content-type" content="text/html; charset=UTF-8" />'.'<meta name="robots" content="noindex, nofollow" />'.'<meta name="author" content="aeSecure (c) Christophe Avonture" />'.'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'.'<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8;" />'.'<title>aeSecure'.($showErrorHeading!=false?' - Fatal error':'').'</title>'.'<script src="'.$url.'third/bootstrap/js/jquery.min.js"></script>'.'<link href="'.$url.'third/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">'.'<link href="'.$url.'third/alertify/themes/alertify.core.css" rel="stylesheet" media="screen">'.'<link href="'.$url.'third/alertify/themes/alertify.bootstrap.css" rel="stylesheet" media="screen">'.'<link href="'.$url.'premium/filereader/filereader.css" rel="stylesheet" media="screen">'.'</head>'.'<body>';$html.=
'<div class="container error">'.'<h1>aeSecure'.($showErrorHeading!=false?' - Fatal error':'').'</h1>'.'<p class="text-danger">'.$msg.'</p>'.$debug.'</div>'.
($extra!==null?print_r($extra,true):'');if(!$ajax) $html.='</body></html>';
die($html);}
static function SanitizeFolder_NotAboveRoot($rootFolder,$path=null,$default=null){
$return=$default;if($path!=null){
if(($tmp=realpath($rootFolder.DIRECTORY_SEPARATOR.ltrim($path,DIRECTORY_SEPARATOR)))!=null){
if(substr($tmp,0,strlen($rootFolder))===$rootFolder) $return=$tmp;}} return $return;}
static function gSptFl($file,$type='free'){
$type=strtolower($type);$folder=self::$rootFolder.'/aesecure/'.($type!='free'?$type.'/':'').'setup/snippets/';$folder=rtrim($folder,'/').DIRECTORY_SEPARATOR;if(is_file($folder.'override/'.$file)) $folder=$folder.'override/';
$filename = $folder.$file;
return $filename;}
static function gtGcnt($htaccess,$tag,$EOL_char=';',$aIgLn=null,$aIRPtN=null,$aIrCHr=null){
$htaccess=aecFt::rphl('#'.$tag.'_START','',$htaccess);
$htaccess=aecFt::rphl('#'.$tag.'_END','',$htaccess);$return='';
foreach(preg_split("/((\r?\n)|(\r\n?))/",$htaccess) as $line){
$line=trim($line);
$bIgnore=false;if((substr($line,0,1)=='#')||(trim($line)=='')) continue;if($aIgLn!=null){
foreach ($aIgLn as $skip){
if(substr($line,0,strlen($skip))==$skip){$bIgnore=true; continue;}}}
if($bIgnore===false){
if($aIRPtN!=null){
foreach ($aIRPtN as $remove){
$line=str_replace($remove,'',$line);}}
if($aIrCHr!=null){
foreach ($aIrCHr as $key=>$value){
$line=str_replace($key,$value,$line);}}
$return.=trim($line).$EOL_char;}} return rtrim($return,$EOL_char);}
static function directoryToArray($cty,$recursive = true,$listDirs=true,$listFiles=false,$arrIgnore = array('.')){
static $arr = array();if(is_dir($cty)){
$handle = opendir($cty);if($handle){
while (false !== ($file = readdir($handle))){
if(!(in_array($file,$arrIgnore))){
if(is_dir($cty.DIRECTORY_SEPARATOR.$file)){
if($recursive){
$arr = array_merge(self::directoryToArray($cty.DIRECTORY_SEPARATOR.$file,
$recursive,$listDirs,$listFiles,$arrIgnore));}
if($listDirs) $arr[]=array('name'=>$file,'type'=>'folder');} else{
if($listFiles) $arr[]=array('name'=>$file,'type'=>'file');}} }
closedir($handle);}}
$type=array();
$name=array();foreach ($arr as $key => $row){
$type[$key] = $row['type'];
$name[$key] = $row['name'];}
array_multisort($type, SORT_DESC,$name, SORT_ASC,$arr);
return $arr;}
static function rglob($pattern='*',$path='',$flags=0,$arrSkipFolder=null){
if(($arrSkipFolder!=null)&&(count($arrSkipFolder)>0)){
foreach ($arrSkipFolder as $folder){
if(self::startsWith($path,$folder)) return null;} }
$paths=glob($path.'*', GLOB_MARK|GLOB_ONLYDIR);
$files=glob($path.$pattern,$flags);foreach ($paths as $path){
$arr=self::rglob($pattern,$path,$flags,$arrSkipFolder);if(($arr!=null)&&(count($arr)>0)) $files=array_merge($files,$arr);} return $files;}
static function startsWith($string,$search){return $search === ""||strrpos($string,$search, -strlen($string)) !== FALSE;}
static function endsWith($string,$search){return $search === ""||strpos($string,$search, strlen($string) - strlen($search)) !== FALSE;}}