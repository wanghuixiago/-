var time = require('../../../utils/util.js');
Page({
  toOffer() {
    wx.switchTab({
      url: '../offer'
    })
  },
  toModify() {
    var that = this;

    var offerId = parseInt(that.data.offerId)

    console.log(offerId),
      wx.redirectTo({
        url: '../modify/modify?id=' + offerId
      })
  },
  toDelete() {
    var that = this;
    var offerId = {
      id: parseInt(that.data.offerId)
    }
    console.log(offerId),
      wx.request({
        url: this.data.baseUrl + "offer/deleteOffer",
        method: "POST",
        header: {
          "content-Type": "application/json"
        },
        data: offerId,
        success: function(res) {
          console.log(res.data);
          if (res.data.code == 100) {
            console.log("已删除")
            wx.switchTab({
              url: '../offer'
            })
          }
        },
        fail: function(error) {
          console.log(error)
        }
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    offerId: "",
    baseUrl: "https://www.myoffer.work/offer/",
    companyName: "",
    deadLine: "",
    jobName: "",
    jobState: "",
    location: "",
    states: [{
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

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {
          for (var j = 0; j < that.data.states.length; j++) {
            if (res.data.body.jobState == parseInt(that.data.states[j].index)) {
              that.setData({
                jobState: that.data.states[j].name

              })
            }
          }
          that.setData({
            companyName: res.data.body.companyName,
            deadLine: time.formatTime(new Date(parseInt(res.data.body.deadLine))),
            jobName: res.data.body.jobName,
            location: res.data.body.location,
            offerId: res.data.body.id
          })

        }
      },
      fail: function(error) {
        console.log(error)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})