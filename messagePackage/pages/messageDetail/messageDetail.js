// pages/messageDetail/messageDetail.js
const server = require("../../../services/server");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    groupName: '',
    sendUserName: '', //发送者的用户名
    tagName: '',
    readed: '',
    // messageNum:'',
    state: "已确认",
    isAccept: 0,
    isVisible: true
    // disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "id": options.id,
      "groupName": options.groupName,
      "tagName": options.tagName,
      "readed": options.readed,
      "sendUserName": options.sendUserName,
      // "messageNum":options.messageNum
    })
    if (this.data.readed == "已确认") {
      this.data.isVisible = false
    } else if (this.data.readed == "等待确认") {
      this.data.isVisible = true
    }
    this.setData({
      isVisible: this.data.isVisible
    })
    console.log(this.data.id)
  },

  onSubmit1: function (event) {
    var that = this;
    that.data.isAccept = 1;
    // that.data.disabled=true;
    //  this.data.messageNum=this.data.messageNum-1;
    that.setData({
      //  disabled:that.data.disabled,
      isAccept: that.data.isAccept,
      //  messageNum:this.data.messageNum,
    })
    console.log(that.data.id)
    //消息接收，同意
    server.request(
      'POST',
      'message/readMessage?', {
        // "id":349,
        "id": that.data.id,
        "receiveId": getApp().globalData.user_id,
        // "type":1
      },
      function (res) { //？？？对应的是接口名
        console.log(getApp().globalData.token)
        console.log(res);
        if (res.data.message != '成功') {
          wx.switchTab({
            url: '../../../pages/message/message',
            //  url:'../message/message?state='+state+"&messageNum="+messageNum,
        })
        wx.showModal({
          content: res.data.message,
          showCancel: false, //是否显示取消按钮
        })
        } else {
          wx.switchTab({
            url: '../../../pages/message/message',
            //  url:'../message/message?state='+state+"&messageNum="+messageNum,
          })
          wx.showToast({
            title: '同意加入队伍',
            icon:'none',
            duration:1000
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        wx.showToast({
          title: '失败！请勿重复请求',
          icon: 'none',
          duration: 2000
        })
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
    getApp().globalData.messageNum = getApp().globalData.messageNum - 1;
    console.log(getApp().globalData.messageNum);
  },
  onSubmit2: function (event) {
    var that = this;
    that.data.isAccept = 0;
    // that.data.disabled=true;
    // var state=event.currentTarget.dataset.state;
    that.setData({
      // disabled:that.data.disabled,
      isAccept: that.data.isAccept,
    })
    // console.log(this.data.isAccept)
    //拒绝
    server.request(
      'POST',
      'message/refuseMessage?', {
        "id": that.data.id,
        // "type":1
      },
      function (res) { //？？？对应的是接口名
        console.log(getApp().globalData.token)
        console.log(res);
      },
      function (error) {
        //调用服务端登录接口失败
        wx.showToast({
          title: '失败！请勿重复请求',
          icon: 'none',
          duration: 2000
        })
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
    getApp().globalData.messageNum = getApp().globalData.messageNum - 1;
    console.log(getApp().globalData.messageNum);
    wx.switchTab({
      url: '../../../pages/message/message',
      // url:'../message/message?state='+state,
    })
    wx.showToast({
      title: '已拒绝加入队伍请求',
      icon: 'none',
      duration: 2000
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