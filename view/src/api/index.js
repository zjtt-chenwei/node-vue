/* 调用axios */
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json'

import service from "./request"

/**
  axios请求的时候如果跨域，post请求会变成option请求
  例如前端服务器是localhost:8080,后台服务器是localhost:3000
  如果用axios.post且请求头为 'application/json'，浏览器控制台中请求方式会是option
  可用vue-cli中的proxyTable代理进行跨域处理
 */
// 注册账号 命名导出
export const register = (params) => {
  return axios.post('/api/users/register', JSON.stringify(params))
}
// 登陆  post可以用url参数的方式，也可以用json形式传送  get只能用url参数的方式
export const userLogin = (params) => {
  return service.post('/users/login', params) //这里的params ==> data:params
  // ==> return axios.get('/api/users/login',JSON.stringify(params))
  return service({ //service 可以看做axios，使用axios接口也是可以跑通的
    url: 'http://localhost:8080/api/users/login', 
    method: 'post',
    data: params,
    // params //这里的params ==> params:params 后台可以获取url参数
  })
  
  return service.get('/api/users/login', {params}) 
  // ==> return axios.get('/api/users/login', {params})
  return service({ //service 可以看做axios；换成axios,接口也是可以跑通的
    url: 'http://localhost:8080/api/users/login', 
    method: 'get',
    params,//这里的params ==> params:params
  })
}

// 退出登陆
export const loginOut = (params) => {
  return axios.post('/api/users/logout', JSON.stringify(params))
}

/* 个人中心 */
// 用户信息
export const userInfo = (params) => {
  return axios.post(baseUrl + '/users/userInfo', JSON.stringify(params))
}
// 用户信息修改
export const userInfoUpdate = (params) => {
  return axios.post(baseUrl + '/users/userInfoUpdate', JSON.stringify(params))
}
// 修改密码
export const changePass = (params) => {
  return axios.post(baseUrl + '/users/changePass', JSON.stringify(params))
}

/* 我的地址 */
// 获取用户地址
export const addressList = (params) => {
  return axios.post(baseUrl + '/users/addressList', JSON.stringify(params))
}
// 修改收货地址
export const addressUpdate = (params) => {
  return axios.post(baseUrl + '/users/updateAddress', JSON.stringify(params))
}
// 添加收货地址
export const addressAdd = (params) => {
  return axios.post(baseUrl + '/users/addAddress', JSON.stringify(params))
}
// 删除收货地址
export const addressDel = (params) => {
  return axios.post(baseUrl + '/users/delAddress', JSON.stringify(params))
}
/* 商品管理 */
// 获取商品管理页面的商品列表
export const goodsList = (params) => {
  return axios.post(baseUrl + '/users/goodsList', JSON.stringify(params))
}
// 修改商品管理页面的商品列表
export const goodsUpdate = (params) => {
  return axios.post(baseUrl + '/users/goodsUpdate', JSON.stringify(params))
}
// 添加商品管理页面的商品列表
export const goodsAdd = (params) => {
  return axios.post(baseUrl + '/users/goodsAdd', JSON.stringify(params))
}
// 删除商品管理页面的商品列表
export const goodsPut = (params) => {
  return axios.post(baseUrl + '/users/goodsPut', JSON.stringify(params))
}

/* 商店 */
// 商品列表接口
export const navList = (params) => {
  return axios.get(baseUrl + '/shop/navList', {params})
}
// 商品详情
export const productDet = (params) => {
  return axios.post(baseUrl + '/shop/goodsDetail', JSON.stringify(params))
}
// 商品筛选
export const goodsListSelect = (params) => {
  return axios.post(baseUrl + '/shop/goodsListSelect', JSON.stringify(params))
}

/* 购物车 */
// 加入购物车
export const addCart = (params) => {
  return axios.post(baseUrl + '/shop/cartAdd', JSON.stringify(params))
}
// 获取购物车列表
export const getCartList = (params) => {
  return axios.post(baseUrl + '/shop/cartList', JSON.stringify(params))
}
// 编辑购物车
export const cartEdit = (params) => {
  return axios.post(baseUrl + '/shop/cartEdit', JSON.stringify(params))
}
// // 全选
// export const editCheckAll = (params) => {
//   return axios.post(baseUrl + '/shop/editCheckAll', JSON.stringify(params))
// }
// 删除一条购物车商品
export const cartDel = (params) => {
  return axios.post(baseUrl + '/shop/cartDel', JSON.stringify(params))
}

// 订单
// 获取用户订单
export const orderList = (params) => {
  return axios.post(baseUrl + '/shop/orderList', JSON.stringify(params))
}
// 删除订单
export const delOrder = (params) => {
  return axios.post(baseUrl + '/shop/orderDel', JSON.stringify(params))
}
// 生成订单
export const submitOrder = (params) => {
  return axios.post(baseUrl + '/shop/orderAdd', JSON.stringify(params))
}

/* 医院 */
// 医院列表接口
export const hospitalNavList = (params) => {
  return axios.get(baseUrl + '/hospital/hospitalNavList', {params})
}
// 医生列表接口
export const docNavList = (params) => {
  return axios.get(baseUrl + '/hospital/docNavList', {params})
}
// 医生筛选
export const docSelect = (params) => {
  return axios.post(baseUrl + '/hospital/docSelect', JSON.stringify(params))
}

// 殡葬列表接口
export const deathNavList = (params) => {
  return axios.get(baseUrl + '/death/deathNavList', {params})
}
/* 殡葬管理 */
export const deathRegist = (params) => {
  return axios.post(baseUrl + '/death/deathManage', JSON.stringify(params))
}
// 殡葬管理修改
export const deathRegistUpdate = (params) => {
  return axios.post(baseUrl + '/death/deathManageUpdate', JSON.stringify(params))
}
/* 医生信息 */
export const doctuorInfo = (params) => {
  return axios.post(baseUrl + '/doctor/info', JSON.stringify(params))
}
// 医生信息修改
export const doctuorInfoUpdate = (params) => {
  return axios.post(baseUrl + '/doctor/InfoUpdate', JSON.stringify(params))
}
/* 医院信息 */
export const hospitalInfo = (params) => {
  return axios.post(baseUrl + '/hospital/info', JSON.stringify(params))
}
// 医院信息修改
export const hospitalInfoUpdate = (params) => {
  return axios.post(baseUrl + '/hospital/infoUpdate', JSON.stringify(params))
}

/* 百科 */
//经验列表
export const baikeData = (params) => {
  return axios.get(baseUrl + '/baike/experience', {params})
}
//上传文章
export const addArticle = (params) => {
  return axios.post(baseUrl + '/baike/addArticle', JSON.stringify(params))
}




// 上传图片
// export const upload = (params) => {
//   return axios.post(baseUrl + '/users/imgaeUpload', JSON.stringify(params))
// }

// // 修改头像
// export const updateheadimage = (params) => {
//   return axios.post('/member/updateheadimage', params)
// }
