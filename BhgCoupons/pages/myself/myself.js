var app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    number: [],
    qRCodeMsg: '',
    openid:'',
    firstloading:true,
    scanloading:false,
    avatarUrl:''
  },

  onLoad: function () {
    var that = this;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              console.log(res.userInfo.avatarUrl)
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8f17027ebf9027a8&secret=ffea254889db0e6d0a578eed45d48199&js_code=' + res.code + '&grant_type=authorization_code',
                    url: 'https://www.lzjhxcx.club/Code_Appid.ashx?appid=wxafd64b434b7987bb&secret=00d855284be1ab5bd70c586c977abf9f&code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      // 获取到用户的 openid
                      // console.log("用户的openid:" + res.data.openid);
                      that.setData({
                        openid: res.data.openid,
                        firstloading:false
                      })
                      console.log("用户的openid:" + that.data.openid);
                      that.usercode()
                    }
                  });
                }
              });
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
              })
            }
          });
        }
      }
    });
  },
  register(){
    //用户登录
    // 改变 isHide 的值，显示授权页面
    this.setData({
      isHide: true
    });
  },
  register1(){
    //用户登录
    // 改变 isHide 的值，显示授权页面
    this.setData({
      isHide: false
    });
  },
  isRegister(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    // 自行补上自己的 APPID 和 SECRET
                    // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8f17027ebf9027a8&secret=ffea254889db0e6d0a578eed45d48199&js_code=' + res.code + '&grant_type=authorization_code',
                    url: 'https://www.lzjhxcx.club/Code_Appid.ashx?appid=wxafd64b434b7987bb&secret=00d855284be1ab5bd70c586c977abf9f&code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      // 获取到用户的 openid
                      // console.log("用户的openid:" + res.data.openid);
                      that.setData({
                        openid: res.data.openid,
                        firstloading:false
                      })
                      console.log("用户的openid:" + that.data.openid);
                      that.usercode()
                    }
                  });
                }
              });
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
              })
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  onShow(){
    if(this.data.firstloading==false && this.data.scanloading==false)
    {this.usercode()  //页面切换刷新用户信息
    }
  },
  usercode:function(){  //请求用户信息
    var that = this;
    wx.request({
      url: 'https://www.lzjhxcx.club/Initialization.ashx',
      data: {
        open_id: that.data.openid
        },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          number: []
        })
        // console.log(res.data)
        // console.log(res.data[0].result)
        if(res.data[0].result){
          wx.showToast({                      //提示是否有错误
            title: res.data[0].result,
            duration: 3000
          })
        }
        else{
        that.setData({
          number: res.data
        })}
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      that.onLoad();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getQRCode: function () {
    var _this = this;
    
    wx.scanCode({                           //扫描API
      success: function (res) {
        if (res.result.length == 22 &        //初步筛选所扫条码是否符合条件
        res.result.substring(0, 6) == 100119 | 
        res.result.substring(0, 6) == 100122 | 
        res.result.substring(0, 6) == 100123 | 
        res.result.substring(0, 6) == 100124 | 
        res.result.substring(0, 6) == 100125 | 
        res.result.substring(0, 6) == 100173) {
          console.log(res);   //输出回调信息
          _this.setData({
            qRCodeMsg: res.result
          });

        wx.request({                         //传参请求条码信息
          url: 'https://www.lzjhxcx.club/Create_coupon.ashx',
          data: {
            ticket_no:_this.data.qRCodeMsg,
            open_id: _this.data.openid
            },
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(res.data)
            _this.setData({
              scanloading:true
            })
            wx.showToast({                      //提示是否有错误
              title: res.data.result,
              duration: 3000
            })
            _this.setData({
              scanloading:false
            })
            _this.usercode()
            // let list = _this.data.number;
            // list.push(res.data);
            // _this.setData({
            //   number: list
            // })
          // if(res.data.pd==1){
          //   wx.showToast({                      //提示是否扫描成功
          //     title: '成功',
          //     duration: 2000
          //   })
            // wx.navigateTo({                      //带参跳转到条码界面
            //   url: '../code/code?code=' + res.data.qRCodeMsg,
            //   success: function (res) { },
            //   fail: function (res) { },
            //   complete: function (res) { },
            // })
          // }else{
          //   wx.showToast({                      //提示是否扫描成功
          //     title: '不符合条件！',
          //     duration: 2000
          //   })
          // }
            
          },
          fail: function(res) {},
          complete: function(res) {},
        })
          // let list = _this.data.number;   //将扫描到的数据保存到变量number中
          // var rbg = { "name": "夜市优惠券", "money": "10", "condition": "消费满128元使用一张", "coupon_no": "6600020012", "start_time": "2020-06-28", "end_time": "2020-06-30" };
          // rbg.coupon_no = res.result;
          // list.push(rbg);
          // _this.setData({
          //   number: list
          // })

          // wx.navigateTo({                     //带参跳转到条码界面
          //   url: '../code/code?code=' + _this.data.qRCodeMsg,
          //   success: function (res) { },
          //   fail: function (res) { },
          //   complete: function (res) { },
          // })
        }
        else {
          wx.showToast({                      //提示是否扫描成功
            title: '小票有误！',
            duration: 2000
          })
        }
      }

    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.usercode()
    wx.stopPullDownRefresh()
  },
  //分享
 onShareAppMessage: function () {
    return {
      title: '北京华联微信电子券',
      desc: '方便、快捷!',
    }
  },
})