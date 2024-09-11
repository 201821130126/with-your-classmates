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
    tagName: '',
    readed: '',
    fullMem: '', //队伍人数上限
    // messageNum:'',
    state: "已确认",
    isAccept: 0,
    isVisible: true,
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
      "fullMem": options.fullMem,
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
    console.log(getApp().globalData.user_id)
    //邀请组队消息接收，同意
    server.request(
      'POST',
      'message/readMessage?', {
        "id": that.data.id,
        // "type":1,
        "receiveId": getApp().globalData.user_id,
      },
      function (res) { //？？？对应的是接口名
        console.log(getApp().globalData.token)
        console.log(res);
        if (res.data.message != '成功') {
          wx.switchTab({
            url: '../../../pages/message/message',
          })      
          wx.showModal({
            showCancel: false,
            content: res.data.message,
          })
        } else {
          wx.switchTab({
            url: '../../../pages/message/message',
            //  url:'../message/message?state='+state+"&messageNum="+messageNum,
          })
          wx.showToast({
            title: '已同意组队邀请',
            icon:'none',
            duration:1000
          })
        }
        // res.data.message
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
        // "type":2
      },
      function (res) { //？？？对应的是接口名
        console.log(getApp().globalData.token)
        console.log(res);
        if (res.data.message != '成功') {
          wx.switchTab({
            url: '../../../pages/message/message',
          })
          wx.showModal({
            showCancel: false,
            content: res.data.message,
          })
        } else {
          wx.switchTab({
            url: '../../../pages/message/message',
          })
          wx.showToast({
            title: '已拒绝组队邀请',
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