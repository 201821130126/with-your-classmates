// pages/dongTai/dongTai.js
let _page;
const server = require("../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    dongTai: "",
    empty: "快来发布第一条动态吧~",
    status: false,
    groupId: "",
    dongTaiList: [],
    showModalStatus2: false,
    reason: "",
    dongTaiId: 0,
    // 文字是否收起，默认收起
    ellipsis: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.queryMuldongTaileNodes()
    // console.log("res",res)
    //先设置参数
    this.setData({
      "groupId": options.id,
    })
  },

  /**
   * 收起/展开按钮点击事件
   */
  ellipsis() {
    _page = this;
    let value = !this.data.ellipsis;
    _page.setData({
      ellipsis: value
    })
  },

  //声明节点查询的方法
  // queryMuldongTaileNodes: function() {
  //   const query = wx.createSelectorQuery()                // 创建节点查询器 query
  //   query.select('#info').boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
  //   query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
  //   query.exec((res) => {
  //     // res[0].top                                          // #productServe节点的到页面顶部的距离
  //     // res[1].width                                        // #enterpriseServe节点的宽度
  //     res[0].height                                       // #normalServe节点的高度
  //   })
  // },

  bindinput0: function (e) {
    this.setData({
      dongTai: e.detail.value
    })
  },
  //添加动态,展示弹窗
  add: function (e) {
    var planId = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id)
    this.setData({
      showModalStatus: true,
      planadId: planId,
      dongTai: "",
    })

  },

  //提交动态信息到后台
  submit: function (e) {
    var that = this;
    var groupId = parseInt(that.data.groupId)
    var dongTai = that.data.dongTai;
    console.log("dongTai:", dongTai)
    var date = that.data.date;
    if (dongTai == ''||dongTai.trim().length==0) {
      wx.showToast({
        title: '内容不得为空',
        image: '/images/error.png',
        duration: 1000

      })
    } else {

      server.request('post', 'groupNews/insertGroupNews?', {
          "groupId": groupId,
          "userId": getApp().globalData.user_id,
          "comment": dongTai,
        },
        function (res) {
          console.log("insert", res)
          that.data.dongTaiList = []
          that.getAll()
          that.data.status = false;
          that.setData({
            showModalStatus: false,
            status: that.data.status,
            dongTaiList: that.data.dongTaiList,
          })

        })
    }

  },
  // 获取所有动态信息
  getAll: function () {
    var that = this;
    that.data.dongTaiList = []
    that.data.dongTai = "";
    var groupId = that.data.groupId
    server.request('post', 'groupNews/showGroupNews?', {
        "groupId": groupId,
        "userId": getApp().globalData.user_id,

      },
      function (res) {
        var all = res.data.response
        console.log("getdongTai", res)

        for (var i = 0; i < all.length; i++) {
          var Array = {
            comment: all[i].groupNews.comment,
            label: all[i].label,
            name: all[i].wxUser.nickName,
            dongTaiId: all[i].groupNews.id,
            avatarUrl: all[i].wxUser.avatarUrl,
            addTime: all[i].groupNews.addTime.replace('T', ' '),
          };
          that.data.dongTaiList = that.data.dongTaiList.concat(Array)
          that.setData({
            dongTaiList: that.data.dongTaiList
          })
        };

        // 如果没有认发布动态
        if (all.length == 0) {
          that.data.status = true;
        }

        that.setData({
          dongTaiList: that.data.dongTaiList,
          status: that.data.status
        })
        console.log("dongTai:", that.data.dongTaiList)
      })


  },
  close: function () {
    this.setData({
      showModalStatus: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  label: function (event) {
    var that = this;
    var groupId = that.data.groupId
    var dongTaiId = event.currentTarget.dataset.id;
    var dongTaiId = parseInt(dongTaiId)
    console.log("dongTaiId", dongTaiId, typeof dongTaiId)
    var dongTaiList = that.data.dongTaiList
    var index = event.currentTarget.dataset.idx;
    var label = dongTaiList[index].label
    console.log("label", label)


    if (label == "举报") {
      //举报动态，显示模态窗
      that.setData({
        showModalStatus2: true,
        dongTaiId: dongTaiId
      })

    } else { //删除动态
      server.request('get', 'groupNews/deleteNew?', {
          "newId": dongTaiId,
        },
        function (res) {
          console.log("删除：", res)
          if (res.data.message == "成功") {
            wx.showToast({
              title: '删除成功！',
              icon: 'none'
            })
          }

          that.data.dongTaiList = []
          that.getAll()
          that.setData({
            dongTaiList: that.data.dongTaiList
          })
        })

    }
  },
  // 举报理由
  bindinput: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  close: function (e) {
    this.setData({
      // dongTaiList:that.data.dongTaiList,
      showModalStatus2: false,
    })

  },
  // 提交举报原因
  submitReason: function (e) {
    var that = this;
    var dongTaiId = that.data.dongTaiId
    // var groupId = that.data.groupId
    var reason = that.data.reason
    console.log("reason:", reason)
    if (reason == ''||reason.trim().length==0) {
      wx.showToast({
        title: '理由不得为空',
        image: '/images/error.png',
        duration: 1000

      })
    } else {
      server.request('post', 'groupNews/reportNew?', {
          "newId": dongTaiId,
          "userId": getApp().globalData.user_id,
          "reportReason": reason,
        },
        function (res) {
          console.log("举报：", res)
          if (res.data.message == "成功") {
            wx.showToast({
              title: '举报成功',
              duration: 1000

            })
          }

          that.setData({
            // dongTaiList:that.data.dongTaiList,
            showModalStatus2: false,
          })
        })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAll()

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