// pages/offer/create/create.js
var model = require('../../../utils/util.js');

Page({
 
  bindPickerChange(e){
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

  bindDateChange(e){
    this.setData({
     date: e.detail.value
    })
  },
  //一张图上传、点击预览、长按保存
  // //点击图片 预览大图
  // seeBigImg(e){
  //   this.setData({
  //     imageNotChoosed: false,
  //   })
  //   wx.previewImage({
  //   //  current: this.data.tempFilePaths[0], // 当前显示图片的http链接
  //     urls: this.data.tempFilePaths // 需要预览的图片http链接列表
  //   })
  // },
 
  // bindImg(){
  //   var that=this;
  //   that.setData({
  //   imageNotChoosed: true
  //   })
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //     //  // tempFilePath可以作为img标签的src属性显示图片
        
  //       const tempFilePaths = res.tempFilePaths;
  //       that.setData({
  //         tempFilePaths: tempFilePaths,
  //         isAdd:false  
  //       })
  //     //   var list = that.data.wxchatLists;
  //     //   var temp = {
  //     //     dataTime: utils.formatTime(new Date()),
  //     //  //   userImgSrc: '../../image/chat/extra/close_chat.png',
  //     //     sendImgSrc: tempFilePath,
  //     //     msg_type: 'img',
  //     //     type: 1
  //     //   };
  //     //   list.push(temp);
  //     //   that.setData({
  //     //     wxchatLists: list,
  //     //   })
      
      
  //     }
  //   })
  // },
  //多张图上传
  bindImg() {
    var self = this
    wx.chooseImage({
      count: 3,
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
       var newtempFilePaths = [];
       console.log(res)
        const tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < res.tempFilePaths.length;i++){
         var obj={}
         obj.key=i;
         obj.value = (res.tempFilePaths[i]);
         newtempFilePaths.push(obj)
         console.log(newtempFilePaths)
       }
       console.log( newtempFilePaths)
        self.setData({
          imgSrcs: newtempFilePaths,
          isAdd:false,
          tempFilePaths: tempFilePaths
        })
      
      },
      fail: function (res) {
       console.log(res)
      }
    })
  },
  seeBigImg(e) {
    this.setData({
     imageNotChoosed: false,
     })
    wx.previewImage({
    
      current: this.data.imgSrcs[e.target.dataset.index].value,
      //imgSrcs[e.target.dataset.index], // 当前显示图片的http链接
      urls: this.data.tempFilePaths  // 需要预览的图片http链接列表
     })
   },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 页面的初始数据
   */
  data: {
    subdata: {
      companyName: "",
      jobname: "",
      level: "0",
      jobState: "未投递",
     deadLine: "2018-01-01"
    },
    baseUrl:"https://www.myoffer.work/offer/",
    isSubmit:false,
    cur:0,
    cur1:0,
    warn: "",
    date:"2019-01-01",
    mode:'scaleToFill',
    tempFilePaths:"",
    imgSrcs:[
      {}
    ],
    loadingHidden: true,
    isAdd:true,
    items: [
      { name: 0,color:"orange",checked: 'true'},
      { name: 1, color: "green", value: '' },
      { name: 2, color: "blue", value: '' },
      { name: 3, color: "red", value: '' },
    ],
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
      
      ],
    arrayType: [{
     type: 0,
      name: '技术类'
    },
    {
      type: 1,
      name: '非技术类'
    }
    ],
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var uid = wx.getStorageSync("userId");
    let {companyName, jobType, jobName, level, jobState ,deadLine,location} = e.detail.value;
    var offerData={
      userId:uid,
      companyName, 
      jobName,
      jobType, 
      level: parseInt(level), 
      jobState, 
      deadLine: new Date(deadLine).getTime().toString() ,
      location
    }
    console.log(offerData)
    if (!companyName || !jobName) {
      this.setData({
        warn: "公司名称或岗位名称不能为空！",
        isSubmit: true
      })
      return;
    } else if (!location) {
      this.setData({
        warn: "面试地点不能为空！",
        isSubmit: true
      })
      return;
     
    } else{
      model.showLoading('加载中...');
      wx.request({
        url: this.data.baseUrl + "offer/saveOffer",
        method: "POST",
        header: {
          "content-Type": "application/json"
        },
        data: offerData,
        success: function (res) {
          model.hideLoading()
          console.log(res.data);
          if(res.data.code==100){
            wx.switchTab({ url: '../offer' }) 
          }
        },
        fail: function (error) {
          console.log(error)
        }
      })
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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