// pages/label/label.js
const server = require("../../../services/server");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label:["计算机二级"],
    temp:0,
    isdelete:false,
    delete:"",
    'tagName':null,
    'chooseTag':null,
    user_id:'',
    title:["计算机二级"],
    item:[],
    com:[],
    item3:[],
    item4:[],
    item5:[],
    item6:[],
    item7:[],
    item8:[],
    item9:[],
    item10:[],
    item11:[],
    item12:[],
  tag:[],
  choose1:"",
  tagType1:"",
  tagType2:"",
  tagType3:"",
  tagType4:"",
  tagType5:"",
  tagType6:"",
  tagType7:"",
  tagType8:"",
  tagType9:"",
  tagType10:"",
  tagType11:"",
  tagType12:"",
  order:[0,1,2],
  disabled:true,
  isVisible:false
  },
  add:function(e){
    if(this.data.temp<1){
    this.data.temp=this.data.temp+1,
    console.log(this.data.temp),
    //this.data.chooseTag=e.currentTarget.dataset.lockerid
    //this.data.haschoose=e.currentTarget.dataset.lockerid.tagName,
    getApp().globalData.chooseTag=e.currentTarget.dataset.lockerid,
    getApp().globalData.haschoose=e.currentTarget.dataset.lockerid.tagName,
    this.data.choose1=e.currentTarget.dataset.lockerid.tagName,
    // this.data.delete="x",
    this.data.isVisible=true,
    this.data.disabled=false,
    //console.log(this.data.haschoose),
    //console.log(this.data.chooseTag)
    console.log(getApp().globalData.chooseTag),
    console.log(getApp().globalData.haschoose)
    this.setData({
      temp:this.data.temp,
      isVisible:this.data.isVisible,
      //haschoose:this.data.haschoose,
      delete:this.data.delete,
      disabled:this.data.disabled,
      choose1:this.data.choose1
      //chooseTag:this.data.chooseTag
    })}
    else if(this.data.temp=1){
      wx.showToast({
        title:'目标标签最多可选1个',
        icon:'none',
        duration:2000
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  onSubmit:function(){
    var that=this;
    server.request(
      'POST',
      'tag/selectTag?',
      {
        "id":getApp().globalData.user_id,
        "tagId":getApp().globalData.chooseTag.id,
        // "tagInfos": [
        //   {
        //     "id": getApp().globalData.chooseTag.id,
        //     "tagName":getApp().globalData.chooseTag.tagName,
        //     "type": getApp().globalData.chooseTag.type
        //   }
        // ]
      },
      function (res) { //？？？对应的是接口名
        // that.data.forums = res.data.response;
        // that.setData({
        //   forums: that.data.forums,
        // })
        console.log(getApp().globalData.user_id)
        console.log(getApp().globalData.chooseTag.tagName)
        console.log(getApp().globalData.chooseTag.type)
        console.log(getApp().globalData.chooseTag.id)
        console.log(getApp().globalData.token)
        console.log(res);
      },
      function (error) {
        //调用服务端登录接口失败
      },
      {"Content-Type": "application/x-www-form-urlencoded"}
    )
  },

  getAllTag:function(e){
    var that = this;
    server.request(
      'get',
      'tag/getMatchPage/'+getApp().globalData.user_id+'?',
      {
        token:getApp().globalData.token,
        user_id:getApp().globalData.user_id
      },
      function(res){
      console.log(res.data)
      console.log(res.data.response.tags[0].tag[0].tagName);
      //console.log(app.globalData.token);
      //console.log(app.globalData.user_id)
      if(res.data.response.tags[0].tagType=1){
        that.data.tagType1="大学",
        that.data.item=res.data.response.tags[0].tag
      }
      if(res.data.response.tags[1].tagType=2){
        that.data.tagType2="留学",
        that.data.com=res.data.response.tags[1].tag
      }
      if(res.data.response.tags[2].tagType=3){
        that.data.tagType3="语言",
        that.data.item3=res.data.response.tags[2].tag
      }
      if(res.data.response.tags[3].tagType=4){
        that.data.tagType4="财会",
        that.data.item4=res.data.response.tags[3].tag
      }
      if(res.data.response.tags[4].tagType=5){
        that.data.tagType5="公务员",
        that.data.item5=res.data.response.tags[4].tag
      }
      if(res.data.response.tags[5].tagType=6){
        that.data.tagType6="教育",
        that.data.item6=res.data.response.tags[5].tag
      }
      if(res.data.response.tags[6].tagType=7){
        that.data.tagType7="心理",
        that.data.item7=res.data.response.tags[6].tag
      }
      if(res.data.response.tags[7].tagType=8){
        that.data.tagType8="管理",
        that.data.item8=res.data.response.tags[7].tag
      }
      if(res.data.response.tags[8].tagType=9){
        that.data.tagType9="法律",
        that.data.item9=res.data.response.tags[8].tag
      }
      if(res.data.response.tags[9].tagType=10){
        that.data.tagType9="翻译",
        that.data.item10=res.data.response.tags[9].tag
      }
      if(res.data.response.tags[10].tagType=11){
        that.data.tagType11="保险",
        that.data.item11=res.data.response.tags[10].tag
      }
      if(res.data.response.tags[11].tagType=12){
        that.data.tagType11="办公技能",
        that.data.item12=res.data.response.tags[11].tag
      }
      that.setData({
        tagType1:that.data.tagType1,
        tagType2:that.data.tagType2,
        tagType3:that.data.tagType3,
        tagType4:that.data.tagType4,
        tagType5:that.data.tagType5,
        tagType6:that.data.tagType6,
        tagType7:that.data.tagType7,
        tagType8:that.data.tagType8,
        tagType9:that.data.tagType9,
        tagType10:that.data.tagType10,
        tagType11:that.data.tagType11,
        tagType12:that.data.tagType12,
        item:that.data.item,
        com:that.data.com,
        item3:that.data.item3,
        item4:that.data.item4,
        item5:that.data.item5,
        item6:that.data.item6,
        item7:that.data.item7,
        item8:that.data.item8,
        item9:that.data.item9,
        item10:that.data.item10,
        item11:that.data.item11,
        item12:that.data.item12,
      })
    },
      function(error){
        console.log(error);
        console.log(app.globalData.token);
        console.log(app.globalData.user_id)
      }
    )
  },
  close:function(){
    if(this.data.temp>0){
    this.data.temp=this.data.temp-1,
    console.log(this.data.temp),
    //this.data.haschoose="",
    //this.data.chooseTag=[],
    app.globalData.haschoose="",
    app.globalData.chooseTag=[],
    this.data.choose1="",
    // this.data.delete="",
    this.data.disabled=true,
    this.data.isVisible=false,
    this.setData({
      temp:this.data.temp,
      //haschoose:this.data.haschoose,
      // delete:this.data.delete,
      isVisible:this.data.isVisible,
      disabled:this.data.disabled,
      choose1:this.data.choose1
      //chooseTag:this.data.chooseTag
    })}
  },
 
  remove:function(array,val){
   for(var i=0;i<array.length;i++)
   {
     if(array[i]==val){
       array.splice(i,1);
     }
   }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.getAllTag();
  this.setData({
    logged:true,

    userInfo:app.globalData.userInfo,
    url:app.globalData.url //服务器端的url
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
  onHide:function(){
  
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