<?php
   // @file : /helpers/third/aesctr.php
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
class AesCtr extends Aes{
public static function encrypt($plaintext,$password,$nBits){
$blockSize = 16;  if(!($nBits==128||$nBits==192||$nBits==256)) return '';
$nBytes = $nBits/8;  $pwBytes = array();
for ($i=0; $i<$nBytes; $i++) $pwBytes[$i] = ord(substr($password,$i,1)) & 0xff;
$key = Aes::cipher($pwBytes, Aes::keyExpansion($pwBytes));
$key = array_merge($key, array_slice($key, 0,$nBytes-16));
$counterBlock = array();
$nonce = floor(microtime(true)*1000);  $nonceMs = $nonce%1000;
$nonceSec = floor($nonce/1000);
$nonceRnd = floor(rand(0, 0xffff));
for ($i=0; $i<2; $i++) $counterBlock[$i] = self::urs($nonceMs,$i*8) & 0xff;
for ($i=0; $i<2; $i++) $counterBlock[$i+2] = self::urs($nonceRnd,$i*8) & 0xff;
for ($i=0; $i<4; $i++) $counterBlock[$i+4] = self::urs($nonceSec,$i*8) & 0xff;
$ctrTxt = '';
for ($i=0; $i<8; $i++) $ctrTxt .= chr($counterBlock[$i]);
$keySchedule = Aes::keyExpansion($key);
$blockCount = ceil(strlen($plaintext)/$blockSize);
$ciphertxt = array();
for ($b=0; $b<$blockCount; $b++){
for ($c=0; $c<4; $c++) $counterBlock[15-$c] = self::urs($b,$c*8) & 0xff;
for ($c=0; $c<4; $c++) $counterBlock[15-$c-4] = self::urs($b/0x100000000,$c*8);
$cipherCntr = Aes::cipher($counterBlock,$keySchedule);
$blockLength = $b<$blockCount-1?$blockSize:(strlen($plaintext)-1)%$blockSize+1;
$cipherByte = array();
for ($i=0; $i<$blockLength; $i++){ $cipherByte[$i] = $cipherCntr[$i] ^ ord(substr($plaintext,$b*$blockSize+$i, 1));
$cipherByte[$i] = chr($cipherByte[$i]);}
$ciphertxt[$b] = implode('',$cipherByte); }
$ciphertext = $ctrTxt.implode('',$ciphertxt);
$ciphertext = base64_encode($ciphertext);
return $ciphertext;} public static function decrypt($ciphertext,$password,$nBits){
$blockSize = 16;  if(!($nBits==128||$nBits==192||$nBits==256)) return '';  $ciphertext = base64_decode($ciphertext);
$nBytes = $nBits/8;  $pwBytes = array();
for ($i=0; $i<$nBytes; $i++) $pwBytes[$i] = ord(substr($password,$i,1)) & 0xff;
$key = Aes::cipher($pwBytes, Aes::keyExpansion($pwBytes));
$key = array_merge($key, array_slice($key, 0,$nBytes-16));
$counterBlock = array();
$ctrTxt = substr($ciphertext, 0, 8);
for ($i=0; $i<8; $i++) $counterBlock[$i] = ord(substr($ctrTxt,$i,1));
$keySchedule = Aes::keyExpansion($key);
$nBlocks = ceil((strlen($ciphertext)-8) / $blockSize);
$ct = array();
for ($b=0; $b<$nBlocks; $b++) $ct[$b] = substr($ciphertext, 8+$b*$blockSize, 16);
$ciphertext = $ct;
$plaintxt = array();
for ($b=0; $b<$nBlocks; $b++){
for ($c=0; $c<4; $c++) $counterBlock[15-$c] = self::urs($b,$c*8) & 0xff;
for ($c=0; $c<4; $c++) $counterBlock[15-$c-4] = self::urs(($b+1)/0x100000000-1,$c*8) & 0xff;
$cipherCntr = Aes::cipher($counterBlock,$keySchedule);
$plaintxtByte = array();
for ($i=0; $i<strlen($ciphertext[$b]); $i++){
$plaintxtByte[$i] = $cipherCntr[$i] ^ ord(substr($ciphertext[$b],$i,1));
$plaintxtByte[$i] = chr($plaintxtByte[$i]);}
$plaintxt[$b] = implode('',$plaintxtByte);}
$plaintext = implode('',$plaintxt);
return $plaintext;}
private static function urs($a,$b){
$a &= 0xffffffff; $b &= 0x1f;  if($a&0x80000000&&$b>0){ $a = ($a>>1) & 0x7fffffff;  $a = $a >> ($b-1); } else{ $a = ($a>>$b); } return $a;}}