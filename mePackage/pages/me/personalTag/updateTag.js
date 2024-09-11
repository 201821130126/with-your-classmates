const server = require("../../../../services/server");
// const server = require("../../services/server");
var app=getApp()
// pages/personalTag/updateTag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedTags:[],
    tagList:[],
    deleteList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSelectedTag()
  },

  getSelectedTag:function(){
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
      server.request(
        'POST',
        'personal/getSelectedTag?',
        {
          "id":getApp().globalData.user_id
        },
        function(res){
          // console.log(res.data),
          // console.log(res.data.response.selectedTags),
          that.data.selectedTags=res.data.response.selectedTags,
          console.log(that.data.selectedTags),
          wx.hideLoading({
            success: (res) => {},
          })
          that.setData({
            selectedTags:that.data.selectedTags
          })
        },
        function(error){
          console.log(error);
          console.log(app.globalData.token);
          console.log(app.globalData.user_id)
        },
        {"Content-Type": "application/x-www-form-urlencoded"}
      )
  },
 
  delete:function(e){
    for(var i=0;i<this.data.selectedTags.length;i++){
      if(this.data.selectedTags[i].id==e.currentTarget.dataset.id){
        getApp().globalData.index1=i,
        console.log(getApp().globalData.index1)
      }
    };
    this.data.deleteList.push(this.data.selectedTags[getApp().globalData.index1])
    this.data.selectedTags.splice(getApp().globalData.index1,1);
    this.setData({
      selectedTags:this.data.selectedTags,
      dedeleteList:this.data.deleteList
    })
    console.log(this.data.selectedTags)
    console.log(this.data.deleteList)
  },

  onSubmit:function(){//选择个人标签
    var that=this;
    for(var i=0;i<that.data.deleteList.length;i++){
      that.data.tagList.push(that.data.deleteList[i].id)
    };
    console.log(that.data.tagList);
    that.setData({
      tagList:that.data.tagList
    });
    server.request(
      'POST',
      'personal/submitTag?',
      {
        "id":getApp().globalData.user_id,
        "cancelList":that.data.tagList,
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        wx.showToast({
          title:'标签修改成功！',
          icon:'success',
          duration:2000
          })
      },
      function (error) {
        //调用服务端登录接口失败
      },
      {"Content-Type": "application/x-www-form-urlencoded"},
      wx.switchTab({
        url:'../../../../pages/me/me',
        // url:'../message/message?state='+state,
      })
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