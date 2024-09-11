const server = require("../../../../services/server");

// pages/me/top/top.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank1:[],
    rank2:[],
    rank3:[],
    rank4:[],
    flag1:false,
    flag2:false,
    flag3:false,
    flag4:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRank()
  },

   getRank:function(){
    var that=this;
    server.request(
      'GET',
      'personal/showRank?',
      {
      },
      function(res){
        console.log(res.data);
        if(res.data.response.length==1){
          that.setData({
            flag1:true,
            rank1:res.data.response[0]})
        }
        else if(res.data.response.length==2){
          that.setData({
            flag1:true,
            flag2:true,
            rank1:res.data.response[0],
            rank2:res.data.response[1]
          })
        }
        else if(res.data.response.length==3){
          that.setData({
            flag1:true,
            flag2:true,
            flag3:true,
            rank1:res.data.response[0],
            rank2:res.data.response[1],
            rank3:res.data.response[2]
          })
        }
        else if(res.data.response.length>=4){
          that.setData({
            flag1:true,
            flag2:true,
            flag3:true,
            flag4:true,
            rank1:res.data.response[0],
            rank2:res.data.response[1],
            rank3:res.data.response[2],
            rank4:res.data.response[3]
          })
        }
        console.log(that.data.rank1);
        console.log(that.data.rank2);
        console.log(that.data.rank3);
        console.log(that.data.rank4);
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      },
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