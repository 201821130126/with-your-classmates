// pages/recommand/recommand.js
const server = require("../../../services/server");
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    personList:[],
    status:true,

    disable:false,
    groupId:0,
    groupName:'',
    groupTag:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 接受参数
this.setData({
  "groupId":options.id,
  "groupName":options.groupName,
  "groupTag":options.groupTag
})
  },
  // 选择
  select:function(e){
    var that=this;
    var groupName = that.data.groupName
    var groupId = that.data.groupId;
    var groupTag = that.data.groupTag;
    var select = e.currentTarget.dataset.id;
    console.log("select",select)
    console.log(groupName,groupId,groupTag,select)
    server.request(
      'POST',
      'group/inviteTeammate?',
      {
        "fromUserId":getApp().globalData.user_id,
        "groupId":groupId,
        "groupName":groupName,
        "groupTag":groupTag,
        "userId":select,
      },
      function (res) { 
      
       wx.switchTab({
        url:'../../../pages/index/index',
      })
      if(res.data.message=='成功'){
        wx.showModal({
          content:'已自动向该用户发送邀请信',
          showCancel:false,
        })
      }
     else{
      wx.showModal({
        content:res.data.message,
        showCancel:false,
      })
     }
      
     },

    )
  },

// 展示推荐列表
  recommendPerson:function(){
    var that=this;
    var groupName = that.data.groupName
    var groupId = that.data.groupId;
    var groupTag = that.data.groupTag;
    console.log(typeof groupName,typeof groupId,typeof groupTag)
    server.request('POST',  'group/showInviteList?',
      {  
    "fromUserId":getApp().globalData.user_id,
    "groupId":groupId,
    "groupName":groupName,
    "groupTag":groupTag
      },
      function(res){
      console.log("showInviteList",res.data);
      var all = res.data.response.matchPersonResponseVMList
      if(all.length == 0)
      {
        var status = false;
      }
      if(res.data.response.message != null){
        wx.showToast({
          title:'已为您推荐成功',
          icon:'success',
          duration:1000
          })
      }else{
        wx.showToast({
          title:'已为您随机匹配',
          icon:'success',
          duration:1000
          })
      }
      for(var i = 0;i<all.length;i++)
      {
        if(all[i].point ==null)
        {
          var point = 0;
        }
        else{
          var point = all[i].point
      }
        var array = {
          id : all[i].id,
          nickName:all[i].nickName,
          point:point,
          avatarUrl:all[i].avatarUrl
        }
        that.data.personList = that.data.personList.concat(array)
      }
      that.setData({
        personList:that.data.personList,
        status:status
      })
 
      },
    
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.recommendPerson()
  },
  // https://175.24.33.88:8051/static/upload/video/c4258f1c-6041-48bf-8f26-9a525eb47c3b.jpg

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