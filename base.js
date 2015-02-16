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


/**
 * 不该都写在(function)()里面啊
 * 我随便取了一个名字叫Alice
 * 实例化Alice,然后在是我们写的东西
 */
var Alice = function(){

  var self = this;



  /******** 判断浏览器点击事件 开始 ********/
  this.browerEvents = checkBrowerEventsFcn();
  function checkBrowerEventsFcn(){
    var WINDOW = window,
        hasTouch = 'ontouchstart' in WINDOW || window.DocumentTouch,
        END_EV = hasTouch ? 'touchend' : 'mouseup';
    return END_EV;
  }
  /******** 判断浏览器点击事件 结束 ********/




  /******** 分享模块 开始 ********/

  this.setMobileShareInfo = function(options){
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

  this.androidRun = function(){
    /**
     * @note
     * 这里是给Android调用
     */
    window.jsObj.getInfo(self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent);
  }

  this.mobileShareRun = function(){
    if (this.browserIsIosOrAndroid.bIsAndroid()) {
      $(self.sCodoonDom).on(checkBrowerEventsFcn(),function(){
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
    } else if(this.browserIsIosOrAndroid.bIsIphoneOs()) {
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
        $(self.sCodoonDom).on(checkBrowerEventsFcn(),function(){
          bridge.callHandler('codoon_share', [self.sCodoonOpenTopBtn,self.sCodoonShareTitle,self.sCodoonShareLineLink,self.sCodoonShareImgUrl,self.sCodoonShareDescContent], function(response) {
          });
        });
      }
    } else {
      $(self.sCodoonDom).on(checkBrowerEventsFcn(),function(){
        showUpgrade();
      });
    }
  }
  /******** 分享模块 结束 ********/




  /******** 判断浏览器 开始 ********/
  var sUserAgent = navigator.userAgent.toLowerCase();
  this.browserIsIosOrAndroid = {
    bIsIphoneOs:function(){
      return function(){sUserAgent.match(/iphone os/i) == "iphone os"};
    },
    bIsAndroid:function(){
      return sUserAgent.match(/android/i) == "android";
    }
  }
  /******** 判断浏览器 结束 ********/
}



/******** 关于分享还没想到好的版本处理的地方 开始 ********/
function CodoonGetInfo (){
  var alice = new Alice();
  alice.mobileShareRun();
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