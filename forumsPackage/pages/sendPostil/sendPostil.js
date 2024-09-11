const server = require("../../../services/server");
const server_url = 'https://www.cqcwangluo.site/static';
const app = getApp();21
Page({
  data: {

    formdata: '',
    default: './images/bg2.png',
    forumName: '',
    forumId: '',
    userId: getApp().globalData.userId,
    if_img: false, //是否选择上传图片 
    img_arr: [], //存储图片的列表
    img_url: [],
    if_file: false, //是否选择上传文件
    fileName: '点击上传附件', //附件名称 
    fileImg: 'https://www.cqcwangluo.site/static/images/upFile.png', //提示上传的附件类型
    suffixs: '', //附件后缀 
    file_num: 0,
    temp_url: null, //本机附件url
    file_url: null, //服务器附件url
    temp_file_url: null, //暂时的本地附件位置
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['0', '5', '10', '20', '50', '100', '150', '200'], //下拉列表的数据
    index: -1, //选择的下拉列表下标
    ifDefault: true, //指示当前是否选择了所需积分
    upStage: false, //是否处于上传状态
  },
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    wx.showLoading({
      title: "加载中",
    })
    that.setData({
      "upStage": true, //表示已经处于上传状态
    })
   
    var title = e.detail.value.title;
    var content = e.detail.value.content;
    console.log(title)
    console.log(content)
    if(title.trim().length==0){
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showModal({
        showCancel:false,
        content:'标题不可全为空格！'
      })
      that.setData({
        "upStage": false, 
      })
    }else if(content.trim().length==0){
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showModal({
        showCancel:false,
        content:'内容不可全为空格！'
      })
      that.setData({
        "upStage": false, 
      })
    }else{
      that.uploadImage(e); //上传图片
    }
    console.log(e.detail.value.title.trim().length==0)
    console.log("title", e.detail.value.title)
    console.log("content", e.detail.value.content)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)



  },

  formReset: function () {
    console.log('form发生了reset事件');
    this.setData({
      img_arr: [],
      // 置图片为空
      if_file: false,
      if_img: false,
      ifDefault: true,
      file_num: 0,
      file_url: null, //附件url
      fileName: '点击上传附件', //附件名称 
      fileImg: 'https://www.cqcwangluo.site/static/images/upFile.png', //提示上传的附件类型
      index:-1,//积分值下标为-1

    })
  },

  // 真正的发帖函数
  Submit: function (e) {

    var that = this;
    // 等待10s再执行
    var scoreCost;
    //所需积分
    if (that.data.index == -1) {
      scoreCost = -1;
    } else {
      scoreCost = that.data.selectData[that.data.index];
    }
    console.log("forumId", that.data.forumId)
    console.log("title", e.detail.value.title)
    console.log("content", e.detail.value.content)
    console.log("fileUrl", that.data.file_url)
    console.log("fileName", that.data.fileName)
    console.log("userId", app.globalData.user_id)
    console.log("picUrl", that.data.img_url)
    console.log("scoreCost", scoreCost)
    server.request(
      'post',
      'forum/addNews?', {
        "forumId": that.data.forumId,
        "title": e.detail.value.title,
        "content": e.detail.value.content,
        "fileUrl": that.data.file_url, //
        "fileName": that.data.fileName, //
        "userId": app.globalData.user_id,
        "picUrl": that.data.img_url,
        "scoreCost": scoreCost,
      }
      // )
      ,
      function (res) { //？？？对应的是接口名

        if (res.data.message == '成功') {
          wx.hideLoading({})
          wx.showToast({
            title: '帖子发布成功！',
            icon: 'success',
            duration: 2000
          });
          //返回到讨论帖列表
          wx.navigateBack({
            delta: 1 //返回上一级页面
          })
          // wx.redirectTo({
          //   url: '../discuss/discuss?forumId=' + that.data.forumId + '&forumName=' + that.data.forumName,
          // })
        } else {
          wx.hideLoading({})
          wx.showModal({
            content: res.data.message,
            showCancel: false
          });
          that.setData({
            "upStage": false, //将发布状态更新为false
          })
        }
        console.log(res);

      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
        wx.hideLoading({})
        wx.showModal({
          content: '系统繁忙！',
          showCancel: false
        });
        that.setData({
          "upStage": false, //将发布状态更新为false
        })
      },
      // {"Content-Type": "application/json"},
      // {"Content-Type": "application/x-www-form-urlencoded"}
    )

  },
  //  真正的上传图片到服务器函数
  uploadImage: function (e) {
    var that = this;
    if (this.data.img_arr.length == 0) {
      //不上传图片
      new Promise((resolve, reject) => {
        console.log('不执行上传图片函数')

        resolve()
      }).then(res => {
        //res就是resolve传过来的that.data.a，都可以用
        console.log('传值res', res)
        console.log('直接执行上传文件函数')
        that.uploadFile(e); //上传文件
      })
    } else {
      // 一次性上传所有图片
      new Promise((resolve, reject) => {
        console.log('上传图片函数')
        for (var i = 0; i < that.data.img_arr.length; i++) {
          console.log('hhh')
          wx.uploadFile({
            url: 'https://www.cqcwangluo.site:8050/forum/uploadPicture',
            filePath: that.data.img_arr[i],
            //后台获取我们图⽚片的key
            name: 'newsImage',
            //额外的参数formData
            formData: {
              token: wx.getStorageSync("token")
            },
            success: function (res) {
              console.log('yyy')
              console.log(res.data)
              var imgUrl = JSON.parse(res.data).response;
              console.log(imgUrl)
              that.setData({
                img_url: that.data.img_url.concat('https://www.cqcwangluo.site/static' + imgUrl)
              })
              console.log(i)
              console.log(that.data.img_url.length)
              if (i == that.data.img_url.length) {
                resolve('所有的图片已上传') //说明成功上传了所有图片
              }
            },
            fail: function (res) {
              console.log(res)
              resolve()
              wx.showToast({
                title: '图片上传失败',
                icon: 'error',
                duration: 2000
              })
            },
          })

        }
        // console.log(that.data.img_url.length)
        // console.log(that.data.img_arr.length)
        // if(that.data.img_url.length == that.data.img_arr.length) {
        //   resolve('所有的图片已上传')//说明成功上传了所有图片
        // }  
      }).then(res => {
        //res就是resolve传过来的that.data.a，都可以用
        console.log(res)
        console.log('执行完上传图片函数')
        that.uploadFile(e); //上传文件
      })
    }


  },

  // 是否点击上传图片按钮
  ifImg: function (e) {
    var that = this;
    // var if_img = that.data.if_img;
    that.setData({
      if_img: true,
    })
  },
  //  选择本地的图片上传
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 4) {
      wx.chooseImage({
        count: 9,
        sizeType: ['original'],
        sourceType: ['album', 'camera'], //支持选取图⽚
        success(res) {
          //  tempFilePath可以作为img标签的src属性显示图⽚片

          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
          console.log(that.data.img_arr)
        }
      })
    } else {
      wx.showToast({
        title: '最多上传四张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  // 删除图片
  deleteImg: function (e) {
    var img_arr = this.data.img_arr;
    var index = e.currentTarget.dataset.index;
    img_arr.splice(index, 1);
    this.setData({
      img_arr: img_arr
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var img_arr = this.data.img_arr;
    wx.previewImage({
      //当前显示图片
      current: img_arr[index],
      //所有图片
      urls: img_arr
    })
  },

  // 真正的上传文件函数
  uploadFile: function (e) {
    //选取图⽚
    var that = this;
    if (that.data.file_num == 0) {
      //不上传附件
      new Promise((resolve, reject) => {
        console.log('不执行上传文件函数')
        resolve()
      }).then(res => {
        //res就是resolve传过来的that.data.a，都可以用
        console.log('传值res', res)
        console.log('直接执行发帖函数')
        that.Submit(e); //上传文件
      })
    } else {
      new Promise((resolve, reject) => {
        console.log('上传文件函数')
        wx.uploadFile({
          //请求后台的路径
          url: 'https://www.cqcwangluo.site:8050/forum/uploadFile',
          //⼩小程序本地的路路径
          filePath: that.data.temp_url,
          //后台获取我们图⽚片的key
          name: 'newsFile',
          //额外的参数formData
          formData: {
            "token": wx.getStorageSync("token"),

          },
          success: function (res) {

            //上传附件成功
            console.log(res.data)
            console.log(res.data.message)
            if (JSON.parse(res.data).message == "成功") {
              var fileUrl = JSON.parse(res.data).response;
              console.log(fileUrl)
              that.setData({
                // "file_url": server_url+fileUrl,
                "file_url": server_url + fileUrl
              })
              resolve('所有的文件已上传')
            }else{
              wx.hideLoading({
                success: (res) => {},
              })
              wx.showModal({
                content:JSON.parse(res.data).message,
                showCancel:false,
                
              })
            }
          },
          fail: function (res) {
            console.log(res)
            resolve()
            wx.showToast({
              title: '文件上传失败',
              icon: 'error',
              duration: 2000
            })
          },
        })

      }).then(res => {
        //res就是resolve传过来的that.data.a，都可以用
        console.log('传值res', res)
        console.log('执行完上传文件函数')
        that.Submit(e); //上传文件
      })


    }
    console.log('执行完了上传文件')
  },
  // 是否点击上传文件按钮
  ifFile: function (e) {
    var that = this;
    that.setData({
      if_file: true,
    })
  },
  // 选择本地的文件上传
  chooseFile: function () {
    var that = this;
    if (that.data.file_num == 1) {
      wx.showToast({
        title: '最多上传一个文件',
        icon: 'loading',
        duration: 3000
      });
    } else {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        extension: ['doc', 'docx', 'pdf', 'xls','xlsx'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res.tempFiles[0].name)
          const tempFilePaths = res.tempFiles[0].path
          const fileName = res.tempFiles[0].name
          var suffixs = fileName.split('.').pop(); //获得文件后缀
          if (tempFilePaths.indexOf('.pdf') == -1 && tempFilePaths.indexOf('.docx') == -1 && tempFilePaths.indexOf('.doc') == -1 && tempFilePaths.indexOf('.xls') == -1) { // 限制了具体文件类型
            wx.showModal({
              content: '仅支持pdf,docx,doc,xls,xlsx格式！',
            })

          } else {
            that.setData({
              "file_num": that.data.file_num + 1,
              "temp_url": tempFilePaths,
              "fileName": fileName, //设置本机上传的文件名称
              "suffixs": suffixs, //存储文件后缀
            })
            that.chooseFileImg();

          }
        }
      })
    }
  },
  // 选择文件所显示的图片
  chooseFileImg() {
    var that = this;
    var suffixs = that.data.suffixs;
    if (suffixs == 'doc' || suffixs == 'docx') {
      that.setData({
        "fileImg": 'https://www.cqcwangluo.site/static/images/WORD.png',
      })
    } else if (suffixs == 'xls' || suffixs == 'xlsx') {
      that.setData({
        "fileImg": 'https://www.cqcwangluo.site/static/images/Excel.png',
      })
    } else if (suffixs == 'pdf') {
      that.setData({
        "fileImg": 'https://www.cqcwangluo.site/static/images/PDF.png',
      })
    } 
    // else {
    //   that.setData({
    //     "fileImg": 'https://www.cqcwangluo.site/static/images/zip.png',
    //   })
    // }
  },

  // 删除文件
  deleteFile: function (e) {
    this.setData({
      ifDefault: true,
      file_num: 0,
      file_url: null, //附件url
      fileName: '点击上传附件', //附件名称 
      fileImg: 'https://www.cqcwangluo.site/static/images/upFile.png', //提示上传的附件类型
    });
  },

  // 设置下载附件所需积分
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      ifDefault: false,
      index: Index,
      show: !this.data.show
    });
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

  },

  // 点击 tab 时触发
  onTabItemTap(item) {
    this.getAllforums();
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
  },
  onLoad: function (options) {
    this.setData({
      "forumName": options.forumName,
      "forumId": options.forumId,

    })
  },

})