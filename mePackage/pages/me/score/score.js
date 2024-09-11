// pages/me/score/score.js
const server = require("../../../../services/server");
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalScore:0,
    item:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getDataScore:function(){
    var that=this;
    server.request(
      'POST',
      'personal/showScore?',
      {
        "id":getApp().globalData.user_id
      },
      function(res){
        console.log(res.data);
        for(var i=0;i<res.data.response.scoreHistories.length;i++){
        that.data.item.push(res.data.response.scoreHistories[i]);
      }
      that.data.totalScore=res.data.response.totalScore;
      that.setData({
        item:that.data.item,
        totalScore:that.data.totalScore
      })
      },
      function(error){
        console.log(error);
        // console.log(app.globalData.token);
        // console.log(app.globalData.user_id)
      },
      {"Content-Type": "application/x-www-form-urlencoded"}
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      item:[]
    });
    this.getDataScore()
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