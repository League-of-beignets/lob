<?php
   // @file : /setup/setup.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:50
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
defined( '_AESECURE') or die('No direct access allowed');
class aeCtu{
protected static $instance = null;private $aeSt = null;private $aesC = null;private $aeError = null;private $aesL = null;private $aesLg=null;private $aeSecure = null;private $aesS = null;private $aesD = null;private $aecPe = null;private $aecPo = null;private $asFld=null;private $title='<h4>%s</h4>';static $tlttH = '';static $force=false;
function __construct($args=null){
$this->asFld=dirname(dirname(__FILE__));require_once ($this->asFld.'/helpers/settings.php');$this->aeSt = aecSt::getInstance();require_once ($this->asFld.'/helpers/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();require_once ($this->asFld.'/helpers/logging.php');$this->aesLg = aecLg::getInstance();require_once ($this->asFld.'/helpers/session.php');$this->aesS = aecS::getInstance();require_once ($this->asFld.'/helpers/error.php');$this->aeError = aecEr::getInstance();require_once ($this->asFld.'/helpers/debug.php');$this->aesD = aecDb::getInstance();$this->aesD->BggP('aeCtu');$this->aecPe=null;if(file_exists($this->asFld.'/premium/helpers/aesecure.php')){
require_once($this->asFld.'/premium/helpers/aesecure.php');if(class_exists('aecPe')) $this->aecPe = aecPe::getInstance();}
$this->aecPo=null;if(file_exists($this->asFld.'/pro/helpers/aesecure.php')){
require_once($this->asFld.'/pro/helpers/aesecure.php');if(class_exists('aecPo')) $this->aecPo = aecPo::getInstance();}
require_once($this->asFld.'/helpers/language.php');$this->aesL = aecLa::getInstance($this->aesC->Language());
aecFt::$Sce=$this->aesL->getMain('success');
aecFt::$flUe=$this->aesL->getMain('failure');require_once ($this->asFld.'/helpers/functions.php');
aecFt::$rootFolder=$this->aeSt->siOt();require_once ($this->asFld.'/helpers/aesecure.php');$this->aeSecure = aeSecure::getInstance();self::$force = isset($args)?(isset($args['force'])?$args['force']:false):false;self::$tlttH = $this->asFld.'/template/';
return true;}  function __destruct(){
$this->aesD->cSgP('');
unset($this->aeSt);
unset($this->aesC);
unset($this->aesL);
unset($this->aeSecure);
unset($this->aesD);} public static function getInstance(){
if(self::$instance === null) self::$instance = new aeCtu;
return self::$instance;}
private function gsppth($wTask){
$path='';if(($this->aeSt->spts($wTask,'premium','false')==='true'?true:false)===true){
$path = $this->asFld.'/premium/setup/snippets/';} elseif(($this->aeSt->spts($wTask,'pro','false')==='true'?true:false)===true){
$path=self::$snippetsPathPro = $this->asFld.'/pro/setup/snippets/';} else{
$path = $this->asFld.'/setup/snippets/';}
$snippet = $this->aeSt->spts($wTask,'filename','');
return array($path,$snippet);} public function udtpts($wTask,$new_content){
if($this->aesC->mo()==false){
$new_content=trim($new_content);if(($new_content!=null)&&(trim($new_content)!='')){
list($folder,$filename)=$this->gsppth($wTask);if(file_exists($folder.$filename)){
$backup=$this->aeSt->aERot().'/setup/backup/'.$filename.'_'.@date("Ymd-His");if(is_writable(dirname($backup))){
copy($folder.$filename,$backup);$this->aesD->log('Backup file:'.$backup);}}
$path = $folder.'override';if(!(is_dir($path))){
try{
mkdir($path);$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$path.' to 755');
@chmod($path, octdec('755'));if(is_writable($path)){
file_put_contents($path.'/index.html', '<!DOCTYPE html><html><body></body></html>');$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$path.'/index.html to 644');
@chmod($path.'/index.html', octdec('644'));}} catch (Exception $e){}}
aecFt::MFL($new_content,$folder.'override/'.$filename);} else{
$this->aesD->log('udtpts():no rules given, empty variable');}} else{
$this->aesD->log('udtpts():demo mode enabled; no snippet created in the override folder');
return false;}
return;} public function rtSp($wTask){
$action=aecFt::gRvl($param='a',$default=NULL,$maxlen=1,$type='int',$method='POST');if(!in_array($action,array(0,1,9))){
aecFt::SeAD(aecDb::getCaller().' - Invalid value given');
return false;} elseif($action==9){
if($this->aesC->mo()==false){
$edt=trim(aecFt::gRvl($param='edt'.$wTask.'LoadFromaeSecure',$default=null,$maxlen=0,$type='rules',$where='POST'));if(($edt!=null)&&(trim($edt)!='')) $this->udtpts($wTask,$edt);} return false;} else{
return true;}} public function Option41_getJoomlaVersion(){
if(!(aecFt::iJaSt($this->aeSt->siOt()))) return array('','');
$release='';
$version='';
try{
$fname=$this->aeSt->siOt().'/configuration.php';if(file_exists($fname)&&is_readable($fname)){
$Joomla=$this->aeSt->get("joomla");
$files=$Joomla['version']['files'];foreach ($files as $file){
$filename=$this->aeSt->siOt().$file;if(file_exists($filename)){
$msg=aecFt::feck('failure',$this->aesL->gRrs('impossible_check_jversion'));
$old=false;if(!defined('_JEXEC')) define('_JEXEC',1);if(!defined('JPATH_BASE')) define('JPATH_BASE',$this->aeSt->siOt());if(!defined('JPATH_PLATFORM')) define('JPATH_PLATFORM',$this->aeSt->siOt().DIRECTORY_SEPARATOR.'libraries');require_once ($filename);
$jver=new JVersion();
$release=$jver->RELEASE;
$version=$jver->RELEASE.'.'.$jver->DEV_LEVEL;
unset($jver);}}}} catch (Exception $e){} return array($release,$version);}  public function upfle($content,$target){
$html='';if($this->aesC->mo()==false){
if(!aecFt::MFL($content,$target)){
$html="<li>".sprintf($this->aesL->gRrs('createerror'), aecFt::hPh($target)).aecFt::feck('failure')."</li>";} else{
$this->aesD->log(sprintf($this->aesL->getMain('filecreatedorupdated'),$target));} } return $html;} public function uJCfg($arr){
$oPeM='';if($this->aesC->mo()) return false;
$filename=$this->aeSt->siOt().'/configuration.php';if(is_file($filename)){
$config=file_get_contents($filename, FILE_USE_INCLUDE_PATH);
$count=0;
foreach($arr as $entry){
$config=preg_replace($entry['search'],$entry['replace'],$config, -1,$count); }
if($count>0) $msg=self::upfle($config,$filename);}
return;}
private function tcmts($htaccess){
$bInit=false;
$bAddComment=false;$return='';
foreach(preg_split("/((\r?\n)|(\r\n?))/",$htaccess) as $line){
$line=trim($line);if($line!=""){
if(substr($line,0,9)!='#AESECURE'){
if(!$bInit){$bAddComment=(substr($line,0,1)!=='#'?true:false);$bInit=true;}
$return.=($bAddComment?'#'.$line:ltrim($line,'#')).PHP_EOL;} else{
$return.=$line.PHP_EOL;}} } return array($bAddComment,$return);} public function eDFcy($arr,$bSetConfigState=true,$value=null){
$bSetConfigState=(bool)$bSetConfigState;$this->aesD->BggP('eDFcy');$this->aesD->log($this->aeSt->spts($arr['id'],''));if($value===null){
$action=aecFt::gRvl($param='a',$default=NULL,$maxlen=1,$type='bool_NULL',$method='POST');if(($action===NULL)&&($this->aesC->dbu()===true)) $action=aecFt::gRvl($param='a',$default=NULL,$maxlen=1,$type='bool_NULL',$method='GET');if($action!=1) $action=0;} else{
$this->aesD->log('Task '.$arr['id'].' - Value taken from the $value function parameter; not from posted data');
$action=$value;}
if(!isset($arr['filename'])){
$file=$this->aeSt->spts($arr['id'],'filename');} else{
$file=$this->aeSt->spts($arr['id'],$arr['filename']);}
$htaccess=$this->aeSt->spts($arr['id'],'htaccess','/.htaccess');
$lUA=$this->aeSt->spts($arr['id'],'language');if(!isset($arr['message'])){
if(method_exists($this->aesL,$lUA)){
$msg=($action==1?$this->aesL->$lUA('done_enabled'):$this->aesL->$lUA('done_disabled'));} else{
$msg='';}} else{
$msg=$this->aesL->$lUA($arr['message']);}
if(method_exists($this->aesL,$lUA)){
$title=$this->aesL->$lUA('title');} else{
$title='';}
$tag=$this->aeSt->spts($arr['id'],'tag');$html=(isset($arr['title'])?'<h3>'.$title.'</h3>':'');
$feedback='';if($action==1){
$premium=$this->aeSt->spts($arr['id'],'premium',false);
$pro=$this->aeSt->spts($arr['id'],'pro',false);
$code=aecFt::gSptFl($file, ($premium==true?'premium':($pro==true?'pro':'free')));if(file_exists($code)){
if(!($this->aesC->mo())){
$this->aesD->BggP('.htaccess rules that will be added');$this->aesD->log('File:'.$code);}
if(trim($msg)!='') $msg='<li>'.$msg.aecFt::feck('success').'</li>';if(trim($msg)!='') $feedback.='<li>'.$msg.aecFt::feck('success').'</li>';
$code=file_get_contents($code, FILE_USE_INCLUDE_PATH);
$comment='#aeSecure '.substr($arr['id'],0,1).'.'.substr($arr['id'],-1);if(substr($code,0,strlen($comment))!=$comment) $code=$comment.PHP_EOL.$code;
$code=str_replace('%AESECURE_USERIP%',$_SERVER['REMOTE_ADDR'],$code);
$code=str_replace('%AESECURE_SERVERIP%',$_SERVER['SERVER_ADDR'],$code);
$code=str_replace('%AESECURE_SERVERNAME%',str_replace('.','\.',$_SERVER['SERVER_NAME']),$code);if($this->aeSt->Website()!='/'){
$code=str_replace('%AESECURE_SITEROOT%',rtrim($this->aeSt->Website(),'/').'/',$code);} else{
$code=str_replace('%AESECURE_SITEROOT%','',$code);}
$code=str_replace('%AESECURE_SERVERIP%',$_SERVER['SERVER_ADDR'],$code);if(!($this->aesC->mo())) $this->aesD->log($code);if(!($this->aesC->mo())&&$bSetConfigState) $this->aesC->Sfcy(substr($arr['id'],0,1).'.'.substr($arr['id'],-1),'','true');$html.=self::eShtc('#'.$tag,$code,$msg,$htaccess);if(!($this->aesC->mo())) $this->aesD->cSgP();} else{
$html=aecFt::feck('failure').sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$code));}} else{
$prefix=(isset($arr['prefix'])?$arr['prefix']:'feature');
$feedback.='<li>'.$this->aesL->getMain($prefix.'_disabled').aecFt::feck('success').'</li>';if(trim($msg)!='') $feedback.='<li>'.$msg.aecFt::feck('success').'</li>';$html.=self::eShtc('#'.$tag,'',$msg,$htaccess);if(!($this->aesC->mo())&&$bSetConfigState) $this->aesC->Sfcy(substr($arr['id'],0,1).'.'.substr($arr['id'],-1),'','false');}
if(isset($arr['extra_msg'])) $html.=$arr['extra_msg'];$this->aesD->cSgP();
return (trim($html)!=''?'<pre><ul>'.$html.'</ul></pre>':'');} public function eShtc($tag,$code,$msg,$hcfE=null,$folder=null){
$html='';
$msg='';if($hcfE==null) $hcfE='/.htaccess';if($folder==null) $folder=$this->aeSt->siOt();
$target=$folder.$hcfE;if($this->aesC->get('takeBackuphtAccess')!==false){
if(file_exists($target)){
$backup=$this->aeSt->aERot().'/setup/backup/old_'.@date("Ymd-His").'.htaccess';$this->aesD->log('Backup file:'.$backup);if(is_writable(dirname($backup))){
if($this->aesC->mo()==false) copy($target,$backup);}} }
$this->aesD->log('Edit '.realpath($target).' - Tag='.$tag);if(trim($msg)!='') $this->aesD->log('$msg='.$msg);
$oPeM='';if((file_exists($target))&&(!is_writable($target))){
$oPeM=fileperms($target);$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 755');
$bST=@chmod($target, octdec('755'));}
if(((!file_exists($target))&&is_writable(dirname($target)))||(file_exists($target)&&is_writable($target))){
if($bExists=file_exists($target)){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$block=aecFt::isTRls($htaccess,$tag);} else{
$htaccess=$tag.'_START'.PHP_EOL.$tag.'_END';
$block=$htaccess;}
if(isset($this->aesD->firephp)&&(!($this->aesC->mo()))){
$this->aesD->firephp->group('aeSecure - editSitehsaccess - '.$tag.' ('.__FILE__.', '.__LINE__.')', array('Collapsed'=>true));$this->aesD->firephp->log(str_replace('|','#',$code));  $this->aesD->firephp->groupEnd();}
$code=$tag.'_START'.PHP_EOL.$code.($code<>''?PHP_EOL:'').$tag.'_END';if(trim($block)!=''){
$htaccess=str_replace($block,$code,$htaccess);} else{
$htaccess.=PHP_EOL.$code;}
$key='%AESECURE_SITEROOT%';if(strpos($htaccess,$key)){
if($this->aeSt->Website()!='/'){
$htaccess=str_replace($key,rtrim($this->aeSt->Website(),'/').'/',$htaccess);} else{
$htaccess=str_replace($key,'',$htaccess);}}
$htaccess=str_replace('%AESECURE_SERVERIP%',$_SERVER['SERVER_ADDR'],$htaccess);
$htaccess=str_replace('%HTTP_HOST%',$_SERVER['HTTP_HOST'],$htaccess);$html.=self::upfle($htaccess,$target).$msg;} else{
$html.="<li>".sprintf($this->aesL->getMain('filereadonly'),'/.htaccess').aecFt::feck('failure')."</li>";}
if(is_file($target)&&(trim($oPeM)!='')){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to '.$oPeM);
@chmod($target,$oPeM);} return $html;} public function etPni($variable,$value){
$target=$this->aeSt->siOt().'/php.ini';$this->aesD->log($target);
$oPeM='';if(file_exists($target)&&!is_writable($target)){
$oPeM=fileperms($target);$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
@chmod($target, octdec('644'));}
if((file_exists($target))||( !file_exists($target)&&is_writable(dirname($target)))){
$phpini=(file_exists($target)?file_get_contents($target, FILE_USE_INCLUDE_PATH):'');if(trim($phpini)==''){
$phpini=$variable.'='.$value;} else{
if(strpos($phpini,$variable.'=')!==false){
$phpini=preg_replace('/'.$variable.'=(.*)/',$variable.'='.$value,$phpini);} else{
$phpini.=PHP_EOL.$variable.'='.$value;}}
$html=self::upfle($phpini,$target);}
if(is_file($target)&&(trim($oPeM)!='')){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to '.$oPeM);
@chmod($target,$oPeM);} return $html;}
private function Option11_installHTAccess($wTask,$value=null){
$bnUe=self::rtSp($wTask);if($bnUe){
$action=aecFt::gRvl($param='a',$default=false,$maxlen=1,$type='bool',$method='POST');if($action===false){return self::Option992_resetHTAccess();}
$this->aesD->BggP(__METHOD__);
$lUA=$this->aeSt->spts($wTask,'language');$html='';
$source=aecFt::gSptFl($this->aeSt->spts($wTask,'filename'),'free');
$source_premium=aecFt::gSptFl($this->aeSt->spts($wTask,'filename'),'premium');$this->aesD->log('Source file:'.$source);
$target=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('Target file:'.$target);
$backup='';if($this->aesC->get('takeBackuphtAccess')!==false){
if(file_exists($target)){
$backup=$this->aeSt->aERot().'/setup/backup/old_'.@date("Ymd-His").'.htaccess';$this->aesD->log('Backup file:'.$backup);} }
if(file_exists($source)){
$OHtc=file_exists($target)?file_get_contents($target, FILE_USE_INCLUDE_PATH):'';if((trim($backup)!='')&&is_writable(dirname($backup))){
$html.='<li>'.sprintf($this->aesL->$lUA('renamed',array(aecFt::hPh($target),str_replace('\\','/',aecFt::hPh($backup))))).aecFt::feck('success');if($this->aesC->mo()==false) copy($target,$backup);$html.='</li>';}
if(file_exists($source)&&(!file_exists($target))||is_writable(dirname($target))){
$html.='';
$nHtc=file_get_contents($source, FILE_USE_INCLUDE_PATH);
$premium_htaccess=(file_exists($source_premium)?file_get_contents($source_premium, FILE_USE_INCLUDE_PATH):'');
$nHtc=str_replace('#AESECURE_PREMIUM_HTACCESS',$premium_htaccess,$nHtc);if($this->aeSt->Website()!='/'){
$nHtc=str_replace('%AESECURE_SITEROOT%',rtrim($this->aeSt->Website(),'/').'/',$nHtc);} else{
$nHtc=str_replace('%AESECURE_SITEROOT%','',$nHtc);}
$nHtc=str_replace('%AESECURE_SERVERNAME%',str_replace('.','\.',$_SERVER['SERVER_NAME']),$nHtc);if($this->aesC->mo()==false){
if(trim($OHtc)!=''){
$tmp=aecFt::isTRls($OHtc, '#AESECURE_OLDHTACCESS');if(trim($tmp)==''){} else{
$tmp=str_replace('#AESECURE_OLDHTACCESS_START'.PHP_EOL, '',$tmp);
$OHtc=str_replace(PHP_EOL.'#AESECURE_OLDHTACCESS_END', '',$tmp);}}}
$block=aecFt::isTRls($nHtc, '#AESECURE_OLDHTACCESS');
$new='#AESECURE_OLDHTACCESS_START'.PHP_EOL.$OHtc.($OHtc<>''?PHP_EOL:'').'#AESECURE_OLDHTACCESS_END';
$nHtc=str_replace($block,$new,$nHtc);if($this->aesC->mo()==false){
$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'','true');if(!aecFt::MFL($nHtc,$target)){
$html.="<li>".sprintf($this->aesL->gRrs('error_copying'), str_replace('\\','/',$target),'').aecFt::feck('failure')."</li>";} else{
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
$bST=@chmod($target, octdec('644'));
$cms_config=$this->aeSt->siOt().'/configuration.php';if(is_file($cms_config)){
require_once($cms_config);
$JConfig = new JConfig();$this->aesD->log('JConfig - Current value of error_reporting is ['.$JConfig->error_reporting.']');$value=in_array($JConfig->error_reporting, array('0','none'))?1:0;self::Option13_ErrorReporting(13,$value);$this->aesD->log('JConfig - Current value of sef is ['.$JConfig->sef.']');$value=((int)$JConfig->sef==1?1:0);self::Option71_SEOEnable(71,$value);
unset($JConfig);}}
if(trim($OHtc)!=''){
$html.="<li>".$this->aesL->$lUA('keep_old_content').aecFt::feck('success')."</li>";}} else{ $html.="<li>".sprintf($this->aesL->$lUA('copyfromto'),str_replace('\\','/',aecFt::hPh($source)),aecFt::hPh($target)).aecFt::feck('success').'</li>';}}}
if(trim($html)!='') $html='<ul class="text-info">'.$html.'</ul>';
$actions=$this->aeSt->spts();
$arrDoItAlways=array('13','71');foreach ($actions as $action=>$data){
if($action=='11') continue;$value=$this->aesC->gtTy($action,null,'');if((in_array($action,$arrDoItAlways))||(($value!=='false')&&($value!==false))){
if(!is_array($value)){if((!in_array($action,$arrDoItAlways)) &&(trim($value)=='')) continue;}
$this->aesD->log('Restore the configuration of option '.$action.' based on the old value; stored in configuration.json');
$do_it=$this->aeSt->spts($action,'do_it');self::Setup($action,$value);}}
$html.=$this->aeSecure->rtFeD();$this->aesD->cSgP();
return $html;}}
private function Option12_copyFiles($wTask,$value=null){
ini_set('max_execution_time', 120);
$root=$this->aeSt->siOt().DIRECTORY_SEPARATOR;
$masterPath = $this->aeSt->aERot().'/setup/master';$this->aesD->BggP(__METHOD__.' - Master folder:'.$masterPath);
$lUA=$this->aeSt->spts($wTask,'language');
$dir = new RecursiveDirectoryIterator($masterPath,0);
$it = new RecursiveIteratorIterator($dir);$html=sprintf($this->title,$this->aesL->$lUA('title')).'<ul>';
while($it->valid()){
if((!$it->isDot())&&(!$it->isDir())&&(basename($it->current())!='index.html')){
$bCopy=true;if($it->getDepth()==0){
$bCopy= (!in_array($it->getSubPathName(), array('index.html','.htaccess')));}
if(($bCopy==true)&&(self::$force||(!file_exists(self::$root.'/'.$it->getSubPathName())))){
$target=$this->aeSt->siOt().'/'.$it->getSubPathName();if(!is_file($target)){
if(is_writable(dirname($target))){
if($this->aesC->mo()==false){
if(file_exists($target)&&!is_writable($target)){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
$bST=@chmod($target, octdec('644'));}
if(copy($it->current(),$this->aeSt->siOt().'/'.$it->getSubPathName())){
$this->aesD->log('Copy '.$it->current().' to '.$target);$html.='<li>'.$this->aesL->$lUA('install', array(str_replace('\\','/',aecFt::hPh($target)))).'</li>';
$content=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$bUpdated=false;if(strpos($content, '%SITEURL%')>0){
$bUpdated=true;
$content=str_replace('%SITEURL%',rtrim($this->aeSt->siOt(),'/'),$content);}
if(strpos($content, '%AESECURE_SITEROOT%')>0){
if($this->aeSt->Website()!='/'){
$content=str_replace('%AESECURE_SITEROOT%',rtrim($this->aeSt->Website(),'/').'/',$content);} else{
$content=str_replace('%AESECURE_SITEROOT%','',$content);}
$bUpdated=true;}
if($bUpdated===true){
$content=str_replace('//','/',$content);self::upfle($content,$target);}
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
$bST=@chmod($target, octdec('644'));}} else{
$html.='<li>'.$this->aesL->$lUA('install', array(str_replace('\\','/',aecFt::hPh($target)))).'</li>';}} else{
if(is_dir(dirname($target))) $html.='<li>'.sprintf($this->aesL->gRrs('error_copying'), str_replace('\\','/',aecFt::hPh($target),$this->aesL->gRrs('dirnotwritable')),aecFt::feck('failure')).'</li>';}} else{
$html.='<li class="text-info" style="">'.sprintf($this->aesL->$lUA('skip'), aecFt::hPh($target)).'</li>';}}}
$it->next();}
$html='<pre class="aeSecureCopyFiles">'.$html.'</ul></pre>';$html.='<pre class="aeSecureCopyFiles">'.sprintf($this->title,$this->aesL->$lUA('copy_index')).'<ul>';
$dir = new RecursiveDirectoryIterator($this->aeSt->siOt(),0);
$it = new RecursiveIteratorIterator($dir,RecursiveIteratorIterator::SELF_FIRST, RecursiveIteratorIterator::CATCH_GET_CHILD);
$count=0;
while($it->valid()){
if((!$it->isDot())&&$it->isDir()&&(basename($it->current())!='index.html')){
if(!(file_exists($it->current().'/index.php'))){
$target=$it->current().'/index.html';if(file_exists($target)&&is_writable($target)){
$tmp=file_get_contents($target, FILE_USE_INCLUDE_PATH);if(strpos($tmp, 'Textillate.js combines some awesome libraries to provide a ease-to-use plugin for applying CSS3 animations to any text')!==false) @unlink ($target);}
if(file_exists($target)){
$fperm=substr(sprintf('%o', (fileperms($target))),-4);if(in_array($fperm, array('0440','0444'))){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
@chmod($target, octdec('644'));}}
if(!file_exists($target)){
$count++;if($this->aesC->mo()==false){
if(!(in_array($it->current(), array($root,$root.'administrator')))){
if(substr($target,0, strlen($root))===$root){
try{
if(is_writable(dirname($target))){
file_put_contents($target, '<!DOCTYPE html><html><body></body></html>');$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
@chmod($target, octdec('644'));$this->aesD->log('Create '.$target);$html.='<li>'.$this->aesL->$lUA('install', array(str_replace('\\','/',aecFt::hPh($target)))).'</li>';}} catch (Exception $e){}}}} else{
$html.='<li>'.$this->aesL->$lUA('install', array(str_replace('\\','/',aecFt::hPh($target)))).'</li>';}}} else{
$this->aesD->log('SKIP '.$it->current().' because this folder contains an index.php file; perhaps a child website (or a subdomain).');}}
$it->next();}
if($count==0) $html.='<li>'.$this->aesL->$lUA('no_index_copied').aecFt::feck('success').'</li>';$html.='</ul></pre>';$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'','true');$this->aesD->cSgP();
return $html;}
private function Option22_htPasswd($wTask,$value=null){
$user=aecFt::gRvl($param='user',$default='',$maxlen=50,$type='string',$where='POST');
$password=aecFt::gRvl($param='password',$default='',$maxlen=50,$type='string',$where='POST');
$cty=aecFt::gRvl($param='folder',$default='',$maxlen=50,$type='string',$where='POST');
$lUA=$this->aeSt->spts($wTask,'language');
$tag=$this->aeSt->spts($wTask,'tag');if(substr($cty,0,1)!='/') $cty='/'.$cty;$html='';if((trim($user)!='')&&(trim($password)!='')&&(trim($cty)!='')){
if(is_dir($this->aeSt->siOt().$cty)){
$html.='<h3>'.$this->aesL->$lUA('restrict').'</h3><ul>';
$filename=$cty.'/.htpasswd';if((!file_exists($filename))||(is_writable($filename))){
require_once(dirname(__FILE__).'/helpers/htpasswd.php');if($this->aesC->mo()==false){
$cty=($this->aeSt->siOt()).DIRECTORY_SEPARATOR.ltrim($cty,'/');
$url=str_replace(DIRECTORY_SEPARATOR,'/',rtrim($this->aeSt->siUl(),'/').str_replace($this->aeSt->siOt(),'',$cty));
$aeHTPwd=new aeSecureHtPasswd($cty,$tag);if($aeHTPwd->AddUser($user,$password, self::$force)){
$html.='<li>'.sprintf($this->aesL->$lUA('done'),$user,$password,$cty).aecFt::feck('success').'</li>';$html.='<li>'.sprintf($this->aesL->$lUA('testit'),$url,$url).'</li>';$html.='<li>'.$this->aesL->$lUA('keepit').'</li>';$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'','true');} else{
$html.= '<li>'.$this->aesL->$lUA('error').'.&nbsp;.'.sprintf($this->span_error,$this->error).'</li>';}} else{
$html.= '<li>'.sprintf($this->aesL->$lUA('done'),$user,$password,$cty).'&nbsp;'.aecFt::feck('success').'</li>';}
unset($aeHTPwd);}
$html='<pre>'.$html.'</ul></pre>';} else{
$html.=aecFt::feck('danger',sprintf($this->aesL->gRrs('siteroot_foldernotfound'),$cty));}} else{
$html.=aecFt::feck('danger',$this->aesL->gRrs('invalid_params'));} return $html;}
private function Option2299_RemovehtPasswd($wTask,$value=null){
$html='';if($this->aesC->mo()==false){
$folder=aecFt::gRvl($param='folder',$default='',$maxlen=50,$type='string',$where='POST');
$tag=$this->aeSt->spts($wTask,'tag');if(trim($folder)!=''){
$cty=realpath($this->aeSt->siOt().'/'.rtrim(ltrim($folder,'/'),'/')).DIRECTORY_SEPARATOR;
$lUA=$this->aeSt->spts($wTask,'language');if(file_exists($cty.'.htpasswd')){
self::eShtc($tag='#'.$tag,$code='',$msg=null,$hcfE='.htaccess',$folder=$cty);if(!is_writable($cty.'.htpasswd')){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$cty.'/.htpasswd to 644');
$bST=@chmod($cty.'.htpasswd', octdec('644'));}
unlink($cty.'.htpasswd');$html=sprintf($this->aesL->getMain('unprotected'),$cty);} else{
$html=sprintf($this->aesL->gRrs('filenotfound'),$folder.'/.htpasswd');}} else{
$html=sprintf($this->aesL->gRrs('foldernotfound'),'(empty)');}} return $html;}
private function Option2298_getFolderName($wTask,$value=null){
$return='{}';if($this->aesC->mo()==false){
$arr=aecFt::directoryToArray($cty=$this->aeSt->siOt(),$recursive = false,
$listDirs=true,$listFiles=false,$arrIgnore = array('.','..'));
$search=aecFt::gRvl($param='query',$default='',$maxlen=10,$type='string',$where='GET');
$search=ltrim($search,'/');$return='';if(count($arr)>0){
$return='{"suggestions": [';foreach ($arr as $item){
if((trim($search)=='')||(substr($item['name'],0,strlen($search))==$search)){
$return.='{"value": "'.$item["name"].'", "data": "'.$item["name"].'"},';}}
$return=rtrim($return,',').' ]}';}} else{
$arr=array('admin_fake','bin_fake','cache_fake','dossier_fake','entry_fake','french_fake');$return='{"suggestions": [';foreach ($arr as $item) $return.='{"value": "'.$item.'", "data": "'.$item.'"},';$return=rtrim($return,',').' ]}';} return $return;}  private function Option23_Spam($wTask,$value=null){
$bnUe=self::rtSp($wTask);if($bnUe) return self::eDFcy(array('id'=>$wTask));}   public function Option26_HiddenFilesFolders($wTask,$value=null){
$bnUe=self::rtSp($wTask);if($bnUe) return self::eDFcy(array('id'=>$wTask));} public function Option42_BlockRegistration($wTask,$value=null){
$bnUe=self::rtSp($wTask);if($bnUe){
if(aecFt::iJaSt($this->aeSt->siOt())){
return self::eDFcy(array('id'=>$wTask));} else{
return aecFt::feck('info',$this->aesL->getMain('not_joomla'));}}} public function Option43_BlockAdminURLs($wTask,$value=null){
$bnUe=self::rtSp($wTask);if($bnUe){
if(aecFt::iJaSt($this->aeSt->siOt())){
return self::eDFcy(array('id'=>$wTask));} else{
return aecFt::feck('info',$this->aesL->getMain('not_joomla'));}}}
private function Option990_Options($wTask,$value=null){
$action=aecFt::gRvl($param='a',$default=null,$maxlen=1,$type='bool_NULL',$where='POST');$return='';if($action!=true){
$premium = "<span class='premium' title='".str_replace("'","&#145;",$this->aesL->getMain('premium'))."'>&nbsp;</span>";
$pro = "<span class='pro' title='".str_replace("'","&#145;",$this->aesL->getMain('pro'))."'>&nbsp;</span>";$file=self::$tlttH.'form_'.$this->aeSt->spts($wTask,'type').'.default.aec';if(file_exists($file)){
$return=file_get_contents($file, FILE_USE_INCLUDE_PATH);$return=str_replace('%ID%',$wTask,$return);$return=str_replace('%TITLE%',$this->aesL->gtOns('form_title'),$return);$return=str_replace('%SAVE%',$this->aesL->getMain('save'),$return);$return=str_replace('%SAVEHINT%',$this->aesL->gtOns('save_hint'),$return);$return=str_replace('%CONFIGSAVED%',$this->aesL->gtOns('saved'),$return);$return=str_replace('%SITE%',$this->aesL->gtOns('site'),$return);$return=str_replace('%SITENAME%',$this->aesL->gtOns('sitename'),$return);$return=str_replace('%SITENAMEHINT%',$this->aesL->gtOns('sitename_hint'),$return);$return=str_replace('%CONFIGSITENAME%',$this->aesC->get('sitename'),$return);$return=str_replace('%LOGING%',$this->aesL->gtOns('logging'),$return);$return=str_replace('%LOG%',$this->aesL->gtOns('folderlog'),$return);$return=str_replace('%LOGHINT%',$this->aesL->gtOns('folderlog_hint'),$return);$folder=$this->aesC->Log('folder');if(trim($folder)=='') $folder=dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.'logs';$return=str_replace('%CONFIGLOG%',$this->aesC->mo()?'--hidden in demo mode--':$folder,$return);$return=str_replace('%LOGWRITE%',$this->aesL->gtOns('logwrite'),$return);$return=str_replace('%LOGWRITEHINT%',$this->aesL->gtOns('logwrite_hint'),$return);$return=str_replace('%CONFIGLOGWRITE%',$this->aesC->get('log','write')?'checked':'unchecked',$return);$return=str_replace('%LOGTYPE%',$this->aesL->gtOns('logtype'),$return);$return=str_replace('%LOGTYPEHINT%',$this->aesL->gtOns('logtype_hint'),$return);
$options='';
$selected=($this->aesC->get('log','type')=='text')?' selected':'';
$options.='<option value="text"'.$selected.'>text</option>';
$selected=($this->aesC->get('log','type')=='xml')?' selected':'';
$options.='<option value="xml"'.$selected.'>xml</option>';$return=str_replace('%LOGTYPEOPTIONS%',$options,$return);$folder=$this->aesC->get('tmp');if(trim($folder)=='') $folder=dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.'tmp';$return=str_replace('%TMP%',$this->aesL->gtOns('foldertmp'),$return);$return=str_replace('%TMPHINT%',$this->aesL->gtOns('foldertmp_hint'),$return);$return=str_replace('%CONFIGTMP%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('tmp'),$return);$return=str_replace('%KEY%',$this->aesL->gtOns('key'),$return);$return=str_replace('%KEYHINT%',$this->aesL->gtOns('key_hint'),$return);$return=str_replace('%CONFIGKEY%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('key'),$return);$return=str_replace('%TIMEOUT%',$this->aesL->gtOns('timeout'),$return);$return=str_replace('%TIMEOUTHINT%',$this->aesL->gtOns('timeout_hint'),$return);$return=str_replace('%CONFIGTIMEOUT%',$this->aesC->get('session','timeout'),$return);$return=str_replace('%GEOCODING%',$this->aesL->gtOns('geocoding'),$return);$return=str_replace('%GEOCODINGHINT%',$this->aesL->gtOns('geocoding_hint'),$return);$return=str_replace('%TIMEZONE%',$this->aesL->gtOns('timezone'),$return);$return=str_replace('%TIMEZONEHINT%',$this->aesL->gtOns('timezone_hint'),$return);$return=str_replace('%CONFIGTIMEZONE%',$this->aesC->get('timezone',null,'Europe/Paris'),$return);
$options='';
$urls=$this->aeSt->get('geocoding');foreach ($urls as $key=>$value){
$selected=($this->aesC->get('urls','geocoding')==$value)?' selected':'';
$options.='<option value="'.$key.'"'.$selected.'>'.$value.'</option>';}
$return=str_replace('%GEOCODINGOPTIONS%',$options,$return);$return=str_replace('%CONFIGGEOCODING%',$this->aesC->get('urls','geocoding'),$return);$return=str_replace('%EMAILFROMNAME%',$this->aesL->gtOns('emailfromname'),$return);$return=str_replace('%EMAILFROMNAMEHINT%',$this->aesL->gtOns('emailfromname_hint'),$return);$return=str_replace('%CONFIGEMAILFROMNAME%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('mail','fromName'),$return);$return=str_replace('%EMAILFROM%',$this->aesL->gtOns('emailfrom'),$return);$return=str_replace('%EMAILFROMHINT%',$this->aesL->gtOns('emailfrom_hint'),$return);$return=str_replace('%CONFIGEMAILFROM%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('mail','from'),$return);$return=str_replace('%EMAIL%',$this->aesL->gtOns('email'),$return);$return=str_replace('%EMAILHINT%',$this->aesL->gtOns('email_hint'),$return);$return=str_replace('%CONFIGEMAIL%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('mail','to'),$return);$return=str_replace('%EMAILSUBJECT%',$this->aesL->gtOns('emailsubject'),$return);$return=str_replace('%EMAILSUBJECTHINT%',$this->aesL->gtOns('emailsubject_hint'),$return);$return=str_replace('%CONFIGEMAILSUBJECT%',$this->aesC->get('mail','subject'),$return);$return=str_replace('%SENDEMAIL%',$this->aesL->gtOns('sendemail'),$return);$return=str_replace('%SENDEMAILHINT%',$this->aesL->gtOns('sendemail_hint'),$return);$return=str_replace('%SENDEMAILCHECKED%',$this->aesC->get('mail','send')?'checked':'unchecked',$return);$return=str_replace('%AUTOCHECK%',$this->aesL->gtOns('autocheck').$premium,$return);$return=str_replace('%AUTOCHECKHINT%',$this->aesL->gtOns('autocheck_hint'),$return);$return=str_replace('%AUTOCHECKCHECKED%',$this->aesC->get('cms','autocheck')?'checked':'unchecked',$return);$return=str_replace('%SEEADVANCEDOPTIONS%',$this->aesL->gtOns('seeadvancedoptions'),$return);$return=str_replace('%SEEADVANCEDOPTIONSHINT%',$this->aesL->gtOns('seeadvancedoptions_hint'),$return);$return=str_replace('%SEEADVANCEDOPTIONSCHECKED%',$this->aesC->Hpotns()!==true?'checked':'unchecked',$return);$return=str_replace('%DASHBOARD%',$this->aesL->gDhrd('title').$pro,$return);$return=str_replace('%DASHBOARDALLOWHINT%',$this->aesL->gDhrd('allow_hint'),$return);$return=str_replace('%DASHBOARDALLOW%',$this->aesL->gDhrd('allow'),$return);$return=str_replace('%DASHBOARDALLOWCHECKED%',$this->aesC->get('dashboard','allow')?'checked':'unchecked',$return);$return=str_replace('%PHPAUTOCHECK%',$this->aesL->gtOns('phpautocheck').$premium,$return);$return=str_replace('%PHPAUTOCHECKHINT%',$this->aesL->gtOns('phpautocheck_hint'),$return);$return=str_replace('%PHPAUTOCHECKCHECKED%',$this->aesC->get('phpautocheck')?'checked':'unchecked',$return);$return=str_replace('%LANGUAGE%',$this->aesL->gtOns('language'),$return);$return=str_replace('%LANGUAGEHINT%',$this->aesL->gtOns('language_hint'),$return);$return=str_replace('%LANGUAGEVALUE%',$this->aesC->get('language'),$return);$return=str_replace('%DB%',$this->aesL->gtOns('db'),$return);$return=str_replace('%DBNAME%',$this->aesL->gtOns('dbname'),$return);$return=str_replace('%DBNAMEHINT%',$this->aesL->gtOns('dbname_hint'),$return);$return=str_replace('%CONFIGDBNAME%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','name'),$return);$return=str_replace('%DBTYPE%',$this->aesL->gtOns('dbtype'),$return);$return=str_replace('%DBTYPEHINT%',$this->aesL->gtOns('dbtype_hint'),$return);$return=str_replace('%CONFIGDBTYPE%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','type'),$return);$return=str_replace('%DBHOST%',$this->aesL->gtOns('dbhost'),$return);$return=str_replace('%DBHOSTHINT%',$this->aesL->gtOns('dbhost_hint'),$return);$return=str_replace('%CONFIGDBHOST%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','host'),$return);$return=str_replace('%DBUSER%',$this->aesL->gtOns('dbuser'),$return);$return=str_replace('%DBUSERHINT%',$this->aesL->gtOns('dbuser_hint'),$return);$return=str_replace('%CONFIGDBUSER%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','user'),$return);$return=str_replace('%DBPASSWORD%',$this->aesL->gtOns('dbpassword'),$return);$return=str_replace('%DBPASSWORDHINT%',$this->aesL->gtOns('dbpassword_hint'),$return);$return=str_replace('%CONFIGDBPASSWORD%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','password'),$return);$return=str_replace('%DBPREFIX%',$this->aesL->gtOns('dbprefix'),$return);$return=str_replace('%DBPREFIXHINT%',$this->aesL->gtOns('dbprefix_hint'),$return);$return=str_replace('%CONFIGDBPREFIX%',$this->aesC->mo()?'--hidden in demo mode--':$this->aesC->get('db','prefix'),$return);$return=str_replace('%MISC%',$this->aesL->gtOns('misc'),$return);$return=str_replace('%DEBUG%',$this->aesL->gtOns('debug'),$return);$return=str_replace('%DEBUGHINT%',$this->aesL->gtOns('debug_hint'),$return);$return=str_replace('%DEBUGCHECKED%',$this->aesC->get('debug')?'checked':'unchecked',$return);$return=str_replace('%DEBUGLANGUAGE%',$this->aesL->gtOns('debuglanguage'),$return);$return=str_replace('%DEBUGLANGUAGEHINT%',$this->aesL->gtOns('debuglanguage_hint'),$return);$return=str_replace('%DEBUGLANGUAGECHECKED%',$this->aesC->get('debugLanguage')?'checked':'unchecked',$return);$return=str_replace('%DEMO%',$this->aesL->gtOns('demo'),$return);$return=str_replace('%DEMOHINT%',$this->aesL->gtOns('demo_hint'),$return);$return=str_replace('%DEMOCHECKED%',$this->aesC->get('demo')?'checked':'unchecked',$return);
$options='';
$dh = opendir($this->asFld.'/configuration/languages/');
$arr=array();
while (false !== ($filename = readdir($dh))){
if(pathinfo($filename, PATHINFO_EXTENSION)=='json'){
$arr[]=str_replace('.json','',pathinfo($filename, PATHINFO_BASENAME));}}
sort($arr);foreach ($arr as $lUA){
$selected=($this->aesC->get('language')==$lUA)?' selected':'';
$options.='<option value="'.$lUA.'"'.$selected.'>'.$lUA.'</option>';}
unset($arr);$return=str_replace('%LANGUAGEOPTIONS%',$options,$return);} else{
$return=aecFt::feck('failure').sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,aecFt::hPh($file)));}} else{
if(!$this->aesC->mo()){
$tmp=aecFt::gRvl($param='edtSiteName',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('sitename')!=$tmp)) $this->aesC->set('sitename',$tmp);
$tmp=aecFt::gRvl($param='edtSessionTimeOut',$default='',$maxlen=3,$type='int',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('session','timeout')!=$tmp)) $this->aesC->setSession('timeout',$tmp);
$tmp=aecFt::gRvl($param='edtFolderTmp',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('tmp')!=$tmp)) $this->aesC->set('tmp',$tmp);
$tmp=aecFt::gRvl($param='edtFolderLog',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('log','folder')!=$tmp)) $this->aesC->setLog('folder',$tmp);
$tmp=aecFt::gRvl($param='cbxLogType',$default='',$maxlen=4,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('log','type')!=$tmp)) $this->aesC->setLog('type',$tmp);
$chk=aecFt::gRvl($param='chkLogWrite',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('log','write')!=$chk) $this->aesC->setLog('write',($chk==1?true:false));
$tmp=aecFt::gRvl($param='edtKey',$default='',$maxlen=30,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('key')!=$tmp)) $this->aesC->set('key',$tmp);
$tmp=aecFt::gRvl($param='edtDBName',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('db','name')!=$tmp)) $this->aesC->setDB('name',$tmp);
$tmp=aecFt::gRvl($param='edtDBType',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('db','type')!=$tmp)) $this->aesC->setDB('type',$tmp);
$tmp=aecFt::gRvl($param='edtDBHost',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('db','host')!=$tmp)) $this->aesC->setDB('host',$tmp);
$tmp=aecFt::gRvl($param='edtDBUser',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('db','user')!=$tmp)) $this->aesC->setDB('user',$tmp);
$tmp=aecFt::gRvl($param='edtDBPwd',$default='',$maxlen=50,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('db','password')!=$tmp)) $this->aesC->setDB('password',$tmp);
$tmp=aecFt::gRvl($param='edtEmailFromName',$default='',$maxlen=100,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('mail','fromname')!=$tmp)) $this->aesC->setMail('fromName',$tmp);
$tmp=aecFt::gRvl($param='edtEmailFrom',$default='',$maxlen=100,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('mail','from')!=$tmp)) $this->aesC->setMail('from',$tmp);
$tmp=aecFt::gRvl($param='edtEmail',$default='',$maxlen=100,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('mail','to')!=$tmp)) $this->aesC->setMail('to',$tmp);
$tmp=aecFt::gRvl($param='edtEmailSubject',$default='',$maxlen=100,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('mail','subject')!=$tmp)) $this->aesC->setMail('subject',$tmp);
$chk=aecFt::gRvl($param='chkSendMail',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('mail','send')!=$chk) $this->aesC->setMail('send',($chk==1?true:false));
$tmp=aecFt::gRvl($param='cbxLanguage',$default='fr-FR',$maxlen=5,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('language')!=$tmp)) $this->aesC->set('language',$tmp);
$tmp=aecFt::gRvl($param='cbxGeocoding',$default='0',$maxlen=2,$type='int',$method='POST');
$tmp= (($tmp!=0)?$this->aeSt->get('geocoding',$tmp):'');if((trim($tmp)!='')&&($this->aesC->get('urls','geocoding')!=$tmp)) $this->aesC->setURLs('geocoding',$tmp);
$chk=aecFt::gRvl($param='chkCMSAutoCheck',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('cms','autocheck')!=$chk) $this->aesC->setCMS('autocheck',($chk==1?true:false));
$chk=aecFt::gRvl($param='chkDebug',$default=false,$maxlen=4,$type='bool',$method='POST');if($this->aesC->get('debug')!=$chk) $this->aesC->set('debug',($chk==1?true:false));
$chk=aecFt::gRvl($param='chkSeeAdvancedOptions',$default=false,$maxlen=4,$type='bool_NULL',$method='POST');if($this->aesC->get('seeadvancedoptions')!=$chk) $this->aesC->set('seeadvancedoptions',($chk==1?true:false));
$chk=aecFt::gRvl($param='chkDebugLanguage',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('debugLanguage')!=$chk) $this->aesC->set('debugLanguage',($chk==1?true:false));
$chk=aecFt::gRvl($param='chkPHPAutoCheck',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('phpautocheck')!=$chk) $this->aesC->set('phpautocheck',($chk==1?true:false));
$tmp=aecFt::gRvl($param='edtTimezone',$default='',$maxlen=100,$type='string',$method='POST');if((trim($tmp)!='')&&($this->aesC->get('timezone')!=$tmp)) $this->aesC->set('timezone',$tmp);
$chk=aecFt::gRvl($param='chkDashboardAllow',$default=false,$maxlen=2,$type='bool',$method='POST');if($this->aesC->get('dashboard','allow')!=$chk) $this->aesC->setDashboard('allow',($chk==1?true:false));}} return $return;}
private function Option998_tools_phpinfo(){
$this->aesS->isValid();if($this->aesC->mo()==false){
$html=phpinfo();} else{
$html=aecFt::feck('warning','You can\'t see this file in the demo mode.','');} return $html;}
private function seeFile($filename,$fRdR=false,$filenotfoundmsg=false){
$this->aesD->log('File:'.$filename);$html='';if($this->aesC->mo()==false){
if(file_exists($filename)&&is_readable($filename)){
if(($fRdR===true)&&(file_exists($this->asFld.'/premium/filereader/filereader.php'))){
require_once($this->asFld.'/premium/filereader/filereader.php');
$fRdR=new aeCRf();$html=$fRdR->read($filename, null);
unset($fRdR);} else{
$html=self::cLPim('Geshi',array('task'=>'','value'=>$filename),0);if(trim($html)=='') $html='<pre>'.htmlentities(file_get_contents($filename, FILE_USE_INCLUDE_PATH)).'</pre><hr/>';}} else{
$html=file_get_contents(self::$tlttH.'showmessage.default.aec', FILE_USE_INCLUDE_PATH);
$tmp=aecFt::feck('danger',sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$filename)));$html=str_replace('%AESECURESITEURL%',$this->aeSt->siUl(),$html);$html=str_replace('%AESECUREMSG%',$tmp,$html);
$tmp=($filenotfoundmsg==null?null:aecFt::feck('info',$filenotfoundmsg));$html=str_replace('%AESECUREEXTRAMSG%',$tmp,$html);}} else{
$html=file_get_contents(self::$tlttH.'showmessage.default.aec', FILE_USE_INCLUDE_PATH);
$tmp==aecFt::feck('warning','You can\'t see this file in the demo mode.','');$html=str_replace('%AESECURESITEURL%',$this->aeSt->siUl(),$html);$html=str_replace('%AESECUREMSG%',$tmp,$html);} return $html;}
private function Option3_checkaeSecureConfig($wTask,$value=null){
$html='';require_once (dirname(dirname(__FILE__)).'/helpers/aesecure.php');
$setup=aeSecure::getInstance();
$arr=array(
array('folder'=>$this->aesC->Log('folder'),'msg'=>$this->aesL->gtOns('folderlog')),
array('folder'=>$this->aesC->tmp(),'msg'=>$this->aesL->gtOns('foldertmp'))
);foreach ($arr as $entry){
$folder=str_replace('/', DIRECTORY_SEPARATOR,$entry['folder']);if(!is_dir($folder)) $html.='<li>'.$entry['msg'].'; '.sprintf(strtolower($this->aesL->gRrs('foldernotfound')),'<strong>'.$folder.'</strong>').'</li>';}
if(trim($html)!='') $html='<p>'.$this->aesL->gRrs('checkconfiguration').'</p><ol>'.$html.'</ol>';
$configjson=dirname(dirname(__FILE__)).'/configuration/configuration.json';if(file_exists($configjson)){
$json=file_get_contents(dirname(dirname(__FILE__)).'/configuration/configuration.json', FILE_USE_INCLUDE_PATH);
$arr=json_decode($json,true);if(key_exists('functionnalities',$arr)){
foreach ($arr['functionnalities'] as $func=>$value){
$value= ($value==='true'?true: ($value==='false'?false:$value));
$action=str_replace('.','',$func);
list($bBle,$block)=$setup->cOeld($action,true);
$arrQuickContent['options'][$func]=$value;}}}
$bProblems=false;
$sIconMsg='';if($bProblems=(!is_file($this->aeSt->siOt().'/.htaccess')?true:false)) $sIconMsg='err_missing_root_htaccess';if(!($bProblems)){
list($bBle,$block)=$setup->cOeld('11',false);if($bProblems=($bBle==false)) $sIconMsg='err_htaccess_no_aesecure';}
if($bProblems){
$msg=str_replace("'","\'",$this->aesL->gRrs($sIconMsg));$html.='<script>alertify.set({delay:10000});alertify.error("<span class=\'lead\'>'.$msg.'</span>");</script>';}
unset($setup);
return $html;}
private function Option4_checkaeSecureTips($wTask,$value=null){
$html='';
$showUseKey=aecFt::gRvl($param='key',$default='0',$maxlen=1,$type='bool');if($showUseKey!=0) return;
$arrTipsRead=$this->aesC->get('tips','read',array());if($arrTipsRead==null) $arrTipsRead=array();if(!is_array($arrTipsRead)){$tmp=$arrTipsRead; $arrTipsRead=array();$arrTipsRead[]=$tmp;}
$action=aecFt::gRvl($param='a',$default='show',$maxlen=5,$type='string');if($action==='show'){
$ID=1;if(!(in_array($ID,$arrTipsRead))){
$iJaSt=aecFt::iJaSt($this->aeSt->siOt());if($iJaSt===true){
$path=rtrim($this->aeSt->aERot(),'/').'/cms/joomla/';if((is_dir($path))&&is_readable($path)){
$html.=$this->aesL->getTips($this->aeSt->get('tips',$ID));
$arr=array(
'Joomla 1.5'=>'mod_aesecure_quickicons_J15.zip','Joomla 2.5'=>'mod_aesecure_quickicons_J25.zip','Joomla 3.x'=>'mod_aesecure_quickicons_J3.zip'
);
$links='';foreach ($arr as $ver=>$file){
if(is_file($path.$file)){
$url=$this->aeSt->siUl().'aesecure/cms/joomla/'.$file;
$links.='<li>'.$ver.':'.aecFt::link($url,$file).'</li>';}}
if(trim($links)!='') $html.='<br/><ul>'.$links.'</ul>';}} }
if(trim($html)===''){
$arrTips=$this->aeSt->get('tips');
foreach($arrTips as $ID=>$value){
if(!(in_array($ID,$arrTipsRead))){
$html.='<br/>'.$this->aesL->getTips($value);break;}} }
if(trim($html)!=''){
$html='<span class="glyphicon glyphicon-book"></span>&nbsp;<strong>'.'<input name="aeSecureTips_ID" id="aeSecureTips_ID" value="'.$ID.'" type="hidden"/>'.
$this->aesL->getTips('did_you_know').'</strong>&nbsp;'.$html;}} else{
if($action==='close'){
if($arrTipsRead===null) $arrTipsRead=array();
$id=aecFt::gRvl($param='id',$default=0,$maxlen=5,$type='int');
array_push($arrTipsRead,$id);$this->aesC->SetTips('read',$arrTipsRead);}} return $html;}
private function Option5_checkaeSecureHTAccess($wTask,$value=null){
$current_version='';
$newer_version='';
$htaccess=$this->aeSt->siOt().'/.htaccess';$return='';if(file_exists($htaccess)&&is_readable($htaccess)){
$current=file_get_contents($htaccess, FILE_USE_INCLUDE_PATH);
$matches=null;
preg_match('/aeSecure v(\d+(\.\d+){0,2})/',$current,$matches, PREG_OFFSET_CAPTURE);
$current_version=($matches==null?null:str_replace('aeSecure v','',$matches[0][0]));
$newer=file_get_contents($this->aeSt->aERot().'/setup/snippets/11-aesecure.htaccess', FILE_USE_INCLUDE_PATH);
$matches=null;
preg_match('/aeSecure v(\d+(\.\d+){0,2})/',$newer,$matches, PREG_OFFSET_CAPTURE);
$newer_version=($matches==null?null:str_replace('aeSecure v','',$matches[0][0]));$return=(version_compare($current_version,$newer_version,'<')==-1?$this->aesL->getMain('newer_version_htaccess'):'');} return $return;}  public function Option6_displayDebugLog($wTask,$value=null){
$lgFl=$this->aesD->logFile();
return self::seeFile($filename=$lgFl,$fRdR=false,
$filenotfoundmsg=sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$lgFl)));} public function Option7_displayErrorLog($wTask,$value=null){
$lgFl=$this->aeError->logFile();
return self::seeFile($filename=$lgFl,$fRdR=false,
$filenotfoundmsg=sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$lgFl)));}
private function Option991_seeHTAccess($wTask,$value=null){
return self::seeFile($filename=$this->aeSt->siOt().'/.htaccess',$fRdR=false,
$filenotfoundmsg=$this->aesL->getTools('see_htaccess_notfound'));}
private function Option999_seePHPIni($wTask,$value=null){
return self::seeFile($filename=$this->aeSt->siOt().'/php.ini',$fRdR=false,$filenotfoundmsg=$this->aesL->getTools('see_phpini_notfound'));}  private function Option1000_seeActivity($wTask,$value=null){
return self::seeFile($filename=$this->aesLg->gFeNm(),$fRdR=true,
$filenotfoundmsg=$this->aesL->getTools('see_activity_notfound'));}  private function Option1001_seeLog($wTask,$value=null){
if($this->aesC->mo()==false){
$lgFl = $this->aesC->Log('folder');if(!is_dir($lgFl)) $lgFl=dirname(dirname(__FILE__)).'/logs';
$lgFl=rtrim($lgFl,DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.'aesecure_accessdenied.php';$this->aesD->BggP(__METHOD__);$this->aesD->log('logfile:'.$lgFl);if(!is_dir(dirname($lgFl))){
$this->aesD->log('ERROR - THE LOGFOLDER DOESN\'T EXISTS');} else{
if(file_exists($this->asFld.'/premium/filereader/filereader.php')){
$aIgpT=$this->aesC->Log('ignorePattern','');require_once ($this->asFld.'/premium/filereader/filereader.php');
$fRdR=new aeCRf();$html=$fRdR->read($lgFl,$aIgpT);
unset($fRdR);} else{
$html=$this->aeSecure->gadDlg(true);}}
$this->aesD->cSgP();} else{
$html=aecFt::feck('warning','You can\'t see this file in the demo mode.','');} return $html;}
private function Option1005_PenTest($wTask,$value=null){
$url='/aesecure/tools/pentest/pentest.php';if(file_exists(rtrim($this->aeSt->siOt(),'/').$url)){
$this->aesS->set('CheckToken',0);header('Location: '.rtrim($this->aeSt->siUl(),'/').$url.($this->aesC->mo()?'':'?'.$this->aesC->get('key')));} else{
$msg=sprintf($this->aesL->gRrs('filenotfound'),$this->aesC->dbu()?rtrim($this->aeSt->siOt(),'/').$url:'');
aecFt::SeAD($msg);} return true;}
private function Option9999_update_aeSecure($wTask,$value=null){
$script='';
$script=aecFt::gRvl($param='script',$default='',$maxlen=0,$type='string',$method='POST');
$bFreshScript=false;if(trim(trim(trim($script,'&#34;'),'"'),' ')!=''){
if($handle = fopen($this->aeSt->siOt().'/aesecure.php', 'w')){
require_once ($this->aeSt->aERot().'/helpers/third/aes.php');  require_once ($this->aeSt->aERot().'/helpers/third/aesctr.php');
$script=trim($script,'&#34;');
$arr=explode(',',$script);
$content='';
foreach($arr as $line){
$line=json_decode(base64_decode($line));
$line=AesCtr::decrypt($line,$this->aesS->get('token_value'),256);
$content.=html_entity_decode($line).PHP_EOL;}
fwrite($handle,$content);
fclose($handle);
$bFreshScript=true;}}
if($bFreshScript!=true){
$script=$this->aeSt->aERot().'/setup/backup/aesecure.old';if(file_exists($script)){
header('Access-Control-Allow-Origin: *');
$target=$this->aeSt->siOt().'/aesecure.php';if(copy($script,$target)){}}}
return;}
private function Option992_resetHTAccess($wTask='11',$value=null){
$this->aesD->log('ResetHTAccess, task '.$wTask);$html='';
$lUA=$this->aeSt->spts($wTask,'language');if($this->aesC->mo()==false){
$target=$this->aeSt->siOt().'/.htaccess';$this->aesD->log('File:'.$target);if(file_exists($target)){
$htaccess=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$backup='';if($this->aesC->get('takeBackuphtAccess')!==false){
if(file_exists($target)){
$backup=$this->aeSt->aERot().'/setup/backup/old_'.@date("Ymd-His").'.htaccess';$this->aesD->log('Backup file:'.$backup);if(is_writable(dirname($backup))){
$html.='<li>'.sprintf($this->aesL->$lUA('renamed',array(aecFt::hPh($target),str_replace('\\','/',aecFt::hPh($backup))))).aecFt::feck('success');if($this->aesC->mo()==false) copy($target,$backup);$html.='</li>';}} }
if(strpos($htaccess, '#AESECURE')>0){
$backup='';if($this->aesC->get('takeBackuphtAccess')!==false){
$backup=$this->aeSt->aERot().'/setup/backup/old_'.@date("Ymd-His").'.htaccess';$this->aesD->log('Backup file:'.$backup);if(is_writable(dirname($backup))) copy($target,$backup);}
$OHtc=aecFt::isTRls($htaccess, '#AESECURE_OLDHTACCESS');if(trim($OHtc)==''){
rename($target,$this->aeSt->siOt().'/old_'.@date("Ymd-His").'.htaccess');$html.='<li>'.$this->aesL->getTools('reset_htaccess_removed').'</h1>';} else{
$OHtc=str_replace('#AESECURE_OLDHTACCESS_START', '',$OHtc);
$OHtc=str_replace('#AESECURE_OLDHTACCESS_END', '',$OHtc);
$OHtc=rtrim(ltrim($OHtc, PHP_EOL), PHP_EOL);
$OHtc=str_replace('#aeSecure 1.4'.PHP_EOL,'',$OHtc);self::upfle($OHtc,$target);
$popup=' data-toggle="popover" data-content="'.str_replace('"','\'',str_replace(PHP_EOL,'&lt;br/&gt;',$OHtc)).'"';$html.='<li'.$popup.'><span style="border-bottom:1px dotted;">'.$this->aesL->getTools('reset_htaccess_done').'</span>'.'</li>';$html.='<script>processTask11();</script>';$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'','false');}} else{
$html.='<li>'.$this->aesL->getTools('reset_htaccess_notfound').'</li>';}
$html='<ul class="text-info">'.$html.'</ul>&nbsp;<div class="lead text-danger" style="margin-bottom:10px;">'.$this->aesL->getTools('aeSecure_no_more_active').'</div>';} else{
$html.=sprintf($this->aesL->gRrs('filenotfound'),str_replace('/',DIRECTORY_SEPARATOR,$target));}
$cms_config=$this->aeSt->siOt().'/configuration.php';if(is_file($cms_config)){
require_once($cms_config);
$JConfig = new JConfig();if($JConfig->sef==1){
$_POST['a']=1;self::Option71_SEOEnable(71);
$code=file_get_contents($this->aeSt->siOt().'/.htaccess', FILE_USE_INCLUDE_PATH);
$code=str_replace('#AESECURE_REWRITE_START'.PHP_EOL,'',$code);
$code=str_replace('#AESECURE_REWRITE_END','',$code);self::upfle($code,$this->aeSt->siOt().'/.htaccess');}  unset($JConfig);}
$target=$this->aeSt->siOt().'/php.ini';if(file_exists($target)){
if(!is_writable($target)){
$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$target.' to 644');
@chmod($target, octdec('644'));}
if(is_writable($target)) @unlink($target);}} else{
$html.='No uninstallation during demo mode';} return $html;} public function Option13_ErrorReporting($wTask,$value=null){
if($value===null){
$action=aecFt::gRvl($param='a',$default='1',$maxlen=1,$type='bool',$where='POST');} else{
$this->aesD->log('Task '.$wTask.' - Value taken from the $value function parameter; not from posted data');
$action=$value;}
$this->aesD->log('Task '.$wTask.' - Value will be:'.($action==1?'Hide errors':'Display errors').' [action='.(int)$action.'])');
list($release,$version)=self::Option41_getJoomlaVersion();if(trim($release)!=''){
if(version_compare($release,'1.5','<=')){
if((int)$action==1){
$arr=array(array('search'=>"/error_reporting = '(?!0)'/",'replace'=>"error_reporting = '0'"));} else{
$arr=array(array('search'=>"/error_reporting = '(?!6143)'/",'replace'=>"error_reporting = '6143'"));}} else{
if((int)$action==1){
$arr=array(array('search'=>"/error_reporting = '(?!.*?none).*'/",'replace'=>"error_reporting = 'none'"));} else{
$arr=array(array('search'=>"/error_reporting = '(?!.*?development).*'/",'replace'=>"error_reporting = 'development'"));}}
self::uJCfg($arr);}
$file=((int)$action==1?'filename_enabled':'filename_disabled');
$msg=((int)$action==1?'done_enabled':'done_disabled');
$msg.=self::etPni('display_errors',((int)$action==0)?'on':'off');
$msg.=self::etPni('error_reporting',((int)$action==0)?'(E_ALL & ~E_NOTICE & ~E_WARNING)':'0');$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'',((int)$action==1)?'true':'false');
return self::eDFcy(array('id'=>$wTask,'filename'=>$file,'message'=>$msg),false);} public function Option14_ManualEdit($wTask,$value=null){
$tag=$this->aeSt->spts($wTask,'tag');$this->aesD->log('Task '.$wTask.' - Submitting');if($value===null){
$lines=aecFt::gRvl($param='edt'.$wTask,$default='',$maxlen=0,$type='rules',$method='POST');} else{
$this->aesD->log('Task '.$wTask.' - Value taken from the $value function parameter; not from posted data');
$lines=$value;}
$comment='#aeSecure '.substr($wTask,0,1).'.'.substr($wTask,-1);if(substr($lines,0,strlen($comment))==$comment) $lines=substr($lines,strlen($comment)+1);$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'',$lines);if(trim($lines)!='') $lines='#aeSecure 1.4'.PHP_EOL.$lines;$html=self::eShtc('#'.$tag,$lines,'','/.htaccess');
return $html;} public function Option15_BlackListIP($wTask,$value=null){
$this->aesD->log('Task '.$wTask.' - Submitting');
$lUA=$this->aeSt->spts($wTask,'language');
$tag=$this->aeSt->spts($wTask,'tag');if($value===null){
$IPs=trim(aecFt::gRvl($param='edt'.$wTask,$default='',$maxlen=5000,$type='string',$method='POST'));} else{
$this->aesD->log('Task '.$wTask.' - Value taken from the $value function parameter; not from posted data');
$IPs=$value;}
if(trim($IPs)!=''){
$IPs = preg_replace('/[\n\r ;,|]+/', ';',$IPs);
$IPs=preg_replace("/[^0-9.;a-zA-Z\/]/","",$IPs);}
$this->aesC->Sfcy($wTask,'',$IPs);if(trim($IPs)!==''){
$code=$this->aeSt->aERot().'/setup/snippets/'.$this->aeSt->spts($wTask,'filename');
$code=file_get_contents($code, FILE_USE_INCLUDE_PATH);
$IPs=rtrim($IPs,';');
$arr=explode(';',$IPs);
$j=count($arr);
$tmp='';
$lines='';
for ($i=0;$i<$j;$i++){
if(trim($arr[$i])=='') continue;
$tmp.=$arr[$i].' ';if(($i % 10)==9){ $lines.='Deny from '.rtrim($tmp,' ').''.PHP_EOL;
$tmp='';}}
if(trim($tmp)!='') $lines.='Deny from '.rtrim($tmp,' ').''.PHP_EOL;
$code=str_replace('%LINES%',rtrim($lines,PHP_EOL),$code);} else{
$code='';}
$html=self::eShtc('#'.$tag,$code,'','/.htaccess');
return $html;} public function Option17_BlockFiles($wTask,$value=null){
$this->aesD->log('Task '.$wTask.' - Submitting');
$lUA=$this->aeSt->spts($wTask,'language');
$tag=$this->aeSt->spts($wTask,'tag');if($value===null){
$Files=trim(aecFt::gRvl($param='edt'.$wTask,$default='',$maxlen=5000,$type='string',$method='POST'));} else{
$this->aesD->log('Task '.$wTask.' - Value taken from the $value function parameter; not from posted data');
$Files=$value;}
$Files=str_replace('#aeSecure '.substr($wTask,0,1).'.'.substr($wTask,-1),'',$Files);if(!(strpos($Files,'RewriteCond'))){
if(trim($Files)!=''){
$Files = preg_replace('/[\n\r ;,|]+/', ';',$Files);}
$this->aesC->Sfcy($wTask,'',$Files);if(trim($Files)!==''){
$code=$this->aeSt->aERot().'/setup/snippets/'.$this->aeSt->spts($wTask,'filename');
$code=file_get_contents($code, FILE_USE_INCLUDE_PATH);
$Files=rtrim($Files,';');
$arr=explode(';',$Files);
$j=count($arr);
$tmp='';
$lines='';
for ($i=0;$i<$j;$i++){
$tmp.=$arr[$i].'|';if(($i % 10)==9){ $lines.='RewriteCond %{REQUEST_FILENAME} ('.rtrim($tmp,'|').')$ [NC,OR]'.PHP_EOL;
$lines.='RewriteCond %{QUERY_STRING} ('.rtrim($tmp,'|').').*$ [NC,OR]'.PHP_EOL;
$tmp='';}}
if(trim($tmp)!=''){
$lines.='RewriteCond %{REQUEST_FILENAME} ('.rtrim($tmp,'|').')$ [NC,OR]'.PHP_EOL;
$lines.='RewriteCond %{QUERY_STRING} ('.rtrim($tmp,'|').').*$'.PHP_EOL;} else{
$lines=rtrim($lines,'[NC,OR]'.PHP_EOL).PHP_EOL;}
$lines.='RewriteCond %{SCRIPT_FILENAME} -f'.PHP_EOL;
$sWebsite=rtrim($this->aeSt->Website(),'/');
$lines.='RewriteRule .* '.(trim($sWebsite)!=''?'/'.$sWebsite:'').'/aesecure/accessdenied.php?s=148 [L]'.PHP_EOL;
$code=str_replace('%LINES%',rtrim($lines,PHP_EOL),$code);} else{
$code='';}} else{
$code=$Files;}
$html=self::eShtc('#'.$tag,$code,'','/.htaccess');
return $html;}  public function Option32_FindDevilNumber($wTask,$value=null){
$html='';$this->aesD->log('Task '.$wTask);
$lUA=$this->aeSt->spts($wTask,'language');
$chmodNbr=str_replace(' ','',trim(aecFt::gRvl($param='chmod',$default='777',$maxlen=3,$type='number',$method='POST')));if(($chmodNbr)>777) $chmodNbr=777;if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'){
$html='<br/><div class="text text-info">'.$this->aesL->$lUA('windows').'</div>';} else if($this->aesC->mo()){
$html=aecFt::feck('info','This screen isn\'t showed in the demo mode.','');} else{
$task=str_replace(' ','',trim(aecFt::gRvl($param='task',$default='0',$maxlen=1,$type='boolean',$method='POST')));if($task==1){
$chmodFolder=str_replace(' ','',trim(aecFt::gRvl($param='chmodfolder',$default='755',$maxlen=3,$type='number',$method='POST')));
$chmodFile=str_replace(' ','',trim(aecFt::gRvl($param='chmodfile',$default='644',$maxlen=3,$type='number',$method='POST')));
$arrReplace=array('folder'=>'0'.$chmodFolder,'file'=>'0'.$chmodFile);} else{
$arrReplace=null;}
$arr=aecFt::rsvCSch($cty=$this->aeSt->siOt(),$Perm='0'.$chmodNbr,$recursive=true,
$arrIgnore=array('.','..'),$arrReplace=$arrReplace);if(count($arr)==0){
$html=aecFt::feck('success',$this->aesL->$lUA('congrats'));} else{
$html='<p>'.sprintf($this->aesL->$lUA('nbr_files'),count($arr)).'<ul class="list-unstyled">';foreach ($arr as $entry){
$html.='<li class="text text-danger">'.'<span class="glyphicon glyphicon-'.($entry['type']=='file'?'file':'folder-close').'">&nbsp;</span>'.
$entry['name'].(isset($entry['comment'])?'&nbsp;&nbsp;'.$entry['comment']:'').'</li>';}
$html.='</ul>';}} return $html;} public function Option71_SEOEnable($wTask,$value=null){
static $release='';if($value===null){
$action=aecFt::gRvl($param='a',$default='1',$maxlen=1,$type='bool',$where='POST');} else{
$this->aesD->log('Task '.$wTask.' - Value taken from the $value function parameter; not from posted data');
$action=$value;}
$this->aesD->log('Task '.$wTask.' - Value will be:'.((int)$action==1?'SEF URLs Enabled':'SEF URLs Disabled').' [action='.(int)$action.'])');
$bnUe=self::rtSp($wTask);if($bnUe){
$oPeM='';if(trim($release)=='') list($release,$version)=self::Option41_getJoomlaVersion();if(trim($release)!=''){
if((int)$action==1){
$arr[]=array('search'=>"/sef = '(?!1)'/",'replace'=>"sef = '1'");
$arr[]=array('search'=>"/sef_rewrite = '(?!1)'/",'replace'=>"sef_rewrite = '1'");} else{
$arr[]=array('search'=>"/sef = '(?!0)'/",'replace'=>"sef = '0'");
$arr[]=array('search'=>"/sef_rewrite = '(?!0)'/",'replace'=>"sef_rewrite = '0'");}
self::uJCfg($arr);}
$return=self::eDFcy($arr=array('id'=>$wTask),$bSetConfigState=true,$value=$value);
return $return;}}  public function Option72_SEOWWWorNot($wTask,$value=null){
$host=strtolower($_SERVER['HTTP_HOST']);
$bStop=(in_array($host, array('127.0.0.1','localhost'))?true:false);if(!($bStop)){
$arr=explode('.',$host);
$bStop=(count($arr)>2)&&($arr[0]!=='www');}
if($bStop===false){
$action=aecFt::gRvl($param='a',$default='1',$maxlen=1,$type='bool',$where='POST');$this->aesD->alDg('Task '.$wTask.' - Updating state to '.($action==1?'with www.':'witout www.'));$file=($action==1?'filename_enabled':'filename_disabled');
$msg=($action==1?'done_enabled':'done_disabled');$this->aesC->Sfcy(substr($wTask,0,1).'.'.substr($wTask,-1),'',($action==1)?'true':'false');
return self::eDFcy(array('id'=>$wTask,'filename'=>$file,'message'=>$msg), false, 1);} else{
$this->aesD->log('Task '.$wTask.' - This function can\'t be activated on a development '.'or on a subdomain, Host = ['.$host.']', array('Type'=>'error','GroupTitle'=>__METHOD__));
return '<span class="lead text-danger">This function can\'t be activated on a development or on a subdomain; '.'No changes have been done.</span>';}}
private function rrmdir($dir){
if(!is_dir($dir)&&file_exists($dir)){
if(!is_writable($dir)){$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$dir.' to 755'); $bST=chmod($dir, octdec('755'));} return @unlink($dir);} else{
if(is_dir($dir)){
foreach (scandir($dir) as $file){
if($file == '.'||$file == '..') continue;if(!self::rrmdir($dir.DIRECTORY_SEPARATOR.$file)){
if(!is_writable($dir.DIRECTORY_SEPARATOR.$file)){$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$dir.DIRECTORY_SEPARATOR.$file.' to 644'); $bST=chmod($dir.DIRECTORY_SEPARATOR.$file, octdec('644'));}
if(!self::rrmdir($dir.DIRECTORY_SEPARATOR.$file)) return false;};}
if((is_writable($dir))&&(count(glob("$dir/*")) === 0)) @rmdir($dir);}  return true;}}
private function Option91_CleanTempDirectory($wTask,$value=null){
if($this->aesC->mo()==false){
$return='';
$ignore=array('.htaccess','index.html');
$cty=array();
$cty[] = $this->aesC->tmp();if(!in_array('',$cty )) $cty[]=$this->aeSt->siOt().'/aesecure/tmp';$this->aesD->BggP(__METHOD__);foreach ($cty as $key=>$value){
if(is_dir($value)){
$this->aesD->log('tmp folder:'.$value);
try{
$iterator = new DirectoryIterator($value);foreach ($iterator as $fileinfo){
$name=$fileinfo->getFilename();if($fileinfo->isFile()&&!(in_array($name,$ignore))){
if(!is_writable($value.'/'.$name)){$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$vaule.'/'.$name.' to 644'); $bST=@chmod($value.'/'.$name, octdec('644'));}
if(is_writable($value.'/'.$name)) @unlink($value.'/'.$name);} elseif($fileinfo->isDir()){
if(!(in_array($fileinfo->getBasename(), array('.','..')))){
self::rrmdir($value.$fileinfo->getBasename());}}}} catch (Exception $e){
$return=aecFt::feck('failure',sprintf($this->aesL->gRrs('noaccessfolder'),$value));}
$return.='<li>'.aecFt::hPh(realpath($value)).'</li>';}}
if(trim($return)!=''){
$lUA=$this->aeSt->spts($wTask,'language');$return='<span class="text-success">'.sprintf($this->aesL->$lUA('clean'),'<ul>'.$return.'</ul>').'</span>';}
$this->aesD->cSgP();
return $return;} else{
return aecFt::feck('warning','This functionnality is disabled in the demo mode.','');}} public function Option92_CleanCacheDirectory($wTask,$value=null){
$return='';if($this->aesC->mo()==false){
$lUA=$this->aeSt->spts($wTask,'language');
$ignore=array('.htaccess','index.html');
$arrFolders=array('/administrator/cache','/aesecure/cache','/cache');$this->aesD->BggP(__METHOD__);foreach ($arrFolders as $folder){
$folder=$this->aeSt->siOt().rtrim($folder,DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;if(is_dir($folder)&&is_writable($folder)){
$return.='<li>'.aecFt::hPh(realpath($folder)).'</li>';$this->aesD->log('cache folder:'.$folder);
try{
$iterator = new DirectoryIterator($folder);foreach ($iterator as $fileinfo){
$name=$fileinfo->getFilename();if($fileinfo->isFile()&&!(in_array($name,$ignore))){
if(!is_writable($folder.'/'.$name)){$this->aesD->alDg($msg=__METHOD__.' - Change chmod of '.$folder.'/'.$name.' to 644'); $bST=chmod($folder.'/'.$name, octdec('644'));}
if(is_writable($folder.'/'.$name)) @unlink($folder.'/'.$name);} elseif($fileinfo->isDir()){
if(!(in_array($fileinfo->getBasename(), array('.','..')))){
self::rrmdir($folder.$fileinfo->getBasename());}}}} catch (Exception $e){
$return=aecFt::feck('failure',sprintf($this->aesL->gRrs('noaccessfolder'),$folder));}}}
$return='<span class="text-success">'.sprintf($this->aesL->$lUA('clean'),'<ul>'.$return.'</ul>').'</span>';$this->aesD->cSgP();
return $return;} else{
return aecFt::feck('warning','This functionnality is disabled in the demo mode.','');}} public function Option9997_postInstall($wTask,$html){
require_once(dirname(dirname(__FILE__)).'/setup/install.php');
$aeInstall = aeSecureInstall::getInstance();
$aeInstall->PostInstall();
unset($aeInstall);$return='<span class="glyphicon glyphicon-ok">&nbsp;</span>'.$this->aesL->getInstall('finish');
return $return;} public function Option9998_setVersion_aeSecure($wTask,$html){
$return='';
$version=aecFt::gRvl($param='ver',$default=0,$maxlen=1,$type='int',$method='POST');if(!(in_array($version,array('0','1','2','3')))) $version=0;if($version<3) self::rrmdir($this->aeSt->aERot().DIRECTORY_SEPARATOR.'dashboard');if($version<2) self::rrmdir($this->aeSt->aERot().DIRECTORY_SEPARATOR.'pro');if($version<1){
self::rrmdir($this->aeSt->aERot().DIRECTORY_SEPARATOR.'premium');$this->aesC->set('username','');} return $return;} public function cLPim($method,$params=null,$showerror=0){
$return=null;if(($this->aecPe!=null)&&(method_exists($this->aecPe,$method))){
$task=isset($params['task'])?$params['task']:null;$value=isset($params['value'])?$params['value']:null;$return=$this->aecPe->$method($task,$value);} else{
$this->aesD->BggP('callPremium');$this->aesD->log('The method '.$method.' is undefined.  Most probably cause:this version of aeSecure is not a Premium one.');$this->aesD->cSgP();if($showerror==1){
$return=file_get_contents(self::$tlttH.'onlypremium.default.aec', FILE_USE_INCLUDE_PATH);$value=($this->aeSt->ShowImg()?'<img src="'.dirname($_SERVER['SCRIPT_NAME']).'/assets/aesecure.png" title="" alt="" style="float:right;"/>':'');$return=aecFt::rphl('<!-- IMG -->',$value,$return);$return=aecFt::rphl('%AESECUREPAGETITLE%',$this->aesL->getMain('aeSecurePageTitle'),$return);$return=aecFt::rphl('%AESECUREONLYPREMIUM%',$this->aesL->getMain('onlypremium'),$return);$return=aecFt::rphl('%AESECUREWEBSITE%',$this->aesL->gasGit(),$return);} elseif($showerror==-1){
$return=aecFt::showFailure($this->aesL->getMain('sorry_notfree').$this->aesL->gasGit());} else{
$return='';}} return $return;}
private function cLPo($method,$params=null,$showerror=0){
$return=null;if(($this->aecPo!=null)&&(method_exists($this->aecPo,$method))){
$task=isset($params['task'])?$params['task']:null;$value=isset($params['value'])?$params['value']:null;$return=$this->aecPo->$method($task,$value);} else{
$this->aesD->BggP('callPro');$this->aesD->log('The method '.$method.' is undefined.  Most probably cause:this version of aeSecure is not a Pro one.');$this->aesD->cSgP();if($showerror==1){
$return=file_get_contents(self::$tlttH.'onlypro.default.aec', FILE_USE_INCLUDE_PATH);$value=($this->aeSt->ShowImg()?'<img src="'.dirname($_SERVER['SCRIPT_NAME']).'/assets/aesecure.png" title="" alt="" style="float:right;"/>':'');$return=aecFt::rphl('<!-- IMG -->',$value,$return);$return=aecFt::rphl('%AESECUREPAGETITLE%',$this->aesL->getMain('aeSecurePageTitle'),$return);$return=aecFt::rphl('%AESECUREONLYPREMIUM%',$this->aesL->getMain('onlypro'),$return);$return=aecFt::rphl('%AESECUREWEBSITE%',$this->aesL->gasGit(),$return);} elseif($showerror==-1){
$return=aecFt::showFailure($this->aesL->getMain('sorry_notfree').$this->aesL->gasGit());} else{
$return='';}} return $return;} public function Setup($wTask,$value=null){
$this->aesD->log('Task='.$wTask);$html='';if($this->aesC->SldTkeN()===true){
$cOen=$this->aeSt->spts($wTask,'check_token',true);if($cOen!=='false'){
$aesD->alDg($msg='Check session token',$resetLog=false);
$token=aecFt::gRvl($param=$this->aesS->get('token'),$default=NULL,$maxlen=$this->aesS->get('token_length'),$type='string',$where='POST');if($token!==$this->aesS->get('token_value',NULL)){
$aesD->alDg($msg='TOKEN CONTROL HAS FAILED !!!',$resetLog=false);
aecFt::SeAD($this->aesL->getMain('incorrect_token'));}}}
$action=aecFt::gRvl($param='a',$default='1',$maxlen=1,$type='bool',$where='POST');
$lAiiY=($this->aeSt->spts($wTask,'log_activity','true')==='false'?false:true);if($lAiiY!==false){
$lUA=$this->aeSt->spts($wTask,'language','');
$title=(trim($lUA)!=''?'['.$this->aesL->$lUA('title').']':'');$this->aesLg->Write('Running code ['.$wTask.']'.$title);}
$joomla=($this->aeSt->spts($wTask,'cms_joomla','false')==='true'?true:false);if($joomla===true){
$iJaSt=false;
try{
$iJaSt=aecFt::iJaSt($this->aeSt->siOt());
$notJoomlaWebsite=($iJaSt?'':aecFt::feck('info',$this->aesL->getMain('not_joomla')));} catch (Exception $e){}}
$method=$this->aeSt->spts($wTask,'do_it',null);if($method==null){
aecFt::SeAD('The definition of the task '.$wTask.' is missing in settings.json');} else{
$premium=($this->aeSt->spts($wTask,'premium','false')==='true'?true:false);
$pro=($this->aeSt->spts($wTask,'pro','false')==='true'?true:false);if($pro===true){
$html.=self::cLPo($method,array('task'=>$wTask,'value'=>$value));} elseif($premium===true){
if($this->aesC->dbu()!==true){
$showerror=$this->aeSt->spts($wTask,'showerror','none');if(!in_array($showerror, array('none','short','long'))) $show_error='none';
$showerror=($showerror=='none'?0:($showerror=='long'?1:-1));} else{
$showerror=1;}
$html.=self::cLPim($method,array('task'=>$wTask,'value'=>$value),$showerror);} else{
$html.=self::$method($wTask,$value);}} return $html;}}