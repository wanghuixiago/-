// pages/offer/offer.js
var time = require('../../utils/util.js');
Page({
  toOfferDetail(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.redirectTo({
      url: '../offer/offlist/offlist?id=' + postId
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    state: {
      select: "/images/select.png",
      sort: "/images/sort.png",
      add: "/images/add.png"
    },
    des: {
      status0: "/iamges/offerState/status0.png"
    },
    hasMore: true,
    levelFlag: false,
    filterFlag: false,
    offerList: [],
    baseUrl: "https://www.myoffer.work/offer/",
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
 
  toCreate() {
    wx.redirectTo({
      url: '../offer/create/create'
    })
  },
  toSort() {
    this.setData({
      levelFlag: !this.data.levelFlag,
    })
  },
  toFilter() {
    this.setData({
      filterFlag: !this.data.filterFlag,
    })
  },
  levelSort() {
    console.log("youxianxji ")
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "/offer/loadOfferByLevel",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 0
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {
          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            var itemList = {};
            itemList.companyName = datas[i].companyName;
            itemList.jobName = datas[i].jobName;
            itemList.post_id = datas[i].id;

            itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
            for (var j = 0; j < that.data.states.length; j++) {
              if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                itemList.stateFlag = that.data.states[j].index
                itemList.jobState = that.data.states[j].name
                console.log(itemList.jobState)
              }
            }
            ddd.push(itemList)
          }
          console.log(ddd)
          that.setData({
            offerList: ddd
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  dateSort() {
    console.log("shijian ")
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "/offer/loadOfferByLevel",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 1
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {

          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            var itemList = {};
            itemList.companyName = datas[i].companyName;
            itemList.jobName = datas[i].jobName;
            itemList.post_id = datas[i].id;
            itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
            for (var j = 0; j < that.data.states.length; j++) {
              if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                itemList.stateFlag = that.data.states[j].index
                itemList.jobState = that.data.states[j].name
                console.log(itemList.jobState)
              }
            }
            ddd.push(itemList)
          }
          console.log(ddd)
          that.setData({
            offerList: ddd
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  pro1() {
    console.log("未投递")
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "/offer/loadOfferByLevel",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 1
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {

          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            if (datas[i].jobState == 0) {
              var itemList = {};
              itemList.companyName = datas[i].companyName;
              itemList.jobName = datas[i].jobName;
              itemList.post_id = datas[i].id;
              itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
              for (var j = 0; j < that.data.states.length; j++) {
                if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                  itemList.stateFlag = that.data.states[j].index
                  itemList.jobState = that.data.states[j].name
                  console.log(itemList.jobState)
                }
              }
              ddd.push(itemList)
            }
          }
          console.log(ddd)
          that.setData({
            offerList: ddd
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  pro2() {
    console.log("流程中");
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "/offer/loadOfferByLevel",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 1
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {

          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            if (datas[i].jobState !== 0 && datas[i].jobState !== 7) {
              var itemList = {};
              itemList.companyName = datas[i].companyName;
              itemList.jobName = datas[i].jobName;
              itemList.post_id = datas[i].id;
              itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
              for (var j = 0; j < that.data.states.length; j++) {
                if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                  itemList.stateFlag = that.data.states[j].index
                  itemList.jobState = that.data.states[j].name
                  console.log(itemList.jobState)
                }
              }
              ddd.push(itemList)
            }
          }
          console.log(ddd)
          that.setData({
            offerList: ddd
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  pro3() {
    console.log("已结束");
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "/offer/loadOfferByLevel",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 1
      },

      success: function(res) {
        console.log(res.data);
        if (res.data.code == 100) {

          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            if (datas[i].jobState == 7) {
              var itemList = {};
              itemList.companyName = datas[i].companyName;
              itemList.jobName = datas[i].jobName;
              itemList.post_id = datas[i].id;
              itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
              for (var j = 0; j < that.data.states.length; j++) {
                if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                  itemList.stateFlag = that.data.states[j].index
                  itemList.jobState = that.data.states[j].name
                  console.log(itemList.jobState)
                }
              }
              ddd.push(itemList)
            }
          }
          console.log(ddd)
          that.setData({
            offerList: ddd
          })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!this.data.hasMore) return;
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "offer/loadOffer",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 0
      },

      success: function(res) {
        if (res.data.code == 100) {
          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            var itemList = {};
            itemList.companyName = datas[i].companyName;
            itemList.jobName = datas[i].jobName;
            itemList.post_id = datas[i].id;
            itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
            for (var j = 0; j < that.data.states.length; j++) {
              if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                itemList.stateFlag = that.data.states[j].index
                itemList.jobState = that.data.states[j].name
              }
            }
            ddd.push(itemList)
          }
          that.setData({
            offerList: ddd,
            hasMore: false
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
    console.log('--------下拉刷新-------')
    var uid = wx.getStorageSync("userId");
    var that = this;
    wx.request({
      url: this.data.baseUrl + "offer/loadOffer",
      method: "POST",
      header: {
        "content-Type": "application/json"
      },
      data: {
        userId: uid,
        type: 0
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 100) {
          var datas = res.data.body;
          var ddd = [];
          for (var i = 0; i < datas.length; i++) {
            var itemList = {};
            itemList.companyName = datas[i].companyName;
            itemList.jobName = datas[i].jobName;
            itemList.post_id = datas[i].id;
            itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
            for (var j = 0; j < that.data.states.length; j++) {
              if (datas[i].jobState == parseInt(that.data.states[j].index)) {
                itemList.stateFlag = that.data.states[j].index
                itemList.jobState = that.data.states[j].name
              }
            }
            ddd.push(itemList)
          }
          that.setData({
            offerList: ddd,
            hasMore: false
          })
          wx.stopPullDownRefresh()
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })

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