// pages/me/history/history.js
const server = require("../../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
groupList:[],
disabled:"",
  },
// 获取历史组队信息
getHistoryTeam:function(){
  var that = this;
  that.data.groupList = []
  server.request('get','group/showGroupHistory?',
  {
    userId:getApp().globalData.user_id
  // id:8
  },
  function(res){
      var allTeam = res.data.response;
      console.log("getHistoryTeam",res)
      console.log(res.data.response)
      if(allTeam.length == 0)
      {
        that.setData({
          empty:true
        })
      }
      else{
      var empty = false;
   
    for(var i = 0;i<allTeam.length;i++)
    {
      if(allTeam[i].label =="尚未正常解散" ){
        var label = "尚未解散"
        var disabled = true;
      }
      else {
        var label = allTeam[i].label
        var disabled = false;
      }

// || allTeam[i].group.memNum == 1
      if( allTeam[i].group.fullMem == 1  )
      {
        var disabled = true;
        var label = "无人评分"
      }
    
      // 如果队伍人数大于两个人，但我没有邀请到人就退队了，还是能查看评分，只能查看自己的评分

      
      var groupArray = {
          groupName:allTeam[i].group.groupName,
          memNum:allTeam[i].group.memNum,
          fullMem:allTeam[i].group.fullMem,
          status:allTeam[i].group.status,
          groupImage:'https://www.cqcwangluo.site/static' + allTeam[i].group.groupImage,
          groupId:allTeam[i].group.id,
          deadline:allTeam[i].group.deadline.substring(0,10),
          tagName:allTeam[i].tag,
          tagId:allTeam[i].group.tag,
          label:label,
          disabled:disabled
      };
     
      that.data.groupList = that.data.groupList.concat(groupArray)

      // deadlineD.push(that.data.groupList.deadline.substring(0,9))
      that.setData({
        groupList:that.data.groupList,
        empty:empty,
      })
    }
    };
    console.log("grouplist:",that.data.groupList)
     });
    
  
},
// 查看评分
checkScore:function(event){
  var groupId = event.currentTarget.dataset.id;
  console.log("groupId",groupId)
  wx.navigateTo({
    url: '../history/checkScore/checkScore?groupId='+groupId,
  })
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getHistoryTeam()
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
    this.getHistoryTeam()
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