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
    "name": "财会",
    "children": [{
      "name": "注册会计师(CPA)",
      // "children": [{"name": "a1"}, {"name": "a2"}, {"name": "a3"}, {"name": "a4"}]
    }, {
      "name": "初级会计",
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
      "name": "中级会计",
      // "children": [{
      //   "name": "c1"
      // }]
    }, {
      "name": "高级会计",
      // "children": [{
      //   "name": "d1"
      // }]
    },
    {"name":"税务师"},
    {"name":"CFA"},
    {"name":"证券从业资格"},
    {"name":"AICPA"},
    {"name":"CIIA"},
    {"name":"FSP"},
    {"name":"CTP"},
    {"name":"中国精算师"},
    {"name":"皇家特许管理会计师"},
    {"name":"国际注会(ACCA)"},
  ]
  };

  var option = {
    title: {
      text: '财会类所有标签',
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
