// pages/my/myoffer/myoffer.js
var time = require('../../../utils/util.js');
Page({
  toMy(){
    wx.switchTab({ url: '../my' }) 
  },
  /**
   * 页面的初始数据
   */
  data: {
    offerList: [],
    baseUrl: "https://www.myoffer.work/offer/",
    flag:false,
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

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        type:0
      },

      success: function (res) {
        console.log(res.data);
        if (res.data.code == 100) {     
          var datas = res.data.body;
          console.log(datas)
          var ddd = [];
          for(var i=0;i<datas.length;i++){
              if (datas[i].jobState==7) {
                var itemList = {};
                itemList.stateFlag = that.data.states[7].index
                itemList.jobState = that.data.states[7].name
                console.log(itemList.jobState)
                  itemList.companyName = datas[i].companyName;
                  itemList.jobName = datas[i].jobName;
                  itemList.date = time.formatTime(new Date(parseInt(datas[i].deadLine)));
                ddd.push(itemList)
              }
          
          }
        }
        if(ddd.length){
          that.setData({
            offerList: ddd,
            flag:true
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