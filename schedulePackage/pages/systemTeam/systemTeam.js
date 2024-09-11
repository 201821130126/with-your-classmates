// pages/index/systemTeam/systemTeam.js
const server = require("../../../services/server");
const util = require("../../../utils/util")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    flag1: true,
    flag2: true,
    flag3: true,
    flag4: true,
    flag5: true,
    flag6: true,
    flag7: true,
    flag8: true,
    flag9: true,
    flag10: true,
    flag11: true,
    item: [],
    com: [],
    item3: [],
    item4: [],
    item5: [],
    item6: [],
    item7: [],
    item8: [],
    item9: [],
    item10: [],
    item11: [],
    item12: [],
    tag: [],
    choose1: "",
    tagType1: "",
    tagType2: "",
    tagType3: "",
    tagType4: "",
    tagType5: "",
    tagType6: "",
    tagType7: "",
    tagType8: "",
    tagType9: "",
    tagType10: "",
    tagType11: "",
    tagType12: "",

    currentTag:[],
    currentTeam:[],
    currentId:'',//当前小类标签编号
    id:[],
    name:[]
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTag()
  },

  //  根据现点击的tag返回所有组队记录
  return:function(e){
    var that = this;
    that.setData({
      currentTeam:[]
    })
    var currId = e.currentTarget.dataset.id;
    console.log(currId)
    that.data.currentTag=e.currentTarget.dataset.lockerid;
    that.setData({
      "currentTag":that.data.currentTag,
      "currentId":currId
    })
    server.request(
      'POST',
      'personal/getAllGroupByTag?',
      {
        "tagId":that.data.currentTag.id,
        "userId":getApp().globalData.user_id
      },
      function(res){
        console.log(res.data)
        for(var i=0;i<res.data.response.length;i++){
          res.data.response[i].image='https://www.cqcwangluo.site/static'+res.data.response[i].image;
          res.data.response[i].deadLine=res.data.response[i].deadLine.substr(0,10)
        }
        for(var i=0;i<res.data.response.length;i++){
            var newstr = res.data.response[i].deadLine.replace(/-/g,'/'); 
            var date =  new Date(newstr); 
            var time_str = date.getTime().toString();//队伍结束日期的时间戳
            var newstr1 = util.formatDate(new Date()).replace(/-/g,'/'); //获取当前日期
            var date1 =  new Date(newstr1); 
            var time_str1 = date1.getTime().toString();//当前日期的时间戳
            console.log(time_str1.substr(0, 10));//当前日期
            console.log(time_str.substr(0, 10));//输入日期
           if(res.data.response[i].nowMemNum!=0&&res.data.response[i].fullMem!=1&&res.data.response[i].nowMemNum<res.data.response[i].fullMem&&time_str.substr(0, 10)-time_str1.substr(0, 10)>0){
            that.data.currentTeam.push(res.data.response[i])
        }
        that.setData({
          currentTeam:that.data.currentTeam
        })
      }
      console.log(that.data.currentTeam)
      },
      function(error){
        console.log(error);
      },
      {"Content-Type": "application/x-www-form-urlencoded"}
    )
    
  },

  //申请加入
  join:function(e){
    var that=this;
    that.setData({
      id:[],
      name:[]
    })
    that.data.id.push(e.currentTarget.dataset.lockerid.groupId);
    that.data.name.push(e.currentTarget.dataset.lockerid.groupName);
    that.setData({
      id:that.data.id,
      name:that.data.name
    })
    console.log(that.data.id);
    console.log(that.data.name);
    
    server.request(
      'POST',
      'message/sendToGroup?',
      {
        "group":that.data.id,
        "groupName":that.data.name,
        "userId":getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
       console.log(res);
       if(res.data.message=='成功'){
        wx.showToast({
          title:'已发送申请加入消息',
          icon:'none',
          duration:2000
          })
       }
       else{
        wx.showModal({
          content:res.data.message,
          showCancel:false
        })
       }
     },
     function (error) {
       //调用服务端登录接口失败
       console.log(error);
     },
     {"Content-Type": "application/x-www-form-urlencoded"}
    )

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllTag()
  },
  change1: function () {
    this.setData({
      flag: false,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
   
  },
  change2: function () {
    this.setData({
      flag: true,
      flag1: false,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change3: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: false,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change4: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: false,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change5: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: false,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change6: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: false,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change7: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: false,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change8: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: false,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change9: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: false,
      flag9: true,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change10: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: false,
      flag10: true,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change11: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: false,
      flag11: true,
      currentTeam:[],
      currentId:''
    })
  },
  change12: function () {
    this.setData({
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: true,
      flag7: true,
      flag8: true,
      flag9: true,
      flag10: true,
      flag11: false,
      currentTeam:[],
      currentId:''
    })
  },

  getAllTag: function (e) {
    var that = this;
    server.request(
      'GET',
      'personal/getAllTag?', {
        // id:getApp().globalData.user_id
      },
      function (res) {
        console.log(res)
        if (res.data.response.tags[0].tagType = 1) {
          that.setData({
            "tagType1": "大学",
            "item": res.data.response.tags[0].tag,
          })
        }
        if (res.data.response.tags[1].tagType = 2) {
          that.setData({
            "tagType2": "留学",
            "com": res.data.response.tags[1].tag,
          })
        }
        if (res.data.response.tags[2].tagType = 3) {
          that.setData({
            "tagType3": "语言",
            "item3": res.data.response.tags[2].tag,
          })
        }
        if (res.data.response.tags[3].tagType = 4) {
          that.setData({
            "tagType4": "财会",
            "item4": res.data.response.tags[3].tag,
          })
        }
        if (res.data.response.tags[4].tagType = 5) {
          that.setData({
            "tagType5": "公务员",
            "item5": res.data.response.tags[4].tag
          })
        }
        if (res.data.response.tags[5].tagType = 6) {
          that.setData({
            "tagType6": "教育",
            "item6": res.data.response.tags[5].tag
          })
        }
        if (res.data.response.tags[6].tagType = 7) {
          that.setData({
            "tagType7": "心理",
            "item7": res.data.response.tags[6].tag
          })
        }
        if (res.data.response.tags[7].tagType = 8) {
          that.setData({
            "tagType8": "管理",
            "item8": res.data.response.tags[7].tag
          })
        }
        if (res.data.response.tags[8].tagType = 9) {
          that.setData({
            "tagType9": "法律",
            "item9": res.data.response.tags[8].tag
          })
        }
        if (res.data.response.tags[9].tagType = 10) {
          that.setData({
            "tagType9": "翻译",
            "item10": res.data.response.tags[9].tag
          })

        }
        if (res.data.response.tags[10].tagType = 11) {
          that.setData({
            "tagType11": "保险",
            "item11": res.data.response.tags[10].tag
          })
        }
        if (res.data.response.tags[11].tagType = 12) {
          that.setData({
            "tagType11": "办公技能",
            "item12": res.data.response.tags[11].tag
          })

        }
        console.log(that.data.item)
        // that.setData({
        //   tagType1:that.data.tagType1,
        //   tagType2:that.data.tagType2,
        //   tagType3:that.data.tagType3,
        //   tagType4:that.data.tagType4,
        //   tagType5:that.data.tagType5,
        //   tagType6:that.data.tagType6,
        //   tagType7:that.data.tagType7,
        //   tagType8:that.data.tagType8,
        //   tagType9:that.data.tagType9,
        //   tagType10:that.data.tagType10,
        //   tagType11:that.data.tagType11,
        //   tagType12:that.data.tagType12,
        //   item:that.data.item,
        //   com:that.data.com,
        //   item3:that.data.item3,
        //   item4:that.data.item4,
      },
      function (error) {
        console.log(error);
        // console.log(app.globalData.token);
        // console.log(app.globalData.user_id)
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
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
    this.getAllTag();
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

  }
})