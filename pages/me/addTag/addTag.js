// example/fdback/fdback.js
const server = require("../../../services/server");
const image_url = 'https://www.cqcwangluo.site/static/images/'
// const util = require("../../utils/util")
// pages/teaminfo/teaminfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url: 'https://www.cqcwangluo.site/static/images/',
    visible2: false,
    tag: '',
    reason: '',
    isReasonNull: true,
    isTagNull: true,
    disabled: true
  },

  detail: function () {
    wx.navigateTo({
      url: '../addTag/index'
    })
  },

  overseaStudy: function () {
    wx.navigateTo({
      url: '../addTag/index1'
    })
  },

  lan: function () {
    wx.navigateTo({
      url: '../addTag/index2'
    })
  },

  finance: function () {
    wx.navigateTo({
      url: '../addTag/index3'
    })
  },

  gover: function () {
    wx.navigateTo({
      url: '../addTag/index4'
    })
  },

  education: function () {
    wx.navigateTo({
      url: '../addTag/index5'
    })
  },

  heart: function () {
    wx.navigateTo({
      url: '../addTag/index6'
    })
  },

  manage: function () {
    wx.navigateTo({
      url: '../addTag/index7'
    })
  },

  law: function () {
    wx.navigateTo({
      url: '../addTag/index8'
    })
  },

  trans: function () {
    wx.navigateTo({
      url: '../addTag/index10'
    })
  },

  insure: function () {
    wx.navigateTo({
      url: '../addTag/index9'
    })
  },

  work: function () {
    wx.navigateTo({
      url: '../addTag/index11'
    })
  },

  tap: function () {
    this.data.visible2 = true;
    this.setData({
      visible2: this.data.visible2
    })
  },


  addTag: function () {
    var that = this;
    console.log(that.data.tag),
      console.log(that.data.reason),
      server.request(
        'POST',
        'personal/appealTag?', {
          "userId": getApp().globalData.user_id,
          "reason": that.data.reason,
          "tagName": that.data.tag,
        },
        function (res) {
          console.log(res.data);
          // wx.showModal({
          //   showCancel: false,
          //   content: res.data.message,
          // })
          wx.showModal({
            title: '',
            content: res.data.message,
            showCancel: false,//是否显示取消按钮
         })
        },
        function (error) {
          console.log(error);
        }, {
          "Content-Type": "application/x-www-form-urlencoded"
        },

      ),
      this.data.visible2 = false;
    this.setData({
      visible2: this.data.visible2,
      disabled: true
    })
  },

  tagInput: function (e) {
    var input = e.detail.value; //获取当前表单元素输入框内容
    if (input) {
      this.setData({
        tag: e.detail.value,
        isTagNull: false
      })
      if (this.data.isTagNull == false && this.data.isReasonNull == false) {
        this.setData({
          disabled: false
        })
      }
    } else {
      this.setData({
        isTagNull: true,
        disabled: true
      })
      if (this.data.isTagNull == false && this.data.isReasonNull == false) {
        this.setData({
          disabled: false
        })
      }
      wx.showToast({
        title: '标签不能为空',
        icon: "none",
        duration: 2000
      })
    }
  },

  reasonInput: function (e) {
    var input = e.detail.value; //获取当前表单元素输入框内容
    if (input) {
      this.setData({
        reason: e.detail.value,
        isReasonNull: false
      })
      if (this.data.isTagNull == false && this.data.isReasonNull == false) {
        this.setData({
          disabled: false
        })
      }
    } else {
      this.setData({
        isReasonNull: true,
        disabled: true
      })
      if (this.data.isTagNull == false && this.data.isReasonNull == false) {
        this.setData({
          disabled: false
        })
      }
      wx.showToast({
        title: '理由不能为空',
        icon: "none",
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  cancle: function () {
    this.data.visible2 = false;
    this.setData({
      visible2: this.data.visible2
    })
  },

  onSubmit: function () {},

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