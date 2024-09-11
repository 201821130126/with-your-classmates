// pages/plan/plan.js
const server = require("../../../services/server");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId:"",
    planList:[],
    plan0:'',
    transformIdx:0,
    dakaShow:"",
    wanchengShow:"",
   order:["First","Second","Third","Fourth","Fifth"],
   show:false,
   teammateId:"",
   showModalStatus: false,
   plan:"",
   date:"",
   planId:0,
   position: 'center',
   duration: 300,
   overlay: false,
   add:1//打卡按钮显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先设置参数
    this.setData({
      "groupId":options.id,
      "teammateId":options.teammateId

    })

  },
  showInfo(e) {
    const idx = e.currentTarget.dataset.idx
    var planList = this.data.planList
    if (planList[idx].add == 0){
       var dakaShow = false;
    }
    else
    {
      var dakaShow = !planList[idx].checked
    }
    this.setData({
      show: true,
      plan0: planList[idx].content,
      transformIdx: idx,
      dakaShow:dakaShow,
      add:planList[idx].add,
      // wanchengShow:planList[idx].checked,

    })
    console.log("content:",this.data.planList[idx].content)
  },

  // 获取队友日程信息
  getAllplan:function(){
    var that = this;
    var groupId = parseInt(that.data.groupId)
    var teammateId =  parseInt(that.data.teammateId)
    server.request('post','groupSchedule/showSchedule?',
    {
      "groupId":groupId,
      "userId":teammateId,
    },
    function(res){
      var allPlan = res.data.response
       console.log("队友日程",res)
      
      for(var i = 0;i<allPlan.length;i++)
      {
        var timeFromDdl = allPlan[i].timeFromDdl
        //  未打卡
        var dakaShow = 1; 
      if(allPlan[i].groupSchedule.checked == false){
        console.log("allPlan[i].groupSchedule.checked:",allPlan[i].groupSchedule.checked)
            if(timeFromDdl < 0 )
            {//逾期了，=0也说明逾期
              var end = true;
              var dakaShow = 0;
              var leave = false;
            } else if (timeFromDdl <= 3 && timeFromDdl>=0){
              //快到了
              var leave = true;
              var end = false;
            }else{//正常还有很长时间
              var end = false;
              var leave = false;
        }
        } else{//已打卡
          var end = false
          var leave = false

        }


        var planArray = {
          content:allPlan[i].groupSchedule.content,
          subContent:allPlan[i].groupSchedule.content.substr(0,11),
          stageDdl:'DDL:'+allPlan[i].groupSchedule.stageDdl.substr(0,10),
          addTime:allPlan[i].groupSchedule.addTime,
          groupInfoId:allPlan[i].groupSchedule.groupInfoId,
         checked:allPlan[i].groupSchedule.checked,
         add:1,
         //  checked:false,
         // unchecked:true,
         unchecked:!(allPlan[i].groupSchedule.checked),
          stageNum:allPlan[i].groupSchedule.stageNum,
          timeFromDdl:allPlan[i].timeFromDdl,
          leave:leave,
          end:end,
          dakaShow:dakaShow,

        
        }
        that.data.planList = that.data.planList.concat(planArray)
      };
      // 填补
      if( allPlan.length<5){
        for(var j = 0;j<5-allPlan.length;j++){
        var planNull = {
          content:"队友还未设置计划噢",
          // stageDdl:allPlan[i].stageDdl,
          // addTime:allPlan[i].addTime,
          // groupInfoId:allPlan[i].groupInfoId,
          checked:false,
          add:0,
          stageNum:allPlan.length + j + 1,
     }
     that.data.planList = that.data.planList.concat(planNull)
    }
      }
      //改名字
      if(that.data.planList[0].stageNum==1)
      that.setData({
        planList:that.data.planList
      })
console.log(that.data.planList)
       });
      
    
  },




 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAllplan()
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
    this.getAllplan()
    wx.stopPullDownRefresh();  //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  showPrev() {
    this.setData({
      show: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})