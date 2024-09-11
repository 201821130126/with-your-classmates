// pages/label/label.js
const server = require("../../../../services/server");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label: ["计算机二级"],
    temp: 0,
    isdelete: false,
    delete: "",
    tagList: [],
    'tagName': null,
    'chooseTag': null,
    user_id: '',
    title: ["计算机二级"],
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
    order: [0, 1, 2],
    disabled: true,
    isVisible: false,
    hasChoose: [],
    chooseTag: [],
    index: 0
  },

  add: function (e) {
    if (this.data.temp < 3) {
      var tempLen = this.data.temp;
      console.log(tempLen)
      var no_repeat = true;
      for (var i = 0; i < tempLen; i++) {
        console.log(this.data.chooseTag[i])
        console.log(e.currentTarget.dataset.lockerid)
        if (e.currentTarget.dataset.lockerid.id == this.data.chooseTag[i].id) {
          wx.showToast({
            title: '个人标签重复',
            icon: 'none',
            duration: 1000
          })
          no_repeat = false;
        } 
      }
      console.log(no_repeat)
      if (no_repeat) {
        this.data.temp = this.data.temp + 1,
          // console.log(this.data.temp),
          this.data.chooseTag.push(e.currentTarget.dataset.lockerid),
          this.data.isVisible = true,
          this.data.disabled = false,
          this.setData({
            temp: this.data.temp,
            isVisible: this.data.isVisible,
            chooseTag: this.data.chooseTag,
            delete: this.data.delete,
            disabled: this.data.disabled,
            choose1: this.data.choose1,

            //chooseTag:this.data.chooseTag
          })
      }

    } else {
      wx.showToast({
        title: '目标标签一次最多可选3个',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onSubmit: function () { //选择个人标签
    var that = this;
    that.data.tagList = [];
    for (var i = 0; i < that.data.chooseTag.length; i++) {
      that.data.tagList.push(that.data.chooseTag[i].id)
    };
    console.log(that.data.tagList);
    that.setData({
      tagList: that.data.tagList
    });
    server.request(
      'POST',
      'personal/chooseTag?', {
        "id": getApp().globalData.user_id,
        "tagList": that.data.tagList,
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
      },
      function (error) {
        //调用服务端登录接口失败
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      wx.showToast({
        title: '标签新增成功！',
        icon: 'none',
        duration: 2000
      }),
      wx.navigateTo({
        url: '../../../../mePackage/pages/me/personalTag/updateTag',
      })
    )
  },

  getAllTag: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    server.request(
      'GET',
      'personal/getAllTag?', {
        // id:getApp().globalData.user_id
      },
      function (res) {
        console.log(res)
        if (res.data.response.tags[0].tagType = 1) {
          that.data.tagType1 = "大学",
            that.data.item = res.data.response.tags[0].tag
        }
        if (res.data.response.tags[1].tagType = 2) {
          that.data.tagType2 = "留学",
            that.data.com = res.data.response.tags[1].tag
        }
        if (res.data.response.tags[2].tagType = 3) {
          that.data.tagType3 = "语言",
            that.data.item3 = res.data.response.tags[2].tag
        }
        if (res.data.response.tags[3].tagType = 4) {
          that.data.tagType4 = "财会",
            that.data.item4 = res.data.response.tags[3].tag
        }
        if (res.data.response.tags[4].tagType = 5) {
          that.data.tagType5 = "公务员",
            that.data.item5 = res.data.response.tags[4].tag
        }
        if (res.data.response.tags[5].tagType = 6) {
          that.data.tagType6 = "教育",
            that.data.item6 = res.data.response.tags[5].tag
        }
        if (res.data.response.tags[6].tagType = 7) {
          that.data.tagType7 = "心理",
            that.data.item7 = res.data.response.tags[6].tag
        }
        if (res.data.response.tags[7].tagType = 8) {
          that.data.tagType8 = "管理",
            that.data.item8 = res.data.response.tags[7].tag
        }
        if (res.data.response.tags[8].tagType = 9) {
          that.data.tagType9 = "法律",
            that.data.item9 = res.data.response.tags[8].tag
        }
        if (res.data.response.tags[9].tagType = 10) {
          that.data.tagType9 = "翻译",
            that.data.item10 = res.data.response.tags[9].tag
        }
        if (res.data.response.tags[10].tagType = 11) {
          that.data.tagType11 = "保险",
            that.data.item11 = res.data.response.tags[10].tag
        }
        if (res.data.response.tags[11].tagType = 12) {
          that.data.tagType11 = "办公技能",
            that.data.item12 = res.data.response.tags[11].tag
        }
        wx.hideLoading({
          success: (res) => {},
        })
        that.setData({
          tagType1: that.data.tagType1,
          tagType2: that.data.tagType2,
          tagType3: that.data.tagType3,
          tagType4: that.data.tagType4,
          tagType5: that.data.tagType5,
          tagType6: that.data.tagType6,
          tagType7: that.data.tagType7,
          tagType8: that.data.tagType8,
          tagType9: that.data.tagType9,
          tagType10: that.data.tagType10,
          tagType11: that.data.tagType11,
          tagType12: that.data.tagType12,
          item: that.data.item,
          com: that.data.com,
          item3: that.data.item3,
          item4: that.data.item4,
          item5: that.data.item5,
          item6: that.data.item6,
          item7: that.data.item7,
          item8: that.data.item8,
          item9: that.data.item9,
          item10: that.data.item10,
          item11: that.data.item11,
          item12: that.data.item12,
        })
      },
      function (error) {
        console.log(error);
        console.log(app.globalData.token);
        console.log(app.globalData.user_id)
      }, {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    )
  },
  close: function (e) {
    // if(this.data.temp>0){
    this.data.temp = this.data.temp - 1;
    console.log(this.data.temp);
    console.log(e.currentTarget.dataset.id);
    // console.log(this.data.chooseTag[0].id);
    for (var i = 0; i < this.data.chooseTag.length; i++) {
      if (this.data.chooseTag[i].id == e.currentTarget.dataset.id) {
        getApp().globalData.index = i,
          console.log(getApp().globalData.index)
      }
    };
    this.data.chooseTag.splice(getApp().globalData.index, 1);
    this.setData({
      chooseTag: this.data.chooseTag,
      // isVisible:this.data.isVisible
    })
    console.log(this.data.chooseTag),
      this.data.disabled = true,
      // this.data.isVisible=false,
      this.setData({
        temp: this.data.temp,
        // hasChoose:this.data.hasChoose,
        chooseTag: this.data.chooseTag,
        // delete:this.data.delete,
        // isVisible:this.data.isVisible,
        disabled: this.data.disabled,
        choose1: this.data.choose1
        //chooseTag:this.data.chooseTag
      })
  },

  remove: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllTag();
    this.setData({
      logged: true,

      userInfo: app.globalData.userInfo,
      url: app.globalData.url //服务器端的url
    })
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