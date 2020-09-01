//index.js
var wxbarcode = require('index.js');
Page({
  data: {
    code: '',
    barcode:'',
    qrcode:'',
    introduce:'',
    ishide:false
  },
  ishided(){
    this.setData({
      ishide:!this.data.ishide
    })
  },
 
  onLoad: function (options){
    // console.log(options.code)
    //从dl页面传值过来
    this.setData({
      barcode: options.code,
      qrcode: options.code,
      code:options.depict,
      introduce:options.introduce
    })
    console.log(this.data.barcode)
    console.log(this.data.qrcode)
    wxbarcode.barcode('barcode', this.data.barcode, 680, 200);
    wxbarcode.qrcode('qrcode', this.data.qrcode, 420, 420);
  }
})