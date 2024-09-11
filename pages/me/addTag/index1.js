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
    "name": "留学",
    "children": [{
      "name": "托福",
      // "children": [{"name": "a1"}, {"name": "a2"}, {"name": "a3"}, {"name": "a4"}]
    }, {
      "name": "雅思",
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
      "name": "留学",
      // "children": [{
      //   "name": "c1"
      // }]
    }, {
      "name": "SAT美国高考",
      // "children": [{
      //   "name": "d1"
      // }]
    },
    {"name":"托业考试"},
    {"name":"ACT美国高考"},
    {"name":"GRE"},
    {"name":"GMAT"},
    {"name":"PTE"},
    {"name":"IGCSE"},
    {"name":"STPM"},
    {"name":"NCEA"},
    {"name":"剑桥商务英语"},
    {"name":"美国私立中学入学考试"},
  ]
  };

  var option = {
    title: {
      text: '留学类所有标签',
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
      // title: 'ECharts 可以在微信小程序中使用啦！',
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
