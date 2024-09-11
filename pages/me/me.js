//list.js
const server = require("../../services/server");
var app = getApp()
Page({

  data: {
    starScore:0
  },
  dongTai: function () {
    wx.showModal({
      title: '提示',
      content: '暂未开放',
    })
  },
  my_suggest:function(){

    wx.navigateTo({
      url: '../../mePackage/pages/me/fdback/fdback'
    })
  },
  my_postil: function () {

    wx.navigateTo({
      url: '../../mePackage/pages/me/myPostil/myPostil'
    })
  },
  detail: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/personal_information/personal_information'
    })
  },
  contact: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/contact/contact'
    })
  },

  top:function(){
    wx.navigateTo({
      url: '../../mePackage/pages/me/top/top'
    })
  },

  news: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/news/news'
    })
  },
  my_goals: function () {

    wx.navigateTo({
      url: '../../mePackage/pages/me/score/score'
    })
  },

  top: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/score/score'
    })
  },

  add:function(){
    wx.navigateTo({
      url: '../me/addTag/addTag'
    })
  },
  history:function(){
    wx.navigateTo({
      url: '../../mePackage/pages/me/history/history'
      // url: '../../mePackage/pages/me/history/checkScore/checkScore'
    })
  },
  fdback: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/fdback/fdback'
    })
  },
  change: function () {
    wx.navigateTo({
      url: '../../mePackage/pages/me/personalTag/personalTag'
    })
  },
  score: function () {
    wx.navigateTo({
      url: './line/index'
    })
  },

  getDataJudged: function () {
    var that = this;
    server.request(
      'POST',
      'personal/showPointJudged?', {
        "id": getApp().globalData.user_id
      },
      function (res) {
        console.log(res.data);
        console.log(res.data.response);
        var starScore = 0;
          for (var i = 0; i < res.data.response.length; i++) {
            starScore =starScore+ res.data.response[i].point;
          }
          starScore = (starScore / res.data.response.length).toFixed(1)
          that.setData({
            "starScore": starScore
          })
          console.log(starScore)
      },
      function (error) {
        console.log(error);
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
  },//获取用户历史得分


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    this.setData({
      logged: true,
      userInfo: app.globalData.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDataJudged()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      starScore:0
    })
    this.getDataJudged()
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
    this.setData({
      logged: true,
      userInfo: app.globalData.userInfo
    })
    wx.showToast({
      title: '刷新中',
      icon:'loading',
      duration:1000
    })
    wx.stopPullDownRefresh();  //停止下拉刷新
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

