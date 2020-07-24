const app = getApp()
Page({
  data: {
    disabled: false,
    no:null,
    pwd: "",
    noinput: false,
    pwdinput: false
  },
  //获取输入的账号信息
    noinput: function (e) {
    this.setData({ no: e.detail.value });
    this.setData({ noinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false});
    }
      

  },
  //获取输入的密码
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
    
  },
  //提交按钮函数
  formSubmit: function (res) {
    console.log(this.data.no);
    console.log(this.data.pwd);
    this.setData({ disabled: true });
    //将获取到的账号密码数据向云数据库GZB查询对比
    var _this = this
    wx.request({
      url: 'https://www.lzjhxcx.club/Query',
      data: {
        employee_no: this.data.no,
        pwd: this.data.pwd
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        if (res.data.store_no) {
        //账号密码无误并传值下一个页面
        wx.navigateTo({
          url: '../gzb/gzb?lno=' + _this.data.no + '&lpwd=' + _this.data.pwd,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })


      } else {
        wx.showLoading({                    //提示信息
          title: '工号或密码不正确'
        })
        setTimeout(function () {            //隐藏提示信息并初始化账号密码
          wx.hideLoading()
        }, 500)
        _this.setData({
          no: null,
          pwd: ""
        })
      }
        
        },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
      //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
    no:null,
    pwd:""
    
    })
    wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
   
  },
  //分享
 onShareAppMessage: function () {
    return {
      title: '查工资就用华联查',
      desc: '方便、快捷!',
    }
  },
})
