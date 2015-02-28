/**
 * 开始开发base.js，采用自执行函数来避免污染全局空间
 *
 */

(function(){
  // mp 开发浏览器兼容模板

  /******** 兼容模板 开始 ********/

  // indexOf for IE8

  /******** 兼容模板 结束 ********/


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