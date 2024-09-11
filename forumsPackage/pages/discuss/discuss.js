const server = require("../../../services/server");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    forumId: '', //讨论区id
    forumName: "",
    isHide: true,
    default: 'https://www.cqcwangluo/static/images/picture.png',
    transformIdx: 0,
    position: 'center',
    duration: 300,
    show: false,
    overlay: false,
    // 帖子列表,搜索帖子
    postils: [],
    // 指引某一篇具体的帖子
    postil: "",
    search_postil: '',
    showModalStatus: false,
    nonSearchSentence: false, //指示搜索框里是否没有搜索字段
    themeColor: getApp().globalData.themeColor,
    // to_comment: false, //是否评论,true表示 是 ，false表示 否
    // to_like: false, //是否点赞,true表示 是 ，false表示 否
    inputValue: '',

  },
  inputPostil: function (e) {
    this.setData({
      search_postil: e.detail.value
    })
    console.log(e.detail.value)
  },
  searchPostil: function () {
    var that = this;
    if ((that.data.search_postil == '') || (that.data.search_postil.trim().length == 0)) //如果搜索框没有输入任何值
    {
      console.log('你还没有搜索任何讨论帖！')
      this.getAllforumNews(); //查出所有的讨论区

      wx.showModal({
        title: '注意',
        content: '你还没有搜索任何讨论帖！',
        showCancel: false,
      })
      that.setData({
        nonSearchSentence: true,
        inputValue:''
      })

    } else {
      // 如果搜索框输入值则向后端请求
      console.log(that.data.forumId)
      console.log(getApp().globalData.user_id)
      //that.data.search_postil用于取到data中search_forum的值
      server.request(
        'get',
        'forum/searchForumNews/' + that.data.search_postil + '?forumId=' + that.data.forumId + '&userId=' + getApp().globalData.user_id + '&', {

        }
        // )
        ,
        function (res) { //？？？对应的是接口名
          console.log(res.data);
          that.setData({
            // ifSearch: true,
            postils: res.data.response
          })
          console.log(res.data.response);

        },
        function (error) {
          //调用服务端登录接口失败
          console.log(error);
        },
        // {"Content-Type": "application/json"},
        // {"Content-Type": "application/x-www-form-urlencoded"}
      )

    }

  },
  /**
   * 展开讨论区
   */
  open: function () {
    this.setData({
      isHide: false,
    });
  },
  /**
   * 收起讨论区
   */
  close: function () {
    this.setData({
      isHide: true,
    });
  },

  // 去发送帖子页面
  ToSendPostil: function () {
    wx.navigateTo({
      url: '../../../forumsPackage/pages/sendPostil/sendPostil?forumName=' + this.data.forumName + '&forumId=' + this.data.forumId,
    })
  },
  // 去讨论区详情页
  ToDiscussDetail: function () {
    wx.navigateTo({
      url: '../discuss_detail/discuss_detail',
    })
  },
  dongTai: function () {
    wx.showModal({
      title: '提示',
      content: '正在开发中。。。',
    })
  },

  // 展示该讨论区的所有讨论帖
  getAllforumNews() {
    var that = this;
    wx.showToast({
      title: '加载讨论帖....',
      icon: 'loading',
      duration: 1000

    })

    server.request(
      'get',
      'forum/showForumNews?forumId=' + that.data.forumId + '&userId=' + getApp().globalData.user_id + '&', {

      },
      function (res) { //？？？对应的是接口名
        console.log(res.data.response)
        if (res.statusCode == 200) {

          that.setData({
            postils: res.data.response,
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      }
    )
  },

  // 点击帖子显示帖子内容时用
  showNext(e) {
    var that = this;
    const idx = e.currentTarget.dataset.idx
    this.setData({
      show: true,
      // contact: contacts[idx],
      postil: that.data.postils[idx],
      transformIdx: idx
    })
  },
  // 返回帖子列表时用
  showPrev() {
    this.setData({
      show: false
    })
  },
  // 跳转到查看帖子详情页
  showPostDetail() {
    var that = this;
    wx.navigateTo({
      url: '../discuss_detail/discuss_detail?forumNewsId=' + that.data.postil.id + '&forumName=' + that.data.forumName,
    })
    // server.request(
    //   'get',
    //   'forum/checkforumDetail?forumNewsId=' + that.data.postil.id + '&', 
    //   {
    //     // "token": getApp().globalData.token,
    //   }
    //   // )
    //   ,
    //   function (res) { //？？？对应的是接口名
    //     that.setData({
    //       // ifSearch: true,
    //       postils: res.data.response
    //     })
    //     console.log(res.data.response);

    //   },
    //   function (error) {
    //     //调用服务端登录接口失败
    //     console.log(error);
    //   },
    //   // {"Content-Type": "application/json"},
    //   // {"Content-Type": "application/x-www-form-urlencoded"}
    // )

  },

  onBeforeEnter(res) {
    console.log(res)
  },
  onEnter(res) {
    console.log(res)
    // 进入中设置页面容器
    this.setData({
      // 让页面容器显示
      "show": true,
    })
  },
  onAfterEnter(res) {
    console.log(res)
  },
  onBeforeLeave(res) {
    console.log(res)
  },
  onLeave(res) {
    console.log(res)
    // 离开中设置页面容器为false
    this.setData({
      // 让页面容器不显示
      "show": false,
      "inputValue": '',
    })
  },
  onAfterLeave(res) {
    console.log(res)

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 先设置参数
    this.setData({
      "forumId": options.forumId,
      "forumName": options.forumName
    })
    // 这个函数要用到设置的参数
    this.getAllforumNews();
    console.log(options.forumId)
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
    this.setData({
      // 让页面容器不显示
      "show": false,
      "inputValue": '',
    })
    this.getAllforumNews();
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
    this.setData({
      inputValue:''
    })
    this.getAllforumNews();
    wx.stopPullDownRefresh(); //停止下拉刷新
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