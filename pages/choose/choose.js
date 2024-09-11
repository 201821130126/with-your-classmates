// pages/choose/choose.js
Page({
    //添加计划,展示弹窗
    dongTais: function (e) {
      this.setData({
        showModalStatusdongTais: true,
      })
  
    },
      // 关闭弹窗
  close() {
    this.setData({
      showModalStatusdongTais:false,
    })
  },
  menu:function(e){
    var itemId = e.currentTarget.id
    var data = this.data.menus
    var i =data[itemId].id
    //遍历data。menus数组，如果不等于现在点击的数，则把下拉菜单收起来
    for(var j=0;j<data.length;j++){
      if(i !== j){
        data[j].hiddens = true
        this.setData({
          menus: data
        })
      }
    }
   //  点击显示隐藏
    if (itemId == i){
      data[i].hiddens = !data[i].hiddens
       this.setData({
         menus:data
       })
     }
  },
 //  点击更换列表值
  txt:function(e){
    var data= this.data.menus
   //  获取到点击的列表下标，因为是在下拉的父元素点击，所以获取到menus下标
    var index= e.currentTarget.dataset.index
   //  获取到点击的值，赋值给默认值（e.target为e的属性值，在标签内赋值
    data[index].defaults = e.target.dataset.txt
    //，收起菜单
    data[index].hiddens = !data[index].hiddens
   //  刷新menus的值
    this.setData({
      menus: data
    })
  },
  tap:function(){
   /* var num=parseInt(Math.random()*300+1)
    this.setData({
      x:num,
      y:num,
    });
    console.log(num)
    if(num>100){ */
      wx.showToast({
      title:'已选择目标标签',
      icon:'success',
      duration:2000
      })
    //}
  },
  /**
   * 页面的初始数据
   */
  data: {
    showModalStatusdongTais:false,
    menus:[
      { 
        id:0,
        hiddens: true,
        title:"组队类型",
        defaults:"创建队伍",
        txt:[
          {lis:"创建队伍"},
          {lis:"加入队伍"}
          ]}],
      item:[
        {id:0,
        title:"四级",
        locate:[
        {x:123},
        {y:123}]
       },
        {id:1,
          title:"全国六级",
          locate:[
            {x:153},
            {y:343}]
          },
          {id:2,
            title:"考研",
            locate:[
              {x:173},
              {y:133}]
           },
           {id:3,
            title:"计算机等级考试",
            locate:[
              {x:323},
              {y:223}]
           },
           {id:4,
            title:"保研",
            locate:[
              {x:323},
              {y:223}]
           },
           {id:5,
            title:"挑战杯",
            locate:[
              {x:323},
              {y:223}]
           }
      ],
      itemname:[1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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