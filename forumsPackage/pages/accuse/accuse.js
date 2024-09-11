const js_package = require('../../../utils/util.js');
Page({
  data: {
    rest_num: 200,
    type: 0,
    category_arr: [{
      id: 0,
      type: 'handwriting',
      name: '考研'
    }, {
      id: 1,
      type: 'painting',
      name: '考证'
    }, {
      id: 2,
      type: 'money',
      name: '期末考试'
    }, {
      id: 3,
      type: 'stamp',
      name: '比赛组队'
    }, {
      id: 4,
      type: 'mounting',
      name: '交友'
    }, {
      id: 5,
      type: 'ticket',
      name: '大型考试'
    }, {
      id: 6,
      type: 'heritage',
      name: '选课交流'
    }, {
      id: 7,
      type: 'art_work',
      name: '经验介绍'
    }, {
      id: 8,
      type: 'other',
      name: '其他'
    }],
    input_form: '',
    text_form:''
  },
  getText(e) { //节流防抖
    js_package.debounce(this.textChange, 800, 10000, e);
  },
  getInput(e){
    js_package.debounce(this.inputChange, 800, 10000, e);
  },
  inputChange(e){
    this.setData({
      input_form: e.detail.value
    });
  },
  textChange(e) {
    const rest_num = 200 - e.detail.value.length;
    this.setData({
      text_form: e.detail.value,
      rest_num: rest_num
    });
  },
  bindPickerChange(e) {//类型选择
    this.setData({
      type: e.detail.value
    })
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})