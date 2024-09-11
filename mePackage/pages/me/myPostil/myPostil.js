
const server = require("../../../../services/server");
Page({
  data: {
    navTab: ["我的发帖", "我的评论"],
    currentNavtab: "0",
    mypostil: [],
    mypostil_length: 0,
    mypostil_addTime: [], //发帖列表中依次发帖的时间
    mycomment:[],//我的评论列表
    mycomment_length: 0,//我的评论目录
    // 测试数据
    feed: [],
    feed_length: 0,
  },
  getMyPostil: function () {
    var that = this;
    server.request(
      'POST',
      'personal/forumShow?', {
        "id": getApp().globalData.user_id,
      },
      function (res) {
        console.log(res);
        var mypostil = res.data.response;
        for (var i = 0; i < mypostil.length; i++) {
          var addTime = {
            "addTime": mypostil[i].addTime.replace('T', ' ')
          }
          that.setData({
            "mypostil_addTime": that.data.mypostil_addTime.concat(addTime),
          });

        }
        // 获得我的发帖列表中依次发帖的时间
        console.log(that.data.mypostil_addTime);
        that.setData({
          "mypostil": mypostil,
          "mypostil_length": mypostil.length,
        });
      },
      function (error) {
        //调用服务端登录接口失败
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )

  },
  getMyComment: function () {
    var that = this;
    server.request(
      'POST',
      'personal/commentShow?', {
        "id": getApp().globalData.user_id,
      },
      function (res) {
        console.log(res);
        var mycomment = res.data.response;
        // 获得我的发帖列表中依次发帖的时间
        console.log(res.data);
        that.setData({
          "mycomment": mycomment,
          "mycomment_length": mycomment.length,
        });
      },
      function (error) 
      {
        //调用服务端登录接口失败
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getMyPostil();
    this.getMyComment();
    // this.refresh();
  },
  switchTab: function (e) {
    var idx = e.currentTarget.dataset.idx;
    if(idx == 0){
      this.getMyPostil();
    }
    else{
      this.getMyComment();
    }
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  toDiscussDetail: function (e) {
    var forumnewsid = e.currentTarget.dataset.forumnewsid;
    var forumname = e.currentTarget.dataset.forumname;
    wx.navigateTo({
      url: '../../../../forumsPackage/pages/discuss_detail/discuss_detail?forumNewsId=' + forumnewsid + '&forumName=' + forumname,
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    // util.getDiscovery;
    var feed = discovery;
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },

  // //使用本地 fake 数据实现继续加载效果
  // nextLoad: function(){
  //   var next = util.discoveryNext();
  //   console.log("continueload");
  //   var next_data = next.data;
  //   this.setData({
  //     mypostil: this.data.mypostil.concat(next_data),
  //     mypostil_length: this.data.mypostil_length + next_data.length
  //   });
  // }
});