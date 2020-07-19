Page({
  data: {
    gzb: {},
    no: 0,
    pwd: ""
  },
// 从云数据库取数
  // onLoad: function(options) {
  //   //从dl页面传值过来
  //   this.setData({
  //     no: options.lno,
  //     pwd: options.lpwd
  //   })
  //   //GZB查询信息并返回结果赋值给当前页面的gzb
  //   wx.cloud.callFunction({
  //       name: 'getGzb',
  //       data: {
  //         no: this.data.no,
  //         pwd: this.data.pwd
  //       }
  //     })
  //   .then((res) => {
  //     console.log(res)
  //     this.setData({
  //       gzb: res.result.data[0]
  //     })
  //     console.log(this.data.gzb)
  //   })
  // },

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




        //对象转数组
        // var jiu = res.data
        // var nArr = [];
        // for (var i in jiu) {
        //   nArr.push(jiu[i]);
        // }
        // console.log(jiu);
        // console.log(nArr);

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