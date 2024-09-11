//const ROOT = 'http://localhost:8050/'
//  const ROOT = 'http://www.cqcwangluo.site:8050/'
 const ROOT = 'https://www.cqcwangluo.site:8050/'
module.exports = {

  request(method,url,datas,yes,error,head = {'Content-Type':'application/json'}) {
    console.log(ROOT + url+'token='+getApp().globalData.token)
    wx.request({
      url: ROOT + url+'token='+getApp().globalData.token,
      data: datas,
      dataType : "json",

      header: head,
      method: method,
      success: yes,
      fail: error, 
    })
    
  }
}