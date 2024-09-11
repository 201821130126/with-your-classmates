// pages/compInfo/compInfo.js
const server = require("../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compId:'',
    compInfo:[],
    compDate:'',
  },
  comInfo:function(){
    var that = this;
      var compId = that.data.compId
      console.log(that.data.compId)
    server.request('get','comp/getHomePage/compInfo?',
    {
      id:compId
    },
    function(res){
      var all = res.data.response;
      console.log("allcom:",all)
       var compDate = all.date.substring(0,10)
  
          that.setData({
            info:res.data.response,
            compDate:compDate
          })
    
       });
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "compId":options.id,
    })
    this.comInfo()
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