// pages/groupInfo/groupInfo.js
var app = getApp()
var count = 0;
const server = require("../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList:[],
    groupId:'',
    teammates: [],
    index: 0,
    nameList:[],
    isRuleTrue:false,
    deadline:'',
    addTime:'',
    key: 0,//评分
    status:'',    //0未课评 1已课评
    groupId:0,
    teammateId:0,
    empty:'',
    status:'',
  },
  plan:function(options){
    var groupId = this.data.groupId
    var deadline = this.data.deadline
    var addTime = this.data.addTime
    console.log("groupInfoDeadline",this.data.deadline)
    console.log("groupInfoaddTime",this.data.addTime)
    wx.navigateTo({
      url: '../../../schedulePackage/pages/plan/plan?id='+groupId+'&deadline='+deadline+'&addTime='+addTime ,
    })
  },
  // 结束组队评分按钮时展示队友
  end:function(e){
    var that = this;
    var groupId = parseInt(that.data.groupId)
  // 转到评分
  wx.navigateTo({
    url: '../../../schedulePackage/pages/score/score?id='+groupId,
  })
 
  },
  
  dongTai:function(options){
    var groupId = this.data.groupId
    wx.navigateTo({
      url: '../../../schedulePackage/pages/dongTai/dongTai?id='+groupId,
    })
  },
// 获取所有组队信息
getAllteam:function(){
  var that = this;
  var groupId = that.data.groupId
  console.log("groupId:",groupId)
  server.request('get','group/showGroup?',
  {
    token:getApp().globalData.token,
    id:groupId
  },
  function(res){
      console.log(res) 
     });
    
  
},
showTeammates:function(){

  if(this.data.teammates.length == 0){//1人队
    console.log("nimeiyduiy")
    wx.showToast({
      title: '你没有队友噢',
      icon:'none',
      duration:3000,
    })
  }

},
// 查看队友日程时选择队友点击确定时触发
bindPickerChange: function (e) {
  var that = this;
  var groupId = parseInt(that.data.groupId)
  // if(that.data.status==true){//1人队
  //   console.log("nimeiyduiy")
  //   wx.showToast({
  //     title: '你没有队友噢',
  //     duration:2000,
  //   })
  // }else{
    console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    var teammateId = that.data.teammates[e.detail.value].teammateId
    var teammateId = that.data.teammates[e.detail.value].teammateId
    console.log('teammateId:', teammateId)
    //转到队友日程
    wx.navigateTo({
      url: '../../../schedulePackage/pages/matePlan/matePlan?id='+groupId+'&teammateId='+teammateId,
    })
    this.setData({
        index: e.detail.value
  
    })
  // }


},
// 展示队友
teammates:function(){
  var that = this;
  that.data.teammates = []
  var groupId = parseInt(that.data.groupId)
  console.log(groupId,getApp().globalData.user_id)
  server.request('post','groupSchedule/chooseTeammate?',
  {
    "groupId":groupId,
    "userId":getApp().globalData.user_id,
  },
  function(res){
      console.log("选择队友日程:",res) 
      var allMates = res.data.response

      if(allMates.length == 0){
        that.setData({
          status:false
        })
      }else{
      for(var i = 0;i<allMates.length;i++)
      {
        if(allMates[i].isDeleted==true){
          var label =  '('+allMates[i].label+')'
        }else
        {
          var label = ''
        }
        var mateArray = {
          groupId:allMates[i].groupId,
          userId:allMates[i].userId,
          teammateId:allMates[i].teammateId,
          teammateName:allMates[i].teammateName + label,
          isDeleted:allMates[i].isDeleted,
          label:allMates[i].label,
        };
      
        that.data.teammates = that.data.teammates.concat(mateArray)
      
        that.setData({
          teammates:that.data.teammates,
          status:true
        })
      }
    };
  });
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 //先设置参数

    this.setData({
      "groupId":options.id,
      "teammateId":options.teammateId,
      "deadline":options.deadline,
      "addTime":options.addTime,
      "groupName":options.groupName,
    })

    this.getAllteam()
    this.teammates()
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