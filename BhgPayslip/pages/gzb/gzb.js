Page({
  data: {
    gzb: {},
    no: 0,
    pwd: ""
  },
  //后台取数
  onLoad: function(options) {
      //从dl页面传值过来
    this.setData({
      no: options.lno,
      pwd: options.lpwd
    })
    var _this = this
    wx.request({
      url: 'https://www.lzjhxcx.club/Query.ashx',
      data: {
        employee_no:this.data.no,
        pwd:this.data.pwd},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        
        console.log(res.data)
        var ja=JSON.parse(res.data)
        console.log(ja)
        
        _this.setData({
          gzb: ja
        })
        console.log(_this.data.gzb)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 用户点击右上角分享
  onShareAppMessage: function() {
    return {
      title: '查工资就用华联查',
      desc: '方便、快捷!',
    }
  }
})