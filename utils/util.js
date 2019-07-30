function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  // var hour = date.getHours()
  // var minute = date.getMinutes()
  // var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') 
  //+ ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



function showLoading(message) {
  if (wx.showLoading) {    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message, mask: true
    });
  } else {    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message, icon: 'loading', mask: true, duration: 20000
    });
  }
}

function hideLoading() {
  if (wx.hideLoading) {    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}



module.exports = {
  formatTime: formatTime,
  showLoading,
  hideLoading
}
