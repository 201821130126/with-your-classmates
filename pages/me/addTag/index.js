import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var data1 = {
    "name": "大学",
    "children": [{
      "name": "英语四级",
      // "children": [{"name": "a1"}, {"name": "a2"}, {"name": "a3"}, {"name": "a4"}]
    }, {
      "name": "考研",
      // "children": [{
      //   "name": "b1"}, {"name": "b2"}, {"name": "b3"}, {"name": "b4"}]
    }, {
      "name": "英语六级",
      // "children": [{
      //   "name": "c1"
      // }]
    }, {
      "name": "专升本",
      // "children": [{
      //   "name": "d1"
      // }]
    },
    {"name":"自考"},
    {"name":"考博"},
    {"name":"成人考试"},
    {"name":"保研"},
    {"name":"英语专业四级考试"},
    {"name":"英语专业八级考试"},
    {"name":"全国英语等级考试（PET）"},
    {"name":"双学位"},
    {"name":"大学学习"},
  ]
  };

  var option = {
    title: {
      text: '大学类所有标签',
      left: 'center',
    },
    series: [{
      type: 'tree',

      initialTreeDepth: -1,

      name: 'tree1',

      data: [data1],

      top: '25%',
      left: '20%',
      bottom: '2%',
      right: '15%',

      symbolSize: 10,
      symbol: 'circle',

      label: {
        normal: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          color: 'black'
        }
      }

    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
