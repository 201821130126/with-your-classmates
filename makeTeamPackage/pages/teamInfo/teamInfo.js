const server = require('../../../services/server');
const util = require('../../../utils/util')
// pages/teaminfo/teaminfo.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    groupName: '',
    img: '',
    date:"",
    date1: "",
    endDate: '',
    member: 0,
    coverPath: "",
    tagId: 0,
    tagType: 0,
    tag: "",
    disabled: true,
    nameIsNull: true,
    numIsNull: true,
    timeIsNull: true,
    coverisNull: true,
    bindtest: 0,
    temp: '', //用于存储图片的相对地址
    tempUrl: '',
    test: []
  },
  userNameInput: function (e) {
    var input = e.detail.value; //获取当前表单元素输入框内容
    if (input.trim().length!=0) {
      this.setData({
        groupName: e.detail.value
      })
      this.data.nameIsNull = false,
        this.data.bindtest = this.data.bindtest + 1,
        this.setData({
          bindtest: this.data.bindtest,
          nameIsNull: this.data.nameIsNull,
          // disabled:this.data.disabled
        })
      if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
        this.data.disabled = false;
        this.setData({
          disabled: this.data.disabled
        })
      }
    } else {
      this.setData({
        nameIsNull: true,
        disabled: true
      })
      if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
        this.data.disabled = false;
        this.setData({
          disabled: this.data.disabled
        })
      }
      wx.showToast({
        title: '昵称不能为空',
        icon: "none",
        duration: 2000
      })
    }
  },

  // 队伍信息填写⾥的上传图⽚函数
  uploadImage: function (e) {
    //选取图⽚
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'], //原图
      sourceType: ['album', 'camera'], //⽀持选取图⽚
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图⽚

        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //上传图⽚
        wx.uploadFile({
          //请求后台的路径
          url: 'https://www.cqcwangluo.site:8050/group/groupCoverUpload',
          //⼩程序本地的路径
          filePath: tempFilePaths,
          //后台获取我们图⽚的key
          name: 'groupImage',
          //额外的参数formData
          formData: {
            token: wx.getStorageSync("token")
          },
          success: function (res) {
            //上传成功
            that.data.temp = JSON.parse(res.data)
            that.data.tempUrl = that.data.temp.response
            that.data.bindtest = that.data.bindtest + 1
            that.data.coverisNull = false
            // console.log(that.data.tempUrl)
            console.log(that.data.temp.response)
            that.setData({
              coverisNull: that.data.coverisNull,
              temp: that.data.temp,
              bindtest: that.data.bindtest,
              tempUrl: that.data.tempUrl
            });
            that.data.coverPath = "https://www.cqcwangluo.site/static" + that.data.tempUrl;
            that.setData({
              coverPath: that.data.coverPath
            })

            console.log(that.data.coverPath)
            if (that.data.nameIsNull == false && that.data.numIsNull == false && that.data.timeIsNull == false && that.data.coverisNull == false) {
              that.data.disabled = false;
              that.setData({
                disabled: that.data.disabled
              })
            }
            wx.hideLoading({
              success: (res) => {},
            })
          },
          fail: function (res) {
            console.log(res.data)
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showModal({
              showCancel: false,
              content: res.data.message
            })
          },
        })
      }
    })
  },


  numInput: function (e) {
    var input = e.detail.value; //获取当前表单元素输入框内容
    if (input.trim().length!=0) {//输入去除空格
      this.data.member = input,
        this.data.bindtest = this.data.bindtest + 1,
        this.setData({
          member: this.data.member,
          bindtest: this.data.bindtest,
        })
      if (this.data.member == 0) {
        wx.showToast({
          title: '队伍人数不能为0',
          icon: "none",
          duration: 2000
        })
        this.setData({
          numIsNull: true,
          disabled: true
        })
      }
      else if(!(/(^[0-9]*$)/.test(this.data.member))){
        wx.showToast({
          title: '输入内容只能包含数字！',
          icon: "none",
          duration: 2000
        })
        this.setData({
          numIsNull: true,
          disabled: true
        })
      }
      else if (this.data.member != 0) {
        this.data.numIsNull = false,
          this.setData({
            numIsNull: this.data.numIsNull,
          })
        if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
          this.data.disabled = false;
          this.setData({
            disabled: this.data.disabled
          })
        }
      }
    } else {
      this.setData({
        numIsNull: true,
        disabled: true
      })
      if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
        this.data.disabled = false;
        this.setData({
          disabled: this.data.disabled
        })
      }
      wx.showToast({
        title: '队伍人数不能为空',
        icon: "none",
        duration: 2000
      })
    }
    this.setData({
      member: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var i = e.detail.value.toString()
    var date = util.formatDate(new Date()); //获得当前日期
    this.setData({
      date1: i, //选择队伍结束日期
      date: date //当前日期
    })

    // console.log(this.data.date);
    var newstr = this.data.date1.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    // console.log(date)
    var newstr1 = this.data.date.replace(/-/g, '/');
    var date1 = new Date(newstr1);
    var time_str1 = date1.getTime().toString();
    // console.log(time_str1)
    console.log(this.data.date);//当前日期
    console.log(this.data.date1);
    console.log(time_str1.substr(0, 10)); //当前日期
    console.log(time_str.substr(0, 10)); //输入日期
    console.log(this.data.date1.length);
    if (time_str.substr(0, 10) - time_str1.substr(0, 10) <= 0) //输入日期为已过去的日期，不符合
    {
      this.setData({
        timeIsNull: true,
        disabled: true
      })
      wx.showToast({
        title: '只能输入以后的日期',
        icon: "none",
        duration: 2000
      });
      console.log(this.data.timeIsNull)
    }
    if (time_str.substr(0, 10) == NaN || this.data.date1.length < 10) {
      this.setData({
        timeIsNull: true,
        disabled: true
      })
      wx.showToast({
        title: '日期格式不对！',
        icon: "none",
        duration: 2000
      });
      console.log(this.data.timeIsNull)
    } else if (time_str.substr(0, 10) - time_str1.substr(0, 10) > 0) {
      this.data.timeIsNull = false,
        // this.data.bindtest=this.data.bindtest+1;
        this.setData({
          // bindtest:this.data.bindtest
          timeIsNull: this.data.timeIsNull
        })
      if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
        this.data.disabled = false;
        this.setData({
          disabled: this.data.disabled
        })
      }
      console.log(this.data.timeIsNull)
      console.log(this.data.coverisNull)
    }
    if (this.data.date1 == "") {
      this.setData({
        timeIsNull: true,
        disabled: true
      })
      if (this.data.nameIsNull == false && this.data.numIsNull == false && this.data.timeIsNull == false && this.data.coverisNull == false) {
        this.data.disabled = false;
        this.setData({
          disabled: this.data.disabled
        })
      }
      wx.showToast({
        title: '队伍结束日期不能为空',
        icon: "none",
        duration: 2000
      })
    }
    console.log(this.data.date1)
  },


  onSubmit: function () {
    var that = this;
    server.request(
      'POST',
      'group/createGroup?', {
        "coverPath": that.data.tempUrl,
        "endDate": that.data.date1,
        "groupName": that.data.groupName,
        "member": that.data.member,
        "tagId": getApp().globalData.chooseTag.id,
        "userId": getApp().globalData.user_id
      },
      function (res) { //？？？对应的是接口名
        console.log(that.data.tempUrl)
        console.log(that.data.date1)
        console.log(that.data.groupName)
        console.log(that.data.member)
        console.log(getApp().globalData.chooseTag.id)
        console.log(getApp().globalData.token)
        console.log(res);
        if (res.data.code == 2 || res.data.code == 3) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            nameIsNull: true,
            disabled: true,
          })
          if (that.data.nameIsNull == false && that.data.numIsNull == false && that.data.timeIsNull == false && that.data.coverisNull == false) {
            that.data.disabled = false;
            that.setData({
              disabled: that.data.disabled
            })
          }
        } else {
          if (that.data.member == 1) {
            wx.switchTab({
              url: '../../../pages/choose/choose',
            })
          } else {
            wx.navigateTo({
              url: '../../../makeTeamPackage/pages/recommand/recommand',
            })
          }
          wx.showToast({
            title: '队伍创建成功！',
            icon: 'success',
            duration: 2000
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      },
      // {"Content-Type": "application/json"},
      {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      getApp().globalData.test = [that.data.groupName, that.data.member, that.data.endDate],
      that.setData({}),
      console.log(getApp().globalData.test)
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tagName = getApp().globalData.chooseTag.tagName;
    this.data.tagId = getApp().globalData.chooseTag.id;
    this.data.tagType = getApp().globalData.chooseTag.type;
    this.setData({
      tagName: this.data.tagName,
      tagId: this.data.tagId,
      tagType: this.data.tagType
    })
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