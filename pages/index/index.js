//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    code:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onGotUserInfo(e) {
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       console.log(res.code)
  //       console.log(e.detail)
  //       var postData = {
  //         code: res.code,
  //         encrypteData: e.detail.encryptedData,
  //         iv: e.detail.iv
  //       };
  //       console.log(postData)
    //     wx.request({
    //       url: "https://www.myoffer.work/offer/user/doLogin",
    //       method: "post",
    //       header: {
    //         "content-Type": "application/json"
    //       },
    //       data: postData,
    //       success: function (res) {
    //         console.log(res)
    //         if (res.data.code == 100) {
    //           console.log(res.data.body.userId);
    //           wx.setStorage({
    //             key: 'userId',
    //             data: res.data.body.userId
    //           })
    //           wx.switchTab({
    //             url: '../my/my',
    //           })
        //     }
        //   },
        //   fail: function (error) {
        //     console.log(error)
        //   }
  //       // })  
  //     }
  //   })
   
  
  // },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
      }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
 // },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
 })
