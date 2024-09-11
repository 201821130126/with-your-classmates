const server = require("../../../../services/server");

// example/fdback/fdback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  adviceInput:"",
  phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  advice:function(e){
    var input=e.detail.value;//获取当前表单元素输入框内容
    this.setData({
      adviceInput:input
    })
    console.log(this.data.adviceInput)
  },

  phone:function(e){
    var input=e.detail.value;//获取当前表单元素输入框内容
    this.setData({
      phone:input
    })
    console.log(this.data.phone)
  },

  onSubmit:function(){
    var that = this;
    server.request(
      'POST',
      'personal/submitFeedback?',
      {
        "id":getApp().globalData.user_id,
        "content":that.data.adviceInput,
        "contact":that.data.phone,
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        
        if(res.data.message=="成功"){
          wx.switchTab({
            url:'../../../../pages/me/me',
          })
          wx.showModal({
            content:'反馈提交成功',
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