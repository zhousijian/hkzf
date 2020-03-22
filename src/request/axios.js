import axios from 'axios'
import { Toast } from 'antd-mobile';

export const baseURL = 'http://157.122.54.189:9060'

axios.defaults.baseURL = 'http://157.122.54.189:9060'

// 计数器
let AjaxTimes = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    AjaxTimes++
    Toast.loading('加载中...', 0)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    AjaxTimes--
    if(AjaxTimes === 0){
      // 等最后一个请求回来了才把轻提示隐藏
      Toast.hide()
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios