# base.js
定义一些基础的js功能。作为新项目的起点。

### 手机分享功能

这里定义了手机分享功能
``` javascript
Alice.mobileShare.setMobileShareInfo({({
	sCodoonShareImgUrl:"xxx.jpg",
	sCodoonShareLineLink:"http://www.baidu.com",
    sCodoonShareDescContent:"这个是content",
    sCodoonShareTitle:"这个是title",
    sCodoonDom:"#btn",
    sCodoonOpenTopBtn:"1"
})
Alice.mobileShare.mobileShareRun();
```
参数说明
`sCodoonShareImgUrl`:分享的图片链接
`sCodoonShareLineLink`:分享出去的地址
`sCodoonShareDescContent`:分享出去的内容。
> **注意：**
分享到新浪微博，这个就是正文。分享到朋友圈，这个就没用。分享给微信朋友，这个就是内容。

`sCodoonShareTitle`：分享出去的标题。
> **注意：**
分享到朋友圈，这个就是分享出去的摘要。分享到微博，这个就没用。分享给朋友，这个就是标题。

`sCodoonDom`:分享按钮DOM。
`sCodoonOpenTopBtn`:手机顶部默认分享开关。0：关闭；1：开启

### 浏览器判断
``` javascript
Alice.isIos
Alice.isAndroid
```

### 浏览器事件判断
``` javascript
Alice.browerEvents
```