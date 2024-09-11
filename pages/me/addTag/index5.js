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
    "name": "教育",
    "children": [{
      "name": "中小学教师资格",
      // "children": [{"name": "a1"}, {"name": "a2"}, {"name": "a3"}, {"name": "a4"}]
    }, {
      "name": "幼师资格",
      // "children": [{
      //   "name": "b1"
      // }, {
      //   "name": "b2"
      // }, {
      //   "name": "b3"
      // }, {
      //   "name": "b4"
      // }]
    }, {
      "name": "高校教师资格",
      // "children": [{
      //   "name": "c1"
      // }]
    }, {
      "name": "国际注册汉语教师资格",
      // "children": [{
      //   "name": "d1"
      // }]
    },
    {"name":"TESOL"},
    {"name":"保育员"},
    {"name":"通用教育证书(GCE)"},
    {"name":"教育编制"},
  ]
  };

  var option = {
    title: {
      text: '教育类所有标签',
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
      // path: '/pages/index/index',
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
