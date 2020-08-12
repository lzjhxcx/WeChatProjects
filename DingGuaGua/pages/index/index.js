//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    tabs: [],
    activeTab: 0,
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
  },
  onLoad() {
    const tabs = [
      {
        title: '公司注册',
        // title2: '公司注册',
        img: '/image/121.png',
        desc: '    你作为创业者，在创业初期.......因为看到一堆表格 而烦心反反复复跑各种相关部门最后，时间浪费了，事还没办成事办成了，付出的时间成本却大大增加该省的时间没省，该出的行政收费还是要出;顶呱呱——企服快速无忧，充分利用地区差异，选择合理注册方式合理运用税收杠杆，匹配注册资金方案多方位了解各类政策，合法享受政策优惠大幅降低运营成本，显著提高营业利润',
      },
      {
        title: '代理记账',
        // title2: '代理记账',
        img: '/image/122.png',
        desc: '代理记账是指将本企业的会计核算、记账、报税等一系列的工作全部委托给专业记账公司完成，本企业只设立出纳人员，负责日常货币收支业务和财产保管等工作。代理记账，纳税申报，申请一般纳税人，申请税控机，申请发票，建立健全财务制度，不让您多交一分税!',
      },
      {
        title: '企业筹划',
        // title2: '企业筹划',
        img: '/image/124.png',
        desc: '“税收筹划”又称“合理避税”。它来源于1935年英国的“税务局长诉温斯特大公”案。当时参与此案的英国上议院议员汤姆林爵士对税收筹划作了这样的表述：“任何一个人都有权安排自己的事业。如果依据法律所做的某些安排可以少缴税，那就不能强迫他多缴税收。”这一观点得到了法律界的认同。经过半个多世纪的发展，税收筹划的规范化定义得以逐步形成，即“在法律规定许可的范围内，通过对经营、投资、理财活动的事先筹划和安排，尽可能取得节税(Tax Savings)的经济利益。”',
      },
      {
        title: '审计服务',
        // title2: '审计服务',
        img: '/image/123.png',
        desc: '在企业面临税务稽查、并购交易、变更或者注销税务登记……等问题时，以下问题会引起管理层的关注：以往的税务处理方式有无错误?是否合法?有没有税务风险?如何规避以往错误税务处理事项造成的风险等等。如果企业正面临此类问题，我们可以对企业以往的税务账项处理情况进行全面的合法性审计，查错防漏，并提出补救方案，避免客户被处以税务处罚或承担刑事责任的风险。',
      },
      {
        title: '学员招收',
        // title2: '审计服务',
        img: '/image/123.png',
        desc: '本公司长年招收会计学员，学会计就到顶呱呱财务！。',
      },
    ]
    this.setData({ tabs })
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  }
})
