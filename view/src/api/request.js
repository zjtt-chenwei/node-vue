/* 封装axios */
import axios from "axios";
import qs from 'querystring';

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000,  //请求超时时间
})

/****** request拦截器==>对axios的请求参数做处理 ******/
service.interceptors.request.use(config => {
  config.method === 'post' 
    ? config.data = JSON.stringify(config.data) //请求的数据主体 不适用get
    : config.params = config.params;
  config.headers.post['Content-Type'] = 'application/json'

  return config;
},error => {
  Promise.reject(error)
})

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(response => {  //成功请求到数据
    //这里根据后端提供的数据进行对应的处理
    return response;
      
  },error => {  //响应错误处理
      console.log('error');
      console.log(error);
      console.log(JSON.stringify(error));

      let text = JSON.parse(JSON.stringify(error)).response.status === 404
          ? '404'
          : '网络异常，请重试';
      app.$vux.toast.show({
          type: 'warn',
          text: text
      });

      return Promise.reject(error)
  }
);

//默认导出
export default service; 