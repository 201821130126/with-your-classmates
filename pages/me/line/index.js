import * as echarts from '../../../ec-canvas/echarts';
import server from '../../../services/server';
// const server = require("../../../services/server");
// var app=getApp()
const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '历史评分变化曲线',
      left: 'center'
    },
    color: ["#37A2DA"],
    legend: {
      data: ['评分值'],
      top: 30,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooldongTai: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: getApp().globalData.tag,
      axisLabel: {
        interval: 0,
        rotate: 40
      },
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '评分值',
      type: 'line',
      smooth: true,
      data: getApp().globalData.pointJudged
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  onShareAppMessage: function (res) {
    return {
      // title: 'ECharts 可以在微信小程序中使用啦！',
      success: function () {},
      fail: function () {}
    }
  },
  getDataJudged: function () {
    var that = this;
    server.request(
      'POST',
      'personal/showPointJudged?', {
        "id": getApp().globalData.user_id
      },
      function (res) {
        console.log(res.data);
        console.log(res.data.response);
        if (res.data.response.length == 0) {
          wx.showToast({
            title: '暂无评分记录！',
            icon: 'none',
            duration: 2000
          })
        } else {
          for (var i = 0; i < res.data.response.length; i++) {
            getApp().globalData.pointJudged.push(res.data.response[i].point),
              getApp().globalData.tag.push(res.data.response[i].tagName)
          };
          console.log(getApp().globalData.pointJudged);
          // var starScore = 0;
          // for (var i = 0; i < getApp().globalData.pointJudged.length; i++) {
          //   starScore =starScore+ getApp().globalData.pointJudged[i];
          // }
          // starScore = (starScore / getApp().globalData.pointJudged.length).toFixed(1)
          // that.setData({
          //   "starScore": starScore
          // })
          // console.log(starScore)
          console.log(getApp().globalData.tag)
        }
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

  onLoad: function (options) {
    getApp().globalData.tag = [];
    getApp().globalData.pointJudged = [];
    this.getDataJudged();
    // this.getDataScore();
  },

  data: {
    flag: false,
    ec: {
      onInit: initChart
    }
    // starScore: 0, //初始总评分
    // pointJudged:[],
    // tag:[],
    // score:[],
    // visible2:true,
   
  },

  onReady() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading'
    })
    getApp().globalData.tag = [];
    getApp().globalData.pointJudged = [];
    this.getDataJudged();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
});