// pages/message/message.js
const server = require("../../services/server");
const util = require("../../utils/util");
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allTeamMessaged: [],
    allTeamMessagedY: [],
    allTeamMessagedN: [],
    allPersonMessage: [],
    allTeamMessage: [],
    allPersonReturnY: [],
    allTeamReturnY: [],
    allPersonReturnN: [],
    allTeamReturnN: [],
    allAdmainMessage: [],
    systemMessage: [],
    allMessage:[],
    messageNum: 0,
    number:0,
    isTeamVisible: false,
    isSysVisible: true,
    temp: '',
    flag: true,
    // 用于控制四条消息的开合
    flag1:false,
    flag2:false,
    flag3:false,
    flag4:false,
    // 用于控制3条消息类别是否有等待确认的消息
    ifCheck1:false,
    ifCheck2:false,
    ifCheck3:false,
    // waiteToConfirm:"等待确认",
    confirm: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  hide:function(){
    this.data.flag1=!this.data.flag1;
    this.setData({
      flag1:this.data.flag1
    })
  },
  hide1:function(){
    this.data.flag2=!this.data.flag2;
    this.setData({
      flag2:this.data.flag2
    })
  },
  hide2:function(){
    this.data.flag3=!this.data.flag3;
    this.setData({
      flag3:this.data.flag3
    })
  },
  hide3:function(){
    this.data.flag4=!this.data.flag4;
    this.setData({
      flag4:this.data.flag4
    })
  },
  tap: function (e) {
    var that = this;
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
        for(var i=0;i<res.data.response.length;i++){
          res.data.response[i].createTime=res.data.response[i].createTime.substr(0,10)
          var newstr = res.data.response[i].createTime.replace(/-/g,'/'); 
          var date =  new Date(newstr); 
          var time_str = date.getTime().toString();//消息创建时间
          var newstr1 = util.formatDate(new Date()).replace(/-/g,'/'); //获取当前日期
          var date1 =  new Date(newstr1); 
          var time_str1 = date1.getTime().toString();//当前日期的时间戳
        if(time_str1.substr(0, 10)-time_str.substr(0, 10)<=2592000){
          that.data.allMessage.push(res.data.response[i])
        }
    }
    that.setData({
      allMessage:that.data.allMessage,
      ifCheck1:false,
      ifCheck2:false,
      ifCheck3:false,
    })
    console.log(that.data.allMessage)
        if (that.data.allMessage.length != 0) {
          for (var i = 0; i < that.data.allMessage.length; i++) {
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
                that.data.messageNum = that.data.messageNum + 1,
                that.setData({
                  ifCheck1:true,
                })
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } 
          
          
          //加入队伍消息状态
          for (var i = 0; i < that.data.allPersonMessage.length; i++) {
            if (that.data.allPersonMessage[i].readed == true) {
              that.data.allPersonMessage[i].readed = "已确认"
            } else if (that.data.allPersonMessage[i].readed == false) {
              that.data.allPersonMessage[i].readed = "等待确认",
                that.data.messageNum = that.data.messageNum + 1,
                that.setData({
                  ifCheck2:true,
                })
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } //邀请组队消息状态//统计未读消息,若readed值为"等待确认"

          for (var i = 0; i < that.data.allTeamMessaged.length; i++) {
            if (that.data.allTeamMessaged[i].readed == true) {
              that.data.allTeamMessaged[i].readed = "已确认"
            } else if (that.data.allTeamMessaged[i].readed == false) {
              that.data.allTeamMessaged[i].readed = "等待确认",
                that.data.messageNum = that.data.messageNum + 1,
                that.setData({
                  ifCheck3:true,
                })
                getApp().globalData.messageNum = getApp().globalData.messageNum + 1
            }
          } //队伍邀请组队信息状态

          //划分组队返回消息和个人邀请返回消息类别
          for (var i = 0; i < that.data.allPersonReturnY.length; i++) {
            that.data.allPersonReturnY[i].type = "同意组队邀请"
          }
          for (var i = 0; i < that.data.allPersonReturnN.length; i++) {
            that.data.allPersonReturnN[i].type = "拒绝组队邀请"
          }
          for (var i = 0; i < that.data.allTeamReturnY.length; i++) {
            that.data.allTeamReturnY[i].type = "同意加入队伍"
          }
          for (var i = 0; i < that.data.allTeamReturnN.length; i++) {
            that.data.allTeamReturnN[i].type == "拒绝加入队伍"
          }
          for (var i = 0; i < that.data.allTeamMessagedY.length; i++) {
            that.data.allTeamMessagedY[i].type == "同意队内邀请"
          }
          for (var i = 0; i < that.data.allTeamMessagedN.length; i++) {
            that.data.allTeamMessagedN[i].type == "拒绝队内邀请"
          }
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
            messageNum: that.data.messageNum,
            number:that.data.messageNum,
          })
        }
        console.log(that.data.allTeamMessage)
        console.log(that.data.allTeamMessaged)
        console.log(getApp().globalData.messageNum)
        if (that.data.messageNum != 0) {
          wx.showTabBarRedDot({
            index: 3,
          })
        } else if (that.data.messageNum <= 0) {
          wx.hideTabBarRedDot({
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
  },

  getAllSysMessage: function () {
    var that = this;
    server.request(
      'get',
      'message/getBackMessage?', {},
      function (res) {
        console.log(res.data);
        that.data.systemMessage = res.data.response;
        that.setData({
          systemMessage: that.data.systemMessage
        })
        for (var i = 0; i < that.data.systemMessage.length; i++) {
          var dateee = new Date(that.data.systemMessage[i].createTime).toJSON();
          var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          // console.log(date);
          that.data.systemMessage[i].createTime = date;
        }
        that.setData({
          systemMessage: that.data.systemMessage
        })
        console.log(that.data.systemMessage)
      },
      function (error) {
        console.log(error)
      }
    )
  },
  //  获取所有审核消息
  getAllAdmainMessage: function () {
    var that = this;
    server.request(
      'get',
      'message/getAdmainMessage?', {
        "userId": getApp().globalData.user_id
      },
      function (res) {
        console.log(res.data);
        if (res.data.response.length != 0) {
          that.data.allAdmainMessage = res.data.response;
          that.setData({
            allAdmainMessage: that.data.allAdmainMessage
          })
          for (var i = 0; i < that.data.allAdmainMessage.length; i++) {
            var dateee = new Date(that.data.allAdmainMessage[i].addTime).toJSON();
            var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            that.data.allAdmainMessage[i].addTime = date;
          }
          that.setData({
            allAdmainMessage: that.data.allAdmainMessage
          })
          console.log(that.data.allAdmainMessage)
        }
      },
      function (error) {
        console.log(error)
      }
    )
  },

  toTeamDetail: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.id;
    var groupName = event.currentTarget.dataset.name;
    var tagName = event.currentTarget.dataset.tag;
    var readed = event.currentTarget.dataset.readed;
    var sendusername = event.currentTarget.dataset.sendusername;
    getApp().globalData.Flag = true;
    this.data.messageNum = 0;
    getApp().globalData.messageNum = 0;
    this.setData({
      messageNum: this.data.messageNum
    });
    wx.navigateTo({
      url: '../../messagePackage/pages/messageDetail/messageDetail?id=' + id + "&groupName=" + groupName + "&tagName=" + tagName + "&readed=" + readed+"&sendUserName="+sendusername,
      //  +"&state="+state+"&messageNum="+messageNum,
    })
  },

  toPersonalDetail: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.id;
    var groupName = event.currentTarget.dataset.name;
    var tagName = event.currentTarget.dataset.tag;
    var readed = event.currentTarget.dataset.readed;
    var fullmem = event.currentTarget.dataset.fullmem;
    console.log(fullmem)
    getApp().globalData.Flag = true;
    this.data.messageNum = 0;
    getApp().globalData.messageNum = 0;
    this.setData({
      messageNum: this.data.messageNum
    });
    wx.navigateTo({
      url: '../../messagePackage/pages/personalMessageDetail/personalMessageDetail?id=' + id + "&groupName=" + groupName + "&tagName=" + tagName + "&readed=" + readed+"&fullMem="+fullmem,
      //  +"&state="+state+"&messageNum="+messageNum,
    })
  },
  //切换至组队消息

  toInviteDetail: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.id;
    var groupName = event.currentTarget.dataset.name;
    var tagName = event.currentTarget.dataset.tag;
    var readed = event.currentTarget.dataset.readed;
    var content = event.currentTarget.dataset.content;
    var sendusername = event.currentTarget.dataset.sendusername;
    
    //  this.data.messageNum=this.data.messageNum-1;
    //  var state = event.currentTarget.dataset.cfm;
    //  var messageNum = event.currentTarget.dataset.num;
    getApp().globalData.Flag = true;
    this.data.messageNum = 0;
    getApp().globalData.messageNum = 0;
    this.setData({
      messageNum: this.data.messageNum
    });
    wx.navigateTo({
      url: '../../messagePackage/pages/inviteDetail/inviteDetail?id=' + id + "&groupName=" + groupName + "&tagName=" + tagName + "&readed=" + readed + "&content=" + content+"&sendUserName="+sendusername,
      //  +"&state="+state+"&messageNum="+messageNum,
    })
  }, //切换至队伍邀请信息


  change1: function () {
    this.data.isTeamVisible = true,
      this.data.isSysVisible = false,
      this.data.flag = false,
      this.setData({
        flag: this.data.flag,
        isTeamVisible: this.data.isTeamVisible,
        isSysVisible: this.data.isSysVisible
      })
    //  console.log(this.data.isTeamVisible)
  },
  //切换至系统消息
  change2: function () {
    this.data.isTeamVisible = false;
    this.data.isSysVisible = true;
    this.data.flag = true;
    this.setData({
      flag: this.data.flag,
      isTeamVisible: this.data.isTeamVisible,
      isSysVisible: this.data.isSysVisible
    })
    // console.log(this.data.isTeamVisible)
  },
  detail: function (event) {
    var index = event.currentTarget.dataset.id;
    console.log(index);
    // var str = this.data.systemMessage[index-1].noticeTitle.indexOf("：");
    wx.showModal({
      cancelColor: 'cancelColor',
      showCancel: false,
      content: this.data.systemMessage[index - 1].noticeTitle
    })
  },

  detail1: function (event) {
    var index = event.currentTarget.dataset.id;
    console.log(index);
    // var str = this.data.systemMessage[index-1].noticeTitle.indexOf("：");
    for (var i = 0; i < this.data.allAdmainMessage.length; i++) {
      if (this.data.allAdmainMessage[i].id == index) {
        wx.showModal({
          cancelColor: 'cancelColor',
          showCancel: false,
          title: this.data.allAdmainMessage[i].admainName,
          content: this.data.allAdmainMessage[i].critic
        })
      }
    }
  },


  onLoad: function (options) {
    getApp().globalData.messageNum = 0;
    this.tap();
    this.getAllSysMessage();
    this.getAllAdmainMessage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.tap();

  },

  tt: function () {
    // this.tap();
    this.data.messageNum = 0;
    getApp().globalData.messageNum = 0;
    this.setData({
      messageNum: this.data.messageNum
    });
    getApp().globalData.Flag = true
    wx.showToast({
      title: '近1月消息',
      icon: 'loading',
      duration: 500
    })
    if (getApp().globalData.Flag) {
      getApp().globalData.Flag = false;
      this.data.allMessage = [];
      this.data.allPersonReturnN = [];
      this.data.allPersonReturnY = [];
      this.data.allTeamReturnN = [];
      this.data.allTeamReturnY = [];
      this.data.allTeamMessage = [];
      this.data.allPersonMessage = [];
      this.data.allTeamMessaged = [];
      this.data.allTeamMessagedY = [];
      this.data.allTeamMessagedN = [];
      this.data.allAdmainMessage = [];
      this.data.systemMessage = [];
      this.getAllSysMessage();
      this.getAllAdmainMessage();
      this.tap(); //调用接口获取数据
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (getApp().globalData.Flag) {
      getApp().globalData.Flag = false;
      this.data.allMessage = [];
      this.data.allPersonReturnN = [];
      this.data.allPersonReturnY = [];
      this.data.allTeamReturnN = [];
      this.data.allTeamReturnY = [];
      this.data.allTeamMessage = [];
      this.data.allPersonMessage = [];
      this.data.allTeamMessaged = [];
      this.data.allTeamMessagedY = [];
      this.data.allTeamMessagedN = [];
      this.data.allAdmainMessage = [];
      this.data.systemMessage = [];
      this.getAllSysMessage();
      this.getAllAdmainMessage();
      this.tap(); //调用接口获取数据
      // this.getAllSysMessage();
    // this.getAllAdmainMessage();
    }
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
    
    this.tt();
    this.getAllSysMessage();
    this.getAllAdmainMessage();
    wx.stopPullDownRefresh();  //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.tt();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


    // 点击 tab 时触发
    onTabItemTap(item) {
      // this.tt();
    }
})