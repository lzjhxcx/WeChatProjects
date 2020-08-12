Component({
  data: {
    text: 'BHG',
    color: 'rgba(0,0,0,0.1)',
    rows: [],
    cols: []
  },
  // 组件在页面上挂载时触发,注意如果页面没卸载过，该事件就不会触发第二次
  attached() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync();
    const rows = Math.ceil(windowWidth / (40 * this.data.text.length));
    const cols = Math.ceil(windowHeight / 120);
    const waterMark=wx.getStorageSync('waterMark')
    this.setData({
      rows: new Array(rows),
      cols: new Array(cols)
    });
  },
})