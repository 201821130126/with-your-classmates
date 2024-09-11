// pages/plan/plan.js
const server = require("../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: "",
    undaka1: [],
    planList: [],
    plan0: '',
    order: ["First", "Second", "Third", "Fourth", "Fifth"],
    teammateId: "",
    showModalStatus1: false,
    showModalStatus2: false,
    showModalStatus3: false,
    title: "",
    title1: "",
    plan: "",
    plan1: "",
    date: "",
    date1: "",
    planId: 0,
    deadline: '',
    addTime: '',
    show: false,
    position: 'center',
    duration: 300,
    overlay: false,
    comment: "",
    transformIdx: 0,
    dakaShow: "",
    wanchengShow: "",
    // add:false,
    showNull: 1,
    add: 1, //打卡按钮显示
    ddl: "DDL:",

  },

  //添加计划,展示弹窗
  dongTais: function (e) {
    this.setData({
      showModalStatusdongTais: true,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先设置参数
    this.setData({
      "groupId": options.id,
      "teammateId": options.teammateId,
      "deadline": options.deadline,
      "addTime": options.addTime

    })
    console.log(1)
    this.getAllplan()
    console.log(2)
    this.deadlineTrans()
    console.log(3)
    var deadline = this.data.deadline
    console.log("deadline:", deadline)
    console.log(4)
  },
  showInfo(e) {
    const idx = e.currentTarget.dataset.idx
    var planList = this.data.planList
    if (planList[idx].add == 0 || planList[idx].dakaShow == 0) {
      var dakaShow = false;
    } else {
      var dakaShow = !planList[idx].checked
    }
    this.setData({
      show: true,
      plan0: planList[idx].content,
      empty: planList[idx].empty,
      transformIdx: idx,
      dakaShow: dakaShow,
      add: planList[idx].add,


    })


  },

  showPrev() {
    this.setData({
      show: false
    })
  },

  onEnter(res) {
    console.log(res)
    // 进入中设置页面容器
    this.setData({
      // 让页面容器显示
      "show": true,
    })
  },

  onLeave(res) {
    console.log(res)
    // 离开中设置页面容器为false
    this.setData({
      // 让页面容器不显示
      "show": false,
    })
  },

  // 点击确认打卡，状态转换
  finish: function (event) {

    this.setData({
      showModalStatus3: true,
      comment: "",
    })



  },



  //确定打卡
  daka: function () {
    var that = this;
    var stageNum = that.data.transformIdx + 1;
    console.log(stageNum)
    var comment = that.data.comment;
    console.log(typeof comment, comment)
    var groupId = parseInt(that.data.groupId)
    server.request('post', 'groupSchedule/checkSchedule?', {
      "groupId": groupId,
      "userId": getApp().globalData.user_id,
      "stageNum": stageNum,
      "comment": comment
    }, function (res) {
      console.log("确定打卡：", res)
      // 重新加载数据
      that.data.planList = [];
      that.getAllplan();
      that.setData({
        show: false,
        planList: that.data.planList,
        showModalStatus3: false,

      })
      if(res.data.message == "成功"){
        wx.showToast({
          title: '打卡日程成功，你已获20积分！',
          icon:'none',
          duration: 2000
        })
      }
    

    })


  },

  // 获取所有日程信息以及获取未打卡日程数组
  getAllplan: function () {
    var that = this;
    that.data.planList = []
    console.log("firstplanList", that.data.planList)
    var groupId = parseInt(that.data.groupId)
    console.log(groupId)
    console.log(getApp().globalData.user_id)
    server.request('post', 'groupSchedule/showSchedule?', {
        "groupId": groupId,
        "userId": getApp().globalData.user_id,
      },
      function (res) {
        var allPlan = res.data.response
        console.log("getAllplan:", res)

        for (var i = 0; i < allPlan.length; i++) {
          var timeFromDdl = allPlan[i].timeFromDdl
          console.log("timeFromDdl0:", timeFromDdl)
          //  未打卡
          var dakaShow = 1;
          if (allPlan[i].groupSchedule.checked == false) {
            console.log("allPlan[i].groupSchedule.checked:", allPlan[i].groupSchedule.checked)
            if (timeFromDdl < 0) { //逾期了
              var end = true;
              var dakaShow = 0;
              var leave = false;
            } else if (timeFromDdl <= 3 && timeFromDdl >= 0) {
              //快到了
              var leave = true;
              var end = false;

            } else { //正常还有很长时间
              var end = false;
              var leave = false;
            }
          } else { //已打卡
            var end = false;
            var leave = false;
          }
          console.log("end", end)
          console.log("leave", leave)



          var planArray = {
            content: allPlan[i].groupSchedule.content,
            subContent: allPlan[i].groupSchedule.content.substr(0, 11),
            stageDdl: allPlan[i].groupSchedule.stageDdl,
            substageDdl: allPlan[i].groupSchedule.stageDdl.substr(0, 10),
            addTime: allPlan[i].groupSchedule.addTime,
            groupInfoId: allPlan[i].groupSchedule.groupInfoId,
            checked: allPlan[i].groupSchedule.checked,
            add: 1,
            title: allPlan[i].groupSchedule.title,
            //  checked:false,
            // unchecked:true,
            unchecked: !(allPlan[i].groupSchedule.checked),
            stageNum: allPlan[i].groupSchedule.stageNum,
            timeFromDdl: timeFromDdl,
            leave: leave,
            end: end,
            dakaShow: dakaShow,
            empty: false,
          }

          that.data.planList = that.data.planList.concat(planArray)
        };

        // 清空undaka
        var undaka = []
        console.log("that.data.planList", that.data.planList)
        // 根据是否打卡查找label和groupName
        var undaka = that.data.planList.filter(function (item) {
          return item.checked == false //未打卡
        })
        console.log("end", end)
        var undaka1 = undaka.filter(function (item) {
          return item.end == false //且不逾期
        })
        console.log("undaka", undaka)
        console.log("undaka1", undaka1)


        // 填补
        if (allPlan.length < 5) {
          var dakaShow = false;
          for (var j = 0; j < 5 - allPlan.length; j++) {
            var planNull = {
              title: "未设置",
              content: "快设置你的计划吧",
              // stageDdl:allPlan[i].stageDdl,
              // addTime:allPlan[i].addTime,
              // groupInfoId:allPlan[i].groupInfoId,
              // stageDdl:,
              empty: true,

              add: 0, //打卡按钮不显示
              checked: false,

              stageNum: allPlan.length + j + 1,
            }
            that.data.planList = that.data.planList.concat(planNull)
          }
        }
        //改名字
        // if(that.data.planList[0].stageNum==1)
        that.setData({
          planList: that.data.planList,
          dakaShow: dakaShow,
          undaka1: undaka1
        })
        console.log(that.data.planList)
        console.log("that.data.undaka1", that.data.undaka1)
      });




  },

  // 将deadline addTime转为时间戳
  deadlineTrans: function () {
    var newstr = this.data.deadline.replace(/-/g, '/');
    var date = new Date(newstr);
    var deadline = date.getTime().toString();

    var newstr1 = this.data.addTime.replace(/-/g, '/');
    var date1 = new Date(newstr1);
    var addTime = date1.getTime().toString();

    this.setData({
      deadline: deadline,
      addTime: addTime,
    })

  },
  // 关闭弹窗
  close() {
    this.setData({
      showModalStatus1: false,
      showModalStatus2: false,
      showModalStatus3: false,
      showModalStatusdongTais: false,
    })
  },
  disabled() {

  },
  //添加计划,展示弹窗
  add: function (e) {
    var stageNum = this.data.transformIdx + 1;
    // var planList = this.data.planList
    console.log("stageNum", stageNum)
    console.log(this.data.planList)
    if (this.data.planList[this.data.transformIdx].add == 0) {
      // 未设置计划，才能设置
      var showModalStatus1 = true
    } else {
      var showModalStatus1 = false
    }
    this.setData({
      showModalStatus1: showModalStatus1,
      planId: stageNum,
      plan: "",
      title: "",
      date: "",
    })

  },
  // 修改计划展示弹窗
  update: function (e) {
    var that = this;
    var planId = that.data.transformIdx;
    console.log(planId, typeof planId)
    console.log(that.data.planList)
    var plan = that.data.planList[planId].content;
    var date1 = that.data.planList[planId].stageDdl.substr(0, 10);
    that.setData({
      showModalStatus2: true,
      planId: planId,
      plan: plan,
      date1: date1,
    })

  },

  // 修改计划
  updateSucess: function (e) {
    var that = this;
    var stageNum = that.data.transformIdx + 1;
    console.log("stageNum", stageNum)
    // console.log("当前日程的数组：",that.data.planList[that.data.transformIdx])
    // that.data.undaka1.push(that.data.planList[that.data.transformIdx])
    // 根据未完成的stageNum排序
    console.log("that.data.undaka1", that.data.undaka1)
    if (that.data.undaka1.length > 1) {
      var undaka = that.data.undaka1.sort(function (a, b) {
        return a.stageNum - b.stageNum
      })

    } else {
      var undaka = that.data.undaka1
    }

    console.log("undaka", undaka)
    console.log("undaka1", that.data.undaka1)
    // 获取当前下标
    var currentId = undaka.findIndex((value) => value.stageNum == stageNum)
    console.log("currentId", currentId)



    var groupId = parseInt(that.data.groupId)
    var plan = that.data.plan1
    // 要plan1
    console.log("plan", plan)
    var deadline = that.data.deadline;
    var addTime = that.data.addTime
    console.log("addTime:", addTime)
    var title = that.data.title1;
    console.log("title", title)




    // 把用户给的时间转为时间戳
    var date = that.data.date1;
    var newstr = date.replace(/-/g, '/')
    var date_ = new Date(newstr)
    var time_str = date_.getTime().toString()
    console.log("time_str", time_str - addTime)


    var currentDate = new Date(); //获取系统当前时间
    var currentDate = currentDate.toLocaleDateString(); //获取当前日期
    //转为时间戳
    var currentDate_ = new Date(currentDate)
    var currentDate_ = currentDate_.getTime().toString()
    console.log("currentDate:", currentDate, "currentDate_", currentDate_)


    // 如果有下一个未打卡的日程，修改下限
    if (currentId < undaka.length - 1) {
      var laterDate = undaka[currentId + 1].stageDdl.substr(0, 10)
      var laterDate_ = laterDate.replace(/-/g, '/')
      var laterDate_ = new Date(laterDate_)
      // 转为时间戳
      var laterDate_ = laterDate_.getTime().toString()
      var deadline = laterDate_
    }



    //是第一个未打卡的
    if (currentId == 0) {
      // 日期正确
      if (time_str - deadline <= 0 && currentDate_ - time_str <= 0) {
        console.log("日期正确")
        server.request('post', 'groupSchedule/changeSchedule?', {
            "groupId": groupId,
            "userId": getApp().globalData.user_id,
            "content": plan,
            "stageDdl": date,
            "stageNum": stageNum,
            "title": title,
          },
          function (res) {
            console.log("update success！", res)
            // 重新加载数据
            that.data.planList = []
            that.data.undaka1 = []

            that.getAllplan()
            if (res.data.message == "成功") {
              wx.showToast({
                title: '修改日程成功！',
                duration: 2000
              })
            }
            that.setData({
              showModalStatus2: false,
              show: false,
            })

          })
      } else if (time_str - deadline > 0) {
        // 日程完成时间完于组队结束时间了
        wx.showToast({
          title: '完成日期不得超过组队结束日期或下一个日程截止日期！',
          // image: '/images/error.png',
          icon: 'none',
          duration: 2000
        })
      } else if (currentDate_ - time_str > 0) {
        // 日程完成时间早于当前时间了
        wx.showToast({
          title: '完成日期不得早于当前日期！',
          // image: '/images/error.png',
          icon: 'none',
          duration: 2000
        })
      }
    } else { //不是第一个未打卡的，有上一个未打卡的日程


      // 获取上一个未打卡的日程
      var formerDate = undaka[currentId - 1].stageDdl.substr(0, 10)
      var formerDate_ = formerDate.replace(/-/g, '/')
      var formerDate_ = new Date(formerDate_)
      // 转为时间戳
      var formerDate_ = formerDate_.getTime().toString()


      // 第二个日程要在第一个之后，deadline之前,currentDate_之后
      if (formerDate_ - time_str <= 0 && time_str - deadline <= 0 && stageNum != 1 && currentDate_ - time_str <= 0) {
        console.log("日期正确")
        server.request('post', 'groupSchedule/changeSchedule?', {
            "groupId": groupId,
            "userId": getApp().globalData.user_id,
            "content": plan,
            "stageDdl": date,
            "stageNum": stageNum,
            "title": title,
          },
          function (res) {
            console.log("update success！", res)
            // 重新加载数据
            that.data.planList = []
            that.getAllplan()

            wx.showToast({
              title: '修改日程成功！',
              duration: 2000
            })

            that.setData({
              showModalStatus2: false,
              show: false,
            })

          })
      } else if (formerDate_ - time_str > 0) {
        // 下一个日程完成时间早于上一个日程了
        wx.showToast({
          title: '该日期不得早于上个日程的完成日期！',
          // image: '/images/error.png',
          icon: 'none',
          duration: 2000
        })
      } else if (time_str - deadline > 0) {
        // 日程完成时间完于组队结束时间了
        wx.showToast({
          title: '完成日期不得超过组队结束日期或下一个日程截止日期！',
          // image: '/images/error.png',
          icon: 'none',
          duration: 2000
        })
      } else if (currentDate_ - time_str > 0) {
        // 日程完成时间早于当前时间了
        wx.showToast({
          title: '完成日期不得早于当前日期！',
          // image: '/images/error.png',
          icon: 'none',
          duration: 2000
        })
      }


    }
  },
  //提交增加的计划信息到后台
  submit: function (e) {
    var that = this;
    var stageNum = that.data.transformIdx + 1;
    console.log("stageNum", stageNum)

    var groupId = parseInt(that.data.groupId)
    var plan = that.data.plan;
    var deadline = that.data.deadline;
    var addTime = that.data.addTime
    console.log("sumit deadline", deadline)
    var title = that.data.title;
    // 把用户给的时间转为时间戳
    var date = that.data.date;
    var newstr = date.replace(/-/g, '/')
    var date_ = new Date(newstr)
    var time_str = date_.getTime().toString()
    console.log(that.data.planList, "time_str", time_str)
    console.log("that.data.transformIdx:", that.data.transformIdx)
    console.log(date, plan, title)

    var currentDate = new Date(); //获取系统当前时间
    var currentDate = currentDate.toLocaleDateString(); //获取当前日期
    //转为时间戳
    var currentDate_ = new Date(currentDate)
    var currentDate_ = currentDate_.getTime().toString()
    console.log("currentDate:", currentDate, "currentDate_", currentDate_)


    if (date == '' || plan == "" || title == "" ||plan.trim().length == 0||title.trim().length == 0) {
      wx.showToast({
        title: '必须都要填写',
        image: '/images/error.png',
        // icon: 'none',
        duration: 2000
      })
    } else {

      if (stageNum != 1) {
        //不是第一个日程，判断上个日程是否设置
        if (that.data.planList[that.data.transformIdx - 1].add == 0) {
          wx.showToast({
            title: '请先设置上个日程',
            icon: 'none',
            duration: 2000
          })
        } else {
          // 获取上一个日程的ddl
          var formerDate = that.data.planList[that.data.transformIdx - 1].stageDdl.substr(0, 10)
          console.log("formerDate:", formerDate)
          var formerDate_ = formerDate.replace(/-/g, '/')
          var formerDate1 = new Date(formerDate_)
          // 转为时间戳
          var formerDate2 = formerDate1.getTime().toString()
          console.log("formerDate2:", formerDate2)


          // 第二个日程要在第一个之后，deadline之前
          console.log(formerDate2 - time_str)
          console.log(time_str - deadline)
          console.log(stageNum)
          if (formerDate2 - time_str <= 0 && time_str - deadline <= 0 && stageNum != 1 && currentDate_ - time_str <= 0) {
            console.log("日期正确")
            server.request('post', 'groupSchedule/insertSchedule?', {
                "groupId": groupId,
                "userId": getApp().globalData.user_id,
                "content": plan,
                "stageDdl": date,
                "stageNum": stageNum,
                "title": title,
              },
              function (res) {
                console.log("insert sucess！", res)
                console.log("参数：",groupId,getApp().globalData.user_id,plan,date,stageNum,title)
                that.setData({
                  showModalStatus1: false,
                  show: false,
                })


                // 重新加载数据
                that.data.planList = []
                that.getAllplan()

                wx.showToast({
                  title: '添加日程成功！',
                  duration: 2000
                })

              })
          } else if (time_str - currentDate_ < 0) {
            console.log("完成日期不得早于当前日期")
            wx.showToast({
              title: '完成日期不得早于当前日期！',
              // image: '/images/error.png',
              icon: 'none',
              duration: 2000
            })
          } else if (time_str - deadline > 0) {
            wx.showToast({
              title: '完成日期不得超过组队结束日期！',
              // image: '/images/error.png',
              icon: 'none',
              duration: 2000
            })
          } else if (formerDate2 - time_str > 0) {
            // 下一个日程完成时间早于上一个日程了
            wx.showToast({
              title: '该日期不得早于上个日程的完成日期！',
              // image: '/images/error.png',
              icon: 'none',
              duration: 2000
            })
          }
        }
      } else { // 第一个日程  在deadline之前，当前时间之后即可
        console.log("first")
        console.log(time_str - deadline)
        console.log(time_str - currentDate_)
        if (time_str - deadline <= 0 && time_str - currentDate_ >= 0) {
          console.log("日期正确")
          server.request('post', 'groupSchedule/insertSchedule?', {
              "groupId": groupId,
              "userId": getApp().globalData.user_id,
              "content": plan,
              "stageDdl": date,
              "stageNum": stageNum,
              "title": title
            },
            function (res) {
             
              console.log("insert sucess！", res)
              wx.showToast({
                title: '添加日程成功！',
                duration: 2000
              })
              that.setData({
                showModalStatus1: false,
                show: false,
              })

              // 重新加载数据
              that.data.planList = []
              that.getAllplan()
              // if(res.data.message == "成功"){
              //   wx.showToast({
              //     title: '添加日程成功！',
              //     duration: 2000
              //   })
              // }
             
            })
        } else if (time_str - deadline > 0) {
          wx.showToast({
            title: '完成日期不得超过组队结束日期！',
            // image: '/images/error.png',
            icon: 'none',
            duration: 2000
          })
        } else if (formerDate2 - time_str > 0) {
          // 下一个日程完成时间早于上一个日程了
          wx.showToast({
            title: '该日期不得早于上个日程的完成日期！',
            // image: '/images/error.png',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '不得早于当前时间！',
            // image: '/images/error.png',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var i = e.detail.value.toString()
    this.setData({
      date: i
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var i = e.detail.value.toString()

    this.setData({
      date1: i
    })

  },
  // 标题内容
  bindinput0: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 计划内容
  bindinput: function (e) {
    this.setData({
      plan: e.detail.value
    })
  },
  // 修改计划标题
  bindinput2: function (e) {
    this.setData({
      title1: e.detail.value
    })
  },
  // 修改计划内容
  bindinput3: function (e) {
    this.setData({
      plan1: e.detail.value
    })
  },
  // 打开心得
  bindinput1: function (e) {
    this.setData({
      comment: e.detail.value
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