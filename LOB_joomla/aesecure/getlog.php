<?php
   // @file : /getlog.php
   // @version : 2.0.2
   // @author : AVONTURE Christophe - christophe@aesecure.com
   // @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
   // @url : http://www.aesecure.com/
   // @package : 2015-02-06 23:01:46
   // @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
   // Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
?>
<?php
if(!defined('_AESECURE')) define('_AESECURE',1);require_once ('helpers/aesecure.php');
$aeSecure =new aeSecure();
$aeSecure->gadDlg();
unset($aeSecure);