//index.js
//获取应用实例
var app = getApp()
Page( {
 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '13108124896',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '工商代办、记账审计',
      desc: '专业、快捷、高效!',
    }
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})