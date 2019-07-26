import { Base } from './base.js';
import { Config } from './config.js';

class Address extends Base{

  constructor() {
    super();
  }

  

  //获取收货地址
  getAddressInfo(callback){
      var that = this;
      var params = {
        url: 'address',        
        sCollback:function(res){
        if(res){
            
            res.totalDetail = that.setAddressInfo(res);
            callback && callback(res,true);
        }
      }

    };
    this.request(params); 
  }

    //构建收货地址参数
    setAddressInfo(res){
      var province = res.provinceName || res.province,
            city = res.cityName || res.city,
            country = res.countyName || res.country,
            datail = res.detailInfo || res.detail;

      var totalDetail = city + country + datail; 
      if(!this.isCenterCity(province)){
        totalDetail = province + totalDetail;

      }
      return totalDetail;
    }

   /*是否为直辖市*/
   isCenterCity(name) {

    var centerCitys=['北京市','天津市','上海市','重庆市'],
        flag=centerCitys.indexOf(name) >= 0;
    return flag;
  }

  //更新保存地址
  submitAddress(data,callback){

    var data = this._setUpAddress(data);
    var params = {
        url: 'address',
        type: 'post',
        data: data,
        sCallback:function(res){
          callback && callback(true,res);
        },eCallback(res){
          callback && callback(false,res);
        }

    }

    this.request(params);
}


  //构建保存地址参数

  _setUpAddress(res){
    var formData={
      name:res.userName,
      province:res.provinceName,
      city:res.cityName,
      country:res.countyName,
      mobile:res.telNumber,
      detail:res.detailInfo

    };

    return formData;

  }



}
export { Address };