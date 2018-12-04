// api.js
import service from './request'
const getData = (obj) => {
  if (obj.method === 'post') {
    return service({
      url: obj.url,
      method: 'post',
      data: obj.data
    })
  } else {
    return service({
      url: obj.url,
      method: 'get',
      params: obj.data
    })
  }
}
export default getData
