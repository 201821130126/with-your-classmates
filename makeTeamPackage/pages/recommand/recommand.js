// pages/recommand/recommand.js
const server = require("../../../services/server");
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person1:[],
    person2:[],
    person3:[],
    select:[],
    hasselect:0,
    disable:false,
    visible:false,
    visible1:true,
    visible2:true,
    visible3:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  tap1:function(){
    var that=this;
    that.data.hasselect=that.data.hasselect+1;
    console.log(that.data.hasselect);
    that.data.disable=true;
    that.data.select.push(that.data.person1[0].id);
    that.setData({
      hasselect:that.data.hasselect,
      select:that.data.select,
      disable:that.data.disable
    })
    if(that.data.hasselect=1)
    {
      wx.switchTab({
        url:'../../../pages/choose/choose',
      })
      
     
    }
    server.request(
      'POST',
      'message/sendToPerson?',
      {
        "receiveUserId":that.data.select,
        // "receiveUserId":[20],
        "content":"你好！我们是"+getApp().globalData.test[0]+"小组,队伍人数为"+getApp().globalData.test[1]+"我们的队伍目标为"+getApp().globalData.chooseTag.tagName,
        // "content":"hello",
        "groupName":getApp().globalData.test[0],
        "fullMember":getApp().globalData.test[1],
        "tagId":getApp().globalData.chooseTag.id,
        "userId":getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
       console.log(res);
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
     function (error) {
       //调用服务端登录接口失败
       console.log(error);
     },
     // {"Content-Type": "application/json"},
      {"Content-Type": "application/x-www-form-urlencoded"},
      that.setData({
        select:[]
      })
    )
  },

  tap2:function(){//选择第二个推荐对象
    var that=this;
    that.data.hasselect=that.data.hasselect+1;
    console.log(that.data.hasselect);
    that.data.disable=true;
    that.data.select.push(that.data.person2[0].id);
    that.setData({
      hasselect:that.data.hasselect,
      select:that.data.select,
      disable:that.data.disable
    })
    if(that.data.hasselect=1)
    {
      wx.switchTab({
        url:'../../../pages/choose/choose',
      })
    }
    server.request(
      'POST',
      'message/sendToPerson?',
      {
        "receiveUserId":that.data.select,
        "content":"你好！我们是"+getApp().globalData.test[0]+"小组,队伍人数为"+getApp().globalData.test[1]+"我们的队伍目标为"+getApp().globalData.chooseTag.tagName,
        // "content":"hello",
        "groupName":getApp().globalData.test[0],
        "fullMember":getApp().globalData.test[1],
        "tagId":getApp().globalData.chooseTag.id,
        "userId":getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
       console.log(res);
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
     function (error) {
       //调用服务端登录接口失败
       console.log(error);
     },
     // {"Content-Type": "application/json"},
      {"Content-Type": "application/x-www-form-urlencoded"},
      that.setData({
        select:[]
      })
    )
  },

  tap3:function(){//选择第二个推荐对象
    var that=this;
    that.data.hasselect=that.data.hasselect+1;
    console.log(that.data.hasselect);
    that.data.disable=true;
    that.data.select.push(that.data.person3[0].id);
    that.setData({
      hasselect:that.data.hasselect,
      select:that.data.select,
      disable:that.data.disable
    })
    if(that.data.hasselect=1)
    {
      wx.switchTab({
        url:'../../../pages/choose/choose',
      })
    }
    server.request(
      'POST',
      'message/sendToPerson?',
      {
        "receiveUserId":that.data.select,
        "content":"你好！我们是"+getApp().globalData.test[0]+"小组,队伍人数为"+getApp().globalData.test[1]+"我们的队伍目标为"+getApp().globalData.chooseTag.tagName,
        // "content":"hello",
        "groupName":getApp().globalData.test[0],
        "fullMember":getApp().globalData.test[1],
        "tagId":getApp().globalData.chooseTag.id,
        "userId":getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
       console.log(res);
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
     function (error) {
       //调用服务端登录接口失败
       console.log(error);
     },
     // {"Content-Type": "application/json"},
      {"Content-Type": "application/x-www-form-urlencoded"},
      that.setData({
        select:[]
      })
    )
  },

  recommendPerson:function(){
    var that=this;
    server.request(
      'POST',
      'match/recommendPerson?',
      {
        "tagId":getApp().globalData.chooseTag.id,
        "id":getApp().globalData.user_id
        // "tagId":20
      },
      function(res){
      console.log(res.data);
      wx.showToast({
        title:res.data.response.message,
        icon:'none',
        duration:2000
      })
      for(var i=0;i<res.data.response.matchGroupResponseVMS.length;i++){
        if(res.data.response.matchGroupResponseVMS[i].point==null||res.data.response.matchGroupResponseVMS[i].point==0){
          res.data.response.matchGroupResponseVMS[i].point=0.0
        }
      }
      console.log(res.data);
      if(res.data.response.matchGroupResponseVMS.length==0){
        that.setData({
        visible:true,
        visible1:false,
        visible2:false,
        visible3:false
        })
      }
      else if(res.data.response.matchGroupResponseVMS.length=1){
        that.data.person1.push(res.data.response.matchGroupResponseVMS[0]);
        that.setData({
          person1:that.data.person1,
          visible2:false,
          visible3:false,
        })}
      else if(res.data.response.matchGroupResponseVMS.length=2){
        that.data.person1.push(res.data.response.matchGroupResponseVMS[0]);
        that.data.person2.push(res.data.response.matchGroupResponseVMS[1]);
        that.setData({
          person1:that.data.person1,
          person2:that.data.person2,
          visible3:false,
        })
      }
      else if(res.data.response.matchGroupResponseVMS.length=3){
        that.data.person1.push(res.data.response.matchGroupResponseVMS[0]);
        that.data.person2.push(res.data.response.matchGroupResponseVMS[1]);
        that.data.person3.push(res.data.response.matchGroupResponseVMS[2]);
        that.setData({
          person1:that.data.person1,
          person2:that.data.person2,
          person3:that.data.person3
        })
      }
      },
      function(error){
        console.log(error);
      },
      {"Content-Type": "application/x-www-form-urlencoded"}
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.recommendPerson()
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