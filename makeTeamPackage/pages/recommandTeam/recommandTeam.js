// pages/recommand/recommand.js
const server = require("../../../services/server");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: [],
    group1: [],
    group1Name: [],
    group2: [],
    group2Name: [],
    group3: [],
    group3Name: [],
    item1: [],
    item2: [],
    item3: [],
    visible1: false,
    visible2: false,
    visible3: false,
    hasselect: 0,
    disable: false,
    visible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendGroup()
  },

  // 依据队伍标签返回推荐队伍
  getRecommendGroup: function () {
    var that = this;
    server.request(
      'POST',
      'match/recommendGroup?', {
        "id": getApp().globalData.user_id,
        "tagId": getApp().globalData.teamTag
      },
      function (res) {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        console.log(getApp().globalData.user_id)
        console.log(getApp().globalData.teamTag);
        console.log(res.data);
        if (res.data.response == null) {
          that.setData({
            visible: true
          })
        } else {
          for (var i = 0; i < res.data.response.matchGroupResponseVMS.length; i++) {
            that.data.group.push(res.data.response.matchGroupResponseVMS[i])
          }
          for (var i = 0; i < res.data.response.matchGroupResponseVMS.length; i++) {
            that.data.group[i].groupImage = 'https://www.cqcwangluo.site/static' + that.data.group[i].groupImage;
            if (that.data.group[i].point == null || that.data.group[i].point == 0) {
              that.data.group[i].point = 0.0
            }
            console.log(that.data.group[i].groupImage)
          }
          that.setData({
            group: that.data.group,
          })
          if (that.data.group.length == 1) {
            that.setData({
              item1: that.data.group[0],
              visible1: true
            })
          } else if (that.data.group.length == 2) {
            that.setData({
              item1: that.data.group[0],
              item2: that.data.group[1],
              visible1: true,
              visible2: true,
            })
          } else {
            that.setData({
              item1: that.data.group[0],
              item2: that.data.group[1],
              item3: that.data.group[2],
              visible1: true,
              visible2: true,
              visible3: true,
            })
          }
        }

      },
      function (error) {
        console.log(error);
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
  },

  tap: function () {
    var that = this;
    that.data.hasselect = that.data.hasselect + 1,
      that.data.group1.push(that.data.group[0].id),
      that.data.group1Name.push(that.data.group[0].groupName),
      console.log(that.data.hasselect),
      that.data.disable = true
    that.setData({
      hasselect: that.data.hasselect,
      disable: that.data.disable,
      group1: that.data.group1,
      group1Name: that.data.group1Name
    })
    if (that.data.hasselect = 1) {
      wx.switchTab({
        url: '../../../pages/choose/choose',
      })
    }
    server.request(
      'POST',
      'message/sendToGroup?', {
        "group": that.data.group1,
        "groupName": that.data.group1Name,
        "userId": getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        console.log(that.data.group1);
        if (res.data.message == '成功') {
          wx.showModal({
            content: '已自动发送邀请信',
            showCancel: false,
          })
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      },
      // {"Content-Type": "application/json"},
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )



  },

  tap1: function () {
    var that = this;
    that.data.hasselect = that.data.hasselect + 1,
      that.data.group2.push(that.data.group[1].id),
      that.data.group2Name.push(that.data.group[1].groupName),
      console.log(that.data.hasselect),
      that.data.disable = true
    that.setData({
      hasselect: that.data.hasselect,
      disable: that.data.disable,
      group2: that.data.group2,
      group2Name: that.data.group2Name,
    })
    if (that.data.hasselect = 1) {
      wx.switchTab({
        url: '../../../pages/choose/choose',
      })
    }
    server.request(
      'POST',
      'message/sendToGroup?', {
        "group": that.data.group2,
        "groupName": that.data.group2Name,
        "userId": getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        console.log(that.data.group2);
        if (res.data.message == '成功') {
          wx.showModal({
            content: '已自动发送邀请信',
            showCancel: false,
          })
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      },
      // {"Content-Type": "application/json"},
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )

  },

  tap2: function () {
    var that = this;
    that.data.hasselect = that.data.hasselect + 1,
      that.data.group3.push(that.data.group[2].id),
      that.data.group3Name.push(that.data.group[2].groupName),
      console.log(that.data.hasselect),
      that.data.disable = true
    that.setData({
      hasselect: that.data.hasselect,
      disable: that.data.disable,
      group3: that.data.group3,
      group3Name: that.data.group3Name
    })
    if (that.data.hasselect = 1) {
      wx.switchTab({
        url: '../../../pages/choose/choose',
      })

    }
    server.request(
      'POST',
      'message/sendToGroup?', {
        "group": that.data.group3,
        "groupName": that.data.group3Name,
        "userId": getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        if (res.data.message == '成功') {
          wx.showModal({
            content: '已自动发送邀请信',
            showCancel: false,
          })
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      },
      // {"Content-Type": "application/json"},
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )

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