const server = require("../../services/server");
// pages/discussion/discussion.js
//获取应用实例
var app = getApp()
Page({
  data: {
 
    forums:[],//所有大类标签的讨论区列表
    // currforums:'',//当前展开的讨论区大类列表
    // currType:'',//当前点击的讨论区大类标签
    search_forum: '',
    themeColor: app.globalData.themeColor,
    showModalStatus: false,
    nonSearchSentence: false, //指示搜索框里是否没有搜索字段
    // 申诉讨论区名
    appealforumName: '',
    // 申诉讨论区描述
    appealdescription: '',
  },
  dongTai: function () {
    wx.showModal({
      title: '提示',
      content: '正在开发中。。。',
    })
  },
  // 没有填写任何文本就搜索时弹框，点击弹框按钮“确认”时
  tapDialogButton(e) {
    this.setData({
      nonSearchSentence: false
    })
  },
  inputforum: function (e) {
    this.setData({
      search_forum: e.detail.value
    })
    console.log(e.detail.value)
  },
  searchforum: function () {
    var that = this;
    if ((that.data.search_forum == '')||(that.data.search_forum.trim().length==0)) //如果搜索框没有输入任何值
    {
      console.log('你还没有搜索任何讨论区！')
      this.getAllforums(); //查出所有的讨论区

      wx.showModal({
        title: '注意',
        content: '你还没有搜索任何讨论区！',
        showCancel: false,
      })
      that.setData({
        nonSearchSentence: true,
        searchforum:''
      })

    } else {
      // 如果搜索框输入值则向后端请求

      //that.data.search_forum用于取到data中search_forum的值
      server.request(
        'get',
        'forum/searchForum/' + that.data.search_forum + '?', {
          "token": getApp().globalData.token,
        }
        // )
        ,
        function (res) { //？？？对应的是接口名
      
          that.setData({
            // ifSearch: true,
            "forums": res.data.response
          })
          console.log(res.data.response);
          console.log(res);

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
  ToAccuse: function () {
    wx.navigateTo({
      url: '../forums/accuse/accuse',

    })
  },
  ToDiscuss: function (event) {
    console.log(event);
    var forumId = event.currentTarget.dataset.id;
    var forumName = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: "../../forumsPackage/pages/discuss/discuss?forumId=" + forumId + "&forumName=" + forumName,
      // url: "../forums/discuss/discuss",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getAllforums() {
    var that = this;
    server.request(
      'get',
      'forum/selectForum?', {
        // "token": getApp().globalData.token
      },
      function (res) { //？？？对应的是接口名
        // that.data.forums = res.data.response;
        var forums = res.data.response;
        for (var i = 0, len = forums.length; i < len; ++i) {
          forums[i].hidden = true;//给讨论区另外添加一个hidden字段，并设置初始值为true
        }
        that.setData({
          "forums": forums,
        })
        console.log(res);
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      }
    )
  },

  forumclick: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type,
    forums = that.data.forums;
    console.log(type)
    console.log(e)

    for (var i = 0, len = forums.length; i < len; ++i) {
      if (forums[i].type == type) {
        forums[i].hidden = !forums[i].hidden;//设置该讨论区为隐藏或显示
       
      }
    }
    that.setData({
      "forums": forums
    });

  },

  onLoad: function (options) {
    this.getAllforums();
    this.setData({
      logged: true,
      userInfo: app.globalData.userInfo,
      url: app.globalData.url //服务器端的url
    })



  },

  // 申诉功能 
  // 小窗口显示
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    // 对应的是data-statu
    this.util(currentStatu)
  },
  // 设置弹窗部分的动画
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 60, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 60)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(e.detail.value.forumName, e.detail.value.description);
    server.request(
      'post',
      'forum/appealForum?', {
        "appealForumName": e.detail.value.forumName,
        "appealReason": e.detail.value.description,
        "userId": getApp().globalData.user_id,
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        console.log(e.detail.value.forumName);
        console.log(e.detail.value.description);
        console.log(getApp().globalData.user_id)
        if (res.data.message == '成功') {
          wx.showToast({
            title: '申诉成功',
            icon: 'success',
            duration: 2000
          })
          // that.getAllforums(); //申诉完成后再查一次所有讨论区
        }
        else{
          wx.showModal({
            content:res.data.message,
            showCancel: false
          });
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
        wx.showToast({
          title: '失败，请重试！',
          icon: 'error',
          duration: 2000
        })
      }
    )

  },
  formReset: function () {
    console.log('form发生了reset事件')
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
    this.getAllforums();
    this.setData({
      searchforum:'',
      logged: true,
      userInfo: app.globalData.userInfo,
      url: app.globalData.url //服务器端的url
    })
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    }),
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

  },

  // 点击 tab 时触发
  onTabItemTap(item) {
    this.getAllforums();
    this.setData({
      logged: true,
      userInfo: app.globalData.userInfo,
      url: app.globalData.url, //服务器端的url
      searchforum: '',
    })
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
  }

})