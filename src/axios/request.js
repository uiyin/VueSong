// request.js
import axios from 'axios'
import qs from 'qs'
import storgeMemery from '@/store/localstorge'
/** **** 创建axios实例 ******/
const service = axios.create({
  timeout: 5000 // 请求超时时间
})
/** **** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
  let value = storgeMemery.getvalue('token') // 取出来token
  // 这里表示token存在 ,这样每次发送请求的时候都会带上token
  if (value) {
    config.headers.Authorization = value
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data
      })
      : config.params = { ...config.params
      }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {

  }

  return config
}, error => { // 请求错误处理
  // app.$vux.toast.show({
  //   type: 'warn',
  //   text: error
  // })
  Promise.reject(error)
})
/** **** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => { // 成功请求到数据
    // app.$vux.loading.hide()
    // 这里根据后端提供的数据进行对应的处理
    if (response.data.result === 'TRUE') {
      return response.data
    } else {
      return response.data
      // app.$vux.toast.show({ // 常规错误处理
      //   type: 'warn',
      //   text: response.data.data.msg
      // })
    }
  },
  error => { // 响应错误处理
    console.log('error')
    console.log(error)
    console.log(JSON.stringify(error))

    // let text = JSON.parse(JSON.stringify(error)).response.status === 404
    //   ? '404'
    //   : '网络异常，请重试'
    // app.$vux.toast.show({
    //   type: 'warn',
    //   text: text
    // })

    return Promise.reject(error)
  }
)
export default service
