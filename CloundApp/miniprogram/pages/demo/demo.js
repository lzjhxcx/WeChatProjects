// miniprogram/pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    arr:['js','json','wxml','wxss'],
    arrobe:[
      {
        id:1,name:'js'
      },
      {
        id: 2, name: 'json'
      }, {
        id: 3, name: 'wxml'
      }, {
        id: 4, name: 'wxss'
      }
    ]
  },

  arrobj(){
    const length = this.data.arr.length
    for(let i = 0;i < length;i++){
      const x =Math.floor(Math.random() * length)
      const y =Math.floor(Math.random() * length)
      const temp = this.data.arr[x]
      this.data.arr[x] = this.data.arr[y]
      this.data.arr[y] =temp
    }
    this.setData({
      arr:this.data.arr
    })
  },
  arrobjobe() {
    const length = this.data.arrobe.length
    for (let i = 0; i < length; i++) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.arrobe[x]
      this.data.arrobe[x] = this.data.arrobe[y]
      this.data.arrobe[y] = temp
    }
    this.setData({
      arrobe: this.data.arrobe
    })

  },
  getMusicInfo(){
    wx.cloud.callFunction({
      name:'tcbRouter',
      data: {
        $url : 'music'
      }
    }).then((res) => {
      console.log(res)
    })
  },
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then((res) => {
      console.log(res)
    })
  },
 




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
          openid:res.result.openid
        })
      }
    })
      /*wx.cloud.callFunction({
        // 云函数名称
        name: 'add',
        // 传给云函数的参数
        data: {
          a: 1,
          b: 2,
        },
        success: function (res) {
          console.log(res.result.sum) // 3
        },
        fail: console.error
      })*/

    /*setTimeout(() => {
      console.log(1)
      setTimeout(() => {
        console.log(6)
        setTimeout(() => {
          console.log(7)
        }, 1000)
      }, 2000)
    }, 1000)
    console.log(2)*/

    /*new Promise((resolve,reject) => {
      setTimeout(() => {
        console.log(1)
        resolve()
      }, 1000)
    }).then((res) => {
      setTimeout(() => {
        console.log(2)
      }, 2000)
    })*/

    /*let p1 = new Promise((resolve,reject) => {
      setTimeout(() => {
        console.log('p1')
        resolve('p1')
      },2000)
    })
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('p2')
          resolve('p2')
        }, 1000)
      })
      let p3 = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('p3')
          resolve('p3')
        }, 3000)
      })

      /*Promise.all([p1,p2,p3]).then((res) => {
        console.log('全部完成')
        console.log(res)
      }).catch((err)=> {
        console.log('失败')
        console.log(err)
      })*/

    /*Promise.race([p1, p2, p3]).then((res) => {
      console.log('完成')
      console.log(res)
    }).catch((err) => {
      console.log('失败')
      console.log(err)
    })*/
    console.log(this.foo())
  },
  
  async foo() {
    console.log('foo')
    let res = await this.setTimeout()
    console.log(res)
  },

  setTimeout(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('p3')
        resolve('resolve')
      }, 3000)
    })

    
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