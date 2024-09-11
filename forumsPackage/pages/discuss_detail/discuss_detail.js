// pages/discussion/detail3/detail3.js
const server = require("../../../services/server");
const server_url = 'https://www.cqcwangluo.site/static';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 讨论区名称
    forumName: '',
    // 讨论帖id
    forumNewsId: '',
    // 帖子详情
    postil: '',
    // 帖子发布时间
    pubTime: '',
    // 帖子图片
    picUrl: [],
    // 帖子文件
    fileUrl: '',
    // 文件后缀
    suffixs: '',
    // 文件图片显示路径
    fileImg: '',
    // 文件名
    fileName: '',
    // 是否显示举报框
    showModalStatus: false,
    // 举报的类型（1:帖子，2:评论）
    repType: '',
    newsOrCommentId: '', //举报的帖子或评论id
    // 是否点击点赞按钮
    ifLike: '',
    // 点赞数
    likeNum: '',
    // 是否点击评论按钮
    to_comment: false,
    // 评论相关
    inputVal: '', //评论框中输入的内容
    CommentList: [],
    currCommIdx: -1, //当前评论的编号
    ReplyVal: '', //回复框中输入的内容

  },

  // 删除帖子
  del_btn: function () {
    var that = this;
    wx.showModal({
      title: '警告',
      content: '确定要删除该帖子？',
      showCancel: true, //是否显示取消按钮

      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {

          server.request(
            'get',
            'forum/deleteForumNews?forumNewsId=' + that.data.forumNewsId + '&', {
              // "userId": getApp().globalData.user_id,
            }
            // )
            ,
            function (res) { //？？？对应的是接口名
              console.log(res)
              // 返回上级页面
              wx.navigateBack({

              })

            },
            function (error) {
              //调用服务端登录接口失败
              console.log(error);
            }
          )
        }
      }
    })







  },

  // 举报功能
  powerClose: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    // 对应的是data-statu
    this.util(currentStatu)
  },
  // 小窗口显示
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var repType = e.currentTarget.dataset.reptype;
    var newsOrCommentId = e.currentTarget.dataset.newsorcommentid;
    console.log(e)
    this.setData({
      "repType": repType,
      "newsOrCommentId": newsOrCommentId,
    })
    // 对应的是data-statu
    this.util(currentStatu)
    console.log(this.data.repType, this.data.newsOrCommentId)
  },
  // 设置弹窗部分的动画
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 60, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 60)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  // 表单提交
  repFormSubmit: function (e) {
    console.log(e)
    var that = this;
    console.log(getApp().globalData.user_id)
    console.log(that.data.repType)

    console.log(e.detail.value.repReason)
    console.log(that.data.newsOrCommentId)
    server.request(
      'post',
      'forum/report?', {
        "reporterId": getApp().globalData.user_id,
        "type": that.data.repType,
        "reason": e.detail.value.repReason, //举报理由，必填
        "newsOrCommentId": that.data.newsOrCommentId,
      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        if (res.data.message == '成功') {
          wx.showToast({
            title: '举报成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '注意',
            content: res.data.message + '!',
            showCancel: false,
          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
        wx.showToast({
          title: '失败，请重试！',
          icon: 'error',
          duration: 2000
        })
      }
    )

  },
  formReset: function () {
    console.log('form发生了reset事件')
  },


  // 打开附件
  openDocument2: function (tempFilePath, suffixs,score_fromScore) {
    wx.openDocument({
      filePath: tempFilePath,
      fileType: suffixs, //打开文件类型
      showMenu: true, //是否显示右上角菜单
      success: function (res) {
        wx.hideLoading({})
        console.log('附件打开成功');
        wx.showModal({
          title: '下载成功',
          content: '附件下载成功,你已消耗积分' + that.data.postil.scoreCost + ',发帖人已获得积分' + that.data.postil.scoreCost + ',你还剩积分' + score_fromScore+'',
          showCancel: false, //是否显示取消按钮
        })
    
      },
      fail: function (res) {
        wx.hideLoading({})
        console.log('失败了');
        wx.showModal({
          title: '下载成功',
          content: '附件下载成功,你已消耗积分' + that.data.postil.scoreCost + ',发帖人已获得积分' + that.data.postil.scoreCost + ',你还剩积分' + score_fromScore,
          showCancel: false, //是否显示取消按钮
        })
    
      }
    })
  },
 
  // 下载附件
  downloadFile: function () {
    var that = this;
    console.log(that.data.forumNewsId)
    console.log(getApp().globalData.user_id)
    console.log(that.data.postil.wxUser.id)
    server.request(
      'get',
      'forum/downloadFile?forumNewsId=' + that.data.forumNewsId + '&fromUserId=' +
      getApp().globalData.user_id + '&toUserId=' + that.data.postil.wxUser.id + '&', {

      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        // 文件名
        if (res.data.message == '成功') {
          var score_toScore = res.data.response.toScore
          var score_fromScore = res.data.response.fromScore
          // 下载附件（暂时下载到缓存）
          wx.showLoading({
            title: '正在下载..',
          })
          var filePath = that.data.fileUrl;
          var suffixs = filePath.split('.').pop(); //获得文件后缀
          console.log(suffixs)
          console.log(filePath)
          wx.downloadFile({
            // url: 'https://www.cqcwangluo/static/upload/newsFile/7b180daf-79c4-4826-8e97-b7adb9f2a0a7.docx',
            url: filePath, //这就是你从数据库查找出的URL地址
            success: function (res) {
              console.log(res)
              var tempFilePath = res.tempFilePath; //微信接口下载文档后返回的URL地址，打开文档需要用到这个
              console.log(tempFilePath)
              that.openDocument2(tempFilePath, suffixs,score_fromScore);

             
            },
            fail: function (res) {
              console.log(res);
            }

          })
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,

          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
        wx.showToast({
          title: '失败，请重试！',
          icon: 'error',
          duration: 2000
        })
      }
    )

  },

  // 下载附件
  downloadFile: function () {
    var that = this;
    console.log(that.data.forumNewsId)
    console.log(getApp().globalData.user_id)
    console.log(that.data.postil.wxUser.id)
    server.request(
      'get',
      'forum/downloadFile?forumNewsId=' + that.data.forumNewsId + '&fromUserId=' +
      getApp().globalData.user_id + '&toUserId=' + that.data.postil.wxUser.id + '&', {

      },
      function (res) { //？？？对应的是接口名
        console.log(res);
        // 文件名
        if (res.data.message == '成功') {
          var score_toScore = res.data.response.toScore
          var score_fromScore = res.data.response.fromScore
          // 下载附件（暂时下载到缓存）
          wx.showLoading({
            title: '正在打开..',
          })
          var filePath = that.data.fileUrl;
          var suffixs = filePath.split('.').pop(); //获得文件后缀
          console.log(suffixs)
          console.log(filePath)
          wx.downloadFile({
            // url: 'https://www.cqcwangluo/static/upload/newsFile/7b180daf-79c4-4826-8e97-b7adb9f2a0a7.docx',
            url: filePath, //这就是你从数据库查找出的URL地址
            success: function (res) {
              console.log(res)
              var tempFilePath = res.tempFilePath; //微信接口下载文档后返回的URL地址，打开文档需要用到这个
              console.log(tempFilePath)
              that.openDocument2(tempFilePath, suffixs);

              wx.showModal({
                title: '下载成功',
                content: '附件下载成功,你已消耗积分' + that.data.postil.scoreCost + ',发帖人已获得积分' + that.data.postil.scoreCost + ',还剩积分' + score_fromScore,
                showCancel: false, //是否显示取消按钮

              })
            },
            fail: function (res) {
              console.log(res);
            }

          })
        } else {
          wx.showModal({
            content: res.data.message,
            showCancel: false,

          })
        }
      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
        wx.showToast({
          title: '失败，请重试！',
          icon: 'error',
          duration: 2000
        })
      }
    )

  },
  downFile: function () {
    var that = this;
    wx.showModal({
      title: '下载文件',
      content: '确定下载该文件？下载后，会被扣除积分'+that.data.postil.scoreCost+'哦~',
      showCancel: true, //是否显示取消按钮
      success: function (res) {
        if (res.cancel) {
          
        } else {
          that.downloadFile()
      }
      }
    })

  },
  //点击评论按钮
  toComment: function () {
    var that = this;
    if (that.data.to_comment) {
      that.setData({
        to_comment: false,
      })
    } else {
      that.setData({
        to_comment: true,
      })
      // 点击评论按钮时，查一遍帖子详情，看看评论有没有改变
      that.getCommentList();
    }
  },

  //  删除自己的评论
  delComm_btn: function (e) {
    var that = this;
    var commendid = e.currentTarget.dataset.commentid;
    var type = e.currentTarget.dataset.type;
    console.log(type)
    wx.showModal({
      title: '警告',
      content: '确定要删除该评论？',
      showCancel: true, //是否显示取消按钮

      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          server.request(
            'get',
            // ！！！评论id
            'forum/deleteComment?commentId=' + commendid + '&type=' + type + '&', {

            }
            // )
            ,
            function (res) { //？？？对应的是接口名
              console.log(res.data);
              if (res.data.message == '成功') {
                // ！！！应当是获取最新的评论列表
                that.getCommentList();

              }


            },
            function (error) {
              //调用服务端登录接口失败
              console.log(error);
            },
            // {"Content-Type": "application/json"},
            // {"Content-Type": "application/x-www-form-urlencoded"}
          )
        }
      }
    })
  },

  // 获得评论框中的输入
  changeInputValue(ev) {
    this.setData({
      "inputVal": ev.detail.value
    });
  },
  //  发布评论
  sendComment: function (e) {
    var that = this;
    var targetid = e.currentTarget.dataset.targetid;
    if ((that.data.inputVal == '')||(that.data.inputVal.trim().length==0)) {
      wx.showToast({
        title: '请输入评论！',
        icon: 'none'
      })
      that.setData({
        inputValue:''
      })
    } else {
      server.request(
        'post',
        'forum/comment?', {
          "content": that.data.inputVal, //输入的评论内容
          "parentId": that.data.forumNewsId, //评论的讨论帖id
          "userId": getApp().globalData.user_id, //评论的用户
          "targetId": targetid, //被评论的用户
          "type": 1, //表示是一级评论
        }
        // )
        ,
        function (res) { //？？？对应的是接口名
          console.log(res.data);
          if (res.data.message == '成功') {
            // ！！！应当是获取最新的评论列表(添加好评论后，重新查询一遍评论列表，设置CommentList等字段)
            that.setData({
              "inputValue": '', //评论置空
              "inputVal": '',
            })
            console.log(that.data.inputVal)
            that.getCommentList();

          }


        },
        function (error) {
          //调用服务端登录接口失败
          console.log(error);
        },
      )
    }
    console.log(that.data.CommentList)
  },
  // 添加输入回复的框
  addReply: function (e) {
    this.setData({
      "currCommIdx": e.currentTarget.dataset.currcommidx,
    })
    console.log(this.data.currCommIdx);
  },
  sendReply: function (e) {
    var that = this;
    console.log(that.data.CommentList.forumCommentVMS)
    console.log(that.data.currCommIdx)
    console.log(that.data.CommentList.forumCommentVMS[that.data.currCommIdx])
    var targetid = that.data.CommentList.forumCommentVMS[that.data.currCommIdx].wxUser.id;
    var tocommentfirstclassid = that.data.CommentList.forumCommentVMS[that.data.currCommIdx].id;
    if ((that.data.ReplyVal == '')||(that.data.ReplyVal.trim().length==0)) {
      wx.showToast({
        title: '请输入回复！',
        icon: 'none'
      })
      that.setData({
        ReplyValue:''
      })
    } else {
      server.request(
        'post',
        'forum/comment?', {
          "content": that.data.ReplyVal, //输入的回复内容
          "parentId": that.data.forumNewsId, //评论的讨论帖id
          "userId": getApp().globalData.user_id, //评论的用户
          "targetId": targetid, //被评论的用户
          "type": 2, //表示是二级评论
          "firstClassCommentId": tocommentfirstclassid, //要回复的二级评论的id
        }
        // )
        ,
        function (res) { //？？？对应的是接口名
          console.log(res);
          if (res.data.message == '成功') {
            // ！！！应当是获取最新的评论列表(添加好评论后，重新查询一遍评论列表，设置CommentList等字段)
            that.setData({
              "ReplyValue": '', //回复置空
              "ReplyVal": '',
            })
            that.getCommentList();

          }


        },
        function (error) {
          //调用服务端登录接口失败
          console.log(error);
        },
      )
    }
    console.log(that.data.CommentList)
  },
  // 获得回复框中的输入
  changeReplyValue(ev) {
    this.setData({
      "ReplyVal": ev.detail.value
    });
  },
  //点击点赞按钮
  toLike: function () {
    var that = this;
    if (!that.data.ifLike) {
      server.request(
        'get',
        'forum/thumbUp?id=' + that.data.postil.id + '&userId=' + getApp().globalData.user_id + '&', {
          // "token": getApp().globalData.token,
        }
        // )
        ,
        function (res) { //？？？对应的是接口名
          console.log(res.data);
          that.setData({
            "ifLike": true,
            "likeNum": res.data.response.likeNum,
          })


        },
        function (error) {
          //调用服务端登录接口失败
          console.log(error);
        },
        // {"Content-Type": "application/json"},
        // {"Content-Type": "application/x-www-form-urlencoded"}
      )

    } else {
      server.request(
        'get',
        'forum/thumbCancel?id=' + that.data.postil.id + '&userId=' + getApp().globalData.user_id + '&', {
          // "token": getApp().globalData.token,
        }
        // )
        ,
        function (res) { //？？？对应的是接口名
          that.setData({
            "ifLike": false,
            "likeNum": res.data.response.likeNum,
          })
          console.log(res.data);

        },
        function (error) {
          //调用服务端登录接口失败
          console.log(error);
        },
        // {"Content-Type": "application/json"},
        // {"Content-Type": "application/x-www-form-urlencoded"}
      )

    }
  },

  // 查询讨论帖详情
  getPostDetail: function () {
    var that = this;
    server.request(
      'get',
      'forum/checkForumDetail?forumNewsId=' + that.data.forumNewsId + '&userId=' + getApp().globalData.user_id + '&', {

      }
      // )
      ,
      function (res) { //？？？对应的是接口名
        console.log(res)
        // 刚开始的时候，先将picUrl列表置空
        that.setData({
          // 设置图片url
          "picUrl": [],
        })
        var postil = res.data.response;
        var pubTime = postil.addTime;
        var picUrl = postil.picUrl;
        var fileUrl = postil.fileUrl;
        pubTime = pubTime.replace('T', ' ');
        if (picUrl != []) {
          // 判断该帖子是否有图片，如果有图片再进行如下字符串拼接
          picUrl.forEach(element => {
            var pic_url = element;
            console.log(pic_url);
            that.setData({
              // 设置图片url
              "picUrl": that.data.picUrl.concat(pic_url),

            })
          });
          console.log(that.data.picUrl);
        } else {
          that.setData({
            // 设置文件url
            "picUrl": [],
          })
        }
        if (fileUrl != null) {
          var fileUrl = fileUrl;
          var suffixs = fileUrl.split('.').pop(); //获得文件后缀
          var fileName = fileUrl.split('/').pop(); //获得文件名
          // 判断该帖子是否有文件，如果有文件再进行字符串拼接
          that.setData({
            "fileUrl": fileUrl,
            "suffixs": suffixs,
            "fileName": fileName,
          })
          that.chooseFileImg();
        } else {
          that.setData({
            "fileUrl": null,
          })
        }

        that.setData({
          "postil": res.data.response,
          "pubTime": pubTime,
          "likeNum": res.data.response.likeNum,
          "ifLike": res.data.response.ifLike,
          // "CommentList": res.data.response.forumCommentList,
        })
        console.log(res);
        console.log(that.data.fileUrl)
        that.getCommentList();

      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      }
    )

  },

  // 查询评论列表
  getCommentList: function () {
    var that = this;
    server.request(
      'post',
      'forum/getComment?', {
        "forumNewsId": that.data.forumNewsId,
        "userId": getApp().globalData.user_id,
      }
      // )
      ,
      function (res) { //？？？对应的是接口名

        // 刚开始的时候，先将picUrl列表置空
        that.setData({
          "CommentList": res.data.response,
        })
        console.log(res);
        console.log(that.data)

      },
      function (error) {
        //调用服务端登录接口失败
        console.log(error);
      }
    )


  },
  // 选择文件所显示的图片
  chooseFileImg: function () {
    var that = this;
    var suffixs = that.data.suffixs;
    if (suffixs == 'doc' || suffixs == 'docx') {
      that.setData({
        fileImg: 'https://www.cqcwangluo.site/static/images/WORD.png',
      })
    } else if (suffixs == 'xls' || suffixs == 'xlsx') {
      that.setData({
        fileImg: 'https://www.cqcwangluo.site/static/images/Excel.png',
      })
    } else if (suffixs == 'pdf') {
      that.setData({
        fileImg: 'https://www.cqcwangluo.site/static/images/PDF.png',
      })
    } else {
      that.setData({
        fileImg: 'https://www.cqcwangluo.site/static/images/zip.png',
      })
    }
  },
  // 实现图片的点击放大预览
  imgEnlarge: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.src; //获取data-src
    console.log(src);
    //var imgList = event.currentTarget.dataset.list;//获取data-list
    // console.log(imgList);
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: that.data.picUrl, // 需要预览的图片http链接列表
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.forumNewsId)
    that.setData({
      forumNewsId: options.forumNewsId,
      forumName: options.forumName,
    })
    wx.setNavigationBarTitle({
      title: options.forumName + '讨论区'
    })
    that.getPostDetail();
    setInterval(() => {
      wx.showToast({
        icon: 'loading',
        title: '刷新中',
        duration: 1000
      })
      that.getPostDetail();
    }, 300000)
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