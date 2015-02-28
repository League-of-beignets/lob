<?php
   // @file : /setup/install.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:49
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
defined( '_AESECURE') or die('No direct access allowed');
class aeSecureInstall{
protected static $instance = null;private $rtDr='';private $asFld='';var $aesC=null;var $aesD=null;
function __construct($args=null){
$this->asFld=dirname(dirname(__FILE__));$this->rtDr=dirname(dirname(dirname(__FILE__)));require_once (dirname(dirname(__FILE__)).'/helpers/debug.php');$this->aesD = aecDb::getInstance();require_once (dirname(dirname(__FILE__)).'/helpers/configuration.php');$this->aesC = aeSecureConfiguration::getInstance();
return true;}  public static function getInstance(){
if(self::$instance === null) self::$instance = new aeSecureInstall;
return self::$instance;} public function PreInstall(){
return true;} public function PostInstall(){
try{
self::PostInstallRemoveOldFiles();self::PostInstallAdjustChmod();self::PostInstallUpdateRootHtAccess();self::PostInstallProcessHtAccess();} catch (Exception $e){}
return;}
private function PostInstallAdjustChmod(){
$this->aesD->alDg('Adjust chmods');
$arr=array(array('configuration.php','0644'),array('php.ini','0644'));
$arrFiles=null;foreach ($arr as $arrFile){
$file=rtrim($this->rtDr, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.$arrFile[0];if(file_exists($file)){
try{
$oPeM=fileperms($file);if($oPeM!=octdec($arrFile[1])){
$this->aesD->alDg('   Change chmod of '.$file.' to '.$arrFile[1]);
$bST=@chmod($file, octdec($arrFile[1]));}} catch (Exception $e){}} } return true;}
private function PostInstallRemoveOldFiles(){
$this->aesD->alDg('Removing old files');
$root=$this->asFld;
$arrFiles=array(
'/aesecure.htaccess','/install.php','/maintenance.php','/sentkey.php','/configuration/languages/en-GB.json','/configuration/languages/es-ES.json','/configuration/languages/fr-FR.json','/configuration/languages/pt-BR.json','/configuration/languages/fr-FR.json','/premium/setup/snippets/42-block_com_users.htaccess','/premium/template/joomlaver.default.php','/premium/template/phpver.default.php','/premium/third/.htaccess','/setup/snippets/19-premium.maintenance.htaccess','/setup/snippets/23.block_badbots.htaccess','/setup/snippets/23-free.block_badbots.htaccess','/setup/snippets/24-premium.block_fileupload.htaccess','/setup/snippets/25-premium.bots_dontarchive.htaccess','/setup/snippets/41-premium.block_com_users.htaccess','/setup/snippets/42-premium.block_com_users.htaccess','/setup/snippets/42-premium.block_com_users.htaccess','/setup/snippets/43.protect_admin.htaccess','/setup/snippets/71.rewrite.htaccess','/setup/snippets/71-free.rewrite.htaccess','/setup/snippets/72.seo_www_with.htaccess','/setup/snippets/72.seo_www_without.htaccess','/setup/snippets/72-free.seo_www_with.htaccess','/setup/snippets/72-free.seo_www_without.htaccess','/setup/snippets/81-premium.optimize_pagespeed.htaccess','/setup/snippets/82-premium_optimize_compression.htaccess','/setup/snippets/83-premium.optimize_expiresbytype.htaccess','/setup/snippets/89-premium.optimize_hotlinking.htaccess','/setup/snippets/aesecure.htaccess','/setup/snippets/block_badbots.htaccess','/setup/snippets/block_com_users.htaccess','/setup/snippets/block_fileupload.htaccess','/setup/snippets/bots_dontarchive.htaccess','/setup/snippets/free.block_badbots.htaccess','/setup/snippets/free.rewrite.htaccess','/setup/snippets/free.seo_www_with.htaccess','/setup/snippets/free.seo_www_without.htaccess','/setup/snippets/maintenance.htaccess','/setup/snippets/optimize_expiresbytype.htaccess','/setup/snippets/optimize_gzip.htaccess','/setup/snippets/optimize_hotlinking.htaccess','/setup/snippets/optimize_pagespeed.htaccess','/setup/snippets/premium.block_com_users.htaccess','/setup/snippets/premium.block_fileupload.htaccess','/setup/snippets/premium.bots_dontarchive.htaccess','/setup/snippets/premium.maintenance.htaccess','/setup/snippets/premium.optimize_expiresbytype.htaccess','/setup/snippets/premium.optimize_hotlinking.htaccess','/setup/snippets/premium.optimize_pagespeed.htaccess','/setup/snippets/premium_optimize_compression.htaccess','/setup/snippets/premium_optimize_gzip.htaccess','/setup/snippets/rewrite.htaccess','/setup/snippets/seo_www_with.htaccess','/setup/snippets/seo_www_without.htaccess','/template/_setup.php','/template/banip.default.php','/template/default.php','/template/deny.default.php','/template/emptylog.default.php','/template/form_chmod.default.aec','/template/form_premium_protectIP.default.aec','/template/form_protectIP.default.aec','/template/joomlaver.default.php','/template/options.default.php','/template/mail.default.php','/template/phpver.default.php','/template/setup.php','/template/setup_1.php','/template/setup_2.php','/template/setup_3.php','/template/setup_4.php','/template/setup_5.php','/template/setup_6.php','/template/setup_7.php','/template/setup_8.php','/template/setup_9.php','/template/setup_content.php','/template/setup_header.php','/template/setup_sidebar.php','/template/setup_topnav.php','/third/alertify/themes/.htaccess','/third/bootstrap/css/.htaccess','/third/bootstrap/font/.htaccess','/third/bootstrap/img/.htaccess','/third/bootstrap/js/.htaccess','/third/textillate/assets/.htaccess'
);foreach ($arrFiles as $file){
if(file_exists($file)){
if(!is_writable($file)) $bST=@chmod($file, octdec('755'));$this->aesD->alDg('   Remove old file '.$file);
@unlink($file);}} return true;}
private function PostInstallUpdateRootHtAccess(){
$target=dirname($this->asFld).'/.htaccess';$this->aesD->alDg('Removings old lines in '.$target);if(file_exists($target)){
$oPeM='';if(is_readable($target)){
$content=file_get_contents($target, FILE_USE_INCLUDE_PATH);
$search='Header unset Last-Modified'.PHP_EOL;if(strpos($content,$search)>0){
if(!is_writable($target)){$oPeM=fileperms($target); $bST=@chmod($target, octdec('755'));}
if(is_writable($target)){
$this->aesD->alDg('   Remove line "'.$search.'" in '.$target);
$content=str_replace($search,'',$content);if($handle = fopen($target, 'w')){fwrite($handle,$content); fclose($handle);}}}
if(trim($oPeM)!='') @chmod($target,$oPeM);}} return true;}
private function PostInstallProcessHtAccess(){
$this->aesD->alDg('Process existing .htaccess');
$arrReplace=array(
array('ID'=>1,'Search'=>'<FilesMatch ".(cgi|php|pl|py)$">', 'Replace'=>'<FilesMatch "\.(cgi|php|pl|py)$">'),
array('ID'=>2,'Search'=>'<FilesMatch ".(cgi|php|pl|py|jsp|sh)">', 'Replace'=>'<FilesMatch "\.(cgi|php|pl|py|jsp|sh)$">')
);
$arrProcessed=$this->aesC->getPostInstall('processhtaccess','id',array());if($arrProcessed==null) $arrProcessed=array();if(!is_array($arrProcessed)){$tmp=$arrProcessed; $arrProcessed=array();$arrProcessed[]=$tmp;}
$arrBackup=$arrProcessed;foreach ($arrReplace as $tmp){
if(!in_array($tmp['ID'],$arrProcessed)) array_push($arrProcessed,$tmp['ID']);}
if($arrBackup!=$arrProcessed){
if(!class_exists('aecFt')) require_once('../helpers/functions.php');
$aeSecureRoot=$this->rtDr.DIRECTORY_SEPARATOR.'aesecure'.DIRECTORY_SEPARATOR;
$arrSkipFolder=array();
$arrFiles=aecFt::rglob($pattern='.htaccess',$path=$this->rtDr,$flags=0,$arrSkipFolder=$arrSkipFolder);if((count($arrFiles))>0){
foreach ($arrReplace as $tmp){
$search=$tmp['Search'];
$replace=$tmp['Replace'];
$ID=$tmp['ID'];if(!in_array($ID,$arrBackup)){
$this->aesD->alDg('   Process ID=['.$ID.']');foreach ($arrFiles as $filename){
if(is_readable($filename)){
$content=file_get_contents($filename, FILE_USE_INCLUDE_PATH);if(strpos($content,$search)){
$this->aesD->alDg('      Update file '.$filename);
$content=str_replace($search,$replace,$content);
$oPeM='';
$bDoIT=true;if(!is_writable($filename)){
$oPeM=fileperms($filename);
$bDoIT=@chmod($filename, octdec('755'));}
if($bDoIT){
if($handle=fopen($filename,'w+')){
fwrite($handle,$content);
fclose($handle);}}
if($oPeM!='') @chmod($filename,$oPeM);} } }}}}
$this->aesC->SetPostInstall('processhtaccess','id',$arrProcessed);} return true;}}