// pages/my/my.js
const app = getApp()
Page({
  toDetail(){
    wx.redirectTo({
      url: '../my/myoffer/myoffer'
    })
  },
  toCon() {
    wx.redirectTo({
      url: '../my/concat/concat'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    user:{
      avatarUrl:"",
      nickName:""
    },
    state:{
      offer:"/images/myoffer.png",
      love: "/images/love.png",
      article: "/images/article.png",
      us: "/images/us.png",
      fupan:"/images/fupan.png"
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var iuser = getApp().globalData.userInfo;
    console.log(iuser)
    var nickName='user.nickName';
    var avatarUrl='user.avatarUrl';
    this.setData({
        [nickName]:iuser.nickName,
        [avatarUrl]:iuser.avatarUrl
    })
    console.log(iuser.nickName);
   var uid= wx.getStorageSync("userId");
    // wx.getStorage({
    //   key: 'userId',
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})