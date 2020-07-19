//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    //向模板传入数据
    // 轮播
    index_index_scroll_tmpl: {
      images: [
       '/image/1.jpg',
       '/image/9.jpg',
       '/image/11.jpg',
        '/image/13.jpg',
        '/image/3.jpg',
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 3000,
      duration: 1200
    },



    // nav
    index_index_navs_tmpl: {
      navs: [
        {
          image: '/image/121.png',
          text: '公司注册'
        }, {
          image: '/image/122.png',
          text: '代理记账'
        }, {
          image: '/image/124.png',
          text: '企业筹划'
        }, {
          image: '/image/123.png',
          text: '审计服务'
        }
      ]
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  swiperchange: function(e) {
    //FIXME: 当前页码
    //console.log(e.detail.current)
  },

  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },

  onShareAppMessage: function () {
    return {
      title: '工商代办、记账审计',
      desc: '专业、快捷、高效!',
    }
  },

  go: function(event) {
    wx.navigateTo({
      url: '../jieshao/jieshao'
    })
  }
})
