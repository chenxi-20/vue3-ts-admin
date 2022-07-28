import request from './index'
// 定义data类型
interface loginData {
  username: string
  password: string
}

// 登录接口
export function Login (data:loginData) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 商品列表接口封装
export function getGoodsList () {
  return request({
    url: '/getGoodsList',
    method: 'get'
  })
}

// 用户列表接口
export function getUserList () {
  return request({
    url: '/getUserList',
    method: 'get'
  })
}

// 角色列表接口
export function getRoleList () {
  return request({
    url: '/getRoleList',
    method: 'get'
  })
}

// 权限列表接口
export function getAuthorityList () {
  return request({
    url: '/getAuthorityList',
    method: 'get'
  })
}
