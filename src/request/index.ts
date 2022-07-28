import axios from 'axios'
// 引入loading
import { ElLoading } from 'element-plus'
const option = {
  lock: true,
  text: '加载中....',
  background: 'rgba(0, 0, 0, 0.7)'
}
const loadingInstanst = ElLoading.service
const request = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 请求拦截器：携带token,开启loading
request.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  loadingInstanst(option) // 开启loading
  return config
})
request.interceptors.response.use(
  (res) => {
    loadingInstanst(option).close() // 关闭loading
    const code: number = res.data.code
    if (code !== 200) {
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    console.log(err)
  }
)
export default request
