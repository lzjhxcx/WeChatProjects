Page({
  data: {
    left: 20,
    top: 20
  },
  handleSetMoveViewPos: function (e) {
    const MOVE_VIEW_RADIUS = 30 // 悬浮窗半径

    const touchPosX = e.touches[0].clientX
    const touchPosY = e.touches[0].clientY

    const moveViewCenterPosX = this.data.left + MOVE_VIEW_RADIUS
    const moveViewCenterPosY = this.data.top + MOVE_VIEW_RADIUS

    // 确保手指在悬浮窗上才可以移动
    if (Math.abs(moveViewCenterPosX - touchPosX) < MOVE_VIEW_RADIUS + 30 && Math.abs(moveViewCenterPosY - touchPosY) < MOVE_VIEW_RADIUS + 30) {
      if (touchPosX > 0 && touchPosY > 0) {
        this.setData({
          left: touchPosX - MOVE_VIEW_RADIUS,
          top: touchPosY - MOVE_VIEW_RADIUS
        })
      } else {
        this.setData({
          left: 20, // 默认显示位置 left距离
          top: 20 // 默认显示位置 top距离
        })
      }
    }
  },
  /**
  * 拖拽移动
  */
  handleTouchMove: function (e) {
    const MOVE_VIEW_RADIUS = 30 // 悬浮窗半径

    const touchPosX = e.touches[0].clientX
    const touchPosY = e.touches[0].clientY

    if (touchPosX > 0 && touchPosY > 0) {
      this.setData({
        left: touchPosX - MOVE_VIEW_RADIUS,
        top: touchPosY - MOVE_VIEW_RADIUS
      })
    } else {
      this.setData({
        left: 20, //默认显示位置 left距离
        top: 20 //默认显示位置 top距离
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '工商代办、记账审计',
      desc: '专业、快捷、高效!',
    }
  },
  freeTell: function () {
    wx.makePhoneCall({
      phoneNumber: '13108124896',
    })
  }
})