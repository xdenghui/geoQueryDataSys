import request from '@/utils/request'

export default{
  get_T1(params){
    return request({
      url: '/api/hpserver/get_T1',
      method: 'get',
      params
    })
  },
  get_Humidity1_mean(params){
    return request({
      url: '/api/hpserver/get_Humidity1_mean',
      method: 'get',
      params
    })
  },
  get_Pressure1_mean(params){
    return request({
      url: '/api/hpserver/get_Pressure1_mean',
      method: 'get',
      params
    })
  },
  get_A1_variance(params){
    return request({
      url: '/api/hpserver/get_A1_variance',
      method: 'get',
      params
    })
  },
  get_rainfall_mean(params){
    return request({
      url: '/api/hpserver/get_rainfall_mean',
      method: 'get',
      params
    })
  },
  get_illuminance_mean(params){
    return request({
      url: '/api/hpserver/get_illuminance_mean',
      method: 'get',
      params
    })
  },
  get_V1_mean(params){
    return request({
      url: '/api/hpserver/get_V1_mean',
      method: 'get',
      params
    })
  },
  get_displacement1_mean(params){
    return request({
      url: '/api/hpserver/get_displacement1_mean',
      method: 'get',
      params
    })
  },
}