const server = require("../../services/server");

// pages/makeTeam/makeTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //登录部分涉及的页面初始数据 
    userInfo: {},
    hasUserInfo: false,
    code: '', //临时登录凭证

    empty: false,

    movies: [],
    groupList: [],
    background: "#ff8882",

    // 队伍按钮
    flag: true,
    // 消息
    allTeamMessaged: [],
    allTeamMessagedY: [],
    allTeamMessagedN: [],
    allPersonMessage: [],
    allTeamMessage: [],
    allPersonReturnY: [],
    allTeamReturnY: [],
    allPersonReturnN: [],
    allTeamReturnN: [],

    allTeamLen: -1, //队伍长度

    ifTokenOutdate: false, //当且仅当，登录过一次，但停留很久后,token失效才会出现ifTokenOutdate==false的情况

  },
  change1: function () {

    this.setData({
      "flag": true,
    })

  },
  change2: function () {

    this.setData({
      "flag": false,
    })

    wx.navigateTo({
      url: '../../schedulePackage/pages/systemTeam/systemTeam',
    })
  },

  compInfo: function (event) {
    var compId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../schedulePackage/pages/compInfo/compInfo?id=' + compId,
    })
  },

  dongTai: function (event) {
    var groupId = event.currentTarget.dataset.id;
    console.log("groupId", groupId)
    // 根据groupId查找deadline
    var data = this.data.groupList.filter(function (item) {
      return item.groupId == groupId
    })
    var deadline = data[0].deadline
    var addTime = data[0].addTime
    var groupName = data[0].groupName
    console.log("deadline", deadline)
    var that = this;
    var groupList = that.data.groupList
    var groupId = event.currentTarget.dataset.id;
    var groupId = parseInt(groupId)
    console.log("groupId", groupId, typeof groupId)
    // 根据groupId查找label
    var data = groupList.filter(function (item) {
      return item.groupId == groupId
    })
    var label = data[0].label
    console.log("data", data)
    console.log("label", label)
    if (label == "去评分") { //去评分
      wx.navigateTo({
        url: '../schedule/score/score?id=' + groupId,
        // url: '../schedule/groupInfo/groupInfo?id='+groupId+'&deadline='+deadline,
      })
    } else { //邀请or已满

      wx.navigateTo({
        url: '../../schedulePackage/pages/groupInfo/groupInfo?id=' + groupId + '&deadline=' + deadline + '&addTime=' + addTime + '&groupName=' + groupName,
      })

    }

  },


  // 获取所有组队信息
  getAllteam: function () {
   
    var that = this;

    if (wx.getStorageSync('user_id') == '') {
      // getal
    } else {
      that.setData({
        movies: [],
        groupList: [],
      })
      that.data.groupList = []
      console.log("getApp().globalData.user_id:", getApp().globalData.user_id)
      server.request('get', 'group/showGroup?',
        {
          id: getApp().globalData.user_id
          //  id:20
        },
        function (res) {
          wx.hideLoading({
            success: (res) => {},
          })
          console.log(res)
          if (res.data.errno == '501') {
            // !!!!!!!!!!!
            console.log(12)
            getApp().globalData.ifTokenOutdate = true
            that.setData({
              "ifTokenOutdate": true,
            })
          } else {
            getApp().globalData.ifTokenOutdate = false
            that.setData({
              "ifTokenOutdate": false,
            })
            var allTeam = res.data.response;
            console.log("getAllteam", res)
            console.log(res.data.response)
            var deadlineD = [];
            console.log(allTeam)
            that.setData({
              "allTeamLen": allTeam.length
            })
            if (that.data.allTeamLen == 0) {
              that.setData({
                empty: true,
              })
            } else {

              for (var i = 0; i < allTeam.length; i++) {
                if (allTeam[i].label == "去评分") {
                  var isShow = true;

                } else {
                  var isShow = false;
                }
                var timeFromDdl = allTeam[i].timeFromDdl;
                // 剩余7天内就显示
                if (timeFromDdl <= 7 && timeFromDdl != 0) {
                  var leave = true;
                } else {
                  var leave = false;
                }
                if (allTeam[i].group.groupName.length > 6) {
                  var pinjie = "..."
                } else {
                  var pinjie = ''
                }
                // console.log("length", allTeam[i].group.groupName.length) 
                var groupArray = {
                  groupName1: allTeam[i].group.groupName.substring(0, 6) + pinjie,
                  groupName: allTeam[i].group.groupName,
                  memNum: allTeam[i].group.memNum,
                  fullMem: allTeam[i].group.fullMem,
                  status: allTeam[i].group.status,
                  groupImage: 'https://www.cqcwangluo.site/static' + allTeam[i].group.groupImage,
                  groupId: allTeam[i].group.id,
                  deadline: allTeam[i].group.deadline.substring(0, 10),
                  addTime: allTeam[i].group.addTime.substring(0, 10),
                  tagName: allTeam[i].tag,
                  tagId: allTeam[i].group.tag,
                  label: allTeam[i].label,
                  timeFromDdl: timeFromDdl,
                  isShow: isShow,
                  leave: leave,
                };

                that.data.groupList = that.data.groupList.concat(groupArray)

                // deadlineD.push(that.data.groupList.deadline.substring(0,9))
                that.setData({
                  groupList: that.data.groupList,
                  empty: false,
                })
              };
            }
            console.log("empty", that.data.empty)
            console.log("deadlineD", deadlineD)
            console.log("grouplist:", that.data.groupList)

            // 停止下拉动作
            wx.stopPullDownRefresh();

          }
        });
    }

  },

  // 如果是 去评分
  score: function (event) {
    var that = this;
    var groupList = that.data.groupList
    var groupId = event.currentTarget.dataset.id;
    var groupId = parseInt(groupId)
    console.log("groupId", groupId, typeof groupId)
    // 根据groupId查找label和groupName
    var data = groupList.filter(function (item) {
      return item.groupId == groupId
    })
    var label = data[0].label
    console.log(data)
    var groupName = data[0].groupName
    console.log("groupName:", groupName)
    var groupTag = data[0].tagId
    var deadline = data[0].deadline
    var addTime = data[0].addTime
    console.log("label", label)
    if (label == "去评分") { //去评分
      wx.navigateTo({
        // url: '../schedule/invite/invite?id=' + groupId +'&groupName='+ groupName + '&groupTag='+ groupTag,
        url: '../../schedulePackage/pages/score/score?id=' + groupId,
        // url: '../schedule/groupInfo/groupInfo?id=' + groupId,
        // url: '../schedule/invite/invite?id=' + groupId +'&groupName='+ groupName + '&groupTag='+ groupTag,
      })
    } else if (label == "邀请") { //邀请组队   
      wx.navigateTo({
        url: '../../schedulePackage/pages/invite/invite?id=' + groupId + '&groupName=' + groupName + '&groupTag=' + groupTag,
      })
    } else {
      wx.navigateTo({
        url: '../../schedulePackage/pages/groupInfo/groupInfo?id=' + groupId + '&deadline=' + deadline + '&addTime=' + addTime + '&groupName=' + groupName,
      })

    }
  },


  // 获取赛事信息
  getCom: function () {
    var that = this;
    that.data.movies = []
    server.request('get', 'comp/getHomePage?', {},
      function (res) {
        console.log("getCom", res)
        // console.log("getCom",res.data.response[0].compCoverPath)
        var allCom = res.data.response;
        for (var i = 0; i < allCom.length; i++) {
          var comArray = {
            compId: allCom[i].compId,
            compCoverPath: allCom[i].compCoverPath,
          };
          that.data.movies = that.data.movies.concat(comArray)
          that.setData({
            movies: that.data.movies
          })
        };
        console.log("movies", that.data.movies)
      })
  },

  // ！！！登录相关
  postLogin: function (loginParams) {
    var that = this;
    server.request(
      'POST',
      'student/wx/login?', { //返回给服务端的参数
        code: loginParams.code, //临时登录凭证
        rawData: loginParams.rawData, //用户非敏感信息
        signature: loginParams.signature, //签名
        encrypteData: loginParams.encryptedData, //用户敏感信息
        iv: loginParams.iv //解密算法的向量
      },
      function (res) {
        console.log('打印调用小程序接口登录的返回值')
        console.log(res)
        // 7.小程序存储skey（自定义登录状态）到本地
        // 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
        // 储存

        // console.log(res.data);
        wx.setStorageSync('token', res.data.response.token);
        wx.setStorageSync('user_id', res.data.response.user_id);
        // 获得
        // var value = wx.getStorageSync('userInfo')
        console.log(wx.getStorageSync('user_id'))
        console.log(wx.getStorageSync('token'))
        // 储存全局的token
        getApp().globalData.token = res.data.response.token
        getApp().globalData.user_id = res.data.response.user_id
        console.log(getApp().globalData.token)
        console.log(getApp().globalData.user_id)
        that.setData({
          "hasUserInfo": true,
          movies: [],
          groupList: [],
          allPersonReturnN: [],
          allPersonReturnY: [],
          allTeamReturnN: [],
          allTeamReturnY: [],
          allTeamMessage: [],
          allPersonMessage: [],
          allTeamMessaged: [],
          allTeamMessagedY: [],
          allTeamMessagedN: []
        })
        that.tap() //调用接口获取数据
        that.getAllteam()
        that.getCom()
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      }
    )

  },


  login(e) {
    var that = this;
    // 执行登录操作
    wx.login({
      success: (res) => {
        that.setData({
          "code": res.code,
        })
        console.log(1)
      },
    });
  },

  // 请求用户授权
  getUserProfile(e) {
    var that = this;
    // 获取用户信息
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用户登录',
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo);
        that.setData({
          "userInfo": res.userInfo,
        })
        let loginParams = {
          code: that.data.code,
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          signature: res.signature
        };
        that.postLogin(loginParams);
        console.log(loginParams)
      },
      // 失败回调
      fail: () => {
        // 弹出错误
        console.log('已拒绝小程序获取信息')
        App.showError('已拒绝小程序获取信息');
      }
    });

  },

  // 再次登录
  reLogin: function (e) {
    var that = this;
    // 先获得临时登录凭证再登录 
    new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          that.setData({
            "code": res.code,
          })
          resolve(that.data.code)
        },
      });
    }).then(res => {
      //res就是resolve传过来的that.data.a，都可以用
      console.log('传值res', res)
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          var code = that.data.code; //临时登录凭证
          var rawData = res.rawData; //用户非敏感信息
          var signature = res.signature; //签名
          var encrypteData = res.encryptedData; //用户敏感信息
          var iv = res.iv //解密算法的向量
          server.request(
            'POST',
            'student/wx/login?', { //返回给服务端的参数
              code: code, //临时登录凭证
              rawData: rawData, //用户非敏感信息
              signature: signature, //签名
              encrypteData: encrypteData, //用户敏感信息
              iv: iv //解密算法的向量
            },
            function (res) {
              console.log('打印调用小程序接口登录的返回值')
              console.log(res)
              // 7.小程序存储skey（自定义登录状态）到本地
              // 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
              // 储存
              wx.setStorageSync('token', res.data.response.token);
              wx.setStorageSync('user_id', res.data.response.user_id);
              // 获得
              // var value = wx.getStorageSync('userInfo')

              // 储存全局的token
              getApp().globalData.token = res.data.response.token
              getApp().globalData.user_id = res.data.response.user_id

              that.setData({
                "hasUserInfo": true,
                movies: [],
                groupList: [],
                allPersonReturnN: [],
                allPersonReturnY: [],
                allTeamReturnN: [],
                allTeamReturnY: [],
                allTeamMessage: [],
                allPersonMessage: [],
                allTeamMessaged: [],
                allTeamMessagedY: [],
                allTeamMessagedN: []
              })
              that.tap() //调用接口获取数据
              that.getAllteam()
              that.getCom()
            },
            function (error) {
              //调用服务端登录接口失败
              console.log(error);
            }
          )


        }
      })

    })
  },

  //查询未读消息数目
  tap: function (e) {
    var that = this;
    if (wx.getStorageSync('user_id') == '') {

    } else {
      server.request(
        'get',
        'message/getMessage/' + getApp().globalData.user_id + '?', //+getApp().globalData.user_id,//6//16//18
        {
          user_id: getApp().globalData.user_id
        },
        function (res) {
          console.log(res.data)
          // console.log(res.data.response.length)
          console.log(res.data.response)
          that.setData({
            allMessage: res.data.response,
            // messageNum:that.data.messageNum
          })
          for (var i = 0; i < res.data.response.length; i++) {
            if (that.data.allMessage[i].type == 2) {
              that.data.allTeamMessage.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 1) {
              that.data.allPersonMessage.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 4) {
              that.data.allPersonReturnY.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 6) {
              that.data.allPersonReturnN.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 3) {
              that.data.allTeamReturnY.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 5) {
              that.data.allTeamReturnN.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 7) {
              that.data.allTeamMessaged.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 8) {
              that.data.allTeamMessagedY.push(that.data.allMessage[i])
            } else if (that.data.allMessage[i].type == 9) {
              that.data.allTeamMessagedN.push(that.data.allMessage[i])
            }
          }
          that.setData({
            allTeamMessaged: that.data.allTeamMessaged,
            allTeamMessagedY: that.data.allTeamMessagedY,
            allTeamMessagedN: that.data.allTeamMessagedN,
            allTeamMessage: that.data.allTeamMessage,
            allPersonMessage: that.data.allPersonMessage,
            allPersonReturnY: that.data.allPersonReturnY,
            allTeamReturnY: that.data.allTeamReturnY,
            allPersonReturnN: that.data.allPersonReturnN,
            allTeamReturnN: that.data.allTeamReturnN
          })
          for (var i = 0; i < that.data.allTeamMessage.length; i++) {
            if (that.data.allTeamMessage[i].readed == true) {
              that.data.allTeamMessage[i].readed = "已确认"
            } else if (that.data.allTeamMessage[i].readed == false) {
              that.data.allTeamMessage[i].readed = "等待确认",
                // that.data.messageNum=that.data.messageNum+1,
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } //加入队伍消息状态
          for (var i = 0; i < that.data.allPersonMessage.length; i++) {
            if (that.data.allPersonMessage[i].readed == true) {
              that.data.allPersonMessage[i].readed = "已确认"
            } else if (that.data.allPersonMessage[i].readed == false) {
              that.data.allPersonMessage[i].readed = "等待确认",
                // that.data.messageNum=that.data.messageNum+1,
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } //邀请组队消息状态//统计未读消息,若readed值为"等待确认"

          for (var i = 0; i < that.data.allTeamMessaged.length; i++) {
            if (that.data.allTeamMessaged[i].readed == true) {
              that.data.allTeamMessaged[i].readed = "已确认"
            } else if (that.data.allTeamMessaged[i].readed == false) {
              that.data.allTeamMessaged[i].readed = "等待确认",
                // that.data.messageNum=that.data.messageNum+1,
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } //队伍邀请组队信息状态

          that.setData({
            allTeamMessagedY: that.data.allTeamMessagedY,
            allTeamMessagedN: that.data.allTeamMessagedN,
            allTeamMessage: that.data.allTeamMessage,
            allTeamMessaged: that.data.allTeamMessaged,
            allPersonMessage: that.data.allPersonMessage,
            allPersonReturnY: that.data.allPersonReturnY,
            allTeamReturnY: that.data.allTeamReturnY,
            allPersonReturnN: that.data.allPersonReturnN,
            allTeamReturnN: that.data.allTeamReturnN,
            // messageNum:that.data.messageNum
          })
          // console.log(that.data.allTeamMessage)
          console.log(getApp().globalData.messageNum)
          if (getApp().globalData.messageNum != 0) {
            wx.showTabBarRedDot({
              index: 3,
            })
          }
        },
        function (error) {
          console.log(error);
          console.log(app.globalData.token);
          console.log(app.globalData.user_id)
        }
      )
    }
  },

  tokenOut(e) {
    console.log(123)
    console.log(123)
    var that = this;
    // // 储存全局的token和userId
    that.reLogin();
    that.setData({
      "hasUserInfo": true,
      movies: [],
      groupList: [],
      ifTokenOutdate:false
      // 此时不会调用弹窗授权
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 登录部分改动，如果已经授权过，就直接进入小程序，否则先授权，然后再进入小程序
    var that = this;
    var temp_userId = wx.getStorageSync('user_id');
    if (temp_userId == '') { //如果当前用户没有登录过
      that.setData({
        "hasUserInfo": false,
        // 此时会让你重新授权登录
      })

    } else //如果当前已经登录过
    // if(that.getUserFromDB(temp_token))//如果当前用户已经登录过
    {
      wx.showLoading({
        title: '加载中...',
      })
      // // 储存全局的token和userId
      that.reLogin();
      that.setData({
        "hasUserInfo": true,
        movies: [],
        groupList: [],
        // 此时不会调用弹窗授权
      })
      // that.setData({
      //   "hasUserInfo": false,
      //   // 此时会让你重新授权登录
      // })

    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      "movies": [],
      "groupList": [],
      // 此时不会重新授权，且该有的值都有了
    })
    getApp().globalData.messageNum = 0;
    this.tap();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      "flag": true,
      movies: [],
      groupList: [], // 此时不会重新授权，且该有的值都有了
    })
    if (getApp().globalData.Flag) {
      // getApp().globalData.Flag = false;
      this.data.allPersonReturnN = [];
      this.data.allPersonReturnY = [];
      this.data.allTeamReturnN = [];
      this.data.allTeamReturnY = [];
      this.data.allTeamMessage = [];
      this.data.allPersonMessage = [];
      this.data.allTeamMessaged = [];
      this.data.allTeamMessagedY = [];
      this.data.allTeamMessagedN = [];
      this.tap(); //调用接口获取数据
    }
    // 获得竞赛队伍要放在组队前面
    this.getCom()
    this.getAllteam()

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
    this.getCom()
    this.getAllteam()
    wx.showToast({
        title: '刷新中',
        icon: 'loading',
        duration: 1000
      }),
      wx.stopPullDownRefresh(); //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // // this.getAllteam()
    // this.getCom()
    // this.getAllteam()
    // wx.showToast({
    //   title: '刷新中',
    //   icon: 'loading',
    //   duration: 1000
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 点击 tab 时触发
  onTabItemTap(item) {

  }
})