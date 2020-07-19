//index.js
var wxbarcode = require('index.js');
Page({
  data: {
    code: '',
    barcode:'',
    qrcode:''
  },
  onLoad: function (options){
    //从dl页面传值过来
    this.setData({
      barcode: options.code,
      qrcode: options.code,
      code:options.depict
    })

    wxbarcode.barcode('barcode', this.data.barcode, 680, 200);
    wxbarcode.qrcode('qrcode', this.data.qrcode, 420, 420); 
  }
})