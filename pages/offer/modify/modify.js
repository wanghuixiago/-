// pages/offer/modify/modify.js
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  bindPickerChange(e) {
    console.log(e);
    this.setData({
      cur: e.detail.value
    })
  },
  bindTypeChange(e) {
    console.log(e);
    this.setData({
      cur1: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  data: {
    baseUrl: "https://www.myoffer.work/offer/",
    date: "",
    cur: 0,
    offerId:"",
    companyName: "",
    jobName: "",
    location:"",
    jobType:"",
    level: "",
   array: [{
            index: 0,
            name: '未投递'
          },
          {
            index: 1,
            name: '笔试'
          },
          {
            index: 2,
            name: '群面'
          },
          {
            index: 3,
            name: '一面'
          },
          {
            index: 4,
            name: '二面'
          },
          {
            index: 5,
            name: 'hr面'
          },
          {
            index: 6,
            name: 'plus面'
          },
          {
            index: 7,
            name: '获得offer'
          }
          ]
  },
  toOffer() {
    var uid = wx.getStorageSync("userId");
    var offerData = {
      userId: uid,
      id:this.data.offerId,
      companyName:this.data.companyName,
      jobName:this.data.jobName,
      jobType:this.data.jobType,
      level: this.data.level,
      jobState:parseInt(this.data.cur),
      deadLine: new Date(this.data.date).getTime().toString(),
      location:this.data.location
    }
    console.log(offerData)
    wx.request({
      url: this.data.baseUrl + "/offer/updateOffer",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: offerData,
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 100) {
          console.log("修改成功")
          wx.switchTab({ url: '../offer' })
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
  
    this.setData({
      offerId: options.id
    })
    var offerId = {
      id: parseInt(this.data.offerId)
    }
    this.setData({
      offerId: options.id
    })
    var that = this;
    var offerId = {
      id: parseInt(that.data.offerId)
    }
    wx.request({
      url: that.data.baseUrl + "offer/getOfferDetails",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: offerId,
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 100) {
         
          that.setData({
            companyName: res.data.body.companyName,
          date: time.formatTime(new Date(parseInt(res.data.body.deadLine))),
            jobName: res.data.body.jobName,
            location: res.data.body.location,
            offerId: res.data.body.id,
            cur:res.data.body.jobState,
            jobType:res.data.body.jobType,
            level:res.data.body.level,
            
          })

        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
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