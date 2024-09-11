var app = getApp()
var count = 0;
const server = require("../../../services/server");
Page({ 

  data: { 
slider: 0,
value:1,
    key: 0,//评分
    status:'',    //0未课评 1已课评
    teammates: [],
    groupId:0,
    teammateId:0,
    scoreList:[],
    point:0,
    empty:'',
  }, 
  sliderChange(e) {
    var that = this;
    console.log(e)
    var teammateId = e.currentTarget.dataset.id;
    var point = e.detail.value
    var scoreList = that.data.scoreList
    console.log(scoreList.length)
    console.log("teammateId",teammateId)
    var groupId = parseInt(that.data.groupId)
    var mate = {
      "groupId":groupId,
      "judgerId":getApp().globalData.user_id,
      "judgedId":teammateId,
      "point":point
    };
    console.log("mate:",mate)
    if( scoreList.length == 0){
      that.data.scoreList.push(mate)
    }
    console.log("scoreList:",that.data.scoreList)
    function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

      for (var i = 0; i < arraytosearch.length; i++) {
          if (arraytosearch[i][key] == valuetosearch) {
              return i;
          }
      }
      return -1;
  }

    var flag = functiontofindIndexByKeyValue(scoreList, 'judgedId', teammateId)
    if(flag != -1){
      console.log('teammateId存在');
      scoreList[flag].point = point
    } else{
      console.log('teammateId不存在');
      this.data.scoreList.push(mate)
    }
    console.log("scoreList之后:",this.data.scoreList)
    this.setData({
      scoreList:this.data.scoreList,
      slider: e.detail.value,
    })
},
bindchange(e) {
    console.log(e)
},
  onLoad: function (options) { 
    // console.log(options.status)
     //先设置参数
     this.setData({
      "groupId":options.id,
      
    })
    this.teammates()
    this.sliderChange()

  }, 


// 展示队友
teammates:function(){
  var that = this;
  that.data.teammates = [];
  var groupId = parseInt(that.data.groupId)
  console.log(groupId,getApp().globalData.user_id)
  server.request('get','group/showPointsList?',
  {
    "groupId":groupId,
    "userId":getApp().globalData.user_id
  },
  function(res){
      console.log("评分时展示队友:",res) 
      var allMates = res.data.response
  
      for(var i = 0;i<allMates.length;i++)
      {
        if(allMates[i].leaveTime != null){//队友提前结束了
          var tiqian = true
          var leaveTime = allMates[i].leaveTime.substring(0,10)
        }else{
          var tiqian = false;
          var leaveTime = null
        }
        
        var mateArray = {
          groupId:allMates[i].groupId,
          userId:allMates[i].userId, //队友id
          teammateName:allMates[i].name,
          score:0,
          leaveTime:leaveTime,
          maxPoint:allMates[i].maxPoint,
          tiqian:tiqian,
        };
        // 默认值
        var scorDefalut ={
            "groupId":groupId,
            "judgerId":getApp().globalData.user_id,
            "judgedId":allMates[i].userId,
            "point":1
        }
        // that.data.nameList.push(allMates[i].teammateName)
        that.data.teammates = that.data.teammates.concat(mateArray)
        that.data.scoreList = that.data.scoreList.concat(scorDefalut)
      };
      if(that.data.teammates.length == 0){
        var empty = true;
      }else{
        var empty = false;
      }
      that.setData({
        teammates:that.data.teammates,
        scoreList:that.data.scoreList,
        empty:empty
      })
     
      // console.log("评分时展示队友:",that.data.scoreList) 
       });
      
    
  },
 
  // 确定按钮
  startRating: function (e) {
    var that = this;
    var scoreList = that.data.scoreList;        
          var groupId = that.data.groupId;
          var pointList = []
          var judgedIdList =[]
          for(var i = 0;i<scoreList.length;i++)
          {
            var j = scoreList[i].point;
            var k = scoreList[i].judgedId;
            pointList.push(j)
            judgedIdList.push(k)
          }
          console.log(groupId,getApp().globalData.user_id,pointList,judgedIdList)
          console.log("pointList:",pointList)
          console.log("judgedIdList",judgedIdList)

          console.log("groupId",groupId)
          console.log("judgerId",getApp().globalData.user_id)
          console.log("point",pointList)
          console.log("judgedId",judgedIdList)
          
          server.request('post','group/insertPoints?',
          {
            "groupId":groupId,
            "judgerId":getApp().globalData.user_id,
            "point":pointList,
            "judgedId":judgedIdList
          },
          function(res){
            if(res.data.message=="成功"){
              wx.switchTab({
                url: '/pages/index/index',   
             });
             wx.showModal({
              showCancel:false,
              content:'已结束组队！'
            })
            }else{
              wx.showModal({
                showCancel:false,
                content:res.data.message
              })
            }
            
            
            console.log("score success！",res)
            
           
          })
        

  }
 })