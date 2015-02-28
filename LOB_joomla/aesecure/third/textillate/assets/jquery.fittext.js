// @file : /third/textillate/assets/jquery.fittext.js
// @version : 2.0.2
// @author : AVONTURE Christophe - christophe@aesecure.com
// @copyright : (C) 2013-2015 - Christophe Avonture - all right reserved.
// @url : http://www.aesecure.com/
// @package : 2015-02-06 23:01:52
// @license : This program is a commercial software.  You CAN'T redistribute it and/or modify it.
// Source code is the property of Christophe Avonture and can't be reused, in whole or in part, in any programs.
!function(t){t.fn.fitText=function(e,i){var n=e||1,s=t.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},i);return this.each(function(){var e=t(this),i=function(){e.css("font-size",Math.max(Math.min(e.width()/(10*n),parseFloat(s.maxFontSize)),parseFloat(s.minFontSize)))};i(),t(window).on("resize",i)})}}(jQuery);