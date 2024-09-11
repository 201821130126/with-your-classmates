// pages/me/history/checkScore/checkScore.js
const server = require("../../../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ["自己得分", "队员得分"],
    currentNavtab: 0,
    groupId:0,
    otherScore:[],
    ownScore:[],
    empty:true,
  },
  switchTab: function (e) {
    var idx = e.currentTarget.dataset.idx;
    if(idx == 0){
      this.getOwnPoints();
    }
    else{
      this.getOthersPoints();
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  // 自己的得分
  getOwnPoints:function(){
    
    var that = this;
    that.data.ownScore = []
    var groupId = that.data.groupId

    server.request('get','group/showOwnPoints?',
    {
     userId:getApp().globalData.user_id,
      groupId:groupId
    // groupId:4

    },
    function(res){
      
      console.log("给自己的得分",res)
      var all = res.data.response;
      console.log("all.length",all.length)
      if(all.length == 0)
      {
      
        wx.showToast({
          title: '暂无队友给你打分',
          icon:'none',
          duration:1000
        })
      }
      else{
        var empty = false
      for(var i = 0;i<all.length;i++)
      {
        var scoreArray = {
          judgerId:all[i].judgerId,
          judgerName:all[i].judgerName,
          judgerUrl:all[i].judgerUrl,
          point:all[i].point,
        }
        that.data.ownScore = that.data.ownScore.concat(scoreArray)

        that.setData({
          ownScore:that.data.ownScore,
          empty:empty
        })
      }
    }
      console.log("自己的得分",that.data.ownScore)
      console.log("empty",that.data.empty)
    })
  },
  // 别人的得分
  getOthersPoints:function(){
    var that = this;
    that.data.otherScore = []
    var groupId = that.data.groupId
    server.request('get','group/showOthersPoints?',
    {
      // userId:getApp().globalData.user_id
       groupId:groupId
      // groupId:4
    },
    function(res){
      console.log("别人的得分",res)
      var all = res.data.response;
      if(all.length == 0)
      {
        wx.showToast({
          title: '队伍暂未结束，无法查看得分',
          icon:'none',
          duration:2000
        })
      }
      else{
       var empty = false;
      for(var i = 0;i<all.length;i++)
      {
        var scoreArray = {
    

          id:all[i].id,
          // id:1,
          // nickName:"nickName",

          nickName:all[i].nickName,
          avatarUrl:all[i].avatarUrl,
          // avatarUrl:"123",
          // point:3,
          point:all[i].point,

          // judgerId:2,
          // judgerName:"all[i].judgerName",
          // judgerUrl:"all[i].judgerUrl",
          // point:"3"
        }
        that.data.otherScore = that.data.otherScore.concat(scoreArray)

        that.setData({
          otherScore:that.data.otherScore,
         empty:empty

        })
      }
    }
      console.log("别人的得分",that.data.otherScore)
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getOwnPoints()
    // this.getOthersPoints()
    this.setData({
      "groupId":options.groupId,
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
    this.getOwnPoints()
    this.getOthersPoints()
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