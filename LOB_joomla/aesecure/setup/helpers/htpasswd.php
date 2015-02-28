<?php
   // @file : /setup/helpers/htpasswd.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:49
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
class aeSecureHtPasswd{
var $aesD=null;var $aeSt=null;var $dir=null;var $tag=null;var $handle=null;var $htpwd='';var $htaccess='';
function __construct($dir,$tag){
require_once(dirname(dirname(dirname(__FILE__))).'/helpers/debug.php');$this->aesD = aecDb::getInstance();require_once (dirname(dirname(dirname(__FILE__))).'/helpers/settings.php');$this->aeSt = aecSt::getInstance();$this->dir=str_replace('/', DIRECTORY_SEPARATOR,rtrim($dir,'/').'/');$this->tag=$tag;$this->htpwd=$this->dir.'.htpasswd';$this->htaccess=$this->dir.'.htaccess';if(!is_dir($this->dir)||!is_writable($this->dir)){
$this->aesD->log('ERROR '.$this->dir.' is write protected, the .htpasswd file can\'t be created', array('type'=>'error','GroupTitle'=>__METHOD__));} else{
if(file_exists($this->htpwd)){
$this->handle = fopen($this->htpwd,'r+');} else{
$this->handle = fopen($this->htpwd,'w');}} return true;}  function __destruct(){
unset ($this->aesD);
unset ($this->aeSt);}
private function makePassword($password){
return crypt($password, base64_encode($password));}
private function edithtAccess(){
$tmp=(file_exists($this->htaccess)?file_get_contents($this->htaccess, FILE_USE_INCLUDE_PATH):'');
$block=aecFt::isTRls($tmp, '#'.$this->tag);
$tmp=str_replace($block,'',$tmp);
$tmp=rtrim($tmp,PHP_EOL).PHP_EOL.'#'.$this->tag.'_START'.PHP_EOL.'#aeSecure 2.2'.PHP_EOL;
$tmp.='# Allow access to these files'.PHP_EOL.
'<FilesMatch "\.(css|js|png|eot|svg|ttf|woff2?)$">'.PHP_EOL.
'Satisfy Any'.PHP_EOL.
'Allow from all'.PHP_EOL.
'</FilesMatch>'.PHP_EOL;
$tmp.='AuthType Basic'.PHP_EOL;
$tmp.='AuthName "Restricted Area"'.PHP_EOL;
$tmp.='AuthUserFile '.$this->htpwd.PHP_EOL;
$tmp.='AuthGroupFile /dev/null '.PHP_EOL;
$tmp.='Require valid-user'.PHP_EOL;if(strpos($this->htpwd, 'aesecure')>0){
$tmp.='SetEnvIf Request_URI ".*/aesecure/accessdenied\.php" allow'.PHP_EOL;
$tmp.='SetEnvIf Request_URI ".*/aesecure/json\.php" allow'.PHP_EOL;
$tmp.='Order allow,deny'.PHP_EOL;
$tmp.='Allow from env=allow'.PHP_EOL;
$tmp.='Satisfy any'.PHP_EOL;}
if(aecFt::iWpte($this->aeSt->siOt())===true){
$tmp.='#WordPress admin-ajax.php needs to be accessible without requesting credentials'.PHP_EOL;
$tmp.='<Files admin-ajax.php>'.PHP_EOL;
$tmp.='Order allow,deny'.PHP_EOL;
$tmp.='Allow from all'.PHP_EOL;
$tmp.='Satisfy any'.PHP_EOL;
$tmp.='</Files>';}
$tmp.='#'.$this->tag.'_END';
aecFt::MFL($tmp,$this->htaccess,$tmp);
return true;}
private function UserExists($username){
if(!file_exists($this->htpwd)) return false;if($this->handle!=null){
rewind($this->handle);
$arr=explode(":",$line = rtrim(fgets($this->handle)));
while(!feof($this->handle)&&trim($lusername = array_shift($arr))){
if($lusername == $username) return true;}} return false;} public function AddUser($username,$password,$force=false){
$return=false;if(self::UserExists($username)){
if($force==true) $return=self::UpdateUser($username,$password);} else{
if($this->handle!=null){
fseek($this->handle,0,SEEK_END);
fwrite($this->handle,$username.':'.self::makePassword($password)."\n");self::edithtAccess();$return=true;}} return $return;} public function UpdateUser($username,$password){
rewind($this->handle);
while(!feof($this->handle)){
$arr = explode(":",rtrim(fgets($this->handle)));
$lusername = trim(array_shift($arr));if($lusername<>''){
if($lusername == $username){
fseek($this->handle,(-15 - strlen($username)),SEEK_CUR);
fwrite($this->handle,$username.':'.self::makePassword($password)."\n");self::edithtAccess();
return true;} }} return false;} public function UserDelete($username){
$data = '';
rewind($this->handle);
while(!feof($this->handle)&&trim($lusername = array_shift(explode(":",$line = rtrim(fgets($this->fp)))))){
if(!trim($line)) break;if($lusername != $username) $data .= $line."\n";}
$this->handle = fopen($this->htpwd,'w');
fwrite($this->handle,rtrim($data).(trim($data)?"\n":''));
fclose($this->handle);$this->handle = fopen($this->htpwd,'r+');
return true;}}