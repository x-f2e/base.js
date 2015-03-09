/**
 * 开始开发base.js，采用自执行函数来避免污染全局空间
 *
 */

(function(){
  // mp 开发浏览器兼容模块

  /******** 兼容模块 开始 ********/

  // indexOf for IE8
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0; // 把length转换为无符号数
      var from = Number(arguments[1]) || 0;

      // 处理from为小数和负数的情况
      from = (from < 0)
        ? Math.ceil(from)
        : Math.floor(from);
      if (from < 0) {
        from += len;
      }

      for (; from < len; from++)
      {
        if (from in this &&
          this[from] === elt) {
          return from;
        }
      }
      return -1;
    };
  }

  // JSON for IE8
  if(!(window.JSON && window.JSON.parse))
  {
    (function() {
      function g(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
      else if("function"==b&&"undefined"==typeof a.call)return"object";return b};function h(a){a=""+a;if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function i(a,b){var c=[];j(new k(b),a,c);return c.join("")}function k(a){this.a=a}
      function j(a,b,c){switch(typeof b){case "string":l(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if("array"==g(b)){var f=b.length;c.push("[");for(var d="",e=0;e<f;e++)c.push(d),d=b[e],j(a,a.a?a.a.call(b,""+e,d):d,c),d=",";c.push("]");break}c.push("{");f="";for(e in b)Object.prototype.hasOwnProperty.call(b,e)&&(d=b[e],"function"!=typeof d&&(c.push(f),l(e,c),c.push(":"),
        j(a,a.a?a.a.call(b,e,d):d,c),f=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var m={'"':'\\"',"\\":"\\\\","/":"\\/","\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},n=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
      function l(a,b){b.push('"',a.replace(n,function(a){if(a in m)return m[a];var b=a.charCodeAt(0),d="\\u";16>b?d+="000":256>b?d+="00":4096>b&&(d+="0");return m[a]=d+b.toString(16)}),'"')};window.JSON||(window.JSON={});"function"!==typeof window.JSON.stringify&&(window.JSON.stringify=i);"function"!==typeof window.JSON.parse&&(window.JSON.parse=h);
    })();
  }




  /******** 兼容模块 结束 ********/
})();

var Alice = (function(){

  var self = this;


  /******** 判断浏览器 开始 ********/
  var sUserAgent = navigator.userAgent.toLowerCase(),
      browserIsIosOrAndroid = {},
      isIos,
      isAndroid;
  browserIsIosOrAndroid.bIsIphoneOs = function(){
    return sUserAgent.match(/iphone os/i) == "iphone os";
  }
  browserIsIosOrAndroid.bIsAndroid = function(){
    return function(){sUserAgent.match(/android/i) == "android"};
  }
  isIos = browserIsIosOrAndroid.bIsIphoneOs();
  isAndroid = browserIsIosOrAndroid.bIsAndroid();
  /******** 判断浏览器 结束 ********/


  /******** 判断浏览器点击事件 开始 ********/
  var browerEvents = checkBrowerEventsFcn();
  function checkBrowerEventsFcn(){
    var WINDOW = window,
        hasTouch = 'ontouchstart' in WINDOW || window.DocumentTouch,
        END_EV = hasTouch ? 'touchend' : 'mouseup';
    return END_EV;
  }
  /******** 判断浏览器点击事件 结束 ********/


  /******** 分享模块 开始 ********/
  var mobileShare = {};

  mobileShare.setMobileShareInfo = function(options){
    /**
     * 分享内容设置
     * [string] sCodoonShareImgUrl : 分享的图片
     * [string] sCodoonShareLineLink : 分享的URL链接
     * [string] sCodoonShareDescContent : 分享的内容
     * [string] sCodoonShareTitle : 分享的标题
     * [string] sCodoonDom : 点击触发的DOM节点
     * [string] sCodoonOpenTopBtn : 是否开启顶部标题的分享按钮
     */
    if(options == undefined) {
      return console.log("need params!!");
    }
    self.sCodoonShareImgUrl      = options.sCodoonShareImgUrl||"";
    self.sCodoonShareLineLink    = options.sCodoonShareLineLink||"";
    self.sCodoonShareDescContent = options.sCodoonShareDescContent||"";
    self.sCodoonShareTitle       = options.sCodoonShareTitle||"";
    self.sCodoonDom              = options.sCodoonDom||"";
    self.sCodoonOpenTopBtn       = options.sCodoonOpenTopBtn||"";
  }

  mobileShare.androidRun = function(){
    /**
     * @note
     * 这里是给Android调用
     */
    window.jsObj.getInfo(self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent);
  }

  mobileShare.mobileShareRun = function(){
    if (isAndroid) {
      $(self.sCodoonDom).on(browerEvents,function(){
        if(typeof window.jsObj == 'undefined'){
          showUpgrade();
          return false;
        }
        if(typeof window.jsObj.getInfo == 'undefined'){
          showUpgrade();
          return false;
        }
        window.jsObj.getInfo(self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent);//调用android 中的getInfo方法。
      });
      if(typeof window.jsObj != 'undefined'){
        if(typeof window.jsObj.set_codoon_share != 'undefined'){
          window.jsObj.set_codoon_share(self.sCodoonOpenTopBtn,self.sCodoonShareImgUrl);
        }
      }
    } else if(isIos) {
      if (window.WebViewJavascriptBridge) {
        isoBridge(WebViewJavascriptBridge);
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          isoBridge(WebViewJavascriptBridge);
        }, false);
      }
      function isoBridge(bridge){
        bridge.init(function(message, responseCallback) {
        });
        bridge.callHandler('set_codoon_share', [self.sCodoonOpenTopBtn,self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent], function(response) {
        });
        $(self.sCodoonDom).on(browerEvents,function(){
          bridge.callHandler('codoon_share', [self.sCodoonOpenTopBtn,self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent], function(response) {
          });
        });
      }
    } else {
      $(self.sCodoonDom).on(browerEvents,function(){
        showUpgrade();
      });
    }
  }

  /******** 分享模块 结束 ********/


  /******** AJAX模板 开始 ********/

  var ajaxGet = function(url,data,callback,dataType,error,timeout) {
    ajax("GET",url,data,callback,dataType,error,timeout);
  }

  var ajaxPost = function(url,data,callback,dataType,error,timeout) {
    ajax("POST",url,data,callback,dataType,error,timeout);
  }

  /**
   * AJAX封装到的jquery&&zepto的AJAX方法
   * [string] url
   * [array] data
   * [function] callback
   * [string] dataType
   * [function] error
   * [string] timeout
   */
  function ajax(type,url,data,callback,dataType,error,timeout) {
    var parms = {
        url : url,
        data : data,
        success : callback || function(){console.log("miss callback")},
        dataType : dataType || "json",
        timeout : timeout || 10000,
        error : error || function(){},
        type : type || "GET"
    }

    $.ajax(parms);
  }

  /******** AJAX模板 结束 ********/

  return {
    mobileShare   : mobileShare,
    browerEvents  : browerEvents,
    isIos         : isIos,
    isAndroid     : isAndroid,
    ajaxGet       : ajaxGet,
    ajaxPost      : ajaxPost
  }

})();

/******** 支持AMD 开始 ********/
if ( typeof define === "function" && define.amd ) {
  define(["base"], function() {
    return Alice;
  });
}
/******** 支持AMD 结束 ********/


/******** 关于分享还没想到好的版本处理的地方 开始 ********/
function CodoonGetInfo (){
  Alice.mobileShare.mobileShareRun();
}
/***
 * @note
 * 当默认显示分享的时候
 * 操作已经在手机上，手机调用本地JS方法来提示用户升级
 * 这里其实应该在手机上判断，然后手机弹手机的提示框
 * 手机在提供我们调用手机提示框的方法
 * 这样我们就可以把提示框的样式保持一致了
 */
window.showUpgrade = function () {
  alert("你的软件版本太低，请升级");
}
/******** 关于分享还没想到好的版本处理的地方 结束 ********/
