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
    avatarUrl:'',
    hidefunction:0,
    status:0,
    use:false,
    scaner:false,
    location:'',
    array: ['江南路店', '半山康城店', '阳光家园店', '玉泉广场店','华芝御景城店','福广金城店'],
    storename: [100122,100119,100123,100124,100125,100173]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      location:this.data.storename[e.detail.value]
    })
    console.log(this.data.location)
    this.jindianjisong()
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
                    url: 'https://www.lzjhxcx.club/Code_Appid?appid=wxafd64b434b7987bb&secret=00d855284be1ab5bd70c586c977abf9f&code=' + res.code + '&grant_type=authorization_code',
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
                    url: 'https://www.lzjhxcx.club/Code_Appid?appid=wxafd64b434b7987bb&secret=00d855284be1ab5bd70c586c977abf9f&code=' + res.code + '&grant_type=authorization_code',
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
 //页面切换刷新用户信息
  onShow(){
    if(this.data.firstloading==false && this.data.scanloading==false)
    {this.usercode()  
    }
  },
   //从数据库请求用户的优惠券信息
  usercode:function(){ 
    var that = this;
    if(that.data.openid!=""){
      wx.request({
        url: 'https://www.lzjhxcx.club/Initialization',
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
          if(res.data!=""){
          if(res.data[0].result){
            console.log(res.data[0].result)
          //提示错误信息
            wx.showToast({                     
              title: res.data[0].result,
              duration: 3000
            })
          }
          else{
          that.setData({
            number: res.data
          })}
        }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }

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
    //扫描API
    wx.scanCode({                           
      success: function (res) {
        //初步筛选所扫条码是否符合条件
        if (res.result.length == 22 &        
        res.result.substring(0, 6) == 100119 | 
        res.result.substring(0, 6) == 100122 | 
        res.result.substring(0, 6) == 100123 | 
        res.result.substring(0, 6) == 100124 | 
        res.result.substring(0, 6) == 100125 | 
        res.result.substring(0, 6) == 100173) {
          //输出回调信息
          console.log(res);   
          _this.setData({
            qRCodeMsg: res.result
          });
        if(!_this.data.openid){
          //提示网络卡
          wx.showToast({                      
            title: '网络慢,请重试',
            duration: 3000
          })
        }
        else{
          //传参请求条码信息
          wx.request({                         
            url: 'https://www.lzjhxcx.club/Create_coupon',
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
              //提示是否有错误
              wx.showToast({                      
                title: res.data.result,
                duration: 3000
              })
              _this.setData({
                scanloading:false
              })
              //手动刷新请求用户优惠券
              _this.usercode()
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        }else {
          //提示是否扫描成功
          wx.showToast({                      
            title: '小票有误！',
            duration: 2000
          })
        }
      }
    })
    //隐藏弹出层，回到主页面
    _this.setData({
      scaner:false
    })
  },
 //隐藏功能，点击10次播放背景音乐
  hidefunctions(){
    console.log(this.data.hidefunction)
    if(this.data.hidefunction<10){
      this.data.hidefunction++;
    }
    else{
      if(this.data.status==0){
        console.log("开始播放了")
        wx.playBackgroundAudio({
          dataUrl: 'http://192.144.141.225:8888/down/XkTrwRr6MpFr',
        })
        this.data.status=1
      }else{
        console.log("开始暂停了")
        wx.pauseBackgroundAudio({
          success: (res) => {},
        })
        this.data.status=0
      }
    }
  },
  //改变use值为true，显示底部弹出层
  popueopen(){
    this.setData({
      use:true
    })
  },
  //改变use值为false，隐藏底部弹出层
  popueclose(){
    this.setData({
      use:false
    })
  },
  //改变scaner值为true，显示顶部弹出层
  popueopen1(){
    this.setData({
      scaner:true
    })
  },
  //改变scaner值为false，隐藏顶部弹出层
  popueclose1(){
    this.setData({
      scaner:false
    })
  },
  //用户手动下拉刷新，从数据库获取用于优惠券信息
  onPullDownRefresh: function () {
      this.usercode()
      wx.stopPullDownRefresh()

  },
  //分享功能打开
 onShareAppMessage: function () {
    return {
      title: '北京华联微信电子券',
      desc: '方便、快捷!',
    }
  },
  jiangnan(){
    wx.makePhoneCall({
      phoneNumber: '08125102083' 
    })
  },
  banshan(){
    wx.makePhoneCall({
      phoneNumber: '08125197599' 
    })
  },
  yangguang(){
    wx.makePhoneCall({
      phoneNumber: '08125102755' 
    })
  },
  yuquan(){
    wx.makePhoneCall({
      phoneNumber: '08125102701' 
    })
  },
  huazhi(){
    wx.makePhoneCall({
      phoneNumber: '08125177876' 
    })
  },
  fuguang(){
    wx.makePhoneCall({
      phoneNumber: '08125177755' 
    })
  },
  //进店即送功能请求函数
  jindianjisong(){
    var _this=this
    //传参请求条码信息
    wx.request({                         
      url: 'https://www.lzjhxcx.club/CustomerTicket',
      data: {
        open_id: _this.data.openid,
        storename:_this.data.location
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
        //提示是否有错误
        wx.showToast({                      
          title: res.data.result,
          duration: 3000
        })
        _this.setData({
          scanloading:false
        })
        _this.usercode()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    //隐藏弹出层，返回主页面
    _this.setData({
      scaner:false
    })
  },
})